interface MessageProps {
  message: {
    id: string
    text: string
    createdAt: string
  }
  onDelete: (id: string) => void
}

export default function Message({ message, onDelete }: MessageProps) {
  return (
    <div className="flex items-start justify-between rounded-3xl border border-[#3a506b] bg-[#ffffff] p-4 text-sm text-slate-950">
      <div className="min-w-0">
        <p className="whitespace-pre-wrap wrap-break-word text-slate-950">{message.text}</p>
        <p className="mt-2 text-xs text-slate-700">{new Date(message.createdAt).toLocaleString()}</p>
      </div>
      <button
        type="button"
        onClick={() => onDelete(message.id)}
        className="ml-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#3a506b] text-white transition hover:bg-[#1c2541]"
        aria-label="Delete message"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M9 3h6a1 1 0 0 1 1 1v1h3a1 1 0 1 1 0 2h-1v13a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7H3a1 1 0 1 1 0-2h3V4a1 1 0 0 1 1-1zm1 2V4H8v1h2zm4 0V4h-2v1h2zm-5 3a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1zm5 0a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1z" />
        </svg>
      </button>
    </div>
  )
}
