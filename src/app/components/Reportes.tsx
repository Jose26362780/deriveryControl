import { useMemo, useRef } from "react";
import { motion } from "motion/react";
import {
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
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  FileDown,
  Truck,
  TrendingUp,
  Package,
  Fuel,
  DollarSign,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import { useDeliveries } from "../context/DeliveryContext";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

const fmt = (v: number) =>
  `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const PIE_COLORS = ["#8b5cf6", "#a3e635", "#38bdf8"];

export function Reportes() {
  const { deliveries } = useDeliveries();
  const { language } = useLanguage();
  const t = (key: keyof typeof translations.pt) => translations[language][key];
  const reportRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  const monthInterval = { start: startOfMonth(today), end: endOfMonth(today) };
  const thisMonth = deliveries.filter((d) =>
    isWithinInterval(parseISO(d.date), monthInterval),
  );

  const stats = useMemo(() => {
    const totalValue = thisMonth.reduce((s, d) => s + d.totalValue, 0);
    const totalGas = thisMonth.reduce((s, d) => s + d.gasExpense, 0);
    const totalProfit = thisMonth.reduce((s, d) => s + d.netProfit, 0);
    const totalLots = thisMonth.reduce((s, d) => s + d.lots, 0);
    const workedDays = thisMonth.length;
    const avgPerDay = workedDays > 0 ? totalValue / workedDays : 0;
    return {
      totalValue,
      totalGas,
      totalProfit,
      totalLots,
      workedDays,
      avgPerDay,
    };
  }, [thisMonth]);

  const barData = useMemo(() => {
    return thisMonth.slice(-15).map((d) => ({
      date: format(parseISO(d.date), "dd/MM"),
      lucro: d.netProfit,
      receita: d.totalValue,
    }));
  }, [thisMonth]);

  const pieData = [
    {
      name: "Carro (40%)",
      value: parseFloat((stats.totalProfit * 0.4).toFixed(2)),
    },
    {
      name: "João A (30%)",
      value: parseFloat((stats.totalProfit * 0.3).toFixed(2)),
    },
    {
      name: "Carlos B (30%)",
      value: parseFloat((stats.totalProfit * 0.3).toFixed(2)),
    },
  ];

  const handlePrint = () => {
    toast.success("Gerando PDF...");
    setTimeout(() => window.print(), 300);
  };

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #report-print, #report-print * { visibility: visible; }
          #report-print { position: fixed; inset: 0; background: white !important; color: black !important; padding: 24px; }
          .no-print { display: none !important; }
          .print-page-break { page-break-before: always; }
        }
      `}</style>

      <div className="p-4 lg:p-6 space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 no-print">
          <div>
            <h1 className="text-slate-50 text-xl font-semibold tracking-tight">
              {t("relatorios")}
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">
              {t("relatorioDesde")}{" "}
              {format(today, "MMMM 'de' yyyy", { locale: ptBR })}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePrint}
            className="sm:ml-auto flex items-center gap-2 bg-lime-400 hover:bg-lime-300 text-slate-950 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            <FileDown className="w-4 h-4" />
            {t("exportarPDF")}
          </motion.button>
        </div>

        {/* Report content */}
        <div id="report-print" ref={reportRef}>
          {/* Report Header */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-lime-400 rounded-xl flex items-center justify-center">
                  <Truck className="w-5 h-5 text-slate-950" />
                </div>
                <div>
                  <h2 className="text-slate-50 font-semibold text-lg tracking-tight">
                    {t("deliveryControl")}
                  </h2>
                  <p className="text-slate-400 text-xs">
                    {t("relatorioFinanceiro")}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-xs">{t("periodo")}</p>
                <p className="text-slate-200 text-sm font-medium capitalize">
                  {format(today, "MMMM 'de' yyyy", { locale: ptBR })}
                </p>
                <p className="text-slate-500 text-xs">
                  {t("geradoEm")} {format(today, "dd/MM/yyyy")}
                </p>
              </div>
            </div>

            <div className="h-px bg-slate-800 mb-4" />

            {/* KPIs grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: <DollarSign className="w-4 h-4 text-lime-400" />,
                  label: t("receitaBruta"),
                  value: fmt(stats.totalValue),
                  color: "text-lime-400",
                },
                {
                  icon: <TrendingUp className="w-4 h-4 text-emerald-400" />,
                  label: t("lucroLiquido"),
                  value: fmt(stats.totalProfit),
                  color: "text-emerald-400",
                },
                {
                  icon: <Fuel className="w-4 h-4 text-amber-400" />,
                  label: t("totalGasolina"),
                  value: fmt(stats.totalGas),
                  color: "text-amber-400",
                },
                {
                  icon: <Package className="w-4 h-4 text-sky-400" />,
                  label: t("totalEntregas"),
                  value: stats.totalLots.toString(),
                  color: "text-sky-400",
                },
                {
                  icon: <Calendar className="w-4 h-4 text-violet-400" />,
                  label: t("diasTrabalhados"),
                  value: stats.workedDays.toString(),
                  color: "text-violet-400",
                },
                {
                  icon: <TrendingUp className="w-4 h-4 text-slate-400" />,
                  label: t("mediaPorDia"),
                  value: fmt(stats.avgPerDay),
                  color: "text-slate-300",
                },
              ].map((item, i) => (
                <div key={i} className="bg-slate-800/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {item.icon}
                    <p className="text-slate-400 text-xs">{item.label}</p>
                  </div>
                  <p className={`text-lg font-semibold ${item.color}`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5"
            >
              <h3 className="text-slate-50 text-sm font-semibold mb-1">
                {t("receitaLucro")}
              </h3>
              <p className="text-slate-500 text-xs mb-4">
                {t("ultimas15Entregas")}
              </p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={barData}
                  barGap={3}
                  margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
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
                  />
                  <YAxis
                    stroke="transparent"
                    tick={{ fill: "#475569", fontSize: 10 }}
                    tickLine={false}
                    tickFormatter={(v) => `R$${v}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "1px solid #1e293b",
                      borderRadius: "8px",
                      fontSize: "11px",
                    }}
                    labelStyle={{ color: "#94a3b8" }}
                    formatter={(v: number, name: string) => [
                      fmt(v),
                      name === "receita" ? "Receita" : "Lucro",
                    ]}
                  />
                  <Bar
                    key="bar-receita"
                    name="Receita"
                    dataKey="receita"
                    fill="#a3e635"
                    radius={[3, 3, 0, 0]}
                    barSize={12}
                  />
                  <Bar
                    key="bar-lucro"
                    name="Lucro"
                    dataKey="lucro"
                    fill="#8b5cf6"
                    radius={[3, 3, 0, 0]}
                    barSize={12}
                  />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5"
            >
              <h3 className="text-slate-50 text-sm font-semibold mb-1">
                {t("divisaoLucro")}
              </h3>
              <p className="text-slate-500 text-xs mb-2">
                {t("distribuicaoPercentual")}
              </p>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={68}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, i) => (
                      <Cell
                        key={`rpt-cell-${entry.name}`}
                        fill={PIE_COLORS[i]}
                        strokeWidth={0}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "1px solid #1e293b",
                      borderRadius: "8px",
                      fontSize: "11px",
                    }}
                    formatter={(v: number) => [fmt(v)]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-1">
                {pieData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-400 text-xs">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: PIE_COLORS[i] }}
                      />
                      {item.name}
                    </span>
                    <span className="text-slate-200 text-xs font-medium">
                      {fmt(item.value)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Delivery table */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-slate-800">
              <h3 className="text-slate-50 text-sm font-semibold">
                {t("entregas")} do Mês
              </h3>
              <p className="text-slate-500 text-xs mt-0.5">
                {thisMonth.length} registros
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800">
                    {[
                      t("data"),
                      "Lotes",
                      t("receita"),
                      t("gasolina"),
                      t("lucro"),
                      "Carro (40%)",
                      "João A (30%)",
                      "Carlos B (30%)",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-slate-400 text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {thisMonth.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-4 py-8 text-center text-slate-500 text-sm"
                      >
                        {t("nenhuma")} entrega registrada este mês
                      </td>
                    </tr>
                  ) : (
                    thisMonth.map((d, i) => (
                      <tr
                        key={d.id}
                        className={`border-b border-slate-800/50 ${i % 2 === 0 ? "bg-slate-800/10" : ""}`}
                      >
                        <td className="px-4 py-3 text-slate-200 whitespace-nowrap text-xs">
                          {format(parseISO(d.date), "dd/MM/yyyy")}
                        </td>
                        <td className="px-4 py-3 text-slate-300 text-xs">
                          {d.lots}
                        </td>
                        <td className="px-4 py-3 text-slate-200 text-xs">
                          {fmt(d.totalValue)}
                        </td>
                        <td className="px-4 py-3 text-amber-400 text-xs">
                          {fmt(d.gasExpense)}
                        </td>
                        <td className="px-4 py-3 text-lime-400 font-semibold text-xs">
                          {fmt(d.netProfit)}
                        </td>
                        <td className="px-4 py-3 text-violet-400 text-xs">
                          {fmt(d.carShare)}
                        </td>
                        <td className="px-4 py-3 text-emerald-400 text-xs">
                          {fmt(d.workerAShare)}
                        </td>
                        <td className="px-4 py-3 text-sky-400 text-xs">
                          {fmt(d.workerBShare)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                {thisMonth.length > 0 && (
                  <tfoot>
                    <tr className="border-t border-slate-700 bg-slate-800/30">
                      <td className="px-4 py-3 text-slate-300 text-xs font-semibold">
                        Total
                      </td>
                      <td className="px-4 py-3 text-slate-300 text-xs font-semibold">
                        {stats.totalLots}
                      </td>
                      <td className="px-4 py-3 text-slate-200 text-xs font-semibold">
                        {fmt(stats.totalValue)}
                      </td>
                      <td className="px-4 py-3 text-amber-400 text-xs font-semibold">
                        {fmt(stats.totalGas)}
                      </td>
                      <td className="px-4 py-3 text-lime-400 text-xs font-bold">
                        {fmt(stats.totalProfit)}
                      </td>
                      <td className="px-4 py-3 text-violet-400 text-xs font-semibold">
                        {fmt(stats.totalProfit * 0.4)}
                      </td>
                      <td className="px-4 py-3 text-emerald-400 text-xs font-semibold">
                        {fmt(stats.totalProfit * 0.3)}
                      </td>
                      <td className="px-4 py-3 text-sky-400 text-xs font-semibold">
                        {fmt(stats.totalProfit * 0.3)}
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
