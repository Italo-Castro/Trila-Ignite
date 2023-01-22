import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const availableWeekDays =
    [
        'Domingo',
        'Segunda-Feira',
        'Terça-Feira',
        'Quarta-Feira',
        'Quinta-Feira',
        'Sexta-Feira',
        'Sábado'
    ];

export function NewHabitForm() {

    const [title, setTitle] = useState('');
    const [weekDays, setWeekDays] = useState<number[]>([]);

    async function createNewHabit(event: FormEvent) {
        event.preventDefault()
        console.log(weekDays);

        if (!title || weekDays.length === 0) {
            return;
        }

        await api.post('/habits', {
            title,
            weekDays
        });

        setTitle('');
        setWeekDays([])


        alert('Habíto criado com sucesso');
    }

    function handleTogleWeekDay(weekDay: number) {
        if (weekDays.includes(weekDay)) {
            const weekDayWhithRemovedOne = weekDays.filter(day => day !== weekDay)
            setWeekDays(weekDayWhithRemovedOne);
        } else {
            const weekDaysWithAddOne = [...weekDays, weekDay];
            setWeekDays(weekDaysWithAddOne)
        }
    }

    return (

        <form className="w-full flex flex-col mt-6" onSubmit={createNewHabit}>
            <label htmlFor="title">  Qual Seu compromentimento </label>

            <input
                type="text"
                id="title"
                value={title}
                placeholder="Ex: Treinar, Beber Agua" autoFocus
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
                onChange={(event => {
                    setTitle(event.target.value)
                })}
            />


            <label>Qual a recorrência?</label>
            <div className="flex flex-col gap-2 mt-3">

                {availableWeekDays.map((weekDay, index) => {
                    return (

                        <Checkbox.Root
                            key={weekDay}
                            checked={weekDays.includes(index)}
                            className="flex items-center gap-3 group"
                            onCheckedChange={() => { handleTogleWeekDay(index) }}
                        >

                            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500" >
                                <Checkbox.Indicator>
                                    <Check size={20} className="text-white"></Check>
                                </Checkbox.Indicator>
                            </div>

                            <span className=" text-white leading-tight ">
                                {weekDay}
                            </span>

                        </Checkbox.Root>
                    )
                })}

            </div>

            <button type="submit" className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500">
                <Check size={20} weight="bold" />
            </button>

        </form >



    )
}

