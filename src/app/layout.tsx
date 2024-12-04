import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=equal" />
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Gabarito:wght@900&family=Saira+Stencil+One&display=swap');
        </style>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Funnel+Sans:wght@800&display=swap');
        </style>
      </head>
      <body className="h-full w-full">
        {children}
      </body>
    </html>
  );
}
