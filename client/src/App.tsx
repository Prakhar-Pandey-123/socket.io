import {io} from "socket.io-client"
import { useRef, useState } from "react";
import { useEffect } from "react";

const App=()=>{
  const [mssg,setMssg]=useState("");
  const socketRef=useRef<any>(null);
  const [list,setList]=useState([]);

  useEffect(()=>{
     socketRef.current=io("http://localhost:3000")

     socketRef.current.on("chat mssg",(msg)=>{
      setList(prev=>[...prev,msg]);
    })

     return()=>{
      socketRef.current.disconnect();
     }
  },[]);

  function submit(){
    if(mssg){
      socketRef.current.emit("chat mssg",mssg);
      setMssg("");
    }
    else return;
  }

  return (
    <div className="bg-white w-screen h-screen mx-auto flex items-center bg-zinc-600 ">
      <div className="w-72 h-72 bg-zinc-900 rounded-lg mx-auto p-2">
        <div className="flex justify-center m-4 text-xl">
          Chatting - App
        </div>
        <div>
        {
          list.map((msg,index)=>(
            <div
              key={index}
              className="text-md text-white"
            >{msg}
              </div>
          ))
        }
        </div>
        <input
        onChange={(e)=>setMssg(e.target.value)}
        value={mssg}
          className="border-2 p-1 rounded-md"
        placeholder="write the mssg...">
        </input>
        <button onClick={submit}>
          Send
        </button>
        
      </div>
      
    </div>
  )
}
export default App