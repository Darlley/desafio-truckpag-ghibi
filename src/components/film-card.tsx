"use client"

import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Check, Heart, Play } from 'lucide-react'
import { MaskedImage } from './ui/masked-image'
import Image from 'next/image'
import CommentsModal from './comments-modal'
import { formatMinutes } from '@/lib/formatDurationTime'
import { useMediaQuery } from "@uidotdev/usehooks";
import useMovieStore, { MovieTypeStore } from '@/store/MovieStore'
import AvailableModal from './available-modal'
import { toast } from 'sonner'

export default function FilmCard({ data }: { data: MovieTypeStore }) {
  const { toggleFavorite, toggleWatched } = useMovieStore()

  const isMobileDevice = useMediaQuery("(max-width: 900px)");
  const isDesktopDevice = useMediaQuery("(min-width: 900px)");

  return (
    <div className="snap-start snap-always h-svh w-full bg-white flex justify-start relative movie-card">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={data.movie_banner}
          alt="Background"
          width={600}
          height={900}
          className="w-full h-full object-cover filter blur-lg"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>


      {isMobileDevice && <MobileImage image={data.image} />}
      {isDesktopDevice && <DesktopImage image={data.image} />}

      <div className="relative h-full flex flex-col justify-end p-6 md:p-12 w-11/12 md:w-6/12 xl:w-1/3 z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{data.title}</h1>
        <div className="flex items-center text-sm space-x-2 mb-4">
          <span>{data.release_date}</span>
          <span>•</span>
          <span className="border border-gray-600 px-1 text-xs">{formatMinutes(data.running_time)}</span>
          <span className="text-green-500 font-semibold">{data.rt_score}%</span>
        </div>
        <p className="text-gray-200 mb-6 line-clamp-3 md:line-clamp-none">{data.description}</p>

        <div className="flex space-x-3">
          <Button className="px-6">
            <Play className="mr-2 h-5 w-5" /> Assistir
          </Button>
          <AvailableModal movie={data} />
        </div>
      </div>

      <div
        className={cn(
          "absolute right-4 bottom-20 flex flex-col items-center space-y-6 z-10",
        )}
      >
        {/* Favoritar */}
        <div className="flex flex-col items-center">
          <Button
            size="icon"
            variant={data?.favorite ? "ghost" : "default"}
            className="rounded-full"
            onClick={() => {
              try {
                toggleFavorite(data.id)
                toast(data?.favorite ? "Removido dos favoritos ❌" : "Adicionado aos favoritos ✅")
              } catch (error) {
                console.error("Error toggling favorite:", error)
                toast("Erro ao marcar como favorito ❌")
              }
            }}
          >
            <Heart
              className={cn(
                "size-4",
                data?.favorite ? "text-red-500 fill-red-500" : ""
              )}
            />
          </Button>
          <span className="text-xs mt-1">{data?.favorite ? "Favorito" : "Favoritar"}</span>
        </div>

        {/* Assistido */}
        <div className="flex flex-col items-center">
          <Button
            variant={data?.watched ? "ghost" : "default"}
            size="icon"
            className="rounded-full"
            onClick={() => {
              try {
                toggleWatched(data.id)
                toast(data?.watched ? "Removido como assistido ❌" : "Marcado como assistido ✅")
              } catch (error) {
                console.error("Error toggling favorite:", error)
                toast("Erro ao marcar como assistido ❌")
              }
            }}
          >
            <Check
              className={cn(
                "size-4",
                data?.watched ? "text-teal-500" : ""
              )}
            />
          </Button>
          <span className="text-xs mt-1">{data?.watched ? "Assistido" : "Assistir"}</span>
        </div>

        <CommentsModal />
      </div>
    </div >
  )
}

const MobileImage = ({ image }: { image: string }) => {
  return (
    <div className="absolute inset-0 flex items-start justify-center">
      <MaskedImage
        src={image}
        alt="Background"
        width={600}
        height={900}
        variant="shape5"
        className="relative z-[1] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />
    </div>
  )
}

const DesktopImage = ({ image }: { image: string }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Image
        src={image}
        alt="Background"
        width={600}
        height={900}
        className="h-11/12 w-max object-cover relative z-[1]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />
    </div>
  )
}