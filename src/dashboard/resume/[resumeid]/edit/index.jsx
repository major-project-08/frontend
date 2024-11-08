import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from './../../components/FormSection'
import ResumePreview from './../../components/ResumePreview'
import dummy from '../../../../data/dummy'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import { useState } from 'react'
import Global from '../../../../../service/Global'
function EditResume() {
    const params = useParams()
    const [resumeInfo, setResumeInfo] = useState()
    useEffect(() => {
        console.log(params.resumeid)
        GetResumeInfo()
    }, [])

    const GetResumeInfo = ()=>{
        Global.GetResumeById(params?.resumeid).then(res=>{
            setResumeInfo(res?.data?.data)
            console.log(res?.data.data)
            console.log(res?.data)
        })
    }
    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
                <FormSection />
                <ResumePreview />
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default EditResume