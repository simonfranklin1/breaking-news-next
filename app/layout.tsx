import type { Metadata } from "next";
import "./globals.css";
import { Navbar, Provider, Footer } from "@/components";
import { Toaster } from "react-hot-toast"

export const metadata: Metadata = {
  title: "Breaking News",
  description: "Crie narrativas que incentivem a inspiração, conhecimento e entretenimento",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
      <Toaster toastOptions={{
          style: {
            background: "rgb(51 65 81)",
            color: "#FFF"
          }
        }} 
      />
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
