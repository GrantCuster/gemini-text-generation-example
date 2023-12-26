import { textAtom, textResonseGeneratingAtom, textResponseAtom } from "./atoms";
import { useAtom } from "jotai";
import Markdown from "react-markdown";

function App() {
  const [text, setText] = useAtom(textAtom);
  const [textResponse, setTextResponse] = useAtom(textResponseAtom);
  const [isGenerating, setIsGenerating] = useAtom(textResonseGeneratingAtom);

  return (
    <div className="flex h-[100dvh] overflow-hidden flex-col">
      <div className="border-b border-black">
        <div className="max-w-[65ch] mx-auto flex pt-2 py-3 flex-col gap-2">
          <div className="">
            <span className="font-bold">Basic text generation</span> using the{" "}
            <a
              href="https://ai.google.dev/"
              target="_blank"
              className="underline"
            >
              Gemini API
            </a>
          </div>
          <form
            className="flex gap-2 items-center"
            onSubmit={async (e) => {
              e.preventDefault();
              setTextResponse("");
              setIsGenerating(true);
              const response = await fetch(`/api/generateResponseToText`, {
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                  prompt: text,
                }),
              });
              const result: { text: string } = await response.json();
              setTextResponse(result.text);
              setIsGenerating(false);
            }}
          >
            <input
              type="text"
              className="border border-black w-full px-2 py-1"
              value={text}
              onChange={(e) => {
                setText(e.currentTarget.value);
              }}
            />
            {isGenerating ? (
              <div className="animate-pulse">generating...</div>
            ) : (
              <button className="py-1 px-2 bg-black hover:bg-neutral-800 text-white rounded-full">
                Send
              </button>
            )}
          </form>
        </div>
      </div>
      <div className="bg-neutral-200 grow overflow-auto">
        {textResponse.length > 0 ? (
          <Markdown className="px-2 pt-2 pb-4 mx-auto prose">
            {textResponse}
          </Markdown>
        ) : null}
      </div>
    </div>
  );
}

export default App;
