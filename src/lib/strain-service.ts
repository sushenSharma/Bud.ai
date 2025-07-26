import { supabase } from './supabase'
import { supabaseAdmin } from './supabase-admin'
import { SeedfinderScraper } from './seedfinder-scraper'
import { Strain } from './database.types'

export class StrainService {
  private scraper = new SeedfinderScraper()

  async getAllStrains(): Promise<Strain[]> {
    const { data, error } = await supabase
      .from('strains')
      .select('*')
      .order('name')
    
    if (error) {
      console.error('Error fetching strains:', error)
      return []
    }
    
    return data || []
  }

  async getStrainById(id: string): Promise<Strain | null> {
    const { data, error } = await supabase
      .from('strains')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching strain:', error)
      return null
    }
    
    return data
  }

  async searchStrains(query: string): Promise<Strain[]> {
    const { data, error } = await supabase
      .from('strains')
      .select('*')
      .or(`name.ilike.%${query}%,breeder.ilike.%${query}%,genetics.ilike.%${query}%`)
      .order('name')
    
    if (error) {
      console.error('Error searching strains:', error)
      return []
    }
    
    return data || []
  }

  async createStrain(strain: Omit<Strain, 'id' | 'created_at' | 'updated_at'>): Promise<Strain | null> {
    if (!supabaseAdmin) {
      console.error('Supabase admin client not initialized')
      console.error('Environment variables check:')
      console.error('- SUPABASE_URL:', !!process.env.NEXT_PUBLIC_SUPABASE_URL)
      console.error('- SERVICE_KEY:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)
      return null
    }
    
    console.log('Creating strain with data:', strain)
    
    const { data, error } = await supabaseAdmin
      .from('strains')
      .insert(strain)
      .select()
      .single()
    
    if (error) {
      console.error('Database error creating strain:', error)
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return null
    }
    
    console.log('Strain created successfully:', data)
    return data
  }

  async updateStrain(id: string, updates: Partial<Omit<Strain, 'id' | 'created_at' | 'updated_at'>>): Promise<Strain | null> {
    if (!supabaseAdmin) {
      console.error('Supabase admin client not initialized')
      return null
    }
    
    const { data, error } = await supabaseAdmin
      .from('strains')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating strain:', error)
      return null
    }
    
    return data
  }

  async deleteStrain(id: string): Promise<boolean> {
    if (!supabaseAdmin) {
      console.error('Supabase admin client not initialized')
      return false
    }
    
    const { error } = await supabaseAdmin
      .from('strains')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting strain:', error)
      return false
    }
    
    return true
  }

  async importStrainFromSeedfinder(seedfinderUrl: string): Promise<Strain | null> {
    // Check if strain already exists
    const { data: existingStrain } = await supabase
      .from('strains')
      .select('*')
      .eq('seedfinder_url', seedfinderUrl)
      .single()
    
    if (existingStrain) {
      console.log('Strain already exists:', existingStrain.name)
      return existingStrain
    }

    // Fetch strain data from seedfinder
    const scrapeData = await this.scraper.fetchStrainData(seedfinderUrl)
    if (!scrapeData) {
      console.error('Failed to scrape strain data from:', seedfinderUrl)
      return null
    }

    // Create strain in database
    const strain = await this.createStrain(scrapeData)
    if (!strain) {
      console.error('Failed to create strain in database')
      return null
    }

    console.log('Successfully imported strain:', strain.name)
    return strain
  }

  async bulkImportFromSeedfinder(strainUrls: string[]): Promise<Strain[]> {
    const importedStrains: Strain[] = []
    
    for (const url of strainUrls) {
      const strain = await this.importStrainFromSeedfinder(url)
      if (strain) {
        importedStrains.push(strain)
      }
      
      // Add delay to avoid overwhelming the seedfinder server
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    
    return importedStrains
  }

  async searchAndImportStrains(query: string): Promise<Strain[]> {
    const strainUrls = await this.scraper.searchStrains(query)
    return this.bulkImportFromSeedfinder(strainUrls)
  }

  async importPopularStrains(limit: number = 50): Promise<Strain[]> {
    console.log(`Starting import of ${limit} popular strains...`)
    const strainUrls = await this.scraper.discoverPopularStrains(limit)
    console.log(`Found ${strainUrls.length} strain URLs to import`)
    return this.bulkImportFromSeedfinder(strainUrls)
  }

  async importStrainsByType(type: 'indica' | 'sativa' | 'hybrid', limit: number = 30): Promise<Strain[]> {
    console.log(`Starting import of ${limit} ${type} strains...`)
    const strainUrls = await this.scraper.discoverStrainsByType(type)
    console.log(`Found ${strainUrls.length} ${type} strain URLs to import`)
    // Limit the URLs if needed
    const limitedUrls = strainUrls.slice(0, limit)
    return this.bulkImportFromSeedfinder(limitedUrls)
  }

  async getStrainRecommendations(userPreferences: {
    mood?: string[]
    effects?: string[]
    flavors?: string[]
    type?: 'indica' | 'sativa' | 'hybrid'
    thc_preference?: 'low' | 'medium' | 'high'
    experience_level?: 'beginner' | 'intermediate' | 'advanced'
  }): Promise<Strain[]> {
    // First try to get recommendations based on user preferences
    let query = supabase.from('strains').select('*')

    // Filter by type if specified
    if (userPreferences.type) {
      query = query.eq('type', userPreferences.type)
    }

    // Filter by effects if specified
    if (userPreferences.effects && userPreferences.effects.length > 0) {
      query = query.overlaps('effects', userPreferences.effects)
    }

    // Filter by flavors if specified
    if (userPreferences.flavors && userPreferences.flavors.length > 0) {
      query = query.overlaps('flavors', userPreferences.flavors)
    }

    // Filter by THC preference
    // TODO: Implement THC filtering logic
    // This is a simplified approach - in production you'd want better THC filtering

    const { data, error } = await query.limit(10)

    if (error) {
      console.error('Error getting recommendations:', error)
      // If there's an error, fall back to getting any strains
      return await this.getFallbackRecommendations()
    }

    // If we got results, return them
    if (data && data.length > 0) {
      return data
    }

    // If no results match the filters, return fallback recommendations
    console.log('No strains found matching preferences, returning fallback recommendations')
    return await this.getFallbackRecommendations()
  }

  private async getFallbackRecommendations(): Promise<Strain[]> {
    // Get any 10 strains from the database as fallback
    const { data, error } = await supabase
      .from('strains')
      .select('*')
      .limit(10)

    if (error) {
      console.error('Error getting fallback recommendations:', error)
      return []
    }

    return data || []
  }
}