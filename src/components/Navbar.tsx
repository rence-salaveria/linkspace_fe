import {Card, CardContent} from "@/components/ui/card.tsx";
import {Link} from "react-router-dom";
import {FaLink, FaUser} from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import toast from "react-hot-toast";
import axios from "@/lib/axios.ts";

const Navbar = () => {
  const logout = async () => {
    toast.success("Logged out successfully");
    localStorage.removeItem("user");

    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }

  return (
    <header className="sticky top-4 z-50 w-full flex justify-center">
      <div className="container max-w-8xl">
        <Card className="rounded-xl">
          <CardContent className="flex h-14 items-center justify-between p-4">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <span className="font-bold text-xl flex items-center">Link <FaLink/> pace</span>
              </Link>
            </div>
            <nav className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-primary hover:text-white"
                  >
                    <FaUser/>
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </CardContent>
        </Card>
      </div>
    </header>
  );
};

export default Navbar;