"use client";

import AspectRatioContainer from "@/components/AspectRatioContainer";
import { furnitureCollection } from "@/constants/furniture";
import { formatPrice } from "@/helpers/formatPrice";
import Link from "next/link";
import React from "react";

const navLinks = [
  "shop all",
  "furniture",
  "decor",
  "dinning & entertainment",
  "soft goods",
  "lighting",
  "art",
];

export default function page() {
  return (
    <section>
      <div className="relative z-0">
        <section
          className="relative max-w-[1600px] grid"
          style={{ gridTemplateColumns: "calc(100% - 823px) 823px" }}
        >
          <div
            className="w-full max-w-[1600px] px-6 md:px-10 mt-[90px]"
            style={{ gridColumn: "span 2" }}
          >
            <div className="relative">
              <div className="max-w-[450px] w-full">
                <h1 className="h2 text-3xl md:text-4xl lg:text-5xl">
                  Furniture
                </h1>
              </div>
            </div>
          </div>
          <div className="max-w-[1600px] px-6 md:px-10">
            <div>
              <div className="max-w-[450px] w-full"></div>
            </div>
          </div>
          <div className="w-full max-w-[1600px] px-6 md:px-10">
            <div className="w-full max-w-full flex relative text-center">
              <div className="inline-flex relative items-center max-w-full">
                <div
                  className="overflow-y-hidden overflow-x-auto"
                  style={{
                    scrollSnapType: "x proximity",
                    scrollbarWidth: "none",
                  }}
                >
                  <ul className="flex min-w-0 flex-wrap space-x-5 pointer-events-auto">
                    {navLinks.map((li) => (
                      <li key={li} className="capitalize">
                        <a
                          href="/collections/all"
                          className="text-sm lg:text-[16px] h4"
                        >
                          {li}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-full max-w-full border-t border-listBorder mt-5 pt-5 relative">
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
            </div>
          </div>
        </section>

        <div className="relative z-[1]">
          <section>
            <div className="w-full max-w-[1600px] px-6 md:px-10">
              <div className="mt-10 flex">
                <div style={{ flex: "1 0 0" }}>
                  <div className="mb-[100px] relative pointer-events-none flex">
                    <div className="mr-[44px] pointer-events-auto flex items-center">
                      <div className="" style={{ position: "unset" }}>
                        <button
                          type="button"
                          className="text-xs overflow-visible appearance-none touch-manipulation"
                        >
                          <div className="w-full border-b border-listBorder text-[#a5a097]">
                            <span className="text-sm text-[#a5a097]">
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
                    <div className="flex items-center">
                      <div style={{ position: "unset" }}>
                        <button
                          type="button"
                          className="text-sm text-[#a5a097] appearance-none cursor-pointer touch-manipulation overflow-visible"
                        >
                          <div className="w-full text-[#a5a097] border-b border-listBorder">
                            <span className="text-sm text-[#a5a097] uppercase">
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
                <div
                  className="grid overflow-hidden collection"
                  style={{
                    gap: "48px 24px",
                  }}
                >
                  {furnitureCollection.map((item) => (
                    <div className="flex flex-col relative" key={item.id}>
                      <div
                        className="relative mb-4"
                        style={{
                          opacity: "1",
                          transition: "opacity .4s ease, transform .4s ease",
                        }}
                        id="product_item"
                      >
                        <div className="absolute right-2 top-2 z-10 flex flex-col items-end">
                          {item.toOrder && (
                            <span className="text-darkBrown py-1 px-2 bg-snow">
                              Made to Order
                            </span>
                          )}
                        </div>
                        <AspectRatioContainer
                          aspectRatio={3 / 4}
                          className="block relative mb-4"
                        >
                          <Link
                            href={`/product_page/${item.id}`}
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

                        <div className="flex justify-between items-center">
                          <div className="flex flex-col">
                            <Link
                              className="mt-[1px] mr-[10px] mb-[8px] h2 text-sm md:text-md lg:text-lg"
                              href="/"
                            >
                              {item.name}
                            </Link>
                            <div className="text-lightBrown h2 text-sm md:text-md lg:text-lg">
                              {item.type}
                            </div>
                          </div>

                          <div className="flex flex-col">
                            <div className="mt-[1px] mr-[10px] mb-[8px] flex flex-wrap justify-end">
                              <span>From&nbsp;</span>
                              <span>${formatPrice(item.price)}</span>
                            </div>

                            <div className="flex items-center justify-end">
                              {item.colors.map((color, idx) => (
                                <div
                                  className="w-2 h-2 rounded-full ml-2"
                                  key={idx}
                                  style={{ backgroundColor: `#${color}` }}
                                />
                              ))}
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
            <span
              className="h-[56px] w-[56px] relative table-cell text-center align-middle text-sm text-lightBrown page"
              style={{
                boxShadow:
                  "1px 0 rgb(212, 210, 204), 0 1px rgb(212, 210, 204), 1px 1px rgb(212, 210, 204), 1px 0 rgb(212, 210, 204) inset, 0 1px rgb(212, 210, 204) inset",
              }}
              aria-current="page"
            >
              1
            </span>
            <a
              href="/collections/furniture?page=1"
              className="h-[56px] w-[56px] relative table-cell text-center align-middle text-sm text-lightBrown page"
              style={{
                boxShadow:
                  "1px 0 rgb(212, 210, 204), 0 1px rgb(212, 210, 204), 1px 1px rgb(212, 210, 204), 1px 0 rgb(212, 210, 204) inset, 0 1px rgb(212, 210, 204) inset",
              }}
              //   aria-current="page"
            >
              2
            </a>
            <a
              href="/collections/furniture?page=1"
              className="h-[56px] w-[56px] relative table-cell text-center align-middle text-sm page"
              style={{
                boxShadow:
                  "1px 0 rgb(212, 210, 204), 0 1px rgb(212, 210, 204), 1px 1px rgb(212, 210, 204), 1px 0 rgb(212, 210, 204) inset, 0 1px rgb(212, 210, 204) inset",
              }}
              //   aria-current="page"
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
