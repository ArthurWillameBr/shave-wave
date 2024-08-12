import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { notFound } from "next/navigation"

export default async function Home() {
  const session = await getServerSession(authOptions)

  // fazer popup para login
  if (!session?.user) return notFound()

  const barbershops = await db.barbershop.findMany({})

  const popularBarbershop = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  const confirmedBookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session?.user as any).id,
          date: {
            gte: new Date(),
          },
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
        orderBy: {
          date: "asc",
        },
      })
    : []

  return (
    <>
      <Header />
      <div className="p-5">
        <h1 className="text-xl font-bold">Olá, Arthur</h1>
        <p>Terça-feira, 06 de maio</p>

        <div className="mt-6">
          <Search />
        </div>

        <div className="mt-6 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              className="gap-2"
              variant="secondary"
              key={option.title}
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  width={16}
                  height={16}
                  alt={option.title}
                />
                {option.title}
              </Link>
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

        <h2 className="fond-bold mb-3 mt-6 uppercase text-gray-400">
          Agendamentos
        </h2>
        <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

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
