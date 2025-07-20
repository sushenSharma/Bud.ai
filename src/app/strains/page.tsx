'use client'

import { useState, useEffect } from 'react'
import { Strain } from '@/lib/database.types'

export default function StrainsPage() {
  const [strains, setStrains] = useState<Strain[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [importUrl, setImportUrl] = useState('')

  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  const fetchStrains = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/strains')
      const data = await response.json()
      
      if (response.ok) {
        setStrains(data)
        showMessage(`Loaded ${data.length} strains`)
      } else {
        showMessage(`Error: ${data.error}`)
      }
    } catch (error) {
      showMessage(`Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const importStrain = async () => {
    console.log('Import function called, importUrl:', importUrl)
    
    if (!importUrl || importUrl.trim() === '') {
      showMessage('Please enter a seedfinder.eu URL')
      console.log('URL validation failed: empty URL')
      return
    }
    
    // Basic URL validation
    if (!importUrl.includes('seedfinder.eu')) {
      showMessage('Please enter a valid seedfinder.eu URL')
      console.log('URL validation failed: not seedfinder.eu')
      return
    }
    
    console.log('Proceeding with import for URL:', importUrl.trim())
    
    setLoading(true)
    try {
      const response = await fetch('/api/strains', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ seedfinder_url: importUrl.trim() }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        showMessage(`Successfully imported: ${data.name}`)
        setImportUrl('')
        fetchStrains() // Refresh the list
      } else {
        showMessage(`Error: ${data.error}`)
        console.log('Full error response:', data)
      }
    } catch (error) {
      showMessage(`Error: ${error}`)
      console.error('Import error:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteStrain = async (id: string) => {
    if (!confirm('Are you sure you want to delete this strain?')) return
    
    setLoading(true)
    try {
      const response = await fetch(`/api/strains/${id}`, {
        method: 'DELETE',
      })
      
      const data = await response.json()
      
      if (response.ok) {
        showMessage('Strain deleted successfully')
        fetchStrains() // Refresh the list
      } else {
        showMessage(`Error: ${data.error}`)
      }
    } catch (error) {
      showMessage(`Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchStrains()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Strain Database</h1>
      
      {/* Message Display */}
      {message && (
        <div className="mb-4 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded">
          {message}
        </div>
      )}

      {/* Import from Seedfinder */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Import from Seedfinder</h2>
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="https://seedfinder.eu/strain-info/..."
            value={importUrl}
            onChange={(e) => {
              console.log('URL input changed:', e.target.value)
              setImportUrl(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                importStrain()
              }
            }}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              importStrain()
            }}
            disabled={loading}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 font-medium"
          >
            Import
          </button>
        </div>
      </div>


      {/* Loading Indicator */}
      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      )}

      {/* Strains List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {strains.map((strain) => (
          <div key={strain.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-800">{strain.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                strain.type === 'indica' ? 'bg-purple-100 text-purple-800' :
                strain.type === 'sativa' ? 'bg-green-100 text-green-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {strain.type}
              </span>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Breeder:</strong> {strain.breeder}</p>
              <p><strong>Genetics:</strong> {strain.genetics}</p>
              <p><strong>Flowering:</strong> {strain.flowering_time}</p>
              <p><strong>THC:</strong> {strain.thc_content}</p>
              <p><strong>CBD:</strong> {strain.cbd_content}</p>
              
              {strain.effects.length > 0 && (
                <div>
                  <strong>Effects:</strong>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {strain.effects.map((effect, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {effect}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {strain.description && (
                <p className="text-gray-700 mt-2">{strain.description}</p>
              )}
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <a
                href={strain.seedfinder_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                View on Seedfinder
              </a>
              <button
                onClick={() => deleteStrain(strain.id)}
                disabled={loading}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {strains.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No strains found. Try creating a test strain or importing from Seedfinder.</p>
        </div>
      )}
    </div>
  )
}