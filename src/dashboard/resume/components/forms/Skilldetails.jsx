import React, { useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PlusSquare, MinusSquare, Loader2 } from 'lucide-react'
import { useEffect,useContext } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import Global from '../../../../../service/Global'
import { toast } from 'sonner'

function Skilldetails({enabledNext}) {
    const [loading,setLoading] = useState(false)
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    // const [enabledNext,setEnabledNext] = useState(false)
    const params = useParams()
    const [skillsList,setSkillsList] = useState([{
        name:"",
        rating:0
    }])

    useEffect(()=>{
        resumeInfo && setSkillsList(resumeInfo?.skills)
    },[])
    
    const handleSkillChange = (index,field,value)=>{
        const newSkills = [...skillsList]
        newSkills[index][field] = value
        setSkillsList(newSkills)
    }

    const AddNewSkill = ()=>{
        setSkillsList([...skillsList,{name:"",rating:0}])
    }

    const RemoveSkill = ()=>{
        const newSkills = [...skillsList]
        newSkills.pop()
        setSkillsList(newSkills)
    }

    const onSave = async ()=>{
        setLoading(true)
        const data = {
            data:{
                skills:skillsList
            }
        }
        console.log(data)

        Global.UpdateResume(params.resumeid,data)
            .then((res)=>{
                setLoading(false)
                enabledNext(true)
                toast.success('Skills details updated successfully')
            })
            .catch((err)=>{
                setLoading(false)
                enabledNext(true)
                toast.error('Something went wrong')
            })
    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            skills:skillsList
        })
    },[skillsList])
    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Skills</h2>
            <p>Add your skills to your resume</p>
            <div>
                {skillsList?.map((skill,index)=>(
                    <div key={index} className='flex justify-between items-center gap-5 border p-3 rounded-lg mb-3'>
                        <div>
                            <label>Skill Name</label>
                            <Input type='text' value={skill?.name} onChange={(e)=>handleSkillChange(index,'name',e.target.value)}/>
                        </div>
                        <Rating style={{ maxWidth: 125 }} value={skill?.rating} onChange={(value)=>handleSkillChange(index,'rating',value)} />
                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant='outline' className='text-primary border-primary' onClick={AddNewSkill}><PlusSquare />Add Skill</Button>
                    <Button variant='outline' className='text-primary border-primary' onClick={RemoveSkill}><MinusSquare />Remove</Button>
                </div>
                <Button disabled={!enabledNext} onClick={()=>onSave()}>{loading ? <Loader2 className='animate-spin' /> : 'Save'}</Button>
            </div>
        </div>
    )
}

export default Skilldetails