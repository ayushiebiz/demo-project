import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  item: string;

  @Column('int')
  quantity: number;

  @Column({ nullable: true })
  userId: number;
}
