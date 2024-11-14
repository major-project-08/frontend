import { MoreVertical, NotebookIcon } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Global from '../../../service/Global'


function ResumeCard({ resume, refreshData }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const onDelete = () => {
        setLoading(true)
        Global.DeleteResume(resume.documentId).then(res => {
            console.log(res)
            toast.success("Resume deleted successfully")
            setOpen(false)
            refreshData()
            setLoading(false)
        }).catch(err => {
            console.log(err)
            toast.error("Resume deleted failed")
            setLoading(false)
        })
    }
    return (
        // <div>ResumeCard</div>
        <div>

            <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
                <div className='p-14 h-[280px] flex justify-center items-center bg-secondary rounded-lg hover:scale-105 hover:shadow-md cursor-pointer transition-all duration-300 shadow-primary'>
                    <NotebookIcon className='w-10 h-10 text-primary' />
                </div>
            </Link>
            <div className='flex justify-between items-center'>
                <h3 className='text-center font-bold text-primary'>{resume.title}</h3>
                <DropdownMenu>
                    <DropdownMenuTrigger className='bg-white p-0 border-none'>
                        <MoreVertical className='w-4 h-4 cursor-pointer' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className='cursor-pointer' onClick={() => navigate(`/dashboard/resume/${resume.documentId}/edit`)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer' onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}>View</DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer' onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}>Download</DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer' onClick={() => setOpen(true)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={onDelete} disabled={loading}> {loading ? <Loader2 className='w-4 h-4 animate-spin' /> : "Continue"}</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </div>
        </div>
    )
}

export default ResumeCard