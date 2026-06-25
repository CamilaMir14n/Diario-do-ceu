export default function Logbook({ entries, onSelect, currentDate }) {
  return (
    <aside className="logbook">
      <h3>Páginas fixadas</h3>
      {entries.length === 0 ? (
        <p className="logbook__empty">
          Nenhuma página fixada ainda. Clique em <strong>“Fixar no diário”</strong> em um registro
          para guardá-lo aqui.
        </p>
      ) : (
        <ul className="logbook__list">
          {entries.map((entry) => (
            <li key={entry.date}>
              <button
                type="button"
                className={`logbook__entry ${entry.date === currentDate ? 'logbook__entry--active' : ''}`}
                onClick={() => onSelect(entry.date)}
              >
                {entry.media_type === 'image' ? (
                  <img src={entry.url} alt="" />
                ) : (
                  <span className="logbook__video-badge">▶</span>
                )}
                <span className="logbook__entry-text">
                  <span className="logbook__entry-date">{entry.date}</span>
                  <span className="logbook__entry-title">{entry.title}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}
