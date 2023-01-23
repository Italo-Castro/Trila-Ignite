import { View, ScrollView, Alert, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from '@react-navigation/native';
import { BackButton } from "../components/BackButton";
import dayjs from 'dayjs';
import { ProgressBar } from "../components/ProgressBar";
import { CheckBox } from "../components/CheckBox";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import { HabitsEmpty } from "../components/HabitsEmpty";
import clsx from "clsx";


interface DayInfoProps {
    completedHabits: string[];
    possibleHabits: {
        id: string;
        title: string
    }[]
}

interface Params {
    date: string;
}

export function Habit() {
    const route = useRoute();
    const { date } = route.params as Params;
    const [loading, setLoading] = useState(true);


    const parsedDate = dayjs(date);
    const dayOfWeek = parsedDate.format('dddd');
    const dayAndMonth = parsedDate.format('DD/MM');
    const isDateIsPast = parsedDate.endOf('day').isBefore(new Date());


    const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null)
    const [completedHabits, setCompletedHabits] = useState<string[]>([]);

    const habitsProgress = dayInfo?.possibleHabits.length ? generateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length) : 0

    useEffect(() => { fetchHabits() }, [])

    async function fetchHabits() {
        try {
            setLoading(true);
            const response = await api.get('/day', { params: date });

            setDayInfo(response.data);
            setCompletedHabits(response.data.completedHabits);

            setLoading(false);
        } catch (erro) {
            console.log('Erro', erro);
            Alert.alert('Ops', 'Não foi possivel carregar as informações dos hábitos');
            setLoading(false);

        } finally {
            setLoading(false);
        }
    }

    async function handleTogleHabit(habitId: string) {
        try {
            await api.patch(`/habits/${habitId}/toggle`);
            if (completedHabits.includes(habitId)) {
                setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId));
            } else {
                setCompletedHabits(prevState => [...prevState, habitId]);
            }

        } catch (erro) {
            console.log('erro', erro);
            Alert.alert('Ops', 'Não foi possível atualizar o status do habíto');
        }



    }

    if (loading) {
        return <Loading />
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16" >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <BackButton />

                <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
                    {dayOfWeek}
                </Text>

                <Text className="text-white font-extrabold text-3xl">
                    {dayOfWeek}
                </Text>

                <ProgressBar progress={habitsProgress} />
                <View className={clsx("mt-6",
                    {
                        ["opacity-50"]: isDateIsPast
                    })}>

                    {
                        dayInfo?.possibleHabits ? dayInfo.possibleHabits.map(habit => (
                            <CheckBox
                                key={habit.id}
                                title={habit.title}
                                checked={completedHabits.includes(habit.id)}
                                disabled={isDateIsPast}
                                onPress={() => handleTogleHabit(habit.id)}
                            />
                        )) : <HabitsEmpty />}

                    {isDateIsPast &&
                        <Text className="text-white mt-10 text-center">
                            Você não pode editar habítos de uma data passada.
                        </Text>}


                </View>
            </ScrollView>

        </View>
    )
}