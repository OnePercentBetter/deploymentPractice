import { useState, useEffect } from 'react'
import { io, Socket} from "socket.io-client"
import './App.css'

const BACKEND_URL = "https://makeshift-legs-production.up.railway.app"

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
  }, [])

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
