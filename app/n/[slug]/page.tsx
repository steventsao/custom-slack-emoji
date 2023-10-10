import EmojiInput from "@/components/EmojiInput";
export default function NewSticker(props) {
  return (
    <>
      <EmojiInput />
      {props.params.slug}
    </>
  );
}
