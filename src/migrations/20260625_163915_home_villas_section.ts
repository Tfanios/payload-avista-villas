import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`home_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`properties_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`properties_id\`) REFERENCES \`properties\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_rels_order_idx\` ON \`home_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`home_rels_parent_idx\` ON \`home_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_rels_path_idx\` ON \`home_rels\` (\`path\`);`)
  await db.run(
    sql`CREATE INDEX \`home_rels_properties_id_idx\` ON \`home_rels\` (\`properties_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_home_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`properties_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_home_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`properties_id\`) REFERENCES \`properties\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_v_rels_order_idx\` ON \`_home_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_rels_parent_idx\` ON \`_home_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_rels_path_idx\` ON \`_home_v_rels\` (\`path\`);`)
  await db.run(
    sql`CREATE INDEX \`_home_v_rels_properties_id_idx\` ON \`_home_v_rels\` (\`properties_id\`);`,
  )
  await db.run(sql`ALTER TABLE \`home\` ADD \`villas_kicker\` text;`)
  await db.run(sql`ALTER TABLE \`home\` ADD \`villas_title\` text;`)
  await db.run(sql`ALTER TABLE \`home\` ADD \`villas_body\` text;`)
  await db.run(sql`ALTER TABLE \`_home_v\` ADD \`version_villas_kicker\` text;`)
  await db.run(sql`ALTER TABLE \`_home_v\` ADD \`version_villas_title\` text;`)
  await db.run(sql`ALTER TABLE \`_home_v\` ADD \`version_villas_body\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`home_rels\`;`)
  await db.run(sql`DROP TABLE \`_home_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`home\` DROP COLUMN \`villas_kicker\`;`)
  await db.run(sql`ALTER TABLE \`home\` DROP COLUMN \`villas_title\`;`)
  await db.run(sql`ALTER TABLE \`home\` DROP COLUMN \`villas_body\`;`)
  await db.run(sql`ALTER TABLE \`_home_v\` DROP COLUMN \`version_villas_kicker\`;`)
  await db.run(sql`ALTER TABLE \`_home_v\` DROP COLUMN \`version_villas_title\`;`)
  await db.run(sql`ALTER TABLE \`_home_v\` DROP COLUMN \`version_villas_body\`;`)
}
