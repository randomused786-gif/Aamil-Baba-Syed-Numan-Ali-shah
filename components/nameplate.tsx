"use client";

import { motion } from "framer-motion";

interface NameplateProps {
  name: string;
  subtitle?: string;
}

export function Nameplate({ name, subtitle }: NameplateProps) {
  return (
    <motion.div
      className="relative perspective-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.5 }}
    >
      {/* Outer frame with ornate border */}
      <motion.div
        className="nameplate-3d relative bg-gradient-to-b from-[#1a1510] via-[#0d0a08] to-[#1a1510] rounded-lg p-1"
        animate={{
          rotateY: [-2, 2, -2],
          rotateX: [1, -1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          boxShadow: `
            0 0 30px rgba(212, 175, 55, 0.4),
            0 0 60px rgba(212, 175, 55, 0.2),
            inset 0 1px 0 rgba(212, 175, 55, 0.3)
          `,
        }}
      >
        {/* Gold ornate border */}
        <div className="absolute inset-0 rounded-lg border-2 border-primary/50 pointer-events-none" />
        <div className="absolute inset-1 rounded-lg border border-primary/30 pointer-events-none" />
        
        {/* Corner ornaments */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary rounded-tl-lg" />
        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary rounded-tr-lg" />
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-primary rounded-bl-lg" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary rounded-br-lg" />
        
        {/* Inner content */}
        <div className="relative bg-gradient-to-b from-[#12100d] via-[#0a0908] to-[#12100d] rounded-md px-8 py-6 md:px-16 md:py-8">
          {/* Top decorative line */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
          
          {/* Arabic bismillah above name */}
          <motion.p
            className="text-center text-primary/80 text-lg md:text-xl font-arabic mb-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ direction: "rtl" }}
          >
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </motion.p>
          
          {/* Main name */}
          <motion.h1
            className="text-center text-2xl md:text-4xl lg:text-5xl font-bold tracking-wide"
            style={{
              background: "linear-gradient(180deg, #f4d03f 0%, #d4af37 50%, #b8860b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 40px rgba(212, 175, 55, 0.5)",
            }}
          >
            {name}
          </motion.h1>
          
          {subtitle && (
            <motion.p
              className="text-center text-primary/70 mt-2 text-sm md:text-base tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {subtitle}
            </motion.p>
          )}
          
          {/* Arabic subtitle */}
          <motion.p
            className="text-center text-primary/60 text-base md:text-lg font-arabic mt-3"
            style={{ direction: "rtl" }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            عامل باба
          </motion.p>
          
          {/* Bottom decorative line */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
          
          {/* Shimmer effect overlay */}
          <motion.div
            className="absolute inset-0 rounded-md pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.1) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
            }}
            animate={{
              backgroundPosition: ["200% center", "-200% center"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </motion.div>
      
      {/* Glow beneath nameplate */}
      <motion.div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full blur-xl"
        style={{
          background: "radial-gradient(ellipse, rgba(212, 175, 55, 0.4) 0%, transparent 70%)",
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
