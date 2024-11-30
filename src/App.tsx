import { useEffect, useRef, useState } from 'react';
import './App.css'

function App() {

  const [messages, setMessages] = useState(["Hi there", "Hello"])
  const messageRef = useRef<HTMLInputElement>()
  const wsRef = useRef<WebSocket>()

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    wsRef.current = ws
    ws.onmessage = (event) => {
      setMessages(m => [...m, event.data])
    }
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
      }))
    }
    return () => {
      ws.close()
    }
  }, [])

  function sendMessage() {
    const message = messageRef.current?.value
    wsRef.current?.send(JSON.stringify({
      type: "message",
      payload: {
        message
      }
    }))
  }

  return <div className='h-screen bg-black flex flex-col justify-between items-center content-center gap-4 w-[100vw]'>
    <div className='flex w-[90vw] justify-self-center mt-10'>
      <div className='flex content-center justify-center flex-col gap-2 w-auto'>
        {messages.map(message =>
          <div className='text-black rounded bg-white py-2 px-4 text-center'>
            {message}
          </div>)}
      </div>
    </div>
    <div className='flex content-center justify-center mb-10 gap-4'>
      <input ref={messageRef} className='px-4 rounded w-72 bg-black border border-white text-sm outline-none text-white' type="text" placeholder='Enter a message...' />
      <button onClick={sendMessage} className='text-white border border-white py-2 px-4 rounded flex gap-2 hover:bg-blue-400 items-center transition-all delay-50'>Send<Send /></button>
    </div>
  </div>
}

function Send() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
  </svg>

}

export default App
