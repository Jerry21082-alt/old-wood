"use client";

import AspectRatioContainer from "@/components/AspectRatioContainer";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { formatPrice } from "@/helpers/formatPrice";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { gsap } from "gsap";

export default function TheBromleyCollection() {
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
            src="//roweam.com/cdn/shop/articles/Roweam_Environmental_101019_Bromley_7ft_2203.jpg?v=1695071382&width=1500"
            srcSet="//roweam.com/cdn/shop/articles/Roweam_Environmental_101019_Bromley_7ft_2203.jpg?v=1695071382&width=200 200w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101019_Bromley_7ft_2203.jpg?v=1695071382&width=300 300w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101019_Bromley_7ft_2203.jpg?v=1695071382&width=400 400w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101019_Bromley_7ft_2203.jpg?v=1695071382&width=500 500w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101019_Bromley_7ft_2203.jpg?v=1695071382&width=600 600w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101019_Bromley_7ft_2203.jpg?v=1695071382&width=700 700w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101019_Bromley_7ft_2203.jpg?v=1695071382&width=800 800w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101019_Bromley_7ft_2203.jpg?v=1695071382&width=900 900w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101019_Bromley_7ft_2203.jpg?v=1695071382&width=1000 1000w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101019_Bromley_7ft_2203.jpg?v=1695071382&width=1100 1100w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101019_Bromley_7ft_2203.jpg?v=1695071382&width=1200 1200w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101019_Bromley_7ft_2203.jpg?v=1695071382&width=1300 1300w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101019_Bromley_7ft_2203.jpg?v=1695071382&width=1400 1400w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101019_Bromley_7ft_2203.jpg?v=1695071382&width=1500 1500w"
            alt="The Bromley Collection"
            style={{
              transform: isMounted ? "scale(1)" : "scale(1.2)",
              transition: "transform .4s ease-in-out",
            }}
          />
        </div>
        <div className="mx-6 md:mr-auto p-0 md:pr-[80px]">
          <h1 className="h4 text-2xl md:text-4xl mt-[48px] mb-[24px] inline-block">
            The Bromley Collection
          </h1>

          <div className="text-lightBrown text-[15px] h3">
            A sofa made for Sunday morning reading and naps by the fireplace.
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
                        src="//roweam.com/cdn/shop/files/101019_Bromley_7_1953.jpg?v=1699744654&width=1125"
                        srcSet="//roweam.com/cdn/shop/files/101019_Bromley_7_1953.jpg?v=1699744654&width=500 500w, //roweam.com/cdn/shop/files/101019_Bromley_7_1953.jpg?v=1699744654&width=600 600w, //roweam.com/cdn/shop/files/101019_Bromley_7_1953.jpg?v=1699744654&width=700 700w, //roweam.com/cdn/shop/files/101019_Bromley_7_1953.jpg?v=1699744654&width=800 800w, //roweam.com/cdn/shop/files/101019_Bromley_7_1953.jpg?v=1699744654&width=1000 1000w"
                        alt="Bromley Sofa"
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
                        The Bromley Sofa
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
                        A couch should be focused on comfort. How does it feel
                        when you sit on it? Is it comfortable to lay on? Does
                        the pitch of the back support your body? Every sofa
                        performs differently, but the single issue we’re always
                        trying to solve for is the challenge of finding a sofa
                        that looks good and allows for Sunday afternoon naps.
                      </span>
                      &nbsp;transforms a solid block into a delicate, undulating
                      leg.
                    </p>
                    <p className="mt-6">
                      <span>
                        One that doesn’t strain your neck or crush your arms.
                        One that allows you to open a good book with a cup of
                        tea and zen out to some classic jazz. A sofa that gently
                        allows your book to whisk you into the perfect afternoon
                        slumber.
                      </span>
                    </p>
                    <p className="mt-6">
                      And that's how the Bromley sofa was born.
                    </p>
                    <p className="mt-6">
                      Antiques and vintage designer pieces are the backbone of
                      our design business. An appreciation for their beauty if
                      so deeply ingrained in our heritage. We appreciate the
                      subtle beauty of a perfectly sculpted chair arm or the
                      patina of vintage velvet, it gets us every time.
                    </p>
                    <p className="mt-6">
                      If you know us, you know we’re romantics. We crave a
                      feeling of connection between people and their homes. Our
                      furniture becomes part of that story. We're always giving
                      a little piece of our hearts in every Roweam product.
                    </p>
                    <h5 className="block mt-10 mb-4 text-sm">
                      <b>THE INSPIRATION</b>
                    </h5>

                    <h4 className="mt-6">
                      <i>
                        <span className="h3">
                          “I have a love for the organs of a classic DeSede
                          Swiss quality product. Their attention to stitching
                          details and quality makes me swoon.”
                        </span>
                      </i>
                    </h4>
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
                          The Bromley Sofa
                        </a>
                      </div>
                    </div>
                    <div>
                      <div>
                        <span>2</span>
                        <a href="/" className="m-[7px] inline-block">
                          The Bromley Ottoman
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
                        src="//roweam.com/cdn/shop/files/101728-V_A_Bromley_Ottoman_-_VINTAGE_3614.jpg?v=1694698007&width=1500"
                        srcSet="//roweam.com/cdn/shop/files/101728-V_A_Bromley_Ottoman_-_VINTAGE_3614.jpg?v=1694698007&width=200 200w, //roweam.com/cdn/shop/files/101728-V_A_Bromley_Ottoman_-_VINTAGE_3614.jpg?v=1694698007&width=300 300w, //roweam.com/cdn/shop/files/101728-V_A_Bromley_Ottoman_-_VINTAGE_3614.jpg?v=1694698007&width=400 400w, //roweam.com/cdn/shop/files/101728-V_A_Bromley_Ottoman_-_VINTAGE_3614.jpg?v=1694698007&width=500 500w, //roweam.com/cdn/shop/files/101728-V_A_Bromley_Ottoman_-_VINTAGE_3614.jpg?v=1694698007&width=600 600w, //roweam.com/cdn/shop/files/101728-V_A_Bromley_Ottoman_-_VINTAGE_3614.jpg?v=1694698007&width=700 700w, //roweam.com/cdn/shop/files/101728-V_A_Bromley_Ottoman_-_VINTAGE_3614.jpg?v=1694698007&width=800 800w, //roweam.com/cdn/shop/files/101728-V_A_Bromley_Ottoman_-_VINTAGE_3614.jpg?v=1694698007&width=900 900w, //roweam.com/cdn/shop/files/101728-V_A_Bromley_Ottoman_-_VINTAGE_3614.jpg?v=1694698007&width=1000 1000w, //roweam.com/cdn/shop/files/101728-V_A_Bromley_Ottoman_-_VINTAGE_3614.jpg?v=1694698007&width=1100 1100w, //roweam.com/cdn/shop/files/101728-V_A_Bromley_Ottoman_-_VINTAGE_3614.jpg?v=1694698007&width=1200 1200w"
                        alt="The Bromley Ottoman"
                        loading="lazy"
                        className="object-cover object-center w-full h-full"
                      />
                    </a>
                    <div className="flex items-center">
                      <p className="ml-1">The Bromley Ottoman</p>
                    </div>
                  </div>
                  <div>
                    <a
                      href="/"
                      className="max-w-full w-[1874px] block overflow-hidden mb-5 article-item_img"
                    >
                      <img
                        src="//roweam.com/cdn/shop/files/101019_Bromley_7_1954.jpg?v=1694800544&width=1500"
                        srcSet="//roweam.com/cdn/shop/files/101019_Bromley_7_1954.jpg?v=1694800544&width=200 200w, //roweam.com/cdn/shop/files/101019_Bromley_7_1954.jpg?v=1694800544&width=300 300w, //roweam.com/cdn/shop/files/101019_Bromley_7_1954.jpg?v=1694800544&width=400 400w, //roweam.com/cdn/shop/files/101019_Bromley_7_1954.jpg?v=1694800544&width=500 500w, //roweam.com/cdn/shop/files/101019_Bromley_7_1954.jpg?v=1694800544&width=600 600w, //roweam.com/cdn/shop/files/101019_Bromley_7_1954.jpg?v=1694800544&width=700 700w, //roweam.com/cdn/shop/files/101019_Bromley_7_1954.jpg?v=1694800544&width=800 800w, //roweam.com/cdn/shop/files/101019_Bromley_7_1954.jpg?v=1694800544&width=900 900w, //roweam.com/cdn/shop/files/101019_Bromley_7_1954.jpg?v=1694800544&width=1000 1000w, //roweam.com/cdn/shop/files/101019_Bromley_7_1954.jpg?v=1694800544&width=1100 1100w, //roweam.com/cdn/shop/files/101019_Bromley_7_1954.jpg?v=1694800544&width=1200 1200w"
                        alt="The Bromley Sofa"
                        loading="lazy"
                        className="object-cover object-center w-full h-full"
                      />
                    </a>
                    <div className="flex items-center">
                      <p className="ml-1">The Bromley Sofa</p>
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
                      <h5 className="mt-6">
                        <span className="text-[15px]">
                          <b>The Collection</b>
                        </span>
                      </h5>
                      <p className="mt-6">
                        A grounded base creates strong pieces that handle
                        generations of wear. These pieces were created with
                        families in mind. Outfitted with exceptional internals
                        and outside upholstery, hand-pulled natural webbing and
                        inside upholstery, these pieces pass through the hands
                        of dozens of craftsmen, each with a lifetime worth of
                        knowledge.
                      </p>
                      <h5 className="mt-6">
                        <span className="text-[15px]">
                          <b>The Process</b>
                        </span>
                      </h5>
                      <p className="mt-6">
                        <span>
                          We design a little differently. We start with initial
                          sketches and developments of the details, but where we
                          really excel is when we're sitting side by side with
                          our artisans and craftsmen. Ideas grow and begin to
                          formulate with the touch our hands. It is, and will
                          always be, a key part of our process.
                        </span>
                      </p>
                      <p className="mt-6">
                        <span>
                          When an artist and artisan work side by side, there's
                          something magical about the way a piece takes shape.
                          It doesn’t come from 3D modeling; it's formulated by
                          years of instincts melding together win a spirit of
                          true collaboration.
                        </span>
                      </p>
                      <p className="mt-6">
                        <span>
                          From concepts to framing, turning to stitching,
                          quilting to down, and fabrication to upholstery
                          finishing, there are thousands of hours, from the
                          concept to the final quality approval, before our team
                          launches a new piece.
                        </span>
                      </p>
                      <h5 className="mt-6">
                        <span className="text-[15px]">
                          <b>Why You</b>
                        </span>
                      </h5>
                      <p className="mt-6">
                        <span>
                          After thousands of hours crafting our first Bromley
                          Sofa, we made one for for our {""}
                          <a href="/" target="_blank" className="underline">
                            Coasters’ Chance project
                          </a>{" "}
                          in Maine. After countless hours working or relaxing
                          with a glass of wine and a good book later, we still
                          agree that this is the most comfortable sofa we've
                          ever made. The perfect pitch, the perfect fill, the
                          perfect depth.
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
                    Shop The Bromley Collection
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
            <div
              className="w-full relative mt-6 md:mt-10"
              style={{ scrollMarginTop: "62.5px", transition: ".25s ease-out" }}
              id="shop-the-look"
            >
              <div className="relative overflow-hidden text-milk">
                <div className="absolute bottom-6 md:bottom-10 left-0 w-full">
                  <div className="w-full max-w-[1600px] px-6 md:px-10">
                    <div className="max-w-[500px]">
                      <div className="h2 text-xl md:text-[34px]">
                        In Situ Living
                      </div>
                      <div className="mt-[15px]">
                        <p>
                          Our Belgian Midcentury project was designed by our
                          design team at Moore House Design. A selection of
                          pieces specifically picked for Living.
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
                    src="//roweam.com/cdn/shop/files/MOORE_HOUSE_DESIGN_NEW_ENGLAND_INTERIOR_DESIGN_FIRM_Blair_Moore__Belgian_Midcentury_Project_Living_room_great_room_01_RI1291_RESIZED_FOR_COLLECTIONS_a0364101-2afc-466c-aefa-4b1c040b75a2.jpg?v=1695063578&width=2160"
                    srcSet="//roweam.com/cdn/shop/files/MOORE_HOUSE_DESIGN_NEW_ENGLAND_INTERIOR_DESIGN_FIRM_Blair_Moore__Belgian_Midcentury_Project_Living_room_great_room_01_RI1291_RESIZED_FOR_COLLECTIONS_a0364101-2afc-466c-aefa-4b1c040b75a2.jpg?v=1695063578&width=500 500w, //roweam.com/cdn/shop/files/MOORE_HOUSE_DESIGN_NEW_ENGLAND_INTERIOR_DESIGN_FIRM_Blair_Moore__Belgian_Midcentury_Project_Living_room_great_room_01_RI1291_RESIZED_FOR_COLLECTIONS_a0364101-2afc-466c-aefa-4b1c040b75a2.jpg?v=1695063578&width=600 600w, //roweam.com/cdn/shop/files/MOORE_HOUSE_DESIGN_NEW_ENGLAND_INTERIOR_DESIGN_FIRM_Blair_Moore__Belgian_Midcentury_Project_Living_room_great_room_01_RI1291_RESIZED_FOR_COLLECTIONS_a0364101-2afc-466c-aefa-4b1c040b75a2.jpg?v=1695063578&width=700 700w, //roweam.com/cdn/shop/files/MOORE_HOUSE_DESIGN_NEW_ENGLAND_INTERIOR_DESIGN_FIRM_Blair_Moore__Belgian_Midcentury_Project_Living_room_great_room_01_RI1291_RESIZED_FOR_COLLECTIONS_a0364101-2afc-466c-aefa-4b1c040b75a2.jpg?v=1695063578&width=800 800w, //roweam.com/cdn/shop/files/MOORE_HOUSE_DESIGN_NEW_ENGLAND_INTERIOR_DESIGN_FIRM_Blair_Moore__Belgian_Midcentury_Project_Living_room_great_room_01_RI1291_RESIZED_FOR_COLLECTIONS_a0364101-2afc-466c-aefa-4b1c040b75a2.jpg?v=1695063578&width=1000 1000w, //roweam.com/cdn/shop/files/MOORE_HOUSE_DESIGN_NEW_ENGLAND_INTERIOR_DESIGN_FIRM_Blair_Moore__Belgian_Midcentury_Project_Living_room_great_room_01_RI1291_RESIZED_FOR_COLLECTIONS_a0364101-2afc-466c-aefa-4b1c040b75a2.jpg?v=1695063578&width=1200 1200w, //roweam.com/cdn/shop/files/MOORE_HOUSE_DESIGN_NEW_ENGLAND_INTERIOR_DESIGN_FIRM_Blair_Moore__Belgian_Midcentury_Project_Living_room_great_room_01_RI1291_RESIZED_FOR_COLLECTIONS_a0364101-2afc-466c-aefa-4b1c040b75a2.jpg?v=1695063578&width=1400 1400w, //roweam.com/cdn/shop/files/MOORE_HOUSE_DESIGN_NEW_ENGLAND_INTERIOR_DESIGN_FIRM_Blair_Moore__Belgian_Midcentury_Project_Living_room_great_room_01_RI1291_RESIZED_FOR_COLLECTIONS_a0364101-2afc-466c-aefa-4b1c040b75a2.jpg?v=1695063578&width=1600 1600w, //roweam.com/cdn/shop/files/MOORE_HOUSE_DESIGN_NEW_ENGLAND_INTERIOR_DESIGN_FIRM_Blair_Moore__Belgian_Midcentury_Project_Living_room_great_room_01_RI1291_RESIZED_FOR_COLLECTIONS_a0364101-2afc-466c-aefa-4b1c040b75a2.jpg?v=1695063578&width=1800 1800w, //roweam.com/cdn/shop/files/MOORE_HOUSE_DESIGN_NEW_ENGLAND_INTERIOR_DESIGN_FIRM_Blair_Moore__Belgian_Midcentury_Project_Living_room_great_room_01_RI1291_RESIZED_FOR_COLLECTIONS_a0364101-2afc-466c-aefa-4b1c040b75a2.jpg?v=1695063578&width=2000 2000w"
                    alt="product image"
                    className="w-full object-cover object-center hidden md:inline-block"
                  />
                </div>
                <div className="absolute top-[30%] md:top-[55%] left-[15%] md:left-[62%] ml-[-12px] mt-[-12px]">
                  <button
                    type="button"
                    className="w-4 h-4 float-left rounded-full border border-milk tap-area "
                  >
                    <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm md:text-md lg:text-lg">
                      The Bromley Sofa
                    </span>
                  </button>
                  <div
                    className="py-[10px] pl-[10px] pr-[20px] md:grid hidden w-min gap-[15px] absolute top-1/2 max-w-[60vw] md:top-full shadow-md z-[1] bg-[#221f20]"
                    id="reveal-more"
                    style={{
                      opacity: "0",
                      visibility: "hidden",
                      transform: "scale(0) translateY(0%)",
                      right: "calc(100% + 7px)",
                      gridTemplateColumns: "100px 100px",
                    }}
                  >
                    <div className="w-[100px] h-[100px] bg-[#a5a097] mr-[15px] overflow-hidden">
                      <img
                        src="//roweam.com/cdn/shop/files/101019_Bromley_7_1953.jpg?v=1699744654&width=1125"
                        srcSet="//roweam.com/cdn/shop/files/101019_Bromley_7_1953.jpg?v=1699744654&width=144 144w, //roweam.com/cdn/shop/files/101019_Bromley_7_1953.jpg?v=1699744654&width=216 216w, //roweam.com/cdn/shop/files/101019_Bromley_7_1953.jpg?v=1699744654&width=288 288w"
                        className="h-full w-full object-cover object-center bg-[#a5a097]"
                      />
                    </div>
                    <div className="flex flex-wrap h-[96px] text-[#f3f1ea] content-between">
                      <Link
                        href="/"
                        className="pointer-events-none block mb-[2px] text-xs md:text-sm"
                      >
                        Bromley Sofa
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
                <div className="absolute top-[42%] md:top-[62%] left-[66%] md:left-[27%] ml-[-12px] mt-[-12px]">
                  <button
                    type="button"
                    className="w-4 h-4 float-left rounded-full border border-milk tap-area"
                  >
                    <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm md:text-md lg:text-lg">
                      Black Cumin Pots
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
                <div className="absolute top-[57%] md:top-[71%] left-[54%] md:left-[25%] ml-[-12px] mt-[-12px]">
                  <button
                    type="button"
                    className="w-4 h-4 float-left rounded-full border border-milk tap-area"
                  >
                    <span className="absolute top-[-4px] left-6 whitespace-nowrap normal-case text-sm md:text-md lg:text-lg">
                      Decorative Objects
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
                    src="//roweam.com/cdn/shop/articles/Roweam_Environmental_101732_Disc_Side_Table_2558.jpg?v=1694801708&width=2500"
                    srcSet="//roweam.com/cdn/shop/articles/Roweam_Environmental_101732_Disc_Side_Table_2558.jpg?v=1694801708&width=352 352w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101732_Disc_Side_Table_2558.jpg?v=1694801708&width=832 832w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101732_Disc_Side_Table_2558.jpg?v=1694801708&width=1200 1200w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101732_Disc_Side_Table_2558.jpg?v=1694801708&width=1920 1920w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101732_Disc_Side_Table_2558.jpg?v=1694801708&width=2500 2500w"
                    alt="Disc Collection"
                    loading="lazy"
                    className="object-center object-cover w-full h-full"
                  />
                </a>
                <div>
                  <h3 className="mt-[12px] mb-4 text-[18px] md:text-xl block w-full pb-[5px] h2">
                    <a href="/blogs/collections/the-sabi-collection">
                      The Disc Collection
                    </a>
                  </h3>

                  <div className="text-lightBrown h3 text-[15px]">
                    A collection of elegant, handcrafted case goods that walk
                    the line between minimal and maximal design.{" "}
                  </div>
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