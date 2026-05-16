import type { Metadata } from "next";
import StoreProvider from "@/store/provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recipe Search & Meal Planner",
  description:
    "Search recipes via TheMealDB and build a shopping list. nib take-home tech challenge.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
