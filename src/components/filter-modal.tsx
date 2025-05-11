"use client"

import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'
import { Slider } from './ui/slider'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import useMovieStore from '@/store/MovieStore'
import { toast } from 'sonner'

export default function FilterModal({ className }: { className?: string }) {
  const { filters, setFilter, resetFilters } = useMovieStore();
  const [isOpen, setIsOpen] = useState(false);
  
  // Estado local para os filtros
  const [searchValue, setSearchValue] = useState(filters.search);
  const [sliderValue, setSliderValue] = useState([filters.minRating]);
  
  // Sincronizar o estado local com o estado global ao abrir o modal
  useEffect(() => {
    if (isOpen) {
      setSearchValue(filters.search);
      setSliderValue([filters.minRating]);
    }
  }, [isOpen, filters]);
  
  // Manipuladores de eventos
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };
  
  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
  };
  
  const toggleFilter = (key: 'onlyWatched' | 'onlyFavorite' | 'onlyWithNotes') => {
    setFilter(key, !filters[key]);
  };
  
  const changeSortBy = (value: 'title' | 'running_time' | 'rt_score' | 'rating') => {
    setFilter('sortBy', value);
  };
  
  const applyFilters = () => {
    // Aplicar filtros do estado local para o estado global
    setFilter('search', searchValue);
    setFilter('minRating', sliderValue[0]);
    setIsOpen(false);

    toast("Filtros aplicados ✅")
  };
  
  const handleReset = () => {
    resetFilters();
    setSearchValue('');
    setSliderValue([0]);

    toast("Filtros limpos ✅")
  };
  
  // Verificar se há filtros ativos
  const hasActiveFilters = 
    filters.search !== '' || 
    filters.onlyWatched || 
    filters.onlyFavorite || 
    filters.onlyWithNotes || 
    filters.minRating > 0 ||
    filters.sortBy !== 'title';

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className={cn("flex flex-col items-center", className)}>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full relative",
              hasActiveFilters && "bg-primary/20"
            )}
          >
            <Search className="size-4" />
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full size-4 flex items-center justify-center">
                !
              </span>
            )}
          </Button>
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Filtrar os resultados</DialogTitle>
            {hasActiveFilters && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-xs"
                onClick={handleReset}
              >
                <X className="size-3 mr-1" />
                Limpar filtros
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search */}
          <div className="space-y-2">
            <Label>Buscar</Label>
            <Input 
              type='text' 
              value={searchValue} 
              onChange={(e) => handleSearch(e.target.value)} 
              placeholder="Digite para buscar..."
            />
          </div>

          {/* Status Filters */}
          <div className="space-y-3">
            <Label className="text-base">Status</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="watched"
                  checked={filters.onlyWatched}
                  onCheckedChange={() => toggleFilter('onlyWatched')}
                />
                <Label htmlFor="watched" className="cursor-pointer">
                  Assistido
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="favorite"
                  checked={filters.onlyFavorite}
                  onCheckedChange={() => toggleFilter('onlyFavorite')}
                />
                <Label htmlFor="favorite" className="cursor-pointer">
                  Favorito
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasNotes"
                  checked={filters.onlyWithNotes}
                  onCheckedChange={() => toggleFilter('onlyWithNotes')}
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
              <span className="text-sm font-medium">{sliderValue[0]} estrelas</span>
            </div>
            <Slider
              id="stars"
              min={0}
              max={5}
              step={1}
              value={sliderValue}
              onValueChange={handleSliderChange}
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
              value={filters.sortBy}
              onValueChange={(value) => changeSortBy(value as 'title' | 'running_time' | 'rt_score' | 'rating')}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="title" id="sort-title" />
                <Label htmlFor="sort-title" className="cursor-pointer">
                  Título
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="running_time" id="sort-duration" />
                <Label htmlFor="sort-duration" className="cursor-pointer">
                  Duração do filme
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rt_score" id="sort-rt-score" />
                <Label htmlFor="sort-rt-score" className="cursor-pointer">
                  Nota Rotten Tomatoes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rating" id="sort-rating" />
                <Label htmlFor="sort-rating" className="cursor-pointer">
                  Minha avaliação
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter>
          <div className="w-full flex space-x-2">
            <Button variant="outline" className="flex-1" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button className="flex-1" onClick={applyFilters}>
              Aplicar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}