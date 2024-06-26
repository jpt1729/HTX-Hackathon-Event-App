import Modal from "@/components/Modal";
import { ModalProvider } from "@/utils/context/ModalContext";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { Inter } from "next/font/google";
import "primereact/resources/themes/nano/theme.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} p-5`}>
        <PrimeReactProvider>
            <ModalProvider>
              {children}
              <Modal />
            </ModalProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
