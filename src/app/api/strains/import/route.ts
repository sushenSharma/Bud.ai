import { NextRequest, NextResponse } from 'next/server'
import { StrainService } from '@/lib/strain-service'

const strainService = new StrainService()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, urls } = body
    
    let importedStrains
    
    if (query) {
      // Search and import strains by query
      importedStrains = await strainService.searchAndImportStrains(query)
    } else if (urls && Array.isArray(urls)) {
      // Import specific strain URLs
      importedStrains = await strainService.bulkImportFromSeedfinder(urls)
    } else {
      return NextResponse.json(
        { error: 'Either query or urls array is required' },
        { status: 400 }
      )
    }
    
    return NextResponse.json({
      message: `Successfully imported ${importedStrains.length} strains`,
      strains: importedStrains
    })
  } catch (error) {
    console.error('Error in POST /api/strains/import:', error)
    return NextResponse.json(
      { error: 'Failed to import strains' },
      { status: 500 }
    )
  }
}