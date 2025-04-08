"use client";

import { useState } from "react";
import { PurchaseProvider, usePurchase } from "@/context/purchase-context";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const { addPurchase } = usePurchase();

  return (
    <PurchaseProvider>
      <div className="container mx-auto py-16 px-4">
        <h1>Cart Page</h1>
        {/* Cart content goes here */}
      </div>
    </PurchaseProvider>
  );
}

