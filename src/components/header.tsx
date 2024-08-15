import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { useUrlContext } from "@/context";
import useFetch from "@/hooks/use-fetch";
import { logout } from "@/db/apiAuth";
import { BarLoader } from "react-spinners";

interface User {
  user_metadata: {
    name?: string;
  };
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { loading, fn: fnLogout } = useFetch(logout);
  const { user, fetchUser } = useUrlContext() as {
    user: User | null;
    fetchUser: () => void;
  };

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/scissorlogo.png" className="h-16" alt="Trimmer Logo" />
        </Link>
        <div>
          {!user ? (
            <Button onClick={() => navigate("/auth")}>Login</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user?.user_metadata?.name || "No Name"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/dashboard" className="flex">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    My Links
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span
                    onClick={async () => {
                      await fnLogout();
                      fetchUser();
                      navigate("/");
                    }}
                  >
                    Logout
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
    </>
  );
};

export default Header;
