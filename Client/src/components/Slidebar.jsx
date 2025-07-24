import React from 'react'
import { Link } from 'react-router-dom';
const Slidebar = () => {
    
  return (
    
    <>

      {/* Sidebar */}
    <aside className="w-64 bg-white  shadow-md hidden md:block mt-20">
        <div className="p-4 text-xl font-bold text-blue-600 border-b">
          Blog Dashboard
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li className="text-gray-700 hover:bg-blue-100 p-2 rounded">
            <Link to={'/dashboard'}>
            🏠 Home
            </Link>
            </li>
            <li className="text-gray-700 hover:bg-blue-100 p-2 rounded">
              <Link to={'/dashboard/allpost'}>
              📝 Posts
              </Link>
              </li>
            <li className="text-gray-700 hover:bg-blue-100 p-2 rounded">
            <Link to={'/dashboard/user'}>
              👥 Users
            </Link>
            </li>
            <li className="text-gray-700 hover:bg-blue-100 p-2 rounded">
              <Link to={'/dashboard/addpost'}>
            ➕ Addpost
            </Link>
            </li>
          </ul>
        </nav>
      </aside>

    </>
  )
}

export default Slidebar