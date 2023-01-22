import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import { ProgressBar } from "./ProgessBar";



interface HabitDayProps {
    completed: number;
    amount: number;
}

export function HabitDay(props: HabitDayProps) {
    const { completed, amount } = props;

    const completededPercentage = Math.round((completed / amount) * 100)

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
                    <span className="font-semibold text-zinc-400">TerçaFeira</span>
                    <span className="mt-1 font-extrabold leading-tight">17/01/23</span>
                    <ProgressBar progress={completededPercentage} />

                    <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">

                    </div>

                    <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
                </Popover.Content>

            </Popover.Portal>

        </Popover.Root>
    );
}