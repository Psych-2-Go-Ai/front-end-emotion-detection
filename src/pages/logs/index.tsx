import { type NextPage } from "next";
import Head from "next/head";

import Header from "~/components/header";
import LogsList from "~/components/logsList";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Psych2Go | Logs</title>
        <meta name="description" content="It's an AI bot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main-page ">
        <div className="container m-auto">
          <Header />
          <div className="content flex flex-col  justify-between pb-10 pt-4">
            <LogsList />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
