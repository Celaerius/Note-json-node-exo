const { EntitySchema } = require('typeorm');

const TagEntity = new EntitySchema({
    name: 'Tag',
    tableName: 'tags',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        label: {
            type: 'varchar',
            nullable: false,
        },
    },
    relations: {
        todos: {
            type: 'many-to-many',
            target: 'Todo',
            joinTable: true,
            inverseSide: 'tags',
        },
    },
});

module.exports = TagEntity;