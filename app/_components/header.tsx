import { Calendar, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <h1>Shave Wave</h1>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="flex items-center gap-3 border-b border-solid py-5">
              <Avatar>
                <AvatarImage src="data:image/jpeg;base64,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" />
              </Avatar>

              <div>
                <p className="font-bold">Neymar</p>
                <p className="tet-xs">neymar@gmail.com</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-b border-solid py-5">
              <SheetClose asChild>
                <Button className="justify-start gap-2" asChild variant="ghost">
                  <Link href="/">
                    <HomeIcon className="size-[18px]" />
                    Início
                  </Link>
                </Button>
              </SheetClose>
              <Button className="justify-start gap-2" variant="ghost">
                <Calendar className="size-[18px]" />
                Agendamento
              </Button>
            </div>

            <div className="flex flex-col gap-4 border-b border-solid py-5">
              {quickSearchOptions.map((option) => (
                <Button
                  key={option.title}
                  className="justify-start gap-2"
                  variant="ghost"
                >
                  {option.title}
                </Button>
              ))}
            </div>

            <div className="flex flex-col gap-4 py-5">
              <Button variant="ghost" className="justify-start gap-2">
                <LogOutIcon className="size-[18px]" />
                Sair da conta
              </Button>
            </div>
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
