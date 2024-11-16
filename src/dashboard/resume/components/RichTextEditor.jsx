import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Brain, LoaderCircle } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnRedo, BtnStrikeThrough, BtnUnderline, BtnUndo, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg'
import { toast } from 'sonner'
import { AIChatSession } from '../../../../service/ALmodel'

const prompt = "position title: {positionTitle}, depends on position title only give me 2 bullet points for my experince in resume, give me result as object and the object should contain a key 'experience'and the value is in html format onlly give <ul> tag and 2 li tags in value"
function RichTextEditor({ index, onRichTextEditorChange, defaultValue }) {
    const [value, setValue] = useState(defaultValue)
    const { resumeInfo , setResumeInfo} = useContext(ResumeInfoContext)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        update();
    },[value])
    const generateFromAI = async () => {
        setLoading(true)
        if(!resumeInfo?.experience[index]?.title){
            toast.error('Please add position title first')
            return
        }
        const PROMPT = prompt.replace('{positionTitle}', resumeInfo?.experience[index]?.title)
        const resp = await AIChatSession.sendMessage(PROMPT)
        console.log(PROMPT)
        console.log(resp.response.text());
        const data = JSON.parse(resp.response.text())
        setValue(data?.experience)
        setLoading(false)
        // setSummary(resp.response.text())
        // setAIGeneratedSummaryList(JSON.parse(resp.response.text()))
    }
    let update = ()=>{
        setResumeInfo({...resumeInfo , workSummery : value})
    }
    return (
        <div>
            <div className='flex items-center justify-between my-2'>
                <label className='text-xs'>Work Summary</label>
                <Button variant='outline' onClick={generateFromAI} disabled={loading}  size='sm' className='text-primary border-primary flex items-center gap-2'>{loading ? <LoaderCircle className='w-4 h-4 animate-spin' /> : <Brain className='w-4 h-4' />}Generate from AI</Button>
            </div>
            <EditorProvider>
                <Editor value={value} onChange={(e) => {setValue(e.target.value);
                    onRichTextEditorChange(e)
                }} className='border-none'>
                    <Toolbar>
                        <BtnUndo />
                        <BtnRedo />
                        <Separator />
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                        <BtnClearFormatting />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    )
}

export default RichTextEditor