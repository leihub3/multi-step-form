import React, { createContext, useContext, useState } from 'react'

export interface PersonalInfo {
  name: string
  email: string
  phone: string
}

export type BillingPeriod = 'monthly' | 'yearly'

export type PlanName = 'arcade' | 'advanced' | 'pro'

export interface PlanSelection {
  plan: PlanName
  billing: BillingPeriod
}

export type AddonId = 'online-service' | 'larger-storage' | 'customizable-profile'

interface FormContextType {
  currentStep: number
  setCurrentStep: (step: number) => void
  personalInfo: PersonalInfo
  setPersonalInfo: (info: PersonalInfo) => void
  planSelection: PlanSelection
  setPlanSelection: (selection: PlanSelection) => void
  selectedAddons: AddonId[]
  setSelectedAddons: (addons: AddonId[]) => void
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    email: '',
    phone: '',
  })
  const [selectedAddons, setSelectedAddons] = useState<AddonId[]>([])
  const [planSelection, setPlanSelection] = useState<PlanSelection>({
    plan: 'arcade',
    billing: 'monthly',
  })

  return (
    <FormContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        personalInfo,
        setPersonalInfo,
        planSelection,
        setPlanSelection,
        selectedAddons,
        setSelectedAddons,
      }}
    >
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
