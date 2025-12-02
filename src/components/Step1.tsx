import React from 'react'
import {
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  FormHelperText,
} from '@mui/material'
import StepperNavigation from './StepperNavigation'
import { useForm } from '@/context/FormContext'

export const Step1: React.FC = () => {
  const { personalInfo, setPersonalInfo, setCurrentStep, currentStep } = useForm()
  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    phone: '',
  })

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validatePhone = (phone: string) => {
    const re = /^[\d\s\-\+\(\)]+$/
    return re.test(phone) && phone.trim().length > 0
  }

  const handleChange = (field: keyof typeof personalInfo) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value
    setPersonalInfo({ ...personalInfo, [field]: value })
    // Clear error on change
    setErrors({ ...errors, [field]: '' })
  }

  const handleNext = () => {
    let newErrors = { name: '', email: '', phone: '' }
    let isValid = true

    if (!personalInfo.name.trim()) {
      newErrors.name = 'Name is required'
      isValid = false
    }

    if (!personalInfo.email.trim()) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!validateEmail(personalInfo.email)) {
      newErrors.email = 'Invalid email address'
      isValid = false
    }

    if (!personalInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required'
      isValid = false
    } else if (!validatePhone(personalInfo.phone)) {
      newErrors.phone = 'Invalid phone number'
      isValid = false
    }

    if (isValid) {
      setCurrentStep(2)
    } else {
      setErrors(newErrors)
    }
  }
  const handleBack = () => {
    setCurrentStep(currentStep - 1)
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
          Personal info
        </Typography>
        <Typography sx={{ color: '#9ca3af', fontSize: '0.95rem' }}>
          Please provide your name, email address, and phone number.
        </Typography>
      </Box>

      <Stack spacing={4}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ fontWeight: 500, fontSize: '0.875rem', color: '#1f2937' }}>
              Name
            </Typography>
            {errors.name && (
              <FormHelperText error sx={{ m: 0, fontSize: '0.75rem' }}>
                {errors.name}
              </FormHelperText>
            )}
          </Box>
          <TextField
            fullWidth
            placeholder="e.g. Stephen King"
            value={personalInfo.name}
            onChange={handleChange('name')}
            error={!!errors.name}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '0.5rem',
              },
            }}
          />
        </Box>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ fontWeight: 500, fontSize: '0.875rem', color: '#1f2937' }}>
              Email Address
            </Typography>
            {errors.email && (
              <FormHelperText error sx={{ m: 0, fontSize: '0.75rem' }}>
                {errors.email}
              </FormHelperText>
            )}
          </Box>
          <TextField
            fullWidth
            placeholder="e.g. stephen@localhost.com"
            type="email"
            value={personalInfo.email}
            onChange={handleChange('email')}
            error={!!errors.email}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '0.5rem',
              },
            }}
          />
        </Box>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ fontWeight: 500, fontSize: '0.875rem', color: '#1f2937' }}>
              Phone Number
            </Typography>
            {errors.phone && (
              <FormHelperText error sx={{ m: 0, fontSize: '0.75rem' }}>
                {errors.phone}
              </FormHelperText>
            )}
          </Box>
          <TextField
            fullWidth
            placeholder="e.g. +1 234 567 890"
            value={personalInfo.phone}
            onChange={handleChange('phone')}
            error={!!errors.phone}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '0.5rem',
              },
            }}
          />
        </Box>
      </Stack>

      <StepperNavigation currentStep={currentStep} handleBack={handleBack} handleNext={handleNext} />
    </Box>
  )
}
