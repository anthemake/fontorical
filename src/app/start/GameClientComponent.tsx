"use client";

import { useState } from 'react';
import { Howl } from 'howler';

let backgroundSound: Howl | null = null;
const secretCode = "oasis42";
const memeURL =
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjYxc21ycWUwNHJmc3oxbjdrNHVncHo0aHd0aWt1Z2xob2xmdDdlYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LXVaGTPTJqkHbr4ZIS/giphy.webp";

export default function GameClientComponent() {
  const [storyText, setStoryText] = useState(
    "You are at a crossroads. Type 'continue' to start your journey."
  );
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentEvent, setCurrentEvent] = useState("start");
  const [villageVisited, setVillageVisited] = useState(false);
  const [showMeme, setShowMeme] = useState(false);  

  const playAudio = (audioFile: string) => {
    if (backgroundSound) {
      backgroundSound.stop();
    }
    backgroundSound = new Howl({
      src: [`/music/${audioFile}`],
      volume: 0.5,
      loop: false,
    });
    backgroundSound.play();
  };

  const handleUserInput = async (e) => {
    e.preventDefault();
    setLoading(true);

    let nextEvent = currentEvent;
    let nextStoryText = storyText;
    let audioCue = "bg-ambi.ogg";

    const input = userInput.toLowerCase();

    // Universal "return" logic to go back to crossroads
    if (input === "return") {
      nextEvent = "crossroads";
      nextStoryText =
        "You are back at the crossroads. Type 'left', 'right', or 'straight'.";
    }

    // Universal "continue" logic for progression
    else if (input === "continue") {
      if (currentEvent === "start") {
        nextEvent = "crossroads";
        nextStoryText =
          "You stand at a crossroads. Type 'left', 'right', or 'straight'.";
        audioCue = "mystery_curiosity.ogg";
      } else if (currentEvent === "throneRoom") {
        nextEvent = "oasisEnding";
        nextStoryText =
          "The king tells you about the hidden oasis. Enter the secret code.";
      } else {
        nextStoryText = "There is nothing to continue right now.";
      }
    }

    // Handle secret code entry
    else if (input === secretCode) {
      setShowMeme(true);
      nextStoryText =
        "You unlocked the secret! Enjoy this hidden treasure below.";
      playAudio("happy_resolution.ogg");
    }

    // Crossroads Logic
    else if (currentEvent === "crossroads") {
      if (input === "left") {
        nextEvent = "forest";
        nextStoryText =
          "You enter the forest. Type 'explore' or 'return'.";
        audioCue = "danger_threat.ogg";
      } else if (input === "right") {
        nextEvent = "village";
        nextStoryText =
          "You arrive at a village. Type 'talk' to interact or 'return' to go back.";
        audioCue = "calm_exploration.ogg";
      } else if (input === "straight") {
        if (villageVisited) {
          nextEvent = "castle";
          nextStoryText =
            "You head towards the castle. Guards block the way. Type 'approach' or 'return'.";
          audioCue = "tension_building.ogg";
        } else {
          nextStoryText =
            "The path to the castle is locked. Perhaps the village holds clues.";
        }
      } else {
        nextStoryText = "Please type 'left', 'right', or 'straight'.";
      }
    }

    // Forest Path (Distinct from Village)
    else if (currentEvent === "forest") {
      if (input === "explore") {
        nextEvent = "hiddenTemple";
        nextStoryText =
          "Deep in the forest, you find a hidden temple. Type 'enter' or 'return'.";
        audioCue = "mystery_curiosity.ogg";
      } else {
        nextStoryText = "Type 'explore' or 'return'.";
      }
    }

    // Village Path
    else if (currentEvent === "village") {
      if (input === "talk") {
        nextEvent = "villagerHint";
        nextStoryText =
          "A villager whispers, 'The code is oasis42'. Type 'return' to head back.";
        setVillageVisited(true);
      } else {
        nextStoryText = "Type 'talk' or 'return'.";
      }
    }

    // Castle Path
    else if (currentEvent === "castle") {
      if (input === "approach") {
        nextEvent = "throneRoom";
        nextStoryText =
          "You are allowed into the castle. Type 'continue' to enter the throne room.";
        audioCue = "tension_building.ogg";
      } else {
        nextStoryText = "Type 'approach' or 'return'.";
      }
    }

    // Temple Exploration
    else if (currentEvent === "hiddenTemple") {
      if (input === "enter") {
        nextEvent = "templeTreasure";
        nextStoryText =
          "You uncover ancient artifacts. Return to the crossroads to proceed.";
        audioCue = "happy_resolution.ogg";
      } else {
        nextStoryText = "Type 'enter' or 'return'.";
      }
    }

    // Fallback for unrecognized actions
    else {
      nextStoryText = "I don't understand that action. Type 'return' to go back.";
    }

    setStoryText(nextStoryText);
    setCurrentEvent(nextEvent);
    setUserInput("");
    setLoading(false);
    playAudio(audioCue);
  };

  return (
    <div className="text-center p-4 relative min-h-screen">
      <h1 className="text-3xl mb-6">Interactive Story</h1>
      <p className="text-xl mb-4">{storyText}</p>

      {/* Top-right Return to Main Menu */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => {
            window.location.href = "/";
          }}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Main Menu
        </button>
      </div>

      {showMeme && (
        <div className="flex flex-col justify-center items-center mt-6">
          <img src={memeURL} alt="Secret Meme" className="rounded-lg mb-4" />
          <button
            onClick={() => {
              setShowMeme(false);
              setCurrentEvent("start");
              setStoryText(
                "You are at a crossroads. Type 'continue' to start your journey."
              );
              playAudio("bg-ambi.ogg");
            }}
            className="mb-2 bg-white text-black px-4 py-2 rounded"
          >
            Replay
          </button>
          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            Return to Main Menu
          </button>
        </div>
      )}

      <form onSubmit={handleUserInput}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="w-64 border-b-2 border-white bg-transparent text-white focus:outline-none"
        />
        <button type="submit" disabled={loading} className="ml-4 text-white">
          {loading ? "Loading..." : "Enter"}
        </button>
      </form>
    </div>
  );

}
