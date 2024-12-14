import React from 'react'
import { useState } from 'react'
import { itemsData } from './Components/ItemsData.js'
import Header from './Components/Header.js'
import Footer from './Components/Footer.js'
import Items from './Components/Items.js'
import Categories from './Components/Categories.js'
import ItemPage from './Components/ItemPage.js'
import Payment from './Components/Payment.js'

export default function App() {
  const [ order, setOrder ] = useState([])
  const [ actualTab, setActualTab ] = useState('none')
  const [ currentItems, setCurrentItems ] = useState(itemsData)
  const [ currentCategory, setCurrentCategory ] = useState('all')
  const [ showPayment, setShowPayment ] = useState(false)
  const [ showItemPage, setShowItemPage ] = useState(false)
  const [ itemPage, setItemPage ] = useState({})
  
  function deleteFromOrder(id) {
    setOrder(order.filter(item => item.id !== id))
  }

  function reduceQuantity(id) {
    let existingItem = order.find(el => el.id === id)
    if(existingItem.quantity > 1) {
      setOrder(order.map(el => el.id === id ? {...el, quantity: el.quantity - 1} : el))
    }
    else deleteFromOrder(id)
  }

  function addToOrder(item) {
    let existingItem = order.find(el => el.id === item.id)
    if (existingItem) {
      setOrder(order.map(el => el.id === item.id ? {...el, quantity: el.quantity + 1} : el))
    }
    else setOrder([...order, {...item, quantity: 1}])
  }

  function chooseCategory(category) {
    setCurrentCategory(category)
    if(category === 'all') {
      setCurrentItems(itemsData)
      return
    }
    setCurrentItems(itemsData.filter(el => el.category === category))
  }

  function onShowPayment() {
    setShowPayment(!showPayment)
  }

  function onShowItemPage(item) {
    setItemPage(item)
    setShowItemPage(!showItemPage)
  }

  function startNewOrder() {
    setShowPayment(false)
    setOrder([])
    chooseCategory('all')
    setActualTab('none')
  }

  return (
    <div className="wrapper">
      <Header 
        order={order} 
        actualTab={actualTab} 
        setActualTab={setActualTab} 
        onDelete={deleteFromOrder} 
        onReduce={reduceQuantity} 
        onIncrease={addToOrder} 
        onShowPayment={onShowPayment}
      />
      <Categories chooseCategory={chooseCategory} currentCategory={currentCategory}/>
      <Items onShowItemPage={onShowItemPage} items={currentItems} onAdd={addToOrder}/>
      {showItemPage && 
        <ItemPage item={itemPage} onAdd={addToOrder} onShowItemPage={onShowItemPage}/>}
      {showPayment && 
        <Payment onShowPayment={onShowPayment} close={startNewOrder}/>}
      <Footer />
    </div>
  );
}