import React from "react";

function NoChat() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-background">

      {/* Icon */}
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
        <span className="text-3xl">💬</span>
      </div>

      {/* Text */}
      <h2 className="text-xl font-semibold mb-2">
        No chat selected
      </h2>

      <p className="text-sm text-muted-foreground max-w-xs">
        Select a conversation from the sidebar to start messaging
      </p>

    </div>
  );
}

export default NoChat;