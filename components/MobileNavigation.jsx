import Link from "next/link";
import { useSelector } from "react-redux";

const shopCategories = {
  "SHOP BY CATEGOGRY": {
    headingLink: "/collections/all",
    links: [
      { href: "/collections/all", title: "Shop All" },
      { href: "/collections/furniture", title: "Furniture" },
      { href: "/collections/decor", title: "Decor" },
      {
        href: "/collections/dining-entertaining",
        title: "Dining & Entertaining",
      },
      { href: "/collections/soft-goods", title: "Soft Goods" },
      { href: "/collections/lighting", title: "Lighting" },
      { href: "/collections/art", title: "Art" },
    ],
  },
  FURNITURE: {
    headingLink: "/collections/furniture",
    links: [
      { href: "/collections/tables", title: "Tables" },
      { href: "/collections/seating", title: "Seating" },
      { href: "/collections/casegoods", title: "Casegoods" },
    ],
  },
  DECOR: {
    headingLink: "/collections/decor",
    links: [
      { href: "/collections/vases-vassels", title: "Vases & vassels" },
      { href: "/collections/decorative-objects", title: "Decorative Objects" },
      { href: "/collections/bowls-dishes", title: "Bowls & Dishes" },
      { href: "/collections/mirrors", title: "Mirrors" },
      { href: "/collections/utility", title: "Utility" },
      { href: "/collections/bath-accessories", title: "Bath Accessories" },
    ],
  },
  "Dining & Entertaining": {
    headingLink: "/collections/dining-entertaining",
    links: [
      {
        href: "/collections/kitchen-accessories",
        title: "Kitchen Accessories",
      },
      { href: "/collections/serving-dishes", title: "Serving Dishes" },
      { href: "/collections/barware", title: "Barware" },
      { href: "/collections/utensils", title: "Utensils" },
      { href: "/collections/candle-holders", title: "Candle Holders" },
      { href: "/collections/glassware", title: "Glassware" },
    ],
  },
  "SOFT GOODS": {
    headingLink: "/collections/soft-goods",
    links: [
      {
        href: "/collections/pillows",
        title: "Pillows",
      },
    ],
  },
  LIGHTING: {
    headingLink: "/collections/lighting",
    links: [
      {
        href: "/collections/table-lamps ",
        title: "Table Lamps",
      },
    ],
  },
  ART: {
    headingLink: "/collections/art",
    links: [
      {
        href: "/collections/vintage ",
        title: "Vintage",
      },
      {
        href: "/collections/artisan ",
        title: "Artisan",
      },
    ],
  },
};

const collectionCategories = {
  COLLECTIONS: {
    headingLink: "/collections/all",
    links: [
      {
        href: "/collections/the-yuletide-collection",
        title: "The Yuletide Collection",
      },
      {
        href: "/collections/the-heritage-harvest-colletion",
        title: "The Heritage Harvest Collection",
      },
      {
        href: "/blogs/collections/the-anniversary-collection",
        title: "The Anniversary Collection",
      },
      {
        href: "/blogs/collections/sabi-collection",
        title: "Sabi Collection",
      },
      {
        href: "/blogs/collections/pavillion-collection",
        title: "Pavillion  Collection",
      },
      {
        href: "/blogs/collections/disc-collection",
        title: "Disc  Collection",
      },
      {
        href: "/blogs/collections",
        title: "View All",
      },
    ],
  },
};

