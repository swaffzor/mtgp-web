import { CardDTO, CardRequestParam } from "./types"

const baseURL = "https://api.magicthegathering.io/v1"

export const fetchCard = async (request: CardRequestParam): Promise<CardDTO[]> => {
  const params = buildParameters(request)
  const response = await fetch(`${baseURL}/cards${params}`)
  const cards = (await response.json()).cards as CardDTO[]
  return cards.map(card => {
    return {
      ...card,
      quantity: request.quantity
    }
  })
}

const buildParameters = (request: CardRequestParam) => {
  const params = Object.entries(request).map(([key, value]) => value ? `${key}=${value}` : "")
    .filter(param => !param.includes("quantity"))
  return params.length > 0 ? `?${params.join("&")}` : ""
}

export const cardSearch = async (text: string) => {
  return fetchCard({name: text})
}