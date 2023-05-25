'use client'
import React from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { pokemonSpriteUrl } from '../../config/sprites'
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
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
    const { data } = useQuery<PokemonDetailsData>(getPokemonDetails, {
        variables: { id },
        skip: !id,
    })

    return (
        <div className="p-6 w-4/12 h-full bg-white rounded-xl shadow-lg flex flex-col items-center justify-center">
            {data && (
                <>
                    <Image
                        src={`${pokemonSpriteUrl}/${id}.png`}
                        width="150"
                        height="150"
                        alt=""
                    />
                    <span className="text-xl text-darkest-blue font-black capitalize">
                        {pokemon}
                    </span>
                    <span>
                        {
                            data.characteristics[0]
                                .characteristics_description[0].description
                        }
                    </span>
                </>
            )}
        </div>
    )
}

export default PokemonInfo
