import CartClientWrapper from "./client-wrapper"

export default function CartPage() {
  // Возвращаем заглушку для серверного рендеринга и клиентский компонент
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Корзина</h1>
      <CartClientWrapper />
    </div>
  )
}
