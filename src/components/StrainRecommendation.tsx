'use client'

import { useState } from 'react'
import { Strain } from '@/lib/database.types'

interface Preferences {
  effects: string[]
  type: string
  flavors: string[]
  medical_uses: string[]
  experience_level: string
}

const effects = [
  { id: 'relaxed', name: 'Relaxed', icon: '😌' },
  { id: 'happy', name: 'Happy', icon: '😊' },
  { id: 'euphoric', name: 'Euphoric', icon: '🌟' },
  { id: 'energetic', name: 'Energetic', icon: '⚡' },
  { id: 'focused', name: 'Focused', icon: '🎯' },
  { id: 'creative', name: 'Creative', icon: '💡' },
  { id: 'sleepy', name: 'Sleepy', icon: '😴' },
  { id: 'uplifted', name: 'Uplifted', icon: '🚀' },
]

const strainTypes = [
  { id: 'indica', name: 'Indica', description: 'Relaxing, body-focused' },
  { id: 'sativa', name: 'Sativa', description: 'Energizing, mind-focused' },
  { id: 'hybrid', name: 'Hybrid', description: 'Balanced effects' },
]

const flavors = [
  { id: 'citrus', name: 'Citrus', icon: '🍊' },
  { id: 'berry', name: 'Berry', icon: '🫐' },
  { id: 'pine', name: 'Pine', icon: '🌲' },
  { id: 'earthy', name: 'Earthy', icon: '🌍' },
  { id: 'sweet', name: 'Sweet', icon: '🍯' },
  { id: 'spicy', name: 'Spicy', icon: '🌶️' },
]

const medicalUses = [
  { id: 'stress', name: 'Stress' },
  { id: 'anxiety', name: 'Anxiety' },
  { id: 'pain', name: 'Pain' },
  { id: 'insomnia', name: 'Insomnia' },
  { id: 'depression', name: 'Depression' },
  { id: 'nausea', name: 'Nausea' },
]

