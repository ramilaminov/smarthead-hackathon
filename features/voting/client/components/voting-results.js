import styles from './voting-results.module.css'
import formatScore from '../../common/format-score'

export default function VotingResults({ results }) {
  return (
    <>
      <p>
        Вот и результаты.
      </p>
      <ul className={styles.list}>
        {results.map(row => (
          <li key={row.team.id}>
            {row.team.name}: <strong>{formatScore(row.score)}</strong>
          </li>
        ))}
      </ul>
    </>
  )
}
