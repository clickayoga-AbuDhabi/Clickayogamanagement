import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient.js";
import {
  LayoutDashboard,
  Users,
  UserRound,
  CalendarDays,
  CircleDollarSign,
  Plus,
  Check,
  X,
  Phone,
  Wallet,
  Sparkles,
  Package as PackageIcon,
  Pencil,
  Trash2,
  Activity,
  ChevronLeft,
  ChevronRight,
  List,
  Grid3x3,
  RefreshCw,
  ArrowUpDown,
  Download,
  MapPin,
  Search,
} from "lucide-react";

// ---------- Seed data (Click A Yoga, Abu Dhabi) ----------

const seedTrainers = [
  { id: "t1", name: "Dr. Ankitha", cred: "BNYS Naturopathy Doctor", baseSalary: 2000, commissionRate: 0.2, monthlyTarget: 130 },
  { id: "t2", name: "Dr. Akshatha", cred: "BNYS Naturopathy Doctor", baseSalary: 2000, commissionRate: 0.2, monthlyTarget: 130 },
];

const seedPackages = [
  { id: "pk1", name: "Drop-in", classes: 1, price: 150, type: "private" },
  { id: "pk2", name: "5-Class Pack", classes: 5, price: 650, type: "private" },
  { id: "pk3", name: "10-Class Pack", classes: 10, price: 1200, type: "private" },
  { id: "pk4", name: "20-Class Pack", classes: 20, price: 2200, type: "private" },
  { id: "pk5", name: "Monthly Unlimited", classes: null, price: 900, type: "private" },
  { id: "pk6", name: "Group Classes", classes: 8, price: 500, type: "group" },
];

const seedCustomers = [
  { id: "c1", name: "Fatima Al Marzooqi", phone: "050 123 4567", email: "fatima.marzooqi@gmail.com", location: "Al Reem Island, Abu Dhabi", packageId: "pk5", classesRemaining: "—", joined: "2026-06-02" },
  { id: "c2", name: "Sara Ibrahim", phone: "052 987 1234", email: "sara.ibrahim@gmail.com", location: "Khalifa City, Abu Dhabi", packageId: "pk3", classesRemaining: 4, joined: "2026-07-10" },
  { id: "c3", name: "Layla Haddad", phone: "056 445 8890", email: "layla.haddad@gmail.com", location: "Corniche, Abu Dhabi", packageId: "pk1", classesRemaining: 0, joined: "2026-08-01" },
  { id: "c4", name: "Noor Al Hashimi", phone: "054 221 7765", email: "noor.alhashimi@gmail.com", location: "Yas Island, Abu Dhabi", packageId: "pk3", classesRemaining: 7, joined: "2026-07-22" },
];

const seedClasses = [
  { id: "cl1", date: "2026-08-03", time: "07:00", trainerId: "t1", customerId: "c1", status: "completed" },
  { id: "cl2", date: "2026-08-03", time: "18:00", trainerId: "t2", customerId: "c2", status: "completed" },
  { id: "cl3", date: "2026-08-05", time: "07:00", trainerId: "t1", customerId: "c4", status: "completed" },
  { id: "cl4", date: "2026-08-06", time: "17:00", trainerId: "t2", customerId: "c3", status: "completed" },
  { id: "cl5", date: "2026-08-10", time: "07:00", trainerId: "t1", customerId: "c1", status: "completed" },
  { id: "cl6", date: "2026-08-12", time: "18:00", trainerId: "t2", customerId: "c2", status: "completed" },
  { id: "cl7", date: "2026-08-22", time: "07:00", trainerId: "t1", customerId: "c1", status: "scheduled" },
  { id: "cl8", date: "2026-08-26", time: "18:00", trainerId: "t2", customerId: "c4", status: "scheduled" },
];

const seedPayments = [
  { id: "p1", customerId: "c1", grossAmount: 900, discount: 0, amount: 900, date: "2026-08-01", note: "Monthly Unlimited" },
  { id: "p2", customerId: "c2", grossAmount: 1200, discount: 100, amount: 1100, date: "2026-07-10", note: "10-Class Pack" },
  { id: "p3", customerId: "c4", grossAmount: 1200, discount: 0, amount: 1200, date: "2026-07-22", note: "10-Class Pack" },
];

const uid = (p) => `${p}${Math.random().toString(36).slice(2, 8)}`;

const AED = (n) => `AED ${Number(n).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

// Builds a CSV file from rows of {label, value} pairs per column and triggers a browser
// download — works directly in Excel without needing any extra library.
const downloadCSV = (filename, headers, rows) => {
  const escape = (val) => {
    const s = val === null || val === undefined ? "" : String(val);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [headers.map(escape).join(","), ...rows.map((row) => row.map(escape).join(","))];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Unlimited packages don't have a per-class count, so a per-class price is estimated
// against this many classes/month for commission purposes.
const UNLIMITED_ASSUMED_CLASSES = 20;

// Group-class packages pay a flat commission regardless of monthly volume tier.
const GROUP_CLASS_COMMISSION_RATE = 0.1;

// The per-class price a given scheduled class is worth, based on the package the
// customer for that class is on — not a flat rate per trainer.
const classPrice = (cls, customers, packages) => {
  const customer = customers.find((c) => c.id === cls.customerId);
  const pkg = customer ? packages.find((p) => p.id === customer.packageId) : null;
  if (!pkg) return 0;
  return pkg.classes ? pkg.price / pkg.classes : pkg.price / UNLIMITED_ASSUMED_CLASSES;
};

// The package a class's customer is on, if any — used to check for group-class pricing.
const classPackage = (cls, customers, packages) => {
  const customer = customers.find((c) => c.id === cls.customerId);
  return customer ? packages.find((p) => p.id === customer.packageId) : null;
};

// Commission rate scales with how many classes a trainer completes in a given
// calendar month: 50 and below uses the trainer's own base rate (default 20%),
// 51–99 classes bumps to 30%, and 100+ classes bumps to 40%. Group classes are
// the one exception — they always pay the flat GROUP_CLASS_COMMISSION_RATE.
const commissionTierRate = (completedInMonth, baseRate) => {
  if (completedInMonth >= 100) return 0.4;
  if (completedInMonth > 50) return 0.3;
  return baseRate;
};

// Sums a trainer's commission across a set of classes. Classes are grouped by
// calendar month so the volume tier is evaluated per month (not across the
// whole date range); each class then pays out at the flat group rate if it's
// on a group-class package, or the month's volume-tier rate otherwise.
const trainerCommission = (trainer, classList, customers, packages) => {
  const completed = classList.filter((c) => c.trainerId === trainer.id && c.status === "completed");
  const byMonth = {};
  completed.forEach((c) => {
    const month = c.date.slice(0, 7);
    (byMonth[month] = byMonth[month] || []).push(c);
  });
  return Object.values(byMonth).reduce((total, monthClasses) => {
    const tierRate = commissionTierRate(monthClasses.length, trainer.commissionRate);
    return (
      total +
      monthClasses.reduce((s, c) => {
        const pkg = classPackage(c, customers, packages);
        const rate = pkg?.type === "group" ? GROUP_CLASS_COMMISSION_RATE : tierRate;
        return s + classPrice(c, customers, packages) * rate;
      }, 0)
    );
  }, 0);
};

// ---------- Shared bits ----------

function TopBar({ tab, setTab, userEmail }) {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "customers", label: "Customers", icon: Users },
    { id: "packages", label: "Packages", icon: PackageIcon },
    { id: "trainers", label: "Trainers", icon: UserRound },
    { id: "schedule", label: "Schedule", icon: CalendarDays },
    { id: "utilization", label: "Utilisation", icon: Activity },
    { id: "commission", label: "Commission", icon: CircleDollarSign },
  ];
  return (
    <div className="flex h-full flex-col justify-between bg-white text-green-900 border-r border-green-100">
      <div>
        <div className="px-6 pt-8 pb-6 border-b border-green-100">
          <div className="flex items-center gap-2 text-emerald-600">
            <Sparkles size={18} />
            <span className="text-xs tracking-[0.25em] uppercase">Studio Ops</span>
          </div>
          <h1 className="mt-1 font-serif text-2xl leading-tight">Click A Yoga</h1>
          <p className="text-xs text-green-600 mt-1">Abu Dhabi · Naturopathy-led practice</p>
        </div>
        <nav className="px-3 py-4 space-y-1">
          {items.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                tab === id ? "bg-green-500 text-green-900" : "text-green-700 hover:bg-green-50 hover:text-green-900"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>
      </div>
      <div className="px-6 py-5 border-t border-green-100 text-[11px] text-green-500">
        <div className="truncate mb-2">{userEmail}</div>
        <button onClick={() => supabase.auth.signOut()} className="text-green-600 hover:text-green-900 underline">
          Sign out
        </button>
      </div>
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-lg border border-green-100 shadow-sm ${className}`}>{children}</div>
  );
}

