import type { productOnCartType } from '@/types/types'
import { formatCurrency } from './useUtils'

export const sendProductOrder = async (
  productOnCart: productOnCartType[],
  counts: { [id: number]: number },
) => {
  const token = import.meta.env.VITE_TELEGRAM_TOKEN
  const userID = import.meta.env.VITE_USER_ID

  const escapeString = (text: string) => {
    let result = ''
    text.split('').forEach((letter) => {
      if (letter == '.' || letter == ',') {
        result += `\\${letter}`
      } else {
        result += letter
      }
    })

    return result
  }

  const getAllProductInfo = () => {
    let products = ''
    productOnCart.forEach((product) => {
      products += `>__${product['name']}__ \\- _${counts[product['id']]}x_  *${escapeString(formatCurrency(product['price'] * counts[product['id']]))}*\n`
    })
    return products
  }

  const message = `
    *New Update:* Cart Component

    \n${getAllProductInfo()}\n\\-
    \n\\~_${new Date().toDateString()}_\\~
  `

  return await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: userID,
      parse_mode: 'MarkdownV2',
      text: message,
    }),
  })
}
