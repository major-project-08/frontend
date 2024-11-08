import React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Global from './../../../../../service/Global';
import { toast } from 'sonner';
import { LoaderCircle, Brain } from 'lucide-react';
import { AIChatSession } from './../../../../../service/ALmodel';

const prompt = "Job Title: {jobTitle},depends on job title give me summary for my resume within 4-5 lines in JSON format with field experience level and summary with experience level for fresher,mid level and experienced give me the data in the form of an object which has a key 'result' which has the value array of objects in object there are two keys experience_level and summary and only give the data"
function Summarydetails({ enabledNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [summary, setSummary] = useState()
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const [AIGeneratedSummaryList, setAIGeneratedSummaryList] = useState()
    useEffect(() => {
        summary && setResumeInfo({ ...resumeInfo, summery: summary })
    }, [summary])

    const generateSummaryFromAI = async () => {
        setLoading(true)
        const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle)
        console.log(PROMPT);
        const resp = await AIChatSession.sendMessage(PROMPT)
        console.log(resp.response.text());
        // setSummary(resp.response.text())
        setAIGeneratedSummaryList(JSON.parse(resp.response.text()))
        setLoading(false)
    }
    const onSave = (e) => {
        e.preventDefault()
        setLoading(true)
        const data = {
            data: {
                summery: summary
            }
        }
        Global.UpdateResume(params?.resumeid, data).then(resp => {
            console.log(resp);
            enabledNext(true);
            setLoading(false);
            toast.success("Details updated")
        }, (error) => {
            setLoading(false);
        })
    }
    const selectedSummary = (element) => {
        const selected = AIGeneratedSummaryList?.result?.find((item) => item?.experience_level === element)
        console.log(selected);
        setSummary(selected?.summary)
    }
    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Summary</h2>
                <p>Get Started with the summary of your resume</p>

                <form className='mt-7' onSubmit={onSave}>
                    <div className='mt-5 flex justify-between items-end'>
                        <label htmlFor='summary'>Add Summary</label>
                        <Button variant='outline' onClick={() => generateSummaryFromAI()} size='sm' type='button' className='border-primary text-primary px-4 py-2 rounded-md'><Brain className='h-4 w-4' />Generate from AI</Button>
                    </div>
                    <Textarea id='summary' value={resumeInfo?.summery} required onChange={(e) => setSummary(e.target.value)} className='w-full h-24 border-2 border-gray-300 rounded-md p-2 mt-5 shadow-sm' placeholder='Enter your summary' />
                    <div className='flex justify-end mt-5'>
                        <Button type="submit"
                            disabled={loading}>
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>

            
            <div className='mt-5'>
                <h2 className='font-bold text-lg'>AI Generated Summary</h2>
                <p>To get AI generated summary, click on the button above, then you will get some summaries below</p>
                <div className='mt-5'>
                    {AIGeneratedSummaryList?.result?.map((item, index) => (
                        <div key={index} className='border-2 border-primary pb-2 px-2 rounded-md mb-2 cursor-pointer shadow-lg hover:scale-105 transition-all duration-300 ' onClick={() => selectedSummary(item?.experience_level)}>
                            <h3 className='font-bold text-primary'>{item?.experience_level}</h3>
                            <p>{item?.summary}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Summarydetails