import Link from "next/link";
import { useSelector } from "react-redux";

const shopList = [
  { href: "/collections/all", name: "Shop All" },
  { href: "/collections/furniture", name: "Furniture" },
  { href: "/collections/decor", name: "Decor" },
  { href: "/collections/dining-entertaining", name: "Dining & Entertaining" },
  { href: "/collections/soft-goods", name: "soft Goods" },
  { href: "/collections/lighting", name: "Lighting" },
  { href: "/collections/art", name: "Art" },
];

const toggleDetails = (id) => {
  const detailsElement = document.getElementById(id);
  if (!detailsElement) {
    console.warn(`Element not found: ${id}`);
    return;
  }

  if (!detailsElement.open) {
    detailsElement.style.height = `${detailsElement.scrollHeight}px`;
  } else {
    detailsElement.style.height = "0px";
  }

  detailsElement.open = !detailsElement.open;
};

export default function MobileNavigation() {
  const isMobileMenuOpen = useSelector((state) => state.navigation.isMenuOpen);
  return (
    <div
      className={`fixed left-auto right-0 bg-milk w-screen text-left flex flex-col text-shadow max-h-screen h-screen z-[10] mobile-menu ${
        isMobileMenuOpen ? "" : "mobile-menu--open"
      }`}
      style={{
        top: "calc(62.5px + 1px)",
        transition:
          "transform .6s cubic-bezier(.75,0,.175,1), visibility .6s cubic-bezier(.75,0,.175,1)",
      }}
    >
      <div className="overflow-y-scroll overflow-x-hidden flex-grow px-0">
        <ul className="p-0 m-0">
          <li
            className="list-none flow-root"
            style={{ borderBottom: "1px solid rgba(34, 31, 32, .15)" }}
          >
            <button
              onClick={() => toggleDetails("mobile-menu-1")}
              className="py-[21px] px-6 text-[15px] leading-[1] flex justify-between items-center w-full m-0 touch-manipulation overflow-visible appearance-none normal-case text-lightBrown"
            >
              Shop
              <span className="plus-icon relative"></span>
            </button>
            <div id="mobile-menu-1">
              <ul className="m-0 p-0" id="mobile-menu-1">
                <li
                  className="flow-root list-none pt-[21px] px-6 mb-[15px]"
                  style={{ borderTop: "1px solid rgba(34, 31, 32, .15)" }}
                >
                  <Link
                    href="/collections/all"
                    className="flex justify-between items-center m-0 w-full uppercase text-[12px] text-darkGray"
                  >
                    Shop by Category
                  </Link>
                  <ul
                    className="list-none grid mb-[12px] mt-[16px]"
                    style={{
                      gridTemplateColumns:
                        "calc(50% - calc(24px / 2)) calc(50% - calc(24px / 2))",
                      gap: "0 24px",
                    }}
                  >
                    {shopList.map((list, index) => (
                      <li className="mb-[14px] flow-root">
                        <Link
                          href={list.href}
                          key={index}
                          className="text-sm py-[3px] flex items-center justify-between w-full h2 text-shadow"
                        >
                          {list.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
