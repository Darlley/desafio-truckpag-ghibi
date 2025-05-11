import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Textarea } from './ui/textarea'
import { Avatar, AvatarFallback } from './ui/avatar'

export default function CommentsModal() {
   const staticComments = [
    {
      id: 1,
      user: "cinefilo123",
      avatar: "C",
      text: "Filme incrivel...",
      timestamp: "2 dias atrás",
    },
    {
      id: 2,
      user: "moviebuff",
      avatar: "M",
      text: "Nota 10 🤩",
      timestamp: "5 horas atrás",
    },
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center">
          <Button
            variant="default"
            size="icon"
            className="rounded-full"
          >
            <MessageSquare
              className={cn(
                "size-4",
              )}
            />
          </Button>
          <span className="text-xs mt-1">Comentários</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Comentários 🍄</DialogTitle>
          <DialogDescription>
            Interaja com a comunidade, queremos saber o que você achou do filme!
          </DialogDescription>
        </DialogHeader>
        
        <div className="max-h-[60vh] overflow-y-auto space-y-4">
          {staticComments.map((comment) => (
            <div key={comment.id} className="border rounded-lg p-3">
              <div className="flex items-center mb-2 space-x-2">
                <Avatar>
                  <AvatarFallback>{comment.avatar}</AvatarFallback>
                </Avatar>
                <div className='space-x-2'>
                  <span className="font-medium">{comment.user}</span>
                  <span className="text-xs">{comment.timestamp}</span>
                </div>
              </div>
              <p className="text-sm">{comment.text}</p>
            </div>
          ))}
        </div>
        
        <DialogFooter>
          <div className="w-full">
            <Textarea
              placeholder="Adicione seu comentário..."
              className="w-full rounded p-2 text-sm focus:outline-none focus:ring-1 min-h-[80px]"
            />
            <div className="flex justify-end mt-2">
              <Button>
                Comentar
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
