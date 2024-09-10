"use client";

import AspectRatioContainer from "@/components/AspectRatioContainer";
import { shuffledProducts } from "@/constants/shuffleAllProducts";
import { formatPrice } from "@/helpers/formatPrice";
import { getProducts } from "@/utils/fetchData";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import LoadingSkeleton from "@/components/LoadingSkeleton";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  {
    link: "shop all",
    href: "collections/all",
  },
  {
    link: "furniture",
    href: "collections/furniture",
  },
  {
    link: "decor",
    href: "collections/decor",
  },
  {
    link: "dinning & entertainment",
    href: "collections/dinning&entertainment",
  },
  {
    link: "soft goods",
    href: "collections/soft-goods",
  },
  {
    link: "lighting",
    href: "collections/lighting",
  },
  {
    link: "art",
    href: "collections/art",
  },
];

export default function page() {
  const pathname = usePathname();
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);

  async function getAllProducts(page = 1, limit = 12) {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/products?page=${page}&limit=${limit}`);
      const data = await res.json();
      setAllProducts(data.products);
      setCurrentPage(data.currentPage);
      setTotalPage(data.totalPages);
    } catch (error) {
      console.log("An error occured", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllProducts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setIsMobile(window.innerWidth <= 999);

      handleResize();

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const items = gsap.utils.toArray("#product_item");
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.1,
        }
      );

      items.forEach((item) => {
        const primaryImage = item.querySelector("#primary-img");
        const secondaryImage = item.querySelector("#secondary-img");

        gsap.set(secondaryImage, { autoAlpha: 0 });
        item.addEventListener("mouseenter", () => {
          gsap.to(primaryImage, { autoAlpha: 0, duration: 0.4 });
          gsap.to(secondaryImage, { autoAlpha: 1, duration: 0.4 });
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(primaryImage, { autoAlpha: 1, duration: 0.4 });
          gsap.to(secondaryImage, { autoAlpha: 0, duration: 0.4 });
        });
      });
    }
  }, [isLoading]);

  const handlePagination = (e, direction) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (direction === "next" && currentPage < totalPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "previous" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  const preventDefaultLink = (e) => e.preventDefault();

  const styles = {
    productShow: isMobile
      ? {
          gap: "32px 12px",
          marginLeft: `calc(-1 * 24px / 2)`,
          marginRight: `calc(-1 * 24px / 2)`,
          gridTemplateColumns: `repeat(
            autoFit,
            calc(
              100% / 2 - 12px *
                (2 - 1) /
                2
            )
          )`,
        }
      : {
          gridTemplateColumns: `repeat(
          autoFit,
          calc(
            100% / 4 - 24px *
              (4 - 1) /
              4
          )
        )`,
          gap: "48px 24px",
        },
  };

  return (
    <section>
      <div className="relative z-0">
        <section
          className="relative max-w-[1600px] block md:grid pb-10 md:pb-0"
          style={{ gridTemplateColumns: "calc(100% - 823px) 823px" }}
        >
          <div
            className="w-full max-w-[1600px] px-6 md:px-10 pt-[90px]"
            style={{ gridColumn: "span 2" }}
          >
            <div className="relative">
              <div className="max-w-[450px] w-full">
                <h1 className="h2 text-[46px] md:text-6xl mt-12 mb-6">
                  Shop All
                </h1>
              </div>
            </div>
          </div>
          <div className="max-w-[1600px] px-6 md:px-10">
            <div>
              <div className="max-w-[450px] w-full">
                <div className="text-sm md:text-[16px]">
                  A custom designed and curated selection of New and True
                  Vintage products aimed to celebrate the beauty of patina and
                  moments of nostalgia. Each piece represents a sense of
                  heritage and history, comfort and customs, and the art of old.
                </div>
              </div>
            </div>
          </div>
          <div className="w-full max-w-[1600px] pl-0 pr-0 md:pr-10">
            <div className="w-full max-w-full flex relative text-center mt-5 md:p-0 md:mt-0">
              <div
                className="inline-flex relative items-center max-w-full overflow-x-hidden"
                style={{ width: "calc(100% +(2* 4))" }}
              >
                <div
                  className="overflow-y-hidden overflow-x-scroll md:overflow-x-auto"
                  style={{
                    scrollSnapType: "x proximity",
                    scrollbarWidth: "none",
                  }}
                >
                  <ul className="flex min-w-0 flex-nowrap whitespace-nowrap md:whitespace-normal md:flex-wrap pointer-events-auto md:px-0 space-x-0 md:space-x-5">
                    {navLinks.map((li, index) => {
                      let isActive;
                      if (pathname.includes(li.href)) {
                        isActive = true;
                      }

                      return (
                        <li key={index} className="capitalize px-5 md:px-0">
                          <a
                            style={{ color: isActive ? "#221f20" : "#959697" }}
                            href={`/${li.href}`}
                            className="h2"
                          >
                            {li.link}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            {/* <div className="w-full max-w-full border-t border-listBorder mt-5 pt-5 relative">
              <div className="relative inline-flex items-center max-w-full">
                <div
                  className="overflow-y-hidden overflow-x-auto"
                  style={{
                    scrollbarWidth: "none",
                    scrollSnapType: "x proximity",
                  }}
                >
                  <ul className="flex min-w-0 flex-wrap space-x-5 pointer-events-auto">
                    <li>
                      <a
                        href="/collections/tables"
                        className="h4 text-sm lg:text-[16px]"
                      >
                        Tables
                      </a>
                    </li>
                    <li>
                      <a
                        href="/collections/tables"
                        className="h4 text-sm lg:text-[16px]"
                      >
                        Seating
                      </a>
                    </li>
                    <li>
                      <a
                        href="/collections/tables"
                        className="h4 text-sm lg:text-[16px]"
                      >
                        Casegoods
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}
          </div>
        </section>

        <div className="relative z-[1]">
          <section>
            <div className="w-full max-w-[1600px] px-6 md:px-10">
              <div className="mt-[30px] md:mt-10 flex">
                <div style={{ flex: "1 0 0" }}>
                  <div
                    className="mb-[45px] md:mb-[100px] relative pointer-events-none grid md:flex items-start"
                    style={{ gridTemplateColumns: "50% 50%" }}
                  >
                    <div className="mr-0 md:mr-[45px] pointer-events-auto flex items-center">
                      <div style={{ position: "unset" }}>
                        <button
                          type="button"
                          className="text-xs overflow-visible appearance-none touch-manipulation"
                        >
                          <div className="w-full border-b border-listBorder text-[#a5a097]">
                            <span className="text-xs md:text-sm text-[#a5a097]">
                              True Vintage
                            </span>
                            <svg
                              focusable="false"
                              width="12"
                              height="8"
                              viewBox="0 0 12 8"
                              className="ml-[10px] relative top-[-1px] inline-block overflow-visible"
                            >
                              <path
                                fill="none"
                                d="M1 1l5 5 5-5"
                                stroke="currentColor"
                                width="1"
                              ></path>
                            </svg>
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center ml-auto md:ml-0">
                      <div style={{ position: "unset" }}>
                        <button
                          type="button"
                          className="text-sm text-[#a5a097] appearance-none cursor-pointer touch-manipulation overflow-visible"
                        >
                          <div className="w-full text-[#a5a097] border-b border-listBorder">
                            <span className="text-xs md:text-sm text-[#a5a097] uppercase">
                              sort by
                            </span>
                            <svg
                              focusable="false"
                              width="12"
                              height="8"
                              viewBox="0 0 12 8"
                              className="ml-[10px] relative top-[-1px] inline-block overflow-visible"
                            >
                              <path
                                fill="none"
                                d="M1 1l5 5 5-5"
                                stroke="currentColor"
                                width="1"
                              ></path>
                            </svg>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative block">
                <div className="grid overflow-hidden collection">
                  {isLoading
                    ? Array.from({ length: 6 }).map((_, index) => (
                        <LoadingSkeleton key={index}></LoadingSkeleton>
                      ))
                    : allProducts.map((item, idx) => (
                        <div
                          className="flex flex-col relative"
                          key={idx}
                          id="product_item"
                        >
                          <div
                            className="relative mb-4"
                            style={{
                              opacity: "1",
                              transition:
                                "opacity .4s ease, transform .4s ease",
                            }}
                            id="product_item"
                          >
                            <div className="absolute right-2 top-2 z-10 flex flex-col items-end">
                              {item.toOrder && (
                                <span className="text-darkBrown py-1 px-2 bg-snow text-xs">
                                  Made to Order
                                </span>
                              )}
                            </div>
                            <AspectRatioContainer
                              aspectRatio={3 / 4}
                              className="block relative mb-4"
                            >
                              <Link
                                href={`/product_page/${item._id}`}
                                id="custom-aspect-ratio"
                                className="w-full h-full"
                              >
                                <img
                                  src={item.primaryImage.img}
                                  srcSet={item.primaryImage.srcSet}
                                  alt="product image"
                                  id="primary-img"
                                  className="object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
                                />
                                <img
                                  src={item.secondaryImage.img}
                                  alt="product image"
                                  id="secondary-img"
                                  className="object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full secondary-img"
                                />
                              </Link>
                            </AspectRatioContainer>

                            <div
                              className="grid"
                              style={{ gridTemplateColumns: "auto auto" }}
                            >
                              <a
                                href="/"
                                className="mt-[1px] mr-[10px] mb-2 ml-0 h4 leading-[1.2]"
                              >
                                {item.name}
                              </a>
                              <div>
                                <div className="flex justify-end items-baseline flex-wrap">
                                  <span className="text-sm md:text-[16px]">
                                    ${formatPrice(item.price)}
                                  </span>
                                </div>
                              </div>
                              <div
                                className="flex items-center"
                                style={{ gridColumn: "span 2" }}
                              >
                                <div className="h3 text-sm mr-[15px] text-lightBrown block mb-[6px]">
                                  {item.type}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="mt-10 mb-[150px] flex justify-center">
          <nav className="table border-separate table-fixed">
            <a
              href={`/collections/furniture?page=${currentPage + 1}`}
              onClick={(e) => handlePagination(e, "previous")}
              className="h-[56px] w-[56px] relative table-cell text-center align-middle text-sm page"
              style={{
                boxShadow:
                  "1px 0 rgb(212, 210, 204), 0 1px rgb(212, 210, 204), 1px 1px rgb(212, 210, 204), 1px 0 rgb(212, 210, 204) inset, 0 1px rgb(212, 210, 204) inset",
                visibility: currentPage === 1 ? "hidden" : "visible",
              }}
              // aria-current="page"
            >
              <svg
                focusable="false"
                width="15"
                height="15"
                viewBox="0 0 17 14"
                className="my-0 mx-auto"
              >
                <path
                  d="M17 7H2M8 1L2 7l6 6"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                ></path>
              </svg>
            </a>
            {Array.from({ length: totalPage }).map((_, index) =>
              currentPage === index + 1 ? (
                <span
                  key={index}
                  className="h-[56px] w-[56px] relative table-cell text-center align-middle text-sm text-lightBrown page"
                  style={{
                    boxShadow:
                      "1px 0 rgb(212, 210, 204), 0 1px rgb(212, 210, 204), 1px 1px rgb(212, 210, 204), 1px 0 rgb(212, 210, 204) inset, 0 1px rgb(212, 210, 204) inset",
                  }}
                  aria-current="page"
                >
                  {currentPage}
                </span>
              ) : (
                <a
                  href={`/collections/all?page=${index + 1}`}
                  onClick={(e) => handlePagination(e, "next")}
                  className="h-[56px] w-[56px] relative table-cell text-center align-middle text-sm text-lightBrown page"
                  style={{
                    boxShadow:
                      "1px 0 rgb(212, 210, 204), 0 1px rgb(212, 210, 204), 1px 1px rgb(212, 210, 204), 1px 0 rgb(212, 210, 204) inset, 0 1px rgb(212, 210, 204) inset",
                  }}
                  //   aria-current="page"
                >
                  {index + 1}
                </a>
              )
            )}

            <a
              href={`/collections/furniture?page=${currentPage + 1}`}
              onClick={(e) => handlePagination(e, "next")}
              className="h-[56px] w-[56px] relative table-cell text-center align-middle text-sm page"
              style={{
                boxShadow:
                  "1px 0 rgb(212, 210, 204), 0 1px rgb(212, 210, 204), 1px 1px rgb(212, 210, 204), 1px 0 rgb(212, 210, 204) inset, 0 1px rgb(212, 210, 204) inset",
              }}
              // aria-current="page"
            >
              <svg
                focusable="false"
                width="15"
                height="15"
                viewBox="0 0 17 14"
                className="my-0 mx-auto"
              >
                <path
                  d="M0 7h15M9 1l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                ></path>
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}
