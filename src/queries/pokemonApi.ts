import { gql } from '@apollo/client'

export const getPokemonsList = gql`
    query getPokemonsList {
        pokemonsList: pokemon_v2_pokemon(limit: 9, offset: 0) {
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
