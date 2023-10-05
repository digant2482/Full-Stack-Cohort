import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil';
import { Appbar, InitUser } from 'ui';

export default function App({ Component, pageProps }: AppProps) {
  return (
  <RecoilRoot>
    <Appbar/>
    <InitUser backendUrl={"http://localhost:3000/users/me"}/>
    <Component {...pageProps} />
  </RecoilRoot>
  )
}