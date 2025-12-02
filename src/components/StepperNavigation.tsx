import React from 'react'
import { Box, Button } from '@mui/material'

interface StepperNavigationProps {
  currentStep: number
  handleBack: () => void
  handleNext: () => void
  nextLabel?: string
}

export default function StepperNavigation({
  currentStep,
  handleBack,
  handleNext,
  nextLabel = 'Next Step',
}: StepperNavigationProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mt: { xs: 6, md: 'auto' },
        pt: { xs: 0, md: 3 },
      }}
    >
      <Button
        variant="text"
        onClick={handleBack}
        disabled={currentStep === 1}
      >
        Go Back
      </Button>
      <Button
        variant="contained"
        onClick={handleNext}
        sx={{
          backgroundColor: '#1f2937',
          color: '#fff',
          padding: '0.75rem 1.75rem',
          fontWeight: 500,
          textTransform: 'none',
          fontSize: '1rem',
          '&:hover': {
            backgroundColor: '#111827',
          },
        }}
      >
        {nextLabel}
      </Button>
    </Box>
  )
}