"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, Home, ShoppingBag, Package, Newspaper, BookOpen } from "lucide-react"

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Shop", href: "/products", icon: ShoppingBag },
  { name: "Combos", href: "/combos", icon: Package },
  { name: "News", href: "/news", icon: Newspaper },
  { name: "Blogs", href: "/blogs", icon: BookOpen },
]

export default function NavMenu() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden md:block bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-3 flex gap-8">

          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 text-sm font-medium relative transition-all
                  ${isActive ? "text-green-600" : "text-gray-600 hover:text-green-600"}
                `}
              >
                <Icon size={16} />
                {link.name}

                {/* Active underline */}
                {isActive && (
                  <span className="absolute -bottom-3 left-0 w-full h-[2px] bg-green-600 rounded"></span>
                )}
              </Link>
            )
          })}

        </div>
      </nav>

      {/* Mobile Top Bar */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 border-b bg-white">
        <button onClick={() => setMobileOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Slide Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">
          <div className="w-72 bg-white h-full shadow-xl p-6 animate-slideIn">

            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-bold text-green-700">Menu</h2>
              <button onClick={() => setMobileOpen(false)}>
                <X size={22} />
              </button>
            </div>

            <div className="space-y-5">
              {navLinks.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
                      ${isActive ? "bg-green-100 text-green-700" : "text-gray-700 hover:bg-gray-100"}
                    `}
                  >
                    <Icon size={18} />
                    {link.name}
                  </Link>
                )
              })}
            </div>

          </div>
        </div>
      )}
    </>
  )
}