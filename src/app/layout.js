import { Inter } from "next/font/google";
import "./globals.css";
import AntdStyledComponentsRegistry from "./AntdComponentRegistry";
import { Provider } from "./QueryProvider";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        <Provider>
          <AntdStyledComponentsRegistry>
            <Suspense>{children}</Suspense>
          </AntdStyledComponentsRegistry>
        </Provider>
      </body>
    </html>
  );
}
