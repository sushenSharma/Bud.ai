'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getInitialSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session)
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  if (!mounted) {
    return (
      <AuthContext.Provider value={{
        user: null,
        session: null,
        signUp: async () => {},
        signIn: async () => {},
        signInWithGoogle: async () => {},
        signOut: async () => {},
        loading: true
      }}>
        {children}
      </AuthContext.Provider>
    )
  }

  const signUp = async (email: string, password: string) => {
    console.log('Attempting to sign up with:', email)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    console.log('Sign up result:', data, error)
    if (error) throw error
  }

  const signIn = async (email: string, password: string) => {
    console.log('Attempting to sign in with:', email)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    console.log('Sign in result:', data, error)
    if (error) throw error
  }

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    })
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  return (
    <AuthContext.Provider value={{
      user,
      session,
      signUp,
      signIn,
      signInWithGoogle,
      signOut,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}