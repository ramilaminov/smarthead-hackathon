import Layout from '../../core/client/components/layout'
import HomeLink from '../../core/client/components/home-link'
import Role from '../../core/common/role'
import authorized from '../../core/client/authorized'
import { useTeams } from '../../features/team/client/api'
import { Loader } from '../../core/client/components/icons'

const TeamContent = ({ team }) => {
  return (
    <div>
      <h4>{team.name}</h4>
      <ul>
        {team.members.map((member, index) => <li key={index}>
          {member}
        </li>)}
      </ul>
    </div>
  )
}

const Content = authorized(Role.MEMBER, () => {
  const { teams } = useTeams()

  if (!teams) {
    return <Loader />
  }

  return (
    <>
      {teams.map(team => <TeamContent key={team.id} team={team} />)}
    </>
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
