import type { Metadata } from "next";
import "./globals.css";
import { Navbar, Provider, Footer } from "@/components";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

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
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Provider>
          <Navbar />
          <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-0 min-h-screen">
            {children}
          </div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
