function catalogId(dateString) {
  return `APOD · ${dateString.replaceAll('-', '.')}`
}

export default function Plate({ apod, pinned, onTogglePin }) {
  if (!apod) return null

  const { date, title, explanation, media_type, url, hdurl, copyright } = apod

  return (
    <article className="plate">
      <div className="plate__frame">
        {media_type === 'image' ? (
          <a href={hdurl || url} target="_blank" rel="noreferrer" title="Abrir em alta resolução">
            <img src={url} alt={title} loading="lazy" />
          </a>
        ) : (
          <div className="plate__video-wrapper">
            <iframe
              src={url}
              title={title}
              allow="encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
        <span className="plate__catalog">{catalogId(date)}</span>
      </div>

      <div className="plate__notes">
        <div className="plate__heading">
          <h2>{title}</h2>
          <button
            type="button"
            className={`pin-button ${pinned ? 'pin-button--active' : ''}`}
            onClick={() => onTogglePin(apod)}
            aria-pressed={pinned}
          >
            {pinned ? '✦ Fixado no diário' : '☆ Fixar no diário'}
          </button>
        </div>

        <p className="plate__explanation">{explanation}</p>

        {copyright && <p className="plate__credit">Crédito da imagem: {copyright.trim()}</p>}
      </div>
    </article>
  )
}
