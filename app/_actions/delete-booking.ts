"use server"

import { db } from "../_lib/prisma"
import { revalidatePath } from "next/cache"

export const deleteBooking = async (bookingId: string) => {
  await db.booking.delete({
    where: {
      id: bookingId,
    },
  })
  // Recarregar a página de agendamentos, para atualizar o serviço que foi cancelado, sem mostrar o reload no navegador
  revalidatePath("/bookings")
}
