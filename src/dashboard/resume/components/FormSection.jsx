import React, { useState } from 'react'
import Personaldetails from './forms/Personaldetails'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { LayoutGrid } from 'lucide-react'
import Experiencedetails from './forms/Experiencedetails'
import Summarydetails from './forms/Summarydetails'
function FormSection() {
    const [activeForm, setActiveForm] = useState(1)
    const [enabledNext, setEnabledNext] = useState(false)
    return (
        <div>
            <div className='flex justify-between items-center'>
                <Button variant='outline' size='sm' className='flex gap-2'><LayoutGrid />Theme</Button>
                <div className='flex gap-2'>
                    {/* <Button><ArrowRight /></Button> */}
                    {activeForm > 1 && <Button onClick={() => setActiveForm(activeForm - 1)}><ArrowLeft /></Button>}
                    {activeForm < 3 && <Button disabled={!enabledNext} onClick={() => setActiveForm(activeForm + 1)}>next<ArrowRight /></Button>}
                </div>
            </div>
            {activeForm === 1 ? <Personaldetails enabledNext={(v) => setEnabledNext(v)}/>
            : activeForm === 2 ? <Summarydetails enabledNext={(v) => setEnabledNext(v)}/>
            : activeForm === 3 ? <Experiencedetails enabledNext={(v) => setEnabledNext(v)}/>
            : null}
        </div>
    )
}

export default FormSection