function SectionTitle({ eyebrow, title, action }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
      <div>
        {eyebrow && <div className="text-[11px] uppercase tracking-[0.2em] text-green-500 mb-1">{eyebrow}</div>}
        <h2 className="font-serif text-xl text-green-900">{title}</h2>
      </div>
      {action && <div className="shrink-0 w-full sm:w-auto">{action}</div>}
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg text-green-900">{title}</h3>
          <button onClick={onClose} className="text-green-600 hover:text-green-900">
            <X size={18} />
          </button>
        </div>
        {children}
      </Card>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block mb-3">
      <span className="block text-xs text-green-700 mb-1">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full border border-green-100 rounded-md px-3 py-2 text-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500";

// ---------- Commission ring (signature element) ----------

function CommissionRing({ pct, size = 96 }) {
  const clamped = Math.min(100, Math.round(pct * 100));
  return (
    <div
      className="rounded-full flex items-center justify-center"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(#3F8F5C ${clamped * 3.6}deg, #DCEFE2 0deg)`,
      }}
    >
      <div
        className="rounded-full bg-white flex items-center justify-center font-serif text-green-900"
        style={{ width: size - 18, height: size - 18 }}
      >
        {clamped}%
      </div>
    </div>
  );
}

// ---------- Tabs ----------

function PeriodSelector({ mode, setMode, month, setMonth, startDate, setStartDate, endDate, setEndDate }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex bg-green-50 rounded-md p-1">
        <button
          onClick={() => setMode("month")}
          className={`px-2.5 py-1.5 rounded text-xs ${mode === "month" ? "bg-white text-green-900 shadow-sm" : "text-green-600"}`}
        >
          Month
        </button>
        <button
          onClick={() => setMode("range")}
          className={`px-2.5 py-1.5 rounded text-xs ${mode === "range" ? "bg-white text-green-900 shadow-sm" : "text-green-600"}`}
        >
          Date range
        </button>
      </div>
      {mode === "month" ? (
        <input type="month" className={`${inputCls} w-auto`} value={month} onChange={(e) => setMonth(e.target.value)} />
      ) : (
        <div className="flex items-center gap-1.5">
          <input type="date" className={`${inputCls} w-auto`} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <span className="text-green-600 text-xs">to</span>
          <input type="date" className={`${inputCls} w-auto`} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
      )}
    </div>
  );
}

