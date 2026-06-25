import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Payload persists list column visibility per user. Stale preferences can hide
  // every active column, leaving populated rows without a title or edit link.
  await db.run(sql`
    DELETE FROM \`payload_preferences_rels\`
    WHERE \`parent_id\` IN (
      SELECT \`id\`
      FROM \`payload_preferences\`
      WHERE \`key\` IN ('collection-properties', 'collection-reviews')
    );
  `)
  await db.run(sql`
    DELETE FROM \`payload_preferences\`
    WHERE \`key\` IN ('collection-properties', 'collection-reviews');
  `)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // User-specific UI preferences cannot be reconstructed after removal.
}
