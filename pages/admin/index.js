import Head from 'next/head'
import Layout from '../../core/client/components/layout'
import HomeLink from '../../core/client/components/home-link'
import Role from '../../core/common/role'
import { useVoteStatus, changeVoteStatus } from '../../features/voting/client/api'
import VoteStatus from '../../features/voting/common/vote-status'
import authorized from '../../core/client/authorized'
import { Loader } from '../../core/client/components/icons'

const withConfirm = (action, text) => () => {
  if (confirm(text || 'Вы уверены?')) {
    action()
  }
}

const Content = authorized(Role.ADMIN, () => {
  const { status } = useVoteStatus()

  const onOpenClick = withConfirm(
    () => changeVoteStatus(VoteStatus.OPEN),
    'Начинаем голосование?'
  )
  const onCloseClick = withConfirm(
    () => changeVoteStatus(VoteStatus.CLOSED),
    'Завершаем голосование?'
  )
  const onResultClick = withConfirm(
    () => changeVoteStatus(VoteStatus.RESULT),
    'Публикуем результаты голосования для всех?'
  )

  // TODO очищать данные голосования
  // (отдельный метод, который будет
  // и статус менять, и очищать?)
  const onResetClick = withConfirm(
    () => changeVoteStatus(VoteStatus.NONE),
    'Сбрасываем все результаты голосования?'
  )

  if (!status) {
    return <Loader />
  }

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
          Голосование завершено.
        </p>
        <button
          className={`button`}
          onClick={onResultClick}
        >
          Опубликовать результаты
        </button>
      </>}

      {status === VoteStatus.RESULT && <>
        <p>
          Результаты голосования опубликованы.
        </p>
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
