export async function up(knex) {
    return knex.schema.createTable('posts', function(table) {
      table.increments('id').primary();
      table.string('key');
      table.string('title');
      table.text('description');
      table.string('price');
      table.string('answers');
      table.string('views');
      table.string('added_at');
      table.string('url');
      table.timestamp('created_at');
      
      table.index('id');
      table.index('key');
      table.index('title');
      table.index('description');
      table.index('price');
      table.index('answers');
      table.index('views');
      table.index('added_at');
      table.index('url');
      table.index('created_at');

      table.unique(['key']);
    });
  };
  
export async function down(knex) {
  return knex.schema.dropTable('posts');
};
  