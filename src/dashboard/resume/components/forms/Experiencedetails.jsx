import React from 'react'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import { useContext } from 'react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
// import { PlusIcon } from '@radix-ui/react-icons'
import { PlusSquare } from 'lucide-react'
import RichTextEditor from './../RichTextEditor'
const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummery: '',
}

function Experiencedetails() {
    const { resumeInfo } = useContext(ResumeInfoContext)
    const [experienceList, setExperienceList] = useState([
        {
            formField
        }
    ])
    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Professional Experience</h2>
                <p>Add your professional experience</p>
                <div>
                    {
                        experienceList.map((experience, index) => (
                            <div>
                                <div className='grid grid-cols-2 gap-3 border p-3 rounded-lg my-3'>
                                    <div>
                                        <label className='text-xs'>Position Title</label>
                                        <Input name='title' onChange={(e) => handleChange(e, index)} />
                                    </div>
                                    <div>
                                        <label className='text-xs'>Company Name</label>
                                        <Input name='companyName' onChange={(e) => handleChange(e, index)} />
                                    </div>
                                    <div>
                                        <label className='text-xs'>City</label>
                                        <Input name='city' onChange={(e) => handleChange(e, index)} />
                                    </div>
                                    <div>
                                        <label className='text-xs'>State</label>
                                        <Input name='state' onChange={(e) => handleChange(e, index)} />
                                    </div>
                                    <div>
                                        <label className='text-xs'>Start Date</label>
                                        <Input type='date' name='startDate' onChange={(e) => handleChange(e, index)}  />
                                    </div>
                                    <div>
                                        <label className='text-xs'>End Date</label>
                                        <Input type='date' name='endDate' onChange={(e) => handleChange(e, index)}  />
                                    </div>
                                    <div className='col-span-2'>
                                        <label className='text-xs'>Work Summary</label>
                                        {/* <Textarea name='workSummery' onChange={(e) => handleChange(e, index)} /> */}
                                        <RichTextEditor />
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='flex justify-between'>
                    <Button variant='outline' className='text-primary'><PlusSquare />Add Experience</Button>
                    <Button>Save</Button>
                </div>
            </div>
        </div>
    )
}

export default Experiencedetails