import Sticker from "@/components/Sticker";
import { getStickers } from "utils/getStickers";

export async function Gallery() {
  const { images, nextCursor } = await getStickers();

  return (
    <>
      <div className="gap-4 sm:columns-2 xl:columns-6">
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
