"use server";
import { redirect } from "next/navigation";
import crypto from "crypto";

export const formServerAction = async (formData) => {
  const vanityId = crypto.randomBytes(8).toString("hex");
  formData.set("vanity_id", vanityId);

  //   Don't wait, use generated id to poll again
  const res = await fetch(process.env.VERCEL_API_HOSTNAME + "/api/prompt", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  // router.push("/n/" + formData.get("prompt"));
  redirect("/n/" + vanityId);
};
