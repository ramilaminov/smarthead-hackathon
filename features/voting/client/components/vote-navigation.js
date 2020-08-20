import styles from './vote-navigation.module.css'

export default function VoteNavigation({
  step,
  stepCount,
  nextIsEnabled,
  onStepChange,
  onSend
}) {
  const backIsVisible = step > 0
  
  return (
    <div className={styles.navigation}>
      {step == stepCount - 1 && <button
        disabled={!nextIsEnabled}
        className={`button`}
        onClick={onSend}
      >
        Отправить
      </button>}

      {step < stepCount - 1 && <button
        disabled={!nextIsEnabled}
        className={`button`}
        onClick={() => onStepChange(step + 1)}
      >
        Далее →
      </button>}

      {backIsVisible && <button
        className={`text-button`}
        onClick={() => onStepChange(step - 1)}
      >
        ← Назад
      </button>}
    </div>
  )
}