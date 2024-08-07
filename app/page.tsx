import { Search } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item"

export default async function Home() {
  const barbershops = await db.barbershop.findMany({})

  const popularBarbershop = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  return (
    <>
      <Header />
      <div className="p-5">
        <h1 className="text-xl font-bold">Olá, Arthur</h1>
        <p>Terça-feira, 06 de maio</p>
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <Search />
          </Button>
        </div>

        <div className="mt-6 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((item, index) => (
            <Button key={index} className="gap-2" variant="secondary">
              {item.title}
            </Button>
          ))}
        </div>

        <div className="relative mt-6 h-[150px]">
          <Image
            alt="banner"
            src="/banner01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        <BookingItem />

        <h2 className="fond-bold mb-3 mt-6 uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-2 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="fond-bold mb-3 mt-6 uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-2 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershop.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </>
  )
}
