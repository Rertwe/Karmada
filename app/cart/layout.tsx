import type React from "react"
import { PurchaseProvider } from "@/context/purchase-context"

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <PurchaseProvider>{children}</PurchaseProvider>
}
