import styles from './voting-results.module.css'
import formatScore from '../../common/format-score'

const Winner = ({ data: { team, score } }) => (
  <>
    <p className={styles.winner}>
      Проект победителей — <strong>{team.name}</strong>! 🏆
    </p>
    <p>
      Поздравляем {team.groupName}: {team.members.join(', ')}!<br />
      Их результат: <strong>{formatScore(score)}</strong>.
    </p>
  </>
)

export default function VotingResults({ results }) {
  if (results.length === 0) {
    return null
  }
  const winner = results[0]

  return (
    <>
      <Winner data={winner} />
      <h4>
        Результаты других команд
      </h4>
      <ul className={styles.list}>
        {results.slice(1).map(row => (
          <li key={row.team.id}>
            {row.team.name}: <strong>{formatScore(row.score)}</strong>
          </li>
        ))}
      </ul>
    </>
  )
}
