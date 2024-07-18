import Image from "next/image";
import Link from "next/link";

import { useSelector, useDispatch } from "react-redux";
import { formatPrice } from "@/helpers/formatPrice";
import { useEffect, useState } from "react";
import { updateItem, removeFromCart } from "@/features/cart/cartSlice";
import { toggleCart } from "@/features/navigation/navigationSlice";
import { useRouter } from "next/navigation";

export default function Cart() {
  const cartState = useSelector((state) => state.navigation.isCartOpen);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isMounted, setIsMounted] = useState(false);

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

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => setIsMounted(true), []);

  const handleUpdateCart = (id, quantity, item) => {
    if (quantity < 1) {
      dispatch(removeFromCart(item));
    } else {
      dispatch(updateItem({ id, quantity }));
    }
  };

  function reduce(array, combineFunction, start) {
    let current = start;

    for (let element of array) {
      current = combineFunction(element, current);
    }

    return current;
  }

  const navigateToCheckoutPage = () => {
    dispatch(toggleCart());

    const data = { totalPrice };
    const queryString = new URLSearchParams(data).toString();

    router.push(`/checkout_page?${queryString}`);
  };

  return (
    <section
      className={`w-screen fixed top-[62.5px] bottom-0 left-0 right-0 bg-milk z-[1000] px-6 ${
        !cartState ? "close-cart" : "open-cart"
      }`}
      style={{ transform: !cartState ? "translateX(100%)" : "translateX(0%)" }}
    >
      {isMounted && cartItems.length > 0 ? (
        <div className="w-full h-full overflow-x-hidden overflow-y-auto flex-grow pb-36 custom-scrollbar">
          {isMounted &&
            cartItems.map((item) => (
              <div className="pt-4 pb-14" key={item.id}>
                <div className="flow-root pb-6 border-b border-listBorder w-full">
                  <div className="flex relative mt-5 w-full">
                    <Link
                      href="/"
                      tabIndex="-1"
                      aria-hidden="true"
                      className="w-32 relative mr-5 block"
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
                              handleUpdateCart(item.id, item.quantity - 1, item)
                            }
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
                      <span>${formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          <footer className="fixed bottom-0 left-0 w-full px-6 bg-milk cart_footer">
            <p className="pb-6 text-sm">
              Shipping & taxes calculated at checkout
            </p>

            <div onClick={navigateToCheckoutPage} className="pb-6 block">
              <button
                type="button"
                className="w-full py-3 px-5 bg-lightBrown flex items-center justify-center text-milk text-sm"
              >
                complete your order
                <span className="px-3">|</span>
                <span>${formatPrice(totalPrice)}</span>
              </button>
            </div>
          </footer>
        </div>
      ) : (
        <div className="flex items-center justify-center bg-milk h-full w-full">
          <div className="w-full">
            <div className="pb-14">
              <h3 className="h2 block mb-2">Your cart is empty</h3>
              <p>Discover our products.</p>
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
                  className="w-full h-full text-milk text-sm"
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
