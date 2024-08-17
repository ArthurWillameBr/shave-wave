import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { authOptions } from "../_lib/auth"
import { notFound } from "next/navigation"
import BookingItem from "../_components/booking-item"
import { getConfirmedBookings } from "../_data/get-confirmed-bookings"
import { getConcludedBookings } from "../_data/get-concluded-bookings"

const BookingsPage = async () => {
  const session = await getServerSession(authOptions)

  // mostrar popup de login se não tiver logado
  if (!session?.user) return notFound()

  const confirmedBookings = await getConfirmedBookings()
  const concludedBookings = await getConcludedBookings()

  return (
    <>
      <Header />
      <div className="space-y-3 p-5">
        <h2 className="fond-bold mb-3 mt-6 text-xl uppercase">Agendamentos</h2>

        {confirmedBookings.length === 0 && concludedBookings.length === 0 && (
          <p className="text-gray-400">Nenhum agendamento encontrado</p>
        )}

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
