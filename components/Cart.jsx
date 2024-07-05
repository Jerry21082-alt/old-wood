import Image from "next/image";
import Link from "next/link";

import { useSelector, useDispatch } from "react-redux";
import { formatPrice } from "@/helpers/formatPrice";
import { useEffect, useState } from "react";
import { updateItem } from "@/features/cart/cartSlice";
import { closeCart } from "@/features/navigation/navigationSlice";
import { toggleMenu, toggleCart } from "@/features/navigation/navigationSlice";

export default function Cart() {
  const cartState = useSelector((state) => state.navigation.isCartOpen);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isMounted, setIsMounted] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => setIsMounted(true), []);

  return (
    <section
      className={`w-screen fixed top-[62.5px] inset-0 bg-milk z-[1000] cart ${
        !cartState ? "close-cart" : "open-cart"
      }`}
      style={{ transform: !cartState ? "translateX(100%)" : "translateX(0%)" }}
    >
      <div className="w-full h-full">
        <div className="px-6 overflow-y-auto overflow-x-hidden flex-grow-0 w-full">
          {isMounted && cartItems.length > 0 ? (
            <div
              className="overflow-x-hidden overflow-y-auto flex-grow pb-36 custom-scrollbar w-full"
              style={{ height: "100vh" }}
            >
              {cartItems.map((item) => (
                <div className="pt-4 pb-14" key={item.id}>
                  <div className="flow-root pb-6 border-b border-listBorder w-full">
                    <div className="flex relative mt-5 w-full">
                      <Link
                        href="/"
                        tabIndex="-1"
                        aria-hidden="true"
                        className="relative mr-5"
                      >
                        <Image
                          src={item.primaryImage}
                          width={500}
                          height={500}
                          alt="product image"
                          className="w-full h-full"
                        />
                      </Link>

                      <div className="flex content-between flex-wrap">
                        <div className="w-full">
                          <Link href="/" className="mt-[1px] mr-[10px] mb-2">
                            {item.name}
                          </Link>
                          <div className="h3 text-lightBrown text-sm">
                            {item.type}
                          </div>
                          <div className="mt-[6px] mb-2">
                            <span className="text-xs">Sand / LARC</span>
                          </div>
                        </div>

                        <div>
                          <div className="inline-flex items-center justify-start">
                            <button
                              type="button"
                              aria-label="Increase item quantity"
                              onClick={() =>
                                handleUpdateCart(item.id, item.quantity - 1)
                              }
                            >
                              <svg
                                focusable="false"
                                width="8"
                                height="2"
                                viewBox="0 0 8 2"
                              >
                                <path fill="#000" d="M0 0h8v2H0z"></path>
                              </svg>
                            </button>

                            <div className="w-10 flex items-center justify-center">
                              {item.quantity}
                            </div>

                            <button
                              type="button"
                              aria-label="Decrease item quantity"
                              onClick={() =>
                                handleUpdateCart(item.id, item.quantity + 1)
                              }
                            >
                              <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 20 20"
                              >
                                <title>plus</title>
                                <path d="M16 10c0 0.553-0.048 1-0.601 1h-4.399v4.399c0 0.552-0.447 0.601-1 0.601s-1-0.049-1-0.601v-4.399h-4.399c-0.552 0-0.601-0.447-0.601-1s0.049-1 0.601-1h4.399v-4.399c0-0.553 0.447-0.601 1-0.601s1 0.048 1 0.601v4.399h4.399c0.553 0 0.601 0.447 0.601 1z"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="inline-grid items-baseline">
                        <span>${formatPrice(item.price)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <footer className="w-full fixed left-0 bottom-0 z-50 px-6 bg-milk">
                <div className="w-full">
                  <span className="text-xs">
                    Shipping & taxes calculated at checkout
                  </span>
                </div>
                <form className="pb-8">
                  <button
                    type="submit"
                    className="flex items-center justify-center mt-6 relative w-full px-7 bg-lightBrown text-xs text-milk whitespace-nowrap h-auto py-3"
                  >
                    Complete your order
                    <span className="px-4">|</span>
                    <span>$6748</span>
                  </button>
                </form>
              </footer>
            </div>
          ) : (
            <div className="w-full h-full absolute top-1/3 left-0 px-6">
              <div className="pb-14">
                <h3 className="h2 block mb-2">Your cart is empty</h3>
                <p>Discover our products.</p>
              </div>
              <div className="w-full">
                <button
                  type="button"
                  className="w-full bg-lightBrown px-8 py-3"
                >
                  <Link href="/" className="w-full h-full text-milk text-sm">
                    continue shopping
                  </Link>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
