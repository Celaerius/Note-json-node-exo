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
        tickets: {
            type: 'many-to-many',
            target: 'Ticket',
            joinTable: true,
            inverseSide: 'tags',
        },
    },
});

module.exports = TagEntity;