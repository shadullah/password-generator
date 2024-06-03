import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");
  const [clr, setClr] = useState("blue");
  const [text, setText] = useState("copy");

  const passGenerator = useCallback(() => {
    let passd = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllow) {
      str += "0123456789";
    }
    if (charAllow) str += "!@#$%^&*()_+-=[]{}|:;'<,>.?/`~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      passd += str.charAt(char);
    }
    setPassword(passd);
  }, [length, numAllow, charAllow, setPassword]);

  useEffect(() => {
    passGenerator();
    setClr("blue");
    setText("copy");
  }, [length, numAllow, charAllow, passGenerator, setClr]);

  // useref hook
  const passwrdRef = useRef(null);

  const copyPass = useCallback(() => {
    passwrdRef.current?.select();
    passwrdRef.current?.setSelectionRange(0, 3);
    window.navigator.clipboard.writeText(password);
    setClr("green");
    setText("Copied");
  }, [password]);

  return (
    <>
      <div>
        <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
          <h1 className="text-3xl text-center text-white font-bold my-6">
            Password generator
          </h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
              value={password}
              className="outline-none w-full py-1 px-3"
              placeholder="password"
              readOnly
              type="text"
              ref={passwrdRef}
            />
            <button
              onClick={copyPass}
              style={{ backgroundColor: clr }}
              className="outline-none shrink-0 px-3 py-2 text-white font-bold"
              title={text}
            >
              Copy
            </button>
          </div>
          <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                name=""
                min={6}
                max={20}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label>Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numAllow}
                onChange={() => {
                  setNumAllow((prev) => !prev);
                }}
                name=""
                id=""
              />
              <label>Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllow}
                onChange={() => {
                  setCharAllow((prev) => !prev);
                }}
                name=""
                id=""
              />
              <label>Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
