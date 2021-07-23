const baseURL = "https://api.magicthegathering.io/v1"

export const fetchCards = async <T>() => {
  const result = await fetch(baseURL+"/cards")
  const temp = await result.json()
  return temp //as unknown as T
}