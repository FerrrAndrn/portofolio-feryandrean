"use client";
import { useEffect } from "react";

export default function Snowfall() {
  useEffect(() => {
    const container = document.createElement("div");
    container.className = "snowfall";
    document.body.appendChild(container);

    function createSnowflake() {
      const snowflake = document.createElement("div");
      snowflake.classList.add("snowflake");

      const sizeClass = Math.random();
      if (sizeClass < 0.2) snowflake.classList.add("thick");
      else if (sizeClass < 0.7) snowflake.classList.add("medium");
      else snowflake.classList.add("thin");

      snowflake.style.left = Math.random() * window.innerWidth + "px";
      container.appendChild(snowflake);

      const duration = snowflake.classList.contains("thick")
        ? 10000
        : snowflake.classList.contains("medium")
        ? 15000
        : 20000;
      setTimeout(() => snowflake.remove(), duration);
    }

    const interval = setInterval(createSnowflake, 200);
    return () => {
      clearInterval(interval);
      container.remove();
    };
  }, []);

  return null;
}
