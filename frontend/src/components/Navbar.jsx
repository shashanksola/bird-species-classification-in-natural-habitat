import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "./LanguageSwitcher";
import { Bird } from "lucide-react";

const scrollToTop = () => {
  document.getElementById("nav").scrollIntoView({ behavior: 'smooth' });
};

const scrollToFindABird = () => {
  document.getElementById("process").scrollIntoView({ behavior: 'smooth' });
};

const scrollToBottom = () => {
  document.getElementById("footer").scrollIntoView({ behavior: 'smooth' });
};

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav
      id="nav"
      className="fixed top-0 left-0 w-screen z-30 p-4 bg-white/80 backdrop-blur-3xl shadow-sm transition-all"
    >
      <div className="flex flex-row justify-around items-center w-full px-6 py-4 text-slate-800 font-medium text-lg">
        <div className="flex flex-row gap-4">
          <Bird className="w-6 h-6 text-blue-600" />
          <Link
            to="/"
            className="text-blue-700 text-3xl font-bold flex items-center hover:cursor-pointer"
            style={{ fontFamily: "sans-serif" }}
          >
            <i className="max-md:hidden">Birdz</i>
            {/* You can also uncomment and use logo image */}
            {/* <img src="https://d9gp6f6sved89.cloudfront.net/_website_images/logo.png" alt="Birdz logo" width={'100px'} /> */}
          </Link>
        </div>
        {/* Logo */}

        {/* Nav Links */}
        <a
          onClick={scrollToFindABird}
          className="hover:cursor-pointer hover:text-blue-600 transition-colors duration-200"
        >
          {t("navbar.findABird")}
        </a>

        <a
          onClick={scrollToFindABird}
          className="hover:cursor-pointer hover:text-blue-600 transition-colors duration-200"
        >
          {t("navbar.classifyABird")}
        </a>

        <Link
          to="/location"
          className="hover:cursor-pointer hover:text-blue-600 transition-colors duration-200"
        >
          {t("navbar.birdzNearYou")}
        </Link>

        <LanguageSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;
