"use server";
import { redirect } from "next/navigation";
import crypto from "crypto";

export const formServerAction = async (formData) => {
  console.log("server action...");
  const vanityId = crypto.randomBytes(8).toString("hex");
  formData.set("vanity_id", vanityId);

  //   Don't wait, use generated id to poll again
  const res = fetch(process.env.VERCEL_API_HOSTNAME + "/api/prompt", {
    method: "POST",
    body: formData,
    cache: "no-store",
  });
  // router.push("/n/" + formData.get("prompt"));
  redirect("/n/" + vanityId);
};
