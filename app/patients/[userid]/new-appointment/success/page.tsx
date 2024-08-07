import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Success = () => {
    return (
        <main className='flex h-screen max-h-screen px-[5%]'>
            <div className="success-img">
                <Link href="/">
                    <Image
                        src="/assets/icons/logo-full.svg"
                        width={1000}
                        height={1000}
                        alt="logo"
                        className="h-10 w-fit"
                    />
                </Link>
            </div>
        </main>
    )
}

export default Success