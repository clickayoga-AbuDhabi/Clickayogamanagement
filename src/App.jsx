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
  AlertTriangle,
  Receipt,
} from "lucide-react";

// ---------- Seed data (Click A Yoga, Abu Dhabi) ----------

const seedTrainers = [
  { id: "t1", name: "Dr. Ankitha", cred: "BNYS Naturopathy Doctor", baseSalary: 2000, commissionRate: 0.2, monthlyTarget: 130 },
  { id: "t2", name: "Dr. Akshatha", cred: "BNYS Naturopathy Doctor", baseSalary: 2000, commissionRate: 0.2, monthlyTarget: 130 },
];

const seedTimeOff = [];

const seedExpenses = [
  { id: "e1", date: "2025-06-16", category: "Website", vendor: "", description: "Website advance payment", amount: 2391.02, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e2", date: "2025-06-26", category: "Branding", vendor: "", description: "Logo", amount: 261.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e3", date: "2025-07-01", category: "License", vendor: "", description: "License first payment", amount: 2000.0, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e4", date: "2025-07-02", category: "Website", vendor: "", description: "Email charges 2804 inr", amount: 120.6, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e5", date: "2025-07-10", category: "License", vendor: "", description: "License fees", amount: 5265.87, paymentMethod: "online", paidBy: "Zamzam" },
  { id: "e6", date: "2025-08-04", category: "License", vendor: "", description: "E channel registration", amount: 3135.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e7", date: "2025-08-06", category: "Website", vendor: "", description: "Website advance", amount: 525.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e8", date: "2025-08-08", category: "License", vendor: "", description: "Number update ica", amount: 150.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e9", date: "2025-08-14", category: "Website", vendor: "", description: "Balance for website", amount: 525.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e10", date: "2025-08-14", category: "Website", vendor: "", description: "Hosting tasjeel", amount: 966.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e11", date: "2025-08-16", category: "Branding", vendor: "", description: "Logo animation", amount: 200.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e12", date: "2025-08-20", category: "Travel", vendor: "", description: "Flight ticket Ankitha", amount: 559.73, paymentMethod: "online", paidBy: "Zamzam" },
  { id: "e13", date: "2025-08-20", category: "Visa", vendor: "", description: "Ankitha visit visa", amount: 310.0, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e14", date: "2025-08-27", category: "Investment", vendor: "", description: "Account ADCB", amount: 2000.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e15", date: "2025-08-27", category: "Investment", vendor: "", description: "Account ADCB", amount: 2000.0, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e16", date: "2025-08-27", category: "Investment", vendor: "", description: "Account ADCB", amount: 2000.0, paymentMethod: "online", paidBy: "Zamzam" },
  { id: "e17", date: "2025-09-15", category: "Marketing", vendor: "", description: "Advance for social media", amount: 4200.0, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e18", date: "2025-09-15", category: "Accomodation", vendor: "", description: "Rent advance", amount: 200.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e19", date: "2025-09-15", category: "Accomodation", vendor: "", description: "Room commission", amount: 300.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e20", date: "2025-09-16", category: "Travel", vendor: "", description: "Parking airport", amount: 15.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e21", date: "2025-09-16", category: "Travel", vendor: "", description: "Prasansa flight ticket cancel", amount: 39.0, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e22", date: "2025-09-19", category: "Visa", vendor: "", description: "Ankitha visa", amount: 2810.5, paymentMethod: "online", paidBy: "Zamzam" },
  { id: "e23", date: "2025-09-22", category: "Visa", vendor: "", description: "Ankitha medical", amount: 255.0, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e24", date: "2025-09-23", category: "General", vendor: "", description: "Sim card ankitha", amount: 99.0, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e25", date: "2025-09-25", category: "Accomodation", vendor: "", description: "Sep oct rent", amount: 3400.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e26", date: "2025-09-25", category: "Marketing", vendor: "", description: "Marketing- insta ad", amount: 155.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e27", date: "2025-09-26", category: "Branding", vendor: "", description: "Yoga mat", amount: 38.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e28", date: "2025-09-27", category: "Branding", vendor: "", description: "T shirt", amount: 70.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e29", date: "2025-09-29", category: "Visa", vendor: "", description: "Insurance and EID", amount: 2116.0, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e30", date: "2025-10-06", category: "Phone", vendor: "", description: "Phone september", amount: 196.88, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e31", date: "2025-10-06", category: "Marketing", vendor: "", description: "Instagram", amount: 120.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e32", date: "2025-10-10", category: "Website", vendor: "", description: "Website balance", amount: 1000.0, paymentMethod: "online", paidBy: "Zamzam" },
  { id: "e33", date: "2025-10-15", category: "Travel", vendor: "", description: "Pratima air ticket", amount: 504.0, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e34", date: "2025-10-15", category: "Visa", vendor: "", description: "Visa and return ticket pratima", amount: 340.0, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e35", date: "2025-10-23", category: "Accomodation", vendor: "", description: "Rent room new advance", amount: 750.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e36", date: "2025-10-27", category: "Marketing", vendor: "", description: "Pamphlets", amount: 280.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e37", date: "2025-11-01", category: "Phone", vendor: "", description: "Telephone october bill", amount: 196.88, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e38", date: "2025-11-02", category: "Accomodation", vendor: "", description: "Rent november", amount: 2500.0, paymentMethod: "online", paidBy: "Zamzam" },
  { id: "e39", date: "2025-11-02", category: "Marketing", vendor: "", description: "Adipec registration Ankita and pratima", amount: 400.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e40", date: "2025-11-03", category: "General", vendor: "", description: "Sim card pratima", amount: 49.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e41", date: "2025-11-04", category: "Website", vendor: "", description: "Website security payment", amount: 291.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e42", date: "2025-11-12", category: "Marketing", vendor: "", description: "Spinneys khalidiya ad", amount: 157.5, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e43", date: "2025-11-12", category: "Branding", vendor: "", description: "Yoga mats", amount: 133.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e44", date: "2025-11-14", category: "Marketing", vendor: "", description: "Lunch shoot", amount: 275.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e45", date: "2025-11-14", category: "Marketing", vendor: "", description: "Rashmi taxi", amount: 50.0, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e46", date: "2025-11-17", category: "Marketing", vendor: "", description: "Mangrove village notice board", amount: 157.5, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e47", date: "2025-11-17", category: "Marketing", vendor: "", description: "Google Ad registration", amount: 35.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e48", date: "2025-11-18", category: "Marketing", vendor: "", description: "Company profile creation", amount: 261.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e49", date: "2025-11-19", category: "Branding", vendor: "", description: "Tshirts pratima", amount: 70.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e50", date: "2025-11-24", category: "Marketing", vendor: "", description: "Printing banner and t shirt", amount: 270.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e51", date: "2025-11-24", category: "Visa", vendor: "", description: "Pratima visit visa ext", amount: 1350.0, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e52", date: "2025-11-24", category: "License", vendor: "", description: "Visa gender change", amount: 3300.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e53", date: "2025-11-25", category: "Marketing", vendor: "", description: "Google Ads", amount: 200.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e54", date: "2025-11-27", category: "Visa", vendor: "", description: "Taxi pratima visa change", amount: 130.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e55", date: "2025-11-28", category: "Marketing", vendor: "", description: "Mind body app November plus 6 months", amount: 446.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e56", date: "2025-12-02", category: "Marketing", vendor: "", description: "Google ads", amount: 414.95, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e57", date: "2025-12-02", category: "Investment", vendor: "", description: "To the account", amount: 3350.0, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e58", date: "2025-12-02", category: "Investment", vendor: "", description: "To the account", amount: 5000.0, paymentMethod: "online", paidBy: "Zamzam" },
  { id: "e59", date: "2025-12-02", category: "Phone", vendor: "", description: "Telephone bill", amount: 196.88, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e60", date: "2025-12-03", category: "Travel", vendor: "", description: "Pratima return ticket", amount: 738.68, paymentMethod: "online", paidBy: "Zamzam" },
  { id: "e61", date: "2025-12-15", category: "Investment", vendor: "", description: "To the account", amount: 500.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e62", date: "2025-12-15", category: "Investment", vendor: "", description: "To the account", amount: 500.0, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e63", date: "2025-12-15", category: "Investment", vendor: "", description: "To the account", amount: 500.0, paymentMethod: "online", paidBy: "Zamzam" },
  { id: "e64", date: "2025-12-24", category: "Marketing", vendor: "", description: "Seven days media december", amount: 2500.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e65", date: "2026-01-01", category: "Marketing", vendor: "", description: "Google Ads Dec", amount: 570.22, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e66", date: "2026-01-04", category: "Investment", vendor: "", description: "Zamzam account deposit", amount: 2000.0, paymentMethod: "online", paidBy: "Zamzam" },
  { id: "e67", date: "2026-01-06", category: "Phone", vendor: "", description: "Etisalat", amount: 197.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e68", date: "2026-01-13", category: "Marketing", vendor: "", description: "Meta ad", amount: 59.85, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e69", date: "2026-01-15", category: "General", vendor: "", description: "Swing studio", amount: 500.0, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e70", date: "2026-01-15", category: "Marketing", vendor: "", description: "Meta ad", amount: 48.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e71", date: "2026-01-16", category: "Marketing", vendor: "", description: "Meta ad", amount: 48.3, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e72", date: "2026-01-18", category: "Marketing", vendor: "", description: "Meta ad 17 jan", amount: 48.3, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e73", date: "2026-01-18", category: "Marketing", vendor: "", description: "Meta ad 18 jan", amount: 43.8, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e74", date: "2026-01-19", category: "Marketing", vendor: "", description: "Insta story", amount: 231.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e75", date: "2026-01-21", category: "Visa", vendor: "", description: "Akshatha visa", amount: 340.0, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e76", date: "2026-01-22", category: "Investment", vendor: "", description: "Rehana bank transfer", amount: 2000.0, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e77", date: "2026-01-25", category: "Marketing", vendor: "", description: "Google ads", amount: 800.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e78", date: "2026-01-27", category: "Marketing", vendor: "", description: "Google managemet", amount: 500.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e79", date: "2026-01-28", category: "Investment", vendor: "", description: "Zamzam account transfer", amount: 3800.0, paymentMethod: "online", paidBy: "Zamzam" },
  { id: "e80", date: "2026-02-01", category: "Marketing", vendor: "", description: "Google ads jan", amount: 298.95, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e81", date: "2026-02-01", category: "Visa", vendor: "", description: "Akshatha hotel booking", amount: 275.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e82", date: "2026-02-02", category: "Phone", vendor: "", description: "Jan tel bill", amount: 198.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e83", date: "2026-02-04", category: "Visa", vendor: "", description: "Akshatha visa", amount: 6140.0, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e84", date: "2026-02-09", category: "Visa", vendor: "", description: "Akshatha medical", amount: 250.0, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e85", date: "2026-02-24", category: "Marketing", vendor: "", description: "Google ads", amount: 946.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e86", date: "2026-02-26", category: "Marketing", vendor: "", description: "Google Ads management feb", amount: 500.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e87", date: "2026-03-02", category: "Phone", vendor: "", description: "Etisalat phone", amount: 198.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e88", date: "2026-03-04", category: "Marketing", vendor: "", description: "Insta ad", amount: 215.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e89", date: "2026-03-05", category: "Investment", vendor: "", description: "Paid to account", amount: 2000.0, paymentMethod: "online", paidBy: "Zamzam" },
  { id: "e90", date: "2026-03-19", category: "Visa", vendor: "", description: "Ankitha return ticket", amount: 300.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e91", date: "2026-03-28", category: "Marketing", vendor: "", description: "Insta ad", amount: 222.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e92", date: "2026-03-30", category: "Investment", vendor: "", description: "March to the account", amount: 2000.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e93", date: "2026-03-30", category: "Investment", vendor: "", description: "March to the account", amount: 2000.0, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e94", date: "2026-03-30", category: "Investment", vendor: "", description: "March to the account", amount: 2000.0, paymentMethod: "online", paidBy: "Zamzam" },
  { id: "e95", date: "2026-04-01", category: "Marketing", vendor: "", description: "Google ads", amount: 261.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e96", date: "2026-04-02", category: "Phone", vendor: "", description: "Telephone bill march", amount: 262.5, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e97", date: "2026-04-18", category: "Transport", vendor: "", description: "Taxi", amount: 20.0, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e98", date: "2026-04-18", category: "Marketing", vendor: "", description: "Petrol for shoot", amount: 200.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e99", date: "2026-04-19", category: "Accomodation", vendor: "", description: "Akshatha Rent may advance", amount: 400.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e100", date: "2026-04-21", category: "Branding", vendor: "", description: "Gym clothes", amount: 281.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e101", date: "2026-04-29", category: "Investment", vendor: "", description: "May account transfer", amount: 5100.0, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e102", date: "2026-04-29", category: "Investment", vendor: "", description: "May account transfer", amount: 5100.0, paymentMethod: "online", paidBy: "Zamzam" },
  { id: "e103", date: "2026-04-30", category: "Marketing", vendor: "", description: "Yas island parking", amount: 15.0, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e104", date: "2026-05-03", category: "Phone", vendor: "", description: "Phone bill april", amount: 262.5, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e105", date: "2026-05-11", category: "Marketing", vendor: "", description: "Model", amount: 500.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e106", date: "2026-05-15", category: "Marketing", vendor: "", description: "Meta ad", amount: 134.4, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e107", date: "2026-05-17", category: "Marketing", vendor: "", description: "Meta ad", amount: 134.82, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e108", date: "2026-05-18", category: "Marketing", vendor: "", description: "Meta ad", amount: 134.65, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e109", date: "2026-05-31", category: "Accomodation", vendor: "", description: "Room rent", amount: 1400.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e110", date: "2026-06-02", category: "Phone", vendor: "", description: "Telephone may bill", amount: 262.5, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e111", date: "2026-06-05", category: "Investment", vendor: "", description: "June investment", amount: 2000.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e112", date: "2026-06-05", category: "Investment", vendor: "", description: "June investment", amount: 2000.0, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e113", date: "2026-06-05", category: "Investment", vendor: "", description: "June investment", amount: 3000.0, paymentMethod: "online", paidBy: "Zamzam" },
  { id: "e114", date: "2026-06-11", category: "Marketing", vendor: "", description: "Ugc video", amount: 292.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e115", date: "2026-06-12", category: "Investment", vendor: "", description: "June investment", amount: 1000.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e116", date: "2026-06-16", category: "Website", vendor: "", description: "Domain renewal", amount: 152.25, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e117", date: "2026-06-22", category: "Marketing", vendor: "", description: "Model june", amount: 500.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e118", date: "2026-06-23", category: "License", vendor: "", description: "License renewal fees", amount: 2799.27, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e119", date: "2026-06-23", category: "License", vendor: "", description: "Labor updation", amount: 1420.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e120", date: "2026-06-25", category: "Travel", vendor: "", description: "Akshatha flight", amount: 1899.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e121", date: "2026-06-30", category: "Branding", vendor: "", description: "Yoga mat", amount: 200.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e122", date: "2026-06-30", category: "Investment", vendor: "", description: "July investment", amount: 3000.0, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e123", date: "2026-06-30", category: "Investment", vendor: "", description: "July investment", amount: 6000.0, paymentMethod: "online", paidBy: "Zamzam" },
  { id: "e124", date: "2026-07-02", category: "Phone", vendor: "", description: "Phone bill", amount: 264.49, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e125", date: "2026-07-06", category: "Investment", vendor: "", description: "July investment rehana", amount: 1000.0, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e126", date: "2026-07-10", category: "Investment", vendor: "", description: "July investment", amount: 350.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e127", date: "2026-07-14", category: "Entertainment", vendor: "", description: "Moti mahal team dinner", amount: 305.55, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e128", date: "2026-08-06", category: "Phone", vendor: "", description: "Phone july", amount: 262.5, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e129", date: "2026-08-12", category: "Investment", vendor: "", description: "July investment jabir", amount: 1750.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e130", date: "2026-08-12", category: "Investment", vendor: "", description: "July investment zamzam", amount: 1750.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e131", date: "2026-08-18", category: "Marketing", vendor: "", description: "Lunch august shoot", amount: 139.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e132", date: "2026-08-18", category: "Accomodation", vendor: "", description: "Room rent advance jeethu", amount: 500.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e133", date: "2026-08-19", category: "Marketing", vendor: "", description: "BNI meeting", amount: 135.0, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e134", date: "2026-08-20", category: "Accomodation", vendor: "", description: "Driver Accommodation advance", amount: 100.0, paymentMethod: "online", paidBy: "Rehana" },
  { id: "e135", date: "2026-08-22", category: "Branding", vendor: "", description: "Log sheet and card", amount: 295.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e136", date: "2026-08-24", category: "Car", vendor: "", description: "POA car", amount: 1450.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e137", date: "2026-08-25", category: "Car", vendor: "", description: "Traffic file opening", amount: 120.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e138", date: "2026-08-25", category: "Car", vendor: "", description: "Car insurance", amount: 1575.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e139", date: "2026-08-26", category: "Branding", vendor: "", description: "Yoga mat", amount: 567.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e140", date: "2026-08-27", category: "Website", vendor: "", description: "Cloudflare app hosting", amount: 112.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e141", date: "2026-08-27", category: "Car", vendor: "", description: "Car passing and inspection", amount: 350.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e142", date: "2026-08-28", category: "Car", vendor: "", description: "Car transfer registration", amount: 365.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e143", date: "2026-08-28", category: "Car", vendor: "", description: "Car", amount: 23000.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e144", date: "2026-08-28", category: "Car", vendor: "", description: "Car insurance", amount: 1650.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e145", date: "2026-08-28", category: "Fuel", vendor: "", description: "Petrol", amount: 110.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e146", date: "2026-08-29", category: "Marketing", vendor: "", description: "Mind body september", amount: 440.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e147", date: "2026-08-29", category: "Car", vendor: "", description: "Parking", amount: 391.0, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e148", date: "2026-08-30", category: "Phone", vendor: "", description: "Driver internet", amount: 42.85, paymentMethod: "online", paidBy: "Jabir" },
  { id: "e149", date: "2026-08-31", category: "Investment", vendor: "", description: "To the account", amount: 8500.0, paymentMethod: "online", paidBy: "Zamzam" },
];

const seedCustomers = [
  { id: "c1", personId: "pp1", name: "Fatima Al Marzooqi", phone: "050 123 4567", email: "fatima.marzooqi@gmail.com", location: "Al Reem Island, Abu Dhabi", nationality: "Emirati", classType: "private", unlimited: true, numberOfClasses: null, perClassPrice: 45, classesRemaining: "—", status: "active", joined: "2026-06-02" },
  { id: "c2", personId: "pp2", name: "Sara Ibrahim", phone: "052 987 1234", email: "sara.ibrahim@gmail.com", location: "Khalifa City, Abu Dhabi", nationality: "Jordanian", classType: "private", unlimited: false, numberOfClasses: 10, perClassPrice: 120, classesRemaining: 4, status: "active", joined: "2026-07-10" },
  { id: "c3", personId: "pp3", name: "Layla Haddad", phone: "056 445 8890", email: "layla.haddad@gmail.com", location: "Corniche, Abu Dhabi", nationality: "Lebanese", classType: "private", unlimited: false, numberOfClasses: 1, perClassPrice: 150, classesRemaining: 0, status: "inactive", joined: "2026-08-01" },
  { id: "c4", personId: "pp4", name: "Noor Al Hashimi", phone: "054 221 7765", email: "noor.alhashimi@gmail.com", location: "Yas Island, Abu Dhabi", nationality: "Emirati", classType: "group", unlimited: false, numberOfClasses: 10, perClassPrice: 62.5, classesRemaining: 7, status: "active", joined: "2026-07-22" },
];

const seedClasses = [
  { id: "cl1", date: "2026-08-03", time: "07:00", endTime: "08:00", trainerId: "t1", customerId: "c1", status: "completed" },
  { id: "cl2", date: "2026-08-03", time: "18:00", endTime: "19:00", trainerId: "t2", customerId: "c2", status: "completed" },
  { id: "cl3", date: "2026-08-05", time: "07:00", endTime: "08:00", trainerId: "t1", customerId: "c4", status: "completed" },
  { id: "cl4", date: "2026-08-06", time: "17:00", endTime: "18:00", trainerId: "t2", customerId: "c3", status: "completed" },
  { id: "cl5", date: "2026-08-10", time: "07:00", endTime: "08:00", trainerId: "t1", customerId: "c1", status: "completed" },
  { id: "cl6", date: "2026-08-12", time: "18:00", endTime: "19:00", trainerId: "t2", customerId: "c2", status: "completed" },
  { id: "cl7", date: "2026-08-22", time: "07:00", endTime: "08:00", trainerId: "t1", customerId: "c1", status: "scheduled" },
  { id: "cl8", date: "2026-08-26", time: "18:00", endTime: "19:00", trainerId: "t2", customerId: "c4", status: "scheduled" },
];

const seedPayments = [
  { id: "p1", customerId: "c1", date: "2026-08-01", note: "Unlimited monthly × AED45/class (private)", subtotal: 900, taxCharged: false, taxPercent: 0, taxAmount: 0, grandTotal: 900, paymentMethod: "online", amountPaid: 900, pendingAmount: 0 },
  { id: "p2", customerId: "c2", date: "2026-07-10", note: "10 classes × AED120 (private)", subtotal: 1200, taxCharged: true, taxPercent: 5, taxAmount: 60, grandTotal: 1260, paymentMethod: "cash", amountPaid: 1160, pendingAmount: 100 },
  { id: "p3", customerId: "c4", date: "2026-07-22", note: "10 classes × AED62.5 (group)", subtotal: 625, taxCharged: false, taxPercent: 0, taxAmount: 0, grandTotal: 625, paymentMethod: "online", amountPaid: 625, pendingAmount: 0 },
];

const uid = (p) => `${p}${Math.random().toString(36).slice(2, 8)}`;

// Date helpers — all period pickers (month/date-range selectors, week/day calendar
// views) default to "today" via these rather than a fixed date, so newly completed
// classes always show up in the default view regardless of what month it actually is.
const pad2 = (n) => String(n).padStart(2, "0");
const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
};
const thisMonthISO = () => todayISO().slice(0, 7);
const monthStartISO = () => `${thisMonthISO()}-01`;
const monthEndISO = () => {
  const d = new Date();
  const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
  return `${end.getFullYear()}-${pad2(end.getMonth() + 1)}-${pad2(end.getDate())}`;
};
const mondayOfThisWeekISO = () => {
  const d = new Date();
  const offset = (d.getDay() + 6) % 7; // Monday-first
  d.setDate(d.getDate() - offset);
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
};

// Displays a stored 24-hour "HH:MM" time as 12-hour with AM/PM — storage and the
// <input type="time"> field stay in 24h format regardless, this is display-only.
const formatTime12h = (time24) => {
  if (!time24) return "";
  const [hStr, m] = time24.split(":");
  let h = parseInt(hStr, 10);
  if (Number.isNaN(h)) return time24;
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${m} ${ampm}`;
};

// Session start/end time helpers — used for double-booking checks and for turning
// completed sessions into hours for utilisation tracking.
const parseHM = (t) => {
  const [h, m] = (t || "0:0").split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
};
// Two time ranges on the same day overlap if one starts before the other ends.
const rangesOverlap = (aStart, aEnd, bStart, bEnd) => aStart < bEnd && bStart < aEnd;
// A session without an end time (legacy data from before this field existed)
// defaults to a 1-hour duration for both overlap checks and hour totals.
const sessionEndMinutes = (cls) => {
  const start = parseHM(cls.time);
  if (!cls.endTime) return start + 60;
  const end = parseHM(cls.endTime);
  return end > start ? end : start + 60;
};
const sessionDurationHours = (cls) => (sessionEndMinutes(cls) - parseHM(cls.time)) / 60;

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

// Unlimited (monthly) bookings don't have a per-class count, so a per-class price is
// estimated against this many classes/month for commission purposes.
const UNLIMITED_ASSUMED_CLASSES = 20;

// Group classes pay a flat commission regardless of monthly volume tier.
const GROUP_CLASS_COMMISSION_RATE = 0.1;

// The per-class price a given scheduled class is worth, taken directly from the
// customer's own per-class price (entered when they were booked in) — not a flat
// rate per trainer, and not looked up from any shared package.
const classPrice = (cls, customers) => {
  const customer = customers.find((c) => c.id === cls.customerId);
  return customer ? Number(customer.perClassPrice) || 0 : 0;
};

// The class type (private/group) for a class's customer — drives which commission
// rule applies.
const classType = (cls, customers) => customers.find((c) => c.id === cls.customerId)?.classType || "private";

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
// whole date range); each class then pays out at the flat group rate if its
// customer is on a group booking, or the month's volume-tier rate otherwise.
const trainerCommission = (trainer, classList, customers) => {
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
        const rate = classType(c, customers) === "group" ? GROUP_CLASS_COMMISSION_RATE : tierRate;
        return s + classPrice(c, customers) * rate;
      }, 0)
    );
  }, 0);
};

// ---------- Shared bits ----------

function TopBar({ tab, setTab, userEmail }) {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "customers", label: "Customers", icon: Users },
    { id: "expenses", label: "Expenses", icon: Receipt },
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
            <span className="text-xs tracking-[0.25em] uppercase">Management System</span>
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

function Modal({ title, onClose, children, wide }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-start justify-center z-50 p-4 overflow-y-auto">
      <Card className={`w-full ${wide ? "max-w-2xl" : "max-w-md"} p-6 my-8`} style={{ maxHeight: "calc(100vh - 4rem)", overflowY: "auto" }}>
        <div className="flex items-center justify-between mb-4 sticky top-0 bg-white pt-1 -mt-1">
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
  const setYTD = () => {
    setMode("range");
    setStartDate(`${new Date().getFullYear()}-01-01`);
    setEndDate(todayISO());
  };
  const setAllTime = () => {
    setMode("range");
    setStartDate("2000-01-01");
    setEndDate(todayISO());
  };
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
      <button onClick={setYTD} className="px-2.5 py-1.5 rounded-md text-xs text-green-700 border border-green-100 hover:bg-green-50">
        YTD
      </button>
      <button onClick={setAllTime} className="px-2.5 py-1.5 rounded-md text-xs text-green-700 border border-green-100 hover:bg-green-50">
        All time
      </button>
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

function Dashboard({ trainers, customers, classes, payments }) {
  const [mode, setMode] = useState("month");
  const [month, setMonth] = useState(thisMonthISO());
  const [startDate, setStartDate] = useState(monthStartISO());
  const [endDate, setEndDate] = useState(monthEndISO());

  const inPeriod = (dateStr) => (mode === "month" ? dateStr.startsWith(month) : dateStr >= startDate && dateStr <= endDate);

  const periodClasses = classes.filter((c) => inPeriod(c.date));
  const periodPayments = payments.filter((p) => inPeriod(p.date));

  const completedThisCycle = periodClasses.filter((c) => c.status === "completed").length;
  const scheduled = periodClasses.filter((c) => c.status === "scheduled").length;
  const revenue = periodPayments.reduce((s, p) => s + (p.amountPaid || 0), 0);

  // Fee breakdown by package structure (class type + class count), not the raw
  // payment note — the note embeds each customer's own price, so grouping by it
  // put almost every customer in their own bucket instead of grouping meaningfully.
  const packageLabelFor = (customerId) => {
    const c = customers.find((cu) => cu.id === customerId);
    if (!c) return "Other";
    if (c.unlimited) return `Unlimited monthly (${c.classType === "group" ? "group" : "private"})`;
    return `${c.numberOfClasses ?? "—"} classes (${c.classType === "group" ? "group" : "private"})`;
  };
  const feeMap = {};
  periodPayments.forEach((p) => {
    const key = packageLabelFor(p.customerId);
    feeMap[key] = (feeMap[key] || 0) + (p.amountPaid || 0);
  });
  const feeBreakdown = Object.entries(feeMap).sort((a, b) => b[1] - a[1]);

  const commissions = trainers.map((t) => {
    const completedClasses = periodClasses.filter((c) => c.trainerId === t.id && c.status === "completed");
    const completed = completedClasses.length;
    const completedHours = completedClasses.reduce((s, c) => s + sessionDurationHours(c), 0);
    const commissionEarned = trainerCommission(t, periodClasses, customers);
    return {
      trainer: t,
      completed,
      completedHours,
      commissionEarned,
      progress: t.monthlyTarget ? completedHours / t.monthlyTarget : 0,
    };
  });
  const totalCommission = commissions.reduce((s, c) => s + c.commissionEarned, 0);

  // Counts unique people (grouped by name) whose status is active — not raw
  // booking-row count, since one person can have several booking line items.
  const activeCustomersCount = new Set(
    customers.filter((c) => (c.status || "active") === "active").map((c) => c.name)
  ).size;

  const stats = [
    { label: "Active customers", value: activeCustomersCount },
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
              <div className="text-xs text-green-600 mb-2">{c.completedHours.toFixed(1)} of {c.trainer.monthlyTarget} hours ({c.completed} classes)</div>
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

function Customers({ customers, setCustomers, insertCustomer, payments, setPayments, classes, setClasses, onBookCustomer }) {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [source, setSource] = useState("new"); // "new" or "existing" — only relevant while adding
  const [existingPersonKey, setExistingPersonKey] = useState(""); // a personId once picked
  const [lockedBooking, setLockedBooking] = useState(false); // true when opened via "New booking" — skips the new/existing picker
  const todayStr = new Date().toISOString().slice(0, 10);
  const blankForm = {
    personId: null,
    name: "", phone: "", email: "", location: "", nationality: "",
    joinDate: todayStr,
    status: "active",
    classType: "private",
    unlimited: false,
    numberOfClasses: 10,
    freeClasses: 0,
    remainingAdjustment: 0,
    priceInput: 150,
    taxCharged: false,
    taxPercent: 5,
    paymentMethod: "cash",
    amountPaid: "",
  };
  const [form, setForm] = useState(blankForm);

  // ----- Live totals for the form -----
  const subtotal = form.unlimited
    ? Number(form.priceInput) || 0
    : (Number(form.numberOfClasses) || 0) * (Number(form.priceInput) || 0);
  const taxAmount = form.taxCharged ? subtotal * ((Number(form.taxPercent) || 0) / 100) : 0;
  const grandTotal = subtotal + taxAmount;
  const pendingAmount = Math.max(0, grandTotal - (Number(form.amountPaid) || 0));

  const [detailPerson, setDetailPerson] = useState(null); // a personId

  const [joinedFrom, setJoinedFrom] = useState("");
  const [joinedTo, setJoinedTo] = useState("");

  const sorted = [...customers]
    .filter((c) => (!joinedFrom || c.joined >= joinedFrom) && (!joinedTo || c.joined <= joinedTo))
    .sort((a, b) => a.name.localeCompare(b.name) || a.joined.localeCompare(b.joined));

  const isFiltered = joinedFrom || joinedTo;
  const clearJoinedFilter = () => { setJoinedFrom(""); setJoinedTo(""); };

  const [sortBy, setSortBy] = useState("name"); // name | location | nationality | status | bookings
  const [sortDir, setSortDir] = useState("asc");

  // Groups every booking by a stable personId — not by name, since editing someone's
  // name must not make the app think it's a different person. Legacy rows saved
  // before personId existed fall back to grouping by name until they're touched again.
  const personKey = (c) => c.personId || c.name;

  // Class counts are always computed live from the actual schedule — never stored —
  // so there's no separate bookkeeping that can drift out of sync with reality.
  // "Remaining" = subscribed minus completed (per the studio's own definition);
  // "Unscheduled" = subscribed minus completed minus already-scheduled, which is
  // the true bookable capacity left and what Schedule's booking guard checks.
  const totalSubscribed = (b) => (b.unlimited ? Infinity : (Number(b.numberOfClasses) || 0) + (Number(b.freeClasses) || 0) + (Number(b.remainingAdjustment) || 0));
  const completedCountFor = (bookingId) => classes.filter((c) => c.customerId === bookingId && c.status === "completed").length;
  const scheduledCountFor = (bookingId) => classes.filter((c) => c.customerId === bookingId && c.status === "scheduled").length;
  const remainingCountFor = (b) => (b.unlimited ? "—" : Math.max(0, totalSubscribed(b) - completedCountFor(b.id)));
  const unscheduledCountFor = (b) => (b.unlimited ? Infinity : Math.max(0, totalSubscribed(b) - completedCountFor(b.id) - scheduledCountFor(b.id)));

  const groupedByPerson = {};
  customers.forEach((c) => { const k = personKey(c); (groupedByPerson[k] = groupedByPerson[k] || []).push(c); });
  const allPeople = Object.entries(groupedByPerson).map(([key, bookings]) => {
    const sortedBookings = [...bookings].sort((a, b) => b.joined.localeCompare(a.joined));
    const latest = sortedBookings[0];
    const totalRemaining = bookings.reduce((s, b) => s + (b.unlimited ? 0 : Number(remainingCountFor(b))), 0);
    const hasUnlimited = bookings.some((b) => b.unlimited);
    return { key, bookings: sortedBookings, latest, totalRemaining, hasUnlimited, status: latest.status || "active" };
  });
  const sortComparators = {
    name: (a, b) => a.latest.name.localeCompare(b.latest.name),
    location: (a, b) => (a.latest.location || "").localeCompare(b.latest.location || ""),
    nationality: (a, b) => (a.latest.nationality || "").localeCompare(b.latest.nationality || ""),
    status: (a, b) => a.status.localeCompare(b.status) || a.latest.name.localeCompare(b.latest.name),
    bookings: (a, b) => a.bookings.length - b.bookings.length || a.latest.name.localeCompare(b.latest.name),
  };
  const [nameSearch, setNameSearch] = useState("");

  const peopleFiltered = allPeople
    .filter((p) => !isFiltered || p.bookings.some((b) => (!joinedFrom || b.joined >= joinedFrom) && (!joinedTo || b.joined <= joinedTo)))
    .filter((p) => {
      const q = nameSearch.trim().toLowerCase();
      if (!q) return true;
      const { name, email, phone } = p.latest;
      return (
        (name || "").toLowerCase().includes(q) ||
        (email || "").toLowerCase().includes(q) ||
        (phone || "").toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      const cmp = sortComparators[sortBy](a, b);
      return sortDir === "asc" ? cmp : -cmp;
    });

  // One entry per distinct person, using their most recent contact details — powers
  // the "existing customer" picker so a repeat booking doesn't need retyping.
  const uniquePeople = [...allPeople].sort((a, b) => a.latest.name.localeCompare(b.latest.name));

  const pickExistingPerson = (key) => {
    setExistingPersonKey(key);
    const p = allPeople.find((pp) => pp.key === key);
    if (!p) return;
    setForm({ ...form, personId: p.latest.personId || p.key, name: p.latest.name, phone: p.latest.phone, email: p.latest.email || "", location: p.latest.location || "", nationality: p.latest.nationality || "" });
  };

  const startAdd = () => {
    setEditingId(null);
    setLockedBooking(false);
    setSource(uniquePeople.length ? "existing" : "new");
    setExistingPersonKey("");
    setForm(blankForm);
    setOpen(true);
  };

  // Edits this exact line item in place — corrects a mistake, doesn't create a new row.
  // Pulls pricing/payment details from that row's existing payment record, if one exists.
  const startEdit = (c) => {
    setEditingId(c.id);
    setLockedBooking(false);
    const existingPayment = payments.find((p) => p.customerId === c.id);
    setForm({
      personId: c.personId || personKey(c),
      name: c.name,
      phone: c.phone,
      email: c.email || "",
      location: c.location || "",
      nationality: c.nationality || "",
      joinDate: c.joined || todayStr,
      status: c.status || "active",
      classType: c.classType || "private",
      unlimited: !!c.unlimited,
      numberOfClasses: c.numberOfClasses ?? 10,
      freeClasses: c.freeClasses || 0,
      remainingAdjustment: c.remainingAdjustment || 0,
      priceInput: c.unlimited ? Math.round((Number(c.perClassPrice) || 0) * UNLIMITED_ASSUMED_CLASSES) : Number(c.perClassPrice) || 0,
      taxCharged: existingPayment?.taxCharged || false,
      taxPercent: existingPayment?.taxPercent || 5,
      paymentMethod: existingPayment?.paymentMethod || "cash",
      amountPaid: existingPayment?.amountPaid ?? "",
    });
    setOpen(true);
  };

  // Pre-fills contact details from an existing customer but always saves as a brand-new
  // line item — for when the same person books another set of classes. Inherits their
  // current status and personId rather than resetting them. Skips the "new/existing
  // customer" picker entirely since the person is already known from context.
  const startNewBooking = (c) => {
    setEditingId(null);
    setLockedBooking(true);
    setSource("existing");
    setExistingPersonKey(c.personId || personKey(c));
    setForm({ ...blankForm, personId: c.personId || personKey(c), name: c.name, phone: c.phone, email: c.email || "", location: c.location || "", nationality: c.nationality || "", status: c.status || "active" });
    setOpen(true);
  };

  const setClassesFor = (numberOfClasses) => {
    setForm({ ...form, numberOfClasses });
  };

  const setFreeClassesFor = (freeClasses) => {
    setForm({ ...form, freeClasses });
  };

  const markPaidInFull = () => setForm({ ...form, amountPaid: grandTotal });

  // Saving a customer automatically generates (or updates) the matching payment record
  // from the classes/price/tax entered here — no separate "log payment" step needed.
  // Editing contact details (name, phone, email, location, nationality) propagates to
  // every one of that person's bookings, keeping their history consistent, while
  // booking-specific fields (price, classes, etc.) only apply to the row being edited.
  const submit = async () => {
    if (!form.name) return;
    const storedPerClassPrice = form.unlimited ? (Number(form.priceInput) || 0) / UNLIMITED_ASSUMED_CLASSES : Number(form.priceInput) || 0;
    const freeClasses = form.unlimited ? 0 : Number(form.freeClasses) || 0;
    const contactFields = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      location: form.location,
      nationality: form.nationality,
    };
    const bookingFields = {
      joined: form.joinDate || todayStr,
      status: form.status || "active",
      classType: form.classType,
      unlimited: form.unlimited,
      numberOfClasses: form.unlimited ? null : Number(form.numberOfClasses) || 0,
      freeClasses,
      remainingAdjustment: form.unlimited ? 0 : Number(form.remainingAdjustment) || 0,
      perClassPrice: storedPerClassPrice,
    };

    const classesLabel = form.unlimited ? "Unlimited monthly" : `${Number(form.numberOfClasses) || 0} classes`;
    const priceLabel = `${AED(Number(form.priceInput) || 0)}${form.unlimited ? "/mo" : ""}`;
    const freeLabel = freeClasses > 0 ? ` + ${freeClasses} free` : "";
    const note = `${classesLabel} × ${priceLabel} (${form.classType})${freeLabel}`;
    const taxPercent = form.taxCharged ? Number(form.taxPercent) || 0 : 0;
    const paymentDate = form.joinDate || todayStr;
    const paymentFields = {
      note,
      subtotal,
      taxCharged: form.taxCharged,
      taxPercent,
      taxAmount,
      grandTotal,
      paymentMethod: form.paymentMethod,
      amountPaid: Number(form.amountPaid) || 0,
      pendingAmount,
    };

    if (editingId) {
      const original = customers.find((c) => c.id === editingId);
      const personId = original?.personId || form.personId || uid("pp");
      setCustomers((cs) =>
        cs.map((c) => {
          if (c.id === editingId) return { ...c, ...contactFields, ...bookingFields, personId };
          if ((c.personId || personKey(c)) === personId) return { ...c, ...contactFields };
          return c;
        })
      );
      setPayments((ps) => {
        const exists = ps.some((p) => p.customerId === editingId);
        if (exists) {
          return ps.map((p) => (p.customerId === editingId ? { ...p, ...paymentFields, date: paymentDate } : p));
        }
        return [...ps, { id: uid("p"), date: paymentDate, customerId: editingId, ...paymentFields }];
      });
    } else {
      // The payment references this customer by id (foreign key), so the customer
      // row must be confirmed saved before the payment is sent — otherwise the two
      // near-simultaneous saves can race and the payment gets rejected.
      const personId = form.personId || uid("pp");
      const newId = uid("c");
      await insertCustomer({ id: newId, personId, ...contactFields, ...bookingFields });
      setPayments((ps) => [...ps, { id: uid("p"), date: paymentDate, customerId: newId, ...paymentFields }]);
    }
    setForm(blankForm);
    setOpen(false);
  };

  // Removing a customer line item also removes its generated payment and cancels
  // (deletes) any of their classes on the schedule — keeping the ledger clean.
  const removeCustomer = (id) => {
    setCustomers((cs) => cs.filter((c) => c.id !== id));
    setPayments((ps) => ps.filter((p) => p.customerId !== id));
    setClasses((cls) => cls.filter((c) => c.customerId !== id));
  };

  // Deletes every booking (and matching payment, and any of their scheduled/completed
  // classes) for a person at once — used by the delete icon on the main list, since
  // that row represents the whole person now.
  const removePerson = (key) => {
    const idsToRemove = new Set(customers.filter((c) => personKey(c) === key).map((c) => c.id));
    setCustomers((cs) => cs.filter((c) => personKey(c) !== key));
    setPayments((ps) => ps.filter((p) => !idsToRemove.has(p.customerId)));
    setClasses((cls) => cls.filter((c) => !idsToRemove.has(c.customerId)));
  };

  // Both delete paths always ask for confirmation first, since they cascade to
  // remove payments and any scheduled/completed classes too.
  const [deleteBookingTarget, setDeleteBookingTarget] = useState(null); // one booking (customer row)
  const [deletePersonTarget, setDeletePersonTarget] = useState(null); // a whole person (key + display info)
  const confirmDeleteBooking = () => {
    if (deleteBookingTarget) removeCustomer(deleteBookingTarget.id);
    setDeleteBookingTarget(null);
  };
  const confirmDeletePerson = () => {
    if (deletePersonTarget) removePerson(deletePersonTarget.key);
    setDeletePersonTarget(null);
  };

  // Status (active/inactive/frozen) is a person-level attribute, but bookings are
  // stored per line item — so it's kept in sync across every booking that shares
  // this person's personId whenever it's changed from the detail view.
  const updatePersonStatus = (key, status) => {
    setCustomers((cs) => cs.map((c) => (personKey(c) === key ? { ...c, status } : c)));
  };

  const statusBadgeClass = (status) => {
    if (status === "frozen") return "bg-blue-50 text-blue-600";
    if (status === "inactive") return "bg-gray-100 text-gray-600";
    if (status === "discontinued") return "bg-red-50 text-red-600";
    return "bg-green-100 text-green-700";
  };
  const statusLabel = (status) => (status ? status.charAt(0).toUpperCase() + status.slice(1) : "Active");

  const exportCustomersCSV = () => {
    downloadCSV(
      `click-a-yoga-customers-${new Date().toISOString().slice(0, 10)}.csv`,
      ["Name", "Phone", "Email", "Location", "Nationality", "Class Type", "Subscribed", "Free Classes", "Per-Class Price", "Completed", "Scheduled", "Remaining", "Joined"],
      sorted.map((c) => [
        c.name,
        c.phone,
        c.email || "",
        c.location || "",
        c.nationality || "",
        c.classType === "group" ? "Group" : "Private",
        c.unlimited ? "Unlimited" : c.numberOfClasses,
        c.freeClasses || 0,
        AED(c.perClassPrice || 0),
        completedCountFor(c.id),
        scheduledCountFor(c.id),
        remainingCountFor(c),
        c.joined,
      ])
    );
  };

  const nameOf = (id) => customers.find((c) => c.id === id)?.name || "—";
  const removePayment = (id) => setPayments((ps) => ps.filter((p) => p.id !== id));
  const sortedPayments = [...payments].sort((a, b) => b.date.localeCompare(a.date));

  const exportPaymentsCSV = () => {
    downloadCSV(
      `click-a-yoga-payments-${new Date().toISOString().slice(0, 10)}.csv`,
      ["Customer", "Note", "Payment Method", "Subtotal", "Tax %", "Tax Amount", "Grand Total", "Amount Paid", "Pending", "Date"],
      sortedPayments.map((p) => [
        nameOf(p.customerId),
        p.note,
        p.paymentMethod === "online" ? "Online" : "Cash",
        p.subtotal,
        p.taxCharged ? p.taxPercent : 0,
        p.taxAmount || 0,
        p.grandTotal,
        p.amountPaid,
        p.pendingAmount || 0,
        p.date,
      ])
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
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-green-500" />
          <input
            type="text"
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
            placeholder="Search by name, email, or phone…"
            className={`${inputCls} w-auto pl-8`}
          />
        </div>
        <span className="text-xs text-green-600">Joined between</span>
        <input type="date" className={`${inputCls} w-auto`} value={joinedFrom} onChange={(e) => setJoinedFrom(e.target.value)} />
        <span className="text-xs text-green-600">and</span>
        <input type="date" className={`${inputCls} w-auto`} value={joinedTo} onChange={(e) => setJoinedTo(e.target.value)} />
        {isFiltered && (
          <button onClick={clearJoinedFilter} className="flex items-center gap-1 text-xs text-green-600 hover:text-green-900 underline">
            <X size={12} /> Clear
          </button>
        )}
        {(isFiltered || nameSearch) && <span className="text-xs text-green-600">({peopleFiltered.length} match{peopleFiltered.length === 1 ? "" : "es"})</span>}
        <span className="text-xs text-green-600 ml-2">Sort by</span>
        <select className={`${inputCls} w-auto`} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Name</option>
          <option value="location">Location</option>
          <option value="nationality">Nationality</option>
          <option value="status">Status</option>
          <option value="bookings">Bookings</option>
        </select>
        <button
          onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs text-green-700 border border-green-100 hover:bg-green-50"
          title="Toggle sort order"
        >
          <ArrowUpDown size={13} /> {sortDir === "asc" ? "A–Z" : "Z–A"}
        </button>
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-auto" style={{ maxHeight: "420px" }}>
        <table className="w-full text-sm min-w-[980px]">
          <thead className="bg-green-50 text-green-700 text-xs uppercase tracking-wide sticky top-0 z-10">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Phone</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Location</th>
              <th className="text-left px-4 py-3">Nationality</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Bookings</th>
              <th className="text-left px-4 py-3">Total remaining</th>
              <th className="text-left px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {peopleFiltered.map((p) => (
              <tr key={p.key} className="border-t border-gray-100">
                <td className="px-4 py-3 whitespace-nowrap">
                  <button onClick={() => setDetailPerson(p.key)} className="text-green-900 font-medium hover:underline">
                    {p.latest.name}
                  </button>
                </td>
                <td className="px-4 py-3 text-green-700 whitespace-nowrap"><span className="flex items-center gap-1"><Phone size={12} />{p.latest.phone}</span></td>
                <td className="px-4 py-3 text-green-700 whitespace-nowrap">{p.latest.email || "—"}</td>
                <td className="px-4 py-3 text-green-700 whitespace-nowrap">{p.latest.location || "—"}</td>
                <td className="px-4 py-3 text-green-700 whitespace-nowrap">{p.latest.nationality || "—"}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${statusBadgeClass(p.status)}`}>{statusLabel(p.status)}</span>
                </td>
                <td className="px-4 py-3 text-green-700">{p.bookings.length}</td>
                <td className="px-4 py-3 text-green-700">{p.hasUnlimited ? `${p.totalRemaining}+ (incl. unlimited)` : p.totalRemaining}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <button onClick={() => startNewBooking(p.latest)} className="text-green-500 hover:text-green-700" title="New booking for this customer">
                      <RefreshCw size={15} />
                    </button>
                    <button onClick={() => setDeletePersonTarget(p)} className="text-green-600 hover:text-red-500" title="Delete this customer and all their bookings">
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
        <Modal title={editingId ? "Edit customer" : lockedBooking ? `New booking — ${form.name}` : "Add customer"} onClose={() => setOpen(false)}>
          {!editingId && !lockedBooking && (
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

          {!editingId && !lockedBooking && source === "existing" && (
            <Field label="Select customer">
              <select className={inputCls} value={existingPersonKey} onChange={(e) => pickExistingPerson(e.target.value)}>
                <option value="" disabled>Choose a customer…</option>
                {uniquePeople.map((p) => (
                  <option key={p.key} value={p.key}>{p.latest.name} — {p.latest.phone}</option>
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
          <Field label="Nationality">
            <input
              className={inputCls}
              value={form.nationality}
              disabled={!editingId && source === "existing"}
              onChange={(e) => setForm({ ...form, nationality: e.target.value })}
              placeholder="e.g. Emirati, Indian, British"
            />
          </Field>
          <Field label="Joining date">
            <input type="date" className={inputCls} value={form.joinDate} onChange={(e) => setForm({ ...form, joinDate: e.target.value })} />
          </Field>

          <Field label="Class type">
            <select className={inputCls} value={form.classType} onChange={(e) => setForm({ ...form, classType: e.target.value })}>
              <option value="private">Private (trainer's tiered commission)</option>
              <option value="group">Group (flat 10% commission)</option>
            </select>
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
              <input type="number" className={inputCls} value={form.numberOfClasses} onChange={(e) => setClassesFor(e.target.value)} />
            </Field>
          )}
          {!form.unlimited && (
            <Field label="Free classes (bonus, added to total — no charge)">
              <input type="number" className={inputCls} value={form.freeClasses} onChange={(e) => setFreeClassesFor(e.target.value)} />
            </Field>
          )}
          {!form.unlimited && editingId && (
            <Field label="Correction to remaining classes (+/-)">
              <input
                type="number"
                className={inputCls}
                value={form.remainingAdjustment}
                onChange={(e) => setForm({ ...form, remainingAdjustment: e.target.value })}
              />
              <p className="text-[11px] text-green-600 mt-1">
                Remaining is normally tracked automatically (subscribed − completed). Use this only to correct it — e.g. enter 2 to add 2 classes, or -1 to remove one.
              </p>
            </Field>
          )}
          <Field label={form.unlimited ? "Price per month (AED)" : "Price per class (AED)"}>
            <input type="number" className={inputCls} value={form.priceInput} onChange={(e) => setForm({ ...form, priceInput: e.target.value })} />
          </Field>

          <div className="flex items-center justify-between text-sm bg-green-50 text-green-700 rounded-md px-3 py-2 mb-1">
            <span>Subtotal</span>
            <span className="font-medium text-green-900">{AED(subtotal)}</span>
          </div>
          <div className="text-[11px] text-green-600 mb-3 min-h-[14px]">
            {!form.unlimited && Number(form.freeClasses) > 0 &&
              `Charged for ${form.numberOfClasses} classes + ${form.freeClasses} free = ${Number(form.numberOfClasses || 0) + Number(form.freeClasses || 0)} total classes.`}
          </div>

          <Field label="Tax charged?">
            <select className={inputCls} value={form.taxCharged ? "yes" : "no"} onChange={(e) => setForm({ ...form, taxCharged: e.target.value === "yes" })}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </Field>
          {form.taxCharged && (
            <Field label="Tax percentage (%)">
              <input type="number" className={inputCls} value={form.taxPercent} onChange={(e) => setForm({ ...form, taxPercent: e.target.value })} />
            </Field>
          )}

          <div className="flex items-center justify-between text-sm bg-green-50 text-green-700 rounded-md px-3 py-2 mb-3">
            <span>Grand total{form.taxCharged ? ` (incl. ${form.taxPercent}% tax)` : ""}</span>
            <span className="font-serif text-lg text-green-900">{AED(grandTotal)}</span>
          </div>

          <Field label="Payment method">
            <select className={inputCls} value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}>
              <option value="cash">Cash</option>
              <option value="online">Online</option>
            </select>
          </Field>
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="block text-xs text-green-700">Amount received now (AED)</span>
              <button type="button" onClick={markPaidInFull} className="text-green-600 hover:text-green-900 underline text-[11px]">
                Mark paid in full
              </button>
            </div>
            <input type="number" className={inputCls} value={form.amountPaid} onChange={(e) => setForm({ ...form, amountPaid: e.target.value })} />
          </div>

          <div className={`flex items-center justify-between text-sm rounded-md px-3 py-2 mb-3 ${pendingAmount > 0 ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"}`}>
            <span>Pending amount</span>
            <span className="font-medium">{AED(pendingAmount)}</span>
          </div>
          <div className="text-[11px] text-green-600 mb-3">Payment date defaults to the joining date above ({form.joinDate}).</div>

          <button onClick={submit} className="w-full bg-green-500 text-white rounded-md py-2 text-sm mt-2 hover:bg-green-600">
            {editingId ? "Save changes" : "Save customer"}
          </button>
        </Modal>
      )}

      {deleteBookingTarget && (
        <Modal title="Delete this booking?" onClose={() => setDeleteBookingTarget(null)}>
          <p className="text-sm text-green-700 mb-1">
            <span className="font-medium text-green-900">{deleteBookingTarget.name}</span>
          </p>
          <p className="text-sm text-green-700 mb-5">
            {deleteBookingTarget.classType === "group" ? "Group" : "Private"} — {deleteBookingTarget.unlimited ? "Unlimited" : `${deleteBookingTarget.numberOfClasses} classes`}, joined {deleteBookingTarget.joined}
          </p>
          <p className="text-xs text-green-600 mb-5">
            This will delete this booking along with its payment record and any of the customer's scheduled or completed classes tied to it. This can't be undone.
          </p>
          <div className="flex gap-2">
            <button onClick={() => setDeleteBookingTarget(null)} className="flex-1 border border-green-100 text-green-700 rounded-md py-2 text-sm hover:bg-green-50">
              Keep booking
            </button>
            <button onClick={confirmDeleteBooking} className="flex-1 bg-red-500 text-white rounded-md py-2 text-sm hover:bg-red-600">
              Yes, delete
            </button>
          </div>
        </Modal>
      )}

      {deletePersonTarget && (
        <Modal title="Delete this customer?" onClose={() => setDeletePersonTarget(null)}>
          <p className="text-sm text-green-700 mb-1">
            <span className="font-medium text-green-900">{deletePersonTarget.latest.name}</span>
          </p>
          <p className="text-sm text-green-700 mb-5">
            {deletePersonTarget.bookings.length} booking{deletePersonTarget.bookings.length === 1 ? "" : "s"}
          </p>
          <p className="text-xs text-green-600 mb-5">
            This will delete every one of this customer's bookings, their full payment history, and any of their scheduled or completed classes on the calendar. This can't be undone.
          </p>
          <div className="flex gap-2">
            <button onClick={() => setDeletePersonTarget(null)} className="flex-1 border border-green-100 text-green-700 rounded-md py-2 text-sm hover:bg-green-50">
              Keep customer
            </button>
            <button onClick={confirmDeletePerson} className="flex-1 bg-red-500 text-white rounded-md py-2 text-sm hover:bg-red-600">
              Yes, delete everything
            </button>
          </div>
        </Modal>
      )}

      {detailPerson && (() => {
        const person = allPeople.find((p) => p.key === detailPerson);
        if (!person) return null;
        const bookingIds = new Set(person.bookings.map((b) => b.id));
        const personPayments = payments.filter((p) => bookingIds.has(p.customerId)).sort((a, b) => b.date.localeCompare(a.date));

        const editBooking = (b) => {
          setDetailPerson(null);
          startEdit(b);
        };
        const deleteBooking = (b) => {
          setDeleteBookingTarget(b);
        };
        const addBooking = () => {
          setDetailPerson(null);
          startNewBooking(person.latest);
        };
        const bookClass = () => {
          setDetailPerson(null);
          onBookCustomer?.(person.latest.id);
        };

        return (
          <Modal title={person.latest.name} onClose={() => setDetailPerson(null)} wide>
            <div className="mb-4 space-y-1 text-sm text-green-700">
              <div className="flex items-center gap-1"><Phone size={12} />{person.latest.phone}</div>
              {person.latest.email && <div>{person.latest.email}</div>}
              {person.latest.location && <div className="flex items-center gap-1"><MapPin size={12} />{person.latest.location}</div>}
              {person.latest.nationality && <div>{person.latest.nationality}</div>}
            </div>

            <Field label="Status">
              <select className={inputCls} value={person.status} onChange={(e) => updatePersonStatus(person.key, e.target.value)}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="frozen">Frozen</option>
                <option value="discontinued">Discontinued</option>
              </select>
            </Field>

            <div className="flex items-center justify-between mt-5 mb-2">
              <h4 className="font-medium text-green-900 text-sm">Booking history</h4>
              <div className="flex items-center gap-2">
                <button onClick={bookClass} className="flex items-center gap-1 text-xs bg-green-700 text-white px-2.5 py-1.5 rounded-md hover:bg-green-800">
                  <CalendarDays size={12} /> Book a class
                </button>
                <button onClick={addBooking} className="flex items-center gap-1 text-xs text-green-700 border border-green-100 px-2.5 py-1.5 rounded-md hover:bg-green-50">
                  <Plus size={12} /> New booking
                </button>
              </div>
            </div>
            <div className="overflow-x-auto mb-6 border border-gray-100 rounded-md">
              <table className="w-full text-sm min-w-[680px]">
                <thead className="bg-green-50 text-green-700 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="text-left px-3 py-2">Type</th>
                    <th className="text-left px-3 py-2">Subscribed</th>
                    <th className="text-left px-3 py-2">Completed</th>
                    <th className="text-left px-3 py-2">Scheduled</th>
                    <th className="text-left px-3 py-2">Remaining</th>
                    <th className="text-left px-3 py-2">Price</th>
                    <th className="text-left px-3 py-2">Joined</th>
                    <th className="text-left px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {person.bookings.map((b) => (
                    <tr key={b.id} className="border-t border-gray-100">
                      <td className="px-3 py-2 text-green-700 whitespace-nowrap">{b.classType === "group" ? "Group" : "Private"}</td>
                      <td className="px-3 py-2 text-green-700 whitespace-nowrap">
                        {b.unlimited ? "Unlimited" : b.numberOfClasses}{b.freeClasses ? ` (+${b.freeClasses} free)` : ""}
                      </td>
                      <td className="px-3 py-2 text-green-700">{completedCountFor(b.id)}</td>
                      <td className="px-3 py-2 text-green-700">{scheduledCountFor(b.id)}</td>
                      <td className="px-3 py-2 text-green-700">{remainingCountFor(b)}</td>
                      <td className="px-3 py-2 text-green-700 whitespace-nowrap">{AED(b.perClassPrice || 0)}{b.unlimited ? "/class" : ""}</td>
                      <td className="px-3 py-2 text-green-700 whitespace-nowrap">{b.joined}</td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2.5">
                          <button onClick={() => editBooking(b)} className="text-green-600 hover:text-green-900" title="Edit this booking">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => deleteBooking(b)} className="text-green-600 hover:text-red-500" title="Delete this booking">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 className="font-medium text-green-900 text-sm mb-2">Payment history</h4>
            <div className="overflow-x-auto border border-gray-100 rounded-md">
              <table className="w-full text-sm min-w-[480px]">
                <thead className="bg-green-50 text-green-700 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="text-left px-3 py-2">Note</th>
                    <th className="text-left px-3 py-2">Total</th>
                    <th className="text-left px-3 py-2">Paid</th>
                    <th className="text-left px-3 py-2">Pending</th>
                    <th className="text-left px-3 py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {personPayments.length === 0 && (
                    <tr><td colSpan={5} className="px-3 py-3 text-green-600 text-center text-xs">No payments logged.</td></tr>
                  )}
                  {personPayments.map((p) => (
                    <tr key={p.id} className="border-t border-gray-100">
                      <td className="px-3 py-2 text-green-700 whitespace-nowrap">{p.note}</td>
                      <td className="px-3 py-2 text-green-700 whitespace-nowrap">{AED(p.grandTotal)}</td>
                      <td className="px-3 py-2 text-green-700 whitespace-nowrap">{AED(p.amountPaid)}</td>
                      <td className={`px-3 py-2 whitespace-nowrap ${p.pendingAmount > 0 ? "text-red-600 font-medium" : "text-green-700"}`}>{AED(p.pendingAmount || 0)}</td>
                      <td className="px-3 py-2 text-green-700 whitespace-nowrap">{p.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Modal>
        );
      })()}

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
          <div className="overflow-auto" style={{ maxHeight: "360px" }}>
          <table className="w-full text-sm min-w-[860px]">
            <thead className="bg-green-50 text-green-700 text-xs uppercase tracking-wide sticky top-0 z-10">
              <tr>
                <th className="text-left px-4 py-3">Customer</th>
                <th className="text-left px-4 py-3">Note</th>
                <th className="text-left px-4 py-3">Method</th>
                <th className="text-left px-4 py-3">Total</th>
                <th className="text-left px-4 py-3">Paid</th>
                <th className="text-left px-4 py-3">Pending</th>
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-left px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {sortedPayments.map((p) => (
                <tr key={p.id} className="border-t border-gray-100">
                  <td className="px-4 py-3 text-green-900 font-medium whitespace-nowrap">{nameOf(p.customerId)}</td>
                  <td className="px-4 py-3 text-green-700 whitespace-nowrap">{p.note}</td>
                  <td className="px-4 py-3 text-green-700 whitespace-nowrap">{p.paymentMethod === "online" ? "Online" : "Cash"}</td>
                  <td className="px-4 py-3 text-green-700 flex items-center gap-1 whitespace-nowrap"><Wallet size={12} />{AED(p.grandTotal)}</td>
                  <td className="px-4 py-3 text-green-700 whitespace-nowrap">{AED(p.amountPaid)}</td>
                  <td className={`px-4 py-3 whitespace-nowrap ${p.pendingAmount > 0 ? "text-red-600 font-medium" : "text-green-700"}`}>{AED(p.pendingAmount || 0)}</td>
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

function Trainers({ trainers, setTrainers, classes, customers, timeOff, setTimeOff, onViewSchedule }) {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const blankForm = { name: "", cred: "", baseSalary: 2000, commissionRate: 0.2, monthlyTarget: 130, authEmail: "" };
  const [form, setForm] = useState(blankForm);
  const [detailTrainerId, setDetailTrainerId] = useState(null);
  const [deleteTrainerTarget, setDeleteTrainerTarget] = useState(null);

  const [timeOffOpen, setTimeOffOpen] = useState(false);
  const blankTimeOffForm = { startDate: todayISO(), endDate: todayISO(), reason: "" };
  const [timeOffForm, setTimeOffForm] = useState(blankTimeOffForm);

  const startAdd = () => {
    setEditingId(null);
    setForm(blankForm);
    setOpen(true);
  };

  const startEdit = (t) => {
    setEditingId(t.id);
    setForm({ name: t.name, cred: t.cred, baseSalary: t.baseSalary, commissionRate: t.commissionRate, monthlyTarget: t.monthlyTarget, authEmail: t.authEmail || "" });
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

  const removeTrainer = (id) => {
    setTrainers((ts) => ts.filter((t) => t.id !== id));
    setTimeOff((tos) => tos.filter((o) => o.trainerId !== id));
  };
  const confirmDeleteTrainer = () => {
    if (deleteTrainerTarget) removeTrainer(deleteTrainerTarget.id);
    setDeleteTrainerTarget(null);
  };

  const addTimeOff = (trainerId) => {
    if (!timeOffForm.startDate || !timeOffForm.endDate) return;
    setTimeOff((tos) => [...tos, { id: uid("off"), trainerId, ...timeOffForm }]);
    setTimeOffForm(blankTimeOffForm);
    setTimeOffOpen(false);
  };
  const removeTimeOff = (id) => setTimeOff((tos) => tos.filter((o) => o.id !== id));

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
              <button onClick={() => setDetailTrainerId(t.id)} className="font-medium text-green-900 hover:underline text-left">
                {t.name}
              </button>
              <div className="flex items-center gap-2.5">
                <button onClick={() => startEdit(t)} className="text-green-600 hover:text-green-900" title="Edit trainer">
                  <Pencil size={14} />
                </button>
                <button onClick={() => setDeleteTrainerTarget(t)} className="text-green-600 hover:text-red-500" title="Delete trainer">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="text-xs text-green-600 mb-3">{t.cred}</div>
            <div className="grid grid-cols-2 gap-y-1 text-sm text-green-700">
              <span>Base salary</span><span className="text-green-900">{AED(t.baseSalary)}/mo</span>
              <span>Base commission</span><span className="text-green-900">{Math.round(t.commissionRate * 100)}% (≤50/mo) · 30% (51–99) · 40% (100+)</span>
              <span>Monthly target</span><span className="text-green-900">{t.monthlyTarget} hours</span>
            </div>
            <div className="text-[11px] text-green-600 mt-2">Group classes always pay a flat 10%, regardless of volume.</div>
            {t.authEmail ? (
              <div className="flex items-center gap-1 text-[11px] text-green-700 mt-2">
                <UserRound size={11} /> Portal access: {t.authEmail}
              </div>
            ) : (
              <div className="text-[11px] text-green-500 mt-2">No portal login set up</div>
            )}
            <button
              onClick={() => onViewSchedule?.(t.id)}
              className="flex items-center gap-1 text-xs text-green-700 border border-green-100 rounded-md px-2.5 py-1.5 mt-3 hover:bg-green-50"
            >
              <CalendarDays size={12} /> View full schedule
            </button>
          </Card>
        ))}
      </div>

      {deleteTrainerTarget && (
        <Modal title="Delete this trainer?" onClose={() => setDeleteTrainerTarget(null)}>
          <p className="text-sm text-green-700 mb-5">
            <span className="font-medium text-green-900">{deleteTrainerTarget.name}</span> will be removed, along with any time off booked for them. Their existing classes on the schedule are kept as-is.
          </p>
          <div className="flex gap-2">
            <button onClick={() => setDeleteTrainerTarget(null)} className="flex-1 border border-green-100 text-green-700 rounded-md py-2 text-sm hover:bg-green-50">
              Keep trainer
            </button>
            <button onClick={confirmDeleteTrainer} className="flex-1 bg-red-500 text-white rounded-md py-2 text-sm hover:bg-red-600">
              Yes, delete
            </button>
          </div>
        </Modal>
      )}

      {detailTrainerId && (() => {
        const trainer = trainers.find((t) => t.id === detailTrainerId);
        if (!trainer) return null;
        const nameOfCustomer = (id) => customers.find((c) => c.id === id)?.name || "—";
        const trainerClasses = [...classes]
          .filter((c) => c.trainerId === detailTrainerId)
          .sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));
        const scheduled = trainerClasses.filter((c) => c.status === "scheduled");
        const completed = trainerClasses.filter((c) => c.status === "completed");
        const myTimeOff = [...timeOff].filter((o) => o.trainerId === detailTrainerId).sort((a, b) => b.startDate.localeCompare(a.startDate));

        const sessionTable = (rows, emptyLabel) => (
          <div className="overflow-x-auto border border-gray-100 rounded-md mb-5">
            <table className="w-full text-sm min-w-[420px]">
              <thead className="bg-green-50 text-green-700 text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left px-3 py-2">Date</th>
                  <th className="text-left px-3 py-2">Time</th>
                  <th className="text-left px-3 py-2">Customer</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr><td colSpan={3} className="px-3 py-3 text-green-600 text-center text-xs">{emptyLabel}</td></tr>
                )}
                {rows.map((c) => (
                  <tr key={c.id} className="border-t border-gray-100">
                    <td className="px-3 py-2 text-green-700 whitespace-nowrap">{c.date}</td>
                    <td className="px-3 py-2 text-green-700 whitespace-nowrap">{formatTime12h(c.time)}</td>
                    <td className="px-3 py-2 text-green-700 whitespace-nowrap">{nameOfCustomer(c.customerId)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

        return (
          <Modal title={`${trainer.name} — sessions`} onClose={() => setDetailTrainerId(null)} wide>
            <button
              onClick={() => { setDetailTrainerId(null); onViewSchedule?.(detailTrainerId); }}
              className="flex items-center gap-1 text-xs bg-green-700 text-white rounded-md px-2.5 py-1.5 mb-5 hover:bg-green-800"
            >
              <CalendarDays size={12} /> View in Day / Week / Month calendar
            </button>

            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-green-900 text-sm">Time off</h4>
              <button onClick={() => setTimeOffOpen(true)} className="flex items-center gap-1 text-xs text-green-700 border border-green-100 px-2.5 py-1.5 rounded-md hover:bg-green-50">
                <Plus size={12} /> Book time off
              </button>
            </div>
            <div className="overflow-x-auto border border-gray-100 rounded-md mb-6">
              <table className="w-full text-sm min-w-[420px]">
                <thead className="bg-green-50 text-green-700 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="text-left px-3 py-2">From</th>
                    <th className="text-left px-3 py-2">To</th>
                    <th className="text-left px-3 py-2">Reason</th>
                    <th className="text-left px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {myTimeOff.length === 0 && (
                    <tr><td colSpan={4} className="px-3 py-3 text-green-600 text-center text-xs">No time off booked.</td></tr>
                  )}
                  {myTimeOff.map((o) => (
                    <tr key={o.id} className="border-t border-gray-100">
                      <td className="px-3 py-2 text-green-700 whitespace-nowrap">{o.startDate}</td>
                      <td className="px-3 py-2 text-green-700 whitespace-nowrap">{o.endDate}</td>
                      <td className="px-3 py-2 text-green-700">{o.reason || "—"}</td>
                      <td className="px-3 py-2">
                        <button onClick={() => removeTimeOff(o.id)} className="text-green-600 hover:text-red-500" title="Remove this time off">
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {timeOffOpen && (
              <div className="border border-green-100 rounded-md p-3 mb-6 bg-green-50 space-y-3">
                <Field label="From">
                  <input type="date" className={inputCls} value={timeOffForm.startDate} onChange={(e) => setTimeOffForm({ ...timeOffForm, startDate: e.target.value })} />
                </Field>
                <Field label="To">
                  <input type="date" className={inputCls} value={timeOffForm.endDate} onChange={(e) => setTimeOffForm({ ...timeOffForm, endDate: e.target.value })} />
                </Field>
                <Field label="Reason (optional)">
                  <input className={inputCls} value={timeOffForm.reason} onChange={(e) => setTimeOffForm({ ...timeOffForm, reason: e.target.value })} placeholder="e.g. Annual leave" />
                </Field>
                <div className="flex gap-2">
                  <button onClick={() => setTimeOffOpen(false)} className="flex-1 border border-green-200 text-green-700 rounded-md py-2 text-sm hover:bg-white">
                    Cancel
                  </button>
                  <button onClick={() => addTimeOff(detailTrainerId)} className="flex-1 bg-green-700 text-white rounded-md py-2 text-sm hover:bg-green-800">
                    Save
                  </button>
                </div>
              </div>
            )}

            <h4 className="font-medium text-green-900 text-sm mb-2">Scheduled ({scheduled.length})</h4>
            {sessionTable(scheduled, "No upcoming sessions.")}
            <h4 className="font-medium text-green-900 text-sm mb-2">Completed ({completed.length})</h4>
            {sessionTable(completed, "No completed sessions yet.")}
          </Modal>
        );
      })()}

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
          <Field label="Monthly target (hours)">
            <input type="number" className={inputCls} value={form.monthlyTarget} onChange={(e) => setForm({ ...form, monthlyTarget: Number(e.target.value) })} />
          </Field>
          <Field label="Portal login email (optional)">
            <input
              type="email"
              className={inputCls}
              value={form.authEmail}
              onChange={(e) => setForm({ ...form, authEmail: e.target.value })}
              placeholder="trainer@example.com"
            />
          </Field>
          <p className="text-[11px] text-green-600 mb-3">
            If set, this trainer can sign in with this email (create the account in Supabase → Authentication → Users) and will see only their own schedule — no customers, payments, or other trainers' data.
          </p>
          <button onClick={submit} className="w-full bg-green-500 text-white rounded-md py-2 text-sm mt-2 hover:bg-green-600">
            {editingId ? "Save changes" : "Save trainer"}
          </button>
        </Modal>
      )}
    </div>
  );
}

const EXPENSE_CATEGORIES = ["Website", "Branding", "License", "Travel", "Visa", "Marketing", "Accomodation", "Rent", "General", "Phone", "Transport", "Entertainment", "Car", "Fuel", "Investment", "Utilities", "Equipment", "Supplies", "Salaries", "Other"];
const EXPENSE_PARTNERS = ["Jabir", "Rehana", "Zamzam", "Other"];

function Expenses({ expenses, setExpenses }) {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const blankForm = { date: todayISO(), category: "General", customCategory: "", vendor: "", description: "", amount: "", paymentMethod: "online", paidBy: "Jabir", customPaidBy: "" };
  const [form, setForm] = useState(blankForm);

  const [mode, setMode] = useState("month");
  const [month, setMonth] = useState(thisMonthISO());
  const [startDate, setStartDate] = useState(monthStartISO());
  const [endDate, setEndDate] = useState(monthEndISO());
  const inPeriod = (dateStr) => (mode === "month" ? dateStr.startsWith(month) : dateStr >= startDate && dateStr <= endDate);
  const periodExpenses = expenses.filter((e) => inPeriod(e.date));

  const startAdd = () => {
    setEditingId(null);
    setForm(blankForm);
    setOpen(true);
  };

  const startEdit = (e) => {
    setEditingId(e.id);
    const known = EXPENSE_CATEGORIES.includes(e.category);
    const knownPartner = EXPENSE_PARTNERS.includes(e.paidBy);
    setForm({
      date: e.date,
      category: known ? e.category : "Other",
      customCategory: known ? "" : e.category,
      vendor: e.vendor || "",
      description: e.description || "",
      amount: e.amount,
      paymentMethod: e.paymentMethod || "cash",
      paidBy: knownPartner ? e.paidBy : "Other",
      customPaidBy: knownPartner ? "" : (e.paidBy || ""),
    });
    setOpen(true);
  };

  const submit = () => {
    if (!form.amount) return;
    const category = form.category === "Other" ? (form.customCategory.trim() || "Other") : form.category;
    const paidBy = form.paidBy === "Other" ? (form.customPaidBy.trim() || "Other") : form.paidBy;
    const payload = {
      date: form.date || todayISO(),
      category,
      vendor: form.vendor,
      description: form.description,
      amount: Number(form.amount) || 0,
      paymentMethod: form.paymentMethod,
      paidBy,
    };
    if (editingId) {
      setExpenses((es) => es.map((e) => (e.id === editingId ? { ...e, ...payload } : e)));
    } else {
      setExpenses((es) => [...es, { id: uid("e"), ...payload }]);
    }
    setForm(blankForm);
    setOpen(false);
  };

  const removeExpense = (id) => setExpenses((es) => es.filter((e) => e.id !== id));

  const sortedExpenses = [...periodExpenses].sort((a, b) => b.date.localeCompare(a.date));
  const total = periodExpenses.reduce((s, e) => s + (Number(e.amount) || 0), 0);

  const categoryMap = {};
  periodExpenses.forEach((e) => {
    categoryMap[e.category] = (categoryMap[e.category] || 0) + (Number(e.amount) || 0);
  });
  const categoryBreakdown = Object.entries(categoryMap).sort((a, b) => b[1] - a[1]);

  const partnerMap = {};
  periodExpenses.forEach((e) => {
    const key = e.paidBy || "Unspecified";
    partnerMap[key] = (partnerMap[key] || 0) + (Number(e.amount) || 0);
  });
  const partnerBreakdown = Object.entries(partnerMap).sort((a, b) => b[1] - a[1]);

  const exportExpensesCSV = () => {
    downloadCSV(
      `click-a-yoga-expenses-${new Date().toISOString().slice(0, 10)}.csv`,
      ["Date", "Category", "Paid By", "Vendor", "Description", "Amount", "Payment Method"],
      sortedExpenses.map((e) => [e.date, e.category, e.paidBy || "", e.vendor || "", e.description || "", e.amount, e.paymentMethod === "online" ? "Online" : "Cash"])
    );
  };

  return (
    <div>
      <SectionTitle
        eyebrow="Spending"
        title="Expenses"
        action={
          <div className="flex flex-wrap items-center gap-2">
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
            <button onClick={startAdd} className="flex items-center gap-1.5 bg-green-700 text-white text-sm px-3 py-2 rounded-md hover:bg-green-800">
              <Plus size={14} /> Add expense
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-4">
          <div className="text-[11px] uppercase tracking-wide text-green-600">Total expenses</div>
          <div className="text-2xl font-serif text-green-900 mt-1">{AED(total)}</div>
        </Card>
        <Card className="p-4">
          <div className="text-[11px] uppercase tracking-wide text-green-600">Entries</div>
          <div className="text-2xl font-serif text-green-900 mt-1">{periodExpenses.length}</div>
        </Card>
        <Card className="p-4">
          <div className="text-[11px] uppercase tracking-wide text-green-600">Top category</div>
          <div className="text-lg font-serif text-green-900 mt-1">{categoryBreakdown[0]?.[0] || "—"}</div>
        </Card>
      </div>

      <SectionTitle eyebrow="Breakdown" title="By category" />
      <Card className="p-5 mb-8">
        {categoryBreakdown.length ? (
          <div className="space-y-2">
            {categoryBreakdown.map(([label, amount]) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <span className="text-green-700">{label}</span>
                <span className="font-medium text-green-900">{AED(amount)}</span>
              </div>
            ))}
            <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-2 mt-2">
              <span className="font-medium text-green-900">Total</span>
              <span className="font-serif text-lg text-green-900">{AED(total)}</span>
            </div>
          </div>
        ) : (
          <div className="text-sm text-green-600">No expenses logged for this period.</div>
        )}
      </Card>

      <SectionTitle eyebrow="Breakdown" title="By partner" />
      <Card className="p-5 mb-8">
        {partnerBreakdown.length ? (
          <div className="space-y-2">
            {partnerBreakdown.map(([label, amount]) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <span className="text-green-700">{label}</span>
                <span className="font-medium text-green-900">{AED(amount)}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-green-600">No expenses logged for this period.</div>
        )}
      </Card>

      <SectionTitle
        eyebrow="Ledger"
        title="All expenses"
        action={
          <button
            onClick={exportExpensesCSV}
            className="flex items-center gap-1.5 text-green-700 text-sm px-3 py-2 rounded-md border border-green-100 hover:bg-green-50"
            title="Download expenses as Excel/CSV"
          >
            <Download size={14} /> Export
          </button>
        }
      />
      <Card className="overflow-hidden">
        <div className="overflow-auto" style={{ maxHeight: "420px" }}>
        <table className="w-full text-sm min-w-[900px]">
          <thead className="bg-green-50 text-green-700 text-xs uppercase tracking-wide sticky top-0 z-10">
            <tr>
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Paid By</th>
              <th className="text-left px-4 py-3">Vendor</th>
              <th className="text-left px-4 py-3">Description</th>
              <th className="text-left px-4 py-3">Method</th>
              <th className="text-left px-4 py-3">Amount</th>
              <th className="text-left px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {sortedExpenses.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-6 text-center text-sm text-green-600">No expenses logged for this period.</td></tr>
            )}
            {sortedExpenses.map((e) => (
              <tr key={e.id} className="border-t border-gray-100">
                <td className="px-4 py-3 text-green-900 whitespace-nowrap">{e.date}</td>
                <td className="px-4 py-3 text-green-700 whitespace-nowrap">{e.category}</td>
                <td className="px-4 py-3 text-green-700 whitespace-nowrap">{e.paidBy || "—"}</td>
                <td className="px-4 py-3 text-green-700 whitespace-nowrap">{e.vendor || "—"}</td>
                <td className="px-4 py-3 text-green-700">{e.description || "—"}</td>
                <td className="px-4 py-3 text-green-700 whitespace-nowrap">{e.paymentMethod === "online" ? "Online" : "Cash"}</td>
                <td className="px-4 py-3 text-green-900 font-medium whitespace-nowrap">{AED(e.amount)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <button onClick={() => startEdit(e)} className="text-green-600 hover:text-green-900" title="Edit expense">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => removeExpense(e.id)} className="text-green-600 hover:text-red-500" title="Delete expense">
                      <Trash2 size={14} />
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
        <Modal title={editingId ? "Edit expense" : "Add expense"} onClose={() => setOpen(false)}>
          <Field label="Date">
            <input type="date" className={inputCls} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </Field>
          <Field label="Category">
            <select className={inputCls} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {EXPENSE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          {form.category === "Other" && (
            <Field label="Custom category name">
              <input className={inputCls} value={form.customCategory} onChange={(e) => setForm({ ...form, customCategory: e.target.value })} placeholder="e.g. Insurance" />
            </Field>
          )}
          <Field label="Paid by">
            <select className={inputCls} value={form.paidBy} onChange={(e) => setForm({ ...form, paidBy: e.target.value })}>
              {EXPENSE_PARTNERS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </Field>
          {form.paidBy === "Other" && (
            <Field label="Custom name">
              <input className={inputCls} value={form.customPaidBy} onChange={(e) => setForm({ ...form, customPaidBy: e.target.value })} placeholder="Who paid this?" />
            </Field>
          )}
          <Field label="Vendor / paid to (optional)">
            <input className={inputCls} value={form.vendor} onChange={(e) => setForm({ ...form, vendor: e.target.value })} placeholder="e.g. DEWA, Landlord" />
          </Field>
          <Field label="Description">
            <input className={inputCls} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="What was this for?" />
          </Field>
          <Field label="Amount (AED)">
            <input type="number" className={inputCls} value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
          </Field>
          <Field label="Payment method">
            <select className={inputCls} value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}>
              <option value="cash">Cash</option>
              <option value="online">Online</option>
            </select>
          </Field>
          <button onClick={submit} className="w-full bg-green-500 text-white rounded-md py-2 text-sm mt-2 hover:bg-green-600">
            {editingId ? "Save changes" : "Save expense"}
          </button>
        </Modal>
      )}
    </div>
  );
}

function Schedule({ classes, setClasses, trainers, customers, setCustomers, timeOff, prefillCustomerId, onPrefillConsumed, prefillTrainerFilter, onTrainerPrefillConsumed }) {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const activeCustomers = customers.filter((c) => (c.status || "active") === "active");
  const defaultCustomerId = activeCustomers[0]?.id || customers[0]?.id;
  const blankForm = { date: todayISO(), time: "07:00", endTime: "08:00", trainerId: trainers[0]?.id, customerId: defaultCustomerId };
  const [form, setForm] = useState(blankForm);
  const [extraSessions, setExtraSessions] = useState([]); // additional {date, time, endTime} rows for batch-booking
  const [batchSummary, setBatchSummary] = useState("");
  const [view, setView] = useState("list");
  const [sortDir, setSortDir] = useState("asc");
  const [viewMonth, setViewMonth] = useState({ year: 2026, month: 7 }); // August 2026, 0-indexed
  const [weekStart, setWeekStart] = useState(mondayOfThisWeekISO());
  const [dayDate, setDayDate] = useState(todayISO());
  const [customerFilter, setCustomerFilter] = useState("");
  const [trainerFilter, setTrainerFilter] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");
  const [customerPickerOpen, setCustomerPickerOpen] = useState(false);

  const nameOf = (list, id) => list.find((x) => x.id === id)?.name || "—";
  // A stable color per trainer (by their position in the trainers list) so calendar
  // chips are visually distinguishable by trainer at a glance, not just by status.
  const TRAINER_PALETTE = [
    { bg: "bg-blue-100", text: "text-blue-700", bar: "border-blue-500" },
    { bg: "bg-purple-100", text: "text-purple-700", bar: "border-purple-500" },
    { bg: "bg-amber-100", text: "text-amber-700", bar: "border-amber-500" },
    { bg: "bg-pink-100", text: "text-pink-700", bar: "border-pink-500" },
    { bg: "bg-teal-100", text: "text-teal-700", bar: "border-teal-500" },
    { bg: "bg-indigo-100", text: "text-indigo-700", bar: "border-indigo-500" },
    { bg: "bg-rose-100", text: "text-rose-700", bar: "border-rose-500" },
    { bg: "bg-cyan-100", text: "text-cyan-700", bar: "border-cyan-500" },
  ];
  const trainerColor = (trainerId) => {
    const idx = trainers.findIndex((t) => t.id === trainerId);
    return TRAINER_PALETTE[idx >= 0 ? idx % TRAINER_PALETTE.length : 0];
  };
  const locationOf = (customerId) => customers.find((c) => c.id === customerId)?.location || "—";
  const firstName = (name) => name.replace(/^Dr\.\s*/i, "").split(" ")[0];

  // Same computed-capacity model as the Customers tab: never a stored number, always
  // derived live from the actual schedule, so it can't drift out of sync.
  const totalSubscribed = (b) => (b.unlimited ? Infinity : (Number(b.numberOfClasses) || 0) + (Number(b.freeClasses) || 0) + (Number(b.remainingAdjustment) || 0));
  const completedCountFor = (bookingId) => classes.filter((c) => c.customerId === bookingId && c.status === "completed").length;
  const scheduledCountFor = (bookingId) => classes.filter((c) => c.customerId === bookingId && c.status === "scheduled").length;
  const unscheduledCountFor = (b) => (b.unlimited ? Infinity : Math.max(0, totalSubscribed(b) - completedCountFor(b.id) - scheduledCountFor(b.id)));

  // The customer picker only offers active customers, but if editing (or a prefilled
  // booking) points at a now-inactive one, that one stays selectable too so the
  // current assignment always displays correctly.
  const selectableCustomers = customers.filter(
    (c) => (c.status || "active") === "active" || c.id === form.customerId
  );
  const pickerLabel = (c) => {
    if (c.unlimited) return `${c.name} — Unlimited`;
    const editingThisOne = editingId && classes.find((x) => x.id === editingId)?.customerId === c.id;
    const bookable = unscheduledCountFor(c) + (editingThisOne ? 1 : 0);
    return `${c.name} — ${bookable} unscheduled left`;
  };
  const filteredCustomerOptions = customerSearch.trim()
    ? selectableCustomers.filter((c) => c.name.toLowerCase().includes(customerSearch.trim().toLowerCase()))
    : selectableCustomers;

  const filteredClasses = classes
    .filter((c) => !customerFilter.trim() || nameOf(customers, c.customerId).toLowerCase().includes(customerFilter.trim().toLowerCase()))
    .filter((c) => !trainerFilter || c.trainerId === trainerFilter);

  const exportSessionsCSV = () => {
    const rows = [...filteredClasses]
      .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
      .map((c) => [c.date, formatTime12h(c.time), nameOf(trainers, c.trainerId), nameOf(customers, c.customerId), locationOf(c.customerId), c.status]);
    downloadCSV(
      `click-a-yoga-sessions-${new Date().toISOString().slice(0, 10)}.csv`,
      ["Date", "Time", "Trainer", "Customer", "Location", "Status"],
      rows
    );
  };

  const startAdd = (presetDate) => {
    setEditingId(null);
    const next = presetDate ? { ...blankForm, date: presetDate } : blankForm;
    setForm(next);
    setExtraSessions([]);
    setBatchSummary("");
    setCustomerSearch(nameOf(customers, next.customerId));
    setOpen(true);
  };

  const startEdit = (c) => {
    setEditingId(c.id);
    const fallbackEnd = (() => {
      const [h, m] = c.time.split(":").map(Number);
      const total = h * 60 + m + 60;
      return `${String(Math.floor(total / 60) % 24).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
    })();
    setForm({ date: c.date, time: c.time, endTime: c.endTime || fallbackEnd, trainerId: c.trainerId, customerId: c.customerId });
    setExtraSessions([]);
    setBatchSummary("");
    setCustomerSearch(nameOf(customers, c.customerId));
    setOpen(true);
  };

  // Opened from a customer's detail view via "Book a class" — jumps here already
  // pointed at that specific customer/booking.
  useEffect(() => {
    if (!prefillCustomerId) return;
    setEditingId(null);
    setForm({ ...blankForm, customerId: prefillCustomerId });
    setExtraSessions([]);
    setBatchSummary("");
    setCustomerSearch(nameOf(customers, prefillCustomerId));
    setOpen(true);
    onPrefillConsumed?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefillCustomerId]);

  // Opened from a trainer's "View full schedule" button — filters every view here
  // down to just that trainer's sessions.
  useEffect(() => {
    if (!prefillTrainerFilter) return;
    setTrainerFilter(prefillTrainerFilter);
    onTrainerPrefillConsumed?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefillTrainerFilter]);

  // ----- Booking guards (apply to the primary session; batch rows are checked
  // individually inside submit()) -----
  // A trainer can't be double-booked with an overlapping time range on the same
  // day (excluding the session being edited, so saving an unrelated change to it
  // doesn't flag itself).
  const trainerConflict = classes.some(
    (c) =>
      c.id !== editingId &&
      c.trainerId === form.trainerId &&
      c.date === form.date &&
      rangesOverlap(parseHM(form.time), parseHM(form.endTime), parseHM(c.time), sessionEndMinutes(c))
  );
  // A customer can't be in two overlapping sessions either, regardless of trainer.
  const customerConflict = classes.some(
    (c) =>
      c.id !== editingId &&
      c.customerId === form.customerId &&
      c.date === form.date &&
      rangesOverlap(parseHM(form.time), parseHM(form.endTime), parseHM(c.time), sessionEndMinutes(c))
  );
  // A customer with no unscheduled classes left can't be booked — unless this is an
  // edit to their own existing session (not a new consumption of capacity).
  const customerOutOfClasses = (() => {
    const customer = customers.find((c) => c.id === form.customerId);
    if (!customer || customer.unlimited) return false;
    const original = editingId ? classes.find((c) => c.id === editingId) : null;
    const editingOwnSession = original && original.customerId === form.customerId;
    const bookable = unscheduledCountFor(customer) + (editingOwnSession ? 1 : 0);
    return bookable <= 0;
  })();
  // A trainer can't be booked on a day they've booked off.
  const trainerOnLeave = (timeOff || []).some(
    (o) => o.trainerId === form.trainerId && form.date >= o.startDate && form.date <= o.endDate
  );
  const canSubmit = !trainerConflict && !customerConflict && !customerOutOfClasses && !trainerOnLeave;

  // Previous/next session for whichever trainer + date/time is currently selected —
  // shown in the modal so staff can judge travel time between sessions.
  const trainerNeighborSessions = (() => {
    if (!form.trainerId) return { prev: null, next: null };
    const key = `${form.date}${form.time}`;
    const sameTrainer = classes
      .filter((c) => c.trainerId === form.trainerId && c.id !== editingId)
      .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    let prev = null;
    let next = null;
    for (const c of sameTrainer) {
      const k = `${c.date}${c.time}`;
      if (k < key) prev = c;
      if (k > key && !next) next = c;
    }
    return { prev, next };
  })();

  const addExtraSession = () => {
    setExtraSessions((rows) => [...rows, { date: form.date, time: form.time, endTime: form.endTime }]);
  };
  const updateExtraSession = (idx, patch) => {
    setExtraSessions((rows) => rows.map((r, i) => (i === idx ? { ...r, ...patch } : r)));
  };
  const removeExtraSession = (idx) => {
    setExtraSessions((rows) => rows.filter((_, i) => i !== idx));
  };

  const submit = () => {
    if (editingId) {
      if (!canSubmit) return;
      setClasses((cs) => cs.map((c) => (c.id === editingId ? { ...c, ...form } : c)));
      setOpen(false);
      return;
    }

    // New booking(s): the primary session plus any extra rows queued up, all for
    // the same trainer + customer. Each is validated independently — an overlapping
    // slot for the trainer or customer, a day the trainer's off, or running out of
    // unscheduled classes skips just that row rather than blocking the whole batch.
    const customer = customers.find((c) => c.id === form.customerId);
    const capacity = customer && !customer.unlimited ? unscheduledCountFor(customer) : Infinity;
    const candidates = [{ date: form.date, time: form.time, endTime: form.endTime }, ...extraSessions];
    const occupiedTrainer = []; // {date, start, end} already claimed in this batch, by trainer
    const occupiedCustomer = []; // same, by customer
    const toCreate = [];
    let skipped = 0;

    candidates.forEach(({ date, time, endTime }) => {
      if (!date || !time || !endTime) { skipped++; return; }
      const start = parseHM(time);
      const end = parseHM(endTime);
      if (end <= start) { skipped++; return; }

      const trainerBusy =
        classes.some((c) => c.trainerId === form.trainerId && c.date === date && rangesOverlap(start, end, parseHM(c.time), sessionEndMinutes(c))) ||
        occupiedTrainer.some((o) => o.date === date && rangesOverlap(start, end, o.start, o.end));
      const customerBusy =
        classes.some((c) => c.customerId === form.customerId && c.date === date && rangesOverlap(start, end, parseHM(c.time), sessionEndMinutes(c))) ||
        occupiedCustomer.some((o) => o.date === date && rangesOverlap(start, end, o.start, o.end));
      const onLeave = (timeOff || []).some((o) => o.trainerId === form.trainerId && date >= o.startDate && date <= o.endDate);

      if (trainerBusy || customerBusy || onLeave || toCreate.length >= capacity) { skipped++; return; }
      occupiedTrainer.push({ date, start, end });
      occupiedCustomer.push({ date, start, end });
      toCreate.push({ id: uid("cl"), status: "scheduled", date, time, endTime, trainerId: form.trainerId, customerId: form.customerId });
    });

    if (toCreate.length) {
      setClasses((cs) => [...cs, ...toCreate]);
    }

    if (candidates.length > 1 || skipped > 0) {
      setBatchSummary(
        `Added ${toCreate.length} session${toCreate.length === 1 ? "" : "s"}${skipped ? `, skipped ${skipped} (overlap, trainer off, or no unscheduled classes left)` : ""}.`
      );
    }

    if (toCreate.length > 0 && skipped === 0) {
      setOpen(false);
    }
    // If anything was skipped, keep the dialog open so staff can see the summary
    // and adjust before closing — closing happens via the Close button in that case.
  };

  // No separate "refund" bookkeeping needed — remaining/unscheduled counts are
  // always computed live from the classes array, so deleting one just updates them.
  const removeClass = (id) => {
    setClasses((cs) => cs.filter((c) => c.id !== id));
  };

  // "Cancel session" always asks for confirmation first, then deletes the class
  // (refunding the customer's class via removeClass) rather than keeping a
  // separate "cancelled" status cluttering the calendar.
  const [cancelTarget, setCancelTarget] = useState(null);
  const confirmCancel = () => {
    if (cancelTarget) removeClass(cancelTarget.id);
    setCancelTarget(null);
  };

  // Only blocks the scheduled → completed transition for classes dated after today;
  // marking an already-completed future-dated class back to scheduled is still allowed.
  const toggleComplete = (id) =>
    setClasses((cs) =>
      cs.map((c) => {
        if (c.id !== id) return c;
        if (c.status !== "completed" && c.date > todayISO()) return c;
        return { ...c, status: c.status === "completed" ? "scheduled" : "completed" };
      })
    );

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
            {(view === "week" || view === "month") && (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                {trainers.map((t) => (
                  <span key={t.id} className="flex items-center gap-1 text-[11px] text-green-700">
                    <span className={`inline-block w-2.5 h-2.5 rounded-sm ${trainerColor(t.id).bg} border-l-2 ${trainerColor(t.id).bar}`} />
                    {t.name}
                  </span>
                ))}
              </div>
            )}
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
        <select className={`${inputCls} w-auto`} value={trainerFilter} onChange={(e) => setTrainerFilter(e.target.value)}>
          <option value="">All trainers</option>
          {trainers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        {trainerFilter && (
          <button onClick={() => setTrainerFilter("")} className="flex items-center gap-1 text-xs text-green-600 hover:text-green-900 underline">
            <X size={12} /> Clear trainer
          </button>
        )}
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
                  <td className="px-4 py-3 text-green-700">{formatTime12h(c.time)}</td>
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
                      <button
                        onClick={() => toggleComplete(c.id)}
                        disabled={c.status !== "completed" && c.date > todayISO()}
                        className={`${c.status !== "completed" && c.date > todayISO() ? "text-green-300 cursor-not-allowed" : "text-green-500 hover:text-green-700"}`}
                        title={c.status !== "completed" && c.date > todayISO() ? "Can't mark a future class as completed" : "Toggle completed"}
                      >
                        <Check size={16} />
                      </button>
                      <button onClick={() => startEdit(c)} className="text-green-600 hover:text-green-900" title="Edit session">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => setCancelTarget(c)} className="text-green-600 hover:text-red-500" title="Cancel session">
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
                    <span className="text-sm font-medium text-green-900 w-14">{formatTime12h(c.time)}</span>
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
                    <button
                      onClick={() => toggleComplete(c.id)}
                      disabled={c.status !== "completed" && c.date > todayISO()}
                      className={`${c.status !== "completed" && c.date > todayISO() ? "text-green-300 cursor-not-allowed" : "text-green-500 hover:text-green-700"}`}
                      title={c.status !== "completed" && c.date > todayISO() ? "Can't mark a future class as completed" : "Toggle completed"}
                    >
                      <Check size={16} />
                    </button>
                    <button onClick={() => startEdit(c)} className="text-green-600 hover:text-green-900" title="Edit session">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => setCancelTarget(c)} className="text-green-600 hover:text-red-500" title="Cancel session">
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
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[820px]">
              <thead>
                <tr>
                  <th className="text-xs text-green-600 font-medium text-left px-2 py-2 w-16"></th>
                  {weekDates.map((dateStr) => (
                    <th key={dateStr} className="text-xs text-green-700 font-medium px-2 py-2 text-center border-l border-gray-100 whitespace-nowrap">
                      {new Date(`${dateStr}T00:00:00`).toLocaleString("en-US", { weekday: "short", day: "numeric" })}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 16 }, (_, i) => 6 + i).map((hour) => (
                  <tr key={hour} className="border-t border-gray-100">
                    <td className="text-xs text-green-600 px-2 py-1.5 align-top whitespace-nowrap">{formatTime12h(`${String(hour).padStart(2, "0")}:00`)}</td>
                    {weekDates.map((dateStr) => {
                      const hourClasses = (classesByDate[dateStr] || []).filter((c) => Number(c.time.split(":")[0]) === hour);
                      return (
                        <td key={dateStr} className="border-l border-gray-100 px-1 py-1 align-top min-w-[100px]">
                          <div className="space-y-1">
                            {hourClasses.map((c) => (
                              <button
                                key={c.id}
                                onClick={() => startEdit(c)}
                                className={`w-full text-left text-[10px] leading-tight px-1.5 py-1 rounded border-l-2 ${trainerColor(c.trainerId).bg} ${trainerColor(c.trainerId).text} ${trainerColor(c.trainerId).bar} ${
                                  c.status === "completed" ? "opacity-60" : ""
                                }`}
                                title={`${nameOf(trainers, c.trainerId)} · ${nameOf(customers, c.customerId)} · ${locationOf(c.customerId)} · ${c.status}`}
                              >
                                <div className="font-medium">{formatTime12h(c.time)} {firstName(nameOf(trainers, c.trainerId))}</div>
                                <div className="truncate">{nameOf(customers, c.customerId)}</div>
                              </button>
                            ))}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-green-600 mt-4">Blank cells are available hours; filled cells show booked sessions. Tap a session to edit it.</p>
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
                        className={`w-full text-left text-[10px] leading-tight px-1.5 py-1 rounded border-l-2 ${trainerColor(c.trainerId).bg} ${trainerColor(c.trainerId).text} ${trainerColor(c.trainerId).bar} ${
                          c.status === "completed" ? "opacity-60" : ""
                        }`}
                        title={`${nameOf(trainers, c.trainerId)} · ${nameOf(customers, c.customerId)} · ${locationOf(c.customerId)} · ${c.status}`}
                      >
                        <div className="truncate font-medium">{formatTime12h(c.time)} {firstName(nameOf(trainers, c.trainerId))}</div>
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

      {cancelTarget && (
        <Modal title="Cancel this session?" onClose={() => setCancelTarget(null)}>
          <p className="text-sm text-green-700 mb-1">
            <span className="font-medium text-green-900">{cancelTarget.date} at {formatTime12h(cancelTarget.time)}</span>
          </p>
          <p className="text-sm text-green-700 mb-5">
            {nameOf(trainers, cancelTarget.trainerId)} · {nameOf(customers, cancelTarget.customerId)}
          </p>
          <p className="text-xs text-green-600 mb-5">
            This will remove the session from the calendar and refund the class back to the customer's remaining balance. This can't be undone.
          </p>
          <div className="flex gap-2">
            <button onClick={() => setCancelTarget(null)} className="flex-1 border border-green-100 text-green-700 rounded-md py-2 text-sm hover:bg-green-50">
              Keep session
            </button>
            <button onClick={confirmCancel} className="flex-1 bg-red-500 text-white rounded-md py-2 text-sm hover:bg-red-600">
              Yes, cancel session
            </button>
          </div>
        </Modal>
      )}

      {open && (
        <Modal title={editingId ? "Edit session" : "Add class"} onClose={() => setOpen(false)}>
          <Field label="Date">
            <input type="date" className={inputCls} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </Field>
          <Field label="Session start time">
            <input type="time" className={inputCls} value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
          </Field>
          <Field label="Session end time">
            <input type="time" className={inputCls} value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} />
          </Field>
          <Field label="Trainer">
            <select className={inputCls} value={form.trainerId} onChange={(e) => setForm({ ...form, trainerId: e.target.value })}>
              {trainers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </Field>
          {trainerConflict && (
            <div className="flex items-center gap-1 text-xs bg-red-50 text-red-600 rounded-md px-3 py-2 mb-3">
              <AlertTriangle size={13} /> This trainer already has a session at this date and time.
            </div>
          )}
          {!trainerConflict && trainerOnLeave && (
            <div className="flex items-center gap-1 text-xs bg-red-50 text-red-600 rounded-md px-3 py-2 mb-3">
              <AlertTriangle size={13} /> This trainer has booked time off covering this date.
            </div>
          )}
          {customerConflict && (
            <div className="flex items-center gap-1 text-xs bg-red-50 text-red-600 rounded-md px-3 py-2 mb-3">
              <AlertTriangle size={13} /> This customer already has an overlapping session.
            </div>
          )}
          {(trainerNeighborSessions.prev || trainerNeighborSessions.next) && (
            <div className="text-xs bg-green-50 text-green-700 rounded-md px-3 py-2 mb-3 space-y-1">
              <div className="text-[10px] uppercase tracking-wide text-green-600">This trainer's nearest sessions</div>
              {trainerNeighborSessions.prev && (
                <div>
                  Previous: {trainerNeighborSessions.prev.date} {formatTime12h(trainerNeighborSessions.prev.time)} — {nameOf(customers, trainerNeighborSessions.prev.customerId)} · {locationOf(trainerNeighborSessions.prev.customerId)}
                </div>
              )}
              {trainerNeighborSessions.next && (
                <div>
                  Next: {trainerNeighborSessions.next.date} {formatTime12h(trainerNeighborSessions.next.time)} — {nameOf(customers, trainerNeighborSessions.next.customerId)} · {locationOf(trainerNeighborSessions.next.customerId)}
                </div>
              )}
            </div>
          )}
          <Field label="Customer (active only)">
            <div className="relative">
              <input
                type="text"
                className={inputCls}
                value={customerSearch}
                onFocus={() => setCustomerPickerOpen(true)}
                onChange={(e) => {
                  setCustomerSearch(e.target.value);
                  setCustomerPickerOpen(true);
                }}
                onBlur={() => setTimeout(() => setCustomerPickerOpen(false), 150)}
                placeholder="Type to search customers…"
              />
              {customerPickerOpen && (
                <div className="absolute z-20 mt-1 w-full max-h-56 overflow-y-auto bg-white border border-green-100 rounded-md shadow-lg">
                  {filteredCustomerOptions.length === 0 && (
                    <div className="px-3 py-2 text-xs text-green-600">No matching active customers.</div>
                  )}
                  {filteredCustomerOptions.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onMouseDown={() => {
                        setForm({ ...form, customerId: c.id });
                        setCustomerSearch(c.name);
                        setCustomerPickerOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-green-50 ${c.id === form.customerId ? "bg-green-50 text-green-900 font-medium" : "text-green-700"}`}
                    >
                      {pickerLabel(c)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Field>
          {(() => {
            const selectedCustomer = customers.find((c) => c.id === form.customerId);
            if (!selectedCustomer) return null;
            const editingOwnSession = editingId && classes.find((c) => c.id === editingId)?.customerId === form.customerId;
            const bookable = selectedCustomer.unlimited
              ? "—"
              : unscheduledCountFor(selectedCustomer) + (editingOwnSession ? 1 : 0);
            const isLow = bookable !== "—" && bookable <= 0;
            return (
              <>
                <div className={`flex items-center justify-between text-xs rounded-md px-3 py-2 mb-1 ${isLow ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"}`}>
                  <span>{selectedCustomer.classType === "group" ? "Group class" : "Private class"}</span>
                  <span className="font-medium">
                    {bookable === "—" ? "Unlimited" : isLow ? "0 unscheduled left" : `${bookable} unscheduled left`}
                  </span>
                </div>
                {selectedCustomer.location && (
                  <div className="flex items-center gap-1 text-xs text-green-600 mb-3">
                    <MapPin size={12} /> {selectedCustomer.location}
                  </div>
                )}
                {customerOutOfClasses && (
                  <div className="flex items-center gap-1 text-xs bg-red-50 text-red-600 rounded-md px-3 py-2 mb-3">
                    <AlertTriangle size={13} /> This customer has no unscheduled classes left.
                  </div>
                )}
              </>
            );
          })()}

          {!editingId && (
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-green-700">Booking multiple sessions? (e.g. all of a purchased pack)</span>
              </div>
              {extraSessions.map((row, i) => (
                <div key={i} className="flex items-center gap-2 mb-2">
                  <input type="date" className={inputCls} value={row.date} onChange={(ev) => updateExtraSession(i, { date: ev.target.value })} />
                  <input type="time" className={inputCls} value={row.time} onChange={(ev) => updateExtraSession(i, { time: ev.target.value })} />
                  <input type="time" className={inputCls} value={row.endTime} onChange={(ev) => updateExtraSession(i, { endTime: ev.target.value })} />
                  <button type="button" onClick={() => removeExtraSession(i)} className="text-green-600 hover:text-red-500 shrink-0" title="Remove this session">
                    <X size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addExtraSession}
                className="flex items-center gap-1 text-xs text-green-700 border border-green-100 rounded-md px-2.5 py-1.5 hover:bg-green-50"
              >
                <Plus size={12} /> Add another session
              </button>
              {extraSessions.length > 0 && (
                <p className="text-[11px] text-green-600 mt-2">
                  {1 + extraSessions.length} sessions will be scheduled for this trainer and customer. Any that conflict, fall on the trainer's day off, or exceed the customer's remaining classes are skipped automatically.
                </p>
              )}
            </div>
          )}

          {batchSummary && (
            <div className="text-xs bg-green-50 text-green-700 rounded-md px-3 py-2 mb-3">{batchSummary}</div>
          )}

          <button
            onClick={submit}
            disabled={extraSessions.length === 0 && !canSubmit}
            className="w-full bg-green-500 text-white rounded-md py-2 text-sm mt-2 hover:bg-green-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-green-500"
          >
            {editingId ? "Save changes" : extraSessions.length > 0 ? `Add ${1 + extraSessions.length} sessions` : "Add to schedule"}
          </button>
        </Modal>
      )}
    </div>
  );
}

function Utilization({ trainers, classes, customers }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dayIndex = (dateStr) => {
    const d = new Date(`${dateStr}T00:00:00`);
    return (d.getDay() + 6) % 7; // Monday-first
  };

  // ----- Overall period (drives stats + commission progress below) -----
  const [mode, setMode] = useState("month");
  const [month, setMonth] = useState(thisMonthISO());
  const [startDate, setStartDate] = useState(monthStartISO());
  const [endDate, setEndDate] = useState(monthEndISO());
  const inPeriod = (dateStr) => (mode === "month" ? dateStr.startsWith(month) : dateStr >= startDate && dateStr <= endDate);
  const periodClasses = classes.filter((c) => inPeriod(c.date));

  const commissions = trainers.map((t) => {
    const completedClasses = periodClasses.filter((c) => c.trainerId === t.id && c.status === "completed");
    const completed = completedClasses.length;
    const completedHours = completedClasses.reduce((s, c) => s + sessionDurationHours(c), 0);
    const commissionEarned = trainerCommission(t, periodClasses, customers);
    return {
      trainer: t,
      completed,
      completedHours,
      commissionEarned,
      progress: t.monthlyTarget ? completedHours / t.monthlyTarget : 0,
    };
  });

  const avgUtilization = commissions.length
    ? Math.round((commissions.reduce((s, c) => s + Math.min(1, c.progress), 0) / commissions.length) * 100)
    : 0;
  const totalCompleted = periodClasses.filter((c) => c.status === "completed").length;
  const totalUpcoming = periodClasses.filter((c) => c.status === "scheduled").length;

  // ----- Daily utilisation: per-day completed HOURS per trainer (not raw class
  // counts), within the selected period above — a studio running ~5 hours/day per
  // trainer works out to the 130-hour monthly target. Only shows days that
  // actually have completed classes, so an "All time"/large range doesn't render
  // hundreds of empty rows. -----
  const dailyMap = {};
  periodClasses
    .filter((c) => c.status === "completed")
    .forEach((c) => {
      if (!dailyMap[c.date]) dailyMap[c.date] = {};
      dailyMap[c.date][c.trainerId] = (dailyMap[c.date][c.trainerId] || 0) + sessionDurationHours(c);
    });
  const dailyRows = Object.entries(dailyMap)
    .map(([date, byTrainer]) => ({ date, byTrainer, total: Object.values(byTrainer).reduce((s, n) => s + n, 0) }))
    .sort((a, b) => b.date.localeCompare(a.date));

  // ----- Weekly pattern (its own week navigator, independent of the period above) -----
  const [weekStart, setWeekStart] = useState(mondayOfThisWeekISO());
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
                {c.completedHours.toFixed(1)} / {c.trainer.monthlyTarget} hours ({c.completed} classes) · {Math.round(c.progress * 100)}% · {AED(c.commissionEarned)}
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

      <SectionTitle eyebrow="Day by day" title="Daily utilisation (hours)" />
      <Card className="overflow-hidden mb-8">
        <div className="overflow-auto" style={{ maxHeight: "360px" }}>
          <table className="w-full text-sm min-w-[520px]">
            <thead className="bg-green-50 text-green-700 text-xs uppercase tracking-wide sticky top-0 z-10">
              <tr>
                <th className="text-left px-4 py-3">Date</th>
                {trainers.map((t) => <th key={t.id} className="text-left px-4 py-3">{t.name}</th>)}
                <th className="text-left px-4 py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {dailyRows.length === 0 && (
                <tr><td colSpan={trainers.length + 2} className="px-4 py-6 text-center text-sm text-green-600">No completed classes in this period yet.</td></tr>
              )}
              {dailyRows.map((row) => (
                <tr key={row.date} className="border-t border-gray-100">
                  <td className="px-4 py-3 text-green-900 whitespace-nowrap">{row.date}</td>
                  {trainers.map((t) => (
                    <td key={t.id} className="px-4 py-3 text-green-700">{(row.byTrainer[t.id] || 0).toFixed(1)}h</td>
                  ))}
                  <td className="px-4 py-3 text-green-900 font-medium">{row.total.toFixed(1)}h</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

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

function CommissionTab({ trainers, classes, customers }) {
  const [mode, setMode] = useState("month");
  const [month, setMonth] = useState(thisMonthISO());
  const [startDate, setStartDate] = useState(monthStartISO());
  const [endDate, setEndDate] = useState(monthEndISO());
  const inPeriod = (dateStr) => (mode === "month" ? dateStr.startsWith(month) : dateStr >= startDate && dateStr <= endDate);
  const periodClasses = classes.filter((c) => inPeriod(c.date));

  const commissions = trainers.map((t) => {
    const completedClasses = periodClasses.filter((c) => c.trainerId === t.id && c.status === "completed");
    const completed = completedClasses.length;
    const commissionEarned = trainerCommission(t, periodClasses, customers);
    const zeroPricedCount = completedClasses.filter((c) => classPrice(c, customers) <= 0).length;
    return {
      trainer: t,
      completed,
      commissionEarned,
      total: t.baseSalary + commissionEarned,
      zeroPricedCount,
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
            {c.zeroPricedCount > 0 && (
              <div className="flex items-center gap-1 text-xs text-red-600 mt-2">
                <AlertTriangle size={12} />
                {c.zeroPricedCount} completed class{c.zeroPricedCount === 1 ? "" : "es"} {c.zeroPricedCount === 1 ? "has" : "have"} a customer with no price set — check the Customers tab.
              </div>
            )}
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
function useSyncedTable(table, seed, enabled, onError) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (!enabled) return;
    let channel;
    let cancelled = false;

    (async () => {
      let { data, error } = await supabase.from(table).select("*");
      // "JWT issued at future" is almost always transient clock skew between the
      // browser and the server — refreshing the session mints a fresh token and
      // usually clears it immediately, so try that once automatically before
      // bothering the user with an error they'd otherwise have to refresh past.
      if (error && /jwt|issued at future/i.test(error.message || "")) {
        await supabase.auth.refreshSession();
        ({ data, error } = await supabase.from(table).select("*"));
      }
      if (cancelled) return;
      if (error) {
        console.error(`Failed to load ${table}:`, error.message);
        onError?.(`Couldn't load ${table} (${error.message}). Your changes to it may not be visible or saved.`);
        return;
      }
      // Reflect whatever the database actually has — including genuinely empty.
      // (This used to auto-insert demo starter rows into an empty table, but that's
      // not safe once the studio has real data: an empty table can also mean "all
      // real rows for this table happen to be gone right now", and the demo rows
      // reference made-up IDs that don't exist elsewhere in a live database.)
      setRows(data || []);

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
              if (error) {
                console.error(`Delete failed on ${table}:`, error.message);
                onError?.(`A delete on ${table} failed to save (${error.message}). It may reappear.`);
              }
            });
          }
        });
        next.forEach((r) => {
          const old = prev.find((p) => p.id === r.id);
          if (!old) {
            supabase.from(table).insert(r).then(({ error }) => {
              if (error) {
                console.error(`Insert failed on ${table}:`, error.message);
                onError?.(`Saving a new entry to ${table} failed (${error.message}). It's only on this device until this is fixed.`);
              }
            });
          } else if (JSON.stringify(old) !== JSON.stringify(r)) {
            supabase.from(table).update(r).eq("id", r.id).then(({ error }) => {
              if (error) {
                console.error(`Update failed on ${table}:`, error.message);
                onError?.(`Saving a change to ${table} failed (${error.message}). It's only on this device until this is fixed.`);
              }
            });
          }
        });
      }
      return next;
    });
  };

  // Inserts one row and, unlike setSynced, can be awaited — needed for cases where
  // a dependent row (e.g. a payment, which references a customer by foreign key)
  // must not be saved until this row is confirmed saved first.
  const insertRow = async (row) => {
    setRows((prev) => [...prev, row]);
    if (!enabled) return { error: null };
    const { error } = await supabase.from(table).insert(row);
    if (error) {
      console.error(`Insert failed on ${table}:`, error.message);
      onError?.(`Saving a new entry to ${table} failed (${error.message}). It's only on this device until this is fixed.`);
    }
    return { error };
  };

  return [rows, setSynced, insertRow];
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
          <span className="text-xs tracking-[0.25em] uppercase">Management System</span>
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

// ---------- Trainer portal (restricted view for trainer logins) ----------
// Shown instead of the full app when the signed-in email matches a trainer's
// portal login. Deliberately has no access to customers, payments, expenses,
// other trainers, or commission figures — schedule only, and only their own.

function TrainerPortal({ trainer, classes, setClasses, customers, userEmail }) {
  const [sortDir, setSortDir] = useState("asc");

  const myClasses = classes.filter((c) => c.trainerId === trainer.id);
  const nameOf = (id) => customers.find((c) => c.id === id)?.name || "—";
  const locationOf = (id) => customers.find((c) => c.id === id)?.location || "—";

  // Defensively re-checks trainerId even though the UI only ever shows their own
  // sessions — a class can only ever be toggled if it's genuinely this trainer's.
  const toggleComplete = (id) => {
    setClasses((cs) =>
      cs.map((c) => {
        if (c.id !== id || c.trainerId !== trainer.id) return c;
        if (c.status !== "completed" && c.date > todayISO()) return c;
        return { ...c, status: c.status === "completed" ? "scheduled" : "completed" };
      })
    );
  };

  const sorted = [...myClasses].sort((a, b) => {
    const cmp = (a.date + a.time).localeCompare(b.date + b.time);
    return sortDir === "asc" ? cmp : -cmp;
  });
  const upcoming = sorted.filter((c) => c.status !== "completed");
  const completed = [...sorted].reverse().filter((c) => c.status === "completed");

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-green-100 px-6 py-5 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-green-500 mb-1">
            <Sparkles size={16} />
            <span className="text-xs tracking-[0.25em] uppercase">Trainer Portal</span>
          </div>
          <h1 className="font-serif text-xl text-green-900">{trainer.name}</h1>
          <div className="text-xs text-green-600">{userEmail}</div>
        </div>
        <button onClick={() => supabase.auth.signOut()} className="text-xs text-green-600 hover:text-green-900 underline shrink-0">
          Sign out
        </button>
      </div>

      <div className="p-6 max-w-2xl mx-auto">
        <SectionTitle
          eyebrow="Your schedule"
          title="Upcoming sessions"
          action={
            <button
              onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
              className="flex items-center gap-1 text-xs text-green-700 border border-green-100 rounded-md px-2.5 py-1.5 hover:bg-green-50"
            >
              <ArrowUpDown size={13} /> {sortDir === "asc" ? "Soonest first" : "Latest first"}
            </button>
          }
        />
        <div className="space-y-2 mb-8">
          {upcoming.length === 0 && <div className="text-sm text-green-600">No upcoming sessions.</div>}
          {upcoming.map((c) => {
            const isFuture = c.date > todayISO();
            return (
              <Card key={c.id} className="p-4 flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-medium text-green-900">{c.date} · {formatTime12h(c.time)}</div>
                  <div className="text-sm text-green-700">{nameOf(c.customerId)}</div>
                  <div className="text-xs text-green-600 flex items-center gap-1 mt-0.5">
                    <MapPin size={11} /> {locationOf(c.customerId)}
                  </div>
                </div>
                <button
                  onClick={() => toggleComplete(c.id)}
                  disabled={isFuture}
                  className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-md shrink-0 ${
                    isFuture ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-green-700 text-white hover:bg-green-800"
                  }`}
                  title={isFuture ? "Can't mark a future class as completed" : "Mark as completed"}
                >
                  <Check size={14} /> Mark complete
                </button>
              </Card>
            );
          })}
        </div>

        <SectionTitle eyebrow="History" title="Completed sessions" />
        <div className="space-y-2">
          {completed.length === 0 && <div className="text-sm text-green-600">No completed sessions yet.</div>}
          {completed.map((c) => (
            <Card key={c.id} className="p-4 flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-medium text-green-900">{c.date} · {formatTime12h(c.time)}</div>
                <div className="text-sm text-green-700">{nameOf(c.customerId)}</div>
              </div>
              <button
                onClick={() => toggleComplete(c.id)}
                className="text-xs px-3 py-2 rounded-md border border-green-100 text-green-700 hover:bg-green-50 shrink-0"
              >
                Undo
              </button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- App ----------

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [bookingForCustomerId, setBookingForCustomerId] = useState(null);
  const bookCustomer = (customerId) => {
    setBookingForCustomerId(customerId);
    setTab("schedule");
  };
  const [scheduleTrainerFilter, setScheduleTrainerFilter] = useState(null);
  const viewTrainerSchedule = (trainerId) => {
    setScheduleTrainerFilter(trainerId);
    setTab("schedule");
  };
  const [session, setSession] = useState(undefined); // undefined = still checking, null = signed out
  const [authTimedOut, setAuthTimedOut] = useState(false);

  useEffect(() => {
    let settled = false;
    const timeout = setTimeout(() => {
      if (!settled) setAuthTimedOut(true);
    }, 10000);

    supabase.auth.getSession().then(({ data }) => {
      settled = true;
      clearTimeout(timeout);
      setSession(data.session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => {
      listener.subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const signedIn = !!session;
  const [syncError, setSyncError] = useState("");
  const [trainers, setTrainers] = useSyncedTable("trainers", seedTrainers, signedIn, setSyncError);
  const [timeOff, setTimeOff] = useSyncedTable("timeOff", seedTimeOff, signedIn, setSyncError);
  const [expenses, setExpenses] = useSyncedTable("expenses", seedExpenses, signedIn, setSyncError);
  const [customers, setCustomers, insertCustomer] = useSyncedTable("customers", seedCustomers, signedIn, setSyncError);
  const [classes, setClasses] = useSyncedTable("classes", seedClasses, signedIn, setSyncError);
  const [payments, setPayments] = useSyncedTable("payments", seedPayments, signedIn, setSyncError);

  if (session === undefined) {
    if (authTimedOut) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
          <div className="max-w-sm text-center">
            <div className="text-red-600 text-sm font-medium mb-2">Couldn't reach the server</div>
            <p className="text-green-700 text-sm mb-4">
              This usually means the database is temporarily paused, or this network is blocking the connection. Try refreshing, or check the Supabase project status.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-green-700 text-white text-sm px-4 py-2 rounded-md hover:bg-green-800"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }
    return <div className="min-h-screen bg-white flex items-center justify-center text-green-600 text-sm">Loading…</div>;
  }
  if (!session) {
    return <LoginScreen />;
  }

  // If this signed-in email matches a trainer's portal login, show the restricted
  // trainer view instead of the full app — no other tab, no financial data.
  const myTrainer = trainers.find(
    (t) => t.authEmail && t.authEmail.trim().toLowerCase() === (session.user?.email || "").toLowerCase()
  );
  if (myTrainer) {
    return <TrainerPortal trainer={myTrainer} classes={classes} setClasses={setClasses} customers={customers} userEmail={session.user.email} />;
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
          {["dashboard", "customers", "expenses", "trainers", "schedule", "utilization", "commission"].map((id) => (
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
          {syncError && (
            <div className="flex items-start justify-between gap-3 bg-red-50 text-red-600 text-sm rounded-md px-4 py-3 mb-6">
              <span>{syncError}</span>
              <button onClick={() => setSyncError("")} className="text-red-600 hover:text-red-800 shrink-0">
                <X size={16} />
              </button>
            </div>
          )}
          {tab === "dashboard" && (
            <Dashboard trainers={trainers} customers={customers} classes={classes} payments={payments} />
          )}
          {tab === "customers" && <Customers customers={customers} setCustomers={setCustomers} insertCustomer={insertCustomer} payments={payments} setPayments={setPayments} classes={classes} setClasses={setClasses} onBookCustomer={bookCustomer} />}
          {tab === "expenses" && <Expenses expenses={expenses} setExpenses={setExpenses} />}
          {tab === "trainers" && <Trainers trainers={trainers} setTrainers={setTrainers} classes={classes} customers={customers} timeOff={timeOff} setTimeOff={setTimeOff} onViewSchedule={viewTrainerSchedule} />}
          {tab === "schedule" && (
            <Schedule
              classes={classes}
              setClasses={setClasses}
              trainers={trainers}
              customers={customers}
              setCustomers={setCustomers}
              timeOff={timeOff}
              prefillCustomerId={bookingForCustomerId}
              onPrefillConsumed={() => setBookingForCustomerId(null)}
              prefillTrainerFilter={scheduleTrainerFilter}
              onTrainerPrefillConsumed={() => setScheduleTrainerFilter(null)}
            />
          )}
          {tab === "utilization" && <Utilization trainers={trainers} classes={classes} customers={customers} />}
          {tab === "commission" && <CommissionTab trainers={trainers} classes={classes} customers={customers} />}
        </div>
      </div>
    </div>
  );
}
