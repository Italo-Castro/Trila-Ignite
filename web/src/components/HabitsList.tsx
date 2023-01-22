import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";


interface HabitsInfo {
    possibleHabits: { id: string, title: string, created_at: string }[],
    completedHabits: string[]

}

interface HabitsListProps {
    date: Date,
    handleCompletedChange: (completed: number) => void
}

export function HabitsList({ date, handleCompletedChange }: HabitsListProps) {

    const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

    useEffect(() => {
        api.get('/day', {
            params: {
                date: date.toISOString()
            }
        }).then(response => {
            setHabitsInfo(response.data);
            console.log(response.data)
        })
    }, [])

    const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

    async function handleToggleHabit(habitId: string) {
        await api.patch(`/habits/${habitId}/toogle`);

        const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId);

        let completedHabits: string[] = [];

        if (isHabitAlreadyCompleted) {
            completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId);

        } else {
            completedHabits = [...habitsInfo!.completedHabits, habitId]
        }

        setHabitsInfo({
            possibleHabits: habitsInfo!.possibleHabits,
            completedHabits
        })
        handleCompletedChange(completedHabits.length)
    }


    return (
        <div className="mt-6 flex flex-col gap-3">

            {habitsInfo && habitsInfo?.possibleHabits.map(habit => {
                return (
                    <Checkbox.Root
                        className="flex items-center gap-3 group"
                        key={habit.id}
                        onCheckedChange={() => handleToggleHabit(habit.id)}
                        checked={habitsInfo.completedHabits.includes(habit.id)}
                        disabled={isDateInPast}
                    >

                        <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500" >
                            <Checkbox.Indicator>
                                <Check size={20} className="text-white"></Check>
                            </Checkbox.Indicator>
                        </div>

                        <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc[400]">
                            {habit.title}
                        </span>

                    </Checkbox.Root>
                )
            })}



        </div>

        // <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">

        // </div>
    )
}