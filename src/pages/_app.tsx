import type { AppProps } from 'next/app'
import { CssBaseline } from '@mui/material'
import { FormProvider } from '@/context/FormContext'
import '../../styles/global.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FormProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </FormProvider>
  )
}
