
import { useState } from "react";
import logo from "../assets/logo.png";

const navLinks = [
  { name: "About Us", href: "#about" },
  { name: "Our Service", href: "#services" },
  { name: "Our Product", href: "#products" },
  { name: "Our Project", href: "#projects" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
      <nav className="navbar mx-auto max-w-7xl px-4 py-2 md:px-8">

        {/* Company Logo */}
        <div className="navbar-start">
  <a
    href="#home"
    aria-label="Heat Shield Engineering home"
    className="flex items-center gap-3"
  >
    <img
      src={logo}
      alt="Heat Shield Engineering"
      className="h-16 w-auto object-contain sm:h-20"
    />

    <span className="bg-gradient-to-r from-[#1455A4] via-[#2563EB] to-[#D92323] bg-clip-text text-lg font-extrabold leading-tight text-transparent sm:text-xl">
      Heat Shield Engineering
    </span>
  </a>
</div>

        {/* Desktop Navigation */}
        <div className="navbar-end hidden lg:flex">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="group relative inline-block py-2 font-medium text-[#172B45] transition-colors duration-300 hover:text-[#1455A4] focus-visible:text-[#1455A4]"
                >
                  {link.name}

                  {/* Animated underline */}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#1455A4] transition-all duration-300 ease-out group-hover:w-full group-focus-visible:w-full" />
                </a>
              </li>
            ))}
          </ul>

          
        </div>

        {/* Mobile Menu Toggle */}
        <div className="navbar-end lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="btn btn-ghost btn-square text-[#1455A4]"
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-5 pb-5 lg:hidden">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="group relative block w-fit py-3 font-medium text-[#172B45] transition-colors duration-300 hover:text-[#1455A4]"
                >
                  {link.name}
                  <span className="absolute bottom-2 left-0 h-0.5 w-0 bg-[#1455A4] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar;
