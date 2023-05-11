'use client'
import React from 'react'
import { PokemonApiData, PokemonsList } from '@/app/page'

interface SPokemonsWrap {
    pokemons?: PokemonsList[]
}

export default class PokemonsWrap extends React.Component<
    PokemonApiData,
    SPokemonsWrap
> {
    constructor(props: PokemonApiData) {
        super(props)
        this.state = {
            pokemons: this.props.results,
        }
    }
    render() {
        return (
            <div className="grid grid-cols-3 gap-x-2 gap-y-14 w-full">
                {this.state.pokemons?.map((pokemon, i) => (
                    <div
                        key={i}
                        className="p-6 w-full h-40 bg-white rounded-xl shadow-lg flex items-center justify-center space-x-4"
                    >
                        {pokemon.name}
                    </div>
                ))}
            </div>
        )
    }
}
