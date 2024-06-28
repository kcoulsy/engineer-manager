import "~/styles/globals.css";

import { Poppins } from "next/font/google";
import type { PropsWithChildren } from "react";

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body className={`font-sans ${poppins.className}`}>{children}</body>
    </html>
  );
}
