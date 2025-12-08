import { useState, useEffect } from "react";

interface PageSection {
  id: string;
  title: string;
  subtitle?: string;
  content?: string;
  imageUrl?: string;
  heroImage?: string;
}

interface PageContent {
  [page: string]: PageSection[];
}

// Default content for all pages
const DEFAULT_PAGES: PageContent = {
  home: [
    { id: "hero-title", title: "Hero Title", content: "Welcome to Lifeline Shelter" },
    { id: "hero-subtitle", title: "Hero Subtitle", content: "Supporting those in crisis with compassion and action" },
    { id: "hero-image", title: "Hero Image", imageUrl: "https://images.pexels.com/photos/30415852/pexels-photo-30415852.jpeg" },
  ],
  programs: [
    { id: "programs-title", title: "Page Title", content: "Our Programs" },
    { id: "programs-intro", title: "Introduction", content: "Comprehensive support programs for vulnerable families" },
  ],
  about: [
    { id: "about-title", title: "Page Title", content: "About Lifeline Shelter" },
    { id: "about-content", title: "Content", content: "Our mission is to provide emergency support..." },
  ],
  crisis: [
    { id: "crisis-title", title: "Page Title", content: "Crisis Response" },
    { id: "crisis-content", title: "Content", content: "Immediate assistance during emergencies..." },
  ],
  "get-involved": [
    { id: "involved-title", title: "Page Title", content: "Get Involved: Volunteer or Donate" },
    { id: "involved-subtitle", title: "Subtitle", content: "Fill out the form below to volunteer or make a donation" },
  ],
  support: [
    { id: "support-title", title: "Page Title", content: "Support Us" },
    { id: "support-content", title: "Content", content: "Your support makes a difference..." },
  ],
  impact: [
    { id: "impact-title", title: "Page Title", content: "Our Impact" },
    { id: "impact-content", title: "Content", content: "Stories of lives changed..." },
  ],
  contact: [
    { id: "contact-title", title: "Page Title", content: "Contact Us" },
    { id: "contact-content", title: "Content", content: "Get in touch with Lifeline Shelter..." },
  ],
};

/**
 * Hook to retrieve page content from localStorage.
 * Falls back to DEFAULT_PAGES if content is not found in localStorage.
 * @param pageName - The name of the page (e.g., "home", "programs")
 * @returns Array of PageSection objects for the given page
 */
export function usePageContent(pageName: string): PageSection[] {
  const [content, setContent] = useState<PageSection[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("websitePageContents");
      const pageContents: PageContent = saved ? JSON.parse(saved) : DEFAULT_PAGES;
      
      setContent(pageContents[pageName] || DEFAULT_PAGES[pageName] || []);
    } catch (err) {
      console.warn(`Failed to load content for ${pageName}:`, err);
      setContent(DEFAULT_PAGES[pageName] || []);
    }
  }, [pageName]);

  return content;
}

/**
 * Helper function to get a specific section from a page
 * @param pageName - The page name
 * @param sectionId - The section ID
 * @returns The section object or undefined
 */
export function getPageSection(pageName: string, sectionId: string): PageSection | undefined {
  try {
    const saved = localStorage.getItem("websitePageContents");
    const pageContents: PageContent = saved ? JSON.parse(saved) : DEFAULT_PAGES;
    const sections = pageContents[pageName] || DEFAULT_PAGES[pageName] || [];
    return sections.find(s => s.id === sectionId);
  } catch (err) {
    console.warn(`Failed to get section ${sectionId} from ${pageName}:`, err);
    const sections = DEFAULT_PAGES[pageName] || [];
    return sections.find(s => s.id === sectionId);
  }
}

/**
 * Helper function to get content value from a section
 * @param pageName - The page name
 * @param sectionId - The section ID
 * @param fallback - Fallback value if section/content not found
 * @returns The content string or fallback
 */
export function getContentValue(pageName: string, sectionId: string, fallback: string = ""): string {
  const section = getPageSection(pageName, sectionId);
  return section?.content || fallback;
}

/**
 * Helper function to get image URL from a section
 * @param pageName - The page name
 * @param sectionId - The section ID
 * @param fallback - Fallback image URL if not found
 * @returns The image URL or fallback
 */
export function getImageUrl(pageName: string, sectionId: string, fallback: string = ""): string {
  const section = getPageSection(pageName, sectionId);
  return section?.imageUrl || fallback;
}
