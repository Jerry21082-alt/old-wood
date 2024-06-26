import Image from "next/image";
import Link from "next/link";
import AspectRatioContainer from "./AspectRatioContainer";
import { formatPrice } from "@/helpers/formatPrice";

export default function ProductReel({ products }) {
  return (
    <div
      className="overflow-x-auto overflow-y-hidden custom-scrollbar"
      style={{ scrollSnapType: "x mandatory" }}
    >
      <div className="scrollbar">
        {products.map((item) => (
          <div className="w-full flex flex-col relative" key={item.id}>
            <div
              className="relative mb-4 overflow-hidden"
              style={{ opacity: "1" }}
            >
              <div className="absolute right-2 top-2 z-10 flex flex-col items-end">
                {item.toOrder && (
                  <span className="text-darkBrown py-1 px-2 bg-snow">
                    Made to Order
                  </span>
                )}
              </div>
              <AspectRatioContainer
                aspectRatio={3 / 4}
                className="block relative mb-4"
              >
                <Link
                  href={`/product_page/${item.id}`}
                  className="w-full h-full"
                  // style={{ aspectRatio: "3 / 4" }}
                >
                  <Image
                    src={item.primaryImage}
                    alt="product image"
                    width={500}
                    height={500}
                    className="object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
                  />
                  <Image
                    src={item.secondaryImage}
                    alt="product image"
                    width={500}
                    height={500}
                    className="object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full secondary-img"
                  />
                </Link>
              </AspectRatioContainer>

              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <Link className="mt-[1px] mr-[10px] mb-[8px] h2" href="/">
                    {item.name}
                  </Link>
                  <div className="text-lightBrown h2">{item.type}</div>
                </div>

                <div className="flex flex-col">
                  <div className="mt-[1px] mr-[10px] mb-[8px] flex flex-wrap justify-end">
                    <span>From&nbsp;</span>
                    <span>${formatPrice(item.price)}</span>
                  </div>

                  <div className="flex items-center justify-end">
                    {item.colors.map((color, idx) => (
                      <div
                        className="w-2 h-2 rounded-full ml-2"
                        key={idx}
                        style={{ backgroundColor: `#${color}` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
