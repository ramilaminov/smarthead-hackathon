import Rate from './rate'
import styles from './vote-step.module.css'

const VoteTeam = ({
  team,
  value,
  maxValue,
  onChange,
  disabled
}) => {
  return (
    <div className={styles.team}>
      <span className={styles['team-title']}>
        {team.name}
      </span>
      <Rate
        value={value}
        maxValue={maxValue}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  )
}

export default function VoteStep({
  index,
  criteria,
  teams,
  votes: {
    votesTotal,
    votesRemaining,
    getVoteForId,
    setVoteForId
  },
  disabled
}) {
  const criterion = criteria[index]
  return (
    <>
      <h3>
        Критерий&nbsp;{index + 1} из&nbsp;{criteria.length}: {criterion.title}
      </h3>
      <p>
        {criterion.description}
      </p>
      
      {/* TODO склонять "голосов" и "осталось" */}
      <p>
        У тебя всего <strong>{votesTotal}</strong>&nbsp;голосов за&nbsp;критерий. Распредели их все между&nbsp;командами. <strong>
          {votesRemaining > 0
            ? <>Осталось&nbsp;{votesRemaining}.</>
            : <>Готово!</>}
        </strong>
      </p>

      <section>
        {teams.map(team => {
          const value = getVoteForId(team.id)
          return <VoteTeam
            key={team.id}
            team={team}
            value={value}
            maxValue={value + votesRemaining}
            onChange={value => setVoteForId(team.id, value)}
            disabled={disabled}
          />
        })}
      </section>
    </>
  )
}
