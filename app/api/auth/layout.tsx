export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Left Brand Panel */}
      <div className="hidden md:flex w-1/2 bg-green-800 text-white items-center justify-center p-12 relative">
        <div>
          <h1 className="text-4xl font-bold mb-4">Virasat Organics</h1>
          <p className="text-lg text-green-200">
            Pure Organic. Delivered Fresh.
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        {children}
      </div>

    </div>
  )
}