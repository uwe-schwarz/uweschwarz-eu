import { Caveat, Mona_Sans } from "next/font/google";
import { GeistMono } from "geist/font/mono";

import { cn } from "@/lib/utils";

// Mona Sans carries both voices: normal width for reading, expanded width for
// the blueprint-style headlines. Caveat is reserved for the redline notes.
const monaSans = Mona_Sans({
  axes: ["wdth"],
  display: "swap",
  subsets: ["latin", "latin-ext"],
  variable: "--font-mona-sans",
});

const caveat = Caveat({
  display: "swap",
  subsets: ["latin", "latin-ext"],
  variable: "--font-caveat",
  weight: "variable",
});

export const fontVariables = cn(monaSans.variable, caveat.variable, GeistMono.variable);
