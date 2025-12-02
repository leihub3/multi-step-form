import React from 'react'
import {
  Box,
  Typography,
  Grid,
  Stack,
  Switch,
  FormControlLabel,
} from '@mui/material'
import StepperNavigation from './StepperNavigation'
import { useForm } from '@/context/FormContext'

export const plans = [
  {
    id: 'arcade' as const,
    label: 'Arcade',
    monthlyPrice: 9,
    yearlyPrice: 90,
    iconSrc: '/assets/images/icon-arcade.svg',
  },
  {
    id: 'advanced' as const,
    label: 'Advanced',
    monthlyPrice: 12,
    yearlyPrice: 120,
    iconSrc: '/assets/images/icon-advanced.svg',
  },
  {
    id: 'pro' as const,
    label: 'Pro',
    monthlyPrice: 15,
    yearlyPrice: 150,
    iconSrc: '/assets/images/icon-pro.svg',
  },
]

export const Step2: React.FC = () => {
  const { planSelection, setPlanSelection, setCurrentStep, currentStep } = useForm()

  const handlePlanClick = (planId: (typeof plans)[number]['id']) => {
    setPlanSelection({ ...planSelection, plan: planId })
  }

  const handleBillingToggle = (
    _: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setPlanSelection({
      ...planSelection,
      billing: checked ? 'yearly' : 'monthly',
    })
  }

  const handleNext = () => {
    setCurrentStep(3)
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
  }

  const isYearly = planSelection.billing === 'yearly'

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1f2937', mb: 1 }}>
          Select your plan
        </Typography>
        <Typography sx={{ color: '#9ca3af', fontSize: '0.95rem' }}>
          You have the option of monthly or yearly billing.
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {plans.map((plan) => {
          const isSelected = planSelection.plan === plan.id
          const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice

          return (
            <Grid item xs={12} md={4} key={plan.id}>
              <Box
                onClick={() => handlePlanClick(plan.id)}
                sx={{
                  borderRadius: '0.75rem',
                  border: isSelected ? '1px solid #3b82f6' : '1px solid #e5e7eb',
                  backgroundColor: isSelected ? '#eff6ff' : '#fff',
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: '#3b82f6',
                  },
                  display: 'flex',
                  flexDirection: { xs: 'row', md: 'column' },
                  alignItems: { xs: 'center', md: 'flex-start' },
                  gap: 2,
                  height: '100%',
                }}
              >
                <Box
                  component="img"
                  src={plan.iconSrc}
                  alt={`${plan.label} icon`}
                  sx={{
                    width: 40,
                    height: 40,
                    flexShrink: 0,
                  }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      color: '#1f2937',
                      mb: 0.5,
                    }}
                  >
                    {plan.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.85rem',
                      color: '#6b7280',
                    }}
                  >
                    {isYearly ? `$${price}/yr` : `$${price}/mo`}
                  </Typography>
                  {isYearly && (
                    <Typography
                      sx={{
                        mt: 0.5,
                        fontSize: '0.75rem',
                        color: '#1d4ed8',
                        fontWeight: 500,
                      }}
                    >
                      2 months free
                    </Typography>
                  )}
                </Box>
              </Box>
            </Grid>
          )
        })}
      </Grid>

      <Box
        sx={{
          backgroundColor: '#f9fafb',
          borderRadius: '0.75rem',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography
            sx={{
              fontSize: '0.85rem',
              fontWeight: !isYearly ? 700 : 500,
              color: !isYearly ? '#1f2937' : '#9ca3af',
            }}
          >
            Monthly
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={isYearly}
                onChange={handleBillingToggle}
                color="primary"
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#0f172a',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#0f172a',
                  },
                }}
              />
            }
            label=""
            sx={{ m: 0 }}
          />
          <Typography
            sx={{
              fontSize: '0.85rem',
              fontWeight: isYearly ? 700 : 500,
              color: isYearly ? '#1f2937' : '#9ca3af',
            }}
          >
            Yearly
          </Typography>
        </Stack>
      </Box>

      <StepperNavigation
        currentStep={currentStep}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </Box>
  )
}


