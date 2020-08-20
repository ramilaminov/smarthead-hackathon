import Head from 'next/head'
import Link from 'next/link'
import Layout from '../core/client/components/layout'
import SignInButton from '../core/client/components/sign-in-button'
import { signOut, useSession, getSession } from 'next-auth/client'
import Role from '../core/common/role'
import styles from './index.module.css'
import { useVoteStatus, useParticipated } from '../features/voting/client/api'
import VoteStatus from '../features/voting/common/vote-status'
import { useMyTeam } from '../features/team/client/api'
import { Loader } from '../core/client/components/icons'

const GuestContent = () => {
  return (
    <p>
      Мы не нашли тебя среди участников хакатона.<br />
      Если здесь что-то не так, обратись к организаторам.
    </p>
  )
}

const MemberContent = () => {
  const { team } = useMyTeam()
  
  return (
    <>
      {team && <p>
        Ты в командe <strong>{team.name}</strong>.
      </p>}
      <p>
        Узнай больше о&nbsp;<Link href="/teams"><a>командах</a></Link> и&nbsp;<Link href="/rules"><a>правилах&nbsp;голосования</a></Link>.
      </p>
    </>
  )
}

const AdminContent = () => {
  return (
    <p>
      А ещё у тебя есть доступ в&nbsp;<Link href="/admin"><a>админку</a></Link>.
    </p>
  )
}

const VotingContent = () => {
  const { status } = useVoteStatus()
  const { participated } = useParticipated()

  if (!status || !participated) {
    return <Loader />
  }

  if (status !== VoteStatus.OPEN) {
    return null
  }

  if (participated.value) {
    return (
      <p>
        Спасибо за голосование! Результаты будут здесь позже.
      </p>
    )
  }

  return (
    <div className={`top-padding`}>
      <Link href="/vote"><a className={`button`}>Голосовать!</a></Link>
    </div>
  )
}

const Greeting = ({ user }) => {
  return (
    <p>
      Привет, <img src={user.image} className={styles.avatar} title={user.email}/> <strong>{user.name}</strong>!
    </p>
  )
}

const Footer = () => {
  return (
    <footer>
      <a
        href={`/api/auth/signout`}
        className={`light destructive`}
        onClick={(e) => {
          e.preventDefault()
          signOut()
        }}
      >
        <small>Выйти</small>
      </a>
    </footer>
  )
}

const AuthorizedContent = ({ session }) => {
  const { user, role } = session
  return (
    <>
      <Greeting user={user} />

      {role == Role.GUEST &&
        <GuestContent />}

      {role >= Role.MEMBER &&
        <MemberContent />}
      
      {role >= Role.ADMIN &&
        <AdminContent />}

      {role >= Role.MEMBER &&
        <VotingContent />}

      <Footer />
    </>
  )
}

const UnauthorizedContent = () => {
  return (
    <>
      <p>
        29–30 августа. Онлайн или в&nbsp;офисе.
      </p>
      <div className={`top-padding`}>
        <SignInButton />
      </div>
    </>
  )
}

export default function Page() {
  const [ session, loading ] = useSession()
  
  return (
    <Layout>
      <h1>Хакатон 2020</h1>
      
      {session
        ? <AuthorizedContent session={session} />
        : <UnauthorizedContent />
      }
    </Layout>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context)
    }
  }
}
