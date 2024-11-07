import { NotebookIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
function ResumeCard({resume}) {
    return (
        // <div>ResumeCard</div>
        <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
            <div className='p-14 h-[280px] flex justify-center items-center bg-secondary rounded-lg hover:scale-105 hover:shadow-md cursor-pointer transition-all duration-300 shadow-primary'>
                <NotebookIcon className='w-10 h-10 text-primary'/>
            </div>
            <div>
                <h3 className='text-center font-bold'>{resume.title}</h3>
            </div>
        </Link>
    )
}

export default ResumeCard