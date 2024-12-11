import Sticker from "@/components/Sticker";

type GalleryProps = {
  images: any[];
  nextCursor: string;
};

export function Gallery({ images, nextCursor }: GalleryProps) {
  return (
    <>
      <div className="xs:columns-2 gap-4 xl:columns-3">
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
