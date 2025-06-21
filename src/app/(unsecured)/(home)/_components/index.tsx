"use client"
import React from 'react'
import HomeNav from './HomeNav'
import Header from './Header'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/lib/axiosInstance'

const HomePageModule = () => {

  const {data: categories, isLoading: categoriesIsLoading} = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axiosInstance.get('/categories')
      return response.data
    }
  })



  return (
    <div>
      <HomeNav data={categories} loading={categoriesIsLoading} onItemChange={(item) => console.log(item)} />
      <Header />

    </div>
  )
}

export default HomePageModule