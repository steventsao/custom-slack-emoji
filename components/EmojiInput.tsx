"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { formServerAction } from "utils/formAction";

interface EmojiFormProps {
  initialPrompt?: string;
  loading?: boolean;
  placeholder?: string;
}

export default function EmojiInput({
  placeholder,
  loading,
  initialPrompt,
}: EmojiFormProps) {
  // const [formState, formAction] = useFormState(createEmoji);
  const router = useRouter();
  const [userloading, setuserLoading] = useState(false);

  const submitRef = useRef<React.ElementRef<"button">>(null);
  const formRef = useRef<React.ElementRef<"form">>(null);

  return (
    <>
      <form
        // @ts-ignore
        action={formServerAction}
        ref={formRef}
        // onSubmit={handleSubmit}
        className="mb-10 flex h-fit w-full flex-row items-center space-x-2 rounded-xl bg-black px-1 shadow-lg"
      >
        <input
          {...(loading || userloading ? { disabled: true } : {})}
          defaultValue={initialPrompt}
          type="text"
          name="prompt"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submitRef.current?.click();
              setuserLoading(true);
            }
          }}
          placeholder={placeholder || "cat"}
          className="h-10 w-full resize-none bg-transparent px-2 py-2.5 font-mono text-sm text-white outline-none ring-0 transition-all duration-300 placeholder:text-gray-400"
        />
        {!(loading || userloading) ? (
          <button
            disabled={loading || userloading}
            ref={submitRef}
            type="submit"
            className="h-8 w-8 items-center justify-center rounded-lg text-white outline-0 ring-0 hover:bg-white/25 focus:bg-white/25"
          >
            OK
          </button>
        ) : (
          ""
        )}
      </form>

      {loading || userloading ? (
        <p className="mb-3 bg-yellow-200 p-4">
          Generating sticker, please refresh the page in a few seconds;
        </p>
      ) : (
        ""
      )}
    </>
  );
}
