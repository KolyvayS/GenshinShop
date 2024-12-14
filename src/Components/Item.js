import React from 'react'

export default function Item({item, onAdd, onShowItemPage}) {
  return (
    <div className='item'>
        <img alt={item.title} src={'./img/' + item.img} onClick={() => onShowItemPage(item)}/>
        <h2>{item.title}</h2>
        <p>{item.desc}</p>
        <b>{item.price}₴</b>
        <div className='add-to-cart' onClick={() => onAdd(item)}>+</div>
    </div>
  )
}
