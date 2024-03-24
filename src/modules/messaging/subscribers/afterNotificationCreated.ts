import { DomainEvents, RegisterCallback } from "../../../core/domain/events/DomainEvents"
import { IHandle } from "../../../core/domain/events/IHandle"
import { NotificationType } from "../../../infra/db/models/notification"
import { NotificationCreated } from "../domain/events/notificationCreated"
import { EmailService, EmailTypes } from "../services/email/emailService"

export class AfterNotificationCreated implements IHandle<NotificationCreated> {
  constructor(private emailService: EmailService) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.onUserCreated.bind(this) as RegisterCallback, NotificationCreated.name)
  }

  private async onUserCreated(event: NotificationCreated): Promise<void> {
    const { notification } = event

    try {
      if (notification.type === NotificationType.PERSONAL) {
        await this.emailService.sendMail({
          to: notification.user.email,
          subject: "Notification Email",
          templateName: "notification_email",
          templateData: {
            title: notification.title,
            message: notification.message,
          },
        })
      }

      console.info(`[AfterNotificationCreated]: Successfully executed SendMail`, {
        userId: notification.user.userId,
        email: notification.user.email,
      })
    } catch (err) {
      console.error(`[AfterNotificationCreated]: ${err.message}`, {
        userId: notification.user.userId,
      })
    }
  }
}
