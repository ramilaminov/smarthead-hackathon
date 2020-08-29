import Layout from '../../core/client/components/layout'
import HomeLink from '../../core/client/components/home-link'
import Role from '../../core/common/role'
import authorized from '../../core/client/authorized'
import { useTeams } from '../../features/team/client/api'
import { Loader } from '../../core/client/components/icons'
import styles from './index.module.css'

const formatMembers = (members, groupName) => {
  if (members.length === 0) {
    return `В команде ${groupName} никого.`
  }
  let result = `В команде ${groupName} `
  result += members[0]
  for (let i = 1; i < members.length; i++) {
    if (i < members.length - 1) {
      result += ', '
    } else {
      result += ' и '
    }
    result += members[i]
  }
  return result + '.'
}

const TeamContent = ({ team }) => {
  return (
    <div className={styles.card}>
      <h3>{team.name}</h3>
      
      {team.summary && <p dangerouslySetInnerHTML={{ __html: team.summary }} />}
      
      <p className={styles.members}>
        {formatMembers(team.members, team.groupName)}
      </p>
    </div>
  )
}

const Content = authorized(Role.MEMBER, () => {
  const { teams } = useTeams()

  if (!teams) {
    return <Loader />
  }

  return (
    <div className={styles.container}>
      {teams.map(team => <TeamContent key={team.id} team={team} />)}
    </div>
  )
})

export default function Page() {
  return (
    <Layout title="Команды">
      <HomeLink />

      <h2>Команды</h2>
      
      <Content />
    </Layout>
  )
}
