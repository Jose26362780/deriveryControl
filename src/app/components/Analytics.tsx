import { useMemo } from "react";
import { motion } from "motion/react";
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Area,
} from "recharts";
import { parseISO, getWeek, getMonth, getYear } from "date-fns";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useDeliveries } from "../context/DeliveryContext";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

const fmt = (v: number) =>
  `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

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

function TrendBadge({ delta }: { delta: number }) {
  if (delta > 0)
    return (
      <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
        <TrendingUp className="w-3 h-3" />+{delta.toFixed(1)}%
      </span>
    );
  if (delta < 0)
    return (
      <span className="flex items-center gap-1 text-xs text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">
        <TrendingDown className="w-3 h-3" />
        {delta.toFixed(1)}%
      </span>
    );
  return (
    <span className="flex items-center gap-1 text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
      <Minus className="w-3 h-3" />
      0%
    </span>
  );
}

export function Analytics() {
  const { deliveries } = useDeliveries();
  const { language } = useLanguage();
  const t = (key: keyof typeof translations.pt) => translations[language][key];

  const weeklyData = useMemo(() => {
    const map = new Map<
      string,
      {
        week: string;
        receita: number;
        lucro: number;
        gas: number;
        entregas: number;
      }
    >();
    deliveries.forEach((d) => {
      const date = parseISO(d.date);
      const week = `Sem ${getWeek(date, { weekStartsOn: 1 })}`;
      const key = `${getYear(date)}-${getWeek(date, { weekStartsOn: 1 })}`;
      const existing = map.get(key) ?? {
        week,
        receita: 0,
        lucro: 0,
        gas: 0,
        entregas: 0,
      };
      map.set(key, {
        week,
        receita: existing.receita + d.totalValue,
        lucro: existing.lucro + d.netProfit,
        gas: existing.gas + d.gasExpense,
        entregas: existing.entregas + d.lots,
      });
    });
    return Array.from(map.values()).slice(-8);
  }, [deliveries]);

  const monthlyData = useMemo(() => {
    const MONTHS = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];
    const map = new Map<
      string,
      {
        month: string;
        receita: number;
        lucro: number;
        gas: number;
        dias: number;
      }
    >();
    deliveries.forEach((d) => {
      const date = parseISO(d.date);
      const key = `${getYear(date)}-${getMonth(date)}`;
      const existing = map.get(key) ?? {
        month: MONTHS[getMonth(date)],
        receita: 0,
        lucro: 0,
        gas: 0,
        dias: 0,
      };
      map.set(key, {
        month: MONTHS[getMonth(date)],
        receita: existing.receita + d.totalValue,
        lucro: existing.lucro + d.netProfit,
        gas: existing.gas + d.gasExpense,
        dias: existing.dias + 1,
      });
    });
    return Array.from(map.values()).slice(-6);
  }, [deliveries]);

  const currentWeekData = weeklyData[weeklyData.length - 1];
  const prevWeekData = weeklyData[weeklyData.length - 2];
  const weekDelta = prevWeekData
    ? ((currentWeekData?.lucro - prevWeekData.lucro) / prevWeekData.lucro) * 100
    : 0;

  const currentMonthData = monthlyData[monthlyData.length - 1];
  const prevMonthData = monthlyData[monthlyData.length - 2];
  const monthDelta = prevMonthData
    ? ((currentMonthData?.lucro - prevMonthData.lucro) / prevMonthData.lucro) *
      100
    : 0;

  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-slate-50 text-lg sm:text-xl font-semibold tracking-tight">
          {t("analytics")}
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
          {t("analiseDesempenho")}
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: t("lucroEstaSemana"),
            value: fmt(currentWeekData?.lucro ?? 0),
            delta: weekDelta,
            sub: t("vsSemanaPassa"),
            color: "text-lime-400",
          },
          {
            label: t("lucroEsteMes"),
            value: fmt(currentMonthData?.lucro ?? 0),
            delta: monthDelta,
            sub: t("vsMesPassa"),
            color: "text-lime-400",
          },
          {
            label: t("ticketMedioDia"),
            value: fmt(
              deliveries.length > 0
                ? deliveries.reduce((s, d) => s + d.totalValue, 0) /
                    deliveries.length
                : 0,
            ),
            delta: 3.2,
            sub: t("mediaPorDiaTrabalhado"),
            color: "text-sky-400",
          },
          {
            label: t("taxaCusto"),
            value: `${
              deliveries.length > 0
                ? (
                    (deliveries.reduce((s, d) => s + d.gasExpense, 0) /
                      deliveries.reduce((s, d) => s + d.totalValue, 0)) *
                    100
                  ).toFixed(1)
                : 0
            }%`,
            delta: -1.1,
            sub: t("gasolinaReceita"),
            color: "text-amber-400",
          },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.3 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-3 sm:p-4 lg:p-5"
          >
            <p className="text-slate-400 text-xs font-medium mb-2 sm:mb-3">
              {item.label}
            </p>
            <p
              className={`text-base sm:text-lg lg:text-xl font-semibold mb-2 ${item.color}`}
            >
              {item.value}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <TrendBadge delta={item.delta} />
              <span className="text-slate-600 text-[10px] sm:text-[11px]">
                {item.sub}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Weekly comparison */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.3 }}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-3 sm:p-4 lg:p-5"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-5">
          <div>
            <h3 className="text-slate-50 text-sm font-semibold">
              {t("comparativoSemanal")}
            </h3>
            <p className="text-slate-500 text-xs mt-0.5">
              {t("receitaLucroGasolina")}
            </p>
          </div>
          <div className="grid grid-cols-3 sm:flex sm:items-center gap-2 sm:gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-lime-400 inline-block flex-shrink-0" />
              <span className="truncate">{t("receita")}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-violet-500 inline-block flex-shrink-0" />
              <span className="truncate">{t("lucro")}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block flex-shrink-0" />
              <span className="truncate">{t("gasolina")}</span>
            </span>
          </div>
        </div>
        <div className="w-full overflow-x-auto -mx-3 sm:-mx-4 lg:-mx-5 px-3 sm:px-4 lg:px-5">
          <ResponsiveContainer width="100%" height={200} minWidth={280}>
            <BarChart
              data={weeklyData}
              margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
              barGap={4}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1e293b"
                vertical={false}
              />
              <XAxis
                dataKey="week"
                stroke="transparent"
                tick={{ fill: "#475569", fontSize: 10 }}
                tickLine={false}
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
                  name === "receita"
                    ? "Receita"
                    : name === "lucro"
                      ? "Lucro"
                      : "Gasolina",
                ]}
              />
              <Bar
                key="bar-receita"
                name="Receita"
                dataKey="receita"
                fill="#a3e635"
                radius={[4, 4, 0, 0]}
                barSize={12}
              />
              <Bar
                key="bar-lucro"
                name="Lucro"
                dataKey="lucro"
                fill="#8b5cf6"
                radius={[4, 4, 0, 0]}
                barSize={12}
              />
              <Bar
                key="bar-gas"
                name="Gasolina"
                dataKey="gas"
                fill="#fbbf24"
                radius={[4, 4, 0, 0]}
                barSize={12}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Monthly trend */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.3 }}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-3 sm:p-4 lg:p-5"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-5">
          <div>
            <h3 className="text-slate-50 text-sm font-semibold">
              Evolução Mensal
            </h3>
            <p className="text-slate-500 text-xs mt-0.5">
              Receita e lucro ao longo dos meses
            </p>
          </div>
        </div>
        <div className="w-full overflow-x-auto -mx-3 sm:-mx-4 lg:-mx-5 px-3 sm:px-4 lg:px-5">
          <ResponsiveContainer width="100%" height={200} minWidth={280}>
            <ComposedChart
              data={monthlyData}
              margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gradMonthly" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a3e635" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#a3e635" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1e293b"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                stroke="transparent"
                tick={{ fill: "#475569", fontSize: 10 }}
                tickLine={false}
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
                  name === "receita" ? "Receita" : "Lucro",
                ]}
              />
              <Area
                key="area-receita"
                name="Receita"
                type="monotone"
                dataKey="receita"
                stroke="#a3e635"
                fill="url(#gradMonthly)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                key="line-lucro"
                name="Lucro"
                type="monotone"
                dataKey="lucro"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: "#8b5cf6", r: 3 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
