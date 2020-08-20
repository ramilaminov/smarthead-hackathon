import Head from 'next/head'
import Link from 'next/link'
import Layout from '../core/client/components/layout'

export default function Page() {
  return (
    <Layout title="404">
      <h1>404</h1>
      <p>
        Здесь ничего нет.
      </p>
      <p>
        <Link href="/"><a>← На главную</a></Link>
      </p>
    </Layout>
  )
}
