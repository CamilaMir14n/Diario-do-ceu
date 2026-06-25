const API_KEY = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY'
const BASE_URL = 'https://api.nasa.gov/planetary/apod'

// Primeiro dia com registro na APOD
export const FIRST_APOD_DATE = '1995-06-16'

export function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export function randomDateBetween(start, end) {
  const startTime = new Date(start).getTime()
  const endTime = new Date(end).getTime()
  const random = startTime + Math.random() * (endTime - startTime)
  return new Date(random).toISOString().slice(0, 10)
}

export async function fetchApod(date) {
  const url = new URL(BASE_URL)
  url.searchParams.set('api_key', API_KEY)
  if (date) url.searchParams.set('date', date)

  const response = await fetch(url.toString())

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error(
        'Limite de uso da chave DEMO_KEY da NASA foi atingido. Aguarde um pouco ou configure sua própria chave gratuita (veja o README).'
      )
    }
    const body = await response.json().catch(() => null)
    throw new Error(body?.msg || `Não foi possível consultar o registro de ${date}.`)
  }

  return response.json()
}
