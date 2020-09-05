import { useState } from 'react'
import { useRouter } from 'next/router'

export default function LoginModal ({ visible, setVisibility }) {

  const router = useRouter()
  const [pass, setPass] = useState('')

  const login = async () => {
    const result = await fetch('/api/user/auth', { method: 'POST', body: JSON.stringify({ pass: pass }) })
    const response = await result.json()
    if (response.ok && response.token) {
      localStorage.setItem('auth', response.token)
      await router.push('/tv')
      // await Router.push("/tv")
    }
  }

  return (
    <div className={`p-8 rounded-lg absolute bg-gray-200 shadow-lg ${visible ? 'block' : 'hidden'}`}
         style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <h2 className="leading-normal mb-2">login</h2>
      <input onChange={(e) => setPass(e.target.value)} onKeyDown={(k) => {if (k.keyCode === 13) login()}}
             className="bg-white focus:outline-none focus:border-2 focus:border-black border border-gray-300 mb-2 rounded-sm py-2 px-4 block w-full appearance-none leading-normal"
             type="password"/>
      <div onClick={login} className="btn cursor-pointer">go 🚀</div>
      {/*<div onClick={()=>{setVisibility(false)}} className="border border-black text-center p-2 hover:bg-primary cursor-pointer w-100 font-bold">exit</div>*/}
    </div>
  )
}
