import axios from 'axios'
let apiKey = import.meta.env.VITE_STRAPI_API_KEY
const axiosCreate = axios.create({
    baseURL: 'http://localhost:1337/api',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    }
})


const CreateNewResume = (data) => {
    console.log(data)
    return axiosCreate.post('/user-resumes',data)
}

const GetResume = (emailResume) => {
    console.log(emailResume)
    return axiosCreate.get('/user-resumes?filters[userEmail][$eq]='+emailResume)
}
export default {CreateNewResume,GetResume}