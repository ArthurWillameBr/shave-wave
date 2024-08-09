"use client"

import { Barbershop, BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "./ui/sheet"
import { ptBR } from "date-fns/locale"
import { Calendar } from "./ui/calendar"
import { useState } from "react"
import { format, set } from "date-fns"
import { createBooking } from "../_actions/create-booking"
import { toast } from "sonner"
import { useSession } from "next-auth/react"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
]

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  function handleSelectDate(date: Date | undefined) {
    setSelectedDate(date)
  }

  function handleSelectTime(time: string) {
    setSelectedTime(time)
  }

  async function handleCreateBooking() {
    if (!selectedDate || !selectedTime) return
    try {
      const hour = Number(selectedTime.split(":")[0])
      const minute = Number(selectedTime.split(":")[1])

      const newDate = set(selectedDate, {
        minutes: minute,
        hours: hour,
      })
      await createBooking({
        serviceId: service.id,
        userId: (data?.user as any).id,
        date: newDate,
      })
      toast.success("Reserva criada com sucesso")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao criar reserva")
    }
  }

  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        <div className="max-[110px] relative max-h-[110px] min-h-[110px] min-w-[110px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-primary">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" size="sm">
                  Reservar
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Fazer Reserva</SheetTitle>
                </SheetHeader>
                <div className="border-b border-solid py-5">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={selectedDate}
                    onSelect={handleSelectDate}
                    styles={{
                      head_cell: {
                        width: "100%",
                        textTransform: "capitalize",
                      },
                      cell: {
                        width: "100%",
                      },
                      button: {
                        width: "100%",
                      },
                      nav_button_previous: {
                        width: "32px",
                        height: "32px",
                      },
                      nav_button_next: {
                        width: "32px",
                        height: "32px",
                      },
                      caption: {
                        textTransform: "capitalize",
                      },
                    }}
                  />
                </div>

                {selectedDate && (
                  <div className="flex gap-2 overflow-x-auto border-b border-solid p-5 px-5 [&::-webkit-scrollbar]:hidden">
                    {TIME_LIST.map((time) => (
                      <Button
                        key={time}
                        className="rounded-full"
                        variant={
                          selectedTime === time ? "default" : "secondary"
                        }
                        size="sm"
                        onClick={() => handleSelectTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}

                {selectedTime && selectedDate && (
                  <div className="p-5">
                    <Card>
                      <CardContent className="space-y-3 p-3">
                        <div className="flex items-center justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                          <p className="font-bold">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-sm">Data</h2>
                          <p className="text-sm text-gray-400">
                            {format(selectedDate, "d 'de' MMMM", {
                              locale: ptBR,
                            })}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-sm">Horário</h2>
                          <p className="text-sm text-gray-400">
                            {selectedTime}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-sm">Barbearia</h2>
                          <p className="text-sm text-gray-400">
                            {barbershop.name}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                <SheetFooter className="mt-5 px-5">
                  <SheetClose asChild>
                    <Button
                      onClick={handleCreateBooking}
                      disabled={!selectedDate || !selectedTime}
                    >
                      Confirmar
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
