export type productOnCartType = {
  id: number
  image: { thumbnail: string; mobile: string; tablet: string; desktop: string }
  name: string
  category: string
  price: number
}

export type imagesType = {
  [a: string]: string
}
