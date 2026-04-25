export default function MessageBubble({ text, own, time }) {
  return (
    <div
      className={`p-2 rounded max-w-[50%] md:max-w-[20%] ${own ? "ml-auto bg-primary text-white" : "bg-muted"
        }`}
    >
      <div>{text}</div>

      <div className="text-[10px] opacity-60 text-right mt-1">
        {time}
      </div>
    </div>
  );
}