import Head from 'next/head'
import { Box, Container, Grid } from '@mui/material'
import { Stepper } from '@/components/Stepper'
import { Step1 } from '@/components/Step1'
import { useForm } from '@/context/FormContext'

const STEPS = [
  { number: 1, label: 'your info', title: 'YOUR INFO' },
  { number: 2, label: 'select plan', title: 'SELECT PLAN' },
  { number: 3, label: 'add-ons', title: 'ADD-ONS' },
  { number: 4, label: 'summary', title: 'SUMMARY' },
]

export default function Home() {
  const { currentStep } = useForm()

  return (
    <>
      <Head>
        <title>Multi-step Form — Next + TS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%)',
        //   padding: { xs: '2rem 1rem', md: '2rem' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            background: '#fff',
            borderRadius: { xs: '1rem', md: '1rem' },
            padding: { xs: '1.5rem', md: '3rem' },
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Grid container spacing={{ xs: 2, md: 4 }}>
            {/* Sidebar */}
            <Grid item xs={12} md={4}>
              <Stepper steps={STEPS} />
            </Grid>

            {/* Content */}
            <Grid item xs={12} md={8}>
              {currentStep === 1 && <Step1 />}
              {/* Steps 2, 3, 4 will be added here */}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}
