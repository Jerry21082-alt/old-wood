"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { productReelItems } from "../constants";
import ProductReel from "../components/ProductReel";
import { useSelector } from "react-redux";
import NewsLetter from "@/components/NewsLetter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Home() {
  const [vintageSelect, setVintageSelect] = useState(0);
  const [activeRList, setActiveRList] = useState(false);
  const toggleMobileMenu = useSelector((state) => state.navigation.isMenuOpen);
  const [reveal, setReveal] = useState(false);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.fromTo(
      "#shop-the-look",
      { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)", opacity: 0 },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: "#shop-the-look",
          start: "top 130%",
          once: true,
          toggleActions: "play none none none",
        },
      }
    );

    gsap.utils.toArray("#slide-up").forEach((element) => {
      gsap.fromTo(
        element,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.25,
          stagger: 1,
          scrollTrigger: {
            trigger: element,
            start: "top 100%",
            once: true,
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  useEffect(() => {
    setReveal(true);
  }, []);

  return (
    <>
      <NewsLetter />
      <section className="block mt-0 mb-0 relative">
        <div
          className="fixed left-0 bottom-0 w-full h-14 z-50"
          style={{
            opacity: toggleMobileMenu ? "1" : "0",
            transition: "opacity .4s ease-in-out",
          }}
        >
          <div className="footer-gradient" />
        </div>

        <div
          className="min-h-[80vh] relative flex image-overlay gradient"
          style={{
            opacity: reveal ? "1" : "0",
            transition: "opacity .4s ease",
          }}
        >
          <div
            className="absolute left-0 top-0 w-full h-full overflow-hidden"
            style={{ paddingBottom: "66.64%" }}
          >
            <img
              src="https://roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101.jpg?v=1717160421&width=2500"
              srcSet="//roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101.jpg?v=1717160421&width=600 600w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101.jpg?v=1717160421&width=700 700w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101.jpg?v=1717160421&width=800 800w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101.jpg?v=1717160421&width=1000 1000w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101.jpg?v=1717160421&width=1200 1200w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101.jpg?v=1717160421&width=1400 1400w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101.jpg?v=1717160421&width=1600 1600w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101.jpg?v=1717160421&width=1800 1800w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101.jpg?v=1717160421&width=2000 2000w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101.jpg?v=1717160421&width=2200 2200w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_02_0731-MAIN101.jpg?v=1717160421&width=2400 2400w"
              className="object-cover object-center absolute top-0 left-0 overflow-hidden w-full h-full"
              alt="hero image"
              style={{
                transform: reveal ? "scale(1)" : "scale(1.1)",
                transition: "transform .4s ease",
              }}
            />
          </div>

          <div className="w-full max-w-screen-2xl p-6">
            <div className="relative flex h-full w-full items-center justify-center p-9">
              <div className="z-10 mx-6 relative"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="block p-6 w-full">
        <div className="mb-11 text-[#5e3519] text-center">
          THIS IS THE NEW NOSTALGIA
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="w-full relative mb-8 overflow-hidden block">
            <img
              src="/Roweam_Environmental_101019_Bromley_7ft_2035_RESIZED.jpg"
              alt="product image"
              className="z-[1] w-full h-auto max-h-full"
            />
          </div>
          <div className="mb-9 w-full">
            <div className="aspect-square w-full flex justify-center items-center flex-col">
              <div className="my-4 mx-0 text-[#5e3519]">
                <span className="block text-center">OLDWOOD NEW VINTAGE</span>
              </div>
              <div className="mt-10 mb-8 text-4xl text-center mx-0 h2">
                <span className="block">The Bromley</span>
                <span className="block text-center">Collection</span>
              </div>

              <div className="mb-0 w-full">
                <p className="mt-0 text-center w-full block">
                  Our cornerstone collection, designed with families and comfort
                  in mind. Exquisite designs that foster a life well lived for
                  generations to come.
                </p>

                <div className="mt-8 flex justify-center">
                  <Link
                    href="/"
                    className="shop-button relative text-lightBrown"
                  >
                    SHOP NOW
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="block mt-5 w-full">
        <div
          className="py-7 px-0"
          style={{ display: "flow-root", bakground: "transparent" }}
        >
          <div className="w-full max-w-[1600px]">
            <header className="max-w-full m-7">
              <div>
                <div className="flex items-center space-x-6">
                  <h4 className="h2 text-darkBrown">Made To Age</h4>
                  <div className="mt-0">
                    <a
                      href="/"
                      style={{ backgroundPosition: "99% -97%, 99% 99%" }}
                      className="text-lightBrown relative text-sm shop-button"
                    >
                      SHOP ALL
                    </a>
                  </div>
                </div>

                <div className="grid-item mt-4">
                  {["new vintage", "true vintage", "new & true vintage"].map(
                    (li, idx) => (
                      <div className="flex items-center space-x-2" key={li}>
                        <div
                          className="flex items-center justify-center w-4 h-4  rounded-full"
                          style={{
                            border:
                              vintageSelect === idx
                                ? "1px solid #5e3519"
                                : "1px solid #a5a097",
                          }}
                        >
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor:
                                vintageSelect === idx ? "#5e3519" : "",
                            }}
                            onClick={() => setVintageSelect(idx)}
                          />
                        </div>

                        <div>
                          <h6 className="text-darkBrown capitalize">{li}</h6>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </header>

            <ProductReel products={productReelItems} />
          </div>
        </div>
      </section>

      <section
        id="shop-the-look"
        style={{ transition: "clip-path .25s ease-out, opacity .25s ease-out" }}
      >
        <div className="mt-10">
          <div className="relative block overflow-hidden">
            <div className="absolute bottom-6 w-full ">
              <div className="w-full max-h-[1600px] px-6">
                <div className="max-w-[500px] text-[#f3f1ea]">
                  <div className="h2 text-2xl">Sabi In situ</div>
                  <div className="mt-4 ">
                    <p>
                      A clean line of tailored upholstery, simple and
                      elegant.&nbsp;Drawing inspiration from the seamless fusion
                      of strength and femininity, the Sabi embodies a symphony
                      of grace and allure
                    </p>

                    <div className="mt-5">
                      <Link
                        href="/"
                        className="text-milk uppercase shop-room-button relative"
                      >
                        Shop this room
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-[23%] left-[38%] md:top-[20%] md:left-[41%] ml-[-12px] mt-[-12px]">
              <div className="flex items-center relative">
                <div className="tap-area w-4 h-4 rounded-full border border-milk" />
                <span className="text-sm md:text-md text-milk ml-2">
                  Table Lamps
                </span>
              </div>
            </div>

            <div className="absolute top-[40%] left-[30%] md:top-[38%] md:left-[42%] ml-[-12px] mt-[-12px]">
              <div className="flex items-center relative">
                <div className="tap-area w-4 h-4 rounded-full border border-milk" />
                <span className="text-sm md:text-md text-milk ml-2">
                  Havard Devinity Desk
                </span>
              </div>
            </div>

            <div className="absolute top-[50%] left-[74%] md:top-[50%] md:left-[71%] ml-[-12px] mt-[-12px]">
              <div className="flex items-center relative">
                <div className="tap-area w-4 h-4 rounded-full border border-milk" />
                <span className="text-sm md:text-md text-milk ml-2">
                  Seating
                </span>
              </div>
            </div>

            <div className="h-[80vh] md:h-[110vh]">
              <img
                src="//roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_ec8e90bf-c2b2-4474-ab46-37b190fa478f.jpg?v=1717414381&width=2500"
                srcSet="//roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_ec8e90bf-c2b2-4474-ab46-37b190fa478f.jpg?v=1717414381&width=500 500w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_ec8e90bf-c2b2-4474-ab46-37b190fa478f.jpg?v=1717414381&width=600 600w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_ec8e90bf-c2b2-4474-ab46-37b190fa478f.jpg?v=1717414381&width=700 700w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_ec8e90bf-c2b2-4474-ab46-37b190fa478f.jpg?v=1717414381&width=800 800w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_ec8e90bf-c2b2-4474-ab46-37b190fa478f.jpg?v=1717414381&width=1000 1000w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_ec8e90bf-c2b2-4474-ab46-37b190fa478f.jpg?v=1717414381&width=1200 1200w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_ec8e90bf-c2b2-4474-ab46-37b190fa478f.jpg?v=1717414381&width=1400 1400w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_ec8e90bf-c2b2-4474-ab46-37b190fa478f.jpg?v=1717414381&width=1600 1600w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_ec8e90bf-c2b2-4474-ab46-37b190fa478f.jpg?v=1717414381&width=1800 1800w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_ec8e90bf-c2b2-4474-ab46-37b190fa478f.jpg?v=1717414381&width=2000 2000w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_ec8e90bf-c2b2-4474-ab46-37b190fa478f.jpg?v=1717414381&width=2200 2200w, //roweam.com/cdn/shop/files/20230809-In_Situ-Sabi_01_0682-MAIN1_ec8e90bf-c2b2-4474-ab46-37b190fa478f.jpg?v=1717414381&width=2400 2400w"
                alt="product imgage"
                className="w-full max-w-full h-full object-cover object-center align-top"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="block my-20">
        <div className="w-full max-w-[1600px] px-0 md:px-10">
          <div className="image-with-text">
            <div className="w-full px-6 md:p-16">
              <div>
                <h5 className="text-lightBrown text-sm" id="slide-up">
                  <span className="uppercase">
                    Part new vintage, part true vintage
                  </span>
                </h5>

                <div className="mt-4">
                  <span
                    className="text-darkBrown text-5xl h2 block"
                    id="slide-up"
                  >
                    The Oldwood
                  </span>
                  <span
                    className="text-darkBrown text-5xl h2 block"
                    id="slide-up"
                  >
                    Method
                  </span>
                </div>

                <div className="max-w-[80%] mt-6" id="slide-up">
                  <p className="text-sm">
                    Part new vintage, part true vintage. Our design method takes
                    a gathered, authentic approach using well-constructed pieces
                    complete with endless character, no matter their age.
                  </p>
                </div>

                <div className="mt-8">
                  <Link
                    href="/"
                    className="shop-button relative uppercase text-lightBrown"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap h-full w-full">
              <div className="pb-6 overflow-hidden pl-[30%] order-2 h-full w-full">
                <img
                  src="//roweam.com/cdn/shop/files/Roweam_Method_4316_2400x1700_808cce19-9b11-42c9-8c6c-8167b4e61cfb.jpg?v=1705956908&width=2000"
                  srcSet="//roweam.com/cdn/shop/files/Roweam_Method_4316_2400x1700_808cce19-9b11-42c9-8c6c-8167b4e61cfb.jpg?v=1705956908&width=600 600w, //roweam.com/cdn/shop/files/Roweam_Method_4316_2400x1700_808cce19-9b11-42c9-8c6c-8167b4e61cfb.jpg?v=1705956908&width=700 700w, //roweam.com/cdn/shop/files/Roweam_Method_4316_2400x1700_808cce19-9b11-42c9-8c6c-8167b4e61cfb.jpg?v=1705956908&width=800 800w, //roweam.com/cdn/shop/files/Roweam_Method_4316_2400x1700_808cce19-9b11-42c9-8c6c-8167b4e61cfb.jpg?v=1705956908&width=1000 1000w, //roweam.com/cdn/shop/files/Roweam_Method_4316_2400x1700_808cce19-9b11-42c9-8c6c-8167b4e61cfb.jpg?v=1705956908&width=1200 1200w, //roweam.com/cdn/shop/files/Roweam_Method_4316_2400x1700_808cce19-9b11-42c9-8c6c-8167b4e61cfb.jpg?v=1705956908&width=1400 1400w, //roweam.com/cdn/shop/files/Roweam_Method_4316_2400x1700_808cce19-9b11-42c9-8c6c-8167b4e61cfb.jpg?v=1705956908&width=1600 1600w, //roweam.com/cdn/shop/files/Roweam_Method_4316_2400x1700_808cce19-9b11-42c9-8c6c-8167b4e61cfb.jpg?v=1705956908&width=1800 1800w, //roweam.com/cdn/shop/files/Roweam_Method_4316_2400x1700_808cce19-9b11-42c9-8c6c-8167b4e61cfb.jpg?v=1705956908&width=2000 2000w"
                  alt="product image"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="image-with-text-r-list">
          <div className="px-6 w-full">
            <div className="overflow-hidden flex flex-wrap">
              <div className="relative w-full overflow-hidden mb-8">
                <img
                  src="//roweam.com/cdn/shop/files/Roweam_Method_4647_1600.jpg?v=1717161542&width=2000"
                  srcSet="//roweam.com/cdn/shop/files/Roweam_Method_4647_1600.jpg?v=1717161542&width=600 600w, //roweam.com/cdn/shop/files/Roweam_Method_4647_1600.jpg?v=1717161542&width=700 700w, //roweam.com/cdn/shop/files/Roweam_Method_4647_1600.jpg?v=1717161542&width=800 800w, //roweam.com/cdn/shop/files/Roweam_Method_4647_1600.jpg?v=1717161542&width=1000 1000w, //roweam.com/cdn/shop/files/Roweam_Method_4647_1600.jpg?v=1717161542&width=1200 1200w, //roweam.com/cdn/shop/files/Roweam_Method_4647_1600.jpg?v=1717161542&width=1400 1400w"
                  alt="product image"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          <div className="p-6 md:p-16">
            <div className="flex flex-wrap">
              <div className="w-full order-2 shrink-0">
                <div className="my-4 text-lightBrown">
                  <span className="uppercase">join the r list</span>
                </div>

                <div className="h2">
                  <span>Sign-up to recieve 10%off your first</span>
                  <span>purchase and you'll hear about our new</span>
                  <span>production collections, antiquities, and more</span>
                  <span>before anyone else!</span>
                </div>

                <div className="mt-11 relative" id="r-form">
                  <form>
                    <div
                      className="flex justify-start items-center py-3 relative"
                      style={{ backgroundColor: activeRList ? "#f3f1ea" : "" }}
                    >
                      <input
                        type="email"
                        placeholder="Your Email"
                        onFocus={() => setActiveRList(true)}
                        onBlur={() => setActiveRList(false)}
                        className="r-list outline-none w-full h-full"
                      />

                      <div className="absolute right-0 flex items-center justify-center w-4 h-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          id="right-arrow"
                          width="20px"
                          height="20px"
                          fill="#221f20"
                        >
                          <path d="M22.707,12.707a1,1,0,0,0,0-1.414l-6-6a1,1,0,0,0-1.414,1.414L19.586,11H2a1,1,0,0,0,0,2H19.586l-4.293,4.293a1,1,0,0,0,1.414,1.414Z"></path>
                        </svg>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
