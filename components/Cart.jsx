import Image from "next/image";
import Link from "next/link";

import { useSelector, useDispatch } from "react-redux";
import { formatPrice } from "@/helpers/formatPrice";
import { useEffect, useRef, useState } from "react";
import { updateItem, removeFromCart } from "@/features/cart/cartSlice";
import {
  closeAll,
  isCartOpen,
  toggleCart,
} from "@/features/navigation/navigationSlice";
import { useRouter } from "next/navigation";
import { delay } from "@/helpers";
import { gsap } from "gsap";

export default function Cart() {
  const cartState = useSelector((state) => state.navigation.isCartOpen);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isMounted, setIsMounted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState({});

  const cartRef = useRef(null);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => setIsMounted(true), []);

  const onClose = () => dispatch(toggleCart());

  useEffect(() => {
    const handleCartEscape = (event) => {
      if (cartRef.current && event.key === "Escape") {
        onClose();
      }
    };

    if (cartState) {
      document.addEventListener("keydown", handleCartEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleCartEscape);
    };
  }, [cartState, onClose]);

  useEffect(() => {
    const handleClickOutside = (ev) => {
      if (cartRef.current && !cartRef.current.contains(ev.target)) {
        onClose();
      }
    };

    if (cartState) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [cartState, onClose]);

  useEffect(() => {
    if (cartState) {
      gsap.fromTo(
        "#cart-item",
        {
          opacity: 0,
          x: 200,
        },
        {
          opacity: 1,
          x: 0,
        }
      );
      gsap.fromTo(
        "#continue-btn",
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
        }
      );
    }
  }, [cartState]);

  const getTotalCartItemsPrice = () => {
    let emptyArray = [];

    for (let i = 0; i < cartItems.length; i++) {
      const price = cartItems[i].price;
      const qty = cartItems[i].quantity;
      const totalPrice = price * qty;

      emptyArray.push(totalPrice);
    }

    return emptyArray;
  };

  const totalPrice = reduce(getTotalCartItemsPrice(), (a, b) => a + b, 0);

  const handleUpdateCart = async (_id, quantity, item) => {
    setIsLoadingStatus((prevState) => {
      return { ...prevState, [_id]: { isLoading: true, isComplete: false } };
    });

    setTimeout(() => {
      setIsLoadingStatus((prevState) => {
        return { ...prevState, [_id]: { ...prevState[_id], isComplete: true } };
      });
    }, 1000);

    setTimeout(() => {
      setIsLoadingStatus((prevState) => {
        return { ...prevState, [_id]: { isLoading: false, isComplete: false } };
      });
    }, 2000);

    if (quantity < 1) {
      await delay(2000);

      dispatch(removeFromCart(item));
    } else {
      await delay(3000);
      dispatch(updateItem({ _id, quantity }));

      if (quantity < 1) {
        setIsDeleting(true);
      }
    }
  };

  function reduce(array, combineFunction, start) {
    let current = start;

    for (let element of array) {
      current = combineFunction(element, current);
    }

    return current;
  }

  const navigateToCheckoutPage = async () => {
    setIsAddingToCart(true);
    await delay(2000);
    setIsAddingToCart(false);

    dispatch(closeAll());

    const data = { totalPrice };
    const queryString = new URLSearchParams(data).toString();

    router.push(`/checkout_page?${queryString}`);
  };

  return (
    <section
      ref={cartRef}
      className={`w-screen md:w-[45%] fixed top-[62.5px] md:top-[66.5px] border-t border-listBorder bottom-0 right-0 bg-milk z-[1000] px-6 md:px-10 ${
        !cartState ? "close-cart" : "open-cart"
      }`}
    >
      {isMounted && cartItems.length > 0 ? (
        <div className="w-full h-full overflow-x-hidden overflow-y-scroll flex-grow pb-36 custom-scrollbar">
          {cartItems.map((item) => {
            const { _id } = item;
            const isLoading = isLoadingStatus[_id]?.isLoading;
            const isComplete = isLoadingStatus[_id]?.isComplete;

            return (
              <div
                className="pt-4 pb-14"
                key={_id}
                id="cart-item"
                style={{
                  transition: "transform .15s ease-out, opacity .25s ease-out",
                  transform: isDeleting ? "translateX(100%)" : "translateX(0)",
                  opacity: isDeleting ? "0" : "1",
                }}
              >
                <div className="flow-root pb-6 border-b border-listBorder w-full">
                  <div className="flex relative mt-5 w-full">
                    <Link
                      href="/"
                      tabIndex="-1"
                      aria-hidden="true"
                      className="w-32 relative mr-5 block"
                    >
                      <div
                        id="loading-container"
                        className="absolute flex items-center justify-center bg-milk w-8 h-8 rounded-[32px]"
                        style={{
                          top: "calc(50% - 15px)",
                          left: "calc(50% - 15px)",
                          transition:
                            "opacity .2s ease-in-out, transform .2s ease-in-out, visibility .2s ease-in-out",
                          visibility: isLoading ? "visible" : "hidden",
                          transform: isLoading ? "scale(1)" : "scale(.4)",
                          opacity: isLoading ? "1" : "0",
                        }}
                      >
                        <span
                          id="loading-icon"
                          style={{
                            display: isComplete ? "block" : "none",
                          }}
                        >
                          <svg
                            focusable="false"
                            width="20"
                            height="20"
                            viewBox="0 0 32 32"
                          >
                            <path
                              d="M24.59 8L12.9885 20.6731L7.31806 15.1819L6 16.6956L12.3755 22.8792L13.0805 23.5556L13.7395 22.8309L26 9.43318L24.59 8Z"
                              stroke="currentColor"
                            ></path>
                          </svg>
                        </span>

                        <span
                          style={{ display: !isComplete ? "block" : "none" }}
                          className="overflow-visible block"
                        >
                          <svg
                            fill="#000000"
                            width="20px"
                            height="20px"
                            viewBox="0 0 1024 1024"
                            xmlns="http://www.w3.org/2000/svg"
                            className="spinner"
                          >
                            <path d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3 22.2 52.4 53.9 99.5 94.3 139.9 40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6 52.4-22.2 99.5-53.9 139.9-94.3 40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7-63.1 26.8-130.2 40.3-199.3 40.3z" />
                          </svg>
                        </span>
                      </div>

                      <img
                        src={item.primaryImage.img}
                        alt="product image"
                        className="w-full h-full"
                      />
                    </Link>

                    <div className="flex content-between flex-wrap">
                      <div className="w-full">
                        <Link
                          href="/"
                          className="mt-[1px] mr-[10px] mb-2 text-sm md:text-md lg:text-lg"
                        >
                          {item.name}
                        </Link>
                        <div className="h3 text-lightBrown text-sm md:text-md lg:text-lg">
                          {item.type}
                        </div>
                        <div className="mt-[6px] mb-2 text-sm md:text-md lg:text-lg">
                          <span className="text-xs">Sand / LARC</span>
                        </div>
                      </div>

                      <div>
                        <div className="inline-flex items-center justify-start">
                          <button
                            type="button"
                            aria-label="Increase item quantity"
                            onClick={() =>
                              handleUpdateCart(
                                item._id,
                                item.quantity - 1,
                                item
                              )
                            }
                            className="w-max ring-o active:ring-1 ring-lightBrown transition-all"
                          >
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              width="15"
                              height="15"
                              viewBox="0 0 24 24"
                            >
                              <title>minus</title>
                              <path d="M18 11h-12c-1.104 0-2 0.896-2 2s0.896 2 2 2h12c1.104 0 2-0.896 2-2s-0.896-2-2-2z"></path>
                            </svg>
                          </button>

                          <div className="w-10 flex items-center justify-center">
                            {item.quantity}
                          </div>

                          <button
                            type="button"
                            aria-label="Decrease item quantity"
                            onClick={() =>
                              handleUpdateCart(item._id, item.quantity + 1)
                            }
                            className="w-max ring-o active:ring-1 ring-lightBrown transition-all"
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
                      <span className="text-sm md:text-md lg:text-lg">
                        ${formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <footer
            className="fixed bottom-0 left-0 w-full px-6 md:px-10 bg-milk cart_footer"
            id="continue-btn"
            style={{
              transition: "transform .15s ease-out, opacity .25s ease-out",
            }}
          >
            <p className="py-6 text-sm md:text-lg text-start md:text-center">
              Shipping & taxes calculated at checkout
            </p>

            <div onClick={navigateToCheckoutPage} className="pb-6 block">
              <button
                type="button"
                className="w-full px-4 md:px-8 py-3 text-sm md:text-[16px] lg:text-lg bg-lightBrown text-milk relative"
              >
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    opacity: isAddingToCart ? "0" : "1",
                    transition: "opacity .2s ease-in-out",
                  }}
                >
                  complete your order
                  <div className="">
                    <span className="px-3">|</span>
                    <span>${formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <span className="absolute w-full h-full top-0 left-0 flex justify-center items-center">
                  <div
                    className={isAddingToCart ? "spinner" : ""}
                    style={{
                      opacity: !isAddingToCart ? "0" : "1",
                      transition: "opacity .2s ease-in-out",
                    }}
                  >
                    <svg
                      fill="#f3f1ea"
                      width="20px"
                      height="20px"
                      viewBox="0 0 1024 1024"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3 22.2 52.4 53.9 99.5 94.3 139.9 40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6 52.4-22.2 99.5-53.9 139.9-94.3 40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7-63.1 26.8-130.2 40.3-199.3 40.3z" />
                    </svg>
                  </div>
                </span>
              </button>
            </div>
          </footer>
        </div>
      ) : (
        <div className="flex items-center justify-center bg-milk h-full w-full">
          <div className="w-full">
            <div className="pb-14">
              <h3 className="h2 block mb-2 text-2xl md:text-3xl lg:text-4xl">
                Your cart is empty
              </h3>
              <p className="text-sm md:text-[16px] lg:text-lg">
                Discover our products.
              </p>
            </div>
            <div className="w-full">
              <button type="button" className="w-full bg-lightBrown px-8 py-3">
                <Link
                  href={{
                    pathname: "/checkout_page",
                    query: {
                      id: 1,
                    },
                  }}
                  className="w-full h-full text-milk text-sm md:text-[16px] lg:text-lg"
                >
                  continue shopping
                </Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
