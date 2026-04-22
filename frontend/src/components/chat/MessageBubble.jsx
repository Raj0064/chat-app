export default function MessageBubble({ text, own }) {
  return (
    <div
      className={`p-2 rounded w-fit max-w-[80%] ${
        own
          ? "ml-auto bg-primary text-primary-foreground"
          : "bg-muted"
      }`}
    >
      {text}
    </div>
  );
}