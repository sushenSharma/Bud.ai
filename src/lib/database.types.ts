export interface Strain {
  id: string
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
  created_at: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      strains: {
        Row: Strain
        Insert: Omit<Strain, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Strain, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
}