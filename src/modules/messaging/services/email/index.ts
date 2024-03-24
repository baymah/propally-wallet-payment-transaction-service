import { EmailServiceImpl } from "./emailServiceImpl"
import { SendgridService } from "./sendgridService"
import { TestMailService } from "./testMailService"

export const sendgridEmailService = new SendgridService()
export const testEmailService = new TestMailService()
export const emailService = new EmailServiceImpl(sendgridEmailService)