const collectionCards = [
  {
    href: "/blogs/collections/the-yuletide-collection",
    title: "The Yuletide Collection",
    imgSrc:
      "//roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=2500",
    imgSrcset:
      "//roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=352 352w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=832 832w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=1200 1200w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=1920 1920w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Italian_Stallion_03_0652.jpg?v=1731942982&width=2500 2500w",
  },
  {
    href: "/blogs/collections/the-anniversary-collection",
    title: "The Anniversary Collection",
    imgSrc:
      "//roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Bromley_Mohair_03_0386_1_ed643bc5-9fa3-4bdb-8d51-570a9b6130c3.jpg?v=1729014910&width=2500",
    imgSrcset:
      "//roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Bromley_Mohair_03_0386_1_ed643bc5-9fa3-4bdb-8d51-570a9b6130c3.jpg?v=1729014910&width=352 352w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Bromley_Mohair_03_0386_1_ed643bc5-9fa3-4bdb-8d51-570a9b6130c3.jpg?v=1729014910&width=832 832w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Bromley_Mohair_03_0386_1_ed643bc5-9fa3-4bdb-8d51-570a9b6130c3.jpg?v=1729014910&width=1200 1200w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Bromley_Mohair_03_0386_1_ed643bc5-9fa3-4bdb-8d51-570a9b6130c3.jpg?v=1729014910&width=1920 1920w, //roweam.com/cdn/shop/files/20240524-Roweam-In_Situ-Bromley_Mohair_03_0386_1_ed643bc5-9fa3-4bdb-8d51-570a9b6130c3.jpg?v=1729014910&width=2500 2500w",
  },
  {
    href: "/blogs/collections/sabi-collection",
    title: "Sabi Collection",
    imgSrc:
      "//roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101_1.jpg?v=1729025923&width=2500",
    imgSrcset:
      "//roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101_1.jpg?v=1729025923&width=352 352w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101_1.jpg?v=1729025923&width=832 832w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101_1.jpg?v=1729025923&width=1200 1200w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101_1.jpg?v=1729025923&width=1920 1920w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101_1.jpg?v=1729025923&width=2500 2500w",
  },
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
      className={`fixed left-auto right-0 bg-milk w-screen text-left flex flex-col text-shadow max-h-screen h-full z-[10] mobile-menu ${
        isMobileMenuOpen ? "open" : "mobile-menu--open"
      }`}
      style={{
        top: "calc(62.5px - 1px)",
        transition:
          "transform .6s cubic-bezier(.75,0,.175,1), visibility .6s cubic-bezier(.75,0,.175,1)",
      }}
    >
      <div className="overflow-y-scroll overflow-x-hidden flex-grow px-0">
        <ul className="p-0 m-0">
          <li
            className="list-none flow-root mobile-nav_item"
            style={{ borderBottom: "1px solid rgba(34, 31, 32, .15)" }}
          >
            <button
              onClick={() => toggleDetails("mobile-menu-1")}
              className="py-[21px] px-6 text-[15px] leading-[1] flex justify-between items-center w-full m-0 touch-manipulation overflow-visible appearance-none normal-case text-lightBrown"
            >
              Shop
              <span className="plus-icon relative"></span>
            </button>
            <div
              id="mobile-menu-1"
              style={{
                overflow: "hidden",
                height: "0px",
                transition:
                  "height  0.6s cubic-bezier(0.75, 0, 0.175, 1), visibility 0.6s cubic-bezier(0.75, 0, 0.175, 1)",
              }}
            >
              <ul className="m-0 p-0">
                {Object.entries(shopCategories).map(([key, val]) => (
                  <li
                    key={key}
                    className="flow-root list-none pt-[21px] px-6 mb-[15px]"
                    style={{ borderTop: "1px solid rgba(34, 31, 32, .15)" }}
                  >
                    <Link
                      href="/collections/all"
                      className="flex justify-between items-center m-0 w-full uppercase text-[12px] text-darkGray"
                    >
                      {key}
                    </Link>
                    <ul
                      className="list-none grid mb-[12px] mt-[16px]"
                      style={{
                        gridTemplateColumns:
                          "calc(50% - calc(24px / 2)) calc(50% - calc(24px / 2))",
                        gap: "0 24px",
                      }}
                    >
                      {val.links.map((link, index) => (
                        <li key={index} className="mb-[14px] flow-root">
                          <Link
                            href={link.href}
                            className="text-sm py-[3px] flex items-center justify-between w-full h2 text-shadow"
                          >
                            {link.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <li
            className="list-none flow-root mobile-nav_item"
            style={{ borderBottom: "1px solid rgba(34, 31, 32, .15)" }}
          >
            <button
              onClick={() => toggleDetails("mobile-menu-2")}
              className="py-[21px] px-6 text-[15px] leading-[1] flex justify-between items-center w-full m-0 touch-manipulation overflow-visible appearance-none normal-case text-lightBrown"
            >
              Collection
              <span className="plus-icon relative"></span>
            </button>
            <div
              id="mobile-menu-2"
              style={{
                overflow: "hidden",
                height: "0px",
                transition:
                  "height  0.6s cubic-bezier(0.75, 0, 0.175, 1), visibility 0.6s cubic-bezier(0.75, 0, 0.175, 1)",
              }}
            >
              <ul className="m-0 p-0">
                {Object.entries(collectionCategories).map(([key, val]) => (
                  <li
                    key={key}
                    className="flow-root list-none pt-[21px] px-6 mb-[15px]"
                    style={{ borderTop: "1px solid rgba(34, 31, 32, .15)" }}
                  >
                    <Link
                      href="/collections/all"
                      className="flex justify-between items-center m-0 w-full uppercase text-[12px] text-darkGray"
                    >
                      {key}
                    </Link>
                    <ul
                      className="list-none grid mb-[12px] mt-[16px]"
                      style={{
                        gridTemplateColumns:
                          "calc(50% - calc(24px / 2)) calc(50% - calc(24px / 2))",
                        gap: "0 24px",
                      }}
                    >
                      {val.links.map((link, index) => (
                        <li key={index} className="mb-[14px] flow-root">
                          <Link
                            href={link.href}
                            className="text-sm py-[3px] flex items-center justify-between w-full h2 text-shadow"
                          >
                            {link.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              <div
                className="px-6 pb-6 overflow-x-auto overflow-y-hidden"
                style={{ scrollbarWidth: "none" }}
              >
                <div
                  className="grid gap-6"
                  style={{
                    gridTemplateColumns:
                      "calc(50% - 24px / 2) calc(50% - 24px / 2)",
                  }}
                >
                  {collectionCards.map((card, index) => (
                    <div key={index}>
                      <Link
                        href=""
                        className="min-w-0 max-w-full w-full block text-left mb-[13px] no-underline"
                        style={{ aspectRatio: "1 / 1" }}
                      >
                        <img
                          src={card.imgSrc}
                          srcSet={card.imgSrcset}
                          loading="lazy"
                          className="object-cover object-center block w-full h-full"
                        />
                      </Link>
                      <Link
                        href=""
                        className="no-underline list-none"
                        style={{ color: "inherit" }}
                      >
                        <span className="text-[15px] block w-max">
                          {card.title}
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </li>
          <li
            className="list-none flow-root mobile-nav_item"
            style={{ borderBottom: "1px solid rgba(34, 31, 32, .15)" }}
          >
            <Link
              href="/pages/about"
              className="text-[15px] list-none w-max py-[21px] px-6 block text-lightBrown"
            >
              About
            </Link>
          </li>
          <li
            className="list-none flow-root mobile-nav_item"
            style={{ borderBottom: "1px solid rgba(34, 31, 32, .15)" }}
          >
            <Link
              href="/pages/insitu"
              className="text-[15px] list-none w-max py-[21px] px-6 block text-lightBrown"
            >
              In Situ
            </Link>
          </li>
          <li
            className="list-none flow-root mobile-nav_item"
            style={{ borderBottom: "1px solid rgba(34, 31, 32, .15)" }}
          >
            <Link
              href="/pages/search"
              className="text-[15px] list-none w-max py-[21px] px-6 block text-lightBrown"
            >
              Search
            </Link>
          </li>
          <li className="list-none flow-root mobile-nav_item pb-[100px]">
            <Link
              href="/pages/account"
              className="text-[15px] list-none w-max py-[21px] px-6 block text-lightBrown"
            >
              Account
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
