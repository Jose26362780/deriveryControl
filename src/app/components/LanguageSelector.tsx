import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";
import { motion } from "motion/react";

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 px-1 bg-slate-800/50 rounded-lg border border-slate-700">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setLanguage("pt")}
        className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
          language === "pt"
            ? "bg-lime-400/90 text-slate-950 shadow-lg shadow-lime-400/20"
            : "text-slate-400 hover:text-slate-200"
        }`}
      >
        {translations.pt.portugues}
      </motion.button>

      <span className="text-slate-600 text-xs px-1">|</span>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setLanguage("es")}
        className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
          language === "es"
            ? "bg-lime-400/90 text-slate-950 shadow-lg shadow-lime-400/20"
            : "text-slate-400 hover:text-slate-200"
        }`}
      >
        {translations.es.portugues === "Português"
          ? "Español"
          : translations.es.espanhol}
      </motion.button>
    </div>
  );
}
