import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import ShoppingCart from './ShoppingCart.js'

export default function Header({
                                  order, 
                                  actualTab, 
                                  setActualTab, 
                                  onDelete, 
                                  onReduce, 
                                  onIncrease, 
                                  onShowPayment}) 
{
  const renderTabContent = () => {
    switch(actualTab) {
      case 'cart':
        return(<ShoppingCart 
                  order={order} 
                  onDelete={onDelete} 
                  onIncrease={onIncrease} 
                  onReduce={onReduce} 
                  closeCart={setActualTab}
                  onShowPayment={onShowPayment}/>);
      case 'shop-info':
        return(<div className='shop-info'>
          <div className='close-tab' onClick={() => setActualTab('none')}>х</div>
          <h2>Genshin shop</h2>
          <p>
            Ми український магазин з власним імпортом товарів
            по грі Genshin Impact з Китаю, вже 5 років на ринку
            та посідаємо перше місце по продажам.
          </p>
        </div>);
      case 'contacts':
        return(<div className='contacts'>
          <div className='close-tab' onClick={() => setActualTab('none')}>х</div>
          <p><b>Телефон:</b> +380123456789</p>
          <p><b>Email:</b> genshinShop@email.com</p>
          <p><b>Адреса:</b> м. Київ вул. Іграшкова 4</p>
        </div>);
      default:
        return null
    }
  }

  return (
    <header>
        <div>
            <div className='header-text'>
              <span className="logo">Genshin Shop</span>
              <ul className='nav'>
                  <li onClick={() => actualTab === 'cart' ?  setActualTab('none') : setActualTab('cart')}> 
                    <FaShoppingCart  className={`shopping-cart-icon ${actualTab === 'cart'  && 'active'}`}/>
                    Кошик
                  </li>
                  <li onClick={() => actualTab === 'shop-info' ?  setActualTab('none') : setActualTab('shop-info')}>
                    Про нас
                  </li>
                  <li onClick={() => actualTab === 'contacts' ?  setActualTab('none') : setActualTab('contacts')}>
                    Контакти
                  </li>
              </ul>
            </div>
            {renderTabContent()}
        </div>
        <div className="presentation"></div>
    </header>
  )
}
