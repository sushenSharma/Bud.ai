import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Supabase admin not available' }, { status: 500 })
    }

    const testStrain = {
      name: 'API Test Strain',
      type: 'hybrid',
      genetics: 'Test x Test',
      breeder: 'Test Breeder',
      flowering_time: '8-9 weeks',
      yield_indoor: '400g/m²',
      yield_outdoor: '600g/plant',
      height_indoor: '80cm',
      height_outdoor: '150cm',
      thc_content: '20%',
      cbd_content: '1%',
      description: 'This is a test strain created via API',
      effects: ['relaxed', 'happy'],
      flavors: ['citrus', 'pine'],
      medical_uses: ['stress', 'anxiety'],
      growing_difficulty: 'moderate',
      seedfinder_url: `https://test.com/strain-${Date.now()}`
    }

    const { data, error } = await supabaseAdmin
      .from('strains')
      .insert([testStrain])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ 
        success: false, 
        error: error.message,
        details: error.details || 'No additional details',
        hint: error.hint || 'No hint available'
      }, { status: 400 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Strain created successfully!',
      data: data
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}