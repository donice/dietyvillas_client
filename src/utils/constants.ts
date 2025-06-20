export const appConfig = {
  name: 'Letcomange TMS',
  description: 'A comprehensive ticket management system for event handling and organization',
  version: '1.0.0',
  author: {
    name: 'Letcomange',
    email: 'contact@letcomange.com',
    website: 'https://letcomange.com'
  },
  metadata: {
    keywords: ['tickets', 'events', 'management', 'booking', 'ticketing'],
    language: 'en',
    themeColor: '#007bff',
    favicon: '/favicon.ico'
  },
  social: {
    twitter: '@letcomange',
    github: 'letcomange',
    linkedin: 'letcomange'
  },
  apiEndpoint: process.env.API_URL || 'http://localhost:3000/api',
  features: {
    authentication: true,
    ticketBooking: true,
    eventManagement: true,
    emailNotifications: true,
    reporting: true,
    paymentProcessing: true
  }
};