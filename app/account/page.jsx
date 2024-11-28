import Link from "next/link";

export default function Account() {
  return (
    <section>
      <div className="relative block link-bar text-center">
        <div className="max-w-[1600px] w-full px-6 md:px-10 mx-auto">
          <div className="flex items-start max-w-full relative">
            <ul className="grid grid-flow-col items-center min-w-max p-0 m-0 list-none gap-10">
              <li className="py-[27px] text-[14px]">
                <Link
                  href="/orders"
                  className="block w-max relative uppercase text-lightBrown shop-button"
                >
                  orders
                </Link>
              </li>
              <li className="py-[27px] text-[14px]">
                <Link
                  href="/orders"
                  className="block w-max relative uppercase text-lightBrown"
                >
                  addresses
                </Link>
              </li>
              <li className="py-[27px] text-[14px]">
                <Link
                  href="/orders"
                  className="block w-max relative uppercase text-darkGray"
                >
                  logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div className="max-w-[1600px] w-full px-6 md:px-10 relative block">
          <div className="relative text-center">
            <div className="mb-[120px] mt-[48px] max-w-full text-left my-[38px] mx-auto">
              <h1 className="mt-12 mb-6 text-[34px] text-lightBrown h2">
                Orders
              </h1>
              <p className="text-shadow">You have not placed any order yet.</p>

              <div className="mt-8">
                <Link
                  href="/collections/all"
                  className="px-[35px] whitespace-nowrap text-[13px] bg-lightBrown text-milk relative inline-block text-center uppercase leading-[45px]"
                >
                  continue shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
