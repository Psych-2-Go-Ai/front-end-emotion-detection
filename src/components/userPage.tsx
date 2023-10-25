import { useEffect, useState } from "react";
import supabase from "~/utils/supabase";
import AuthForm from "~/components/authForm";

const UserPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const [userEmail, setUserEmail] = useState<string>();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session && session.user.id !== null) {
        setIsLoggedIn(true);
        setUserEmail(session.user.email);
      } else {
        setIsLoggedIn(false);
        setUserEmail("");
      }
    });
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div className="sign-out-container">
          <p className="welcome-message">Welcome, {userEmail}</p>
          <button
            className="sign-out-btn"
            onClick={() => supabase.auth.signOut()}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <AuthForm />
      )}
    </div>
  );
};

export default UserPage;
