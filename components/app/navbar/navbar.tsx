import { ConnectButton } from "@rainbow-me/rainbowkit";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

interface NavbarProps {
  isOpened: boolean;
  toggleDrawer: () => void;
}

const Navbar = ({ isOpened, toggleDrawer }: NavbarProps) => {
  return (
    <div className="flex flex-row max-w-full sm:px-6 lg:px-4 items-center justify-between">
      <div className="p-2 cursor-pointer " onClick={toggleDrawer}>
        {isOpened ? <ChevronLeftIcon /> : <MenuIcon />}
      </div>

      <ConnectButton />
    </div>
  );
};

export default Navbar;
