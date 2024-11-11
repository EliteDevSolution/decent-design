'use client'

import React from 'react'
import { NextUIProvider } from '@nextui-org/system'
import { Layout } from './layout'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <Layout />
      {children}
    </NextUIProvider>
  )
}
