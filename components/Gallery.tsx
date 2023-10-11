import Sticker from "@/components/Sticker";
import { getStickers } from "utils/getStickers";

export async function Gallery() {
  const { images, nextCursor } = await getStickers();

  return (
    <>
      <div className="columns-2 gap-4 sm:columns-3 xl:columns-4 2xl:columns-6">
        {images.map(({ prompt, id, public_id, format, blurDataUrl }) => (
          <Sticker
            key={id}
            public_id={public_id}
            format={format}
            blurDataUrl={blurDataUrl || ""}
            prompt={prompt}
          />
        ))}
      </div>
    </>
  );
}
