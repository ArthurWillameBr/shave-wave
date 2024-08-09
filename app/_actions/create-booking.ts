"use server"

import { db } from "../_lib/prisma"

interface CreateBookingParams {
  serviceId: string
  userId: string
  date: Date
}

export async function createBooking({
  serviceId,
  userId,
  date,
}: CreateBookingParams) {
  await db.booking.create({
    data: {
      serviceId,
      userId,
      date,
    },
  })
}
