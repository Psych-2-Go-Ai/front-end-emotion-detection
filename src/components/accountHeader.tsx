import MainLogoIcon from "~/assets/icons/mainLogo";
import AccountIcon from "~/assets/icons/accountIcon";
import Link from "next/link";
import { useEffect, useState } from "react";
import supabase from "~/utils/supabase";

const AccountHeader: React.FC = () => {
  const [userState, setUserState] = useState<string>();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session && session.user.id !== null) {
        setUserState(session.user.email);
      } else {
        setUserState("Sign In");
      }
    });
  }, []);

  return (
    <div>
      <header className="flex justify-between items-center py-[30px]">
        <Link href="/" className="logo">
          <MainLogoIcon />
        </Link>
        <Link href="/account" className="header-btn flex gap-3">
          <AccountIcon /> {userState}
        </Link>
      </header>
    </div>
  );
};

export default AccountHeader;
