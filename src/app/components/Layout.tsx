import { useState } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  Package,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Truck,
  Bell,
  User,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";
import { LanguageSelector } from "./LanguageSelector";

const navItemsBase = [
  { path: "/", labelKey: "dashboard" },
  { path: "/entregas", labelKey: "entregas" },
  { path: "/analytics", labelKey: "analytics" },
  { path: "/reportes", labelKey: "relatorios" },
];

const navItems = navItemsBase.map((item) => ({
  ...item,
  icon: [LayoutDashboard, Package, BarChart3, FileText][
    navItemsBase.indexOf(item)
  ],
}));

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = (key: keyof typeof translations.pt) => translations[language][key];

  const handleLogout = () => {
    localStorage.removeItem("dc_auth");
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-800">
        <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center flex-shrink-0">
          <Truck className="w-4 h-4 text-slate-950" />
        </div>
        <span className="text-slate-50 font-semibold text-[15px] tracking-tight">
          DeliveryControl
        </span>
        {onClose && (
          <button
            className="ml-auto text-slate-500 hover:text-slate-300 transition-colors"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="text-slate-600 text-[10px] font-semibold uppercase tracking-widest px-3 mb-3">
          {t("menu")}
        </p>
        {navItems.map(({ path, icon: Icon, labelKey }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive
                  ? "bg-lime-400/10 text-lime-400 border border-lime-400/15"
                  : "text-slate-400 hover:text-slate-50 hover:bg-slate-800/60"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-medium">
                  {t(labelKey as keyof typeof translations.pt)}
                </span>
                {isActive && (
                  <ChevronRight className="w-3.5 h-3.5 ml-auto text-lime-400" />
                )}
              </>
            )}
          </NavLink>
        ))}

        <div className="pt-4">
          <p className="text-slate-600 text-[10px] font-semibold uppercase tracking-widest px-3 mb-3">
            {t("sistema")}
          </p>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-50 hover:bg-slate-800/60 transition-all duration-200 w-full">
            <Settings className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-medium">{t("configuracao")}</span>
          </button>
        </div>
      </nav>

      {/* User section */}
      <div className="p-3 border-t border-slate-800">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="w-7 h-7 bg-lime-400/20 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-3.5 h-3.5 text-lime-400" />
          </div>
          <div className="min-w-0">
            <p className="text-slate-200 text-xs font-medium truncate">
              {t("admin")}
            </p>
            <p className="text-slate-500 text-[11px] truncate">
              admin@deliverycontrol.com
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-slate-500 hover:text-red-400 transition-colors text-xs w-full px-3 py-2 rounded-lg hover:bg-red-400/8 group"
        >
          <LogOut className="w-3.5 h-3.5" />
          {t("sairDaConta")}
        </button>
      </div>
    </div>
  );
}

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div
      className="flex h-screen bg-slate-950 overflow-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 bg-slate-900 border-r border-slate-800">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 w-60 bg-slate-900 border-r border-slate-800 lg:hidden"
          >
            <SidebarContent onClose={() => setSidebarOpen(false)} />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="flex items-center gap-4 px-4 lg:px-6 py-3.5 bg-slate-900/60 backdrop-blur-sm border-b border-slate-800 flex-shrink-0">
          <button
            className="lg:hidden text-slate-400 hover:text-slate-50 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <Truck className="w-4 h-4 text-lime-400" />
            <span className="text-slate-500">/</span>
            <span className="text-slate-300 capitalize">
              {location.pathname === "/"
                ? "Dashboard"
                : location.pathname.replace("/", "").charAt(0).toUpperCase() +
                  location.pathname.replace("/", "").slice(1)}
            </span>
          </div>

          <div className="flex-1" />

          <button className="relative text-slate-400 hover:text-slate-200 transition-colors p-1.5 rounded-lg hover:bg-slate-800">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-lime-400 rounded-full" />
          </button>

          <LanguageSelector />

          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
            <div className="w-7 h-7 bg-lime-400/20 rounded-full flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-lime-400" />
            </div>
            <span className="text-sm text-slate-300 hidden sm:block font-medium">
              {"admin"}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="min-h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
