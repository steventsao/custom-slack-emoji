"use client";

import { useEffect, useRef, useState } from "react";

interface EmojiFormProps {
  initialPrompt?: string;
}
const formAction = (...args) => {
  console.log(args);
};
export default function EmojiInput({ initialPrompt }: EmojiFormProps) {
  // const [formState, formAction] = useFormState(createEmoji);

  const submitRef = useRef<React.ElementRef<"button">>(null);
  const [token, setToken] = useState("");

  // useEffect(() => {
  //   if (!formState) return;
  // }, [formState]);

  return (
    <form
      method="POST"
      action="https://stickerideas.co/api/prompt"
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
