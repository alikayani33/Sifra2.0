import React, { useContext } from 'react';
import './app.css';
import va from './assets/ai.png';
import { FaMicrophone } from "react-icons/fa";
import { Datacontext } from './context/UserContext';
import speakimg from './assets/speak.gif';
import airesponse from './assets/aiVoice.gif';

function App() {
  let {recognition,speaking,setSpeaking,prompt,response,setResponse} = useContext(Datacontext)
  
  return (
    <div className='main'>
      <img src={va} alt="" id = "sifra" />
      <span>I am Sifra 2.0. Your advance Assistant</span>
      {!speaking?
      <button onClick={()=>{ 
        setSpeaking(true)
        setResponse(false)
        recognition.start()
        
      }}>Click Here <FaMicrophone /></button>
    :
    <div className='response'>
      {!response?<img src={speakimg} alt="" id= "speak" />
      :
      <img src={airesponse} alt="" id = "aigif"/>
      }
      
      <p> {prompt}</p>
      </div> 
      }
      
    </div>
  )
}

export default App
