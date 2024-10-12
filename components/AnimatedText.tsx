"ues client";
import { useEffect, useState } from "react";

const sentences = ["Hello World", "Welcome to My Portfolio", "I Love Coding"];

export default function AnimatedText() {
  const [currentSentence, setCurrentSentence] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const typeTimeout = setTimeout(() => {
      setIsTyping((prev) => !prev); // Toggles typing or backspacing
    }, 3000); // Time it takes to finish typing or backspacing

    if (!isTyping) {
      const switchTimeout = setTimeout(() => {
        setCurrentSentence((prev) => (prev + 1) % sentences.length); // Switch to the next sentence
        setIsTyping(true); // Start typing again
      }, 1000); // Time between switching sentences

      return () => clearTimeout(switchTimeout); // Clear the timeout when the component is unmounted or re-rendered
    }

    return () => clearTimeout(typeTimeout); // Clear the typing timeout
  }, [isTyping]);

  return (
    <div className="flex items-center justify-center bg-gradient-to-tr to-blue-400 from-green-500 p-10">
      <div className="max-w-10">
        <h1
          className={`${
            isTyping ? "animate-typing" : "animate-deleting"
          } overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-5xl text-white font-bold`}
          style={{
            width: isTyping ? `${sentences[currentSentence].length}ch` : "0ch", // Dynamically adjust width based on sentence length
          }}
        >
          {sentences[currentSentence]}
        </h1>
      </div>
    </div>
  );
}
