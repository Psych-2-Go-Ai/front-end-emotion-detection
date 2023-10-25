import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import AccountHeader from "~/components/accountHeader";
import TableIcon from "~/assets/icons/tableIcon";
import StarIcon from "~/assets/icons/starIcon";
import BgImage from "../assets/bg-lower.png";

const Main: NextPage = () => {
  return (
    <>
      <Head>
        <title>Psych2Go | Home</title>
        <meta name="description" content="It's an AI bot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main-page h-[100vh] ">
        <div className="container">
          <AccountHeader />
          <div className="main-btn flex gap-8 item-center justify-center mt-[100px] mb-[50px] always-on-top">
            <Link
              href="/logs"
              className="bg-[#FFF3E1] py-3 px-12 rounded-[32px] flex gap-3 text-[18px] box-shadow"
            >
              <TableIcon /> View Logs
            </Link>
            <Link
              href="/chat"
              className="bg-[#62388A] py-3 px-14 rounded-[32px] flex text-white gap-3 text-[18px] box-shadow"
            >
              <StarIcon /> Begin
            </Link>
          </div>
          <div className="">
            <Image src={BgImage} alt="" className="lower-image" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
