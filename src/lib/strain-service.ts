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
      return null
    }
    
    const { data, error } = await supabaseAdmin
      .from('strains')
      .insert(strain)
      .select()
      .single()
    
    if (error) {
      console.error('Error creating strain:', error)
      return null
    }
    
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
}