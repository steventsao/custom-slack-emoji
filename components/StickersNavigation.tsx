import Link from "next/link";

export function StickersNavigation({ nextCursor }: { nextCursor?: string }) {
  return (
    <div
      className="text-bold flex justify-center gap-x-2 rounded-md font-sans text-lg "
      role="group"
    >
      <Link
        className="bg-primary hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 inline-block rounded-l px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition transition duration-150 duration-150 ease-in-out ease-in-out hover:bg-slate-200 focus:outline-none focus:ring-0 "
        href={{ pathname: "/" }}
      >
        <button type="button" data-te-ripple-init data-te-ripple-color="light">
          Home
        </button>
      </Link>
      {nextCursor && (
        <Link
          className="bg-primary	hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 inline-block rounded-l px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition transition duration-150 duration-150 ease-in-out ease-in-out hover:bg-slate-200 focus:outline-none focus:ring-0"
          href={{ pathname: "/", query: { nextCursor } }}
        >
          <button
            type="button"
            className=""
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Next
          </button>
        </Link>
      )}
    </div>
  );
}
