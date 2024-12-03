"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/features/authentication/authSlice";

export default function page() {
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const styles = {
    general: {
      backgroundImage: `url('https://roweam.com/cdn/shop/files/20231108-Roweam-Holiday-04_Grapes_1987_FOR_LOGIN.png?v=1700067366')`,
      display: isMobile ? "none" : "block",
    },
    aboutSection: {
      minHeight: isMobile ? "calc(100vh - 62.5px)" : "calc(100vh - 65.5px)",
      gridTemplateColumns: isMobile ? "100%" : "calc(100% - 500px) 500px",
    },
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleWindowResize = () => setIsMobile(window.innerWidth <= 999);

      handleWindowResize();

      window.addEventListener("resize", handleWindowResize);

      return function () {
        window.removeEventListener("resize", handleWindowResize);
      };
    }

    return;
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(login(data.user));
        setMessage("");
        setFormData({ email: "", password: "" });
        router.push("/");
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.log("Login error", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <section
      className="mt-[62.6px] md:mt-[66.5px]"
      style={{ scrollMarginTop: "66.5px" }}
    >
      <div className="grid" style={styles.aboutSection}>
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat bg-[#a5a097]"
          style={styles.general}
        ></div>
        <div className="flex w-full h-full flex-wrap items-center p-6 md:p-10 bg-milk border-t border-listBorder">
          <div className="relative w-full">
            <div className="my-[30px] max-w-full">
              <h1 className="h4 my-12 mr-6 block text-3xl md:text-4xl lg:text-5xl">
                Acount
              </h1>
            </div>
            <div className="w-full max-w-[1200px]">
              <div className="grid gap-y-8">
                <div>
                  <form name="login">
                    <div
                      className="flex items-center mb-8 text-left bg-dim text-lightBrown py-[13px] px-[18px]"
                      style={{ display: message.length > 0 ? "flex" : "none" }}
                    >
                      <span className="mr-[10px] text-lightBrown">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                          fill="currentColor"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="2"
                            fill="none"
                          />
                          <line
                            x1="12"
                            y1="7"
                            x2="12"
                            y2="13"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                          <circle cx="12" cy="17" r="1" fill="currentColor" />
                        </svg>
                      </span>
                      <p>{message}</p>
                    </div>
                    <div className="flex flex-wrap relative">
                      <input
                        type="email"
                        id="customer[email]"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="order-2 border-lightBrown border-b w-full h-[52px]"
                        style={{ background: "transparent" }}
                      />
                      <label
                        htmlFor="customer[email]"
                        className="relative top-0 left-0 text-lightBrown"
                      >
                        E-mail
                      </label>
                    </div>
                    <div className="flex flex-wrap relative mt-4">
                      <input
                        type="password"
                        id="customer[password]"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="order-2 border-lightBrown border-b w-full h-[52px]"
                        style={{ background: "transparent" }}
                      />
                      <label
                        htmlFor="customer[password]"
                        className="relative top-0 left-0 text-lightBrown"
                      >
                        Password
                      </label>
                    </div>
                    <button
                      onClick={handleLogin}
                      style={{ fontSize: "calc(1rem - 2px)" }}
                      type="button"
                      className="px-[35px] w-full whitespace-nowrap relative inline-block text-milk bg-lightBrown mt-8 overflow-visible cursor-pointer touch-manipulation h-auto leading-[45px]"
                    >
                      <span className="flex items-center justify-center">
                        Login
                      </span>
                    </button>
                    <Link
                      href="/accounts/register"
                      style={{ fontSize: "calc(1rem - 2px)" }}
                      type="button"
                      className="px-[35px] w-full whitespace-nowrap relative inline-block text-lightBrown border-lightBrown border mt-[15px] md:mt-8 overflow-visible cursor-pointer touch-manipulation h-auto leading-[45px] my-[15px]"
                    >
                      <span className="flex items-center justify-center uppercase">
                        Create an account
                      </span>
                    </Link>

                    <button
                      type="button"
                      className="text-lightBrown relative inline-block appearance-none text-center w-max cursor-pointer touch-manipulation text-sm shop-button"
                    >
                      Forgot password?
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
