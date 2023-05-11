import {
    Header,
    SearchBar,
    PokemonsWrap,
    PokemonInfo,
} from '../components/layout'

export type PokemonApiData = {
    count: number
    next: string
    previous: null | string
    results: PokemonsList[]
}
export type PokemonsList = { name: string; url: string }

async function getData() {
    const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=20&limit=20`,
        { cache: 'force-cache' }
    )
    return res.json()
}

export default async function Home() {
    const data = await getData()
    return (
        <main className="flex min-h-screen flex-col items-center gap-5 p-7">
            <Header />
            <SearchBar />
            <div className="flex w-9/12 gap-3">
                <PokemonsWrap {...data} />
                <PokemonInfo />
            </div>
        </main>
    )
}
