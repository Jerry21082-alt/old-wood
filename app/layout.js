"use client";

import "./global.css";
import "../styles/typography.css";
import Layout from "@/components/Layout";
import { store } from "@/store/store";
import { Provider, useDispatch, useSelector } from "react-redux";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Layout>{children}</Layout>
        </Provider>
      </body>
    </html>
  );
}
