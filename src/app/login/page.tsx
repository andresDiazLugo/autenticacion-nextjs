"use client"
import axios,{AxiosError} from 'axios'
import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react'
import {useRouter} from 'next/navigation'
export default  function LoginPage() {
    const router = useRouter()
    const [error, setError] = useState<string>();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const email =  formData.get('email')
        const password = formData.get('password')
        const fullname = formData.get('fullname')
        console.log(email,password,fullname)
     
       
          const resApi = await  signIn('credentials',{
                email: formData.get("email"),
                password: formData.get("password"),
                redirect: false
            })
            if(resApi?.error) return setError(resApi.error as string)
            if(resApi?.ok) return router.push("/dashboard")
            console.log(resApi)
    
    }
    return (
      <div>
        <form onSubmit={handleSubmit}>
            {error && <div className=' bg-red-500 text-white p-2 mb-2'>{error}</div>}
            <h1>Sigin</h1>
            <input type="email" placeholder="Tu email" name="email" className="bg-zinc-800 px-4 py-2 block mb-2" />
            <input type="password" placeholder="Tu contraseña" name="password" className="bg-zinc-800 px-4 py-2 block mb-2" />
            
            <button className="bg-indigo-500 px-4 py-2">Login</button>
        </form>
      </div>
    )
  }