import React from 'react'
import Avatar from '../../../components/Avatar'

function Loading() {
  return (
    <div className='mx-auto animate-spin p-10'>
        <Avatar seed="PAPAFAM Support Agent"/>
    </div>
  )
}

export default Loading;