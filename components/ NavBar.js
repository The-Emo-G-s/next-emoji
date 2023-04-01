import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [mode, setMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("mode") || "light";
    }
    return "light";
  });

  useEffect(() => {
    if (mode === "light") {
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#000000";
    } else {
      document.body.style.backgroundColor = "#1c1c1c";
      document.body.style.color = "#ffffff";
    }
    localStorage.setItem("mode", mode);
  }, [mode]);

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  // const emoji = mode === "light" ? "☀️" : "🌙";

  
  return (
    <div className="container-nav">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button
          style={{
            background: "none",
            color: "#000000",
            border: "none",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            alignSelf: "flex-left",
            marginBottom: "1rem",
          }}
          onClick={toggleMode}
        >
          {/* {emoji} */}
        </button>
      </div>
      <span>
        <Link href="/" className="link-home">
          <h1>
            CLICKER KINGD<span>O</span>M
          </h1>
        </Link>
      </span>
    </div>
  );
};

export default Navbar;


