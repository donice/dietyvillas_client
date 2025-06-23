import React from 'react'
import ListingsModule from './_components'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Listings - Deity Villas',
  description: 'Browse property listings. Deity Villas is an equal opportunity employer and does not discriminate based on race, color, religion, sex, national origin, age, disability, or genetic information.',
  keywords: [
    'Deity Villas',
    'Listings',
    'Properties',
    'Equal Opportunity Employer',
    'EEO',
    'Non-discrimination',
    'Real Estate'
  ],
  openGraph: {
    title: 'Listings - Deity Villas',
    description: 'Browse property listings. Deity Villas is an equal opportunity employer.',
    type: 'website'
  }
}

const ListingsPage = () => {
  return <ListingsModule />
}

export default ListingsPage