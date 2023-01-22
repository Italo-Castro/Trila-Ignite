import { View, Text, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { DAY_SIZE, HabitDay } from "../components/HabitDay";
import { Header } from "../components/Header";
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning.ts';
import { useNavigation } from "@react-navigation/native";
import { api } from '../lib/axios';
import { Loading } from "../components/Loading";
import dayjs from "dayjs";


const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const dataFromYearStart = generateDatesFromYearBeginning();

const minimunSummaryDateSizes = 18 * 5;
const ammoutOfDaysToFill = minimunSummaryDateSizes - dataFromYearStart.length;


type SumarryProps = {
    id: string;
    amount: number;
    completeded: number;
    date: string;
}[]

export function Home() {
    const { navigate } = useNavigation();
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState<SumarryProps | null>(null);

    useEffect(() => {
        fetcData()
    }, [])


    async function fetcData() {
        try {
            setLoading(true);
            console.log('buscando dados')
            const response = await api.get('summary');
            setSummary(response.data)
            console.log(response.data)

            setLoading(false);
        } catch (erro) {
            Alert.alert('Ops', 'Não foi possivel carregar os dados.')
            console.log('erro ao buscar dados', erro)
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <Header />
            <View className="flex-row mt-6 mb-2">
                {
                    weekDays.map((weekDay, i) => (
                        <Text key={i} className="text-zinc-400 text-xl font-bold text-center mx-1" style={{ width: DAY_SIZE }}>
                            {weekDay}
                        </Text>
                    ))
                }
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {summary &&
                    <View className="flex-row flex-wrap">
                        {
                            dataFromYearStart.map(date => {
                                const dayWithHabits = summary.find(day => {
                                    return dayjs(date).isSame(day.date, 'day')
                                })

                                return (
                                    <HabitDay
                                        key={date.toISOString()}
                                        date={date}
                                        amountOfHabits={dayWithHabits?.amount}
                                        amountCompletede={dayWithHabits?.completeded}
                                        onPress={() => navigate('habit', { data: date.toISOString() })}
                                    />
                                )
                            })
                        }

                        {
                            ammoutOfDaysToFill > 0 && Array.from({ length: ammoutOfDaysToFill }).map((_, index) => (
                                <View key={index} className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40 " style={{ width: DAY_SIZE, height: DAY_SIZE }} />
                            ))
                        }
                    </View>}


            </ScrollView>
        </View>
    )
}  