import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Resource } from '../../resources/models/resource.model';

@Entity({ name: 'bars' })
export class BarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  barIndex: number;

  @Column()
  maxValue: number;

  @OneToMany(() => BarEntity, (bar) => bar.parent)
  milestones: BarEntity[];

  @ManyToOne(() => BarEntity, (bar) => bar.milestones)
  @JoinColumn({ name: 'parent_id' })
  parent: BarEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  rewards: Resource[];

  @BeforeInsert()
  beforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date();
  }

  constructor(partial: Partial<BarEntity>) {
    Object.assign(this, partial);
  }
}
