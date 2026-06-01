"use client";

import { motion } from "framer-motion";

export function ArabicDecorations() {
  const arabicPhrases = [
    { text: "الله أكبر", translation: "Allah is Greatest" },
    { text: "سبحان الله", translation: "Glory be to Allah" },
    { text: "الحمد لله", translation: "All praise to Allah" },
    { text: "ماشاء الله", translation: "As Allah willed" },
  ];

  return (
    <>
      {/* Floating Arabic text on left */}
      <div className="absolute left-4 md:left-8 top-1/4 flex flex-col gap-8">
        {arabicPhrases.slice(0, 2).map((phrase, index) => (
          <motion.div
            key={index}
            className="text-right"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 + index * 0.3 }}
          >
            <motion.p
              className="text-2xl md:text-3xl font-arabic text-primary/40"
              style={{ direction: "rtl" }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                textShadow: [
                  "0 0 10px rgba(212, 175, 55, 0.2)",
                  "0 0 20px rgba(212, 175, 55, 0.4)",
                  "0 0 10px rgba(212, 175, 55, 0.2)",
                ],
              }}
              transition={{
                duration: 4,
                delay: index * 0.5,
                repeat: Infinity,
              }}
            >
              {phrase.text}
            </motion.p>
          </motion.div>
        ))}
      </div>

      {/* Floating Arabic text on right */}
      <div className="absolute right-4 md:right-8 top-1/4 flex flex-col gap-8">
        {arabicPhrases.slice(2, 4).map((phrase, index) => (
          <motion.div
            key={index}
            className="text-left"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8 + index * 0.3 }}
          >
            <motion.p
              className="text-2xl md:text-3xl font-arabic text-primary/40"
              style={{ direction: "rtl" }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                textShadow: [
                  "0 0 10px rgba(212, 175, 55, 0.2)",
                  "0 0 20px rgba(212, 175, 55, 0.4)",
                  "0 0 10px rgba(212, 175, 55, 0.2)",
                ],
              }}
              transition={{
                duration: 4,
                delay: index * 0.5 + 0.5,
                repeat: Infinity,
              }}
            >
              {phrase.text}
            </motion.p>
          </motion.div>
        ))}
      </div>

      {/* Decorative geometric patterns */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <svg
          width="120"
          height="40"
          viewBox="0 0 120 40"
          className="text-primary/30"
        >
          <path
            d="M60 0 L70 20 L60 40 L50 20 Z"
            fill="currentColor"
            opacity="0.5"
          />
          <path
            d="M40 10 L50 20 L40 30 L30 20 Z"
            fill="currentColor"
            opacity="0.3"
          />
          <path
            d="M80 10 L90 20 L80 30 L70 20 Z"
            fill="currentColor"
            opacity="0.3"
          />
          <circle cx="20" cy="20" r="4" fill="currentColor" opacity="0.4" />
          <circle cx="100" cy="20" r="4" fill="currentColor" opacity="0.4" />
        </svg>
      </motion.div>

      {/* Bottom Arabic calligraphy decoration */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <motion.p
          className="text-xl md:text-2xl font-arabic text-primary/50"
          style={{ direction: "rtl" }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        >
          لَا إِلٰهَ إِلَّا اللهُ مُحَمَّدٌ رَسُولُ اللهِ
        </motion.p>
        <p className="text-xs text-muted-foreground mt-1 tracking-wider">
          There is no god but Allah, Muhammad is the messenger of Allah
        </p>
      </motion.div>
    </>
  );
}
