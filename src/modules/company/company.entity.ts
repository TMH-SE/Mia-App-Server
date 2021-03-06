import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';

@Entity()
export class Company {

  @ObjectIdColumn()
  _id: string;

  @Column()
  name: string;

  @Column()
  pic: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  skype: string;

  @Column()
  note: string;

  @Column()
  status: number;

  @Column()
  user: string;
}
