import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'diario-do-ceu:logbook'

function readStoredEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function useLogbook() {
  const [entries, setEntries] = useState(readStoredEntries)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }, [entries])

  const isPinned = useCallback(
    (date) => entries.some((entry) => entry.date === date),
    [entries]
  )

  const togglePin = useCallback((apod) => {
    setEntries((current) => {
      const alreadyPinned = current.some((entry) => entry.date === apod.date)
      if (alreadyPinned) {
        return current.filter((entry) => entry.date !== apod.date)
      }
      const slim = {
        date: apod.date,
        title: apod.title,
        url: apod.media_type === 'image' ? apod.url : apod.thumbnail_url || apod.url,
        media_type: apod.media_type,
      }
      return [slim, ...current].sort((a, b) => (a.date < b.date ? 1 : -1))
    })
  }, [])

  return { entries, isPinned, togglePin }
}