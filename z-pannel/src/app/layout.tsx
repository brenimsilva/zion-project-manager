import Navbar from "./components/organisms/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import GuildProvider from "./store/guild-provider";
import UserProvider from "./store/user-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        //@ts-ignore
        precedence="default"
      />
      <body className={`${inter.className} h-screen`}>
        <UserProvider>
          <GuildProvider>
            <div className="h-full">
              <Navbar />
              {children}
            </div>
          </GuildProvider>
        </UserProvider>
      </body>
    </html>
  );
}