export const StrainRecommendation = () => {
  const [step, setStep] = useState(1)
  const [preferences, setPreferences] = useState<Preferences>({
    effects: [],
    type: '',
    flavors: [],
    medical_uses: [],
    experience_level: ''
  })
  const [recommendations, setRecommendations] = useState<Strain[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleEffectToggle = (effectId: string) => {
    if (preferences.effects.includes(effectId)) {
      setPreferences(prev => ({
        ...prev,
        effects: prev.effects.filter(id => id !== effectId)
      }))
    } else if (preferences.effects.length < 3) {
      setPreferences(prev => ({
        ...prev,
        effects: [...prev.effects, effectId]
      }))
    }
  }

  const handleFlavorToggle = (flavorId: string) => {
    if (preferences.flavors.includes(flavorId)) {
      setPreferences(prev => ({
        ...prev,
        flavors: prev.flavors.filter(id => id !== flavorId)
      }))
    } else if (preferences.flavors.length < 2) {
      setPreferences(prev => ({
        ...prev,
        flavors: [...prev.flavors, flavorId]
      }))
    }
  }

  const handleMedicalToggle = (medicalId: string) => {
    if (preferences.medical_uses.includes(medicalId)) {
      setPreferences(prev => ({
        ...prev,
        medical_uses: prev.medical_uses.filter(id => id !== medicalId)
      }))
    } else if (preferences.medical_uses.length < 2) {
      setPreferences(prev => ({
        ...prev,
        medical_uses: [...prev.medical_uses, medicalId]
      }))
    }
  }

  const getRecommendations = async () => {
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      })
      
      const data = await response.json()
      
      if (response.ok && data.success) {
        setRecommendations(data.recommendations)
        setStep(5) // Move to results step
      } else {
        setError(data.error || 'Failed to get recommendations')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setStep(1)
    setPreferences({
      effects: [],
      type: '',
      flavors: [],
      medical_uses: [],
      experience_level: ''
    })
    setRecommendations([])
    setError('')
  }

  const canProceed = () => {
    switch (step) {
      case 1: return preferences.effects.length > 0
      case 2: return preferences.type !== ''
      case 3: return preferences.flavors.length > 0
      case 4: return preferences.medical_uses.length > 0 || preferences.experience_level !== ''
      default: return false
    }
  }

  if (step === 5 && recommendations.length > 0) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 max-w-4xl">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-green-400 mb-2">Your Personalized Recommendations</h3>
          <p className="text-white">Based on your preferences, here are the best strains for you:</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {recommendations.slice(0, 4).map((strain) => (
            <div key={strain.id} className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-white text-lg">{strain.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  strain.type === 'indica' ? 'bg-purple-500/80 text-white' :
                  strain.type === 'sativa' ? 'bg-green-500/80 text-white' :
                  'bg-blue-500/80 text-white'
                }`}>
                  {strain.type}
                </span>
              </div>
              <p className="text-gray-200 text-sm mb-3 line-clamp-2">{strain.description}</p>
              <div className="space-y-2">
                <div>
                  <span className="text-green-300 font-medium text-sm">Effects: </span>
                  <span className="text-white text-sm">{strain.effects.slice(0, 3).join(', ')}</span>
                </div>
                <div>
                  <span className="text-green-300 font-medium text-sm">THC: </span>
                  <span className="text-white text-sm">{strain.thc_content}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center space-y-4">
          <a 
            href="/strains" 
            className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors inline-block mr-4"
          >
            View All Strains
          </a>
          <button
            onClick={resetForm}
            className="border-2 border-green-400 text-green-400 px-6 py-3 rounded-full font-semibold hover:bg-green-400 hover:text-white transition-colors inline-block"
          >
            New Search
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 max-w-2xl">
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-400/50 text-red-300 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-green-400 font-medium">Step {step} of 4</span>
          <span className="text-white text-sm">{Math.round((step / 4) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-green-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step Content */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-bold text-green-400 mb-2">How do you want to feel?</h3>
            <p className="text-white text-sm">Select up to 3 effects</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {effects.map((effect) => (
              <button
                key={effect.id}
                onClick={() => handleEffectToggle(effect.id)}
                className={`p-3 rounded-lg border-2 transition-all text-sm ${
                  preferences.effects.includes(effect.id)
                    ? 'border-green-400 bg-green-400/20 text-white'
                    : 'border-white/30 bg-white/10 text-gray-300 hover:border-green-400/50'
                }`}
              >
                <div className="text-lg mb-1">{effect.icon}</div>
                <div className="font-medium">{effect.name}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-bold text-green-400 mb-2">What type do you prefer?</h3>
            <p className="text-white text-sm">Choose your preferred strain type</p>
          </div>
          <div className="space-y-3">
            {strainTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setPreferences(prev => ({ ...prev, type: type.id }))}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  preferences.type === type.id
                    ? 'border-green-400 bg-green-400/20 text-white'
                    : 'border-white/30 bg-white/10 text-gray-300 hover:border-green-400/50'
                }`}
              >
                <div className="font-medium text-lg">{type.name}</div>
                <div className="text-sm opacity-80">{type.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-bold text-green-400 mb-2">What flavors do you enjoy?</h3>
            <p className="text-white text-sm">Select up to 2 flavors</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {flavors.map((flavor) => (
              <button
                key={flavor.id}
                onClick={() => handleFlavorToggle(flavor.id)}
                className={`p-3 rounded-lg border-2 transition-all text-sm ${
                  preferences.flavors.includes(flavor.id)
                    ? 'border-green-400 bg-green-400/20 text-white'
                    : 'border-white/30 bg-white/10 text-gray-300 hover:border-green-400/50'
                }`}
              >
                <div className="text-lg mb-1">{flavor.icon}</div>
                <div className="font-medium">{flavor.name}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-bold text-green-400 mb-2">Any specific needs?</h3>
            <p className="text-white text-sm">Select medical uses (optional)</p>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {medicalUses.map((medical) => (
              <button
                key={medical.id}
                onClick={() => handleMedicalToggle(medical.id)}
                className={`p-3 rounded-lg border-2 transition-all text-sm ${
                  preferences.medical_uses.includes(medical.id)
                    ? 'border-green-400 bg-green-400/20 text-white'
                    : 'border-white/30 bg-white/10 text-gray-300 hover:border-green-400/50'
                }`}
              >
                <div className="font-medium">{medical.name}</div>
              </button>
            ))}
          </div>
          <div className="space-y-2">
            <label className="text-white font-medium text-sm">Experience Level:</label>
            <select
              value={preferences.experience_level}
              onChange={(e) => setPreferences(prev => ({ ...prev, experience_level: e.target.value }))}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white focus:border-green-400 focus:outline-none"
            >
              <option value="">Select experience level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="experienced">Experienced</option>
            </select>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setStep(step - 1)}
          disabled={step === 1}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            step === 1
              ? 'bg-gray-500/50 text-gray-400 cursor-not-allowed'
              : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
          }`}
        >
          Previous
        </button>

        {step < 4 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              canProceed()
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-500/50 text-gray-400 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        ) : (
          <button
            onClick={getRecommendations}
            disabled={loading || !canProceed()}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              canProceed() && !loading
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-500/50 text-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? 'Finding Strains...' : 'Get Recommendations'}
          </button>
        )}
      </div>
    </div>
  )
}