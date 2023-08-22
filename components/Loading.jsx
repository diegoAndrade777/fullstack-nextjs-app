import React from 'react'
import Image from "next/image"

export const Loading = () => {
  return (
    <Image
      src='/assets/images/loading-unscreen.gif'
      alt='logo'
      width={100}
      height={100}
      placeholder="blur"
      blurDataURL={'/assets/images/loading-unscreen.gif'}
      className='object-contain'
    />
  )
}
