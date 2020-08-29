import Link from 'next/link'
import Layout from '../core/client/components/layout'
import SignInButton from '../core/client/components/sign-in-button'
import { signOut, useSession } from 'next-auth/client'
import Role from '../core/common/role'
import styles from './index.module.css'
import { useVotingState } from '../features/voting/client/api'
import VoteStatus from '../features/voting/common/vote-status'
import { useMyTeam } from '../features/team/client/api'
import { Loader } from '../core/client/components/icons'
import VotingResults from '../features/voting/client/components/voting-results'

const GuestContent = () => (
  <p>
    Мы не нашли тебя среди участников хакатона.<br />
    Если здесь что-то не так, обратись к организаторам.
  </p>
)

const MemberContent = () => {
  const { team } = useMyTeam()

  return (
    <>
      {team && <p>
        Ты в командe <strong>{team.name}</strong>.
      </p>}
      <p>
        Изучи <Link href="/teams"><a>все проекты</a></Link> и&nbsp;<Link href="/rules"><a>правила&nbsp;голосования</a></Link>.
      </p>
    </>
  )
}

const NotOpenedText = () => (
  <p>
    Приходи сюда голосовать после презентации проектов.
  </p>
)

const VoteLink = () => (
  <>
    <p>
      Настало время выбрать победителя.
    </p>
    <div className={`button-container`}>
      <Link href="/vote"><a className={`button`}>Голосовать!</a></Link>
    </div>
  </>
)

const ParticipatedText = () => (
  <p>
    Спасибо за голосование! Результаты будут здесь позже.
  </p>
)

const ClosedText = () => (
  <p>
    Голосование завершено. Скоро здесь будут результаты.
  </p>
)

const VotingContent = () => {
  const { state } = useVotingState()

  if (!state) {
    return <Loader />
  }

  const { status, participated, results } = state

  switch (status) {
    case VoteStatus.NONE:
      return <NotOpenedText />
    case VoteStatus.OPEN:
      return participated ? <ParticipatedText /> : <VoteLink />
    case VoteStatus.CLOSED:
      return <ClosedText />
    case VoteStatus.PUBLISHED:
      return <VotingResults results={results} />
    default:
      throw new Error('Invalid status')
  }
}

const Greeting = ({ user }) => (
  <p>
    Привет, <img src={user.image} className={styles.avatar} title={user.email}/> <strong>{user.name}</strong>!
  </p>
)

const Footer = ({ isAdmin }) => (
  <footer>
    <small>
      <a
        href={`/api/auth/signout`}
        className={`light destructive`}
        onClick={(e) => {
          e.preventDefault()
          signOut()
        }}
      >
        Выйти
      </a>
      {isAdmin && <>
        <span className={`light`}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <Link href="/admin"><a className={`light`}>Админка</a></Link>
      </>}
    </small>
  </footer>
)

const AuthorizedContent = ({ session }) => {
  const { user, role } = session
  return (
    <>
      <Greeting user={user} />

      {role == Role.GUEST &&
        <GuestContent />}

      {role >= Role.MEMBER &&
        <MemberContent />}

      {role >= Role.MEMBER &&
        <VotingContent />}

      <Footer isAdmin={role >= Role.ADMIN} />
    </>
  )
}

const UnauthorizedContent = () => (
  <>
    <p>
      29–30 августа. Онлайн или в&nbsp;офисе.
    </p>
    <div className={`button-container`}>
      <SignInButton />
    </div>
  </>
)

export default function Page() {
  const [session, loading] = useSession()
  
  const content = session
    ? <AuthorizedContent session={session} />
    : <UnauthorizedContent />

  return (
    <Layout>
      <h1>Хакатон 2020</h1>
      
      {loading ? <Loader /> : content}
    </Layout>
  )
}
