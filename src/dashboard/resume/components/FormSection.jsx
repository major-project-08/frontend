import React from 'react'
import Personaldetails from './forms/Personaldetails'
import { Button } from '@/components/ui/button'
import { ArrowLeft, LayoutGrid } from 'lucide-react'
function FormSection() {
    return (
        <div>
            <div className='flex justify-between items-center'>
                <Button variant='outline' size='sm' className='flex gap-2'><LayoutGrid />Theme</Button>
                <div className='flex gap-2'>
                    <Button><ArrowLeft /></Button>
                    <Button>next</Button>
                </div>
            </div>
            <Personaldetails />
        </div>
    )
}

export default FormSection
