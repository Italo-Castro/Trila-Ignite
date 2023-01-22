import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import { ProgressBar } from "./ProgessBar";
import dayjs from "dayjs";
import { HabitsList } from "./HabitsList";
import { useState } from "react";



interface HabitDayProps {
    defaultCompleted?: number;
    amount?: number;
    date: Date;
}

export function HabitDay(props: HabitDayProps) {
    const { defaultCompleted = 0, amount = 0, date } = props;

    const [completed, seCompeted] = useState(defaultCompleted);

    const completededPercentage = amount > 0 ? Math.round((defaultCompleted / amount) * 100) : 0
    const dayAndMonth = dayjs(date).format('DD/MM')
    const dayOfwEEK = dayjs(date).format('dddd')

    function handleCompletedChange(completed: number) {
        seCompeted(completed);
    }


    return (
        <Popover.Root>

            <Popover.Trigger className={clsx('w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg', {
                'bg-zinc-900 border-zinc-800': completededPercentage === 0,
                'bg-violet-900 border-violet-400': completededPercentage >= 0 && completededPercentage < 20,
                'bg-violet-800 border-violet-400': completededPercentage >= 20 && completededPercentage < 40,
                'bg-violet-700 border-violet-400': completededPercentage >= 40 && completededPercentage < 60,
                'bg-violet-600 border-violet-400': completededPercentage >= 50 && completededPercentage < 80,
                'bg-violet-500 border-violet-400': completededPercentage >= 80

            })} />

            <Popover.Portal>
                <Popover.Content className="min-w-[320px] p-6 rounded-2xl flex flex-col bg-zinc-900 ">
                    <span className="font-semibold text-zinc-400">{dayOfwEEK}</span>
                    <span className="mt-1 font-extrabold leading-tight">{dayAndMonth}</span>

                    <HabitsList date={date} handleCompletedChange={handleCompletedChange} />
                    <ProgressBar progress={completededPercentage} />

                    <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
                </Popover.Content>

            </Popover.Portal>

        </Popover.Root>
    );
}