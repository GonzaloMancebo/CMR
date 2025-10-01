
"use client"
import type { MessageType } from "@/lib/types"
import { CheckCircle, AlertTriangle } from "lucide-react"

interface MessageToastProps {
  message: MessageType | null
}

export function MessageToast({ message }: MessageToastProps) {
  if (!message) return null

  return (
    <div
      className="fixed top-4 right-4 z-50 p-4 rounded-lg shadow-xl"
      style={{
        backgroundColor: message.type === "success" ? "#d1e7dd" : "#f8d7da",
        color: message.type === "success" ? "#0f5132" : "#842029",
      }}
    >
      <div className="flex items-center gap-2">
        {message.type === "success" ? <CheckCircle className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
        <span className="font-medium">{message.text}</span>
      </div>
    </div>
  )
}
