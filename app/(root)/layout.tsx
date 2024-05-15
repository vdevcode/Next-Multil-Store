import React from 'react'

interface SetupLayoutProp{
    children: React.ReactNode
}

const setupLayout = ({children} : SetupLayoutProp) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default setupLayout
