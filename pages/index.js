import LoginModal from '../components/loginModal'
import { useState } from 'react'

const Home = () =>{

  const [loginModalVisible, setLoginModalVisible] = useState(false);

  return (
    <>

      <div className="flex pl-10 items-center h-screen">
        <div>
          <h1>dash.hidde.me</h1>
          <a onClick={()=>setLoginModalVisible(true)} className="btn" href="#">TV</a>
        </div>
      </div>
      <LoginModal visible={loginModalVisible} setVisibility={setLoginModalVisible}/>

    </>
  )
}
export default Home
