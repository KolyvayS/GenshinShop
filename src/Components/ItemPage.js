import React from 'react'

export default function ItemPage({item, onAdd, onShowItemPage}) {
  return (
    <div className='page-background'>
        <div className='item-content'>
            <div className='close-page' onClick={() => onShowItemPage(item)}>х</div>
            <img alt={item.title} src={'./img/' + item.img} />
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
            <b>{item.price}₴</b>
            <div className='add-to-cart' onClick={() => onAdd(item)}>+</div>
        </div>
    </div>
  )
}
