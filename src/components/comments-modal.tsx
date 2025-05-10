import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function CommentsModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/30 h-12 w-12"
          >
            <MessageSquare
              className={cn(
                "h-6 w-6 transition-all duration-300",
              )}
            />
          </Button>
          <span className="text-xs mt-1">Comentários</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Comentários</DialogTitle>
          <DialogDescription>
            O que você achou do filme? Deixe seu comentário!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Comentar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
