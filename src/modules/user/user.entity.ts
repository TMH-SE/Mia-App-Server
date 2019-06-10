import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';

@Entity()
export class User {

  @ObjectIdColumn()
  _id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

}
