import React from 'react'
import Item from './Item.js'


export default function Items({items, onAdd, onShowItemPage}) {
    return (
        <main>
            {items.map(item => (
                <Item onShowItemPage={onShowItemPage} key={item.id} item={item} onAdd={onAdd}/>
            ))}
        </main>
    )
}
