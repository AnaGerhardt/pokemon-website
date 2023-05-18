'use client'
import React from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { pokemonSpriteUrl } from '../../config/sprites'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { getPokemonDetails } from '../../queries/pokemonApi'

interface PokemonDetailsData {
    characteristics: {
        characteristics_description: { description: string }[]
    }[]
}

const PokemonInfo = () => {
    const searchParams = useSearchParams()
    const pokemon = searchParams?.get('pokemon')
    const id = searchParams?.get('id')
    const { data } = useSuspenseQuery<PokemonDetailsData>(getPokemonDetails, {
        variables: { id },
    })

    return (
        <div className="p-6 w-4/12 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center">
            <Image
                src={`${pokemonSpriteUrl}/${id}.png`}
                width="150"
                height="150"
                alt=""
            />
            <span className="text-xl text-darkest-blue font-black capitalize">
                {pokemon}
            </span>
            {data && (
                <span>
                    {
                        data.characteristics[0].characteristics_description[0]
                            .description
                    }
                </span>
            )}
        </div>
    )
}

export default PokemonInfo
