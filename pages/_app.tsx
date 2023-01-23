import { RecoilRoot } from 'recoil'
import type { AppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline'

function MyApp(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <>
      <RecoilRoot>
        <CssBaseline />
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  )
}

export default MyApp
