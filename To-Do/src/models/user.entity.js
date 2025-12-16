const { EntitySchema } = require("typeorm");

const UserEntity = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
      nullable: false,
    },
    email: {
      type: "varchar",
      unique: true,
      nullable: false,
    },
    password: {
      type: "varchar",
      nullable: false,
    },
  },
  relations: {
    todos: {
      type: "one-to-many",
      target: "Todo",
      inverseSide: "user",
      cascade: true,
    },
  },
});

module.exports = UserEntity;
