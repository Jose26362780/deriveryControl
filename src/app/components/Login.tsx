import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Truck, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

export function Login() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = (key: keyof typeof translations.pt) => translations[language][key];
  const [email, setEmail] = useState("admin@deliverycontrol.com");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error(t("emailOuSenhaInvalidos"));
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    localStorage.setItem("dc_auth", "true");
    toast.success("Bem-vindo ao DeliveryControl!");
    navigate("/");
  };

  return (
    <div
      className="min-h-screen bg-slate-950 flex items-center justify-center p-3 sm:p-4"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(163,230,53,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(163,230,53,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[250px] sm:h-[400px] bg-lime-400/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="w-10 sm:w-12 h-10 sm:h-12 bg-lime-400 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg shadow-lime-400/20"
          >
            <Truck className="w-5 sm:w-6 h-5 sm:h-6 text-slate-950" />
          </motion.div>
          <h1 className="text-slate-50 text-xl sm:text-2xl font-semibold tracking-tight">
            DeliveryControl
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Gestão inteligente de entregas
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-black/40">
          <h2 className="text-slate-50 text-base sm:text-lg font-medium mb-1">
            {t("fazerLogin")}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mb-4 sm:mb-6">
            Use qualquer senha para demo
          </p>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-slate-300 text-xs sm:text-sm font-medium mb-1 sm:mb-1.5">
                {t("email")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-50 text-xs sm:text-sm rounded-lg px-2.5 sm:px-3.5 py-2 sm:py-2.5 outline-none focus:border-lime-400/60 focus:ring-2 focus:ring-lime-400/10 transition-all placeholder:text-slate-500"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-xs sm:text-sm font-medium mb-1 sm:mb-1.5">
                {t("senha")}
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-slate-50 text-xs sm:text-sm rounded-lg px-2.5 sm:px-3.5 py-2 sm:py-2.5 pr-9 sm:pr-10 outline-none focus:border-lime-400/60 focus:ring-2 focus:ring-lime-400/10 transition-all placeholder:text-slate-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPass ? (
                    <EyeOff className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  ) : (
                    <Eye className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  )}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-lime-400 hover:bg-lime-300 text-slate-950 text-xs sm:text-sm font-semibold py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-1 sm:mt-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {t("entrar")}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>
        </div>

        <p className="text-center text-slate-600 text-xs mt-4 sm:mt-6">
          {t("todosOsDireitos")}
        </p>
      </motion.div>
    </div>
  );
}
