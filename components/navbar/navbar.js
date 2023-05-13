import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Homepage
            </Link>
          </div>
          <div className="flex items-center ml-auto">
            <Link href="/" className="bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 rounded-md text-base font-medium text-white px-4 py-2">
              Launch App
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar