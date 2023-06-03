import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Resource } from '../../resources/models/resource.model';
import { BarOwnersProgressionEntity } from '../../bar-owners-progression/entities/bar-owners-progression.entity';

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

  /*@OneToMany(() => BarEntity, (bar) => bar.parent)           this was the former version
  milestones: BarEntity[];

  @ManyToOne(() => BarEntity, (bar) => bar.milestones)*/

  @OneToMany(() => BarEntity, (bar) => bar.parent, {
    onDelete: 'CASCADE', // Cascade delete for milestones
  })
  milestones: BarEntity[];

  @ManyToOne(() => BarEntity, (bar) => bar.milestones, {
    onDelete: 'CASCADE', // Cascade delete for parent
  })
  @JoinColumn({ name: 'parent_id' })
  parent: BarEntity;

  @OneToMany(
    () => BarOwnersProgressionEntity,
    (barOwnersProgressionEntity) => barOwnersProgressionEntity.currentBar,
    { nullable: true },
  )
  barOwnersProgressionEntity?: BarOwnersProgressionEntity[];

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
