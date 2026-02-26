"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import MainHeader from "@/components/MainHeader"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Thumbs } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/thumbs"

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("description")
  const [selectedImage, setSelectedImage] = useState("")

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data)
        setSelectedImage(data?.image_url)
      })
  }, [id])

  if (!product) return <div className="p-10">Loading...</div>

  return (
    <div className="bg-white">
      <>

      <MainHeader/>
      

      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12">

        {/* LEFT IMAGE SECTION */}
       <div>
  <Swiper
    modules={[Navigation, Thumbs]}
    navigation
    thumbs={{ swiper: thumbsSwiper }}
    className="rounded-lg border"
  >
    {product.images?.map((image_url: string, i: number) => (
      <SwiperSlide key={i}>
        <img src={image_url} className="w-full h-[420px] object-contain" />
      </SwiperSlide>
    ))}
  </Swiper>

  <Swiper
    onSwiper={setThumbsSwiper}
    slidesPerView={4}
    spaceBetween={10}
    className="mt-4"
  >
    {product.images?.map((image_url: string, i: number) => (
      <SwiperSlide key={i}>
        <img src={image_url} className="h-20 w-full object-cover border rounded cursor-pointer" />
      </SwiperSlide>
    ))}
  </Swiper>
</div>
        {/* RIGHT INFO SECTION */}
        <div>
          <h1 className="text-3xl font-bold mb-3">
            {product.title}
          </h1>

          <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm mb-4">
            In Stock
          </span>

          {/* Price */}
          <div className="mb-4">
            {product.discount_price ? (
              <>
                <span className="text-2xl text-green-700 font-bold">
                  ₹{product.discount_price}
                </span>
                <span className="text-gray-400 line-through ml-2">
                  ₹{product.price}
                </span>
              </>
            ) : (
              <span className="text-2xl text-green-700 font-bold">
                ₹{product.price}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mb-6">
            <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
              Buy Now
            </button>
            <button className="border border-green-600 text-green-600 px-6 py-3 rounded hover:bg-green-50">
              Add to Cart
            </button>
          </div>

          {/* Quick Specs */}
          <div className="border-t pt-6 space-y-2 text-sm">
            <p><b>Brand:</b> Virasat Organics</p>
            <p><b>Category:</b> {product.category}</p>
            <p><b>Form:</b> Whole</p>
            <p><b>Shelf Life:</b> 12 Months</p>
          </div>

        </div>
      </div>

      {/* TABS SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="flex gap-8 border-b mb-6">
          {["description", "additional", "reviews"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 capitalize ${
                activeTab === tab
                  ? "border-b-2 border-green-600 text-green-600"
                  : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "description" && (
          <div className="space-y-4 text-gray-700">
            <p>{product.description}</p>
          </div>
        )}

        {activeTab === "additional" && (
          <table className="w-full border text-sm">
            <tbody>
              <tr className="border">
                <td className="p-3 font-semibold">Country Of Origin</td>
                <td className="p-3">India</td>
              </tr>
              <tr className="border">
                <td className="p-3 font-semibold">Shelf Life</td>
                <td className="p-3">12 Months</td>
              </tr>
              <tr className="border">
                <td className="p-3 font-semibold">Packaging</td>
                <td className="p-3">Resealable Pack</td>
              </tr>
            </tbody>
          </table>
        )}

        {activeTab === "reviews" && (
          <div className="text-gray-600">
            No reviews yet.
          </div>
        )}
      </div>

      {/* BULK ENQUIRY SECTION */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">
            Looking for Bulk Purchase?
          </h2>

          <form className="grid md:grid-cols-2 gap-6">
            <input placeholder="Full Name" className="border p-3 rounded" />
            <input placeholder="Email" className="border p-3 rounded" />
            <input placeholder="Mobile" className="border p-3 rounded" />
            <input placeholder="Estimated Quantity" className="border p-3 rounded" />
            <textarea
              placeholder="Requirement Details"
              className="border p-3 rounded md:col-span-2"
            />
            <button className="bg-green-600 text-white py-3 rounded md:col-span-2">
              Send Enquiry
            </button>
          </form>
        </div>
      </div>

      </>

    </div>
  )
}