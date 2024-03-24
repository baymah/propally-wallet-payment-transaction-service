import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm"
@Entity("properties", { synchronize: false })
export class PropertyEntity extends BaseEntity {
  @PrimaryColumn()
  id: string

  @Column()
  name!: string

  // @CreateDateColumn({ name: "created_at" })
  // createdAt?: Date

  // @UpdateDateColumn({ name: "updated_at" })
  // updatedAt?: Date
}
