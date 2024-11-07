import React from 'react'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import { useContext } from 'react'

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
            </div>
        </div>
    )
}

export default Experiencedetails