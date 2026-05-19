import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import {
  Plus,
  Search,
  Trash2,
  ChevronUp,
  ChevronDown,
  X,
  Package,
  Fuel,
  DollarSign,
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { useDeliveries } from "../context/DeliveryContext";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";
import { Delivery } from "../types";

const fmt = (v: number) =>
  `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

interface FormData {
  date: string;
  lots: number;
  totalValue: number;
  gasExpense: number;
  workerA: string;
  workerB: string;
}

type SortKey = "date" | "lots" | "totalValue" | "gasExpense" | "netProfit";
type SortDir = "asc" | "desc";

const PAGE_SIZE = 10;

export function Entregas() {
  const { deliveries, addDelivery, deleteDelivery } = useDeliveries();
  const { language } = useLanguage();
  const t = (key: keyof typeof translations.pt) => translations[language][key];
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      lots: undefined,
      totalValue: undefined,
      gasExpense: 0,
      workerA: "João Silva",
      workerB: "Carlos Santos",
    },
  });

  const onSubmit = (data: FormData) => {
    addDelivery({
      date: data.date,
      lots: Number(data.lots),
      totalValue: Number(data.totalValue),
      gasExpense: Number(data.gasExpense),
      workers: [data.workerA, data.workerB].filter(Boolean),
    });
    toast.success(t("entregaRegistradaSucesso"));
    reset();
    setShowForm(false);
  };

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
    setPage(1);
  };

  const filtered = useMemo(() => {
    let list = [...deliveries];
    if (search) {
      list = list.filter(
        (d) =>
          d.date.includes(search) ||
          d.lots.toString().includes(search) ||
          d.totalValue.toString().includes(search),
      );
    }
    list.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp =
        typeof av === "string"
          ? av.localeCompare(bv as string)
          : (av as number) - (bv as number);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [deliveries, search, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const SortBtn = ({ col }: { col: SortKey }) => (
    <button
      onClick={() => toggleSort(col)}
      className="inline-flex flex-col ml-1"
    >
      <ChevronUp
        className={`w-2.5 h-2.5 ${sortKey === col && sortDir === "asc" ? "text-lime-400" : "text-slate-600"}`}
      />
      <ChevronDown
        className={`w-2.5 h-2.5 ${sortKey === col && sortDir === "desc" ? "text-lime-400" : "text-slate-600"}`}
      />
    </button>
  );

  const confirmDelete = (id: string) => setDeleteId(id);
  const doDelete = () => {
    if (deleteId) {
      deleteDelivery(deleteId);
      setDeleteId(null);
      toast.success(t("entregaRemovidaSucesso"));
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div>
          <h1 className="text-slate-50 text-xl font-semibold tracking-tight">
            {t("entregas")}
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">
            {deliveries.length} {t("registrosNoTotal")}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm((v) => !v)}
          className="sm:ml-auto flex items-center gap-2 bg-lime-400 hover:bg-lime-300 text-slate-950 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? t("cancelar") : t("novaEntrega")}
        </motion.button>
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h3 className="text-slate-50 text-sm font-semibold mb-5 flex items-center gap-2">
                <Plus className="w-4 h-4 text-lime-400" />
                {t("registrarNovaEntrega")}
              </h3>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                <div>
                  <label className="text-slate-400 text-xs font-medium mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" /> {t("data")}
                  </label>
                  <input
                    type="date"
                    {...register("date", { required: t("obrigatorio") })}
                    className="w-full bg-slate-800 border border-slate-700 text-slate-50 text-sm rounded-lg px-3 py-2.5 outline-none focus:border-lime-400/60 focus:ring-2 focus:ring-lime-400/10 transition-all"
                  />
                  {errors.date && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.date.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-slate-400 text-xs font-medium mb-1.5 flex items-center gap-1.5">
                    <Package className="w-3 h-3" /> {t("quantidadeLotes")}
                  </label>
                  <input
                    type="number"
                    min={1}
                    {...register("lots", {
                      required: t("obrigatorio"),
                      min: { value: 1, message: t("minimoUm") },
                    })}
                    placeholder="ex: 45"
                    className="w-full bg-slate-800 border border-slate-700 text-slate-50 text-sm rounded-lg px-3 py-2.5 outline-none focus:border-lime-400/60 focus:ring-2 focus:ring-lime-400/10 transition-all placeholder:text-slate-600"
                  />
                  {errors.lots && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.lots.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-slate-400 text-xs font-medium mb-1.5 flex items-center gap-1.5">
                    <DollarSign className="w-3 h-3" /> {t("valorTotal")}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min={0}
                    {...register("totalValue", {
                      required: t("obrigatorio"),
                      min: { value: 0.01, message: t("valorInvalido") },
                    })}
                    placeholder="ex: 520.00"
                    className="w-full bg-slate-800 border border-slate-700 text-slate-50 text-sm rounded-lg px-3 py-2.5 outline-none focus:border-lime-400/60 focus:ring-2 focus:ring-lime-400/10 transition-all placeholder:text-slate-600"
                  />
                  {errors.totalValue && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.totalValue.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-slate-400 text-xs font-medium mb-1.5 flex items-center gap-1.5">
                    <Fuel className="w-3 h-3" /> {t("gastoGasolina")}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min={0}
                    {...register("gasExpense")}
                    placeholder="ex: 65.00"
                    className="w-full bg-slate-800 border border-slate-700 text-slate-50 text-sm rounded-lg px-3 py-2.5 outline-none focus:border-lime-400/60 focus:ring-2 focus:ring-lime-400/10 transition-all placeholder:text-slate-600"
                  />
                </div>

                <div>
                  <label className="text-slate-400 text-xs font-medium mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3 h-3" /> {t("funcionarioA")}
                  </label>
                  <input
                    type="text"
                    {...register("workerA")}
                    className="w-full bg-slate-800 border border-slate-700 text-slate-50 text-sm rounded-lg px-3 py-2.5 outline-none focus:border-lime-400/60 focus:ring-2 focus:ring-lime-400/10 transition-all"
                  />
                </div>

                <div>
                  <label className="text-slate-400 text-xs font-medium mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3 h-3" /> {t("funcionarioB")}
                  </label>
                  <input
                    type="text"
                    {...register("workerB")}
                    className="w-full bg-slate-800 border border-slate-700 text-slate-50 text-sm rounded-lg px-3 py-2.5 outline-none focus:border-lime-400/60 focus:ring-2 focus:ring-lime-400/10 transition-all"
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-3 flex justify-end gap-3 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      reset();
                      setShowForm(false);
                    }}
                    className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {t("cancelar")}
                  </button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-5 py-2 bg-lime-400 hover:bg-lime-300 text-slate-950 text-sm font-semibold rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    {t("registrarEntrega")}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {/* Search */}
        <div className="flex items-center gap-3 p-4 border-b border-slate-800">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Buscar por data, lotes..."
              className="w-full bg-slate-800 border border-slate-700 text-slate-50 text-sm rounded-lg pl-9 pr-3 py-2 outline-none focus:border-lime-400/60 focus:ring-2 focus:ring-lime-400/10 transition-all placeholder:text-slate-600"
            />
          </div>
          <span className="text-slate-500 text-xs ml-auto hidden sm:block">
            {filtered.length} resultados
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                {[
                  { label: "Data", key: "date" as SortKey },
                  { label: "Lotes", key: "lots" as SortKey },
                  { label: "Total Gerado", key: "totalValue" as SortKey },
                  { label: "Gasolina", key: "gasExpense" as SortKey },
                  { label: "Lucro Líquido", key: "netProfit" as SortKey },
                  { label: "Funcionários", key: null },
                  { label: "", key: null },
                ].map((col) => (
                  <th
                    key={col.label}
                    className="text-left px-4 py-3 text-slate-400 text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
                  >
                    <span className="flex items-center">
                      {col.label}
                      {col.key && <SortBtn col={col.key} />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {paged.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Package className="w-10 h-10 text-slate-700" />
                        <p className="text-slate-500 text-sm">
                          Nenhuma entrega encontrada
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paged.map((d: Delivery, i: number) => (
                    <motion.tr
                      key={d.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.02 }}
                      className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors group"
                    >
                      <td className="px-4 py-3.5 text-slate-200 whitespace-nowrap">
                        {format(parseISO(d.date), "dd/MM/yyyy", {
                          locale: ptBR,
                        })}
                      </td>
                      <td className="px-4 py-3.5 text-slate-300">{d.lots}</td>
                      <td className="px-4 py-3.5 text-slate-200 font-medium">
                        {fmt(d.totalValue)}
                      </td>
                      <td className="px-4 py-3.5 text-amber-400">
                        {fmt(d.gasExpense)}
                      </td>
                      <td className="px-4 py-3.5 text-lime-400 font-semibold">
                        {fmt(d.netProfit)}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex flex-wrap gap-1">
                          {d.workers.map((w) => (
                            <span
                              key={w}
                              className="inline-flex items-center gap-1 bg-slate-800 border border-slate-700 text-slate-300 text-[11px] px-2 py-0.5 rounded-full"
                            >
                              <Users className="w-2.5 h-2.5 text-slate-500" />
                              {w}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <button
                          onClick={() => confirmDelete(d.id)}
                          className="text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-800">
            <span className="text-slate-500 text-xs">
              Página {page} de {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 text-slate-400 hover:text-slate-50 disabled:opacity-30 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((n) => Math.abs(n - page) <= 2)
                .map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-7 h-7 text-xs rounded-lg transition-colors ${
                      n === page
                        ? "bg-lime-400 text-slate-950 font-semibold"
                        : "text-slate-400 hover:text-slate-50 hover:bg-slate-800"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 text-slate-400 hover:text-slate-50 disabled:opacity-30 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setDeleteId(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              <div className="w-10 h-10 bg-red-400/10 rounded-xl flex items-center justify-center mb-4">
                <Trash2 className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-slate-50 font-semibold mb-1">
                Remover entrega?
              </h3>
              <p className="text-slate-400 text-sm mb-5">
                Esta ação não pode ser desfeita.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 px-4 py-2.5 border border-slate-700 text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={doDelete}
                  className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-400 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Remover
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
