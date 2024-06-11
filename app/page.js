"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductReel from "./components/ProductReel";

export default function Home() {
  const [vintageSelect, setVintageSelect] = useState(0);

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
            <button
              type="button"
              aria-expanded="false"
              style={{ opacity: "1" }}
              className="w-4 h-4 float-left rounded-full border-[1px] border-milk tap-area relative block"
            >
              <span className="absolute left-6  top-[-4px] text-milk text-xs w-full">
                Table Lamps
              </span>
            </button>
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
    </>
  );
}
