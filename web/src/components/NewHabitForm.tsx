import { Check } from "phosphor-react";

export function NewHabitForm() {
    return (

        <form className="w-full flex flex-col mt-6">
            <label htmlFor="title">  Qual Seu compromentimento </label>

            <input
                type="text"
                id="title"
                placeholder="Ex: Treinar, Beber Agua" autoFocus
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
            />


            <label>Qual a recorrência?</label>


            <button type="submit" className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500">
                <Check size={20} weight="bold" />
            </button>

        </form >



    )
}

