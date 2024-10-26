import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [latestmessage, setlatestmessage] = useState("");
  const [sendmessage, setsendmessage] = useState("");

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connection established');
      newSocket.send('Hello Server!');
      setSocket(newSocket);
    }
    newSocket.onmessage = (message) => {
      console.log('Message received:', message.data);
      setlatestmessage(message.data)
    }
    return () => newSocket.close();
  }, [])

  if(!socket) {
    return <div>Loading...</div>
  }
  return (
    <>
      <input type="text" onChange={(e) => setsendmessage(e.target.value)}/>
      <button onClick={() => {
        socket.send(sendmessage);
      }}>Send</button>
      {latestmessage}
    </>
  )
}

export default App