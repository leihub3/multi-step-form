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
  const [touched, setTouched] = React.useState({
    name: false,
    email: false,
    phone: false,
  })

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validatePhone = (phone: string) => {
    const re = /^[\d\s\-\+\(\)]+$/
    return re.test(phone) && phone.trim().length > 0
  }

  const validateField = (field: keyof typeof personalInfo, value: string): string => {
    switch (field) {
      case 'name':
        if (!value.trim()) {
          return 'Name is required'
        }
        return ''
      case 'email':
        if (!value.trim()) {
          return 'Email is required'
        } else if (!validateEmail(value)) {
          return 'Invalid email address'
        }
        return ''
      case 'phone':
        if (!value.trim()) {
          return 'Phone number is required'
        } else if (!validatePhone(value)) {
          return 'Invalid phone number'
        }
        return ''
      default:
        return ''
    }
  }

  const handleChange = (field: keyof typeof personalInfo) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value
    setPersonalInfo({ ...personalInfo, [field]: value })
    // Clear error on change if field has been touched
    if (touched[field]) {
      const error = validateField(field, value)
      setErrors({ ...errors, [field]: error })
    } else {
      setErrors({ ...errors, [field]: '' })
    }
  }

  const handleBlur = (field: keyof typeof personalInfo) => () => {
    setTouched({ ...touched, [field]: true })
    const value = personalInfo[field]
    const error = validateField(field, value)
    setErrors({ ...errors, [field]: error })
  }

  const handleNext = () => {
    // Mark all fields as touched when attempting to submit
    setTouched({ name: true, email: true, phone: true })

    // Validate all fields
    const newErrors = {
      name: validateField('name', personalInfo.name),
      email: validateField('email', personalInfo.email),
      phone: validateField('phone', personalInfo.phone),
    }

    setErrors(newErrors)

    // Check if form is valid
    const isValid = !newErrors.name && !newErrors.email && !newErrors.phone

    if (isValid) {
      setCurrentStep(2)
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
            {errors.name && touched.name && (
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
            onBlur={handleBlur('name')}
            error={!!errors.name && touched.name}
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
            {errors.email && touched.email && (
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
            onBlur={handleBlur('email')}
            error={!!errors.email && touched.email}
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
            {errors.phone && touched.phone && (
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
            onBlur={handleBlur('phone')}
            error={!!errors.phone && touched.phone}
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
