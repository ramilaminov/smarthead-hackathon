import { Star, StarOutlined, StopOutlined, Stop } from '../../../../core/client/components/icons'
import styles from './rate.module.css'

export default function Rate({
  value = 0,
  maxValue = 5,
  onChange = null,
  disabled = false
}) {
  const onClick = (index) => {
    if (onChange !== null) {
      onChange(index)
    }
  }

  const buttons = []
  for (let index = 0; index <= maxValue; index++) {
    const isSelected = index > 0
      ? index <= value
      : value === 0
    
    let className = index > 0 ? styles.star : styles.stop
    if (isSelected) {
      className += ` ${styles.selected}`
    }

    const icon = index > 0
      ? isSelected ? <Star /> : <StarOutlined />
      : isSelected ? <Stop /> : <StopOutlined />

    buttons.push(
      <button
        key={index}
        className={className}
        onClick={() => onClick(index)}
        disabled={disabled}
      >
        {icon}
      </button>
    )
  }

  return (
    <div className={styles.container}>
      {buttons}
    </div>
  )
}