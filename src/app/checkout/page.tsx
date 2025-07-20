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

export default function CheckoutPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [selectedStrain, setSelectedStrain] = useState<any>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [quantity, setQuantity] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth')
      return
    }

    // Get selected strain from localStorage
    const strainData = localStorage.getItem('selectedStrain')
    if (strainData) {
      const strain = JSON.parse(strainData)
      setSelectedStrain(strain)
      setTotal(45.00 * quantity)
    }

    // Get cart from localStorage
    const cartData = localStorage.getItem('cart')
    if (cartData) {
      setCart(JSON.parse(cartData))
    }
  }, [user, loading, router, quantity])

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
      setTotal(45.00 * newQuantity)
    }
  }

  const handlePlaceOrder = () => {
    // Simulate order placement
    alert('Order placed successfully! You will receive a confirmation email shortly.')
    
    // Clear localStorage and redirect
    localStorage.removeItem('selectedStrain')
    localStorage.removeItem('cart')
    router.push('/dashboard')
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!selectedStrain) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Product Selected</h1>
          <button 
            onClick={() => router.push('/dashboard')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700"
          >
            Back to Recommendations
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your cannabis purchase</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Product Details</h2>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-900 text-lg">{selectedStrain.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedStrain.type === 'indica' ? 'bg-purple-100 text-purple-700' :
                  selectedStrain.type === 'sativa' ? 'bg-green-100 text-green-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {selectedStrain.type}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-3">{selectedStrain.description}</p>
              
              <div className="space-y-2 mb-4">
                <div>
                  <span className="text-green-600 font-medium text-sm">Effects: </span>
                  <span className="text-gray-700 text-sm">{selectedStrain.effects?.slice(0, 3).join(', ')}</span>
                </div>
                <div>
                  <span className="text-green-600 font-medium text-sm">THC: </span>
                  <span className="text-gray-700 text-sm">{selectedStrain.thc_content}</span>
                </div>
                <div>
                  <span className="text-green-600 font-medium text-sm">Flavors: </span>
                  <span className="text-gray-700 text-sm">{selectedStrain.flavors?.slice(0, 2).join(', ')}</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button 
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="px-3 py-1 text-gray-600 hover:text-gray-800"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:text-gray-800"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">${total.toFixed(2)}</div>
                  <div className="text-sm text-gray-500">per 1/8 oz</div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
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

            {/* Payment Method */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="radio" name="payment" className="mr-2" defaultChecked />
                  <span className="text-gray-700">Credit Card</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="payment" className="mr-2" />
                  <span className="text-gray-700">PayPal</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="payment" className="mr-2" />
                  <span className="text-gray-700">Cash on Delivery</span>
                </label>
              </div>
            </div>

            {/* Place Order Button */}
            <button 
              onClick={handlePlaceOrder}
              className="w-full bg-green-600 text-white py-4 rounded-lg font-medium text-lg hover:bg-green-700 transition-colors"
            >
              Place Order - ${(total * 1.1).toFixed(2)}
            </button>

            <div className="mt-4 text-center">
              <button 
                onClick={() => router.push('/dashboard')}
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                ← Back to Recommendations
              </button>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span className="text-green-800 text-sm font-medium">Secure checkout protected by 256-bit SSL encryption</span>
          </div>
        </div>
      </div>
    </div>
  )
}