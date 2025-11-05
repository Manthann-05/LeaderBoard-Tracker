import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const leftCurtain = useRef(null);
  const rightCurtain = useRef(null);
  const contentRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Curtains slide outwards
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut", duration: 1.5 } });

    tl.to([leftCurtain.current, rightCurtain.current], {
      xPercent: (i) => (i === 0 ? -100 : 100),
      delay: 0.6,
    })
      .fromTo(
        contentRef.current,
        { autoAlpha: 0, scale: 0.95 },
        { autoAlpha: 1, scale: 1, duration: 1.2 },
        "-=0.8"
      );
  }, []);

  return (
    <div className="curtain-container">
      <div className="curtain left" ref={leftCurtain}></div>
      <div className="curtain right" ref={rightCurtain}></div>

      <div className="content" ref={contentRef}>
        <h1 className="main-heading">TIC TAC TOE ESPORT ARENA</h1>
        <button className="start-btn" onClick={() => navigate("/game")}>
          Start Game 🎮
        </button>
      </div>
    </div>
  );
}
