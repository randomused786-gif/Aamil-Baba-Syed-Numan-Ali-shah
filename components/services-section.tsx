"use client";

import { motion } from "framer-motion";

const services = [
  {
    titleArabic: "روحانی علاج",
    titleEnglish: "Spiritual Healing",
    description: "Divine healing through sacred prayers and spiritual practices",
    icon: "✧",
  },
  {
    titleArabic: "تعویذات",
    titleEnglish: "Taweez & Amulets",
    description: "Blessed protection through sacred inscriptions",
    icon: "◈",
  },
  {
    titleArabic: "استخارہ",
    titleEnglish: "Istikhara",
    description: "Seeking divine guidance for important life decisions",
    icon: "❋",
  },
  {
    titleArabic: "کالا جادو کا توڑ",
    titleEnglish: "Black Magic Removal",
    description: "Breaking curses and negative energies through divine intervention",
    icon: "✦",
  },
];

export function ServicesSection() {
  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-background via-secondary/20 to-background">
      {/* Section header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          className="text-3xl md:text-4xl font-arabic text-primary/60 mb-4"
          style={{ direction: "rtl" }}
        >
          خدمات
        </motion.p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Our Services
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
      </motion.div>

      {/* Services grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:border-primary/50 transition-all duration-500"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
              boxShadow: "0 0 30px rgba(212, 175, 55, 0.1)",
            }}
          >
            {/* Icon */}
            <motion.span
              className="text-4xl text-primary/70 block mb-4"
              whileHover={{ scale: 1.2, rotate: 180 }}
              transition={{ duration: 0.5 }}
            >
              {service.icon}
            </motion.span>

            {/* Arabic title */}
            <p
              className="text-xl font-arabic text-primary/80 mb-1"
              style={{ direction: "rtl" }}
            >
              {service.titleArabic}
            </p>

            {/* English title */}
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {service.titleEnglish}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed">
              {service.description}
            </p>

            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/30 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-primary/30 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
