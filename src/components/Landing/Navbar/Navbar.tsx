/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        // Change 100 to the scroll position you want
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`transition-all duration-300 fixed top-0 z-50 w-full ${
        isScrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className="navCon">
        <div className="navbar">
          <div className="navbar-start">
            <div className="h-[50px]">
              <Link href="/">
                <img
                  src="/nav-logo.png"
                  alt="logo"
                  className="h-full w-full object-cover"
                />
              </Link>
            </div>
          </div>

          <div className="hidden lg:navbar-end lg:flex text-white">
            <ul className=" flex items-center gap-5 uppercase">
              <li>
                <Link
                  href="/"
                  className="hover:text-accent font-semibold  transition-all ease-in-out duration-[0.2s]"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-accent font-semibold   transition-all ease-in-out duration-[0.2s]"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-accent font-semibold  transition-all ease-in-out duration-[0.2s]"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-accent font-semibold  transition-all ease-in-out duration-[0.2s]"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#investment"
                  className="hover:text-accent font-semibold  transition-all ease-in-out duration-[0.2s]"
                >
                  Investment
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-accent font-semibold  transition-all ease-in-out duration-[0.2s]"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="hover:text-accent font-semibold  transition-all ease-in-out duration-[0.2s]"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

         

          <div className="navbar-end lg:hidden">
            <div
              className="lg:hidden text-white cursor-pointer"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="white"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Mobile Slide-In Menu */}
        <div
          className={`fixed top-0 left-0 h-full w-[250px] bg-primary transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
        >
          <div className="p-6">
            <div>
              <Link href="/">
                <img
                  src="/nav-logo.png"
                  alt="logo"
                  className="h-full w-full object-cover"
                />
              </Link>
            </div>
          </div>

          <ul className="flex flex-col gap-6 p-6 text-white">
            <li>
              <Link
                href="/about"
                className="hover:text-[#28C76F] transition-colors duration-300 cursor-pointer"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="hover:text-[#28C76F] transition-colors duration-300 cursor-pointer"
              >
                Faq
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-[#28C76F] transition-colors duration-300 cursor-pointer"
              >
                Contact
              </Link>
            </li>
          </ul>

          <div className="p-6 flex flex-col gap-4 text-white">
            <Link href="/login">
              <button className="border-white border-[1px] h-[2.5rem] text-center rounded-[30px] w-[120px] text-white">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="border-white border-[1px] h-[2.5rem] text-center rounded-[30px] w-[120px] text-white">
                Sign Up
              </button>
            </Link>
          </div>
        </div>

        {/* Overlay for mobile menu */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={toggleMenu}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
