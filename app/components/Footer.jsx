"use client";

import Link from "next/link";
import { stateProvider } from "./stateContext/UseStateContext";

export default function Footer() {
  const { toggleMobileMenu } = stateProvider();

  return (
    <footer className="mt-16 footer pt-16 pb-5 text-snow">
      <div className="grid-footer">
        <div className="order-2 max-w-[325px] break-words">
          <p className="text-sm uppercase mb-5">shop</p>
          <div className="break-words">
            <ul className="text-[13px] flex flex-col space-y-1">
              <li className="break-words inline-block">
                <Link href="/">Furniture</Link>
              </li>
              <li className="break-words inline-block">
                <Link href="/">Decoration</Link>
              </li>
              <li className="break-words inline-block">
                <Link href="/">Dinning & Entertainment</Link>
              </li>
              <li className="break-words inline-block">
                <Link href="/">Soft Goods</Link>
              </li>
              <li className="break-words inline-block">
                <Link href="/">Lighting</Link>
              </li>
              <li className="break-words inline-block">
                <Link href="/">Art</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="order-2 max-w-[325px] break-words">
          <p className="text-sm uppercase mb-5">customer</p>
          <div className="break-words">
            <ul className="text-[13px] flex flex-col space-y-1">
              <li className="break-words inline-block">
                <Link href="/">Contact Us</Link>
              </li>
              <li className="break-words inline-block">
                <Link href="/">Legal</Link>
              </li>
              <li className="break-words inline-block">
                <Link href="/">FAQ</Link>
              </li>
              <li className="break-words inline-block">
                <Link href="/">Trade</Link>
              </li>
              <li className="break-words inline-block">
                <Link href="/">Account</Link>
              </li>
              <li className="break-words inline-block">
                <Link href="/">Fabric Swatches</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="order-2 max-w-[325px] break-words">
          <p className="text-sm uppercase mb-5">company</p>
          <div className="break-words">
            <ul className="text-[13px] flex flex-col space-y-1">
              <li className="break-words inline-block">
                <Link href="/">Our Story</Link>
              </li>
              <li className="break-words inline-block">
                <Link href="/">Interior Design</Link>
              </li>
              <li className="break-words inline-block">
                <Link href="/">Stay With Us</Link>
              </li>
              <li className="break-words inline-block">
                <Link href="/">A Bit Moore Blog</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="order-2 max-w-[325px] break-words">
          <p className="text-sm uppercase mb-5">connect</p>
          <div className="break-words">
            <ul className="text-[13px] flex flex-col space-y-1">
              <li className="break-words inline-block">
                <Link href="/">hello@oldwood.com</Link>
              </li>
              <li className="break-words inline-block">
                <Link href="/" className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 100 100"
                    id="facebook"
                    fill="#f3f1ea"
                  >
                    <path d="M38.078 22.431v12.391H29v15.152h9.078V95h18.648V49.975H69.24s1.172-7.265 1.74-15.209H56.797v-10.36c0-1.548 2.033-3.631 4.043-3.631H71V5.001H57.186C37.617 5 38.078 20.167 38.078 22.431"></path>
                  </svg>

                  <span className="ml-3">Facebook</span>
                </Link>
              </li>

              <li className="break-words inline-block">
                <Link href="/" className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="15"
                    height="15"
                    fill="#f3f1ea"
                    id="instagram"
                  >
                    <g fill="none" stroke="#f3f1ea">
                      <path d="M11.5 15.5h-7a4 4 0 0 1-4-4v-7a4 4 0 0 1 4-4h7a4 4 0 0 1 4 4v7a4 4 0 0 1-4 4z"></path>
                      <circle cx="8" cy="8" r="3.5"></circle>
                      <circle cx="12.5" cy="3.5" r=".5"></circle>
                    </g>
                  </svg>
                  <span className="ml-3">Instagram</span>
                </Link>
              </li>
              <li className="break-words inline-block">
                <Link href="/" className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1668.56 1221.19"
                    id="twitter-x"
                    fill="#f3f1ea"
                    width="15"
                    height="15"
                  >
                    <path
                      d="M283.94,167.31l386.39,516.64L281.5,1104h87.51l340.42-367.76L984.48,1104h297.8L874.15,558.3l361.92-390.99
		h-87.51l-313.51,338.7l-253.31-338.7H283.94z M412.63,231.77h136.81l604.13,807.76h-136.81L412.63,231.77z"
                      transform="translate(52.39 -25.059)"
                    ></path>
                  </svg>
                  <span className="ml-3">Twitter X</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-11 border-t border-milk py-5">
        <div className="grid-footer">
          <div className="flex items-center">
            <div>ENGLISH</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 16 16"
              id="chevron-down"
              className="ml-3"
            >
              <path
                fill="#f3f1ea"
                d="M4.14645,5.64645 C4.34171,5.45118 4.65829,5.45118 4.85355,5.64645 L7.9999975,8.79289 L11.1464,5.64645 C11.3417,5.45118 11.6583,5.45118 11.8536,5.64645 C12.0488,5.84171 12.0488,6.15829 11.8536,6.35355 L8.35355,9.85355 C8.15829,10.0488 7.84171,10.0488 7.64645,9.85355 L4.14645,6.35355 C3.95118,6.15829 3.95118,5.84171 4.14645,5.64645 Z"
              ></path>
            </svg>
          </div>

          <div className="text-xs">
            <span className="text-milk uppercase">oldwood&#8482;</span>
          </div>

          <div>
            <span className="text-milk uppercase text-xs">made by amber</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
