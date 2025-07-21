'use client'

import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Strain } from '@/lib/database.types'

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const effects = [
  { id: 'creative', name: 'Creative', icon: '💡' },
  { id: 'energized', name: 'Energized', icon: '⚡' },
  { id: 'focused', name: 'Focused', icon: '🎯' },
  { id: 'euphoric', name: 'Euphoric', icon: '🌟' },
  { id: 'giggly', name: 'Giggly', icon: '😄' },
  { id: 'sleepy', name: 'Sleepy', icon: '😴' },
  { id: 'relaxed', name: 'Relaxed', icon: '🧘' },
  { id: 'tingly', name: 'Tingly', icon: '✨' },
]

const formats = [
  { id: 'flower', name: 'Flower', icon: '🌸' },
  { id: 'vape', name: 'Vape', icon: '💨' },
  { id: 'edibles', name: 'Edibles', icon: '🍪' },
  { id: 'concentrate', name: 'Concentrate', icon: '🧪' },
  { id: 'preroll', name: 'Pre-roll', icon: '🚬' },
  { id: 'tincture', name: 'Tincture', icon: '💧' },
]

const flavors = [
  { id: 'citrus', name: 'Citrus', icon: '🍊' },
  { id: 'berry', name: 'Berry', icon: '🫐' },
  { id: 'pine', name: 'Pine', icon: '🌲' },
  { id: 'floral', name: 'Floral', icon: '🌺' },
  { id: 'earthy', name: 'Earthy', icon: '🌍' },
  { id: 'spicy', name: 'Spicy', icon: '🌶️' },
  { id: 'sweet', name: 'Sweet', icon: '🍯' },
  { id: 'diesel', name: 'Diesel', icon: '⛽' },
]

const strengths = [
  { id: 'low', name: 'Low (5-15% THC)', description: 'Gentle, mild effects' },
  { id: 'medium', name: 'Medium (15-25% THC)', description: 'Balanced potency' },
  { id: 'high', name: 'High (25%+ THC)', description: 'Strong, intense effects' },
  { id: 'cbd', name: 'CBD Dominant', description: 'Therapeutic, non-psychoactive' },
]

