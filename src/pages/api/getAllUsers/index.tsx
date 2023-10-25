import { NextApiRequest, NextApiResponse } from "next";
import supabase from "~/utils/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userid } = req.query;

  if (userid === "logged-out") {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("userid", userid);

    if (error) {
      throw error;
    }

    return res.status(200).json(data.reverse());
  } catch (error: any) {
    console.log("error", error);
    return res.status(500).json({ error: "Error getting user data" });
  }
}
