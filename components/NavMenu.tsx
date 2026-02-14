export default function NavMenu() {
  return (
    <div className="bg-gray-100 border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-center gap-8 text-sm font-medium text-gray-700">

        <a href="/" className="hover:text-green-700">Home</a>

        <div className="group relative cursor-pointer">
          <span className="hover:text-green-700">Shop ▾</span>
          <div className="absolute hidden group-hover:block bg-white shadow rounded mt-2 w-40">
            <a className="block px-4 py-2 hover:bg-gray-100" href="/products">All Products</a>
            <a className="block px-4 py-2 hover:bg-gray-100" href="/category/grains">Grains</a>
            <a className="block px-4 py-2 hover:bg-gray-100" href="/category/spices">Spices</a>
          </div>
        </div>

        <a href="/combos" className="hover:text-green-700">Combos</a>
        <a href="/about" className="hover:text-green-700">Our Company</a>
        <a href="/news" className="hover:text-green-700">News & Media</a>
        <a href="/blogs" className="hover:text-green-700">Blogs</a>

      </div>
    </div>
  )
}