function Dashboard({ trainers, customers, classes, payments, packages }) {
  const [mode, setMode] = useState("month");
  const [month, setMonth] = useState("2026-08");
  const [startDate, setStartDate] = useState("2026-08-01");
  const [endDate, setEndDate] = useState("2026-08-31");

  const inPeriod = (dateStr) => (mode === "month" ? dateStr.startsWith(month) : dateStr >= startDate && dateStr <= endDate);

  const periodClasses = classes.filter((c) => inPeriod(c.date));
  const periodPayments = payments.filter((p) => inPeriod(p.date));

  const completedThisCycle = periodClasses.filter((c) => c.status === "completed").length;
  const scheduled = periodClasses.filter((c) => c.status === "scheduled").length;
  const revenue = periodPayments.reduce((s, p) => s + p.amount, 0);

  // Fee breakdown by package/note, for the selected period
  const feeMap = {};
  periodPayments.forEach((p) => {
    const key = p.note?.trim() || "Other";
    feeMap[key] = (feeMap[key] || 0) + p.amount;
  });
  const feeBreakdown = Object.entries(feeMap).sort((a, b) => b[1] - a[1]);

  const commissions = trainers.map((t) => {
    const completed = periodClasses.filter((c) => c.trainerId === t.id && c.status === "completed").length;
    const commissionEarned = trainerCommission(t, periodClasses, customers, packages);
    return {
      trainer: t,
      completed,
      commissionEarned,
      progress: t.monthlyTarget ? completed / t.monthlyTarget : 0,
    };
  });
  const totalCommission = commissions.reduce((s, c) => s + c.commissionEarned, 0);

  const stats = [
    { label: "Active customers", value: customers.length },
    { label: "Classes completed", value: completedThisCycle },
    { label: "Classes scheduled", value: scheduled },
    { label: "Revenue collected in fees", value: AED(revenue) },
  ];

  return (
    <div>
      <SectionTitle
        eyebrow="Period"
        title="Studio overview"
        action={
          <PeriodSelector
            mode={mode}
            setMode={setMode}
            month={month}
            setMonth={setMonth}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        }
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Card key={s.label} className="p-4">
            <div className="text-[11px] uppercase tracking-wide text-green-600">{s.label}</div>
            <div className="text-2xl font-serif text-green-900 mt-1">{s.value}</div>
          </Card>
        ))}
      </div>

      <SectionTitle eyebrow="Fees" title="Revenue collected by package" />
      <Card className="p-5 mb-8">
        {feeBreakdown.length ? (
          <div className="space-y-2">
            {feeBreakdown.map(([label, amount]) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <span className="text-green-700">{label}</span>
                <span className="font-medium text-green-900">{AED(amount)}</span>
              </div>
            ))}
            <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-2 mt-2">
              <span className="font-medium text-green-900">Total</span>
              <span className="font-serif text-lg text-green-900">{AED(revenue)}</span>
            </div>
          </div>
        ) : (
          <div className="text-sm text-green-600">No payments logged for this period.</div>
        )}
      </Card>

      <SectionTitle eyebrow="Payroll" title="Trainer commission — selected period" />
      <div className="grid md:grid-cols-2 gap-4">
        {commissions.map((c) => (
          <Card key={c.trainer.id} className="p-5 flex items-center gap-5">
            <CommissionRing pct={c.progress} />
            <div className="flex-1">
              <div className="font-medium text-green-900">{c.trainer.name}</div>
              <div className="text-xs text-green-600 mb-2">{c.completed} of {c.trainer.monthlyTarget} classes</div>
              <div className="text-lg font-serif text-green-900">{AED(c.commissionEarned)}</div>
              <div className="text-[11px] text-green-600">commission only — base pay excluded</div>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-4 text-sm text-green-700">
        Total commission payout for selected period: <span className="font-medium text-green-900">{AED(totalCommission)}</span>
      </div>
    </div>
  );
}

function Customers({ customers, setCustomers, packages, payments, setPayments }) {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [source, setSource] = useState("new"); // "new" or "existing" — only relevant while adding
  const [existingPersonKey, setExistingPersonKey] = useState("");
  const blankForm = { name: "", phone: "", email: "", location: "", packageId: packages[0]?.id, classesRemaining: packages[0]?.classes ?? "—", discount: 0 };
  const [form, setForm] = useState(blankForm);

  const packageName = (id) => packages.find((p) => p.id === id)?.name || "—";
  const selectedPackage = packages.find((p) => p.id === form.packageId);
  const grossForForm = selectedPackage?.price || 0;
  const finalForForm = Math.max(0, grossForForm - (Number(form.discount) || 0));

  // One entry per distinct person (by name), using their most recent contact details —
  // powers the "existing customer" picker so a renewal doesn't need retyping.
  const people = {};
  customers.forEach((c) => { people[c.name] = c; });
  const uniquePeople = Object.values(people).sort((a, b) => a.name.localeCompare(b.name));

  const pickPackage = (id) => {
    const pkg = packages.find((p) => p.id === id);
    setForm({ ...form, packageId: id, classesRemaining: pkg?.classes ?? "—" });
  };

  const pickExistingPerson = (name) => {
    setExistingPersonKey(name);
    const p = people[name];
    if (!p) return;
    setForm({ ...form, name: p.name, phone: p.phone, email: p.email || "", location: p.location || "" });
  };

  const startAdd = () => {
    setEditingId(null);
    setSource(uniquePeople.length ? "existing" : "new");
    setExistingPersonKey("");
    setForm(blankForm);
    setOpen(true);
  };

  // Edits this exact line item in place — corrects a mistake, doesn't create a new row.
  // Pulls the discount from that row's existing payment, if one was already generated.
  const startEdit = (c) => {
    setEditingId(c.id);
    const existingPayment = payments.find((p) => p.customerId === c.id);
    setForm({
      name: c.name,
      phone: c.phone,
      email: c.email || "",
      location: c.location || "",
      packageId: c.packageId,
      classesRemaining: c.classesRemaining,
      discount: existingPayment?.discount || 0,
    });
    setOpen(true);
  };

  // Pre-fills contact details from an existing customer but always saves as a brand-new
  // line item — for when the same person takes another package.
  const startNewPackage = (c) => {
    setEditingId(null);
    setSource("existing");
    setExistingPersonKey(c.name);
    setForm({ name: c.name, phone: c.phone, email: c.email || "", location: c.location || "", packageId: packages[0]?.id, classesRemaining: packages[0]?.classes ?? "—", discount: 0 });
    setOpen(true);
  };

  // Saving a customer automatically generates (or updates) the matching payment record
  // from the selected package's price, minus whatever discount was entered here — no
  // separate "log payment" step needed.
  const submit = () => {
    if (!form.name) return;
    const { discount, ...customerFields } = form;
    const pkg = packages.find((p) => p.id === form.packageId);
    const gross = pkg?.price || 0;
    const discountAmount = Number(discount) || 0;
    const finalAmount = Math.max(0, gross - discountAmount);

    if (editingId) {
      setCustomers((cs) => cs.map((c) => (c.id === editingId ? { ...c, ...customerFields } : c)));
      setPayments((ps) => {
        const exists = ps.some((p) => p.customerId === editingId);
        if (exists) {
          return ps.map((p) =>
            p.customerId === editingId
              ? { ...p, note: pkg?.name || p.note, grossAmount: gross, discount: discountAmount, amount: finalAmount }
              : p
          );
        }
        return [...ps, { id: uid("p"), date: new Date().toISOString().slice(0, 10), customerId: editingId, note: pkg?.name || "", grossAmount: gross, discount: discountAmount, amount: finalAmount }];
      });
    } else {
      const newId = uid("c");
      setCustomers((cs) => [...cs, { id: newId, joined: new Date().toISOString().slice(0, 10), ...customerFields }]);
      setPayments((ps) => [
        ...ps,
        { id: uid("p"), date: new Date().toISOString().slice(0, 10), customerId: newId, note: pkg?.name || "", grossAmount: gross, discount: discountAmount, amount: finalAmount },
      ]);
    }
    setForm(blankForm);
    setOpen(false);
  };

  // Removing a customer line item also removes its generated payment, keeping the ledger clean.
  const removeCustomer = (id) => {
    setCustomers((cs) => cs.filter((c) => c.id !== id));
    setPayments((ps) => ps.filter((p) => p.customerId !== id));
  };

  const [joinedFrom, setJoinedFrom] = useState("");
  const [joinedTo, setJoinedTo] = useState("");

  const sorted = [...customers]
    .filter((c) => (!joinedFrom || c.joined >= joinedFrom) && (!joinedTo || c.joined <= joinedTo))
    .sort((a, b) => a.name.localeCompare(b.name) || a.joined.localeCompare(b.joined));

  const isFiltered = joinedFrom || joinedTo;
  const clearJoinedFilter = () => { setJoinedFrom(""); setJoinedTo(""); };

  const exportCustomersCSV = () => {
    downloadCSV(
      `click-a-yoga-customers-${new Date().toISOString().slice(0, 10)}.csv`,
      ["Name", "Phone", "Email", "Location", "Package", "Classes Remaining", "Joined"],
      sorted.map((c) => [c.name, c.phone, c.email || "", c.location || "", packageName(c.packageId), c.classesRemaining, c.joined])
    );
  };

  const nameOf = (id) => customers.find((c) => c.id === id)?.name || "—";
  const removePayment = (id) => setPayments((ps) => ps.filter((p) => p.id !== id));
  const sortedPayments = [...payments].sort((a, b) => b.date.localeCompare(a.date));

  const exportPaymentsCSV = () => {
    downloadCSV(
      `click-a-yoga-payments-${new Date().toISOString().slice(0, 10)}.csv`,
      ["Customer", "Package/Note", "Gross Amount", "Discount", "Amount Collected", "Date"],
      sortedPayments.map((p) => [nameOf(p.customerId), p.note, p.grossAmount ?? p.amount, p.discount || 0, p.amount, p.date])
    );
  };

  return (
    <div>
      <SectionTitle
        eyebrow="Members"
        title="Customers"
        action={
          <div className="flex items-center gap-2">
            <button
              onClick={exportCustomersCSV}
              className="flex items-center gap-1.5 text-green-700 text-sm px-3 py-2 rounded-md border border-green-100 hover:bg-green-50"
              title="Download customer list as Excel/CSV"
            >
              <Download size={14} /> Export
            </button>
            <button
              onClick={startAdd}
              className="flex items-center gap-1.5 bg-green-700 text-white text-sm px-3 py-2 rounded-md hover:bg-green-800"
            >
              <Plus size={14} /> Add customer
            </button>
          </div>
        }
      />
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs text-green-600">Joined between</span>
        <input type="date" className={`${inputCls} w-auto`} value={joinedFrom} onChange={(e) => setJoinedFrom(e.target.value)} />
        <span className="text-xs text-green-600">and</span>
        <input type="date" className={`${inputCls} w-auto`} value={joinedTo} onChange={(e) => setJoinedTo(e.target.value)} />
        {isFiltered && (
          <button onClick={clearJoinedFilter} className="flex items-center gap-1 text-xs text-green-600 hover:text-green-900 underline">
            <X size={12} /> Clear
          </button>
        )}
        {isFiltered && <span className="text-xs text-green-600">({sorted.length} match{sorted.length === 1 ? "" : "es"})</span>}
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[920px]">
          <thead className="bg-green-50 text-green-700 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Phone</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Location</th>
              <th className="text-left px-4 py-3">Package</th>
              <th className="text-left px-4 py-3">Remaining</th>
              <th className="text-left px-4 py-3">Joined</th>
              <th className="text-left px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c) => (
              <tr key={c.id} className="border-t border-gray-100">
                <td className="px-4 py-3 text-green-900 font-medium whitespace-nowrap">{c.name}</td>
                <td className="px-4 py-3 text-green-700 whitespace-nowrap"><span className="flex items-center gap-1"><Phone size={12} />{c.phone}</span></td>
                <td className="px-4 py-3 text-green-700 whitespace-nowrap">{c.email || "—"}</td>
                <td className="px-4 py-3 text-green-700 whitespace-nowrap">{c.location || "—"}</td>
                <td className="px-4 py-3 text-green-700 whitespace-nowrap">{packageName(c.packageId)}</td>
                <td className="px-4 py-3 text-green-700">{c.classesRemaining}</td>
                <td className="px-4 py-3 text-green-700 whitespace-nowrap">{c.joined}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <button onClick={() => startNewPackage(c)} className="text-green-500 hover:text-green-700" title="New package for this customer">
                      <RefreshCw size={15} />
                    </button>
                    <button onClick={() => startEdit(c)} className="text-green-600 hover:text-green-900" title="Edit this line item">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => removeCustomer(c.id)} className="text-green-600 hover:text-red-500" title="Delete this line item">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </Card>

      {open && (
        <Modal title={editingId ? "Edit customer" : "Add customer"} onClose={() => setOpen(false)}>
          {!editingId && (
            <Field label="This line item is for">
              <div className="flex bg-green-50 rounded-md p-1 mb-1">
                <button
                  onClick={() => setSource("new")}
                  className={`flex-1 px-2.5 py-1.5 rounded text-xs ${source === "new" ? "bg-white text-green-900 shadow-sm" : "text-green-600"}`}
                >
                  New customer
                </button>
                <button
                  onClick={() => setSource("existing")}
                  disabled={!uniquePeople.length}
                  className={`flex-1 px-2.5 py-1.5 rounded text-xs disabled:opacity-40 ${source === "existing" ? "bg-white text-green-900 shadow-sm" : "text-green-600"}`}
                >
                  Existing customer
                </button>
              </div>
            </Field>
          )}

          {!editingId && source === "existing" && (
            <Field label="Select customer">
              <select className={inputCls} value={existingPersonKey} onChange={(e) => pickExistingPerson(e.target.value)}>
                <option value="" disabled>Choose a customer…</option>
                {uniquePeople.map((p) => (
                  <option key={p.name} value={p.name}>{p.name} — {p.phone}</option>
                ))}
              </select>
            </Field>
          )}

          <Field label="Full name">
            <input
              className={inputCls}
              value={form.name}
              disabled={!editingId && source === "existing"}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Field>
          <Field label="Phone">
            <input
              className={inputCls}
              value={form.phone}
              disabled={!editingId && source === "existing"}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              className={inputCls}
              value={form.email}
              disabled={!editingId && source === "existing"}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="name@example.com"
            />
          </Field>
          <Field label="Location">
            <input
              className={inputCls}
              value={form.location}
              disabled={!editingId && source === "existing"}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="e.g. Al Reem Island, Abu Dhabi"
            />
          </Field>
          <Field label="Package">
            <select className={inputCls} value={form.packageId} onChange={(e) => pickPackage(e.target.value)}>
              {packages.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {AED(p.price)}{p.classes ? ` (${p.classes} classes)` : ""}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Classes remaining">
            <input
              type={form.classesRemaining === "—" ? "text" : "number"}
              className={inputCls}
              value={form.classesRemaining}
              onChange={(e) => setForm({ ...form, classesRemaining: e.target.value === "—" ? e.target.value : Number(e.target.value) })}
            />
          </Field>
          <Field label="Discount (AED, optional)">
            <input type="number" className={inputCls} value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} />
          </Field>
          <div className="flex items-center justify-between text-sm bg-green-50 text-green-700 rounded-md px-3 py-2 mb-3">
            <span>Amount to collect ({selectedPackage?.name || "package"})</span>
            <span className="font-medium text-green-900">{AED(finalForForm)}</span>
          </div>
          <button onClick={submit} className="w-full bg-green-500 text-white rounded-md py-2 text-sm mt-2 hover:bg-green-600">
            {editingId ? "Save changes" : "Save customer"}
          </button>
        </Modal>
      )}

      <div className="mt-8">
        <SectionTitle
          eyebrow="Ledger"
          title="Customer payments"
          action={
            <button
              onClick={exportPaymentsCSV}
              className="flex items-center gap-1.5 text-green-700 text-sm px-3 py-2 rounded-md border border-green-100 hover:bg-green-50"
              title="Download payment ledger as Excel/CSV"
            >
              <Download size={14} /> Export
            </button>
          }
        />
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-green-50 text-green-700 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3">Customer</th>
                <th className="text-left px-4 py-3">Package/Note</th>
                <th className="text-left px-4 py-3">Discount</th>
                <th className="text-left px-4 py-3">Amount collected</th>
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-left px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {sortedPayments.map((p) => (
                <tr key={p.id} className="border-t border-gray-100">
                  <td className="px-4 py-3 text-green-900 font-medium whitespace-nowrap">{nameOf(p.customerId)}</td>
                  <td className="px-4 py-3 text-green-700 whitespace-nowrap">{p.note}</td>
                  <td className="px-4 py-3 text-green-700 whitespace-nowrap">{p.discount ? AED(p.discount) : "—"}</td>
                  <td className="px-4 py-3 text-green-700 flex items-center gap-1 whitespace-nowrap"><Wallet size={12} />{AED(p.amount)}</td>
                  <td className="px-4 py-3 text-green-700 whitespace-nowrap">{p.date}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => removePayment(p.id)} className="text-green-600 hover:text-red-500" title="Delete payment">
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </Card>
      </div>

    </div>
  );
}

function Trainers({ trainers, setTrainers }) {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const blankForm = { name: "", cred: "", baseSalary: 2000, commissionRate: 0.2, monthlyTarget: 130 };
  const [form, setForm] = useState(blankForm);

  const startAdd = () => {
    setEditingId(null);
    setForm(blankForm);
    setOpen(true);
  };

  const startEdit = (t) => {
    setEditingId(t.id);
    setForm({ name: t.name, cred: t.cred, baseSalary: t.baseSalary, commissionRate: t.commissionRate, monthlyTarget: t.monthlyTarget });
    setOpen(true);
  };

  const submit = () => {
    if (!form.name) return;
    if (editingId) {
      setTrainers((ts) => ts.map((t) => (t.id === editingId ? { ...t, ...form } : t)));
    } else {
      setTrainers((ts) => [...ts, { id: uid("t"), ...form }]);
    }
    setForm(blankForm);
    setOpen(false);
  };

  const removeTrainer = (id) => setTrainers((ts) => ts.filter((t) => t.id !== id));

  return (
    <div>
      <SectionTitle
        eyebrow="Instructors"
        title="Trainers"
        action={
          <button onClick={startAdd} className="flex items-center gap-1.5 bg-green-700 text-white text-sm px-3 py-2 rounded-md hover:bg-green-800">
            <Plus size={14} /> Add trainer
          </button>
        }
      />
      <div className="grid md:grid-cols-2 gap-4">
        {trainers.map((t) => (
          <Card key={t.id} className="p-5">
            <div className="flex items-center justify-between mb-1">
              <div className="font-medium text-green-900">{t.name}</div>
              <div className="flex items-center gap-2.5">
                <button onClick={() => startEdit(t)} className="text-green-600 hover:text-green-900" title="Edit trainer">
                  <Pencil size={14} />
                </button>
                <button onClick={() => removeTrainer(t.id)} className="text-green-600 hover:text-red-500" title="Delete trainer">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="text-xs text-green-600 mb-3">{t.cred}</div>
            <div className="grid grid-cols-2 gap-y-1 text-sm text-green-700">
              <span>Base salary</span><span className="text-green-900">{AED(t.baseSalary)}/mo</span>
              <span>Base commission</span><span className="text-green-900">{Math.round(t.commissionRate * 100)}% (≤50/mo) · 30% (51–99) · 40% (100+)</span>
              <span>Monthly target</span><span className="text-green-900">{t.monthlyTarget} classes</span>
            </div>
            <div className="text-[11px] text-green-600 mt-2">Group-class packages always pay a flat 10%, regardless of volume.</div>
          </Card>
        ))}
      </div>

      {open && (
        <Modal title={editingId ? "Edit trainer" : "Add trainer"} onClose={() => setOpen(false)}>
          <Field label="Full name">
            <input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="Credential">
            <input className={inputCls} value={form.cred} onChange={(e) => setForm({ ...form, cred: e.target.value })} />
          </Field>
          <Field label="Base salary (AED/month)">
            <input type="number" className={inputCls} value={form.baseSalary} onChange={(e) => setForm({ ...form, baseSalary: Number(e.target.value) })} />
          </Field>
          <Field label="Base commission rate (% — applies at 50 classes/month or fewer)">
            <input type="number" className={inputCls} value={form.commissionRate * 100} onChange={(e) => setForm({ ...form, commissionRate: Number(e.target.value) / 100 })} />
          </Field>
          <Field label="Monthly target (classes)">
            <input type="number" className={inputCls} value={form.monthlyTarget} onChange={(e) => setForm({ ...form, monthlyTarget: Number(e.target.value) })} />
          </Field>
          <button onClick={submit} className="w-full bg-green-500 text-white rounded-md py-2 text-sm mt-2 hover:bg-green-600">
            {editingId ? "Save changes" : "Save trainer"}
          </button>
        </Modal>
      )}
    </div>
  );
}

function Packages({ packages, setPackages }) {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const blankForm = { name: "", classes: 10, price: 1000, unlimited: false, type: "private" };
  const [form, setForm] = useState(blankForm);

  const startAdd = () => {
    setEditingId(null);
    setForm(blankForm);
    setOpen(true);
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setForm({ name: p.name, classes: p.classes ?? 10, price: p.price, unlimited: p.classes === null, type: p.type || "private" });
    setOpen(true);
  };

  const submit = () => {
    if (!form.name) return;
    const payload = { name: form.name, price: Number(form.price), classes: form.unlimited ? null : Number(form.classes), type: form.type };
    if (editingId) {
      setPackages((ps) => ps.map((p) => (p.id === editingId ? { ...p, ...payload } : p)));
    } else {
      setPackages((ps) => [...ps, { id: uid("pk"), ...payload }]);
    }
    setForm(blankForm);
    setOpen(false);
  };

  const removePackage = (id) => setPackages((ps) => ps.filter((p) => p.id !== id));

  return (
    <div>
      <SectionTitle
        eyebrow="Pricing"
        title="Packages"
        action={
          <button onClick={startAdd} className="flex items-center gap-1.5 bg-green-700 text-white text-sm px-3 py-2 rounded-md hover:bg-green-800">
            <Plus size={14} /> Add package
          </button>
        }
      />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {packages.map((p) => (
          <Card key={p.id} className="p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-green-500">
                <PackageIcon size={16} />
                <span className="text-[11px] uppercase tracking-wide">{p.classes ? `${p.classes} classes` : "Unlimited"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <button onClick={() => startEdit(p)} className="text-green-600 hover:text-green-900" title="Edit package">
                  <Pencil size={14} />
                </button>
                <button onClick={() => removePackage(p.id)} className="text-green-600 hover:text-red-500" title="Delete package">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="font-medium text-green-900">{p.name}</div>
            {p.type === "group" && (
              <span className="inline-block text-[10px] uppercase tracking-wide bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1">
                Group class · 10% commission
              </span>
            )}
            <div className="font-serif text-2xl text-green-900 mt-1">{AED(p.price)}</div>
            {p.classes ? (
              <div className="text-xs text-green-600 mt-1">{AED(Math.round(p.price / p.classes))} per class</div>
            ) : (
              <div className="text-xs text-green-600 mt-1">per month</div>
            )}
          </Card>
        ))}
      </div>

      {open && (
        <Modal title={editingId ? "Edit package" : "Add package"} onClose={() => setOpen(false)}>
          <Field label="Package name">
            <input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. 15-Class Pack" />
          </Field>
          <Field label="Class count">
            <select
              className={inputCls}
              value={form.unlimited ? "unlimited" : "fixed"}
              onChange={(e) => setForm({ ...form, unlimited: e.target.value === "unlimited" })}
            >
              <option value="fixed">Fixed number of classes</option>
              <option value="unlimited">Unlimited (monthly)</option>
            </select>
          </Field>
          {!form.unlimited && (
            <Field label="Number of classes">
              <input type="number" className={inputCls} value={form.classes} onChange={(e) => setForm({ ...form, classes: e.target.value })} />
            </Field>
          )}
          <Field label="Price (AED)">
            <input type="number" className={inputCls} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          </Field>
          <Field label="Class type">
            <select className={inputCls} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="private">Private (trainer's tiered commission)</option>
              <option value="group">Group (flat 10% commission)</option>
            </select>
          </Field>
          <button onClick={submit} className="w-full bg-green-500 text-white rounded-md py-2 text-sm mt-2 hover:bg-green-600">
            {editingId ? "Save changes" : "Save package"}
          </button>
        </Modal>
      )}
    </div>
  );
}

function Schedule({ classes, setClasses, trainers, customers, packages }) {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const blankForm = { date: "2026-08-27", time: "07:00", trainerId: trainers[0]?.id, customerId: customers[0]?.id };
  const [form, setForm] = useState(blankForm);
  const [view, setView] = useState("list");
  const [sortDir, setSortDir] = useState("asc");
  const [viewMonth, setViewMonth] = useState({ year: 2026, month: 7 }); // August 2026, 0-indexed
  const [weekStart, setWeekStart] = useState("2026-08-24"); // a Monday
  const [dayDate, setDayDate] = useState("2026-08-27");
  const [customerFilter, setCustomerFilter] = useState("");

  const nameOf = (list, id) => list.find((x) => x.id === id)?.name || "—";
  const locationOf = (customerId) => customers.find((c) => c.id === customerId)?.location || "—";
  const firstName = (name) => name.replace(/^Dr\.\s*/i, "").split(" ")[0];

  const filteredClasses = customerFilter.trim()
    ? classes.filter((c) => nameOf(customers, c.customerId).toLowerCase().includes(customerFilter.trim().toLowerCase()))
    : classes;

  const exportSessionsCSV = () => {
    const rows = [...filteredClasses]
      .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
      .map((c) => [c.date, c.time, nameOf(trainers, c.trainerId), nameOf(customers, c.customerId), locationOf(c.customerId), c.status]);
    downloadCSV(
      `click-a-yoga-sessions-${new Date().toISOString().slice(0, 10)}.csv`,
      ["Date", "Time", "Trainer", "Customer", "Location", "Status"],
      rows
    );
  };

  const startAdd = (presetDate) => {
    setEditingId(null);
    setForm(presetDate ? { ...blankForm, date: presetDate } : blankForm);
    setOpen(true);
  };

  const startEdit = (c) => {
    setEditingId(c.id);
    setForm({ date: c.date, time: c.time, trainerId: c.trainerId, customerId: c.customerId });
    setOpen(true);
  };

  const submit = () => {
    if (editingId) {
      setClasses((cs) => cs.map((c) => (c.id === editingId ? { ...c, ...form } : c)));
    } else {
      setClasses((cs) => [...cs, { id: uid("cl"), status: "scheduled", ...form }]);
    }
    setOpen(false);
  };

  const removeClass = (id) => setClasses((cs) => cs.filter((c) => c.id !== id));

  const toggleComplete = (id) =>
    setClasses((cs) => cs.map((c) => (c.id === id ? { ...c, status: c.status === "completed" ? "scheduled" : "completed" } : c)));

  const sorted = [...filteredClasses].sort((a, b) => {
    const cmp = (a.date + a.time).localeCompare(b.date + b.time);
    return sortDir === "asc" ? cmp : -cmp;
  });

  // ----- Calendar month grid -----
  const monthLabel = new Date(viewMonth.year, viewMonth.month, 1).toLocaleString("en-US", { month: "long", year: "numeric" });
  const shiftMonth = (delta) => {
    const d = new Date(viewMonth.year, viewMonth.month + delta, 1);
    setViewMonth({ year: d.getFullYear(), month: d.getMonth() });
  };
  const pad = (n) => String(n).padStart(2, "0");
  const daysInMonth = new Date(viewMonth.year, viewMonth.month + 1, 0).getDate();
  const startWeekday = (new Date(viewMonth.year, viewMonth.month, 1).getDay() + 6) % 7; // Monday-first
  const cells = [...Array(startWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);
  const classesByDate = {};
  filteredClasses.forEach((c) => {
    (classesByDate[c.date] = classesByDate[c.date] || []).push(c);
  });
  Object.values(classesByDate).forEach((list) => list.sort((a, b) => a.time.localeCompare(b.time)));

  // ----- Calendar week grid -----
  const addDays = (dateStr, n) => {
    const d = new Date(`${dateStr}T00:00:00`);
    d.setDate(d.getDate() + n);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };
  const shiftWeek = (delta) => setWeekStart((ws) => addDays(ws, delta * 7));
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const weekEnd = weekDates[6];
  const formatShort = (dateStr) => new Date(`${dateStr}T00:00:00`).toLocaleString("en-US", { month: "short", day: "numeric" });
  const weekLabel = `${formatShort(weekStart)} – ${formatShort(weekEnd)}, ${weekStart.slice(0, 4)}`;

  // ----- Calendar day view -----
  const shiftDay = (delta) => setDayDate((d) => addDays(d, delta));
  const dayLabelFull = new Date(`${dayDate}T00:00:00`).toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const dayClassesSorted = (classesByDate[dayDate] || []);

  return (
    <div>
      <SectionTitle
        eyebrow="Calendar"
        title="Schedule"
        action={
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
            <div className="flex bg-green-50 rounded-md p-1 overflow-x-auto">
              <button
                onClick={() => setView("list")}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded text-xs whitespace-nowrap ${view === "list" ? "bg-white text-green-900 shadow-sm" : "text-green-600"}`}
              >
                <List size={13} /> List
              </button>
              <button
                onClick={() => setView("day")}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded text-xs whitespace-nowrap ${view === "day" ? "bg-white text-green-900 shadow-sm" : "text-green-600"}`}
              >
                <CalendarDays size={13} /> Day
              </button>
              <button
                onClick={() => setView("week")}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded text-xs whitespace-nowrap ${view === "week" ? "bg-white text-green-900 shadow-sm" : "text-green-600"}`}
              >
                <CalendarDays size={13} /> Week
              </button>
              <button
                onClick={() => setView("month")}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded text-xs whitespace-nowrap ${view === "month" ? "bg-white text-green-900 shadow-sm" : "text-green-600"}`}
              >
                <Grid3x3 size={13} /> Month
              </button>
            </div>
            <div className="flex items-center gap-2">
              {view === "list" && (
                <button
                  onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs whitespace-nowrap text-green-700 border border-green-100 hover:bg-green-50"
                  title="Toggle sort order"
                >
                  <ArrowUpDown size={13} /> {sortDir === "asc" ? "Oldest first" : "Newest first"}
                </button>
              )}
              <button
                onClick={exportSessionsCSV}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs whitespace-nowrap text-green-700 border border-green-100 hover:bg-green-50"
                title="Download sessions as Excel/CSV"
              >
                <Download size={13} /> Export
              </button>
              <button
                onClick={() => startAdd()}
                className="flex items-center justify-center gap-1.5 bg-green-700 text-white text-sm px-3 py-2 rounded-md hover:bg-green-800 whitespace-nowrap flex-1 sm:flex-none"
              >
                <Plus size={14} /> Add class
              </button>
            </div>
          </div>
        }
      />

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-green-500" />
          <input
            type="text"
            value={customerFilter}
            onChange={(e) => setCustomerFilter(e.target.value)}
            placeholder="Filter by customer name…"
            className={`${inputCls} w-auto pl-8`}
          />
        </div>
        {customerFilter && (
          <button onClick={() => setCustomerFilter("")} className="flex items-center gap-1 text-xs text-green-600 hover:text-green-900 underline">
            <X size={12} /> Clear
          </button>
        )}
        {customerFilter && <span className="text-xs text-green-600">({filteredClasses.length} session{filteredClasses.length === 1 ? "" : "s"})</span>}
      </div>

      {view === "list" && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[760px]">
            <thead className="bg-green-50 text-green-700 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-left px-4 py-3">Time</th>
                <th className="text-left px-4 py-3">Trainer</th>
                <th className="text-left px-4 py-3">Customer</th>
                <th className="text-left px-4 py-3">Location</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((c) => (
                <tr key={c.id} className="border-t border-gray-100">
                  <td className="px-4 py-3 text-green-900">{c.date}</td>
                  <td className="px-4 py-3 text-green-700">{c.time}</td>
                  <td className="px-4 py-3 text-green-700">{nameOf(trainers, c.trainerId)}</td>
                  <td className="px-4 py-3 text-green-700">{nameOf(customers, c.customerId)}</td>
                  <td className="px-4 py-3 text-green-700">{locationOf(c.customerId)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${c.status === "completed" ? "bg-green-100 text-green-700" : "bg-green-50 text-green-600"}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button onClick={() => toggleComplete(c.id)} className="text-green-500 hover:text-green-700" title="Toggle completed">
                        <Check size={16} />
                      </button>
                      <button onClick={() => startEdit(c)} className="text-green-600 hover:text-green-900" title="Edit session">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => removeClass(c.id)} className="text-green-600 hover:text-red-500" title="Delete session">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </Card>
      )}

      {view === "day" && (
        <Card className="p-4 md:p-5">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => shiftDay(-1)} className="p-1.5 rounded-md text-green-600 hover:bg-green-50 hover:text-green-900">
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-3">
              <div className="font-serif text-lg text-green-900">{dayLabelFull}</div>
              <button onClick={() => startAdd(dayDate)} className="flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md hover:bg-green-100" title="Add class on this day">
                <Plus size={12} /> Add
              </button>
            </div>
            <button onClick={() => shiftDay(1)} className="p-1.5 rounded-md text-green-600 hover:bg-green-50 hover:text-green-900">
              <ChevronRight size={18} />
            </button>
          </div>
          {dayClassesSorted.length === 0 ? (
            <div className="text-sm text-green-600 py-6 text-center">No classes scheduled for this day.</div>
          ) : (
            <div className="space-y-2">
              {dayClassesSorted.map((c) => (
                <div key={c.id} className="flex items-center justify-between rounded-md border border-gray-100 px-3 py-2.5">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-medium text-green-900 w-14">{c.time}</span>
                    <div className="text-sm text-green-700">
                      <span className="text-green-900">{nameOf(trainers, c.trainerId)}</span> · {nameOf(customers, c.customerId)}
                    </div>
                    <span className="flex items-center gap-1 text-xs text-green-600">
                      <MapPin size={12} /> {locationOf(c.customerId)}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${c.status === "completed" ? "bg-green-100 text-green-700" : "bg-green-50 text-green-600"}`}>
                      {c.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => toggleComplete(c.id)} className="text-green-500 hover:text-green-700" title="Toggle completed">
                      <Check size={16} />
                    </button>
                    <button onClick={() => startEdit(c)} className="text-green-600 hover:text-green-900" title="Edit session">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => removeClass(c.id)} className="text-green-600 hover:text-red-500" title="Delete session">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {view === "week" && (
        <Card className="p-4 md:p-5">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => shiftWeek(-1)} className="p-1.5 rounded-md text-green-600 hover:bg-green-50 hover:text-green-900">
              <ChevronLeft size={18} />
            </button>
            <div className="font-serif text-lg text-green-900">{weekLabel}</div>
            <button onClick={() => shiftWeek(1)} className="p-1.5 rounded-md text-green-600 hover:bg-green-50 hover:text-green-900">
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-7 gap-2">
            {weekDates.map((dateStr) => {
              const dayClasses = classesByDate[dateStr] || [];
              const dayLabel = new Date(`${dateStr}T00:00:00`).toLocaleString("en-US", { weekday: "short", day: "numeric" });
              return (
                <div key={dateStr} className="rounded-md border border-gray-100 p-2 min-h-[160px] flex flex-col">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-green-900">{dayLabel}</span>
                    <button onClick={() => startAdd(dateStr)} className="text-green-600 hover:text-green-700" title="Add class on this day">
                      <Plus size={13} />
                    </button>
                  </div>
                  <div className="space-y-1 overflow-y-auto">
                    {dayClasses.length === 0 && <div className="text-[11px] text-green-600/60">No classes</div>}
                    {dayClasses.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => startEdit(c)}
                        className={`w-full text-left text-[11px] leading-tight px-1.5 py-1 rounded ${
                          c.status === "completed" ? "bg-green-100 text-green-700" : "bg-green-50 text-green-700"
                        }`}
                        title={`${nameOf(trainers, c.trainerId)} · ${nameOf(customers, c.customerId)} · ${locationOf(c.customerId)}`}
                      >
                        <div className="font-medium">{c.time} {firstName(nameOf(trainers, c.trainerId))}</div>
                        <div className="truncate">{nameOf(customers, c.customerId)}</div>
                        <div className="truncate opacity-70">{locationOf(c.customerId)}</div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {view === "month" && (
        <Card className="p-4 md:p-5">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => shiftMonth(-1)} className="p-1.5 rounded-md text-green-600 hover:bg-green-50 hover:text-green-900">
              <ChevronLeft size={18} />
            </button>
            <div className="font-serif text-lg text-green-900">{monthLabel}</div>
            <button onClick={() => shiftMonth(1)} className="p-1.5 rounded-md text-green-600 hover:bg-green-50 hover:text-green-900">
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1.5 mb-1.5">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div key={d} className="text-center text-[10px] uppercase tracking-wide text-green-600 py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {cells.map((day, i) => {
              if (!day) return <div key={i} className="min-h-[92px]" />;
              const dateStr = `${viewMonth.year}-${pad(viewMonth.month + 1)}-${pad(day)}`;
              const dayClasses = classesByDate[dateStr] || [];
              return (
                <div key={i} className="min-h-[92px] rounded-md border border-gray-100 p-1.5 flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-green-600">{day}</span>
                    <button onClick={() => startAdd(dateStr)} className="text-green-600 hover:text-green-700" title="Add class on this day">
                      <Plus size={12} />
                    </button>
                  </div>
                  <div className="mt-1 space-y-1 overflow-y-auto">
                    {dayClasses.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => startEdit(c)}
                        className={`w-full text-left text-[10px] leading-tight px-1.5 py-1 rounded ${
                          c.status === "completed" ? "bg-green-100 text-green-700" : "bg-green-50 text-green-700"
                        }`}
                        title={`${nameOf(trainers, c.trainerId)} · ${nameOf(customers, c.customerId)} · ${locationOf(c.customerId)}`}
                      >
                        <div className="truncate font-medium">{c.time} {firstName(nameOf(trainers, c.trainerId))}</div>
                        <div className="truncate opacity-70">{locationOf(c.customerId)}</div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {open && (
        <Modal title={editingId ? "Edit session" : "Add class"} onClose={() => setOpen(false)}>
          <Field label="Date">
            <input type="date" className={inputCls} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </Field>
          <Field label="Time">
            <input type="time" className={inputCls} value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
          </Field>
          <Field label="Trainer">
            <select className={inputCls} value={form.trainerId} onChange={(e) => setForm({ ...form, trainerId: e.target.value })}>
              {trainers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </Field>
          <Field label="Customer">
            <select className={inputCls} value={form.customerId} onChange={(e) => setForm({ ...form, customerId: e.target.value })}>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>{c.name} — {packages.find((p) => p.id === c.packageId)?.name || "no package"}</option>
              ))}
            </select>
          </Field>
          {(() => {
            const selectedCustomer = customers.find((c) => c.id === form.customerId);
            const selectedPackage = selectedCustomer ? packages.find((p) => p.id === selectedCustomer.packageId) : null;
            if (!selectedCustomer) return null;
            const remaining = selectedCustomer.classesRemaining;
            const isLow = typeof remaining === "number" && remaining <= 0;
            return (
              <>
                <div className={`flex items-center justify-between text-xs rounded-md px-3 py-2 mb-1 ${isLow ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"}`}>
                  <span>{selectedPackage ? selectedPackage.name : "No package on file"}</span>
                  <span className="font-medium">
                    {remaining === "—" ? "Unlimited" : isLow ? "0 classes left" : `${remaining} classes left`}
                  </span>
                </div>
                {selectedCustomer.location && (
                  <div className="flex items-center gap-1 text-xs text-green-600 mb-3">
                    <MapPin size={12} /> {selectedCustomer.location}
                  </div>
                )}
              </>
            );
          })()}
          <button onClick={submit} className="w-full bg-green-500 text-white rounded-md py-2 text-sm mt-2 hover:bg-green-600">
            {editingId ? "Save changes" : "Add to schedule"}
          </button>
        </Modal>
      )}
    </div>
  );
}

function Utilization({ trainers, classes, customers, packages }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dayIndex = (dateStr) => {
    const d = new Date(`${dateStr}T00:00:00`);
    return (d.getDay() + 6) % 7; // Monday-first
  };

  // ----- Overall period (drives stats + commission progress below) -----
  const [mode, setMode] = useState("month");
  const [month, setMonth] = useState("2026-08");
  const [startDate, setStartDate] = useState("2026-08-01");
  const [endDate, setEndDate] = useState("2026-08-31");
  const inPeriod = (dateStr) => (mode === "month" ? dateStr.startsWith(month) : dateStr >= startDate && dateStr <= endDate);
  const periodClasses = classes.filter((c) => inPeriod(c.date));

  const commissions = trainers.map((t) => {
    const completed = periodClasses.filter((c) => c.trainerId === t.id && c.status === "completed").length;
    const commissionEarned = trainerCommission(t, periodClasses, customers, packages);
    return {
      trainer: t,
      completed,
      commissionEarned,
      progress: t.monthlyTarget ? completed / t.monthlyTarget : 0,
    };
  });

  const avgUtilization = commissions.length
    ? Math.round((commissions.reduce((s, c) => s + Math.min(1, c.progress), 0) / commissions.length) * 100)
    : 0;
  const totalCompleted = periodClasses.filter((c) => c.status === "completed").length;
  const totalUpcoming = periodClasses.filter((c) => c.status === "scheduled").length;

  // ----- Weekly pattern (its own week navigator, independent of the period above) -----
  const [weekStart, setWeekStart] = useState("2026-08-24"); // a Monday
  const pad = (n) => String(n).padStart(2, "0");
  const addDays = (dateStr, n) => {
    const d = new Date(`${dateStr}T00:00:00`);
    d.setDate(d.getDate() + n);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };
  const shiftWeek = (delta) => setWeekStart((ws) => addDays(ws, delta * 7));
  const weekEnd = addDays(weekStart, 6);
  const formatShort = (dateStr) => new Date(`${dateStr}T00:00:00`).toLocaleString("en-US", { month: "short", day: "numeric" });
  const weekLabel = `${formatShort(weekStart)} – ${formatShort(weekEnd)}, ${weekStart.slice(0, 4)}`;
  const weekClasses = classes.filter((c) => c.date >= weekStart && c.date <= weekEnd);

  const heat = trainers.map((t) => {
    const counts = days.map(() => 0);
    let completed = 0;
    let upcoming = 0;
    weekClasses
      .filter((c) => c.trainerId === t.id)
      .forEach((c) => {
        counts[dayIndex(c.date)]++;
        if (c.status === "completed") completed++;
        else upcoming++;
      });
    return { trainer: t, counts, completed, upcoming };
  });

  const maxCount = Math.max(1, ...heat.flatMap((h) => h.counts));

  return (
    <div>
      <SectionTitle
        eyebrow="Capacity"
        title="Trainer utilisation"
        action={
          <PeriodSelector
            mode={mode}
            setMode={setMode}
            month={month}
            setMonth={setMonth}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        }
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-4">
          <div className="text-[11px] uppercase tracking-wide text-green-600">Studio avg. utilisation</div>
          <div className="text-2xl font-serif text-green-900 mt-1">{avgUtilization}%</div>
        </Card>
        <Card className="p-4">
          <div className="text-[11px] uppercase tracking-wide text-green-600">Classes completed</div>
          <div className="text-2xl font-serif text-green-900 mt-1">{totalCompleted}</div>
        </Card>
        <Card className="p-4">
          <div className="text-[11px] uppercase tracking-wide text-green-600">Classes upcoming</div>
          <div className="text-2xl font-serif text-green-900 mt-1">{totalUpcoming}</div>
        </Card>
      </div>

      <SectionTitle eyebrow="Payroll" title="Commission — selected period" />
      <div className="space-y-4 mb-8">
        {commissions.map((c) => (
          <Card key={c.trainer.id} className="p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-green-900">{c.trainer.name}</div>
              <span className="text-sm text-green-700">
                {c.completed} / {c.trainer.monthlyTarget} classes · {Math.round(c.progress * 100)}% · {AED(c.commissionEarned)}
              </span>
            </div>
            <div className="h-2 rounded-full bg-green-100 overflow-hidden">
              <div
                className={`h-full ${c.progress >= 1 ? "bg-emerald-600" : "bg-green-500"}`}
                style={{ width: `${Math.min(100, c.progress * 100)}%` }}
              />
            </div>
          </Card>
        ))}
      </div>

      <SectionTitle
        eyebrow="Weekly pattern"
        title="Class load by day"
        action={
          <div className="flex items-center gap-2">
            <button onClick={() => shiftWeek(-1)} className="p-1.5 rounded-md text-green-600 hover:bg-green-50 hover:text-green-900">
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm text-green-900 font-medium whitespace-nowrap">{weekLabel}</span>
            <button onClick={() => shiftWeek(1)} className="p-1.5 rounded-md text-green-600 hover:bg-green-50 hover:text-green-900">
              <ChevronRight size={16} />
            </button>
          </div>
        }
      />
      <Card className="p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr>
                <th className="text-left text-xs uppercase tracking-wide text-green-600 pb-3 pr-3">Trainer</th>
                {days.map((d) => (
                  <th key={d} className="text-center text-xs uppercase tracking-wide text-green-600 pb-3 px-1">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {heat.map((h) => (
                <tr key={h.trainer.id} className="border-t border-gray-100">
                  <td className="py-3 pr-3 text-green-900 font-medium whitespace-nowrap">{h.trainer.name}</td>
                  {h.counts.map((count, i) => (
                    <td key={i} className="py-3 px-1 text-center">
                      <div
                        className="mx-auto rounded-md flex items-center justify-center text-xs font-medium"
                        style={{
                          width: 32,
                          height: 32,
                          backgroundColor: count === 0 ? "#EEF6F0" : `rgba(124, 152, 133, ${0.25 + 0.75 * (count / maxCount)})`,
                          color: count / maxCount > 0.55 ? "#FFFFFF" : "#4B6355",
                        }}
                      >
                        {count || ""}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-green-600 mt-4">Counts include both completed and upcoming classes for the selected week.</p>
      </Card>
    </div>
  );
}

function CommissionTab({ trainers, classes, customers, packages }) {
  const [mode, setMode] = useState("month");
  const [month, setMonth] = useState("2026-08");
  const [startDate, setStartDate] = useState("2026-08-01");
  const [endDate, setEndDate] = useState("2026-08-31");
  const inPeriod = (dateStr) => (mode === "month" ? dateStr.startsWith(month) : dateStr >= startDate && dateStr <= endDate);
  const periodClasses = classes.filter((c) => inPeriod(c.date));

  const commissions = trainers.map((t) => {
    const completed = periodClasses.filter((c) => c.trainerId === t.id && c.status === "completed").length;
    const commissionEarned = trainerCommission(t, periodClasses, customers, packages);
    return {
      trainer: t,
      completed,
      commissionEarned,
      total: t.baseSalary + commissionEarned,
    };
  });

  return (
    <div>
      <SectionTitle
        eyebrow="Payroll engine"
        title="Commission — selected period"
        action={
          <PeriodSelector
            mode={mode}
            setMode={setMode}
            month={month}
            setMonth={setMonth}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        }
      />
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {commissions.map((c) => (
          <Card key={c.trainer.id} className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="font-medium text-green-900">{c.trainer.name}</div>
              <span className="text-xs text-green-600">{c.completed} classes completed</span>
            </div>
            <div className="grid grid-cols-2 gap-y-1 text-sm text-green-700">
              <span>Base salary</span><span className="text-green-900 text-right">{AED(c.trainer.baseSalary)}</span>
              <span>Commission (tiered by monthly volume — {c.completed} classes)</span>
              <span className="text-green-900 text-right">{AED(c.commissionEarned)}</span>
              <span className="font-medium text-green-900 border-t border-gray-100 pt-1 mt-1">Total payout</span>
              <span className="font-serif text-lg text-green-900 border-t border-gray-100 pt-1 mt-1 text-right">{AED(c.total)}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ---------- Live data sync (Supabase) ----------

// Behaves like useState's setter (accepts a value or an updater function) but also
// loads the table from Supabase on mount, keeps it live via realtime subscriptions,
// and pushes any local inserts/updates/deletes back to Supabase — so all 3 staff
// accounts see the same data update in real time.
function useSyncedTable(table, seed, enabled) {
  const [rows, setRows] = useState(seed);

  useEffect(() => {
    if (!enabled) return;
    let channel;
    let cancelled = false;

    (async () => {
      const { data, error } = await supabase.from(table).select("*");
      if (cancelled) return;
      if (error) {
        console.error(`Failed to load ${table}:`, error.message);
        return;
      }
      if (data && data.length) {
        setRows(data);
      } else {
        // First time this project is used — seed the live database with the starter data.
        const { error: seedError } = await supabase.from(table).insert(seed);
        if (seedError) console.error(`Failed to seed ${table}:`, seedError.message);
      }

      channel = supabase
        .channel(`${table}-changes`)
        .on("postgres_changes", { event: "*", schema: "public", table }, (payload) => {
          setRows((prev) => {
            if (payload.eventType === "DELETE") return prev.filter((r) => r.id !== payload.old.id);
            const exists = prev.some((r) => r.id === payload.new.id);
            if (exists) return prev.map((r) => (r.id === payload.new.id ? payload.new : r));
            return [...prev, payload.new];
          });
        })
        .subscribe();
    })();

    return () => {
      cancelled = true;
      if (channel) supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, table]);

  const setSynced = (updater) => {
    setRows((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      if (enabled) {
        const nextIds = new Set(next.map((r) => r.id));
        prev.forEach((r) => {
          if (!nextIds.has(r.id)) {
            supabase.from(table).delete().eq("id", r.id).then(({ error }) => {
              if (error) console.error(`Delete failed on ${table}:`, error.message);
            });
          }
        });
        next.forEach((r) => {
          const old = prev.find((p) => p.id === r.id);
          if (!old) {
            supabase.from(table).insert(r).then(({ error }) => {
              if (error) console.error(`Insert failed on ${table}:`, error.message);
            });
          } else if (JSON.stringify(old) !== JSON.stringify(r)) {
            supabase.from(table).update(r).eq("id", r.id).then(({ error }) => {
              if (error) console.error(`Update failed on ${table}:`, error.message);
            });
          }
        });
      }
      return next;
    });
  };

  return [rows, setSynced];
}

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <Card className="w-full max-w-sm p-6">
        <div className="flex items-center gap-2 text-green-500 mb-1">
          <Sparkles size={18} />
          <span className="text-xs tracking-[0.25em] uppercase">Studio Ops</span>
        </div>
        <h1 className="font-serif text-2xl text-green-900 mb-4">Click A Yoga</h1>
        <form onSubmit={submit}>
          <Field label="Email">
            <input type="email" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Field>
          <Field label="Password">
            <input type="password" className={inputCls} value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Field>
          {error && <div className="text-xs text-red-500 mb-3">{error}</div>}
          <button type="submit" disabled={busy} className="w-full bg-green-700 text-white rounded-md py-2 text-sm hover:bg-green-800 disabled:opacity-60">
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="text-xs text-green-600 mt-4">Accounts are created by the studio admin in the Supabase dashboard.</p>
      </Card>
    </div>
  );
}

// ---------- App ----------

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [session, setSession] = useState(undefined); // undefined = still checking, null = signed out

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => listener.subscription.unsubscribe();
  }, []);

  const signedIn = !!session;
  const [trainers, setTrainers] = useSyncedTable("trainers", seedTrainers, signedIn);
  const [packages, setPackages] = useSyncedTable("packages", seedPackages, signedIn);
  const [customers, setCustomers] = useSyncedTable("customers", seedCustomers, signedIn);
  const [classes, setClasses] = useSyncedTable("classes", seedClasses, signedIn);
  const [payments, setPayments] = useSyncedTable("payments", seedPayments, signedIn);

  if (session === undefined) {
    return <div className="min-h-screen bg-white flex items-center justify-center text-green-600 text-sm">Loading…</div>;
  }
  if (!session) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-white flex" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <style>{`
        .font-serif { font-family: 'Georgia', 'Times New Roman', serif; }
        body, table, button, input, select { font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; }
      `}</style>
      <div className="w-64 shrink-0 hidden md:block">
        <TopBar tab={tab} setTab={setTab} userEmail={session.user?.email} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="md:hidden flex gap-2 overflow-x-auto p-3 bg-white border-b border-green-100">
          {["dashboard", "customers", "packages", "trainers", "schedule", "utilization", "commission"].map((id) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap ${tab === id ? "bg-green-500 text-green-900" : "text-green-700"}`}
            >
              {id}
            </button>
          ))}
        </div>
        <div className="p-6 md:p-10 max-w-5xl mx-auto" style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif" }}>
          {tab === "dashboard" && (
            <Dashboard trainers={trainers} customers={customers} classes={classes} payments={payments} packages={packages} />
          )}
          {tab === "customers" && <Customers customers={customers} setCustomers={setCustomers} packages={packages} payments={payments} setPayments={setPayments} />}
          {tab === "packages" && <Packages packages={packages} setPackages={setPackages} />}
          {tab === "trainers" && <Trainers trainers={trainers} setTrainers={setTrainers} />}
          {tab === "schedule" && <Schedule classes={classes} setClasses={setClasses} trainers={trainers} customers={customers} packages={packages} />}
          {tab === "utilization" && <Utilization trainers={trainers} classes={classes} customers={customers} packages={packages} />}
          {tab === "commission" && <CommissionTab trainers={trainers} classes={classes} customers={customers} packages={packages} />}
        </div>
      </div>
    </div>
  );
}
