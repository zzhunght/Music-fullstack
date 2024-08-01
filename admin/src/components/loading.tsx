import React from 'react'
import loading from '@/assets/images/Loading.gif'
import Image from 'next/image'
function Loading() {
  return (
    <Image
        alt='loading'
        src={loading}
        width={60}
        height={40}
    />
  )
}

export default Loading