const cannabisFacts = [
  "Cannabis has been used medicinally for over 5,000 years across various cultures.",
  "There are over 100 different cannabinoids found in the cannabis plant.",
  "The 'entourage effect' suggests cannabinoids work better together than in isolation.",
  "Cannabis terpenes give strains their unique aromas and may influence effects.",
  "Indica and Sativa classifications are more about plant structure than effects.",
  "CBD was first isolated from cannabis in 1940 by American chemist Roger Adams.",
  "The human body has an endocannabinoid system that naturally produces cannabis-like compounds.",
  "Cannabis plants can be male, female, or hermaphrodite.",
  "Hemp and marijuana are both cannabis, but hemp contains less than 0.3% THC.",
  "The first cannabis laws in America actually required farmers to grow hemp.",
  "Cannabis seeds are considered a superfood, containing all essential amino acids.",
  "Some cannabis strains can contain over 30% THC in optimal growing conditions.",
  "The cannabis plant has been found to have over 400 chemical compounds.",
  "Myrcene is the most common terpene in cannabis and promotes relaxation.",
  "Cannabis prohibition began in the 1930s, largely due to economic and racial factors."
]

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedEffects, setSelectedEffects] = useState<string[]>([])
  const [selectedFormat, setSelectedFormat] = useState<string>('')
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([])
  const [selectedStrength, setSelectedStrength] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [recommendations, setRecommendations] = useState<Strain[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [currentFactIndex, setCurrentFactIndex] = useState(0)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const handleEffectToggle = (effectId: string) => {
    if (selectedEffects.includes(effectId)) {
      setSelectedEffects(selectedEffects.filter(id => id !== effectId))
    } else if (selectedEffects.length < 2) {
      setSelectedEffects([...selectedEffects, effectId])
    }
  }

  const handleFlavorToggle = (flavorId: string) => {
    if (selectedFlavors.includes(flavorId)) {
      setSelectedFlavors(selectedFlavors.filter(id => id !== flavorId))
    } else if (selectedFlavors.length < 2) {
      setSelectedFlavors([...selectedFlavors, flavorId])
    }
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedEffects.length > 0
      case 2: return selectedFormat !== ''
      case 3: return selectedFlavors.length > 0
      case 4: return selectedStrength !== ''
      default: return false
    }
  }

  const findStrains = async () => {
    setIsSearching(true)
    setError('')
    setLoadingProgress(0)
    setCurrentFactIndex(0)
    
    // Start the loading animation and fact cycling
    const factInterval = setInterval(() => {
      setCurrentFactIndex(prev => (prev + 1) % cannabisFacts.length)
    }, 4000) // Change fact every 4 seconds

    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 90) return prev
        return prev + Math.random() * 15
      })
    }, 300) // Update progress every 300ms
    
    try {
      const preferences = {
        effects: selectedEffects,
        type: selectedFormat === 'flower' ? 'hybrid' : 'hybrid', // Map format to strain type
        flavors: selectedFlavors,
        medical_uses: [], // Could be added in future
        experience_level: selectedStrength === 'low' ? 'beginner' : selectedStrength === 'high' ? 'experienced' : 'intermediate'
      }
      
      console.log('Getting recommendations for preferences:', preferences)
      
      // Add minimum loading time for better UX
      const [response] = await Promise.all([
        fetch('/api/recommendations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(preferences),
        }),
        new Promise(resolve => setTimeout(resolve, 4000)) // Minimum 4 seconds of loading
      ])
      
      const data = await response.json()
      
      // Complete the progress bar
      setLoadingProgress(100)
      
      // Show completion for a moment
      setTimeout(() => {
        clearInterval(factInterval)
        clearInterval(progressInterval)
        
        if (response.ok && data.success) {
          setRecommendations(data.recommendations)
          setShowResults(true)
        } else {
          setError(data.error || 'Failed to get recommendations')
        }
        setIsSearching(false)
      }, 500)

    } catch {
      clearInterval(factInterval)
      clearInterval(progressInterval)
      setError('Network error. Please try again.')
      setIsSearching(false)
    }
  }

  const resetSearch = () => {
    setCurrentStep(1)
    setSelectedEffects([])
    setSelectedFormat('')
    setSelectedFlavors([])
    setSelectedStrength('')
    setRecommendations([])
    setShowResults(false)
    setError('')
  }

  const handleBuyNow = (strain: Strain) => {
    // Format strain name for URL (replace spaces with hyphens, lowercase, add number suffix)
    const formattedStrainName = strain.name.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    
    // Create BC Cannabis Stores URL with strain information
    const bcCannabisUrl = `https://www.bccannabisstores.com/collections/new-products/products/${formattedStrainName}-5?ref=budai&utm_source=budai&utm_medium=recommendation`
    
    // Track the recommendation click (optional analytics)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase_intent', {
        strain_name: strain.name,
        strain_type: strain.type,
        referral_source: 'budai_recommendation'
      })
    }
    
    // Open BC Cannabis Stores in new tab
    window.open(bcCannabisUrl, '_blank', 'noopener,noreferrer')
  }

  const handleAddToCart = (strain: Strain) => {
    // For "Add to Cart", redirect to BC Cannabis Stores search or collection page
    const bcCannabisSearchUrl = `https://www.bccannabisstores.com/search?q=${encodeURIComponent(strain.name)}&ref=budai&utm_source=budai&utm_medium=search`
    
    // Show a message and redirect
    alert(`Redirecting you to BC Cannabis Stores to find ${strain.name}!`)
    
    // Track the add to cart click
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'add_to_cart_intent', {
        strain_name: strain.name,
        strain_type: strain.type,
        referral_source: 'budai_recommendation'
      })
    }
    
    // Open BC Cannabis Stores search in new tab
    window.open(bcCannabisSearchUrl, '_blank', 'noopener,noreferrer')
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">How do you want to feel?</h2>
              <p className="text-gray-600">Select up to two effects</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {effects.map((effect) => (
                <button
                  key={effect.id}
                  onClick={() => handleEffectToggle(effect.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedEffects.includes(effect.id)
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{effect.icon}</div>
                  <div className="font-medium text-gray-900">{effect.name}</div>
                </button>
              ))}
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What format do you prefer?</h2>
              <p className="text-gray-600">Choose your preferred consumption method</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {formats.map((format) => (
                <button
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedFormat === format.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{format.icon}</div>
                  <div className="font-medium text-gray-900">{format.name}</div>
                </button>
              ))}
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What flavors do you enjoy?</h2>
              <p className="text-gray-600">Select up to two flavors</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {flavors.map((flavor) => (
                <button
                  key={flavor.id}
                  onClick={() => handleFlavorToggle(flavor.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedFlavors.includes(flavor.id)
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{flavor.icon}</div>
                  <div className="font-medium text-gray-900">{flavor.name}</div>
                </button>
              ))}
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What strength do you prefer?</h2>
              <p className="text-gray-600">Choose your preferred potency level</p>
            </div>
            <div className="space-y-4">
              {strengths.map((strength) => (
                <button
                  key={strength.id}
                  onClick={() => setSelectedStrength(strength.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedStrength === strength.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">{strength.name}</div>
                  <div className="text-sm text-gray-600">{strength.description}</div>
                </button>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-black">BUD.ai</span>
            <span className="text-sm text-gray-500">Welcome, {user.email}</span>
          </div>
          <button
            onClick={handleSignOut}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  step <= currentStep
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step}
              </div>
              {step < 4 && (
                <div
                  className={`w-20 h-1 mx-2 ${
                    step < currentStep ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Labels */}
        <div className="flex justify-between mb-8 text-sm">
          <span className={currentStep >= 1 ? 'text-green-600 font-medium' : 'text-gray-500'}>
            Effects
          </span>
          <span className={currentStep >= 2 ? 'text-green-600 font-medium' : 'text-gray-500'}>
            Format
          </span>
          <span className={currentStep >= 3 ? 'text-green-600 font-medium' : 'text-gray-500'}>
            Flavors
          </span>
          <span className={currentStep >= 4 ? 'text-green-600 font-medium' : 'text-gray-500'}>
            Strength
          </span>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Loading Screen */}
        {isSearching ? (
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="text-center">
              {/* Simple Loading Icon */}
              <div className="mb-6">
                <div className="mx-auto w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
              </div>

              {/* Loading Text */}
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Finding Your Perfect Match...
              </h2>
              
              {/* Progress Bar */}
              <div className="w-full max-w-md mx-auto mb-8">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-green-600 h-1.5 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${loadingProgress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {Math.round(loadingProgress)}% complete
                </div>
              </div>

              {/* Cannabis Facts */}
              <div className="bg-gray-50 rounded-lg p-6 max-w-2xl mx-auto">
                <div className="text-left">
                  <h3 className="text-sm font-medium text-gray-600 mb-3 flex items-center">
                    <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                    </svg>
                    Cannabis Fact
                  </h3>
                  <p 
                    key={currentFactIndex}
                    className="text-gray-700 leading-relaxed text-sm"
                    style={{
                      opacity: 1,
                      transition: 'opacity 0.3s ease-in-out'
                    }}
                  >
                    {cannabisFacts[currentFactIndex]}
                  </p>
                </div>
              </div>

              {/* Simple Status */}
              <div className="mt-6 text-xs text-gray-500">
                Analyzing your preferences and matching with our strain database...
              </div>
            </div>
          </div>
        ) : showResults && recommendations.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Personalized Recommendations</h2>
              <p className="text-gray-600">Based on your preferences, here are the best strains for you:</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {recommendations.slice(0, 4).map((strain) => (
                <div key={strain.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900 text-lg">{strain.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      strain.type === 'indica' ? 'bg-purple-100 text-purple-700' :
                      strain.type === 'sativa' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {strain.type}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{strain.description}</p>
                  <div className="space-y-2 mb-4">
                    <div>
                      <span className="text-green-600 font-medium text-sm">Effects: </span>
                      <span className="text-gray-700 text-sm">{strain.effects.slice(0, 3).join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-green-600 font-medium text-sm">THC: </span>
                      <span className="text-gray-700 text-sm">{strain.thc_content}</span>
                    </div>
                    <div>
                      <span className="text-green-600 font-medium text-sm">Flavors: </span>
                      <span className="text-gray-700 text-sm">{strain.flavors.slice(0, 2).join(', ')}</span>
                    </div>
                  </div>
                  
                  {/* Purchase Options */}
                  <div className="border-t pt-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">$45.00</span>
                      <span className="text-sm text-gray-500">per 1/8 oz</span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleBuyNow(strain)}
                        className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                      >
                        <span>Buy at BC Cannabis</span>
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleAddToCart(strain)}
                        className="flex-1 border border-green-600 text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors flex items-center justify-center"
                      >
                        <span>Search BC Cannabis</span>
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center space-x-4">
              <button 
                onClick={() => window.open('https://www.bccannabisstores.com/collections/new-products?ref=budai&utm_source=budai&utm_medium=view_all', '_blank', 'noopener,noreferrer')}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors inline-flex items-center"
              >
                <span>Browse All at BC Cannabis Stores</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
              <button
                onClick={resetSearch}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-block"
              >
                New Search
              </button>
            </div>
            
            {/* BC Cannabis Stores Partnership Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
                <div>
                  <h4 className="text-green-800 font-semibold mb-1">Powered by BC Cannabis Stores</h4>
                  <p className="text-green-700 text-sm">
                    We&apos;ve partnered with BC Cannabis Stores to provide you with access to premium, government-regulated cannabis products. 
                    When you click &quot;Buy at BC Cannabis&quot; or &quot;Search BC Cannabis&quot;, you&apos;ll be redirected to their secure platform to purchase your selected strains.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : !showResults ? (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            {renderStepContent()}
          </div>
        ) : null}

        {/* Search Alternative */}
        {!showResults && (
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-4">or</p>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for your favorite strain"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white px-4 py-2 rounded-full text-sm hover:bg-green-700 transition-colors">
                  StrainMe™
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        {!showResults && (
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  canProceed()
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            ) : (
              <button
                onClick={findStrains}
                disabled={isSearching || !canProceed()}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  canProceed() && !isSearching
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSearching ? 'Finding Strains...' : 'Find My Strains'}
              </button>
            )}
          </div>
        )}

        {/* Terms */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            By using this product, you agree to our{' '}
            <a href="#" className="text-green-600 hover:underline">Terms</a> and{' '}
            <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
      </div>
    </>
  )
}