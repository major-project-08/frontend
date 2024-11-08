import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { PlusSquare, MinusSquare } from 'lucide-react'
import { Loader2 } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import Global from '../../../../../service/Global'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function Educationdetails({enabledNext}) {
    const [loading, setLoading] = useState(false)
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const params = useParams()
    const [educationList, setEducationList] = useState([
        {
            universityName: "",
            degree: "",
            startDate: "",
            endDate: "",
            major: "",
            description: "",
        }
    ])

    const AddNewEducation = () => {
        setEducationList([...educationList, { universityName: "", degree: "", startDate: "", endDate: "", major: "", description: "" }])
    }
    const RemoveEducation = () => {
        setEducationList(educationList.slice(0, -1))
    }
    const handleChange = (e, index) => {
        const newEntries = [...educationList]
        newEntries[index][e.target.name] = e.target.value
        setEducationList(newEntries)
    }

    const onSave = () => {
        setLoading(true)
        enabledNext(false)
        const data = {
            data: {
                education: educationList
            }
        }
        console.log('Request data:', data);
        Global.UpdateResume(params.resumeid, data)
            .then((res) => {
                console.log(res)
                setLoading(false)
                enabledNext(true)
                toast.success('Education details updated successfully')
            })
            .catch((err) => {
                console.error('Error updating education details:', err)
                setLoading(false)
                enabledNext(true)
                if (err.response) {
                    console.error('Response data:', err.response.data)
                    toast.error(`Error: ${err.response.data.error.message || 'Something went wrong'}`)
                } else if (err.request) {
                    console.error('Request data:', err.request)
                    toast.error('No response received from server')
                } else {
                    console.error('Error message:', err.message)
                    toast.error('An unexpected error occurred')
                }
            })
    }

    useEffect(() => {
        console.log(educationList)
        setResumeInfo({
            ...resumeInfo,
            education: educationList
        })
    }, [educationList])

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Education Detail</h2>
            <p>Get Started with the basic education information</p>
            <div>
                {
                    educationList?.map((education, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-3 my-2 p-3 border rounded-md'>
                                <div className='col-span-2'>
                                    <label className='text-xs'>University Name</label>
                                    <Input name='universityName' onChange={(e) => handleChange(e, index)} value={education?.universityName} />
                                </div>
                                <div>
                                    <label className='text-xs'>Major</label>
                                    <Input name='major' onChange={(e) => handleChange(e, index)} value={education?.major} />
                                </div>
                                <div>
                                    <label className='text-xs'>Degree</label>
                                    <Input name='degree' onChange={(e) => handleChange(e, index)} value={education?.degree} />
                                </div>
                                <div>
                                    <label className='text-xs'>Start Date</label>
                                    <Input type='date' name='startDate' onChange={(e) => handleChange(e, index)} value={education?.startDate} />
                                </div>
                                <div>
                                    <label className='text-xs'>End Date</label>
                                    <Input type='date' name='endDate' onChange={(e) => handleChange(e, index)} value={education?.endDate} />
                                </div>
                                <div className='col-span-2'>
                                    <label className='text-xs'>Description</label>
                                    <Textarea name='description' onChange={(e) => handleChange(e, index)} value={education?.description} />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant='outline' className='text-primary border-primary' onClick={AddNewEducation}><PlusSquare />Add Education</Button>
                    <Button variant='outline' className='text-primary border-primary' onClick={RemoveEducation}><MinusSquare />Remove</Button>
                </div>
                <Button disabled={!enabledNext} onClick={()=>onSave()}>{loading ? <Loader2 className='animate-spin' /> : 'Save'}</Button>
            </div>
        </div>
    )
}

export default Educationdetails