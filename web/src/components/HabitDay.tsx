import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import { ProgressBar } from "./ProgessBar";
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from "phosphor-react";
import dayjs from "dayjs";



interface HabitDayProps {
    completed?: number;
    amount?: number;
    date: Date;
}

export function HabitDay(props: HabitDayProps) {
    const { completed = 0, amount = 0, date } = props;

    const completededPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0
    const dayAndMonth = dayjs(date).format('DD/MM')
    const dayOfwEEK = dayjs(date).format('dddd')

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
                    <ProgressBar progress={completededPercentage} />

                    <div className="mt-6 flex flex-col gap-3">
                        <Checkbox.Root className="flex items-center gap-3 group">

                            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500" >
                                <Checkbox.Indicator>
                                    <Check size={20} className="text-white"></Check>
                                </Checkbox.Indicator>
                            </div>

                            <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc[400]">
                                Testo
                            </span>

                        </Checkbox.Root>

                    </div>

                    <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">

                    </div>

                    <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
                </Popover.Content>

            </Popover.Portal>

        </Popover.Root>
    );
}