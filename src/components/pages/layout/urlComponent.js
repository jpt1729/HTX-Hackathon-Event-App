'use client'
 
import { usePathname } from 'next/navigation'
import ThemedText from '../../ThemedText' 

export default function URLComponent() {
  const pathname = usePathname()
  return <ThemedText type='subtext'>{pathname}</ThemedText>
}