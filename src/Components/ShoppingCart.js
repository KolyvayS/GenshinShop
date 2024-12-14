import React from 'react'
import { FaTrash } from 'react-icons/fa'

export default function ShoppingCart({order, onDelete, onIncrease, onReduce, closeCart, onShowPayment}) {
    const showOrder = itemList => {
        let index = 0
        let sum = 0
        order.forEach(el => sum += Number.parseFloat(el.price*el.quantity))
        return(<div>
            <div className='close-tab' onClick={() => closeCart('none')}>х</div>
            <ul>
                {itemList.map(item => 
                    <li className='item' key={index++}>
                        <img alt={item.title} src={'./img/' + item.img} />
                        <h2>{item.title}</h2>
                        <div className='item-info'>
                            <b>{item.price*item.quantity}₴</b>
                            <div>
                                <button onClick={() => onIncrease(item)}>+</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => onReduce(item.id)}>-</button>
                            </div>
                        </div>
                        <FaTrash className='delete-icon' onClick={() => onDelete(item.id)}/>
                    </li>
                )}
            </ul>
            <div className='results'>
                <p className='sum'>Сума: {new Intl.NumberFormat().format(sum)}₴</p>
                <button onClick={onShowPayment}>Замовити</button>
            </div>
        </div>)
    }

    const emptyCart = () => {
        return (
            <div className='empty-cart'>
                <div className='close-tab' onClick={() => closeCart('none')}>х</div>
                <p>Ваша корзина порожня</p>
            </div>
        )
    }
    
    return (
        <div className='shopping-cart'>
            {order.length > 0 ? showOrder(order) : emptyCart()}
        </div>
    )
}
