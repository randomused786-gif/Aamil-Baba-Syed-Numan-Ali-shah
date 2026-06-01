"use client";

import { motion } from "framer-motion";
import { PalaceGateBackground } from "@/components/palace-gate-background";
import { LightParticles, GlowingOrbs } from "@/components/light-effects";
import { Nameplate } from "@/components/nameplate";
import { ArabicDecorations } from "@/components/arabic-decorations";

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background layers */}
      <PalaceGateBackground />
      <GlowingOrbs />
      <LightParticles />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-20">
        {/* Welcome text */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.p
            className="text-lg md:text-xl text-primary/70 tracking-[0.3em] uppercase mb-2"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Welcome to the abode of
          </motion.p>
        </motion.div>

        {/* Main Nameplate */}
        <Nameplate 
          name="Syed Noman Ali Shah" 
          subtitle="Spiritual Healer & Divine Guide"
        />

        {/* Services tagline */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Seeking divine guidance and spiritual healing through ancient wisdom 
            and sacred practices
          </p>
          
          {/* Call to action */}
          <motion.button
            className="mt-8 px-8 py-3 bg-primary/10 border border-primary/50 rounded-full text-primary hover:bg-primary/20 transition-all duration-300 tracking-wider text-sm uppercase"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(212, 175, 55, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            Seek Guidance
          </motion.button>
        </motion.div>
      </div>

      {/* Arabic decorations */}
      <ArabicDecorations />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center"
          animate={{
            borderColor: ["rgba(212, 175, 55, 0.3)", "rgba(212, 175, 55, 0.6)", "rgba(212, 175, 55, 0.3)"],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-3 bg-primary/50 rounded-full mt-2"
            animate={{
              y: [0, 12, 0],
              opacity: [1, 0.3, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
