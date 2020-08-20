import { useSession } from 'next-auth/client'
import Role from '../common/role'
import SignInButton from './components/sign-in-button'

const textForRole = (roleRequired) => {
  switch (roleRequired) {
    case Role.GUEST:
      return 'Без авторизации сюда нельзя'
    case Role.MEMBER:
      return 'Сюда можно только участникам'
    case Role.ADMIN:
      return 'Сюда можно только администраторам'
    case Role.OWNER:
      return 'Сюда можно только владельцу'
    default:
      return null
  }
}

export default (roleRequired, WrappedComponent) => (props) => {
  const [session, loading] = useSession()

  if (loading) return null
  
  if (session && session.role >= roleRequired) {
    return <WrappedComponent {...props} />
  }

  return (
    <>
      <p>
        {textForRole(roleRequired)}.
      </p>

      {!session &&
        <div className={`top-padding`}>
          <SignInButton />
        </div>
      }
    </>
  )
}
