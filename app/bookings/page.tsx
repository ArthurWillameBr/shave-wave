import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"
import { notFound } from "next/navigation"
import BookingItem from "../_components/booking-item"

const BookingsPage = async () => {
  const session = await getServerSession(authOptions)

  // mostrar popup de login se não tiver logado
  if (!session?.user) return notFound()

  const confirmedBookings = await db.booking.findMany({
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

  const concludedBookings = await db.booking.findMany({
    where: {
      userId: (session?.user as any).id,
      date: {
        lt: new Date(),
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

  return (
    <>
      <Header />
      <div className="space-y-3 p-5">
        <h2 className="fond-bold mb-3 mt-6 text-xl uppercase">Agendamentos</h2>

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="fond-bold mb-3 mt-6 text-xs uppercase">
              Confirmados
            </h2>
            {confirmedBookings.map((booking) => (
              <BookingItem
                booking={JSON.parse(JSON.stringify(booking))}
                key={booking.id}
              />
            ))}
          </>
        )}
        {concludedBookings.length > 0 && (
          <>
            <h2 className="fond-bold mb-3 mt-6 text-xs uppercase">
              Finalizados
            </h2>
            {concludedBookings.map((booking) => (
              <BookingItem
                booking={JSON.parse(JSON.stringify(booking))}
                key={booking.id}
              />
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default BookingsPage
