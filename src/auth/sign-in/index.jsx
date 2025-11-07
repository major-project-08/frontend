import React from 'react'
import { SignUp } from '@clerk/clerk-react'
import Header from '@/components/custom/header'
function SignInPage() {
    return (
        <>
            {/* <Header /> */}
            <div className='flex justify-center items-center my-20'>
                <SignUp />
            </div>
        </>
    )
}

export default SignInPage