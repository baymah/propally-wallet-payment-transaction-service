import { EmailService } from "../services/email/emailService"
import { IHandle } from "../../../core/domain/events/IHandle"
import { PropertyInvestmentNotificationType } from "../../../infra/db/models/UserEntity"
import { DomainEvents, RegisterCallback } from "../../../core/domain/events/DomainEvents"
import { PropertyInvestmentNotificationCreated } from "../domain/events/propertyInvestmentNotificationCreated"

export class AfterPropertyInvestmentNotificationCreated implements IHandle<PropertyInvestmentNotificationCreated> {
  constructor(private emailService: EmailService) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.onUserCreated.bind(this) as RegisterCallback, PropertyInvestmentNotificationCreated.name)
  }

  private async onUserCreated(event: PropertyInvestmentNotificationCreated): Promise<void> {
    const { propertyInvestmentNotification } = event

    try {
      if (propertyInvestmentNotification.type === PropertyInvestmentNotificationType.NewInvestment) {
        await this.emailService.sendMail({
          to: propertyInvestmentNotification.user.email,
          subject: propertyInvestmentNotification.title,
          templateName: "property_investment_notification_email",
          templateData: {
            title: propertyInvestmentNotification.title,
            message: propertyInvestmentNotification.message,
          },
        })
      }

      console.info(`[After property investment notification Created]: Successfully executed SendMail service`, {
        userId: propertyInvestmentNotification.user.userId,
        email: propertyInvestmentNotification.user.email,
      })
    } catch (err) {
      console.error(`[After property investment notification Created]: ${err.message}`, {
        userId: propertyInvestmentNotification.user.userId,
      })
    }
  }
}
