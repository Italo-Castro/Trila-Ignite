import { View, Text, ScrollView } from "react-native";
import React from "react";
import { DAY_SIZE, HabitDay } from "../components/HabitDay";
import { Header } from "../components/Header";
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning.ts';
import { useNavigation } from "@react-navigation/native";



const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const dataFromYearStart = generateDatesFromYearBeginning();

const minimunSummaryDateSizes = 18 * 5;
const ammoutOfDaysToFill = minimunSummaryDateSizes - dataFromYearStart.length;


export function Home() {
    const { navigate } = useNavigation();

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
                <View className="flex-row flex-wrap">
                    {
                        dataFromYearStart.map(date => (
                            <HabitDay
                                key={date.toISOString()}
                                onPress={() => navigate('habit', { data: date.toISOString() })} />
                        ))
                    }

                    {
                        ammoutOfDaysToFill > 0 && Array.from({ length: ammoutOfDaysToFill }).map((_, index) => (
                            <View key={index} className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40 " style={{ width: DAY_SIZE, height: DAY_SIZE }} />
                        ))
                    }
                </View>


            </ScrollView>
        </View>
    )
}  