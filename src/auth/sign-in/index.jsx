import React from 'react'
import { SignIn, SignUp } from '@clerk/clerk-react'
import Header from '@/components/custom/header'
function SignInPage() {
    return (
        <>
            {/* <Header /> */}
            <div className='flex justify-center items-center my-20'>
                <SignIn />
                <SignUp />
            </div>
        </>
    )
}

export default SignInPage