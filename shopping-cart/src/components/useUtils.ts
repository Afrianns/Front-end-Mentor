import type { productOnCartType } from '../types/types'

export const formatCurrency = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export const countTotalPrice = (productOnCart: productOnCartType[], counts: { [id: number]: number }) => {
  let totalPrice = 0
  productOnCart.forEach((product) => {
    totalPrice += product['price'] * counts[product['id']]
  })

  return totalPrice
}
