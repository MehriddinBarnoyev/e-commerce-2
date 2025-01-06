import { Inter } from "next/font/google";
import { AuthProvider } from "./contexts/AuthContext";
import { Header } from "./components/header";
import "./globals.css";
import { Footer } from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Game Market",
  description: "Buy and sell game items",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} bg-black min-h-screen`}>
        <AuthProvider>
          <Header />
          <main className=" mx-auto px-4 py-8">{children}</main>
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
