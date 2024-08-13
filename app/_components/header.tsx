import { Card, CardContent } from "./ui/card"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"
import SidebarSheet from "./sidebar-sheet"
import Link from "next/link"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <Link href="/">
          <h1>Shave Wave</h1>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
