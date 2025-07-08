import { NextRequest, NextResponse } from 'next/server'
import { StrainService } from '@/lib/strain-service'

const strainService = new StrainService()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const strain = await strainService.getStrainById(id)
    
    if (!strain) {
      return NextResponse.json(
        { error: 'Strain not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(strain)
  } catch (error) {
    console.error('Error in GET /api/strains/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to fetch strain' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const strain = await strainService.updateStrain(id, body)
    
    if (!strain) {
      return NextResponse.json(
        { error: 'Failed to update strain' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(strain)
  } catch (error) {
    console.error('Error in PUT /api/strains/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to update strain' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const success = await strainService.deleteStrain(id)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete strain' },
        { status: 400 }
      )
    }
    
    return NextResponse.json({ message: 'Strain deleted successfully' })
  } catch (error) {
    console.error('Error in DELETE /api/strains/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to delete strain' },
      { status: 500 }
    )
  }
}