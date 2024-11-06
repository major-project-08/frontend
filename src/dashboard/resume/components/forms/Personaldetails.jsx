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
            <form>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 my-5'>
                    <input type='text' id='firstname' className='bg-transparent border-b-2 border-b-primary outline-none ' placeholder='Enter your firstname'/>
                    <input type='text' id='lastname' className='bg-transparent border-b-2 border-b-primary outline-none' placeholder='Enter your lastname'/>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 my-5'>
                    <input type='text' id='phone' className='bg-transparent border-b-2 border-b-primary outline-none ' placeholder='Enter your phone number'/>
                    <input type='email' id='email' className='bg-transparent border-b-2 border-b-primary outline-none' placeholder='Enter your email'/>
                </div>
                <div className='my-5 row-span-2'>
                    <textarea id='address' className='bg-transparent border-b-2 border-b-primary outline-none w-full' placeholder='Enter your address'></textarea>
                </div>
            </form>
        </div>
    )
}

export default Personaldetails