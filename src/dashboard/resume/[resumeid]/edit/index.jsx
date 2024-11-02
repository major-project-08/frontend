import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from './../../components/FormSection'
import ResumePreview from './../../components/ResumePreview'
function EditResume() {
    const params = useParams()
    useEffect(() => {
        console.log(params.resumeid)
    }, [])
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
            <FormSection />
            <ResumePreview />
        </div>
    )
}

export default EditResume