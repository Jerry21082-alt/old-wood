"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function page() {
  const [isMobile, setIsMobile] = useState(false);

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
    const collections = document.querySelectorAll("#collection");
    const imgWithText = document.querySelector("#img-with_text");

    const items = gsap.utils.toArray(collections);
    gsap.fromTo(
      items,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1 }
    );
    gsap.fromTo(
      imgWithText,
      {
        opacity: 0,
        clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
      },
      {
        opacity: 1,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        scrollTrigger: {
          trigger: imgWithText,
          start: "top 95%",
          once: true,
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const containerGutter = "40px";
  const articleListRowGap = `calc(2 * ${containerGutter})`;
  const articleListColumnGap = "20px";

  const customStyles = {
    article_x: !isMobile ? { width: "calc(25% - 16px)" } : {},
    article_y: !isMobile
      ? { width: "calc(25% - 16px)" }
      : { width: "calc(50% - 12px)" },
    article_z: !isMobile ? { width: "calc(50% - 12px)" } : {},
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
          display: "flex",
          flexWrap: "wrap",
          gap: `var(--article-list-row-gap) var(--article-list-column-gap)`,
        },
  };

  return (
    <section className="mt-[75px] md:mt-[100px]">
      <div className="my-7">
        <div className="w-full max-w-[1600px] px-6 md:px-10">
          <div
            className="flex flex-wrap justify-start"
            style={customStyles.article_gap}
          >
            <div
              className="w-full"
              style={customStyles.article_x}
              id="collection"
            >
              <a
                href="/blogs/collections/the-anniversary-collection"
                className="h-[300px] md:h-auto relative block mb-5 md:mb-6 overflow-hidden article-item_img"
                style={{ aspectRatio: !isMobile ? "1 / 1.3" : "" }}
              >
                <img
                  src="//roweam.com/cdn/shop/articles/20230809-In_Situ-Sabi_02_0731-MAIN1_2_43995db3-6ef2-40ae-b43f-fff1eecb48f3.jpg?v=1724260061&width=2500"
                  srcSet="//roweam.com/cdn/shop/articles/20230809-In_Situ-Sabi_02_0731-MAIN1_2_43995db3-6ef2-40ae-b43f-fff1eecb48f3.jpg?v=1724260061&width=352 352w, //roweam.com/cdn/shop/articles/20230809-In_Situ-Sabi_02_0731-MAIN1_2_43995db3-6ef2-40ae-b43f-fff1eecb48f3.jpg?v=1724260061&width=832 832w, //roweam.com/cdn/shop/articles/20230809-In_Situ-Sabi_02_0731-MAIN1_2_43995db3-6ef2-40ae-b43f-fff1eecb48f3.jpg?v=1724260061&width=1200 1200w, //roweam.com/cdn/shop/articles/20230809-In_Situ-Sabi_02_0731-MAIN1_2_43995db3-6ef2-40ae-b43f-fff1eecb48f3.jpg?v=1724260061&width=1920 1920w, //roweam.com/cdn/shop/articles/20230809-In_Situ-Sabi_02_0731-MAIN1_2_43995db3-6ef2-40ae-b43f-fff1eecb48f3.jpg?v=1724260061&width=2500 2500w"
                  alt="The Anniversary Collection"
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
              </a>

              <div>
                <h3 className="mt-[12px] mb-4 text-[18px] md:text-xl block pb-[5px] w-full h2">
                  The Anniversary Collection
                </h3>
              </div>
            </div>
            <div style={{ width: "calc(50% - 12px)" }} id="collection">
              <a
                href="/blogs/collections/the-sabi-collection"
                className="h-[300px] md:h-auto relative block mb-5 md:mb-6 overflow-hidden article-item_img"
                style={{ aspectRatio: !isMobile ? "1.575 / 1" : "" }}
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
                  className="my-[12px] text-lightBrown spacing-[1px] uppercase text-xs md:text-sm"
                >
                  Casual Living
                </a>

                <h3 className="mt-[12px] mb-4 text-[18px] md:text-xl block w-full pb-[5px] h2">
                  <a href="/">Sabi Collection</a>
                </h3>

                <div className="text-lightBrown h3 text-[15px]">
                  Designed with a woman in mind. Strong but graceful.
                </div>
              </div>
            </div>
            <div style={customStyles.article_y} id="collection">
              <a
                href="/blogs/collections/the-disc-collection"
                className="h-[300px] md:h-auto relative block mb-5 md:mb-6 overflow-hidden article-item_img"
                style={{ aspectRatio: !isMobile ? "1 / 1.3" : "" }}
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
                  <a href="/blogs/collections/the-disc-collection">
                    The Disc Collection
                  </a>
                </h3>

                <div className="text-lightBrown h3 text-[15px]">
                  A collection of elegant, handcrafted case goods that walk the
                  line between minimal and maximal design.{" "}
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
            <div
              className="w-full mt-6 md:mt-0"
              style={customStyles.article_z}
              id="collection"
            >
              <a
                href="/"
                className="h-[300px] md:h-auto relative block mb-5 md:mb-6 overflow-hidden article-item_img"
                style={{ aspectRatio: !isMobile ? "1.575 / 1" : "" }}
              >
                <img
                  src="//roweam.com/cdn/shop/articles/Roweam_Environmental_101019_Bromley_7ft_2203.jpg?v=1695071382&width=2500"
                  srcSet="//roweam.com/cdn/shop/articles/Roweam_Environmental_101019_Bromley_7ft_2203.jpg?v=1695071382&width=352 352w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101019_Bromley_7ft_2203.jpg?v=1695071382&width=832 832w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101019_Bromley_7ft_2203.jpg?v=1695071382&width=1200 1200w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101019_Bromley_7ft_2203.jpg?v=1695071382&width=1920 1920w, //roweam.com/cdn/shop/articles/Roweam_Environmental_101019_Bromley_7ft_2203.jpg?v=1695071382&width=2500 2500w"
                  loading="lazy"
                  alt="The Bromley Collection"
                  className="w-full h-full object-cover object-center"
                />
              </a>
              <div>
                <h3 className="mt-[12px] text-[18px] md:text-xl block pb-[5px] w-full h2">
                  The Bromley Collection
                </h3>

                <div className="text-lightBrown text-xs md:text-sm h3">
                  A sofa made for Sunday morning reading and naps by the
                  fireplace.{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        <section>
          <div className="px-6 md:px-10 max-w-[1600px] my-6 md:my-20">
            <div className="bg-milk px-6 md:px-10">
              <div>
                <div
                  className="py-6 md:py-10 flex md:grid gap-0 md:gap-10 items-start md:items-center flex-wrap relative overflow-hidden"
                  style={{ gridTemplateColumns: "50% calc(50% - 40px)" }}
                >
                  <div
                    className="w-full relative mb-8 overflow-hidden"
                    id="img-with_text"
                    style={{
                      transition:
                        "clip-path .25s ease-out, opacity .25s ease-out",
                    }}
                  >
                    <img
                      src="//roweam.com/cdn/shop/files/Environmental_3706.jpg?v=1694964999&width=2500"
                      srcSet="//roweam.com/cdn/shop/files/Environmental_3706.jpg?v=1694964999&width=600 600w, //roweam.com/cdn/shop/files/Environmental_3706.jpg?v=1694964999&width=700 700w, //roweam.com/cdn/shop/files/Environmental_3706.jpg?v=1694964999&width=800 800w, //roweam.com/cdn/shop/files/Environmental_3706.jpg?v=1694964999&width=1000 1000w, //roweam.com/cdn/shop/files/Environmental_3706.jpg?v=1694964999&width=1200 1200w, //roweam.com/cdn/shop/files/Environmental_3706.jpg?v=1694964999&width=1400 1400w"
                      alt="chair in woods"
                      loading="lazy"
                      className="object-center object-cover w-full h-full"
                    />
                  </div>

                  <div className="py-6 mb-7 w-full z-[1]">
                    <div className="flex flex-wrap">
                      <div className="flex-shrink-0 w-full">
                        <div className="text-lightBrown my-4">
                          <div>
                            <span className="block text-lightBrown uppercase">
                              Aging is Art
                            </span>
                          </div>
                        </div>
                        <div className="my-4 h2 text-2xl">
                          <div>
                            <span className="block">Make History</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm md:text-[18px] lg:text-xl">
                            For the love of what's new and what's old, we source
                            from vendors with an expert eye for products that
                            imbue a sense of originality and timelessnes.{" "}
                          </p>

                          <div className="mt-8">
                            <a
                              href="/"
                              className="text-lightBrown uppercase shop-button text-[15px] relative"
                            >
                              shop now
                            </a>
                          </div>
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
    </section>
  );
}
