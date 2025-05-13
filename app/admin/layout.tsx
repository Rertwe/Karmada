"use client"

import type React from "react"
import AdminSidebar from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { AdminThemeProvider } from "@/context/admin-theme-context"
import { AdminLanguageProvider } from "@/context/admin-language-context"
import { PurchaseProvider } from "@/context/purchase-context"
import { useEffect, useState } from "react"

// Script to initialize language from localStorage
const initLanguageScript = `
try {
  const savedLanguage = localStorage.getItem('admin-language-preference');
  if (savedLanguage && ['en', 'ru', 'uz'].includes(savedLanguage)) {
    document.documentElement.lang = savedLanguage;
    
    // Set data attribute for easier styling based on language
    document.documentElement.setAttribute('data-language', savedLanguage);
    
    // Apply RTL if needed (for future language support)
    if (['ar', 'he'].includes(savedLanguage)) {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }
} catch (e) {
  console.error('Error setting initial language:', e);
}
`

// Script to initialize theme from localStorage
const initThemeScript = `
try {
  const savedTheme = localStorage.getItem('admin-theme');
  if (savedTheme && ['dark', 'light', 'system'].includes(savedTheme)) {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (savedTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(savedTheme);
    }
  }
} catch (e) {
  console.error('Error setting initial theme:', e);
}
`

// Script to ensure sidebar toggle button works
const sidebarToggleScript = `
try {
  // Create a custom event for toggling the sidebar
  window.toggleAdminSidebar = function() {
    window.dispatchEvent(new CustomEvent('toggleAdminSidebar'));
  };
  
  // Add touch event listeners for swipe gestures
  let touchStartX = 0;
  let touchEndX = 0;
  
  document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, false);
  
  document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);
  
  function handleSwipe() {
    const swipeThreshold = 50;
    
    // Right to left swipe (close sidebar)
    if (touchStartX - touchEndX > swipeThreshold) {
      window.dispatchEvent(new CustomEvent('toggleAdminSidebar', { detail: { open: false } }));
    }
    
    // Left to right swipe (open sidebar)
    if (touchEndX - touchStartX > swipeThreshold) {
      window.dispatchEvent(new CustomEvent('toggleAdminSidebar', { detail: { open: true } }));
    }
  }
} catch (e) {
  console.error('Error setting up sidebar toggle:', e);
}
`

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  // Add event listener to update language when changed
  // This will ensure all components re-render with the new language
  useEffect(() => {
    setMounted(true)

    // Function to handle language change event
    const handleLanguageChange = () => {
      // Force re-render by updating a state
      setMounted(false)
      setTimeout(() => setMounted(true), 0)
    }

    // Add event listener
    window.addEventListener("languageChanged", handleLanguageChange)

    // Listen for sidebar toggle events
    const handleToggleSidebar = () => {
      // This event will be caught by the AdminSidebar component
      window.dispatchEvent(new CustomEvent("toggleAdminSidebar"))
    }

    window.addEventListener("toggleSidebar", handleToggleSidebar)

    // Clean up
    return () => {
      window.removeEventListener("languageChanged", handleLanguageChange)
      window.removeEventListener("toggleSidebar", handleToggleSidebar)
    }
  }, [])

  // Prevent body scrolling when sidebar is open
  useEffect(() => {
    const handleBodyClass = () => {
      const sidebarOpen = document.body.classList.contains("sidebar-open")
      if (sidebarOpen) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = ""
      }
    }

    // Set up a mutation observer to watch for the sidebar-open class
    const observer = new MutationObserver(handleBodyClass)
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] })

    return () => {
      observer.disconnect()
      document.body.style.overflow = ""
    }
  }, [])

  if (!mounted) {
    return null // Prevent hydration issues
  }

  return (
    <div className="admin-section">
      {/* Add script to set language before page load */}
      <script dangerouslySetInnerHTML={{ __html: initLanguageScript }} />
      <script dangerouslySetInnerHTML={{ __html: initThemeScript }} />
      <script dangerouslySetInnerHTML={{ __html: sidebarToggleScript }} />

      <AdminThemeProvider>
        <AdminLanguageProvider>
          <PurchaseProvider>
            <div id="admin-root" className="flex min-h-screen bg-background">
              {/* AdminSidebar handles its own visibility based on screen size */}
              <AdminSidebar />

              <div className="flex-1 flex flex-col w-full">
                <AdminHeader />
                <main className="flex-1 p-3 md:p-6 overflow-auto">{children}</main>
              </div>
            </div>
          </PurchaseProvider>
        </AdminLanguageProvider>
      </AdminThemeProvider>
    </div>
  )
}
