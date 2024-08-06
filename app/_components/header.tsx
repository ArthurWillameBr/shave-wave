import { MenuIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <h1>Shave Wave</h1>
        <Button size="icon" variant="outline">
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  )
}

export default Header
