import { CardDTO, CardRequestParam } from "./types"

const baseURL = "https://api.magicthegathering.io/v1"

export class CardFetchError extends Error {
  statusCode: number;
  key?: string;
  cardProps: CardRequestParam;
  constructor(
    statusCode: number,
    message: string,
    cardProps: CardRequestParam,
  ) {
    super();
    this.message = message;
    this.name = 'Fetch Error';
    this.statusCode = statusCode;
    this.cardProps = cardProps;
    Object.setPrototypeOf(this, CardFetchError.prototype);
  }
}

export const fetchCard = async (request: CardRequestParam): Promise<CardDTO[]> => {
  const params = buildParameters(request)
  const response = await fetch(`${baseURL}/cards${params}`)
  const cards = (await response.json()).cards as CardDTO[]

  if (cards.length < 1) {
    // api returns [] for anything not found
    throw new CardFetchError(404, `Card Not Found`, request)
  }

  return cards?.map(card => {
    return {
      ...card,
      quantity: Number(request.quantity)
    }
  })
}

const buildParameters = (request: CardRequestParam) => {
  const params = Object.entries(request)?.map(([key, value]) => value ? `${key}=${value}` : "")
    .filter(param => !param.includes("quantity"))
  return params.length > 0 ? `?${params.join("&")}` : ""
}

export const cardSearch = async (text: string) => {
  return fetchCard({name: text})
}