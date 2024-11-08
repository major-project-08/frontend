import React, { useEffect, useState } from 'react'
import Header from '../../../components/custom/Header'
import { Button } from '@/components/ui/button'
import ResumePreview from '../../../dashboard/resume/components/ResumePreview'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import Global from '../../../../service/Global'
import { RWebShare } from "react-web-share";
function ViewResume() {
    const [resumeInfo, setResumeInfo] = useState();
    const params = useParams();
    const GetResumeInfo = async () => {
        Global.GetResumeById(params?.resumeid).then((res) => {
            setResumeInfo(res?.data?.data);
            console.log(res?.data?.data);
        })
    }

    const HandleDownload = () => {
        window.print();
    }
    useEffect(() => {
        GetResumeInfo();
    }, [])
    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id='non-print'>
                <Header />
                <div className='flex flex-col'>
                    <h2 className='text-2xl text-center'>Congratulations! Your resume is ready</h2>
                    <p className='text-center text-sm text-gray-500'>Your resume has been generated successfully. You can download it or share it with others.</p>
                    <div className='flex justify-between gap-5 m-5 px-44'>
                        <Button onClick={HandleDownload}>Download</Button>
                        <RWebShare
                            data={{
                                text: "To see my resume click here",
                                url: `${import.meta.env.VITE_BASE_URL}/my-resume/${params?.resumeid}/view`,
                                title: resumeInfo?.firstName + " " + resumeInfo?.lastName,
                            }}
                            onClick={() => console.log("shared successfully!")}
                        >
                            <Button>Share</Button>
                        </RWebShare>
                    </div>
                </div>
            </div>
            <div id='print-area'>
                <ResumePreview />
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default ViewResume