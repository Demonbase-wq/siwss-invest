"use client";
import { useTranslation } from "@/translations/provider";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LanguageSelector } from "../LanguageSelector/LanguageSelector";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { translations } = useTranslation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
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
            <Link href="/">
              <img src="/logo.png" alt="logo" className="w-[200px]" />
            </Link>
          </div>

          <div className="hidden lg:navbar-center lg:flex text-white">
            <ul className="flex items-center gap-5 uppercase">
              <li>
                <Link
                  href="/"
                  className="hover:text-accent font-semibold transition-all ease-in-out duration-[0.2s]"
                >
                  {translations?.navbar?.home}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-accent font-semibold transition-all ease-in-out duration-[0.2s]"
                >
                  {translations?.navbar?.about}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-accent font-semibold transition-all ease-in-out duration-[0.2s]"
                >
                  {translations?.navbar?.faq}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-accent font-semibold transition-all ease-in-out duration-[0.2s]"
                >
                  {translations?.navbar?.contact_us}
                </Link>
              </li>
              <li>
                <Link
                  href="/#investment"
                  className="hover:text-accent font-semibold transition-all ease-in-out duration-[0.2s]"
                >
                  {translations?.navbar?.investment}
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-accent font-semibold transition-all ease-in-out duration-[0.2s]"
                >
                  {translations?.navbar?.login}
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="hover:text-accent font-semibold transition-all ease-in-out duration-[0.2s]"
                >
                  {translations?.navbar?.sign_up}
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden lg:navbar-end md:flex">
            <LanguageSelector />
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

        <div
          className={`fixed top-0 left-0 h-full w-[250px] bg-primary transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
        >
          <div className="p-6">
            <Link href="/">
              <img src="/logo.png" alt="logo" />
            </Link>
          </div>

          <ul className="flex flex-col gap-6 p-6 text-white">
            <li>
              <Link
                href="/about"
                className="hover:text-[#28C76F] transition-colors duration-300 cursor-pointer"
              >
                {translations?.mobile_menu?.about}
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="hover:text-[#28C76F] transition-colors duration-300 cursor-pointer"
              >
                {translations?.mobile_menu?.faq}
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-[#28C76F] transition-colors duration-300 cursor-pointer"
              >
                {translations?.mobile_menu?.contact}
              </Link>
            </li>
          </ul>

          <div className="p-6 flex flex-col gap-4 text-white">
            <Link href="/login">
              <button className="border-white border-[1px] h-[2.5rem] text-center rounded-[30px] w-[120px] text-white">
                {translations?.buttons?.login}
              </button>
            </Link>
            <Link href="/signup">
              <button className="border-white border-[1px] h-[2.5rem] text-center rounded-[30px] w-[120px] text-white">
                {translations?.buttons?.sign_up}
              </button>
            </Link>
            <div>
              <LanguageSelector />
            </div>
          </div>
        </div>

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
