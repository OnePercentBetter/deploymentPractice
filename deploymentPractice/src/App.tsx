import { useState, useEffect } from 'react'
import { io, NodeWebSocket, Socket} from "socket.io-client"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const BACKEND_URL = "localhost:3000"

function App() {
  const [count, setCount] = useState(0)
  const [socket, setSocket] = useState< Socket | null>(null)


  useEffect(() => {
    const newSocket = io(BACKEND_URL);
    setSocket(newSocket);

    newSocket.on('result', ({ newCount }) => {
      setCount(newCount);
    })

    return () => {
      newSocket.disconnect();
    }
  })

  const handleButtonClick = () => {
    if (socket) {
      socket.emit("increment", count);
    }
  }

  return (
    <>
      <div>
      </div>
      <h1>Socket IO</h1>
      <div className="card">
        <button onClick={handleButtonClick}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
