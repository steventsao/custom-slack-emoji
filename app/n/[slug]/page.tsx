import EmojiInput from "@/components/EmojiInput";
export default function NewSticker(props) {
  console.log(props);
  return (
    <>
      <EmojiInput />
      {props.params.slug}
    </>
  );
}
