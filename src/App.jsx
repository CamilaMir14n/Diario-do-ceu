import { useCallback, useEffect, useState } from 'react'
import { fetchApod, todayISO } from './api/apod'
import { useLogbook } from './hooks/useLogbook'
import InstrumentPanel from './components/InstrumentPanel'
import Plate from './components/Plate'
import Logbook from './components/Logbook'
import { Loading, ErrorState } from './components/StateCards'
import './App.css'

export default function App() {
  const [date, setDate] = useState(todayISO())
  const [apod, setApod] = useState(null)
  const [status, setStatus] = useState('loading') // 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')

  const { entries, isPinned, togglePin } = useLogbook()

  const load = useCallback(async (targetDate) => {
    setStatus('loading')
    try {
      const data = await fetchApod(targetDate)
      setApod(data)
      setStatus('success')
    } catch (error) {
      setErrorMessage(error.message)
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    load(date)
  }, [date, load])

  return (
    <div className="page">
      <header className="page__header">
        <p className="eyebrow">Caderno de bordo nº 1 — observações do céu</p>
        <h1>Diário do Céu</h1>
        <p className="page__subtitle">
          Uma página por dia, ilustrada pela foto astronômica que a NASA escolheu para a data.
        </p>
      </header>

      <InstrumentPanel date={date} onChangeDate={setDate} disabled={status === 'loading'} />

      <main className="page__main">
        <section className="page__plate-column">
          {status === 'loading' && <Loading />}
          {status === 'error' && <ErrorState message={errorMessage} onRetry={() => load(date)} />}
          {status === 'success' && (
            <Plate apod={apod} pinned={isPinned(apod.date)} onTogglePin={togglePin} />
          )}
        </section>

        <Logbook entries={entries} onSelect={setDate} currentDate={date} />
      </main>

      <footer className="page__footer">
        <p>
          Dados e imagens via{' '}
          <a href="https://api.nasa.gov/" target="_blank" rel="noreferrer">
            NASA Open APIs — Astronomy Picture of the Day
          </a>
          . As páginas fixadas ficam salvas apenas no seu navegador.
        </p>
      </footer>
    </div>
  )
}