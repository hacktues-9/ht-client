import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container} style={{height: '100vh', width: '100vw'}}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="HackTUES 9" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          HackTUES 9
        </h1>
      </main>
    </div>
  )
}
