import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  DollarSign,
  Package,
  Fuel,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  format,
  parseISO,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { useDeliveries } from "../context/DeliveryContext";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";
import { Delivery, Period } from "../types";

const fmt = (v: number) =>
  `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const PIE_COLORS = ["#8b5cf6", "#a3e635", "#38bdf8"];

const TOOLTIP_STYLE = {
  contentStyle: {
    backgroundColor: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: "10px",
    color: "#f8fafc",
    fontSize: "12px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
  },
  labelStyle: { color: "#94a3b8", marginBottom: 4 },
};

interface KPICardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  delta?: number;
  delay?: number;
}

function KPICard({
  label,
  value,
  icon,
  color,
  delta,
  delay = 0,
}: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-3 sm:p-4 lg:p-5 flex flex-col gap-3 sm:gap-4 cursor-default hover:border-slate-700 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <div
          className={`w-8 sm:w-9 h-8 sm:h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}
        >
          {icon}
        </div>
        {delta !== undefined && (
          <div
            className={`flex items-center gap-0.5 text-[10px] sm:text-xs font-medium flex-shrink-0 ${delta >= 0 ? "text-emerald-400" : "text-red-400"}`}
          >
            {delta >= 0 ? (
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            ) : (
              <ArrowDownRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            )}
            {Math.abs(delta).toFixed(1)}%
          </div>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-slate-400 text-xs font-medium mb-1">{label}</p>
        <p className="text-slate-50 text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight truncate">
          {value}
        </p>
      </div>
    </motion.div>
  );
}

function filterByPeriod(deliveries: Delivery[], period: Period) {
  const today = new Date();
  const interval =
    period === "week"
      ? {
          start: startOfWeek(today, { weekStartsOn: 1 }),
          end: endOfWeek(today, { weekStartsOn: 1 }),
        }
      : { start: startOfMonth(today), end: endOfMonth(today) };
  return deliveries.filter((d) => isWithinInterval(parseISO(d.date), interval));
}

