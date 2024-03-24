import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, AfterInsert, AfterRemove, AfterUpdate, ManyToOne, JoinColumn, RelationId, BaseEntity } from "typeorm"
import { DomainEvents } from "../../../core/domain/events/DomainEvents"

@Entity("activities", { synchronize: false })
export class ActivityEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ nullable: true })
  event_name: string

  @Column({ nullable: true, type: "varchar" })
  member!: string

  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt?: Date

  // Relations
  // User
  @Column()
  user_id!: string

  // Subscribers
  @AfterInsert()
  @AfterUpdate()
  @AfterRemove()
  dispatchEvents() {
    DomainEvents.dispatchEventsHook(this.id)
    console.log("About to dispatch domain events in activity")
  }
}
