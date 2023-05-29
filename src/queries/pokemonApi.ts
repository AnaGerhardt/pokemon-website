import { gql } from '@apollo/client'

export const getPokemonsList = gql`
    query getPokemonsList($limit: Int!, $offset: Int!) {
        pokemonsList: pokemon_v2_pokemon(limit: $limit, offset: $offset) {
            id
            name
        }
    }
`

export const getPokemonDetails = gql`
    query getPokemonDetails($id: Int!) {
        characteristics: pokemon_v2_characteristic(
            where: { id: { _eq: $id } }
        ) {
            characteristics_description: pokemon_v2_characteristicdescriptions(
                where: { language_id: { _eq: 9 } }
            ) {
                description
            }
        }
    }
`

export const getPokemonSearch = gql`
    query getPokemonsList($name: String!) {
        pokemonsList: pokemon_v2_pokemon(where: { name: { _like: $name } }) {
            id
            name
        }
    }
`
