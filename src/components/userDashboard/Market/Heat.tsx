'use client'
import React, { useEffect, useRef } from "react";

const Heat = () => {
    const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
        const script = document.createElement("script");
        script.src =
          "https://cryptorank.io/widget/market-state.js";
        script.type = "text/javascript";
        script.async = true;
       
  
        container.current.appendChild(script);
      }
   
  }, []);

  return (
    <div ref={container}>
      <div
        className="cr-heatmap-widget"
        data-top="10"
        data-site-url="https://cryptorank.io"
        data-api-url="https://api.cryptorank.io/v0"
        data-range="24H"
        data-order="cap"
        style={{ width: "100%", height: "580px" }}
      >
      </div>
    </div>
  );
};

export default Heat;
