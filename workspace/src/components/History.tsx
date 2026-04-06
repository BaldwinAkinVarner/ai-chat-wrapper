import Message from "./Message"

interface ChatMessage {
  id: string
  text: string
  createdAt: string
}

interface HistoryProps {
  messages: ChatMessage[]
  onDelete: (id: string) => void
  onClear: () => void
}

export default function History({ messages, onDelete, onClear }: HistoryProps) {
  return (
    <div className="flex h-full min-h-0 flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">History</h2>
        <span className="text-sm text-slate-700">{messages.length} saved</span>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto space-y-3 rounded-3xl border border-[#3a506b] bg-[#ffffff] p-3">
        {messages.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#3a506b] bg-[#1c2541] p-5 text-center text-white">
            No previous prompts yet.
          </div>
        ) : (
          messages.map((message) => (
            <Message key={message.id} message={message} onDelete={onDelete} />
          ))
        )}
      </div>

      <button
        type="button"
        onClick={onClear}
        disabled={messages.length === 0}
        className="mt-auto rounded-3xl bg-[#3a506b] px-4 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-[#1c2541]"
      >
        Clear all messages
      </button>
    </div>
  )
}
