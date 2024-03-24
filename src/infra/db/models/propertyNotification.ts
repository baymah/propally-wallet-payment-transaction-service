// Enum defining different types of notifications
export enum PropertyInvestmentNotificationType {
  NewMessage = "new_message",
  PriceChange = "price_change",
  NewInvestment = "new_investment",
  // Add more types as needed
}

import { AfterInsert, AfterRemove, AfterUpdate, BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, RelationId, UpdateDateColumn } from "typeorm"
import { DomainEvents } from "../../../core/domain/events/DomainEvents"
@Entity("property_investment_notifications")
export class PropertyInvestmentNotificationEntity extends BaseEntity {
  @PrimaryColumn()
  id: string

  @Column()
  title!: string

  @Column("text", { nullable: true })
  message!: string

  @Column({
    type: "enum",
    enum: PropertyInvestmentNotificationType,
  })
  type!: string

  @Column()
  user_id!: string

  @Column()
  property_id!: string

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
    console.log("About to send domain event in property notification")
  }
}
