import React from 'react'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import { useContext } from 'react'
function Personaldetails() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    return (
        <div className='shadow-lg rounded-lg p-5 border-t-4 border-t-primary mt-10'>
            <h2 className='text-sm font-bold mb-2 text-center' style={{ color: resumeInfo?.themeColor }}>Personal Details</h2>
            <p className='text-xs text-center'>Get started by some basic information about yourself</p>
            <hr style={{ borderColor: resumeInfo?.themeColor }} />
        </div>
    )
}

export default Personaldetails