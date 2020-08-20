import { signIn } from 'next-auth/client'

export default function SignInButton() {
  return (
    <a
      href={`/api/auth/signin/google`}
      className={`button`}
      onClick={(e) => {
        e.preventDefault()
        signIn('google')
      }}
    >
      Войти с&nbsp;Google
    </a>
  )
}