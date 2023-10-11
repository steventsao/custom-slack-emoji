"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { formServerAction } from "utils/formAction";

interface EmojiFormProps {
  initialPrompt?: string;
}

export default function EmojiInput({ initialPrompt }: EmojiFormProps) {
  // const [formState, formAction] = useFormState(createEmoji);
  const router = useRouter();

  const submitRef = useRef<React.ElementRef<"button">>(null);
  const formRef = useRef<React.ElementRef<"form">>(null);
  const handleClick = (e) => {
    // e.preventDefault();
    console.log(formRef.current);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await fetch("/api/prompt", {
      method: "POST",
      body: formData,
    });
    // router.push("/n/" + formData.get("prompt"));
  };

  return (
    <form
      // @ts-ignore
      action={formServerAction}
      ref={formRef}
      // onSubmit={handleSubmit}
      className="mb-10 flex h-fit w-full flex-row items-center space-x-2 rounded-xl bg-black px-1 shadow-lg"
    >
      <input
        defaultValue={initialPrompt}
        type="text"
        name="prompt"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            submitRef.current?.click();
          }
        }}
        placeholder="cat"
        className="h-10 w-full resize-none bg-transparent px-2 py-2.5 font-mono text-sm text-white outline-none ring-0 transition-all duration-300 placeholder:text-gray-400"
      />
      <button
        ref={submitRef}
        type="submit"
        className="h-8 w-8 items-center justify-center rounded-lg text-white outline-0 ring-0 hover:bg-white/25 focus:bg-white/25"
      >
        OK
      </button>
    </form>
  );
}
