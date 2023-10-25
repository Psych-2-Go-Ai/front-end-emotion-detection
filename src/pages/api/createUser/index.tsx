import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "~/utils/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userid, name, age, gender, emotion, depression } = req.body as {
    userid: string;
    name: string;
    age: number;
    gender: string;
    emotion: string;
    depression: number;
  };

  const timestamp = new Date().toLocaleString('en-US', { timeZone: "America/New_York" });

  try {
        // Insert the new user into the database, associating their data with their user id
        const { data, error } = await supabase
          .from("users")
          .insert({
            userid,
            name,
            age,
            gender,
            emotion,
            depression,
            timestamp,
          });

        if (error) {
          throw error;
        }

        return res.status(201).json(data);
  
  } catch (error: any) {
    console.log("error", error);
    return res.status(500).json({ error: "Error creating user" });
  }
}
