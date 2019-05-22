import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity()
export class User {

  @ObjectIdColumn()
  id: ObjectID

  @Column()
  name: string

  @Column()
  username: string

  @Column()
  password: string

}
