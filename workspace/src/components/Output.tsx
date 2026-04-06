"use client"
import Button from '@mui/material/Button';
import { type SyntheticEvent, useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import OpenAI from 'openai';

interface ConversationMessage {
    id: string
    text: string
    role: 'user' | 'assistant'
    createdAt: string
}

interface OutputProps {
    conversations: ConversationMessage[]
    onSubmit: (text: string, role: 'user' | 'assistant') => void
}

let openai: OpenAI | null = null;

try {
  openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
} catch (error) {
  console.error("Failed to initialize OpenAI client:", error);
}

async function callOpenAIAPI(prompt: string){
    if (!openai) {
      throw new Error("OpenAI client not initialized");
    }
    try {
      const response = await openai.responses.create({
          model: "gpt-5.4-mini",
          input: prompt
      });
      
      // Extract text content from response
      let textContent = '';
      
      if (typeof response === 'string') {
        textContent = response;
      } else if (response && typeof response === 'object') {
        // Try different possible response structures - prioritize output_text and output.text
        if ((response as any).output_text) {
          textContent = String((response as any).output_text);
        } else if ((response as any).output?.text) {
          textContent = String((response as any).output.text);
        } else if ((response as any).output) {
          textContent = String((response as any).output);
        } else if ((response as any).text) {
          textContent = String((response as any).text);
        } else if ((response as any).response) {
          textContent = String((response as any).response);
        } else if ((response as any).content) {
          textContent = String((response as any).content);
        } else if ((response as any).message) {
          textContent = String((response as any).message);
        } else if ((response as any).result) {
          textContent = String((response as any).result);
        } else if ((response as any).data) {
          textContent = String((response as any).data);
        } else {
          textContent = "Unable to parse response";
        }
      } else {
        textContent = "Unexpected response format";
      }
      
      return textContent;
    } catch (error) {
      console.error("API call error:", error);
      throw error;
    }
}

export default function Output({ conversations, onSubmit }: OutputProps) {
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversations, isLoading])

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault()
    const trimmed = prompt.trim()
    if (!trimmed || isLoading) return
    
    // Add user message
    onSubmit(trimmed, 'user')
    setPrompt("")
    setIsLoading(true)
    
    try {
      // Get AI response
      const aiResponse = await callOpenAIAPI(trimmed)
      
      if (aiResponse && typeof aiResponse === 'string' && aiResponse.trim().length > 0) {
        onSubmit(aiResponse, 'assistant')
      } else {
        onSubmit("I received an empty or invalid response from the API.", 'assistant')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      onSubmit(`Sorry, I encountered an error: ${errorMessage}`, 'assistant')
    } finally {
      setIsLoading(false)
    }
  }

  // Show chat thread view if there are conversations
  if (conversations.length > 0) {
    return (
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Chat messages area */}
        <div className="flex-1 overflow-y-auto space-y-4 px-6 py-4">
          {[...conversations].reverse().map((message) => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="flex max-w-md items-end gap-2">
                <div className={`rounded-3xl px-4 py-2 ${
                  message.role === 'user' 
                    ? 'bg-[#3a506b] text-white' 
                    : 'bg-[#ffffff] text-slate-950 border border-[#3a506b]'
                }`}>
                <div className="whitespace-pre-wrap wrap-break-word prose max-w-none prose-sm">
                  <ReactMarkdown>{String(message.text)}</ReactMarkdown>
                </div>
                  <p className="mt-1 text-xs opacity-70">{new Date(message.createdAt).toLocaleTimeString()}</p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-3xl bg-[#3a506b] px-4 py-2 text-white">
                <p className="text-sm">Thinking...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area at bottom */}
        <div className="border-t border-[#3a506b] bg-gray-400 p-4">
          <form onSubmit={handleSubmit} className="submission mx-auto w-full max-w-3xl flex rounded-4xl bg-[#1c2541] p-3 border border-[#3a506b]">
            <input
              className="textField w-full min-h-full p-2 outline-none bg-[#1c2541] text-white"
              type="text"
              placeholder="Type your message..."
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={!prompt || isLoading}
              className="submit w-40 bg-white! text-[#0b132b]! disabled:bg-[#c0c0c0]! disabled:text-[#0b132b]!"
              variant="contained"
              sx={{ borderRadius: 28 }}
            >
              {isLoading ? 'Sending...' : 'submit'}
            </Button>
          </form>
        </div>
      </div>
    )
  }

  // Show initial prompt screen
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-1">
      <div className="w-full mx-auto flex flex-col items-center gap-5 p-6 rounded-3xl">
        <h2 className="text-xl md:text-3xl text-white font-bold">What Can I help with?</h2>
        <form onSubmit={handleSubmit} className="submission w-full bg-[#3a506b] max-w-3xl p-3 flex rounded-4xl border border-[#ffffff]">
          <input
            className="textField w-full min-h-full p-2 outline-none bg-[#3a506b] text-white"
            type="text"
            placeholder="Senna Prompt Pussah Hoe"
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!prompt || isLoading}
            className="submit w-40 bg-white! text-[#0b132b]! disabled:bg-[#c0c0c0]! disabled:text-[#0b132b]!"
            variant="contained"
            sx={{ borderRadius: 28 }}
            >
            {isLoading ? 'Sending...' : 'submit'}
          </Button>
        </form>
      </div>
    </div>
  )
}
