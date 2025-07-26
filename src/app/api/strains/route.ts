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
    console.log('POST /api/strains called')
    console.log('Environment check:')
    console.log('- SUPABASE_URL:', !!process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('- SERVICE_KEY:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)
    console.log('- NODE_ENV:', process.env.NODE_ENV)
    
    const body = await request.json()
    console.log('Request body:', body)
    
    // Check if this is an import request
    if (body.seedfinder_url) {
      console.log('Import request for URL:', body.seedfinder_url)
      const strain = await strainService.importStrainFromSeedfinder(body.seedfinder_url)
      if (!strain) {
        console.log('Import failed - no strain returned')
        return NextResponse.json(
          { error: 'Failed to import strain from Seedfinder' },
          { status: 400 }
        )
      }
      console.log('Import successful:', strain.name)
      return NextResponse.json(strain, { status: 201 })
    }
    
    // Regular strain creation
    console.log('Regular strain creation request')
    const strain = await strainService.createStrain(body)
    if (!strain) {
      console.log('Strain creation failed')
      return NextResponse.json(
        { error: 'Failed to create strain' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(strain, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/strains:', error)
    return NextResponse.json(
      { 
        error: 'Server error', 
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}