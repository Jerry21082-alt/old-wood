import "./global.css";
import "../styles/typography.css";
import Layout from "@/components/Layout";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="relative h-full">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
