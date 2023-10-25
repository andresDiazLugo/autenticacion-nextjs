"use client"
import axios,{AxiosError} from 'axios'
import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react'
import {useRouter} from 'next/navigation'
export default  function RegisterPage() {
    const router = useRouter()
    const [error, setError] = useState();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const email =  formData.get('email')
        const password = formData.get('password')
        const fullname = formData.get('fullname')
        console.log(email,password,fullname)
     

        try {
            const res = await axios.post('/api/auth/signup',{
                email :  formData.get('email'),
                password : formData.get('password'),
                fullname : formData.get('fullname'),
            })
          const resApi = await  signIn('credentials',{
                email: res.data.email,
                password: formData.get("password"),
                redirect: false
            })
            if(resApi?.ok) return router.push("/dashboard")
            console.log(resApi)
        } catch (error) {
            console.log(error)
            if(error instanceof AxiosError){
                setError(error.response?.data.message)
            }    
        }
    }
    return (
      <div>
        <form onSubmit={handleSubmit}>
            {error && <div className=' bg-red-500 text-white p-2 mb-2'>{error}</div>}
            <h1>SignUp</h1>
            <input type="text" placeholder="Tu nombre" name="fullname" className="bg-zinc-800 px-4 py-2 block mb-2" />
            <input type="email" placeholder="Tu email" name="email" className="bg-zinc-800 px-4 py-2 block mb-2" />
            <input type="password" placeholder="Tu contraseña" name="password" className="bg-zinc-800 px-4 py-2 block mb-2" />
            
            <button className="bg-indigo-500 px-4 py-2">Register</button>
        </form>
      </div>
    )
  }