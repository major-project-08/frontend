import React from 'react'
import logo from '../../../public/logo.svg'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { UserButton } from '@clerk/clerk-react'
import { useUser } from '@clerk/clerk-react'
function Header() {
    const { isSignedIn, user } = useUser()
    return <div className='p-3 px-5 flex justify-between items-center shadow-md sticky top-0 bg-white z-50'>
        <Link to="/" style={{cursor:'pointer'}}>
            <img src={logo} className='w-5 h-5' alt="logo" height={100} width={100} />
        </Link>
        <div>ScholarSuite</div>

        {isSignedIn ?
            <div className='flex items-center gap-2'>
                <Link to="/dashboard">
                    <Button variant="outline">Dashboard</Button>
                </Link>
                <UserButton />
            </div>
            :
            <Link to="/auth/sign-in">
                <Button>Get Started</Button>
            </Link>
        }
    </div>
}

export default Header