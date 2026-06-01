"use client";

import { motion } from "framer-motion";

export function ContactSection() {
  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-background to-secondary/10">
      {/* Decorative top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-3xl md:text-4xl font-arabic text-primary/60 mb-4"
            style={{ direction: "rtl" }}
          >
            رابطہ کریں
          </motion.p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Contact for Consultation
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Contact form */}
        <motion.div
          className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            boxShadow: "0 0 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(212, 175, 55, 0.1)",
          }}
        >
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full bg-background/50 border border-border/50 rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full bg-background/50 border border-border/50 rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Your Problem
              </label>
              <textarea
                rows={4}
                className="w-full bg-background/50 border border-border/50 rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                placeholder="Describe your issue or concern..."
              />
            </div>

            <motion.button
              type="submit"
              className="w-full py-4 bg-primary/10 border border-primary/50 rounded-md text-primary font-medium tracking-wider hover:bg-primary/20 transition-all duration-300"
              whileHover={{
                boxShadow: "0 0 30px rgba(212, 175, 55, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </form>

          {/* Contact info */}
          <div className="mt-8 pt-8 border-t border-border/30 text-center">
            <p className="text-muted-foreground text-sm mb-4">
              Or reach us directly:
            </p>
            <motion.p
              className="text-primary text-lg"
              whileHover={{ scale: 1.02 }}
            >
              WhatsApp: +92 XXX XXXXXXX
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
