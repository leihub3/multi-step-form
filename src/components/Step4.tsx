import React from 'react'
import { Box, Typography, Stack, Divider } from '@mui/material'
import StepperNavigation from './StepperNavigation'
import { useForm } from '@/context/FormContext'
import { plans } from './Step2'
import { addons } from './Step3'

export const Step4: React.FC = () => {
  const { planSelection, selectedAddons, currentStep, setCurrentStep } = useForm()

  const isYearly = planSelection.billing === 'yearly'

  const currentPlan = plans.find((plan) => plan.id === planSelection.plan)

  const planPrice = currentPlan
    ? isYearly
      ? currentPlan.yearlyPrice
      : currentPlan.monthlyPrice
    : 0

  const selectedAddonDetails = addons.filter((addon) =>
    selectedAddons.includes(addon.id)
  )

  const addonsTotal = selectedAddonDetails.reduce(
    (sum, addon) => sum + (isYearly ? addon.yearlyPrice : addon.monthlyPrice),
    0
  )

  const total = planPrice + addonsTotal

  const priceSuffix = isYearly ? '/yr' : '/mo'
  const totalLabel = isYearly ? 'Total (per year)' : 'Total (per month)'

  const handleBack = () => {
    setCurrentStep(3)
  }

  const handleNext = () => {
    // In a real app you might submit here; for now we just keep the user on the summary
  }

  const handleChangePlan = () => {
    setCurrentStep(2)
  }

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
          Finishing up
        </Typography>
        <Typography sx={{ color: '#9ca3af', fontSize: '0.95rem' }}>
          Double‑check everything looks OK before confirming.
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: '#f9fafb',
          borderRadius: '0.75rem',
          padding: '1.25rem 1.5rem',
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1.5,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '0.95rem',
                color: '#1f2937',
              }}
            >
              {currentPlan
                ? `${currentPlan.label} (${isYearly ? 'Yearly' : 'Monthly'})`
                : 'Plan'}
            </Typography>
            <Typography
              component="button"
              onClick={handleChangePlan}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              sx={{
                mt: 0.5,
                fontSize: '0.85rem',
                color: '#6b21a8',
                textDecoration: 'underline',
              }}
            >
              Change
            </Typography>
          </Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '0.95rem',
              color: '#1f2937',
            }}
          >
            {planPrice > 0 ? `$${planPrice}${priceSuffix}` : '--'}
          </Typography>
        </Box>

        <Divider sx={{ my: 1.5 }} />

        <Stack spacing={1}>
          {selectedAddonDetails.length === 0 && (
            <Typography
              sx={{
                fontSize: '0.85rem',
                color: '#9ca3af',
              }}
            >
              No add‑ons selected.
            </Typography>
          )}
          {selectedAddonDetails.map((addon) => (
            <Box
              key={addon.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.85rem',
                  color: '#9ca3af',
                }}
              >
                {addon.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.85rem',
                  color: '#1f2937',
                }}
              >
                {`+$${
                  isYearly ? addon.yearlyPrice : addon.monthlyPrice
                }${priceSuffix}`}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: '0.9rem',
            color: '#9ca3af',
          }}
        >
          {totalLabel}
        </Typography>
        <Typography
          sx={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#4f46e5',
          }}
        >
          {`+${total}${priceSuffix}`}
        </Typography>
      </Box>

      <StepperNavigation
        currentStep={currentStep}
        handleBack={handleBack}
        handleNext={handleNext}
        nextLabel="Confirm"
      />
    </Box>
  )
}


