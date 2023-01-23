import type { NextPage } from 'next'
import Head from 'next/head'
import { Panel } from '@components'
import { Stack } from '@mui/system'
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title> Greenshield Technology Case</title>
      </Head>
      <Stack direction="column" justifyContent="flex-start" alignItems="center">
        <Panel />
      </Stack>
    </>
  )
}

export default Home
