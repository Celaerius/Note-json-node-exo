const { EntitySchema } = require('typeorm');

const TodoEntity = new EntitySchema({
    name: 'Todo',
    tableName: 'todos',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        title: {
            type: 'varchar',
            nullable: false,
        },
        isCompleted: {
            type: 'boolean',
            default: false,
        },
    },
});

module.exports = TodoEntity;
