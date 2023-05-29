import { Metadata } from 'next'
import {
    Header,
    SearchBar,
    PokemonsWrap,
    PokemonInfo,
} from '../components/layout'

export const metadata: Metadata = {
    title: 'Pokémon Website',
}

export default async function Home() {
    return (
        <main className="flex flex-col items-center gap-5 mx-64 h-5/6 container">
            <Header />
            <SearchBar />
            <div className="flex w-full gap-4 overflow-hidden">
                <PokemonsWrap />
                <PokemonInfo />
            </div>
        </main>
    )
}
