"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function PalaceGateBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050810] via-[#0a0f1a] to-[#050810]" />
      
      {/* Palace gate image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/palace-gate.png"
          alt="Mystical Palace Gate"
          fill
          className="object-cover object-center opacity-60"
          priority
        />
        {/* Gradient overlay to blend edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </div>

      {/* Divine light rays from center */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
        style={{
          background: `
            radial-gradient(ellipse 50% 80% at 50% 40%, 
              rgba(212, 175, 55, 0.15) 0%, 
              rgba(212, 175, 55, 0.05) 40%,
              transparent 70%
            )
          `,
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Light beams radiating from behind gate */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute origin-bottom"
            style={{
              width: "2px",
              height: "300px",
              left: "50%",
              bottom: "0",
              background: "linear-gradient(to top, rgba(212, 175, 55, 0.3) 0%, transparent 100%)",
              transform: `translateX(-50%) rotate(${i * 30}deg)`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scaleY: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </div>
  );
}
