import { NavLink } from "react-router";
import { FaLaptopCode, FaTimes, FaBars } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const base = "transition hover:text-blue-400";
  const active = "text-blue-400 font-semibold";

  return (
    <nav className="bg-gray-800 border-b border-gray-700 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-bold text-blue-300"
        >
          <FaLaptopCode className="text-blue-400" />
          <span>The Friendly Dev</span>
        </NavLink>

        {/* desktop */}
        <div className="hidden md:flex items-center gap-6">
          <div className="space-x-4">
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to="/projects"
            >
              Projects
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to="/blog"
            >
              Blog
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to="/about"
            >
              About
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to="/contact"
            >
              Contact
            </NavLink>
          </div>
        </div>
        <div className="flex items-center gap-4 md:hidden">
          <button
            title="Menu"
            className="cursor-pointer text-blue-400 text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* mob nav */}
      {menuOpen && (
        <div className="bg-gray-800 space-y-2 space-x-4 text-center md:hidden border-t border-gray-700 px-6 py-4">
          <NavLink
            className={({ isActive }) => (isActive ? active : base)}
            to="/"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? active : base)}
            to="/projects"
            onClick={() => setMenuOpen(false)}
          >
            Projects
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? active : base)}
            to="/blog"
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? active : base)}
            to="/about"
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? active : base)}
            to="/contact"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
