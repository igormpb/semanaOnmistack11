
exports.up = function(knex) {
  return knex.schema.createTable('ongs',function(table){
      table.string('id').primary().unique();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('whatsapp').notNullable();
      table.string('city').notNullable();
      table.string('uf', 2).notNullable();
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('ongs')
};
