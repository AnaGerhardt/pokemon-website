'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { getPokemonsList } from '../../queries/pokemonApi'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'

type PokemonApiData = {
    pokemonsList: PokemonsList[]
}
type PokemonsList = { id: number; name: string }

const PokemonsWrap = () => {
    const router = useRouter()
    const { data } = useSuspenseQuery<PokemonApiData>(getPokemonsList)

    const openPokemonDetails = (id: number, name: string) => {
        router.push(`/?id=${id}&pokemon=${name}`)
    }
    return (
        <div className="grid grid-cols-3 gap-x-4 gap-y-8 w-full">
            {data?.pokemonsList.map((pokemon) => (
                <div
                    key={pokemon.id}
                    className="p-6 w-full h-40 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => openPokemonDetails(pokemon.id, pokemon.name)}
                >
                    <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                        width="75"
                        height="75"
                        alt=""
                    />
                    <span className="text-xl text-darkest-blue font-black capitalize">
                        {pokemon.name}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default PokemonsWrap
