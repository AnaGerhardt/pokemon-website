'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { getPokemonsList, getPokemonSearch } from '../../queries/pokemonApi'
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import debounce from 'lodash.debounce'

type PokemonApiData = {
    pokemonsList: PokemonsList[]
}
type PokemonsList = { id: number; name: string }

const PokemonsWrap = () => {
    const router = useRouter()
    const containerRef = useRef<HTMLDivElement>(null)
    const searchParams = useSearchParams()
    const search = searchParams?.get('search')
    const [isScrollAtBottom, setIsScrollAtBottom] = useState(false)
    const [offset, setOffset] = useState(0)
    const [pokemons, setPokemons] = useState<PokemonsList[]>([])
    const [pokemonSearch, setPokemonSearch] = useState<PokemonsList[]>([])
    const { data, refetch } = useQuery<PokemonApiData>(getPokemonsList, {
        variables: {
            limit: 9,
            offset,
        },
        skip: !!search,
    })
    const { data: dataSearch } = useQuery<PokemonApiData>(getPokemonSearch, {
        variables: {
            name: search,
        },
        skip: !search,
    })

    const openPokemonDetails = (id: number, name: string) => {
        router.push(`/?id=${id}&pokemon=${name}`)
    }

    const handleScroll = () => {
        const scrollableDiv = containerRef?.current
        if (scrollableDiv) {
            const isScrollAtBottom =
                scrollableDiv.scrollHeight -
                    Math.ceil(scrollableDiv.scrollTop) ===
                470
            setIsScrollAtBottom(isScrollAtBottom)
        }
    }

    useEffect(() => {
        const scrollableDiv = containerRef?.current
        const handleDebouncedScroll = debounce(() => handleScroll(), 200)
        scrollableDiv?.addEventListener('scroll', handleDebouncedScroll)
        return () => {
            scrollableDiv?.removeEventListener('scroll', handleDebouncedScroll)
        }
    }, [])

    useEffect(() => {
        if (isScrollAtBottom) {
            setOffset((o) => o + 9)
        }
    }, [isScrollAtBottom])

    useEffect(() => {
        refetch({
            offset,
        })
    }, [offset, refetch])

    useEffect(() => {
        if (data) {
            setPokemons((p) => [...p, ...data.pokemonsList])
        }
        if (dataSearch) {
            setPokemonSearch(dataSearch.pokemonsList)
        }
    }, [data, dataSearch])

    return (
        <div className="w-full h-full">
            <div
                ref={containerRef}
                className="grid grid-cols-3 gap-x-4 gap-y-8 w-full h-full overflow-auto"
            >
                {(pokemonSearch.length > 0 ? pokemonSearch : pokemons).map(
                    (pokemon) => (
                        <div
                            key={pokemon.id}
                            className="p-6 w-full h-44 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center cursor-pointer"
                            onClick={() =>
                                openPokemonDetails(pokemon.id, pokemon.name)
                            }
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
                    )
                )}
            </div>
        </div>
    )
}

export default PokemonsWrap
