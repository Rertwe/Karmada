"use client"

import dynamic from "next/dynamic"

// Импортируем клиентский компонент с отключенным SSR
const CartClient = dynamic(() => import("./cart-client"), { ssr: false })

export default function CartClientWrapper() {
  return <CartClient />
}
