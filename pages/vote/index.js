import Head from 'next/head'
import Layout from '../../core/client/components/layout'
import HomeLink from '../../core/client/components/home-link'
import VoteContent from '../../features/voting/client/components/vote-content'
import Role from '../../core/common/role'
import { useVoteStatus, useParticipated } from '../../features/voting/client/api'
import VoteStatus from '../../features/voting/common/vote-status'
import authorized from '../../core/client/authorized'
import Link from 'next/link'
import { Loader } from '../../core/client/components/icons'

const Content = authorized(Role.MEMBER, () => {
  const { status } = useVoteStatus()
  const { participated } = useParticipated()

  if (!status || !participated) {
    return <Loader />
  }

  if (status !== VoteStatus.OPEN) {
    return (
      <p>
        Голосование сейчас закрыто.
      </p>
    )
  }

  if (participated.value) {
    return (
      <p>
        Спасибо! Результаты будут <Link href="/"><a>на&nbsp;главной</a></Link> чуть позже.
      </p>
    )
  }

  return <VoteContent />
})

export default function Page() {
  return (
    <Layout title="Голосование">
      <HomeLink />

      <h2>Голосование</h2>
      
      <Content />
    </Layout>
  )
}
