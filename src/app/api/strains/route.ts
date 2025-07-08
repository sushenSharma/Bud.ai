import { NextRequest, NextResponse } from 'next/server'
import { StrainService } from '@/lib/strain-service'

const strainService = new StrainService()

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('search')
    
    if (query) {
      const strains = await strainService.searchStrains(query)
      return NextResponse.json(strains)
    }
    
    const strains = await strainService.getAllStrains()
    return NextResponse.json(strains)
  } catch (error) {
    console.error('Error in GET /api/strains:', error)
    return NextResponse.json(
      { error: 'Failed to fetch strains' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Check if this is an import request
    if (body.seedfinder_url) {
      const strain = await strainService.importStrainFromSeedfinder(body.seedfinder_url)
      if (!strain) {
        return NextResponse.json(
          { error: 'Failed to import strain' },
          { status: 400 }
        )
      }
      return NextResponse.json(strain, { status: 201 })
    }
    
    // Regular strain creation
    const strain = await strainService.createStrain(body)
    if (!strain) {
      return NextResponse.json(
        { error: 'Failed to create strain' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(strain, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/strains:', error)
    return NextResponse.json(
      { error: 'Failed to create strain' },
      { status: 500 }
    )
  }
}