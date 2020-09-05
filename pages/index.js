import LoginModal from '../components/loginModal'
import { useState } from 'react'
import authHandler from '../lib/auth/authHandler'

const Home = () => {

  const [loginModalVisible, setLoginModalVisible] = useState(false)
  authHandler.then((b)=>{
    if(b) window.location = "/tv"
  })

  return (
    <>

      <div className="flex pl-10 items-center h-screen">
        <div>
          <h1>🎛 dash.hidde.me</h1>
          <a onClick={() => setLoginModalVisible(true)} className="btn" href="#">TV</a>
        </div>
      </div>
      <LoginModal visible={loginModalVisible} setVisibility={setLoginModalVisible}/>

    </>
  )
}
export default Home
