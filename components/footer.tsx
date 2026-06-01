"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative py-12 px-4 bg-background border-t border-border/30">
      <div className="max-w-4xl mx-auto text-center">
        {/* Arabic blessing */}
        <motion.p
          className="text-xl font-arabic text-primary/50 mb-4"
          style={{ direction: "rtl" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ
        </motion.p>
        <p className="text-xs text-muted-foreground mb-6">
          And my success is not but through Allah
        </p>

        {/* Name */}
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Syed Noman Ali Shah
        </h3>
        <p className="text-sm text-muted-foreground">
          Aamil Baba | Spiritual Healer | Divine Guide
        </p>

        {/* Decorative line */}
        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto my-6" />

        {/* Copyright */}
        <p className="text-xs text-muted-foreground/60">
          All matters are in the hands of Allah
        </p>
      </div>
    </footer>
  );
}
