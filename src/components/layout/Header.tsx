'use client'
import React from 'react'
import Image from 'next/image'

export default class Header extends React.Component {
    render() {
        const menuItems = [
            {
                text: 'Home',
            },
            {
                text: 'Pokedex',
            },
            {
                text: 'Videogames',
            },
            {
                text: 'GCC Pokemon',
            },
            {
                text: 'TV Pokemon',
            },
        ]
        return (
            <div className="p-6 w-9/12 bg-white rounded-xl shadow-lg flex items-center justify-center space-x-4">
                <ul className="flex flex-wrap items-center justify-center text-gray-900 font-bold dark:text-white">
                    {menuItems.map((m, i) => (
                        <li key={i}>
                            <a
                                href="#"
                                className="mr-4 hover:underline md:mr-6 text-slate-500"
                            >
                                {m.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}
