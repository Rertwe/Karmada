"use client"

import Link from "next/link"
import { Facebook, Instagram, Mail, Phone } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export function SiteFooter() {
  const { t } = useLanguage()

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("aboutUs")}</h3>
            <p className="text-muted-foreground">{t("footerAboutText")}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("contactUs")}</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+998 71 123 45 67</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@karmada.uz</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("followUs")}</h3>
            <div className="flex gap-4">
              <Link
                href="https://www.instagram.com/karmada_recruiting/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://www.facebook.com/karmada.recruiting/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Karmada. {t("allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  )
}
