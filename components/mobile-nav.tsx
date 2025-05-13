"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X } from "lucide-react"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  navItems: { href: string; label: string }[]
  isAuthenticated: boolean
}

export function MobileNav({ isOpen, onClose, navItems, isAuthenticated }: MobileNavProps) {
  const pathname = usePathname()
  const { t } = useLanguage()
  const navRef = useRef<HTMLDivElement>(null)

  // Close mobile nav when clicking outside
  useOnClickOutside(navRef, onClose)

  // Close mobile nav when pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose])

  // Prevent body scrolling when mobile nav is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <div
      className={`mobile-menu-container ${isOpen ? "open" : ""}`}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div className="mobile-menu-overlay" onClick={onClose} />

      {/* Mobile menu */}
      <div
        ref={navRef}
        className={`mobile-menu ${isOpen ? "open" : ""}`}
        style={{ transform: isOpen ? "translateX(0)" : "translateX(-100%)" }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-2 border-b">
            <Link href="/" className="flex items-center gap-2" onClick={onClose}>
              <Image src="/logo.png" alt="Karmada Logo" width={28} height={28} className="rounded-full" />
              <span className="font-bold">IT English Academy</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={onClose} aria-label={t("closeMenu")}>
              <X className="h-5 w-5" />
              <span className="sr-only">{t("closeMenu")}</span>
            </Button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2 py-3 text-sm rounded-md transition-colors ${
                    pathname === item.href ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted"
                  }`}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </ScrollArea>

          {/* Auth buttons */}
          {!isAuthenticated && (
            <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-2">
              <Button variant="outline" asChild>
                <Link href="/login" onClick={onClose}>
                  {t("login")}
                </Link>
              </Button>
              <Button asChild>
                <Link href="/register" onClick={onClose}>
                  {t("register")}
                </Link>
              </Button>
            </div>
          )}

          {/* Admin link for authenticated users */}
          {isAuthenticated && (
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/admin" onClick={onClose}>
                  {t("adminPanel")}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
