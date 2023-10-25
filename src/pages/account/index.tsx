import { NextPage } from "next";
import Head from "next/head";
import Header from "~/components/header";
import UserPage from "~/components/userPage";

const Account: NextPage = () => {
  return (
    <>
      <Head>
        <title>Psych2Go | Account</title>
        <meta name="description" content="User account page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main-page">
        <div className="container mx-auto">
          <Header />
          <div className="content flex flex-col justify-between pb-10 pt-4">
            <UserPage />
          </div>
        </div>
      </main>
    </>
  );
};

export default Account;
