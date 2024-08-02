"use server"

import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import React from 'react'

const Register = async ({ params: { userId } }: SearchParamProps) => {
    const user = await getUser(userId);

    return (
        <main className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container">
                <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
                    <Image
                        src="/assets/icons/logo-full.svg"
                        height={1000}
                        width={1000}
                        alt="Logo Image"
                        className="mb-12 h-10 w-fit"
                    />

                    <RegisterForm user={user} />

                    <p className="copyright py-12">© 2024 DocThud</p>
                </div>
            </section>

            <Image
                src="/assets/images/register-img.png"
                width={1000}
                height={1000}
                alt="Trusted doctor"
                className="side-img max-w-[390px]"
            />
        </main>
    )
}

export default Register