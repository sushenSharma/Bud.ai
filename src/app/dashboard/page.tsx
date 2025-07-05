'use client'

import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedEffects, setSelectedEffects] = useState<string[]>([])
  const [selectedFormat, setSelectedFormat] = useState<string>('')
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([])
  const [selectedStrength, setSelectedStrength] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')

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

  const findStrains = () => {
    console.log('Finding strains with:', {
      effects: selectedEffects,
      format: selectedFormat,
      flavors: selectedFlavors,
      strength: selectedStrength
    })
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

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          {renderStepContent()}
        </div>

        {/* Search Alternative */}
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

        {/* Navigation */}
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
              disabled={!canProceed()}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                canProceed()
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Find My Strains
            </button>
          )}
        </div>

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
  )
}