import Nav from "./components/Nav";
import "./global.css";
import "../styles/typography.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main className="min-h-screen">{children}</main>
        <footer></footer>
      </body>
    </html>
  );
}
