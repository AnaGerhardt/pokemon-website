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
        <main className="flex flex-col items-center gap-5 p-7 max-h-screen">
            <Header />
            <SearchBar />
            <div className="flex w-9/12 gap-4 max-h-full">
                <PokemonsWrap />
                <PokemonInfo />
            </div>
        </main>
    )
}
