import Layout from '../../core/client/components/layout'
import HomeLink from '../../core/client/components/home-link'
import Role from '../../core/common/role'
import { openVoting, closeVoting, publishResults, resetVoting, useVotingState } from '../../features/voting/client/api'
import VoteStatus from '../../features/voting/common/vote-status'
import authorized from '../../core/client/authorized'
import { Loader } from '../../core/client/components/icons'

const withConfirm = (action, text) => () => {
  if (confirm(text || 'Вы уверены?')) {
    action()
  }
}

const Results = ({ results }) => (
  // TODO округлять баллы
  // TODO сортировать
  <>
    <ul>
      {results.map(row => (
        <li key={row.team.id}>
          {row.team.name}: {row.score}
        </li>
      ))}
    </ul>
  </>
)

const Content = authorized(Role.ADMIN, () => {
  const { state } = useVotingState()

  const onOpenClick = withConfirm(
    () => openVoting(),
    'Начинаем голосование?'
  )
  const onCloseClick = withConfirm(
    () => closeVoting(),
    'Завершаем голосование?'
  )
  const onPublishClick = withConfirm(
    () => publishResults(),
    'Публикуем результаты голосования для всех?'
  )

  const onResetClick = withConfirm(
    () => resetVoting(),
    'Сбрасываем все результаты голосования?'
  )

  if (!state) {
    return <Loader />
  }

  const { status, results } = state

  return (
    <>
      {status === VoteStatus.NONE && <>
        <p>
          Голосование ещё не&nbsp;запущено.
        </p>
        <button
          className={`button`}
          onClick={onOpenClick}
        >
          Запустить
        </button>
      </>}
      
      {status === VoteStatus.OPEN && <>
        <p>
          Голосование запущено.
        </p>
        <button
          className={`button`}
          onClick={onCloseClick}
        >
          Завершить
        </button>
      </>}

      {status === VoteStatus.CLOSED && <>
        <p>
          Голосование завершено. Вот что получилось:
        </p>
        <Results results={results} />
        <button
          className={`button`}
          onClick={onPublishClick}
        >
          Опубликовать результаты
        </button>
      </>}

      {status === VoteStatus.PUBLISHED && <>
        <p>
          Результаты опубликованы.
        </p>
        <Results results={results} />
        <button
          className={`button`}
          onClick={onResetClick}
        >
          Сбросить
        </button>
      </>}
    </>
  )
})

export default function Page() {
  return (
    <Layout title="Админка">
      <HomeLink />

      <h2>Админка</h2>

      <Content />
    </Layout>
  )
}
