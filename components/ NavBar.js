import Link from "next/link";
import { useEffect, useState } from "react";
import Carousel from './Carousel';
import { getStaticProps } from "@/pages";
import {  useUser, useSupabaseClient  } from '@supabase/auth-helpers-react';


const Navbar = () => {
  const [mode, setMode] = useState('');

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

	const oLike = [
		{
			emoji: "🐻",
			name: "bear",
			url: "https://em-content.zobj.net/thumbs/72/google/350/bear_1f43b.png"
		},
		{
			emoji: "🐡",
			name: "blowfish",
			url: "https://em-content.zobj.net/thumbs/72/google/350/blowfish_1f421.png"
		},
		{
			emoji: "🐵",
			name: "monkey-face",
			url: "https://em-content.zobj.net/thumbs/72/google/350/monkey-face_1f435.png"
		},
		{
			emoji: "🐌",
			name: "snail",
			url: "https://em-content.zobj.net/thumbs/72/google/350/snail_1f40c.png"
		},
		{
			emoji: "🦥",
			name: "sloth",
			url: "https://em-content.zobj.net/thumbs/72/google/350/sloth_1f9a5.png"
		},
		{
			emoji: "🦁",
			name: "lion",
			url: "https://em-content.zobj.net/thumbs/72/google/350/lion_1f981.png"
		},
		{
			emoji: "🐻‍❄️",
			name: "polar-bear",
			url: "https://em-content.zobj.net/thumbs/72/google/350/polar-bear_1f43b-200d-2744-fe0f.png"
		},
		{
			emoji: "🐑",
			name: "ewe",
			url: "https://em-content.zobj.net/thumbs/72/google/350/ewe_1f411.png"
		},
		{
			emoji: "🐷",
			name: "pig-face",
			url: "https://em-content.zobj.net/thumbs/72/google/350/pig-face_1f437.png"
		},
		{
			emoji: "🐢",
			name: "turtle",
			url: "https://em-content.zobj.net/thumbs/72/google/350/turtle_1f422.png"
		},
		{
			emoji: "🐼",
			name: "panda",
			url: "https://em-content.zobj.net/thumbs/72/google/350/panda_1f43c.png"
		},
		{
			emoji: "🐞",
			name: "lady-beetle",
			url: "https://em-content.zobj.net/thumbs/72/google/350/lady-beetle_1f41e.png"
		},
		{
			emoji: "🐭",
			name: "mouse-face",
			url: "https://em-content.zobj.net/thumbs/72/google/350/mouse-face_1f42d.png"
		},
		{
			emoji: "🐏",
			name: "ram",
			url: "https://em-content.zobj.net/thumbs/72/google/350/ram_1f40f.png"
		},
		{
			emoji: "🐶",
			name: "dog-face",
			url: "https://em-content.zobj.net/thumbs/72/google/350/dog-face_1f436.png"
		},
		{
			emoji: "🐯",
			name: "tiger-face",
			url: "https://em-content.zobj.net/thumbs/72/google/350/tiger-face_1f42f.png"
		},
		{
			emoji: "🦃",
			name: "turkey",
			url: "https://em-content.zobj.net/thumbs/72/google/350/turkey_1f983.png"
		},
		{
			emoji: "😻",
			name: "smiling-cat-with-heart-eyes",
			url: "https://em-content.zobj.net/thumbs/72/google/350/smiling-cat-with-heart-eyes_1f63b.png"
		},
		{
			emoji: "🦚",
			name: "peacock",
			url: "https://em-content.zobj.net/thumbs/72/google/350/peacock_1f99a.png"
		},
		{
			emoji: "🦊",
			name: "fox",
			url: "https://em-content.zobj.net/thumbs/72/google/350/fox_1f98a.png"
		},
		{
			emoji: "🐸",
			name: "frog",
			url: "https://em-content.zobj.net/thumbs/72/google/350/frog_1f438.png"
		},
		{
			emoji: "🐹",
			name: "hamster",
			url: "https://em-content.zobj.net/thumbs/72/google/350/hamster_1f439.png"
		},
		{
			emoji: "🦀",
			name: "crab",
			url: "https://em-content.zobj.net/thumbs/72/google/350/crab_1f980.png"
			
		},
		{
			emoji: "🐨",
			name: "koala",
			url: "https://em-content.zobj.net/thumbs/72/google/350/koala_1f428.png"
		},
		{
			emoji: "🐣",
			name: "hatching-chick",
			url: "https://em-content.zobj.net/thumbs/72/google/350/hatching-chick_1f423.png"
		},
	]

return (
    <div className="container-nav">
  		<div style={{ display: "flex", flexDirection: "column" }}>
        <button
					id="mode-toggle"
					title={`Switch to ${mode === "light" ? 'Dark' : 'Light'} mode?`}
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
          {mode === "light" ? "🌑" : "☀️"}
        </button>
      </div>
      <span>
        <Link href="/" className="link-home">
          <h1>
            CLICKER KINGD<span><Carousel animojis={oLike}/></span>M
          </h1>
        </Link>
      </span>
    </div>
  );
};

export default Navbar;


