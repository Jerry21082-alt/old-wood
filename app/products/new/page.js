"use client";

import { art } from "@/constants/art";
import { useState } from "react";
const NewProductPage = () => {
  const [formData, setFormData] = useState({
    id: "",
    category: "",
    quantity: "",
    primaryImage: {
      img: "",
      srcSet: "",
    },
    secondaryImage: {
      img: "",
      srcSet: "",
    },
    name: "",
    type: "",
    price: "",
    colors: "",
    toOrder: false,
    allImages: "",
    dimensions: {
      width: "",
      length: "",
      depth: "",
      height: "",
      seatHeight: "",
      seatDepth: "",
      armHeight: "",
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(art),
      });

      const result = await response.json();
      if (result.success) {
        console.log("Product saved successfully:", result.product);
        // Clear form or redirect as needed
      } else {
        console.error("Failed to save product:", result.error);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="mt-[66.5px]">
      <section className="px-6 md:px-10">
        <div className="my-[90px]">
          <h1 className="h2 text-3xl md:text-4xl lg:text-5xl">
            Add New Product
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          {/* <div
            className="grid gap-7"
            style={{ gridTemplateColumns: "auto auto" }}
          >
            <div className="flex flex-col">
              <label htmlFor="product-name" className="w-max my-4">
                Name
              </label>
              <div className="flex items-center h-[45px]">
                <input
                  type="text"
                  id="product-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="border-listBorder border w-full p-2 h-full"
                />
              </div>
              <label htmlFor="product-price" className="w-max my-4">
                Price
              </label>
              <div className="h-[45px]">
                <input
                  type="Number"
                  id="product-price"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="border-listBorder border w-full p-2 h-full"
                />
              </div>
              <label htmlFor="product-category" className="w-max my-4">
                Category
              </label>
              <div className="h-[45px]">
                <input
                  type="text"
                  id="product-category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="border-listBorder border w-full p-2 h-full"
                />
              </div>
              <label htmlFor="product-quatity" className="w-max my-4">
                Quantity
              </label>
              <div className="h-[45px]">
                <input
                  type="Number"
                  id="product-quantity"
                  name="quantity"
                  required
                  value={formData.quantity}
                  onChange={handleChange}
                  className="border-listBorder border w-full p-2 h-full"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="product-primary_img" className="w-max my-4">
                Primary Image
              </label>
              <div className="flex items-center h-[45px]">
                <input
                  type="text"
                  id="product-primary_img"
                  name="primaryImage.img"
                  required
                  value={formData.primaryImage.img}
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      primaryImage: {
                        ...prevData.primaryImage,
                        img: e.target.value,
                      },
                    }));
                  }}
                  className="border-listBorder border w-full p-2 h-full"
                />

                <button className="ml-[15px] bg-darkBrown text-milk py-2 px-4 text-sm h-full">
                  Add
                </button>
              </div>
              <label htmlFor="product-secondary-img" className="w-max my-4">
                Secondary Image
              </label>
              <div className="flex items-center h-[45px]">
                <input
                  type="text"
                  id="product-secondary-img"
                  name="secondaryImage.img"
                  required
                  value={formData.secondaryImage.img}
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      secondaryImage: {
                        ...prevData.secondaryImage,
                        img: e.target.value,
                      },
                    }));
                  }}
                  className="border-listBorder border w-full p-2 h-full"
                />

                <button className="ml-[15px] bg-darkBrown text-milk py-2 px-4 text-sm h-full">
                  Add
                </button>
              </div>
              <label htmlFor="product-colors" className="w-max my-4">
                Colors
              </label>
              <div className="flex items-center h-[45px]">
                <input
                  type="text"
                  id="product-colors"
                  name="colors"
                  value={formData.colors}
                  required
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      colors: e.target.value,
                    }))
                  }
                  className="border-listBorder border w-full p-2 h-full"
                />

                <button className="ml-[15px] bg-darkBrown text-milk py-2 px-4 text-sm h-full">
                  Add
                </button>
              </div>
              <label htmlFor="product-other_images" className="w-max my-4">
                Other Images
              </label>
              <div className="flex items-center h-[45px]">
                <input
                  type="text"
                  id="product-other_images"
                  name="allImages"
                  required
                  value=""
                  onChange={(e) => {
                    setAllImages((prevImg) => [...prevImg, e.target.value]);
                  }}
                  className="border-listBorder border w-full p-2 h-full"
                />

                <button className="ml-[15px] bg-darkBrown text-milk py-2 px-4 text-sm h-full">
                  Add
                </button>
              </div>
            </div>
          </div> */}
          <button
            type="submit"
            // disabled="true"
            className="bg-darkBrown leading-[45px] text-milk px-4 my-10"
          >
            Add New Product
          </button>
        </form>
      </section>
    </div>
  );
};

export default NewProductPage;
