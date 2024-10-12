"use client";

import AspectRatioContainer from "@/components/AspectRatioContainer";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { formatPrice } from "@/helpers/formatPrice";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { gsap } from "gsap";

export default function TheAnniversaryCollection() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 999);
      };

      handleResize();

      window.addEventListener("resize", handleResize());

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    async function fetchData(limit = 2) {
      try {
        const res = await fetch(`/api/products?limit=${limit}`);
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.log("Failed to fetch data", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
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

  //   const containerGutter = "40px";
  const containerGutter = "24px";
  const articleListRowGap = `calc(2 * ${containerGutter})`;
  const articleListColumnGap = "20px";

  const customStyles = {
    article_img_wrapper: {
      "--container-gutter": containerGutter,
      margin: `calc(2* var(--container-gutter)) 0 var(--container-gutter) 0`,
      gap: "24px",
      gridTemplateColumns: ` calc(50% - 12px) calc(50% - 12px)`,
    },
    article_z: !isMobile ? { width: "calc(50% - 12px)" } : {},
    article_y: !isMobile
      ? { width: "calc(25% - 16px)" }
      : { width: "calc(50% - 12px)" },
    article_gap: !isMobile
      ? {
          "--article-list-row-gap": articleListRowGap,
          "--article-list-column-gap": articleListColumnGap,
          display: "flex",
          flexWrap: "wrap",
          gap: `var(--article-list-row-gap) var(--article-list-column-gap)`,
        }
      : {
          "--container-gutter": "24px",
          "--article-list-row-gap": "calc(2* 24px)",
          "--article-list-column-gap": articleListColumnGap,
          //   display: "flex",
          //   flexWrap: "wrap",
          gap: `var(--article-list-row-gap) var(--article-list-column-gap)`,
        },
    multi_column_inner: !isMobile
      ? {
          gridTemplateColumns:
            "calc(30% - 24px) calc(35% - 12px) calc(35% - 12px)",
          gap: "24px",
        }
      : {
          gridTemplateColumns: "100%",
          gap: "32px 12px",
        },
  };

  return (
    <section className="mt-[100px]">
      <div className="flex flex-wrap md:flex-nowrap mt-7 md:mt-20 flex-row md:flex-row-reverse relative max-w-[1600px] p-0 md:px-10">
        <div
          className="w-full md:w-[70%] order-2 md:order-none overflow-hidden flex-none"
          style={customStyles.article_img_wrapper}
        >
          <img
            src="//roweam.com/cdn/shop/articles/Roweam_Environmental_101732_Disc_Side_Table_2558.jpg?v=1694801708&width=1500"
            srcSet="//roweam.com/cdn/shop/articles/Roweam_Environmental_101732_Disc_Side_Table_2558.jpg?v=1694801708&width=200 200w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101732_Disc_Side_Table_2558.jpg?v=1694801708&width=300 300w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101732_Disc_Side_Table_2558.jpg?v=1694801708&width=400 400w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101732_Disc_Side_Table_2558.jpg?v=1694801708&width=500 500w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101732_Disc_Side_Table_2558.jpg?v=1694801708&width=600 600w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101732_Disc_Side_Table_2558.jpg?v=1694801708&width=700 700w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101732_Disc_Side_Table_2558.jpg?v=1694801708&width=800 800w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101732_Disc_Side_Table_2558.jpg?v=1694801708&width=900 900w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101732_Disc_Side_Table_2558.jpg?v=1694801708&width=1000 1000w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101732_Disc_Side_Table_2558.jpg?v=1694801708&width=1100 1100w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101732_Disc_Side_Table_2558.jpg?v=1694801708&width=1200 1200w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101732_Disc_Side_Table_2558.jpg?v=1694801708&width=1300 1300w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101732_Disc_Side_Table_2558.jpg?v=1694801708&width=1400 1400w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101732_Disc_Side_Table_2558.jpg?v=1694801708&width=1500 1500w"
            alt="The Disc Collection"
            style={{
              transform: isMounted ? "scale(1)" : "scale(1.2)",
              transition: "transform .4s ease-in-out",
            }}
          />
        </div>
        <div className="mx-6 md:mr-auto p-0 md:pr-[80px]">
          <h1 className="h4 text-2xl md:text-5xl mt-[48px] mb-[24px] inline-block">
            The Disc Collection
          </h1>

          <div className="text-lightBrown text-[15px] h3">
            A collection of elegant, handcrafted case goods that walk the line
            between minimal and maximal design.{" "}
          </div>
        </div>
      </div>

      <div>
        <section>
          <div className="my-10 md:my-20">
            <div className="max-w-[1600px] px-6 md:px-10">
              <div
                className="flex flex-wrap md:flex-nowrap justify-center"
                style={{ flexDirection: "unset", minHeight: "unset" }}
              >
                <div className="order-2 md:order-none pt-[60px] relative md:sticky left-0 top-0 md:top-[65%] flex-grow-0 pr-0 md:pr-10 md:flex-grow w-full md:w-[30%] max-w-full">
                  <div
                    className="grid items-center md:block mb-[60px]"
                    style={customStyles.article_img_wrapper}
                  >
                    <a href="/" className="max-w-full md:max-w-[70%] block">
                      <img
                        src="//roweam.com/cdn/shop/files/101736_Disc_Desk_2437_21dafa80-4b6c-437c-88b1-ab684b9e39e1.jpg?v=1701886270&width=1500"
                        srcSet="//roweam.com/cdn/shop/files/101736_Disc_Desk_2437_21dafa80-4b6c-437c-88b1-ab684b9e39e1.jpg?v=1701886270&width=500 500w, //roweam.com/cdn/shop/files/101736_Disc_Desk_2437_21dafa80-4b6c-437c-88b1-ab684b9e39e1.jpg?v=1701886270&width=600 600w, //roweam.com/cdn/shop/files/101736_Disc_Desk_2437_21dafa80-4b6c-437c-88b1-ab684b9e39e1.jpg?v=1701886270&width=700 700w, //roweam.com/cdn/shop/files/101736_Disc_Desk_2437_21dafa80-4b6c-437c-88b1-ab684b9e39e1.jpg?v=1701886270&width=800 800w, //roweam.com/cdn/shop/files/101736_Disc_Desk_2437_21dafa80-4b6c-437c-88b1-ab684b9e39e1.jpg?v=1701886270&width=1000 1000w, //roweam.com/cdn/shop/files/101736_Disc_Desk_2437_21dafa80-4b6c-437c-88b1-ab684b9e39e1.jpg?v=1701886270&width=1200 1200w, //roweam.com/cdn/shop/files/101736_Disc_Desk_2437_21dafa80-4b6c-437c-88b1-ab684b9e39e1.jpg?v=1701886270&width=1400 1400w"
                        alt="Disc Desk"
                        className="max-w-full max-h-full"
                      />
                    </a>
                    <div>
                      <div className="mt-5 md:mt-[10px] text-lightBrown text-xs md:text-sm uppercase w-max">
                        featured
                      </div>
                      <a
                        href="/"
                        className="text-[18px] mb-5 mt-[10px] block relative w-max"
                      >
                        Disc Desk
                      </a>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-[70%] flex-grow-0 md:flex-grow max-w-full">
                  <div>
                    <h5 className="block mt-10 mb-4 text-sm">
                      <b>THE CONCEPTION</b>
                    </h5>
                    <p className="text-sm" style={{ lineHeight: "1.5" }}>
                      <span>
                        Our Disc collection was born from a love of turnings.
                        We're always surprised how the subtle nature of a
                        hand-drawn story pole
                      </span>
                      &nbsp;transforms a solid block into a delicate, undulating
                      leg.
                    </p>
                    <p className="mt-6">
                      <span>
                        The ability to turn and sculpt one material into another
                        is at the heart of what we do for our clients at Moore
                        House Design. Now with Roweam, the journey
                        transformation through design is available to all.{" "}
                      </span>
                    </p>
                    <h4 className="mt-6">
                      <i>
                        <span className="h3">
                          “I would watch my father turn incredible pieces when I
                          was a little girl. I'd sit with him sculpting pieces
                          for my own block house. I vividly remember the
                          spitting of the sawdust, and the gentle pressure of
                          the chisel against the lathe-
                        </span>
                      </i>
                      <i>
                        <span className="h3">
                          this will always be my happy place”
                        </span>
                      </i>
                    </h4>
                    <h5 className="block mt-10 mb-4 text-sm">
                      <b>THE INSPIRATION</b>
                    </h5>
                    <p className="mt-6">
                      Our Father and his love for creating something when you
                      can't find what you are looking for.
                    </p>
                    <h4 className="mt-6">
                      <i>
                        <span className="h3">
                          “Our dad has always been an 'if you can’t find it,
                          build it' kind of guy. It always seemed like nothing
                          was too hard for him. My sister, Bromley, and I both
                          grew up this way, always solving problems and creating
                          solutions with our furniture from an early age. Roweam
                          is our tribute to him and the beautiful property we
                          grew up on in Africa” - Lagos-Ng, Founder of OLDWOOD"
                        </span>
                      </i>
                    </h4>
                    <h5 className="mt-6">
                      <span className="text-[15px]">
                        <b>Bobbin furniture of the late 1700’s</b>
                      </span>
                    </h5>
                    <p className="mt-6">
                      Our spool furniture, which is supported by legs that have
                      been turned on a lathe, reduces visual weight and adds
                      ornamentation to any piece of furniture. Seen often in
                      Northern Europe, this technique has been used by numerous
                      furniture makers and designers throughout history.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="my-6 md:my-10">
          <div className="flow-root">
            <div className="px-6 md:px-10">
              <div className="relative block">
                <div
                  className="grid pb-[2px]"
                  style={customStyles.multi_column_inner}
                >
                  <div className="hidden md:block">
                    <div>
                      <div>
                        <span>1</span>
                        <a href="/" className="m-[7px] inline-block">
                          Disc Collection
                        </a>
                      </div>
                    </div>
                    <div>
                      <div>
                        <span>2</span>
                        <a href="/" className="m-[7px] inline-block">
                          Disc Side Table
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <a
                      href="/"
                      className="max-w-full w-[1874px] block overflow-hidden mb-5"
                    >
                      <img
                        src="//roweam.com/cdn/shop/files/Roweam_Environmental_101736_Disc_Desk_2514.jpg?v=1695070297&width=1668"
                        srcSet="//roweam.com/cdn/shop/files/Roweam_Environmental_101736_Disc_Desk_2514.jpg?v=1695070297&width=200 200w, //roweam.com/cdn/shop/files/Roweam_Environmental_101736_Disc_Desk_2514.jpg?v=1695070297&width=300 300w, //roweam.com/cdn/shop/files/Roweam_Environmental_101736_Disc_Desk_2514.jpg?v=1695070297&width=400 400w, //roweam.com/cdn/shop/files/Roweam_Environmental_101736_Disc_Desk_2514.jpg?v=1695070297&width=500 500w, //roweam.com/cdn/shop/files/Roweam_Environmental_101736_Disc_Desk_2514.jpg?v=1695070297&width=600 600w, //roweam.com/cdn/shop/files/Roweam_Environmental_101736_Disc_Desk_2514.jpg?v=1695070297&width=700 700w, //roweam.com/cdn/shop/files/Roweam_Environmental_101736_Disc_Desk_2514.jpg?v=1695070297&width=800 800w, //roweam.com/cdn/shop/files/Roweam_Environmental_101736_Disc_Desk_2514.jpg?v=1695070297&width=900 900w, //roweam.com/cdn/shop/files/Roweam_Environmental_101736_Disc_Desk_2514.jpg?v=1695070297&width=1000 1000w, //roweam.com/cdn/shop/files/Roweam_Environmental_101736_Disc_Desk_2514.jpg?v=1695070297&width=1100 1100w, //roweam.com/cdn/shop/files/Roweam_Environmental_101736_Disc_Desk_2514.jpg?v=1695070297&width=1200 1200w"
                        alt="The Disc Desk"
                        loading="lazy"
                        className="object-cover object-center w-full h-full"
                      />
                    </a>
                    <div className="flex items-center">
                      <p className="ml-1">The Disc Desk</p>
                    </div>
                  </div>
                  <div>
                    <a
                      href="/"
                      className="max-w-full w-[1874px] block overflow-hidden mb-5 article-item_img"
                    >
                      <img
                        src="//roweam.com/cdn/shop/files/Roweam_Environmental_101732_Disc_Side_Table_2564_fd63b739-179f-4b1e-a650-f414ca7add6f.jpg?v=1695070297&width=1668"
                        srcSet="//roweam.com/cdn/shop/files/Roweam_Environmental_101732_Disc_Side_Table_2564_fd63b739-179f-4b1e-a650-f414ca7add6f.jpg?v=1695070297&width=200 200w, //roweam.com/cdn/shop/files/Roweam_Environmental_101732_Disc_Side_Table_2564_fd63b739-179f-4b1e-a650-f414ca7add6f.jpg?v=1695070297&width=300 300w, //roweam.com/cdn/shop/files/Roweam_Environmental_101732_Disc_Side_Table_2564_fd63b739-179f-4b1e-a650-f414ca7add6f.jpg?v=1695070297&width=400 400w, //roweam.com/cdn/shop/files/Roweam_Environmental_101732_Disc_Side_Table_2564_fd63b739-179f-4b1e-a650-f414ca7add6f.jpg?v=1695070297&width=500 500w, //roweam.com/cdn/shop/files/Roweam_Environmental_101732_Disc_Side_Table_2564_fd63b739-179f-4b1e-a650-f414ca7add6f.jpg?v=1695070297&width=600 600w, //roweam.com/cdn/shop/files/Roweam_Environmental_101732_Disc_Side_Table_2564_fd63b739-179f-4b1e-a650-f414ca7add6f.jpg?v=1695070297&width=700 700w, //roweam.com/cdn/shop/files/Roweam_Environmental_101732_Disc_Side_Table_2564_fd63b739-179f-4b1e-a650-f414ca7add6f.jpg?v=1695070297&width=800 800w, //roweam.com/cdn/shop/files/Roweam_Environmental_101732_Disc_Side_Table_2564_fd63b739-179f-4b1e-a650-f414ca7add6f.jpg?v=1695070297&width=900 900w, //roweam.com/cdn/shop/files/Roweam_Environmental_101732_Disc_Side_Table_2564_fd63b739-179f-4b1e-a650-f414ca7add6f.jpg?v=1695070297&width=1000 1000w, //roweam.com/cdn/shop/files/Roweam_Environmental_101732_Disc_Side_Table_2564_fd63b739-179f-4b1e-a650-f414ca7add6f.jpg?v=1695070297&width=1100 1100w, //roweam.com/cdn/shop/files/Roweam_Environmental_101732_Disc_Side_Table_2564_fd63b739-179f-4b1e-a650-f414ca7add6f.jpg?v=1695070297&width=1200 1200w"
                        alt="The Disc Side Table"
                        loading="lazy"
                        className="object-cover object-center w-full h-full"
                      />
                    </a>
                    <div className="flex items-center">
                      <p className="ml-1">The Disc Side Table</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="my-20">
            <div>
              <div className="max-w-[1600px] px-6 md:px-10">
                <div className="relative flex items-start justify-center">
                  <div className="w-[30%] sticky top-[65px] pr-10 max-w-full hidden md:block"></div>
                  <div className="flex-grow w-[70%] max-w-full">
                    <div>
                      <h3 className="mt-12 mb-6 text-2xl md:text-4xl h3">
                        <i>
                          <span>
                            “I learned how to use the lathe when I was a toddler
                            while my father worked on custom millwork for an old
                            library in Greenwich, Connecticut. From there I was
                            hooked.”
                          </span>
                          <span>
                            <span>&nbsp;</span>- Blair Moore, Founder of Oldwood
                          </span>
                        </i>
                      </h3>
                      <h5 className="mt-6">
                        <span className="text-[15px]">
                          <b>The Collection</b>
                        </span>
                      </h5>
                      <p className="mt-6">
                        A collection of hand-turned pieces inspired by bobbin
                        furniture, but our disc-like shapes turn the tradition
                        on its head. A playful collection full of
                        experimentation from our{" "}
                        <a
                          href="/"
                          className="underline text-lightBrown"
                          target="_blank"
                        >
                          Disc Side Table
                        </a>
                        to the{" "}
                        <a
                          href="/"
                          target="_blank"
                          className="underline text-lightBrown"
                        >
                          NBL coffee table
                        </a>{" "}
                        to our{" "}
                        <a
                          href="/"
                          className="underline text-lightBrown"
                          target="_blank"
                        >
                          Disc Desk
                        </a>
                        . These playful legs create the feeling of constant
                        change and motion-and that’s the point.
                      </p>
                      <h5 className="mt-6">
                        <span className="text-[15px]">
                          <b>The Process</b>
                        </span>
                      </h5>
                      <p className="mt-6">
                        <span>
                          We work with several of our tried-and-true artisans
                          and makers directly during every stage of the process.
                          From material selections to finish details, nothing is
                          overlooked. We couldn’t be more ecstatic about the
                          final product.
                        </span>
                      </p>
                      <h5 className="mt-6">
                        <span className="text-[15px]">
                          <b>Why You</b>
                        </span>
                      </h5>
                      <p className="mt-6">
                        <span>
                          Constructed from oak wood and balanced between minimal
                          and maximal design styles, these pieces will meld
                          beautifully into any space. Roweam crafts pieces with
                          only the highest quality of materials. Materials that
                          contribute to this moment in history; pieces that are
                          made to age. This is the new nostalgia.
                        </span>
                      </p>
                    </div>
                    <div className="w-full border-t border-listBorder flex justify-between items-start pt-[30px] mt-[75px]">
                      <div className="text-lightBrown text-sm">
                        <i>Blair Moore</i>
                      </div>
                      <a
                        href="/blogs/collections"
                        className="relative shop-button text-lightBrown text-sm uppercase"
                      >
                        Back to collection
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="my-7">
          <div className="px-6 md:px-10 max-w-[1600px]">
            <header className="max-w-full mb-[30px] md:mb-12">
              <div>
                <div className="flex items-center justify-center gap-6 flex-wrap">
                  <h3 className="block w-full text-[18px] h2">
                    Shop The Disc Collection
                  </h3>
                </div>
              </div>
            </header>
            {isLoading ? (
              <LoadingSkeleton></LoadingSkeleton>
            ) : (
              <div className="relative block">
                <div className="grid overflow-hidden collection">
                  {isLoading
                    ? Array.from({ length: 6 }).map((_, index) => (
                        <LoadingSkeleton key={index}></LoadingSkeleton>
                      ))
                    : products.map((item, idx) => (
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
            )}
          </div>
        </section>
      </div>

      <div>
        <section>
          <div
            className="relavie block overflow-hidden"
            style={{ marginTop: "calc(3* 24px)" }}
          >
            <div>
              <div
                className="w-full relative mt-6 md:mt-10"
                style={{
                  scrollMarginTop: "62.5px",
                  transition: ".25s ease-out",
                }}
                id="shop-the-look"
              >
                <div className="relative overflow-hidden text-milk">
                  <div className="absolute bottom-6 md:bottom-10 left-0 w-full">
                    <div className="w-full max-w-[1600px] px-6 md:px-10">
                      <div className="max-w-[500px]">
                        <div className="h2 text-xl md:text-[34px]">
                          The Bromley In Situ
                        </div>
                        <div className="mt-[15px]">
                          <p>
                            Our connerstone collection, designed with families
                            in mind. A curated selection of pieces of specially
                            styled for a life well lived.
                          </p>
                          <div className="mt-5">
                            <Link
                              href="/"
                              className="inline-block uppercase relative shop-room-button"
                            >
                              shop this room
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img
                      src="//roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0241-MAIN1_f7c34840-0861-42de-82d0-31b6a161d10b.jpg?v=1695061919&width=2500"
                      srcSet="//roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0241-MAIN1_f7c34840-0861-42de-82d0-31b6a161d10b.jpg?v=1695061919&width=500 500w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0241-MAIN1_f7c34840-0861-42de-82d0-31b6a161d10b.jpg?v=1695061919&width=600 600w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0241-MAIN1_f7c34840-0861-42de-82d0-31b6a161d10b.jpg?v=1695061919&width=700 700w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0241-MAIN1_f7c34840-0861-42de-82d0-31b6a161d10b.jpg?v=1695061919&width=800 800w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0241-MAIN1_f7c34840-0861-42de-82d0-31b6a161d10b.jpg?v=1695061919&width=1000 1000w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0241-MAIN1_f7c34840-0861-42de-82d0-31b6a161d10b.jpg?v=1695061919&width=1200 1200w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0241-MAIN1_f7c34840-0861-42de-82d0-31b6a161d10b.jpg?v=1695061919&width=1400 1400w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0241-MAIN1_f7c34840-0861-42de-82d0-31b6a161d10b.jpg?v=1695061919&width=1600 1600w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0241-MAIN1_f7c34840-0861-42de-82d0-31b6a161d10b.jpg?v=1695061919&width=1800 1800w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0241-MAIN1_f7c34840-0861-42de-82d0-31b6a161d10b.jpg?v=1695061919&width=2000 2000w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0241-MAIN1_f7c34840-0861-42de-82d0-31b6a161d10b.jpg?v=1695061919&width=2200 2200w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0241-MAIN1_f7c34840-0861-42de-82d0-31b6a161d10b.jpg?v=1695061919&width=2400 2400w"
                      alt="product image"
                      className="w-full object-cover object-center hidden md:inline-block"
                    />
                    <img
                      src="//roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0278_14be34f8-0d72-4c98-ae58-1d8742f021cd.jpg?v=1695061934&width=1874"
                      srcSet="//roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0278_14be34f8-0d72-4c98-ae58-1d8742f021cd.jpg?v=1695061934&width=500 500w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0278_14be34f8-0d72-4c98-ae58-1d8742f021cd.jpg?v=1695061934&width=600 600w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0278_14be34f8-0d72-4c98-ae58-1d8742f021cd.jpg?v=1695061934&width=700 700w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0278_14be34f8-0d72-4c98-ae58-1d8742f021cd.jpg?v=1695061934&width=800 800w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0278_14be34f8-0d72-4c98-ae58-1d8742f021cd.jpg?v=1695061934&width=1000 1000w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0278_14be34f8-0d72-4c98-ae58-1d8742f021cd.jpg?v=1695061934&width=1200 1200w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0278_14be34f8-0d72-4c98-ae58-1d8742f021cd.jpg?v=1695061934&width=1400 1400w, //roweam.com/cdn/shop/files/20230809-In_Situ-Living_01_0278_14be34f8-0d72-4c98-ae58-1d8742f021cd.jpg?v=1695061934&width=1600 1600w"
                      alt="product image"
                      className="object-cover object-center inline-block md:hidden"
                    />
                  </div>
                  <div className="absolute top-[21%] md:top-[28%] left-[27%] md:left-[47%] ml-[-12px] mt-[-12px]">
                    <button
                      type="button"
                      className="w-4 h-4 float-left rounded-full border border-milk tap-area bg-milk"
                    >
                      <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm md:text-md lg:text-lg">
                        Art
                      </span>
                    </button>
                    <div
                      className="py-[10px] pl-[10px] pr-[20px] grid w-min gap-[15px] absolute top-1/2 max-w-[60vw] md:top-full shadow-md z-[1] bg-[#221f20]"
                      style={{
                        opacity: "1",
                        visibility: "visible",
                        transform: "scale(1) translateY(-50%)",
                        left: "calc(100% + 7px)",
                        gridTemplateColumns: "100px 100px",
                      }}
                    >
                      <div className="w-[100px] h-[100px] bg-[#a5a097] mr-[15px] overflow-hidden">
                        <img
                          src="//roweam.com/cdn/shop/collections/101614_Shrewsbury_Watercolor_Signed_F_James_Swit_3445.jpg?v=1694729698&width=1500"
                          srcSet="//roweam.com/cdn/shop/collections/101614_Shrewsbury_Watercolor_Signed_F_James_Swit_3445.jpg?v=1694729698&width=144 144w, //roweam.com/cdn/shop/collections/101614_Shrewsbury_Watercolor_Signed_F_James_Swit_3445.jpg?v=1694729698&width=216 216w, //roweam.com/cdn/shop/collections/101614_Shrewsbury_Watercolor_Signed_F_James_Swit_3445.jpg?v=1694729698&width=288 288w"
                          alt="product image"
                          className="h-full w-full object-cover object-center bg-[#a5a097]"
                        />
                      </div>
                      <div className="flex flex-wrap h-[96px] text-[#f3f1ea] content-between">
                        <Link
                          href="/"
                          className="pointer-events-none block mb-[2px] text-xs md:text-sm"
                        >
                          Art
                        </Link>
                        <div className="w-full">
                          <Link
                            href="/"
                            className="pointer-events-none block mb-[2px] uppercase text-sm shop-room-button relative w-max"
                          >
                            see more
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[60%] md:top-[54%] left-[62%] md:left-[65%] ml-[-12px] mt-[-12px]">
                    <button
                      type="button"
                      className="w-4 h-4 float-left rounded-full border border-milk tap-area"
                    >
                      <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm md:text-md lg:text-lg">
                        Tables
                      </span>
                    </button>
                    <div
                      className="py-[10px] pl-[10px] pr-[20px] grid w-min gap-[15px] absolute top-1/2 max-w-[60vw] md:top-full shadow-md z-[1] bg-[#221f20]"
                      style={{
                        opacity: "1",
                        visibility: "hidden",
                        transform: "scale(1) translateY(-50%)",
                        left: "calc(100% + 7px)",
                        gridTemplateColumns: "100px 100px",
                      }}
                    >
                      <div className="w-[100px] h-[100px] bg-[#a5a097] mr-[15px] overflow-hidden">
                        <img
                          src="//roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=1500"
                          srcSet="//roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=144 144w, //roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=216 216w, //roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=288 288w"
                          alt="product image"
                          className="h-full w-full object-cover object-center bg-[#a5a097]"
                        />
                      </div>
                      <div className="flex flex-wrap h-[96px] text-[#f3f1ea] content-between">
                        <Link
                          href="/"
                          className="pointer-events-none block mb-[2px] text-xs"
                        >
                          Table Lamps
                        </Link>
                        <div className="w-full">
                          <Link
                            href="/"
                            className="pointer-events-none block mb-[2px] uppercase text-sm shop-room-button relative w-max"
                          >
                            see more
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[57%] md:top-[38%] left-[24%] md:left-[42%] ml-[-12px] mt-[-12px]">
                    <button
                      type="button"
                      className="w-4 h-4 float-left rounded-full border border-milk tap-area"
                    >
                      <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm md:text-md lg:text-lg">
                        Vases & Vessels
                      </span>
                    </button>
                    <div
                      className="py-[10px] pl-[10px] pr-[20px] grid w-min gap-[15px] absolute top-1/2 max-w-[60vw] md:top-full shadow-md z-[1] bg-[#221f20]"
                      style={{
                        opacity: "1",
                        visibility: "hidden",
                        transform: "scale(1) translateY(-50%)",
                        left: "calc(100% + 7px)",
                        gridTemplateColumns: "100px 100px",
                      }}
                    >
                      <div className="w-[100px] h-[100px] bg-[#a5a097] mr-[15px] overflow-hidden">
                        <img
                          src="//roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=1500"
                          srcSet="//roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=144 144w, //roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=216 216w, //roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=288 288w"
                          alt="product image"
                          className="h-full w-full object-cover object-center bg-[#a5a097]"
                        />
                      </div>
                      <div className="flex flex-wrap h-[96px] text-[#f3f1ea] content-between">
                        <Link
                          href="/"
                          className="pointer-events-none block mb-[2px] text-xs"
                        >
                          Table Lamps
                        </Link>
                        <div className="w-full">
                          <Link
                            href="/"
                            className="pointer-events-none block mb-[2px] uppercase text-sm shop-room-button relative w-max"
                          >
                            see more
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[67%] md:top-[55%] left-[77%] md:left-[42%] ml-[-12px] mt-[-12px]">
                    <button
                      type="button"
                      className="w-4 h-4 float-left rounded-full border border-milk tap-area"
                    >
                      <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm md:text-md lg:text-lg">
                        Dinning Chairs
                      </span>
                    </button>
                    <div
                      className="py-[10px] pl-[10px] pr-[20px] grid w-min gap-[15px] absolute top-1/2 max-w-[60vw] md:top-full shadow-md z-[1] bg-[#221f20]"
                      style={{
                        opacity: "0",
                        visibility: "hidden",
                        transform: "scale(1) translateY(0%)",
                        right: "calc(100% + 5px)",
                        gridTemplateColumns: "100px 100px",
                      }}
                    >
                      <div className="w-[100px] h-[100px] bg-[#a5a097] mr-[15px] overflow-hidden">
                        <img
                          src="//roweam.com/cdn/shop/files/Large_Round_Art_Pottery_Vase_1576.jpg?v=1717117447&width=1500"
                          srcSet="//roweam.com/cdn/shop/files/Large_Round_Art_Pottery_Vase_1576.jpg?v=1717117447&width=144 144w, //roweam.com/cdn/shop/files/Large_Round_Art_Pottery_Vase_1576.jpg?v=1717117447&width=216 216w, //roweam.com/cdn/shop/files/Large_Round_Art_Pottery_Vase_1576.jpg?v=1717117447&width=288 288w"
                          className="h-full w-full object-cover object-center bg-[#a5a097]"
                        />
                      </div>
                      <div className="flex flex-wrap h-[96px] text-[#f3f1ea] content-between">
                        <Link
                          href="/"
                          className="pointer-events-none block mb-[2px] text-xs"
                        >
                          Vases & Vessels
                        </Link>
                        <div className="w-full">
                          <Link
                            href="/"
                            className="pointer-events-none block mb-[2px] uppercase text-sm shop-room-button relative w-max"
                          >
                            see more
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[67%] md:top-[55%] left-[77%] md:left-[42%] ml-[-12px] mt-[-12px]">
                    <button
                      type="button"
                      className="w-4 h-4 float-left rounded-full border border-milk tap-area"
                    >
                      <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm md:text-md lg:text-lg">
                        Dinning Chairs
                      </span>
                    </button>
                    <div
                      className="py-[10px] pl-[10px] pr-[20px] md:grid hidden w-min gap-[15px] absolute top-1/2 max-w-[60vw] md:top-full shadow-md z-[1] bg-[#221f20]"
                      style={{
                        opacity: "0",
                        visibility: "hidden",
                        transform: "scale(0) translateY(0%)",
                        left: "calc(100% + 7px)",
                        gridTemplateColumns: "100px 100px",
                      }}
                      id="reveal-more"
                    >
                      <div className="w-[100px] h-[100px] bg-[#a5a097] mr-[15px] overflow-hidden">
                        <img
                          src="//roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=1500"
                          srcSet="//roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=144 144w, //roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=216 216w, //roweam.com/cdn/shop/files/Popsicle_Stick_Lamp_2013.jpg?v=1717109193&width=288 288w"
                          alt="product image"
                          className="h-full w-full object-cover object-center bg-[#a5a097]"
                        />
                      </div>
                      <div className="flex flex-wrap h-[96px] text-[#f3f1ea] content-between">
                        <Link
                          href="/"
                          className="pointer-events-none block mb-[2px] text-xs md:text-sm"
                        >
                          Table Lamps
                        </Link>
                        <div className="w-full">
                          <Link
                            href="/"
                            className="pointer-events-none block mb-[2px] uppercase text-sm md:text-lg shop-room-button relative w-max"
                          >
                            see more
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div
        style={{ marginTop: "calc(3* 28px)", marginBottom: "calc(4* 28px)" }}
      >
        <section className="my-7">
          <div className="px-6 md:px-10 max-w-[1600px]">
            <header className="mb-7 md:mb-[48px] text-center max-w-full mx-auto">
              <h2 className="block my-4 uppercase text-[16px] text-lightBrown">
                other collection
              </h2>
            </header>

            <div
              className="flex flex-wrap justify-start"
              style={customStyles.article_gap}
            >
              <div
                style={{
                  width: isMobile ? "calc(50% - 12px)" : "calc(25% - 16px)",
                }}
                id="collection"
              >
                <a
                  href="/blogs/collections/the-anniversary-collection"
                  className="h-[300px] md:h-auto relative block mb-5 md:mb-6 overflow-hidden article-item_img"
                  style={{ aspectRatio: isMobile ? "1 / 1.3" : "1 / 1.3" }}
                >
                  <img
                    src="//roweam.com/cdn/shop/articles/20240524-Roweam-In_Situ-Bromley_Mohair_03_0386.jpg?v=1726842729&width=1500"
                    srcSet="//roweam.com/cdn/shop/articles/20240524-Roweam-In_Situ-Bromley_Mohair_03_0386.jpg?v=1726842729&width=200 200w, //roweam.com/cdn/shop/articles/20240524-Roweam-In_Situ-Bromley_Mohair_03_0386.jpg?v=1726842729&width=300 300w, //roweam.com/cdn/shop/articles/20240524-Roweam-In_Situ-Bromley_Mohair_03_0386.jpg?v=1726842729&width=400 400w, //roweam.com/cdn/shop/articles/20240524-Roweam-In_Situ-Bromley_Mohair_03_0386.jpg?v=1726842729&width=500 500w, //roweam.com/cdn/shop/articles/20240524-Roweam-In_Situ-Bromley_Mohair_03_0386.jpg?v=1726842729&width=600 600w, //roweam.com/cdn/shop/articles/20240524-Roweam-In_Situ-Bromley_Mohair_03_0386.jpg?v=1726842729&width=700 700w, //roweam.com/cdn/shop/articles/20240524-Roweam-In_Situ-Bromley_Mohair_03_0386.jpg?v=1726842729&width=800 800w, //roweam.com/cdn/shop/articles/20240524-Roweam-In_Situ-Bromley_Mohair_03_0386.jpg?v=1726842729&width=900 900w, //roweam.com/cdn/shop/articles/20240524-Roweam-In_Situ-Bromley_Mohair_03_0386.jpg?v=1726842729&width=1000 1000w, //roweam.com/cdn/shop/articles/20240524-Roweam-In_Situ-Bromley_Mohair_03_0386.jpg?v=1726842729&width=1100 1100w, //roweam.com/cdn/shop/articles/20240524-Roweam-In_Situ-Bromley_Mohair_03_0386.jpg?v=1726842729&width=1200 1200w, //roweam.com/cdn/shop/articles/20240524-Roweam-In_Situ-Bromley_Mohair_03_0386.jpg?v=1726842729&width=1300 1300w, //roweam.com/cdn/shop/articles/20240524-Roweam-In_Situ-Bromley_Mohair_03_0386.jpg?v=1726842729&width=1400 1400w, //roweam.com/cdn/shop/articles/20240524-Roweam-In_Situ-Bromley_Mohair_03_0386.jpg?v=1726842729&width=1500 1500w"
                    alt="Sabi Collection"
                    loading="lazy"
                    className="object-center object-cover w-full h-full"
                  />
                </a>
                <div>
                  <h3 className="mt-[12px] mb-4 text-[18px] md:text-xl block w-full pb-[5px] h2">
                    <a href="/blogs/collections/the-anniversary-collection">
                      The Anniversary Collection
                    </a>
                  </h3>
                </div>
              </div>
              <div style={customStyles.article_y} id="collection">
                <a
                  href="/blogs/collections/the-sabi-collection"
                  className="h-[300px] md:h-auto relative block mb-5 md:mb-6 overflow-hidden article-item_img"
                  style={{ aspectRatio: !isMobile ? "1 / 1.3" : "" }}
                >
                  <img
                    src="//roweam.com/cdn/shop/articles/20230809-In_Situ-Sabi_02_0731-MAIN1_2.jpg?v=1724259876&width=2500"
                    srcSet="//roweam.com/cdn/shop/articles/20230809-In_Situ-Sabi_02_0731-MAIN1_2.jpg?v=1724259876&width=352 352w, //roweam.com/cdn/shop/articles/20230809-In_Situ-Sabi_02_0731-MAIN1_2.jpg?v=1724259876&width=832 832w, //roweam.com/cdn/shop/articles/20230809-In_Situ-Sabi_02_0731-MAIN1_2.jpg?v=1724259876&width=1200 1200w, //roweam.com/cdn/shop/articles/20230809-In_Situ-Sabi_02_0731-MAIN1_2.jpg?v=1724259876&width=1920 1920w, //roweam.com/cdn/shop/articles/20230809-In_Situ-Sabi_02_0731-MAIN1_2.jpg?v=1724259876&width=2500 2500w"
                    alt="Sabi Collection"
                    loading="lazy"
                    className="object-center object-cover w-full h-full"
                  />
                </a>
                <div>
                  <a
                    href="/"
                    className="my-[12px] text-lightBrown spacing-[1px] uppercase text-sm"
                  >
                    Casual Living
                  </a>
                  <h3 className="mt-[12px] mb-4 text-[18px] md:text-xl block w-full pb-[5px] h2">
                    <a href="/blogs/collections/the-sabi-collection">
                      Sabi Collection
                    </a>
                  </h3>

                  <div className="text-lightBrown h3 text-[15px]">
                    Designed with a woman in mind. Strong but graceful.
                  </div>
                </div>
              </div>
              <div
                className="w-full mt-6 md:mt-0"
                style={customStyles.article_z}
                id="collection"
              >
                <a
                  href="/"
                  className="h-[300px] md:h-auto w-full relative block mb-5 md:mb-6 overflow-hidden article-item_img"
                  style={{ aspectRatio: !isMobile ? "1.575" : "" }}
                >
                  <img
                    src="//roweam.com/cdn/shop/articles/Environmental_3646.jpg?v=1694965631&width=2500"
                    srcSet="//roweam.com/cdn/shop/articles/Environmental_3646.jpg?v=1694965631&width=352 352w, //roweam.com/cdn/shop/articles/Environmental_3646.jpg?v=1694965631&width=832 832w, //roweam.com/cdn/shop/articles/Environmental_3646.jpg?v=1694965631&width=1200 1200w, //roweam.com/cdn/shop/articles/Environmental_3646.jpg?v=1694965631&width=1920 1920w, //roweam.com/cdn/shop/articles/Environmental_3646.jpg?v=1694965631&width=2500 2500w"
                    loading="lazy"
                    alt="The Pavillion Collection"
                    className="w-full h-full object-cover object-center"
                  />
                </a>
                <div>
                  <h3 className="mt-[12px] text-[18px] md:text-xl block pb-[5px] w-full h2">
                    The Pavillion Collection
                  </h3>

                  <div className="text-lightBrown text-[15px] h3 mb-4">
                    Sweet lines and stately presence.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
