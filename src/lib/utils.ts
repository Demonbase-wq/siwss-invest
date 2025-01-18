import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// import nodemailer from 'nodemailer';

// export const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: parseInt(process.env.SMTP_PORT as string), // Convert string to number
//   secure: process.env.SMTP_SECURE === "true", // Convert to boolean
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   debug: true, // Enable debug output
//   logger: true, // Log to console
// })

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const capitalizeFirstLetter = (text: string): string => {
  if (!text) return ''; // Handle empty or undefined strings
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export interface KPI {
  label: string
  value: number
  change: number
  trend: "up" | "down"
}

export interface Transaction {
  id: string
  type: "investment" | "withdrawal" | "profit"
  amount: number
  status: "completed" | "pending" | "failed"
  date: string
  description: string
}

export interface Investment {
  name: string
  amount: number
  percentage: number
}


export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

