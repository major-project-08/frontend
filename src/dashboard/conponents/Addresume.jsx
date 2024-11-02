import { PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Global from '../../../service/Global'
import { Loader2 } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    // DialogClose,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
function Addresume() {
    const [openDialog, setOpenDialog] = useState(false)
    const [resumeTitle, setResumeTitle] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {user} = useUser()

    let toCreateResume = async () => {
        setLoading(true)
        let id = uuidv4()
        const data = {
            data: {
                title: resumeTitle,
                resumeid: id,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                userName: user?.fullName
            }
        }
        console.log('Data to be sent:', data);
        // console.log(resumeTitle, id)
        Global.CreateNewResume(data).then((res) => {
            setLoading(false)
            console.log(res)
            navigate(`/dashboard/resume/${res.data.data.documentId}/edit`)
        }).catch((err) => {
            setLoading(false)
            console.log(err)
        })
    }
    return (
        <div>
            <div className="p-14 py-24 flex items-center justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 hover:shadow-md cursor-pointer transition-all duration-300" onClick={() => setOpenDialog(true)}>
                <PlusSquare className="w-10 h-10 text-primary"/>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create your new Resume</DialogTitle>
                        <DialogDescription>
                            <p>
                            Enter title for the resume
                            </p>
                            <Input className="my-2" placeholder="Ex. full stack developer" onChange={(e) => setResumeTitle(e.target.value)}/>
                            {/* Ensure DialogClose is not used here */}
                        </DialogDescription>
                        <div className="flex items-center justify-end gap-4">
                            <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
                            <Button disabled={!resumeTitle || loading} onClick={toCreateResume}>
                                {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : 'Create Resume'}
                            </Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Addresume