import { useState } from "react"
import Navbar from "./components/Navbar"
import Output from "./components/Output"
import Footer from "./components/Footer"
import History from "./components/History"

interface ChatMessage {
  id: string
  text: string
  role: 'user' | 'assistant'
  createdAt: string
}

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const handleSubmit = (text: string, role: 'user' | 'assistant' = 'user') => {
    setMessages((prev) => [
      {
        id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}`,
        text,
        role,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ])
  }

  const handleDelete = (id: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== id))
  }

  const handleClear = () => {
    setMessages([])
  }

  return (
    <div className="min-h-screen bg-[#0b132b] text-white overflow-hidden">
      <Navbar />
      <div className="grid h-screen grid-cols-5 pt-[68px] overflow-hidden">
        <div className="col-span-1 bg-[#1c2541] overflow-hidden">
          <History messages={messages.filter(m => m.role === 'user')} onDelete={handleDelete} onClear={handleClear} />
        </div>

        <div className="col-span-4 bg-gray-400 flex flex-col overflow-hidden">
          <Output conversations={messages} onSubmit={handleSubmit} />
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default App
