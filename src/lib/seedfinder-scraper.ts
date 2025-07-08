export interface SeedfinderStrain {
  name: string
  type: 'indica' | 'sativa' | 'hybrid'
  genetics: string
  breeder: string
  flowering_time: string
  yield_indoor: string
  yield_outdoor: string
  height_indoor: string
  height_outdoor: string
  thc_content: string
  cbd_content: string
  description: string
  effects: string[]
  flavors: string[]
  medical_uses: string[]
  growing_difficulty: 'easy' | 'moderate' | 'difficult'
  seedfinder_url: string
}

export class SeedfinderScraper {
  private baseUrl = 'https://seedfinder.eu'

  async fetchStrainData(strainUrl: string): Promise<SeedfinderStrain | null> {
    try {
      const response = await fetch(strainUrl)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const html = await response.text()
      return this.parseStrainHtml(html, strainUrl)
    } catch (error) {
      console.error('Error fetching strain data:', error)
      return null
    }
  }

  private parseStrainHtml(html: string, url: string): SeedfinderStrain | null {
    // This is a simplified parser - in production you'd want a more robust HTML parser
    // For now, we'll return mock data structure
    const strain: SeedfinderStrain = {
      name: this.extractTextBetween(html, '<h1>', '</h1>') || 'Unknown',
      type: this.determineType(html),
      genetics: this.extractTextBetween(html, 'Genetics:', '</td>') || '',
      breeder: this.extractTextBetween(html, 'Breeder:', '</td>') || '',
      flowering_time: this.extractTextBetween(html, 'Flowering:', '</td>') || '',
      yield_indoor: this.extractTextBetween(html, 'Yield indoor:', '</td>') || '',
      yield_outdoor: this.extractTextBetween(html, 'Yield outdoor:', '</td>') || '',
      height_indoor: this.extractTextBetween(html, 'Height indoor:', '</td>') || '',
      height_outdoor: this.extractTextBetween(html, 'Height outdoor:', '</td>') || '',
      thc_content: this.extractTextBetween(html, 'THC:', '</td>') || '',
      cbd_content: this.extractTextBetween(html, 'CBD:', '</td>') || '',
      description: this.extractDescription(html),
      effects: this.extractEffects(),
      flavors: this.extractFlavors(),
      medical_uses: this.extractMedicalUses(),
      growing_difficulty: this.determineGrowingDifficulty(),
      seedfinder_url: url
    }

    return strain
  }

  private extractTextBetween(html: string, start: string, end: string): string | null {
    const startIndex = html.indexOf(start)
    if (startIndex === -1) return null
    
    const contentStart = startIndex + start.length
    const endIndex = html.indexOf(end, contentStart)
    if (endIndex === -1) return null
    
    return html.substring(contentStart, endIndex).trim().replace(/<[^>]*>/g, '')
  }

  private determineType(html: string): 'indica' | 'sativa' | 'hybrid' {
    const typeText = html.toLowerCase()
    if (typeText.includes('indica') && typeText.includes('sativa')) return 'hybrid'
    if (typeText.includes('indica')) return 'indica'
    if (typeText.includes('sativa')) return 'sativa'
    return 'hybrid'
  }

  private extractDescription(html: string): string {
    return this.extractTextBetween(html, '<div class="description">', '</div>') || ''
  }

  private extractEffects(): string[] {
    // Mock implementation - would need actual parsing logic
    return []
  }

  private extractFlavors(): string[] {
    // Mock implementation - would need actual parsing logic
    return []
  }

  private extractMedicalUses(): string[] {
    // Mock implementation - would need actual parsing logic
    return []
  }

  private determineGrowingDifficulty(): 'easy' | 'moderate' | 'difficult' {
    // Mock implementation - would need actual parsing logic
    return 'moderate'
  }

  async searchStrains(query: string): Promise<string[]> {
    try {
      const searchUrl = `${this.baseUrl}/search?q=${encodeURIComponent(query)}`
      const response = await fetch(searchUrl)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const html = await response.text()
      return this.extractStrainUrls(html)
    } catch (error) {
      console.error('Error searching strains:', error)
      return []
    }
  }

  private extractStrainUrls(html: string): string[] {
    const urls: string[] = []
    const linkPattern = /href="([^"]*strain[^"]*)"/g
    let match
    
    while ((match = linkPattern.exec(html)) !== null) {
      const url = match[1]
      if (url.startsWith('/')) {
        urls.push(this.baseUrl + url)
      } else if (url.startsWith('http')) {
        urls.push(url)
      }
    }
    
    return [...new Set(urls)] // Remove duplicates
  }
}