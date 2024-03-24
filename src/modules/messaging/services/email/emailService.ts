export type EmailRequest = {
  to: string
  cc?: string
  bcc?: string[]
  subject?: string
  templateName: string
  templateData: Record<string, string>
  key?: string
  sendAt?: Date
}

export enum EmailTypes {
  Welcome = "welcome",
  Contact = "contact",
  VerifyEmail = "confirm_email",
  PasswordReset = "password_reset",
  SubscriptionCreated = "subscription_created",
  BeneficiaryVerified = "beneficiary_email_verified",
  VerifyBeneficiaryEmail = "verify_beneficiary_email",
  BulkTransactionsUpload = "bulk_transactions_upload",
  NotificationEmail = "notification_email",
  ActivityEmail = "activity_email",
  PropertyInvestmentNotificationEmail = "property_investment_notification_email",
}

export interface EmailService {
  sendMail(mailInfo: EmailRequest): Promise<void>
}
