import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Heart, Menu, X, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/i18n";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.crisis"), href: "/crisis" },
    { label: t("nav.programs"), href: "/programs" },
    { label: t("nav.getInvolved"), href: "/get-involved" },
    { label: t("nav.support"), href: "/support" },
    { label: t("nav.impact"), href: "/impact" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "ha", label: "Hausa", flag: "🇳🇬" },
    { code: "yo", label: "Yoruba", flag: "🇳🇬" },
    { code: "ig", label: "Igbo", flag: "🇳🇬" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Sticky Navigation Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white border-b border-lifeline-sand shadow-md"
            : "bg-white border-b border-lifeline-sand"
        }`}
      >
        <nav
          className="container mx-auto px-4 py-4 flex items-center justify-between"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 flex-shrink-0 group"
            aria-label="LifeLine Shelter Home"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-lifeline-blue to-blue-600 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <span className="font-bold text-lg text-lifeline-earth hidden sm:inline group-hover:text-lifeline-blue transition-colors duration-300">
              LifeLine Shelter
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.slice(0, -2).map((link, index) => (
              <Link
                key={link.href}
                to={link.href}
                className="px-4 py-2 text-sm font-semibold text-lifeline-earth hover:text-lifeline-blue hover:bg-lifeline-blue hover:bg-opacity-5 rounded-lg transition-all duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-lifeline-blue to-blue-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
              </Link>
            ))}
          </nav>

          {/* Right Actions Container */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Language Selector - Desktop */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="px-3 py-2 rounded-lg border border-lifeline-sand text-lifeline-earth font-medium hover:bg-lifeline-sand hover:bg-opacity-30 transition-all duration-300 flex items-center gap-2 text-sm"
                aria-label="Select language"
                aria-expanded={languageMenuOpen}
              >
                <Globe className="w-4 h-4" />
                <span className="font-semibold">{language.toUpperCase()}</span>
              </button>

              {languageMenuOpen && (
                <div
                  className="absolute top-full right-0 mt-2 bg-white border border-lifeline-sand rounded-xl shadow-xl z-50 overflow-hidden min-w-max animate-in fade-in slide-in-from-top-2 duration-200"
                  role="menu"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLanguageMenuOpen(false);
                      }}
                      className={`block w-full text-left px-5 py-3 text-sm font-medium transition-all duration-200 ${
                        language === lang.code
                          ? "bg-gradient-to-r from-lifeline-blue to-blue-600 text-white"
                          : "text-lifeline-earth hover:bg-lifeline-sand hover:bg-opacity-20"
                      }`}
                      role="menuitem"
                    >
                      <span className="mr-2.5">{lang.flag}</span>
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex gap-3 items-center">
              <button
                className="px-5 py-2.5 rounded-lg border-2 border-lifeline-blue text-lifeline-blue font-semibold text-sm hover:bg-lifeline-blue hover:text-white transition-all duration-300 hover:shadow-md"
                aria-label="Become a volunteer"
              >
                {t("nav.volunteer")}
              </button>
              <button
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-lifeline-blue to-blue-600 text-white font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
                aria-label="Make a donation"
              >
                {t("nav.donate")}
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg hover:bg-lifeline-sand hover:bg-opacity-30 transition-all duration-300"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-lifeline-earth transition-transform duration-300" />
              ) : (
                <Menu className="w-6 h-6 text-lifeline-earth transition-transform duration-300" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Menu - Slide Animation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? "max-h-96 opacity-100 visible"
              : "max-h-0 opacity-0 invisible"
          }`}
        >
          <nav
            className="border-t border-lifeline-sand bg-white"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-1">
                {navLinks.slice(0, -2).map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="block px-4 py-2.5 text-sm font-semibold text-lifeline-earth hover:text-lifeline-blue hover:bg-lifeline-blue hover:bg-opacity-5 rounded-lg transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Language Selector */}
              <div className="pt-4 border-t border-lifeline-sand">
                <p className="text-sm font-semibold text-lifeline-earth mb-3">
                  {t("nav.home") === "Home" ? "Language" : "Harshe"}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLanguageMenuOpen(false);
                      }}
                      className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                        language === lang.code
                          ? "bg-gradient-to-r from-lifeline-blue to-blue-600 text-white shadow-md"
                          : "border border-lifeline-sand text-lifeline-earth hover:bg-lifeline-sand hover:bg-opacity-30"
                      }`}
                    >
                      {lang.flag} {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile CTA Buttons */}
              <div className="flex gap-3 pt-4 border-t border-lifeline-sand">
                <button className="flex-1 px-4 py-2.5 rounded-lg border-2 border-lifeline-blue text-lifeline-blue font-semibold text-sm hover:bg-lifeline-blue hover:text-white transition-all duration-300 hover:shadow-md">
                  {t("nav.volunteer")}
                </button>
                <button className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-lifeline-blue to-blue-600 text-white font-semibold text-sm hover:shadow-lg transition-all duration-300">
                  {t("nav.donate")}
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-lifeline-earth text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-lifeline-blue to-blue-600 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white fill-white" />
                </div>
                <span className="font-bold text-lg">LifeLine Shelter</span>
              </div>
              <p className="text-sm text-gray-200 leading-relaxed">
                {t("footer.about")}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-base mb-4">
                {t("footer.quickLinks")}
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-200 hover:text-lifeline-blue hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {t("nav.about")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/programs"
                    className="text-gray-200 hover:text-lifeline-blue hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {t("nav.programs")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/impact"
                    className="text-gray-200 hover:text-lifeline-blue hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {t("nav.impact")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-200 hover:text-lifeline-blue hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {t("nav.contact")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Get Involved */}
            <div>
              <h3 className="font-bold text-base mb-4">
                {t("footer.getInvolved")}
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link
                    to="/get-involved"
                    className="text-gray-200 hover:text-lifeline-blue hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {t("nav.volunteer")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support"
                    className="text-gray-200 hover:text-lifeline-blue hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {t("nav.donate")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/crisis"
                    className="text-gray-200 hover:text-lifeline-blue hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {t("nav.crisis")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-bold text-base mb-4">
                {t("footer.stayUpdated")}
              </h3>
              <p className="text-sm text-gray-200 mb-4 leading-relaxed">
                {t("footer.newsletter")}
              </p>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2.5 rounded-lg text-lifeline-earth text-sm font-medium focus:outline-none focus:ring-2 focus:ring-lifeline-blue transition-all duration-300"
                  aria-label="Email for newsletter"
                />
                <button className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-lifeline-blue to-blue-600 text-white font-semibold text-sm hover:shadow-lg transition-all duration-300">
                  {t("footer.subscribe")}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-lifeline-earth border-opacity-20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-200 gap-4">
              <p>&copy; 2024 LifeLine Shelter. {t("footer.copyright")}</p>
              <div className="flex gap-6">
                <a
                  href="#"
                  className="hover:text-lifeline-blue transition-colors duration-300"
                >
                  {t("footer.privacy")}
                </a>
                <a
                  href="#"
                  className="hover:text-lifeline-blue transition-colors duration-300"
                >
                  {t("footer.terms")}
                </a>
                <a
                  href="#"
                  className="hover:text-lifeline-blue transition-colors duration-300"
                >
                  {t("footer.accessibility")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-in {
          animation: slideInFromTop 200ms ease-out;
        }

        .fade-in {
          opacity: 1;
        }

        .slide-in-from-top-2 {
          --tw-slide-in-offset: 8px;
        }
      `}</style>
    </div>
  );
};