export function Dashboard() {
  const { deliveries } = useDeliveries();
  const { language } = useLanguage();
  const t = (key: keyof typeof translations.pt) => translations[language][key];
  const [period, setPeriod] = useState<Period>("month");

  const filtered = useMemo(
    () => filterByPeriod(deliveries, period),
    [deliveries, period],
  );

  const kpis = useMemo(() => {
    const totalValue = filtered.reduce((s, d) => s + d.totalValue, 0);
    const totalGas = filtered.reduce((s, d) => s + d.gasExpense, 0);
    const totalProfit = filtered.reduce((s, d) => s + d.netProfit, 0);
    const totalLots = filtered.reduce((s, d) => s + d.lots, 0);
    const workedDays = filtered.length;
    return { totalValue, totalGas, totalProfit, totalLots, workedDays };
  }, [filtered]);

  const chartData = useMemo(() => {
    const today = new Date();
    const days: {
      date: string;
      receita: number;
      lucro: number;
      gas: number;
      entregas: number;
    }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toISOString().split("T")[0];
      const dayDelivs = deliveries.filter((x) => x.date === key);
      days.push({
        date: format(d, "dd/MM"),
        receita: dayDelivs.reduce((s, x) => s + x.totalValue, 0),
        lucro: dayDelivs.reduce((s, x) => s + x.netProfit, 0),
        gas: dayDelivs.reduce((s, x) => s + x.gasExpense, 0),
        entregas: dayDelivs.reduce((s, x) => s + x.lots, 0),
      });
    }
    return days;
  }, [deliveries]);

  const pieData = useMemo(() => {
    const p = kpis.totalProfit;
    return [
      { name: "Carro (40%)", value: parseFloat((p * 0.4).toFixed(2)) },
      { name: "João A (30%)", value: parseFloat((p * 0.3).toFixed(2)) },
      { name: "Carlos B (30%)", value: parseFloat((p * 0.3).toFixed(2)) },
    ];
  }, [kpis.totalProfit]);

  const recentDeliveries = useMemo(() => deliveries.slice(0, 5), [deliveries]);

  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-5 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-slate-50 text-lg sm:text-xl font-semibold tracking-tight">
            {t("dashboard")}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            {format(new Date(), "EEEE, dd 'de' MMMM 'de' yyyy", {
              locale: ptBR,
            })}
          </p>
        </div>
        <div className="sm:ml-auto flex bg-slate-900 border border-slate-800 rounded-xl p-1 gap-1">
          {(["week", "month"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                period === p
                  ? "bg-lime-400 text-slate-950"
                  : "text-slate-400 hover:text-slate-50"
              }`}
            >
              {p === "week" ? t("semana") : t("mes")}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
        <KPICard
          label={t("kpiCard_totalGerado")}
          value={fmt(kpis.totalValue)}
          icon={<DollarSign className="w-4 h-4 text-lime-400" />}
          color="bg-lime-400/10"
          delta={8.2}
          delay={0}
        />
        <KPICard
          label={t("kpiCard_entregasTotal")}
          value={kpis.totalLots.toString()}
          icon={<Package className="w-4 h-4 text-sky-400" />}
          color="bg-sky-400/10"
          delta={5.1}
          delay={0.05}
        />
        <KPICard
          label={t("kpiCard_gasolina")}
          value={fmt(kpis.totalGas)}
          icon={<Fuel className="w-4 h-4 text-amber-400" />}
          color="bg-amber-400/10"
          delta={-2.3}
          delay={0.1}
        />
        <KPICard
          label={t("kpiCard_lucro")}
          value={fmt(kpis.totalProfit)}
          icon={<TrendingUp className="w-4 h-4 text-emerald-400" />}
          color="bg-emerald-400/10"
          delta={11.4}
          delay={0.15}
        />
        <KPICard
          label={t("kpiCard_diasTrabalhados")}
          value={kpis.workedDays.toString()}
          icon={<Calendar className="w-4 h-4 text-violet-400" />}
          color="bg-violet-400/10"
          delay={0.2}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Area Chart - Receita e Lucro */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.35 }}
          className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-3 sm:p-4 lg:p-5"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-5">
            <div>
              <h3 className="text-slate-50 text-sm font-semibold">
                {t("graficoReceita")}
              </h3>
              <p className="text-slate-500 text-xs mt-0.5">
                {t("ultimos30Dias")}
              </p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 flex-shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-lime-400 inline-block" />
                <span className="hidden sm:inline">{t("receita")}</span>
              </span>
              <span className="flex items-center gap-1.5 flex-shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-500 inline-block" />
                <span className="hidden sm:inline">{t("lucro")}</span>
              </span>
            </div>
          </div>
          <div className="w-full overflow-x-auto -mx-3 sm:-mx-4 lg:-mx-5 px-3 sm:px-4 lg:px-5">
            <ResponsiveContainer width="100%" height={180} minWidth={280}>
              <AreaChart
                data={chartData}
                margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="gradReceita" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a3e635" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#a3e635" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradLucro" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  stroke="transparent"
                  tick={{ fill: "#475569", fontSize: 10 }}
                  tickLine={false}
                  interval={4}
                />
                <YAxis
                  stroke="transparent"
                  tick={{ fill: "#475569", fontSize: 10 }}
                  tickLine={false}
                  tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
                  width={35}
                />
                <Tooltip
                  {...TOOLTIP_STYLE}
                  formatter={(v: number, name: string) => [
                    fmt(v),
                    name === "receita" ? t("receita") : t("lucro"),
                  ]}
                />
                <Area
                  key="area-receita"
                  name="Receita"
                  type="monotone"
                  dataKey="receita"
                  stroke="#a3e635"
                  strokeWidth={2}
                  fill="url(#gradReceita)"
                  dot={false}
                />
                <Area
                  key="area-lucro"
                  name="Lucro"
                  type="monotone"
                  dataKey="lucro"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="url(#gradLucro)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie Chart - Divisão */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.35 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-3 sm:p-4 lg:p-5"
        >
          <div className="mb-4 sm:mb-5">
            <h3 className="text-slate-50 text-sm font-semibold">
              {t("divisaoLucro")}
            </h3>
            <p className="text-slate-500 text-xs mt-0.5">
              {period === "week" ? t("estaSemana") : t("esteMes")}
            </p>
          </div>
          <div className="w-full overflow-x-auto -mx-3 sm:-mx-4 lg:-mx-5 px-3 sm:px-4 lg:px-5">
            <ResponsiveContainer width="100%" height={150} minWidth={180}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={72}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, i) => (
                    <Cell
                      key={`dash-cell-${entry.name}`}
                      fill={PIE_COLORS[i]}
                      strokeWidth={0}
                    />
                  ))}
                </Pie>
                <Tooltip
                  {...TOOLTIP_STYLE}
                  formatter={(v: number) => [fmt(v)]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-3 sm:mt-4">
            {pieData.map((item, i) => (
              <div key={i} className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-slate-400 text-xs truncate">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: PIE_COLORS[i] }}
                  />
                  <span className="truncate">{item.name}</span>
                </span>
                <span className="text-slate-300 text-xs font-medium flex-shrink-0">
                  {fmt(item.value)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bar chart + recent table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bar chart - Entregas por dia */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.35 }}
          className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-3 sm:p-4 lg:p-5"
        >
          <div className="mb-4 sm:mb-5">
            <h3 className="text-slate-50 text-sm font-semibold">
              {t("entregasPorDia")}
            </h3>
            <p className="text-slate-500 text-xs mt-0.5">
              {t("lotesEntregues")}
            </p>
          </div>
          <div className="w-full overflow-x-auto -mx-3 sm:-mx-4 lg:-mx-5 px-3 sm:px-4 lg:px-5">
            <ResponsiveContainer width="100%" height={160} minWidth={280}>
              <BarChart
                data={chartData}
                margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
                barSize={8}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  stroke="transparent"
                  tick={{ fill: "#475569", fontSize: 10 }}
                  tickLine={false}
                  interval={4}
                />
                <YAxis
                  stroke="transparent"
                  tick={{ fill: "#475569", fontSize: 10 }}
                  tickLine={false}
                  width={30}
                />
                <Tooltip
                  {...TOOLTIP_STYLE}
                  formatter={(v: number) => [v, t("lotes")]}
                />
                <Bar
                  key="bar-entregas"
                  name="Lotes"
                  dataKey="entregas"
                  fill="#38bdf8"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent deliveries */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.35 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-3 sm:p-4 lg:p-5"
        >
          <h3 className="text-slate-50 text-sm font-semibold mb-3 sm:mb-4">
            {t("entregasRecentes")}
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {recentDeliveries.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.05 }}
                className="flex items-center gap-2 sm:gap-3"
              >
                <div className="w-7 h-7 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package className="w-3.5 h-3.5 text-sky-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 text-xs font-medium truncate">
                    {format(parseISO(d.date), "dd/MM/yyyy")}
                  </p>
                  <p className="text-slate-500 text-[10px] sm:text-[11px]">
                    {d.lots} lotes
                  </p>
                </div>
                <span className="text-lime-400 text-xs font-semibold flex-shrink-0 whitespace-nowrap">
                  {fmt(d.netProfit)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
