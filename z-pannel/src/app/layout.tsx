"use client";
import Navbar from "./components/organisms/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { checkPublicRoute } from "./Util/app-routes";
import PrivateRoute from "./components/organisms/PrivateRoute";
import AuthProvider from "./store/auth-provider";
import Providers from "./components/atoms/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Z-Pannel",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const isAPublicRoute = checkPublicRoute(path);
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          //@ts-ignore
          precedence="default"
        />
      </head>
      <body className={`${inter.className} h-screen`}>
        <Providers>
          <div className="h-full">
            <Navbar display="block" />
            {isAPublicRoute && children}
            {!isAPublicRoute && <PrivateRoute>{children}</PrivateRoute>}
          </div>
        </Providers>
      </body>
    </html>
  );
}
