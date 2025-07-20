'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../contexts/AuthContext'

interface CartItem {
  id: string
  name: string
  type: string
  price: number
  quantity: number
  image: string
}

export default function CartPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [cart, setCart] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth')
      return
    }

    // Load cart from localStorage
    const cartData = localStorage.getItem('cart')
    if (cartData) {
      const cartItems = JSON.parse(cartData)
      setCart(cartItems)
      
      // Calculate total
      const totalAmount = cartItems.reduce((sum: number, item: CartItem) => 
        sum + (item.price * item.quantity), 0)
      setTotal(totalAmount)
    }
  }, [user, loading, router])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }

    const updatedCart = cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
    
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    
    // Recalculate total
    const totalAmount = updatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    setTotal(totalAmount)
  }

  const removeItem = (id: string) => {
    const updatedCart = cart.filter(item => item.id !== id)
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    
    // Recalculate total
    const totalAmount = updatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    setTotal(totalAmount)
  }

  const clearCart = () => {
    setCart([])
    setTotal(0)
    localStorage.removeItem('cart')
  }

  const proceedToCheckout = () => {
    if (cart.length === 1) {
      // If only one item, use the single item checkout flow
      const strain = cart[0]
      localStorage.setItem('selectedStrain', JSON.stringify({
        id: strain.id,
        name: strain.name,
        type: strain.type,
        description: `Premium ${strain.type} strain`,
        effects: ['relaxed', 'happy'],
        thc_content: '15-20%',
        flavors: ['earthy', 'pine']
      }))
    }
    router.push('/checkout')
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">Review your selected strains</p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0h9" />
            </svg>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Discover strains that match your preferences</p>
            <button 
              onClick={() => router.push('/dashboard')}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700"
            >
              Find My Strains
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.type === 'indica' ? 'bg-purple-100 text-purple-700' :
                          item.type === 'sativa' ? 'bg-green-100 text-green-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {item.type}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-gray-600 hover:text-gray-800"
                            >
                              -
                            </button>
                            <span className="px-4 py-1 border-x border-gray-300">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-600 hover:text-gray-800"
                            >
                              +
                            </button>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                          <div className="text-sm text-gray-500">${item.price.toFixed(2)} each</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <button 
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="text-gray-900">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">${(total * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">${(total * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={proceedToCheckout}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors mb-3"
              >
                Proceed to Checkout
              </button>
              
              <button 
                onClick={() => router.push('/dashboard')}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}