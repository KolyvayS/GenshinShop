import React from 'react'

export default function Categories({chooseCategory, currentCategory}) {
  const categories = [
    {
        key: 'all',
        name: 'Всі товари'
    },
    {
        key: 'plasticFigure',
        name: 'Пластикові фігурки'
    },
    {
        key: 'acrylicFigure',
        name: 'Акрилові фігурки'
    },
    {
        key: 'charm',
        name: 'Брелки'
    },
    {
        key: 'mousePad',
        name: 'Коврики для миші'
    }
  ]

  return (
    <div className='categories'>
        {categories.map(category => (
            <button 
                key={category.key} 
                onClick={() => chooseCategory(category.key)}
                className={currentCategory === category.key ? 'active-category' : ''}
            >
                {category.name}
            </button>
        ))}
    </div>
  )
}