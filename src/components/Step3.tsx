import React from 'react'
import {
  Box,
  Typography,
  Stack,
  Checkbox,
} from '@mui/material'
import StepperNavigation from './StepperNavigation'
import { useForm, AddonId } from '@/context/FormContext'

export const addons = [
  {
    id: 'online-service' as const,
    title: 'Online service',
    description: 'Access to multiplayer games',
    monthlyPrice: 1,
    yearlyPrice: 10,
  },
  {
    id: 'larger-storage' as const,
    title: 'Larger storage',
    description: 'Extra 1TB of cloud save',
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
  {
    id: 'customizable-profile' as const,
    title: 'Customizable profile',
    description: 'Custom theme on your profile',
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
] satisfies {
  id: AddonId
  title: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
}[]

export const Step3: React.FC = () => {
  const {
    planSelection,
    selectedAddons,
    setSelectedAddons,
    currentStep,
    setCurrentStep,
  } = useForm()

  const isYearly = planSelection.billing === 'yearly'

  const toggleAddon = (id: AddonId) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((addonId) => addonId !== id))
    } else {
      setSelectedAddons([...selectedAddons, id])
    }
  }

  const handleNext = () => {
    setCurrentStep(4)
  }

  const handleBack = () => {
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
          Pick add-ons
        </Typography>
        <Typography sx={{ color: '#9ca3af', fontSize: '0.95rem' }}>
          Add-ons help enhance your gaming experience.
        </Typography>
      </Box>

      <Stack spacing={2} sx={{ mb: 3 }}>
        {addons.map((addon) => {
          const checked = selectedAddons.includes(addon.id)
          const price = isYearly ? addon.yearlyPrice : addon.monthlyPrice

          return (
            <Box
              key={addon.id}
              onClick={() => toggleAddon(addon.id)}
              sx={{
                borderRadius: '0.75rem',
                border: checked ? '1px solid #3b82f6' : '1px solid #e5e7eb',
                backgroundColor: checked ? '#eff6ff' : '#fff',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#3b82f6',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Checkbox
                  checked={checked}
                  onChange={() => toggleAddon(addon.id)}
                  sx={{
                    color: '#cbd5e1',
                    '&.Mui-checked': {
                      color: '#3b82f6',
                    },
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      color: '#1f2937',
                    }}
                  >
                    {addon.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.85rem',
                      color: '#9ca3af',
                      mt: 0.25,
                    }}
                  >
                    {addon.description}
                  </Typography>
                </Box>
              </Box>

              <Typography
                sx={{
                  fontSize: '0.85rem',
                  color: '#3b82f6',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                }}
              >
                {isYearly ? `+${price}/yr` : `+${price}/mo`}
              </Typography>
            </Box>
          )
        })}
      </Stack>

      <StepperNavigation
        currentStep={currentStep}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </Box>
  )
}


