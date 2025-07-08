import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET() {
  try {
    // Test basic supabase connection
    const { data: basicTest, error: basicError } = await supabase
      .from('strains')
      .select('id')
      .limit(1)
    
    // Test admin connection
    const adminAvailable = !!supabaseAdmin
    
    let adminTest = null
    let adminError = null
    
    if (supabaseAdmin) {
      const result = await supabaseAdmin
        .from('strains')
        .select('id')
        .limit(1)
      adminTest = result.data
      adminError = result.error
    }
    
    return NextResponse.json({
      environment: {
        SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ Present' : '✗ Missing',
        SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓ Present' : '✗ Missing',
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? '✓ Present' : '✗ Missing',
      },
      basicConnection: {
        success: !basicError,
        data: basicTest,
        error: basicError?.message || null
      },
      adminConnection: {
        available: adminAvailable,
        success: adminAvailable && !adminError,
        data: adminTest,
        error: adminError?.message || null
      }
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}