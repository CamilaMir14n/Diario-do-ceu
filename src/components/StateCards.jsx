export function Loading() {
  return (
    <div className="state-card" role="status">
      <div className="state-card__spinner" aria-hidden="true" />
      <p>Apontando o instrumento para o céu de hoje…</p>
    </div>
  )
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="state-card state-card--error" role="alert">
      <p>{message}</p>
      <button type="button" className="ghost-button" onClick={onRetry}>
        Tentar novamente
      </button>
    </div>
  )
}
