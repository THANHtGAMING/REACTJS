
"use client"

import { Provider } from "react-redux";
import { store } from "./lib/store";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";




export default function RootLayout({
children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
    <html lang="vi">
      <head>
          <link rel='stylesheet' href='https://site-assets.fontawesome.com/releases/v6.4.0/css/all.css'></link>
      </head>
      <body >


      <div className="w-full bg-white">
       <Header></Header>
        <main>{children}</main>
        <footer><Footer></Footer></footer>
      </div>
       
      </body>
    </html>
</Provider>


  );
}
