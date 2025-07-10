import { NextRequest, NextResponse } from 'next/server'
import { StrainService } from '@/lib/strain-service'

const strainService = new StrainService()

export async function POST(request: NextRequest) {
  try {
    const preferences = await request.json()
    
    console.log('Getting recommendations for preferences:', preferences)
    
    const recommendations = await strainService.getStrainRecommendations(preferences)
    
    return NextResponse.json({
      success: true,
      recommendations,
      count: recommendations.length,
      preferences_used: preferences
    })
  } catch (error) {
    console.error('Error getting recommendations:', error)
    return NextResponse.json(
      { 
        error: 'Failed to get recommendations', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}