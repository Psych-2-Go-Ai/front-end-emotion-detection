import { type NextPage } from "next";
import Head from "next/head";
import HandBookQueriesFn from "~/components/handBookQuery";
import Header from "~/components/header";
import SubmitIcon from "../../assets/icons/submitIcon";
import Overlay from "~/components/overlay";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import AlertData from "~/components/alert";
import { ImSpinner8 } from "react-icons/im";
import supabase from "~/utils/supabase";

import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts";
import { BufferMemory } from "langchain/memory";

interface HandBook {
  question: string;
  answer: string;
}
interface User {
  name: string;
  age: number | string;
  gender: string;
}

const Home: NextPage = () => {
  const [emotion, setEmotion] = useState<string>("");
  const [depression, setDepression] = useState<number | undefined>();
  const [user, setUser] = useState<User | undefined>();
  const [question, setQuestion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [handBookQueries, setHandBookQueries] = useState<Array<HandBook>>([]);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session && session.user.id !== null) {
        setUserId(session.user.id);
      } else {
        setUserId("");
      }
    });
  }, []);

  const memoryRef = useRef(
    new BufferMemory({
      returnMessages: true,
      memoryKey: "history",
    })
  ).current;

  const openChat = async () => {
    if (!user) {
      return; // Return early if user data is not available
    }
    const model = new ChatOpenAI({
      openAIApiKey: process.env.NEXT_PUBLIC_OPEN_CHAT_API_KEY!,
      temperature: 0.8,
    });
    const prompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(
        `I'll ask you to practice a simulation of the Cognitive-Behavioral Therapy techniques (cognitive restructuring, behavioural activation, exposure therapy, problem-solving skills training, relaxation and stress management, assertiveness training, and thought records and journaling) with me. First, you need to assess which technique will suit better to my problem. Then tell me how the process will go on. Then start navigating me through it step by step. Navigate me through this process as though you are my psychologist. Start with the first step, then stop and wait for my response until you go on; your response has to be feedback on my reaction. Don't list all of the steps from the start. My name is ${user.name}, my gender is ${user.gender}, and my age is ${user.age}. My main issue is ${emotion}. Initiate my inner conversation and help me to come up with some resolution. If one technique does not work out, proceed with the next one.`
      ),
      new MessagesPlaceholder("history"),
      HumanMessagePromptTemplate.fromTemplate("{input}"),
    ]);
    const chain = new ConversationChain({
      llm: model,
      prompt,
      memory: memoryRef,
    });
    const res = await chain.call({
      input: question
        ? question
        : `I'll ask you to practice a simulation of the Cognitive-Behavioral Therapy techniques (cognitive restructuring, behavioural activation, exposure therapy, problem-solving skills training, relaxation and stress management, assertiveness training, and thought records and journaling) with me. First, you need to assess which technique will suit better to my problem. Then tell me how the process will go on. Then start navigating me through it step by step. Navigate me through this process as though you are my psychologist. Start with the first step, then stop and wait for my response until you go on; your response has to be feedback on my reaction. Don't list all of the steps from the start. My name is ${user.name}, my gender is ${user.gender}, and my age is ${user.age}. My main issue is ${emotion}. Initiate my inner conversation and help me to come up with some resolution. If one technique does not work out, proceed with the next one.`,
    });
    setLoading(false);
    const handBookAnswer: HandBook = {
      question: question,
      answer: res?.response as string,
    };
    setHandBookQueries((prevCount) => [...prevCount, handBookAnswer]);
    setQuestion("");
  };
  const createUser = () => {
    if (!user) {
      return;
    }
    const data = {
      userid: userId,
      name: user.name,
      age: Number(user.age),
      gender: user.gender,
      emotion,
      depression: Number(depression?.toFixed(2)),
    };
    if (userId !== "") {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_FRONTEND_URL as string}/api/createUser`,
          data
        )
        .then((res) => {
          console.log("res");
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };
  useEffect(() => {
    if (user) {
      void openChat();
      createUser();
    }
  }, [user]);

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!question) {
      setErrorMessage("No response Asked");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } else {
      setLoading(true);
      void openChat();
    }
  };

  return (
    <>
      <Head>
        <title>Psych2Go | Chat</title>
        <meta name="description" content="It's an AI bot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main-page ">
        <div className="container m-auto">
          <Header />
          <div className="content flex flex-col  justify-between pb-10 pt-4 gap-6">
            {errorMessage && <AlertData errorMessage={errorMessage} />}
            <HandBookQueriesFn handBookQueries={handBookQueries} />
            <form
              className="bg-white rounded-lg relative"
              onSubmit={submitHandler}
            >
              <input
                className="w-full h-[52px] rounded-lg ps-2 pe-[80px] leading-[52px] bg-white text-[#010440] block chat-input"
                type="text"
                placeholder="Enter your response"
                name="question"
                value={question}
                onChange={(e) => {
                  setQuestion(e.target.value);
                }}
              />
              <button
                className={`absolute w-[50px] h-[40px] flex justify-center items-center bg-[#FFA441] rounded-lg top-0 bottom-0 right-[14px] m-auto submit-btn ${
                  loading ? "pointer-events-none" : ""
                }`}
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <ImSpinner8 className="animate-spin w-[18px] h-[18px] text-[#62388a] text-[18px]" />
                ) : (
                  <SubmitIcon />
                )}
              </button>
            </form>
          </div>
          {user === undefined && (
            <Overlay
              setEmotion={setEmotion}
              setDepression={setDepression}
              setUser={setUser}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
