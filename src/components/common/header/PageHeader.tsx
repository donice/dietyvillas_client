import React from 'react'

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <header className="flex flex-col text-primary">
      <h1 className="font-bold text-2xl mb-2">{title}</h1>
      {description && <p className="-mt-3">{description}</p>}
    </header>
  )
}

export default PageHeader