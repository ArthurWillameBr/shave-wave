"use client"

import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface PhoneItemProps {
  phone: string
}

function handleCopyPhone(phone: string) {
  navigator.clipboard.writeText(phone)
  toast.info("Telefone copiado com sucesso!")
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  return (
    <div className="flex items-center justify-between" key={phone}>
      <div className="flex items-center gap-2">
        <SmartphoneIcon />
        <p className="text-sm">{phone}</p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleCopyPhone(phone)}
      >
        Copiar
      </Button>
    </div>
  )
}

export default PhoneItem
