import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Heart, Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/i18n";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

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
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-lifeline-sand">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-lifeline-blue to-blue-600 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <span className="font-bold text-xl text-lifeline-blue hidden sm:inline">
              LifeLine Shelter
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-lifeline-earth hover:text-lifeline-blue transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Language Selector & CTA Buttons */}
          <div className="hidden lg:flex gap-3 items-center">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="px-3 py-2 rounded-lg border border-lifeline-sand text-lifeline-earth font-medium hover:bg-lifeline-sand hover:bg-opacity-30 transition-colors flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">{language.toUpperCase()}</span>
              </button>

              {languageMenuOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-lifeline-sand rounded-lg shadow-lg z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLanguageMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 hover:bg-lifeline-sand hover:bg-opacity-20 transition-colors ${
                        language === lang.code ? "bg-lifeline-blue text-white" : "text-lifeline-earth"
                      }`}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="px-4 py-2 rounded-lg border border-lifeline-blue text-lifeline-blue font-medium hover:bg-lifeline-blue hover:text-white transition-colors">
              {t("nav.volunteer")}
            </button>
            <button className="px-4 py-2 rounded-lg bg-lifeline-blue text-white font-medium hover:bg-blue-700 transition-colors">
              {t("nav.donate")}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-lifeline-earth" />
            ) : (
              <Menu className="w-6 h-6 text-lifeline-earth" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-lifeline-sand bg-white">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-medium text-lifeline-earth hover:text-lifeline-blue transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Language Selector */}
              <div className="pt-4 border-t border-lifeline-sand">
                <p className="text-sm font-semibold text-lifeline-earth mb-3">Language / Harshe</p>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLanguageMenuOpen(false);
                      }}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        language === lang.code
                          ? "bg-lifeline-blue text-white"
                          : "border border-lifeline-sand text-lifeline-earth hover:bg-lifeline-sand hover:bg-opacity-20"
                      }`}
                    >
                      {lang.flag} {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-lifeline-sand">
                <button className="flex-1 px-4 py-2 rounded-lg border border-lifeline-blue text-lifeline-blue font-medium hover:bg-lifeline-blue hover:text-white transition-colors">
                  {t("nav.volunteer")}
                </button>
                <button className="flex-1 px-4 py-2 rounded-lg bg-lifeline-blue text-white font-medium hover:bg-blue-700 transition-colors">
                  {t("nav.donate")}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-lifeline-earth text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-lifeline-blue rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white fill-white" />
                </div>
                <span className="font-bold">LifeLine Shelter</span>
              </div>
              <p className="text-sm text-gray-200">
                {t("footer.about")}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold mb-4">{t("footer.quickLinks")}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/about" className="text-gray-200 hover:text-lifeline-blue transition-colors">
                    {t("nav.about")}
                  </Link>
                </li>
                <li>
                  <Link to="/programs" className="text-gray-200 hover:text-lifeline-blue transition-colors">
                    {t("nav.programs")}
                  </Link>
                </li>
                <li>
                  <Link to="/impact" className="text-gray-200 hover:text-lifeline-blue transition-colors">
                    {t("nav.impact")}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-200 hover:text-lifeline-blue transition-colors">
                    {t("nav.contact")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Get Involved */}
            <div>
              <h3 className="font-bold mb-4">{t("footer.getInvolved")}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/get-involved" className="text-gray-200 hover:text-lifeline-blue transition-colors">
                    {t("nav.volunteer")}
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="text-gray-200 hover:text-lifeline-blue transition-colors">
                    {t("nav.donate")}
                  </Link>
                </li>
                <li>
                  <Link to="/crisis" className="text-gray-200 hover:text-lifeline-blue transition-colors">
                    {t("nav.crisis")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social & Newsletter */}
            <div>
              <h3 className="font-bold mb-4">{t("footer.stayUpdated")}</h3>
              <p className="text-sm text-gray-200 mb-4">
                {t("footer.newsletter")}
              </p>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 rounded-lg text-lifeline-earth text-sm mb-2"
              />
              <button className="w-full px-3 py-2 rounded-lg bg-lifeline-blue text-white font-medium text-sm hover:bg-blue-700 transition-colors">
                {t("footer.subscribe")}
              </button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-lifeline-earth-opacity-20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-200">
              <p>&copy; 2024 LifeLine Shelter. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-lifeline-blue transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-lifeline-blue transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-lifeline-blue transition-colors">
                  Accessibility
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
