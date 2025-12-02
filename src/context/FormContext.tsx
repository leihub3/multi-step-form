import React, { createContext, useContext, useState } from 'react'

export interface PersonalInfo {
  name: string
  email: string
  phone: string
}

interface FormContextType {
  currentStep: number
  setCurrentStep: (step: number) => void
  personalInfo: PersonalInfo
  setPersonalInfo: (info: PersonalInfo) => void
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    email: '',
    phone: '',
  })

  return (
    <FormContext.Provider value={{ currentStep, setCurrentStep, personalInfo, setPersonalInfo }}>
      {children}
    </FormContext.Provider>
  )
}

export const useForm = () => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useForm must be used within FormProvider')
  }
  return context
}
