import { DomainEvents, RegisterCallback } from "../../../core/domain/events/DomainEvents"
import { IHandle } from "../../../core/domain/events/IHandle"
import { ActivityCreated } from "../domain/events/activityCreated"
import { EmailService, EmailTypes } from "../services/email/emailService"

export class AfterActivityCreated implements IHandle<ActivityCreated> {
  constructor(private emailService: EmailService) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.onUserCreated.bind(this) as RegisterCallback, ActivityCreated.name)
  }

  private async onUserCreated(event: ActivityCreated): Promise<void> {
    const { activity } = event

    try {
      // if (notification.type === NotificationType.PERSONAL) {
      await this.emailService.sendMail({
        to: activity.user.email,
        subject: "User Activity",
        templateName: "activity_email",
        templateData: {
          title: activity.eventName,
          message: activity.member,
        },
      })
      // }

      console.info(`[AfterActivityCreated]: Successfully executed SendMail use case Email Token Created`, {
        userId: activity.user.userId,
        email: activity.user.email,
      })
    } catch (err) {
      console.error(`[AfterActivityCreated]: ${err.message}`, {
        userId: activity.user.userId,
      })
    }
  }
}
