"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

import { Loading } from "./Loading"

const Nav = () => {
  const { data: session } = useSession()

  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (async () => {
      const res = await getProviders()
      setProviders(res)
    })()
  }, [])

  const userSignIn = async (providerId) => {
    setLoading(true)

    signIn(providerId)

    toast.success('User successfully authenticated!', {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })

    setLoading(false)
  }

  const userSignOut = async () => {
    setLoading(true)

    await signOut()
    window.location.href = "/"
  }

  return (
    <>
      <ToastContainer />
      <nav className='flex-between w-full mb-16 pt-3'>
        <Link href='/' className='flex gap-2 flex-center'>
          <Image
            src='/assets/images/logo.svg'
            alt='logo'
            width={30}
            height={30}
            placeholder="blur"
            blurDataURL={'/assets/images/logo.svg'}
            className='object-contain'
          />
          <p className='logo_text'>My AI Prompt</p>
        </Link>
        {/* Desktop Navigation */}
        <div className='sm:flex hidden'>
          {loading && <Loading />}
          {session?.user && !loading ? (
            <div className='flex gap-3 md:gap-5'>
              <Link href='/create-prompt' className='black_btn'>
                Create Post
              </Link>

              <button type='button' onClick={userSignOut} className='outline_btn'>
                Sign Out
              </button>

              <Link href='/profile'>
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  placeholder="blur"
                  blurDataURL={session?.user.image}
                  className='rounded-full'
                  alt='profile'
                />
              </Link>
            </div>
          ) : (
            <>
              {(providers && !loading) &&
                Object.values(providers).map((provider) => (
                  <button
                    type='button'
                    key={provider.name}
                    onClick={() => {
                      userSignIn(provider.id)
                    }}
                    className='black_btn'
                  >
                    Sign in
                  </button>
                ))}
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className='sm:hidden flex relative'>
          {session?.user ? (
            <div className='flex'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
                onClick={() => setToggleDropdown(!toggleDropdown)}
                placeholder="blur"
                blurDataURL={session?.user.image}
              />

              {toggleDropdown && (
                <div className='dropdown'>
                  <Link
                    href='/profile'
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href='/create-prompt'
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    type='button'
                    onClick={() => {
                      setToggleDropdown(false)
                      signOut()
                    }}
                    className='mt-5 w-full black_btn'
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type='button'
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id)
                    }}
                    className='black_btn'
                  >
                    Sign in
                  </button>
                ))}
            </>
          )}
        </div>
      </nav>
    </>
  )
}

export default Nav