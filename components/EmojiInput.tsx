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
    <form className="mb-10 flex h-fit w-full flex-row items-center rounded-xl bg-black px-1 shadow-lg">
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
      <input
        aria-hidden
        type="submit"
        name="token"
        value={token}
        className="hidden"
        readOnly
      />
    </form>
  );
}
