import Head from 'next/head'
import styles from './layout.module.css'

export default function Layout({ title, children }) {
  let fullTitle = 'Хакатон 2020 в SmartHead'
  if (title) {
    fullTitle = `${title} — ${fullTitle}`
  }
  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <main>
          {children}
        </main>
      </div>
    </>
  )
}