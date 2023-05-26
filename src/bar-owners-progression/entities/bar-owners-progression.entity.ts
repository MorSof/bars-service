import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BarEntity } from '../../bars/entities/bar.entity';

@Entity({ name: 'bars_owners_progression' })
export class BarOwnersProgressionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ownerType: string;

  @Column()
  ownerId: string;

  @Column()
  value: number;

  @ManyToOne(() => BarEntity, (bar) => bar.barOwnersProgressionEntity)
  currentBar: BarEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  beforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date();
  }

  constructor(partial: Partial<BarOwnersProgressionEntity>) {
    Object.assign(this, partial);
  }
}
