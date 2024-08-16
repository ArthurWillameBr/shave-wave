import PhoneItem from "@/app/_components/phone-item"
import ServiceItem from "@/app/_components/service-item"
import SidebarSheet from "@/app/_components/sidebar-sheet"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopsPageProps {
  params: {
    id: string
  }
}

const BarbershopsPage = async ({ params }: BarbershopsPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    notFound()
  }

  return (
    <main>
      <div className="relative h-[250px] w-full">
        <Image
          src={barbershop.imageUrl}
          alt={`Barbearia de ${barbershop.name}`}
          fill
          className="object-cover"
        />

        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="absolute right-4 top-4"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </div>

      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>
        <div className="mb-2 flex items-center gap-1">
          <MapPinIcon className="size-4 text-primary" />
          <p className="text-sm">{barbershop.address}</p>
        </div>

        <div className="flex items-center gap-1">
          <StarIcon className="size-4 fill-primary text-primary" />
          <p className="text-sm">5.0 (559 avaliações)</p>
        </div>
      </div>

      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-sm font-bold uppercase text-gray-400">Sobre nós</h2>
        <p className="text-justify text-sm">{barbershop.description}</p>
      </div>

      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-sm font-bold uppercase text-gray-400">Serviços</h2>
        <div className="space-y-4">
          {barbershop.services.map((service) => (
            <ServiceItem
              barbershop={JSON.parse(JSON.stringify(barbershop))}
              key={service.id}
              service={JSON.parse(JSON.stringify(service))}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3 p-5">
        {barbershop.phones.map((phone) => (
          <PhoneItem key={phone} phone={phone} />
        ))}
      </div>
    </main>
  )
}

export default BarbershopsPage
