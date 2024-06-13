import Nav from "./components/Nav";
import "./global.css";
import "../styles/typography.css";
import Footer from "./components/Footer";
import MobileMenu from "./components/MobileMenu";
import UseStateContext from "./components/stateContext/UseStateContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UseStateContext>
          <Nav />
          <MobileMenu />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </UseStateContext>
      </body>
    </html>
  );
}
