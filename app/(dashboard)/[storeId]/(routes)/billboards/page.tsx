import React from 'react'
import { BillBoardClient } from './components/client'

const BillBoards = () => {
  return (
    <div className='flex-col'>
        <div className="flex-1 space-x-4 pt-6 p-8">
            <BillBoardClient />
        </div>
    </div>
  )
}

export default BillBoards
