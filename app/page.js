"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductReel from "./components/ProductReel";

export default function Home() {
  const [vintageSelect, setVintageSelect] = useState(0);
  const [activeRList, setActiveRList] = useState(false);

  return (
    <>
      <section className="block mt-0 mb-0">
        <div
          className="min-h-[80vh] relative flex image-overlay"
          style={{ opacity: "1" }}
        >
          <div
            className="absolute left-0 top-0 w-full h-full overflow-hidden"
            style={{ paddingBottom: "66.64%" }}
          >
            <Image
              src="/20230809-In_Situ-Bromley_01_0858-MAIN2_ab51fab4-c8a5-4460-93ef-2efb27a1433f.jpg"
              width={500}
              height={500}
              className="object-cover object-center absolute top-0 left-0 overflow-hidden w-full h-full"
              alt="hero image"
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
            <div className="aspect-square w-full">
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

      <section className="block mt-5">
        <div
          className="py-7 px-0"
          style={{ display: "flow-root", bakground: "transparent" }}
        >
          <div className="w-full max-w-7xl">
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

                <div className="grid-item gap-2 mt-4">
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

            <ProductReel />
          </div>
        </div>
      </section>

      <section className="min-h-[80vh] relative">
        <div className="mt-4 overflow-hidden">
          <div className="absolute bottom-6 w-full">
            <div className="w-full max-h-[1600px] px-6">
              <div className="max-w-[500px] text-[#f3f1ea]">
                <div className="h2 text-2xl">Sabi In situ</div>
                <div className="mt-4 ">
                  <p>
                    A clean line of tailored upholstery, simple and
                    elegant.&nbsp;Drawing inspiration from the seamless fusion
                    of strength and femininity, the Sabi embodies a symphony of
                    grace and allure
                  </p>

                  <div className="mt-5">
                    <Link
                      href="/"
                      className="text-milk uppercase shop-room-button relative"
                    >
                      Shop this romm
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
              <span className="text-sm md:text-md text-milk ml-2">Seating</span>
            </div>
          </div>

          <Image
            src="/20230809-In_Situ-Sabi_01_0682-MAIN1_2aeeb711-0c31-40cf-af10-f813e2011586.jpg"
            alt="Sabi Insitu"
            width={500}
            height={500}
            className="object-cover object-center absolute top-0 left-0 overflow-hidden w-full h-full -z-10"
          />
        </div>
      </section>

      <section className="w-full py-16">
        <div className=" max-w-[1600px] px-6 py-16 flex flex-col md:flex-row items-start md:items-center flex-wrap">
          <div>
            <h5 className="text-lightBrown text-sm">
              <span className="uppercase">
                Part new vintage, part true vintage
              </span>
            </h5>

            <div className="mt-4">
              <span className="text-darkBrown text-5xl h2 block">
                The Roweam
              </span>
              <span className="text-darkBrown text-5xl h2 block">Method</span>
            </div>

            <div className="max-w-[80%] mt-6">
              <p className="text-sm">
                Part new vintage, part true vintage. Our design method takes a
                gathered, authentic approach using well-constructed pieces
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
        <div className="flex flex-wrap">
          <div className="pl-[30%] pb-6 order-2">
            <Image
              src="/Roweam_Method_4316_2400x1700_808cce19-9b11-42c9-8c6c-8167b4e61cfb.jpg"
              alt="product making"
              width={500}
              height={500}
            />
          </div>
        </div>
      </section>

      <section>
        <div className="px-6 w-full">
          <div className="overflow-hidden flex flex-wrap">
            <div className="relative w-full overflow-hidden mb-8">
              <Image
                src="/Roweam_Method_4316_2400x1700_808cce19-9b11-42c9-8c6c-8167b4e61cfb.jpg"
                width={500}
                height={500}
                alt="product image"
              />
            </div>
          </div>
        </div>

        <div className="p-6">
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
      </section>
    </>
  );
}
