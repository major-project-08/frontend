import React from 'react'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import { useContext } from 'react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useEffect } from 'react'
// import { toast } from 'react-toastify'
// import GlobalApi from '@/api/GlobalApi'
import Global from '../../../../../service/Global'
// import { PlusIcon } from '@radix-ui/react-icons'
import { PlusSquare, MinusSquare } from 'lucide-react'
import RichTextEditor from './../RichTextEditor'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useParams } from 'react-router-dom'
const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummery: '',
}

function Experiencedetails({enabledNext}) {
    const [loading, setLoading] = useState(false)
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const params = useParams()
    const [experienceList, setExperienceList] = useState([
        {
            title: '',
            companyName: '',
            city: '',
            state: '',
            startDate: '',
            endDate: '',
            workSummery: '',
        }
    ])

    useEffect(()=>{
        resumeInfo && setExperienceList(resumeInfo?.experience)
    },[])

    const handleChange = (e, index) => {
        const { name, value } = e.target
        const updatedExperienceList = [...experienceList]
        updatedExperienceList[index][name] = value
        setExperienceList(updatedExperienceList)
        setResumeInfo({ ...resumeInfo, experience: updatedExperienceList })
    }
    
    const AddNewExperience = () => {
        setExperienceList([...experienceList, {
            title: '',
            companyName: '',
            city: '',
            state: '',
            startDate: '',
            endDate: '',
            workSummery: '',
        }])
    }

    const RemoveExperience = () => {
        const updatedExperienceList = [...experienceList]
        updatedExperienceList.pop()
        setExperienceList(updatedExperienceList)
        setResumeInfo({ ...resumeInfo, experience: updatedExperienceList })
    }

    const handleRichTextEditorChange = (e, name, index) => {
        const newEntries = experienceList.slice()
        newEntries[index][name] = e.target.value
        setExperienceList(newEntries)

        // setResumeInfo({ ...resumeInfo, experience: newEntries })
    }

    const onSave=()=>{
        setLoading(true)
        const data={
            data:{
                experience:experienceList.map(({ id, ...rest }) => rest)
            }
        }

        console.log(data)
        Global.UpdateResume(params?.resumeid,data).then(res=>{
            console.log(res);
            setLoading(false);
            enabledNext(true)
            toast.success('Details updated !')
        },(error)=>{
            setLoading(false);
            toast.error('Something went wrong')
        })

    }

    useEffect(() => {
        setResumeInfo({ ...resumeInfo, experience: experienceList })
    }, [experienceList])

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Professional Experience</h2>
                <p>Add your professional experience</p>
                <div>
                    {
                        experienceList.map((experience, index) => (
                            <div key={index}>
                                <div className='grid grid-cols-2 gap-3 border p-3 rounded-lg my-3'>
                                    <div>
                                        <label className='text-xs'>Position Title</label>
                                        <Input name='title' onChange={(e) => handleChange(e, index)} value={experience?.title} />
                                    </div>
                                    <div>
                                        <label className='text-xs'>Company Name</label>
                                        <Input name='companyName' onChange={(e) => handleChange(e, index)} value={experience?.companyName} />
                                    </div>
                                    <div>
                                        <label className='text-xs'>City</label>
                                        <Input name='city' onChange={(e) => handleChange(e, index)} value={experience?.city} />
                                    </div>
                                    <div>
                                        <label className='text-xs'>State</label>
                                        <Input name='state' onChange={(e) => handleChange(e, index)} value={experience?.state} />
                                    </div>
                                    <div>
                                        <label className='text-xs'>Start Date</label>
                                        <Input type='date' name='startDate' onChange={(e) => handleChange(e, index)} value={experience?.startDate} />
                                    </div>
                                    <div>
                                        <label className='text-xs'>End Date</label>
                                        <Input type='date' name='endDate' onChange={(e) => handleChange(e, index)} value={experience?.endDate} />
                                    </div>
                                    <div className='col-span-2'>
                                        {/* <label className='text-xs'>Work Summary</label> */}
                                        {/* <Textarea name='workSummery' onChange={(e) => handleChange(e, index)} /> */}
                                        {/* {experience?.workSummery} */}
                                        <RichTextEditor index={index} defaultValue={experience?.workSummery} onRichTextEditorChange={(e) => handleRichTextEditorChange(e, 'workSummery', index)} />
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button variant='outline' className='text-primary border-primary' onClick={AddNewExperience}><PlusSquare />Add Experience</Button>
                        <Button variant='outline' className='text-primary border-primary' onClick={RemoveExperience}><MinusSquare />Remove</Button>
                    </div>
                    <Button disabled={!enabledNext} onClick={()=>onSave()}>{loading ? <Loader2 className='animate-spin' /> : 'Save'}</Button>
                </div>
            </div>
        </div>
    )
}

export default Experiencedetails