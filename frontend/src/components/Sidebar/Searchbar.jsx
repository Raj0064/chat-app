import API from "@/lib/api";
import React, { useState } from "react";
import { useChat } from "@/context/ChatContext";

const Searchbar = () => {
  const { setSelectedChat } = useChat();

  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  const handlesearch = async (value) => {
    setKeyword(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    try {
      const res = await API.get("/user", {
        params: { search: value },
      });

      setResults(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const startChat = async (userId) => {
    try {
      const res = await API.post("/chat", { userId });

      // ✅ GLOBAL STATE UPDATE (IMPORTANT)
      setSelectedChat(res.data);

      setKeyword("");
      setResults([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">

      <input
        type="text"
        placeholder="Search users..."
        className="w-full px-3 py-2 text-sm rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={keyword}
        onChange={(e) => handlesearch(e.target.value)}
      />

      {Array.isArray(results) && results.length > 0 && (
        <div className="absolute w-full bg-white border mt-1 rounded-md shadow-md z-10 text-black">
          {results.map((user) => (
            <div
              key={user._id}
              onClick={() => startChat(user._id)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-gray-500">@{user.username}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Searchbar;