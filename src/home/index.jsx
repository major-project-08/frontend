import React from 'react'
import { UserButton } from '@clerk/clerk-react'
import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import heroBg from '../assets/images/image.jpg'
function HomePage() {
    return <>
        {/* <UserButton /> */}
        <Header />
        <div className='flex flex-col items-center justify-center h-screen' style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div>
                <h1 className='text-4xl font-bold text-center'>Scholar<span className='text-primary'>Suit</span></h1>
                <p className='text-lg text-muted-foreground text-center'>Your one stop solution for all your academic needs</p>
            </div>
            <div>
                <Button className='flex items-center gap-2'>Get Started<ArrowRight className='w-4 h-4' /></Button>
            </div>
        </div>
    </>
}

export default HomePage