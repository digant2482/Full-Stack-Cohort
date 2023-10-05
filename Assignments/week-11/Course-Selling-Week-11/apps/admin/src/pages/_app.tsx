import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Appbar, InitUser } from 'ui';
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
  return (
  <RecoilRoot>
      <Appbar />
      <InitUser backendUrl={"http://localhost:3000/admin/me"}/>
      <Component {...pageProps} />
  </RecoilRoot>
  )
}