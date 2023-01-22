import React from "react";
import { View, TouchableOpacity, Dimensions, TouchableOpacityProps } from "react-native";
import { generateProgressPecentage } from "../utils/generate-progress-porcentage";
import clsx from "clsx";
import dayjs from "dayjs";


const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;
export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5);


interface Props extends TouchableOpacityProps {
    amountOfHabits?: number;
    amountCompletede?: number;
    date: Date;
};

export function HabitDay({ amountOfHabits = 0, amountCompletede = 0, date, ...rest }: Props) {

    const amountAccomplishedPerentage = amountOfHabits > 0 ? generateProgressPecentage(amountOfHabits, amountCompletede) : 0
    const today = dayjs().startOf('day').toDate();
    const isCurrentDay = dayjs(date).isSame(today);

    return (
        <TouchableOpacity
            className={clsx(
                "roudend-lg border-2 m-1", {
                ['bg-zinc-900 border-zinc-900']: amountAccomplishedPerentage === 0,
                ['bg-violet-900 border-violet-700']: amountAccomplishedPerentage > 0 && amountAccomplishedPerentage < 20,
                ['bg-violet-800 border-violet-600']: amountAccomplishedPerentage > 20 && amountAccomplishedPerentage < 40,
                ['bg-violet-700 border-violet-500']: amountAccomplishedPerentage > 40 && amountAccomplishedPerentage < 60,
                ['bg-violet-600 border-violet-400']: amountAccomplishedPerentage > 60 && amountAccomplishedPerentage < 80,
                ['bg-violet-500 border-violet-300']: amountAccomplishedPerentage > 80,
                ['border-white border-4']: isCurrentDay

            }

            )}
            style={{ width: DAY_SIZE, height: DAY_SIZE }} activeOpacity={0.7}>

            {/* "bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800"  */}

        </TouchableOpacity>
    )

}