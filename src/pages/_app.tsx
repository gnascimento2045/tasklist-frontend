import '@/styles/globals.scss'  // Ajuste o caminho conforme sua estrutura

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
