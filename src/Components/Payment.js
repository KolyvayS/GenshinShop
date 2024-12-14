import React from 'react'
import { useState } from 'react'

export default function Payment({onShowPayment, close}) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        novaPoshta: '',
        cardNumber: '',
        expiration: '',
        cvv: ''
    })
    const [ errors, setErrors ] = useState({})
    const [ successfulPayment, setSuccessfulPayment ] = useState(false)
    const [ orderId, setOrderId ] = useState(null)

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        })
    }

    const validate = () => {
        const newErrors = {}


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Неправильний формат електронної пошти"
        }

        const phoneRegex = /^\+380\d{9}$/;
        if (!phoneRegex.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Номер телефону повинен починатися з +380 та містити ще 9 цифр"
        }

        if (!/^\d{16}$/.test(formData.cardNumber)) {
            newErrors.cardNumber = "Номер картки повинен містити 16 цифр"
        }

        const expirationRegex = /^(0[1-9]|1[0-2])\/\d{2}$/
        if (!expirationRegex.test(formData.expiration)) {
            newErrors.expiration = "Термін дії картки повинен бути у форматі MM/YY"
        }

        if (!/^\d{3}$/.test(formData.cvv)) {
            newErrors.cvv = "CVV повинен містити 3 цифри"
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0
    }

    const generateOrderNumber = () => {
        let now = new Date();
        let day = String(now.getDate()).padStart(2, '0')
        let month = String(now.getMonth() + 1).padStart(2, '0')
        let randomNumber = Math.floor(1000 + Math.random() * 9000)
        let newOrderNumber =  `${day}${month}-${randomNumber}`
        setOrderId(newOrderNumber)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            generateOrderNumber()
            setSuccessfulPayment(true)
            console.log('Дані форми:', formData)
            // Механізм оплати
            // Відправка замовлення на сервер
        } else {
            console.log('Форма містить помилки:', errors)
        }
    }

  return (
    <div className='page-background'>
        {successfulPayment ? 
            <div className='successful-payment'>
                <div className='close-page' onClick={() => close()}>х</div>
                <p>Замовлення №{orderId} прийнято в обробку. <br/> Зараз ми Вам зателефонуємо.</p>
            </div>
            :
            <form className='payment-content' onSubmit={handleSubmit}>
                <div>
                    <label>Ім'я:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>Електрона пошта:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    {errors.email && <div className="error">{errors.email}</div>}
                </div>
                <div>
                    <label>Номер телефону:
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="+380XXXXXXXXX"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
                </div>
                <div>
                    <label>Відділення Нової Пошти:
                        <input
                            type="text"
                            name="novaPoshta"
                            value={formData.novaPoshta}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>Номер картки:
                        <input  
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    {errors.cardNumber && <div className="error">{errors.cardNumber}</div>}
                </div>
                <div>
                    <label>CVV та термін дії карти:
                        <div>
                            <input
                                type="text"
                                name="cvv"
                                placeholder="CVV"
                                value={formData.cvv}
                                onChange={handleChange}
                                required
                            />
                            {errors.cvv && <div className="error">{errors.cvv}</div>}
                            <input
                                type="text"
                                name="expiration"
                                placeholder="MM/YY"
                                value={formData.expiration}
                                onChange={handleChange}
                                required
                            />
                            {errors.expiration && <div className="error">{errors.expiration}</div>}
                        </div>
                    </label>
                </div>
                <div className='buttons-container'>
                    <button type="submit">
                        Підтвердити
                    </button>
                    <button onClick={(e) => {
                        e.preventDefault()
                        onShowPayment()
                    }}>
                        Повернутися
                    </button>
                </div>
            </form>}
    </div>
  )
}
