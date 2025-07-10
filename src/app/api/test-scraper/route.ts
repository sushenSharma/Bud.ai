import { NextRequest, NextResponse } from 'next/server'
import { SeedfinderScraper } from '@/lib/seedfinder-scraper'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }
    
    console.log('Testing scraper with URL:', url)
    
    const scraper = new SeedfinderScraper()
    const result = await scraper.fetchStrainData(url)
    
    return NextResponse.json({
      success: true,
      url: url,
      scraped_data: result,
      message: result ? 'Scraping successful' : 'Scraping failed - no data returned'
    })
  } catch (error) {
    console.error('Scraper test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}