import { NextRequest, NextResponse } from 'next/server'
import { StrainService } from '@/lib/strain-service'

const strainService = new StrainService()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, limit = 20 } = body
    
    console.log(`Bulk import request: type=${type}, limit=${limit}`)
    
    let importedStrains
    
    if (type === 'popular') {
      importedStrains = await strainService.importPopularStrains(limit)
    } else if (type === 'indica' || type === 'sativa' || type === 'hybrid') {
      importedStrains = await strainService.importStrainsByType(type, limit)
    } else {
      return NextResponse.json(
        { error: 'Invalid import type. Use: popular, indica, sativa, or hybrid' },
        { status: 400 }
      )
    }
    
    console.log(`Successfully imported ${importedStrains.length} strains`)
    
    return NextResponse.json({
      success: true,
      imported_count: importedStrains.length,
      strains: importedStrains,
      message: `Successfully imported ${importedStrains.length} ${type} strains`
    })
  } catch (error) {
    console.error('Error in bulk import:', error)
    return NextResponse.json(
      { 
        error: 'Bulk import failed', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}