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
    email: {
      type: "varchar",
      unique: true,
      nullable: false,
    },
    password: {
      type: "varchar",
      nullable: false,
    },
    role: {
      type: "varchar",
      default: "CLIENT", // Role existant : CLIENT, SUPPORT
    },
  },
  relations: {
    tickets: {
      type: "one-to-many",
      target: "Ticket",
      inverseSide: "user",
      cascade: true,
    },
  },
});

module.exports = UserEntity;
