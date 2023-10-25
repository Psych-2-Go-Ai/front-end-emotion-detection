import HomeIcon from "~/assets/icons/homeIcon";
import MainLogoIcon from "~/assets/icons/mainLogo";
import Link from "next/link";

const Header = () => {
  return (
    <div>
      <header className="flex  justify-between items-center py-[30px]">
        <Link href="/" className="logo">
          <MainLogoIcon />
        </Link>
        <Link href="/" className="header-btn flex gap-3">
          <HomeIcon /> Back to home
        </Link>
      </header>
    </div>
  );
};

export default Header;
