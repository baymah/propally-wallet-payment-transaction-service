// Enum defining different types of notifications
export enum PropertyInvestmentNotificationType {
  NewMessage = "new_message",
  PriceChange = "price_change",
  NewInvestment = "new_investment",
  // Add more types as needed
}

import { AfterInsert, AfterRemove, AfterUpdate, BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, RelationId, UpdateDateColumn } from "typeorm"
@Entity("users", { synchronize: false })
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
  id: string

  @Column()
  email!: string

  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt?: Date
}
