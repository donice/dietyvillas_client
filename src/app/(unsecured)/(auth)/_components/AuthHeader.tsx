import React from 'react'

const AuthHeader = ({title, desc}:{
  title: string;
  desc: string;
}) => {
  return (
    <header className='text-center mb-6'>
      <h1 className='text-3xl font-semibold text-gray-600'>{title}</h1>
      {desc && <p className="text-gray-500">{desc}</p>}
    </header>
  )
}

export default AuthHeader