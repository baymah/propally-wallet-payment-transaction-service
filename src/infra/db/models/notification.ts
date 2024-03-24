import { AfterInsert, AfterRemove, AfterUpdate, BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, RelationId, UpdateDateColumn } from "typeorm"
import { DomainEvents } from "../../../core/domain/events/DomainEvents"

export enum NotificationType {
  PERSONAL = "PERSONAL",
  GENERAL = "GENERAL",
  GENERAL_ANNOUNCEMENT = "GENERAL_ANNOUNCEMENT",
  // Other types like SYSTEM, PROMOTIONAL, etc.
}

@Entity("user_notifications")
export class UserNotification extends BaseEntity {
  @PrimaryColumn()
  id: string

  @Column()
  title!: string

  @Column("text", { nullable: true })
  message!: string

  @Column({
    type: "enum",
    enum: NotificationType,
  })
  type!: string

  @Column()
  user_id!: string

  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt?: Date

  // Subscribers
  @AfterInsert()
  @AfterUpdate()
  @AfterRemove()
  dispatchEvents() {
    DomainEvents.dispatchEventsHook(this.id)
    console.log("About to send domain event in notification")
  }
}
