import Bridge from "../components/Icons/Bridge";
import Logo from "../components/Icons/Logo";
export default function NativeAd() {
  return (
    <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <span className="flex max-h-full max-w-full items-center justify-center">
          <Bridge />
        </span>
        <span className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
      </div>
      <Logo />
      <h1 className="mb-4 mt-8 text-base font-bold uppercase tracking-widest">
        2022 Event Photos
      </h1>
      <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
        Our incredible Next.js community got together in San Francisco for our
        first ever in-person conference!
      </p>
      <a
        className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
        href="https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-cloudinary&project-name=nextjs-image-gallery&repository-name=with-cloudinary&env=NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET,CLOUDINARY_FOLDER&envDescription=API%20Keys%20from%20Cloudinary%20needed%20to%20run%20this%20application"
        target="_blank"
        rel="noreferrer"
      >
        Clone and Deploy
      </a>
    </div>
  );
}
