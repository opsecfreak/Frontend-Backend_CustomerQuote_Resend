// backend-analytics-form-view/src/types/index.ts
export interface FormSubmission {
  id: string
  createdAt: Date
  updatedAt: Date
  aiSummary?: string | null
  summary: string
  fromemail: string
  brandName?: string | null
  companyName?: string | null
  companyWebsite?: string | null
  contactPerson?: string | null
  phoneNumber?: string | null
  budget?: string | null
  urgency?: string | null
  questions?: string | null
  requirements?: string | null
  additionalInfo?: string | null
}
