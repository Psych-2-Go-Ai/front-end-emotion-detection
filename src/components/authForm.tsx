import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "~/utils/supabase";

export default function AuthForm() {
  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      theme="defualt"
      providers={[]}
      redirectTo="https://www.mindsacrossborders.com"
    />
  );
}
