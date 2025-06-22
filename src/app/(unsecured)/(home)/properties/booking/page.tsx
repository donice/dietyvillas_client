import React from 'react'
import DynamicBookingModule from './_components'

export const metadata = {
  title: 'Book Your Stay | Deity Villas',
  description: 'Easily book your stay at Deity Villas. Explore our luxurious properties and secure your reservation online.',
  keywords: ['Deity Villas', 'Booking', 'Luxury Villas', 'Vacation Rentals', 'Reserve', 'Properties'],
  openGraph: {
    title: 'Book Your Stay | Deity Villas',
    description: 'Reserve your luxury villa at Deity Villas. Enjoy a seamless booking experience.',
    url: '',
    type: 'website',
    images: [
      {
        url: '',
        width: 1200,
        height: 630,
        alt: 'Deity Villas Booking',
      },
    ],
  },
}

const BookingPage = () => {
  return <DynamicBookingModule />
}

export default BookingPage