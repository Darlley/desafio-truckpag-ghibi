"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'
import { Slider } from './ui/slider'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

export default function FilterModal({ className }: { className?: string }) {
  const [value, setValue] = useState("")

  return (
    <Dialog >
      <DialogTrigger asChild>
        <div className={cn("flex flex-col items-center", className)}>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <Search
              className={cn(
                "size-4",
              )}
            />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filtrar os resultados</DialogTitle>
        </DialogHeader>


        <div className="space-y-6">
          {/* Search */}
          <div className="space-y-2">
            <Label>Buscar</Label>
            <Input type='text' value={value} onChange={(e) => setValue(e.target.value)} />
          </div>

          {/* Status Filters */}
          <div className="space-y-3">
            <Label className="text-base">Status</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="watched"
                />
                <Label htmlFor="watched" className="cursor-pointer">
                  Assistido
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="favorite"
                />
                <Label htmlFor="favorite" className="cursor-pointer">
                  Favorito
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasNotes"
                />
                <Label htmlFor="hasNotes" className="cursor-pointer">
                  Com notas
                </Label>
              </div>
            </div>
          </div>

          {/* Star Rating */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="stars">Avaliação mínima</Label>
              <span className="text-sm font-medium">5 estrelas</span>
            </div>
            <Slider
              id="stars"
              min={0}
              max={5}
              step={1}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>

          {/* Sort Options */}
          <div className="space-y-3">
            <Label className="text-base">Ordenar por</Label>
            <RadioGroup
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="title" id="sort-title" />
                <Label htmlFor="sort-title" className="cursor-pointer">
                  Título
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="duration" id="sort-duration" />
                <Label htmlFor="sort-duration" className="cursor-pointer">
                  Duração do filme
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rating" id="sort-rating" />
                <Label htmlFor="sort-rating" className="cursor-pointer">
                  Nota de avaliação
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter>
          <div className="w-full">
            <Button>
              Aplicar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
