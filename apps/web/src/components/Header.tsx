"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="left-0 w-full  border-b border-gray-800 z-50 sticky top-0 bg-gray-900">
      <div className="max-w-3xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Title */}
        <Link href="/" className="text-3xl font-bold text-white font-mono">
          Swap
        </Link>
        {/* Desktop links */}
        <div className="hidden sm:flex gap-4 items-center">
          <Link
            href="/swap"
            className="text-gray-300 hover:text-white font-medium transition-colors"
          >
            History
          </Link>
          <Link
            href="/"
            className="text-white px-4 py-1.5 rounded-lg transition-colors"
          >
            Create Swap
          </Link>
        </div>
        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-gray-300 hover:text-white focus:outline-none"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open navigation menu"
        >
          {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden bg-gray-950 border-t border-gray-800 px-4 pb-3 flex flex-col gap-2 animate-fade-in-down">
          <Link
            href="/swap"
            className="text-gray-300 hover:text-white font-medium py-2"
            onClick={() => setOpen(false)}
          >
            Swap History
          </Link>
          <Link
            href="/"
            className="text-white px-4 py-2 rounded-lg transition-colors"
            onClick={() => setOpen(false)}
          >
            Create
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
