import { FIRST_APOD_DATE, randomDateBetween, todayISO } from '../api/apod'

export default function InstrumentPanel({ date, onChangeDate, disabled }) {
  const today = todayISO()

  function shiftDay(amount) {
    const next = new Date(date)
    next.setUTCDate(next.getUTCDate() + amount)
    const iso = next.toISOString().slice(0, 10)
    if (iso >= FIRST_APOD_DATE && iso <= today) {
      onChangeDate(iso)
    }
  }

  function goRandom() {
    onChangeDate(randomDateBetween(FIRST_APOD_DATE, today))
  }

  return (
    <div className="instrument-panel" role="group" aria-label="Seletor de data de observação">
      <button
        type="button"
        className="dial-button"
        onClick={() => shiftDay(-1)}
        disabled={disabled || date <= FIRST_APOD_DATE}
        aria-label="Dia anterior"
        title="Dia anterior"
      >
        ‹
      </button>

      <label className="date-slot">
        <span className="date-slot__label">data de observação</span>
        <input
          type="date"
          value={date}
          min={FIRST_APOD_DATE}
          max={today}
          disabled={disabled}
          onChange={(event) => onChangeDate(event.target.value)}
        />
      </label>

      <button
        type="button"
        className="dial-button"
        onClick={() => shiftDay(1)}
        disabled={disabled || date >= today}
        aria-label="Dia seguinte"
        title="Dia seguinte"
      >
        ›
      </button>

      <div className="instrument-panel__actions">
        <button type="button" className="ghost-button" onClick={() => onChangeDate(today)} disabled={disabled}>
          Hoje
        </button>
        <button type="button" className="ghost-button" onClick={goRandom} disabled={disabled}>
          Girar a sorte ✦
        </button>
      </div>
    </div>
  )
}
