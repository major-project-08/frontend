import React from 'react'
import Addresume from './conponents/Addresume'
import { useUser } from '@clerk/clerk-react'
import Global from '../../service/Global'
import { useEffect, useState } from 'react'
import ResumeCard from './conponents/ResumeCard'
import ChatbotButton from './conponents/ChatbotButtom'
function DashboardPage() {
    const {user} = useUser()
    const [resumeList, setResumeList] = useState([])

    useEffect(() => {
        getResumeList()
    }, [user])

    let getResumeList = () => {
        console.log(user)
        Global.GetResume(user?.primaryEmailAddress?.emailAddress).then((res) => {
            console.log(res)
            setResumeList(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="p-10 md:px-20 lg:px-32">
            <h2 className="text-2xl font-bold">My Resume</h2>
            <p>Start creating your resume for next job role using AI</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
                <Addresume />
                {resumeList.length > 0 && resumeList.map((resume,index) => (
                    <ResumeCard resume={resume} key={index} refreshData={getResumeList} />
                ))}
            </div>
            <ChatbotButton />
        </div>
    )
}

export default DashboardPage
