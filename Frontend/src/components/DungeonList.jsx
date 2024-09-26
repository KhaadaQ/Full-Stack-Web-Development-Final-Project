import React from 'react'

const DungeonList = ({ dungeons }) => {
    return (
        <ul>
            {dungeons.map((dungeon) => (
                <li key={dungeon.id}>{dungeon.name}</li>
            ))}
        </ul>
    )
}

export default DungeonList