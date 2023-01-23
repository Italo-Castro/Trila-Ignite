import React, { useState } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import { Feather } from '@expo/vector-icons';
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const availableWeekDays = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];


export function NewHabit() {

    const [weekDays, setWeekDays] = useState<number[]>([]);
    const [title, setTitle] = useState('');

    function handleTogleWeekDay(weekDayIndex: number) {
        if (weekDays.includes(weekDayIndex)) {
            setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex));

        } else {
            setWeekDays(prevState => [...prevState, weekDayIndex]);
        }
    }

    async function headleCreateNewHabit() {
        try {
            if (!title.trim() || weekDays.length === 0) {
                Alert.alert('Novo Hábido', 'Informe o nome do Habíto e escolha a periodicidade');
                return;
            }

            await api.post('habits', { title, weekDays });
            setTitle('');
            setWeekDays([]);
            Alert.alert('Novo Habito', ' Novo habíto criado com sucesso');
        } catch (error) {
            Alert.alert('Ops', 'Erro ao criar novo habíto')
            console.log('erro ao criar novo habío', error);
        }
    }


    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}>

                <BackButton />

                <Text className="mt-6 text-white font-extrabold text-3xl">
                    Criar Habíto
                </Text>

                <Text className="mt-6 text-white font-semibold text-base">
                    Qual seu compromentimento?
                </Text>


                <TextInput
                    placeholder="Ler, Execitiar, etc..."
                    placeholderTextColor={colors.zinc[400]}
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
                    value={title}
                    onChangeText={setTitle}
                />

                <Text className="font-semibold mt-4 mb-3 text-white text-base">
                    Qual a recorrência?
                </Text>

                {
                    availableWeekDays.map((weekDay, index) =>
                        <CheckBox checked={weekDays.includes(index)} title={weekDay} key={weekDay} onPress={() => handleTogleWeekDay(index)} />
                    )
                }
                <TouchableOpacity
                    activeOpacity={0.7}
                    className="w-full h-14 flex-row items-center justify-center bg-green-500 rounded-md mt-6"
                    onPress={headleCreateNewHabit}
                >

                    <Feather name="check" size={20} color={colors.white} />
                    <Text className="font-semibold text-base text-white ml-2">
                        Confirmar

                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>

    )
} 