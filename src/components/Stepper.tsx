import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { useForm } from '@/context/FormContext'

interface StepperProps {
  steps: { number: number; label: string; title: string }[]
}

export const Stepper: React.FC<StepperProps> = ({ steps }) => {
  const { currentStep } = useForm()

  return (
    <Box
      sx={{
        backgroundImage: {
          xs: 'url(/assets/images/bg-sidebar-mobile.svg)',
          md: 'url(/assets/images/bg-sidebar-desktop.svg)',
        },
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: { xs: '1rem', md: '0.75rem' },
        padding: { xs: '2rem 0', md: '2.5rem' },
        display: 'flex',
        flexDirection: { xs: 'row', md: 'column' },
        justifyContent: { xs: 'center', md: 'flex-start' },
        gap: { xs: '1rem', md: '2rem' },
        minHeight: { xs: 'auto', md: '568px' },
      }}
    >
      <Stack direction={{ xs: 'row', md: 'column' }} spacing={{ xs: 2, md: 3 }}>
        {steps.map((step) => (
          <Box
            key={step.number}
            sx={{
              display: 'flex',
              alignItems: { xs: 'center', md: 'flex-start' },
              gap: { xs: '1rem', md: '1rem' },
              cursor: 'pointer',
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: '2px solid #cffafe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1rem',
                backgroundColor:
                  currentStep === step.number ? '#3b82f6' : 'transparent',
                color: currentStep === step.number ? '#fff' : '#cffafe',
                flexShrink: 0,
              }}
            >
              {step.number}
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  color: '#cbd5e1',
                  fontWeight: 400,
                  letterSpacing: '0.05em',
                }}
              >
                STEP {step.number}
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  color: '#fff',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  mt: 0.5,
                }}
              >
                {step.title}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
