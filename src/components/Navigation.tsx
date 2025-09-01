import LanguageSelector from "./LanguageSelector";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onBookNow?: () => void;
}

export default function Navigation({
  currentPage,
  setCurrentPage,
  onBookNow,
}: NavigationProps) {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow();
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (page: string) => {
    if (page === "services") {
      // Open Notion page in new tab
      window.open(
        "https://www.notion.so/254f2a39fd5580b7bf43caadd7048dc1?v=254f2a39fd5580d18764000c71b55a41&source=copy_link",
        "_blank",
        "noopener,noreferrer",
      );
      setIsMobileMenuOpen(false);
      return;
    }

    if (page === "home") {
      // Navigate to home page and scroll to top
      setCurrentPage("home");
      setIsMobileMenuOpen(false);
      // Scroll to top smoothly
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
      return;
    }

    if (page === "contacts") {
      // Navigate to contacts page and scroll to contacts section
      setCurrentPage("contacts");
      setIsMobileMenuOpen(false);
      // Wait for page to render then scroll to contacts
      setTimeout(() => {
        const contactsSection =
          document.getElementById("contacts");
        if (contactsSection) {
          contactsSection.scrollIntoView({
            behavior: "smooth",
          });
        }
      }, 100);
      return;
    }

    // For all other pages, navigate and scroll to top
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    // Scroll to top smoothly for all other pages
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
      <div className="flex items-center justify-between px-[21px] py-[25px] mx-[17px] my-[0px]">
        {/* Left side - Brand */}
        <button
          onClick={() => handleNavigation("home")}
          className="text-2xl font-bold text-gray-800 hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          {/* Mobile version - SR only */}
          <span className="md:hidden">
            <span className="text-[#0ABAB5]">S</span>
            <span className="text-pink-400">R</span>
          </span>
          {/* Desktop version - Full logo */}
          <span className="hidden md:inline">
            <span className="text-[#0ABAB5]">SoRa</span>
            <span className="text-pink-400">Clinic</span>
          </span>
        </button>

        {/* Center - Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => handleNavigation("event")}
            className={`transition-all duration-300 font-medium hover:scale-110 ${
              currentPage === "event"
                ? "text-[#0ABAB5] hover:text-pink-500 border-b-2 border-[#0ABAB5] pb-1"
                : "text-gray-600 hover:text-pink-500"
            }`}
          >
            {t('nav.event')}
          </button>
          <button
            onClick={() => handleNavigation("about")}
            className={`transition-all duration-300 font-medium hover:scale-110 ${
              currentPage === "about"
                ? "text-[#0ABAB5] hover:text-pink-500 border-b-2 border-[#0ABAB5] pb-1"
                : "text-gray-600 hover:text-pink-500"
            }`}
          >
            {t('nav.about')}
          </button>
          <button
            onClick={() => handleNavigation("treatments")}
            className={`transition-all duration-300 font-medium hover:scale-110 ${
              currentPage === "treatments"
                ? "text-[#0ABAB5] hover:text-pink-500 border-b-2 border-[#0ABAB5] pb-1"
                : "text-gray-600 hover:text-pink-500"
            }`}
          >
            {t('nav.treatments')}
          </button>
          <button
            onClick={() => handleNavigation("contacts")}
            className={`transition-all duration-300 font-medium hover:scale-110 ${
              currentPage === "contacts"
                ? "text-[#0ABAB5] hover:text-pink-500 border-b-2 border-[#0ABAB5] pb-1"
                : "text-gray-600 hover:text-pink-500"
            }`}
          >
            {t('nav.contact')}
          </button>
        </nav>

        {/* Right side with Language Selector, Book Button, and Admin */}
        <div className="flex items-center space-x-3">
          {/* Language Selector - Always visible */}
          <LanguageSelector />

          {/* Desktop Book Button */}
          <div className="hidden md:block">
            <Button
              onClick={handleBookNow}
              className="bg-gradient-to-r from-pink-400 via-[#0ABAB5] to-purple-400 hover:from-pink-500 hover:via-[#0ABAB5]/90 hover:to-purple-500 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {t('nav.book')}
            </Button>
          </div>

          {/* Dashboard button */}
          <button
            onClick={() => handleNavigation("dashboard-preview")}
            className={`hidden md:block transition-all duration-300 font-medium hover:scale-110 text-sm ${
              currentPage === "dashboard-preview"
                ? "text-[#0ABAB5] hover:text-pink-500 border-b-2 border-[#0ABAB5] pb-1"
                : "text-[#0ABAB5] hover:text-pink-500"
            }`}
          >
            {t('nav.dashboard')}
          </button>

          {/* Mobile menu button - ONLY THIS HOVER CHANGED */}
          <Sheet
            open={isMobileMenuOpen}
            onOpenChange={setIsMobileMenuOpen}
          >
            <SheetTrigger asChild>
              <button className="md:hidden p-2 text-gray-600">
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                  <div className="h-0.5 bg-current w-full transition-all duration-300"></div>
                  <div className="h-0.5 bg-current w-full transition-all duration-300"></div>
                  <div className="h-0.5 bg-current w-full transition-all duration-300"></div>
                </div>
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 bg-white/80 backdrop-blur-md border-l border-pink-100/50 shadow-xl"
            >
              <SheetHeader className="text-left pb-6 border-b border-pink-100">
                <SheetTitle
                  onClick={() => handleNavigation("home")}
                  className="text-2xl font-bold text-gray-800 hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <span className="text-[#0ABAB5]">S</span>
                  <span className="text-pink-400">R</span>
                </SheetTitle>
                <SheetDescription className="text-gray-600 text-sm">
                  Navigate through SoRa Clinic's pages and book your beauty consultation
                </SheetDescription>
              </SheetHeader>

              {/* Mobile Navigation Menu */}
              <div className="flex flex-col space-y-6 mt-8">
                {/* Navigation Links */}
                <div className="flex flex-col space-y-4">
                  <button
                    onClick={() => handleNavigation("event")}
                    className={`text-left py-3 px-4 rounded-xl transition-all duration-300 font-medium hover:scale-105 ${
                      currentPage === "event"
                        ? "bg-white text-pink-600 border-l-4 border-pink-400"
                        : "text-gray-600 hover:text-pink-500 hover:bg-white"
                    }`}
                  >
                    {t('nav.event')}
                  </button>
                  <button
                    onClick={() => handleNavigation("about")}
                    className={`text-left py-3 px-4 rounded-xl transition-all duration-300 font-medium hover:scale-105 ${
                      currentPage === "about"
                        ? "bg-white text-pink-600 border-l-4 border-pink-400"
                        : "text-gray-600 hover:text-pink-500 hover:bg-white"
                    }`}
                  >
                    {t('nav.about')}
                  </button>
                  <button
                    onClick={() =>
                      handleNavigation("treatments")
                    }
                    className={`text-left py-3 px-4 rounded-xl transition-all duration-300 font-medium hover:scale-105 ${
                      currentPage === "treatments"
                        ? "bg-white text-pink-600 border-l-4 border-pink-400"
                        : "text-gray-600 hover:text-pink-500 hover:bg-white"
                    }`}
                  >
                    {t('nav.treatments')}
                  </button>
                  <button
                    onClick={() => handleNavigation("contacts")}
                    className={`text-left py-3 px-4 rounded-xl transition-all duration-300 font-medium hover:scale-105 ${
                      currentPage === "contacts"
                        ? "bg-white text-pink-600 border-l-4 border-pink-400"
                        : "text-gray-600 hover:text-pink-500 hover:bg-white"
                    }`}
                  >
                    {t('nav.contact')}
                  </button>
                  <button
                    onClick={() => handleNavigation("services")}
                    className="text-left py-3 px-4 rounded-xl transition-all duration-300 font-medium hover:scale-105 text-gray-600 hover:text-pink-500 hover:bg-white"
                  >
                    {t('nav.services')}
                  </button>
                </div>

                {/* Mobile Book Button */}
                <div className="pt-4">
                  <Button
                    onClick={handleBookNow}
                    className="w-full bg-gradient-to-r from-pink-400 via-[#0ABAB5] to-purple-400 hover:from-pink-500 hover:via-[#0ABAB5]/90 hover:to-purple-500 text-white py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {t('nav.book')}
                  </Button>
                </div>

                {/* Mobile Dashboard Button */}
                <div className="pt-2">
                  <button
                    onClick={() => handleNavigation("dashboard-preview")}
                    className={`w-full text-left py-3 px-4 rounded-xl transition-all duration-300 font-medium hover:scale-105 ${
                      currentPage === "dashboard-preview"
                        ? "bg-white text-[#0ABAB5] border-l-4 border-[#0ABAB5]"
                        : "text-[#0ABAB5] hover:text-pink-500 hover:bg-white"
                    }`}
                  >
                    {t('nav.dashboard')}
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}