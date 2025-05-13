"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/context/language-context"
import { useAuth } from "@/context/auth-context"
import { UserMenu } from "@/components/user-menu"
import { CartIcon } from "@/components/cart-icon"
import { NotificationBell } from "@/components/notification-bell"
import { MobileNav } from "@/components/mobile-nav"
import { Menu } from "lucide-react"

export function SiteHeader() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const { user, isAuthenticated } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Skip rendering until mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle scroll event to add shadow to header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Don't render anything during SSR to avoid hydration issues
  if (!mounted) {
    return null
  }

  // Check if the current path is admin
  const isAdmin = pathname?.startsWith("/admin")

  // Don't show header on admin pages
  if (isAdmin) {
    return null
  }

  // Navigation items
  const navItems = [
    { href: "/", label: t("home") },
    { href: "/courses", label: t("courses") },
    { href: "/jobs", label: t("jobs") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ]

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b bg-background transition-shadow duration-200 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo and site name */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/karmada.jpg" alt="Karmada Logo" width={32} height={32} className="rounded-full" />
            <span className="hidden font-bold sm:inline-block">IT English Academy</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === item.href ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side items */}
        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <LanguageSwitcher />

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Authenticated user items */}
          {isAuthenticated ? (
            <>
              {/* Notification bell */}
              <NotificationBell />

              {/* Cart icon */}
              <CartIcon />

              {/* User menu */}
              <UserMenu user={user} />
            </>
          ) : (
            <>
              {/* Login/Register buttons */}
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">{t("login")}</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/register">{t("register")}</Link>
                </Button>
              </div>
            </>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileNavOpen(true)}
            aria-label={t("openMenu")}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">{t("openMenu")}</span>
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        navItems={navItems}
        isAuthenticated={isAuthenticated}
      />
    </header>
  )
}
