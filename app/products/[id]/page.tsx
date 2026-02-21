"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import MainHeader from "@/components/MainHeader"



export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct]: any = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <div className="p-10">Loading...</div>;

  const discountPercent =
    product.discount_price
      ? Math.round(
          ((product.price - product.discount_price) / product.price) * 100 / 5
        ) * 5
      : null;

  const benefits = product.key_benefits
    ? product.key_benefits.split("|")
    : [];

  return (
    <div >

      <>
<MainHeader/>

<div className="max-w-screen mx-auto p-6 grid md:grid-cols-2 gap-10">


      {/* LEFT - IMAGE */}
      <div>
        <img
          src={product.image_url || "/placeholder.png"}
          className="w-full rounded-lg border"
        />
      </div>

      {/* RIGHT - DETAILS */}
      <div>
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl text-green-600 font-semibold mr-3">
            ₹{product.discount_price || product.price}
          </span>

          {product.discount_price && (
            <>
              <span className="line-through text-gray-500 mr-2">
                ₹{product.price}
              </span>
              <span className="bg-green-100 text-green-700 px-2 py-1 text-sm rounded">
                {discountPercent}% OFF
              </span>
            </>
          )}
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-3 mb-5">
          <button
            className="px-3 py-1 border"
            onClick={() => setQty(Math.max(1, qty - 1))}
          >
            -
          </button>
          <span>{qty}</span>
          <button
            className="px-3 py-1 border"
            onClick={() => setQty(qty + 1)}
          >
            +
          </button>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mb-6">
          <button className="bg-green-600 text-white px-6 py-2 rounded">
            Add to Cart
          </button>
          <button className="border border-green-600 text-green-600 px-6 py-2 rounded">
            Buy Now
          </button>
        </div>

        {/* Short Description */}
        <p className="text-gray-700 mb-6">
          {product.description}
        </p>
      </div>

      {/* FULL WIDTH SECTION */}
      <div className="md:col-span-2 mt-8">

        {/* Long Description */}
        {product.long_description && (
          <>
            <h2 className="text-xl font-semibold mb-2">Product Description</h2>
            <p className="text-gray-700 mb-6 whitespace-pre-line">
              {product.long_description}
            </p>
          </>
        )}

        {/* Key Benefits */}
        {benefits.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-2">Key Benefits</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {benefits.map((b: string, i: number) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </>
        )}

        {/* Usage */}
        {product.usage_instructions && (
          <>
            <h2 className="text-xl font-semibold mt-6 mb-2">How to Use</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {product.usage_instructions}
            </p>
          </>
        )}
      </div>
</div>

      </>
    </div>

    
  );
}
