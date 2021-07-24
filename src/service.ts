import { CardRequestParam } from "./types"

const baseURL = "https://api.magicthegathering.io/v1"


export const fetchCards = async (request: CardRequestParam) => {
  const params = buildParameters(request)
  const response = await fetch(`${baseURL}/cards${params}`)
  return (await response.json()).cards}

const buildParameters = (request: CardRequestParam) => {
  const params = Object.entries(request).map(([key, value]) => {
    return `${key}=${value}`
  })

  return params.length > 0 ? `?${params.join("&")}` : ""
}

export const cardSearch = async (text: string) => {
  return fetchCards({name: text})
}