import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`
    INSERT INTO \`_properties_v\` (
      \`parent_id\`,
      \`version_name\`,
      \`version_slug\`,
      \`version_order\`,
      \`version_tag\`,
      \`version_numeral\`,
      \`version_hero_image_desktop_id\`,
      \`version_hero_image_mobile_id\`,
      \`version_hero_video_desktop\`,
      \`version_hero_video_mobile\`,
      \`version_hero_play_on_mobile\`,
      \`version_hero_priority\`,
      \`version_hero_kicker\`,
      \`version_hero_title\`,
      \`version_hero_sub\`,
      \`version_summary\`,
      \`version_overview\`,
      \`version_map_latitude\`,
      \`version_map_longitude\`,
      \`version_map_zoom\`,
      \`version_map_label\`,
      \`version_map_directions_query\`,
      \`version_map_static_preview_id\`,
      \`version_seo_title\`,
      \`version_seo_description\`,
      \`version_seo_og_image_id\`,
      \`version_updated_at\`,
      \`version_created_at\`,
      \`version__status\`,
      \`created_at\`,
      \`updated_at\`,
      \`latest\`
    )
    SELECT
      \`properties\`.\`id\`,
      \`properties\`.\`name\`,
      \`properties\`.\`slug\`,
      \`properties\`.\`order\`,
      \`properties\`.\`tag\`,
      \`properties\`.\`numeral\`,
      \`properties\`.\`hero_image_desktop_id\`,
      \`properties\`.\`hero_image_mobile_id\`,
      \`properties\`.\`hero_video_desktop\`,
      \`properties\`.\`hero_video_mobile\`,
      \`properties\`.\`hero_play_on_mobile\`,
      \`properties\`.\`hero_priority\`,
      \`properties\`.\`hero_kicker\`,
      \`properties\`.\`hero_title\`,
      \`properties\`.\`hero_sub\`,
      \`properties\`.\`summary\`,
      \`properties\`.\`overview\`,
      \`properties\`.\`map_latitude\`,
      \`properties\`.\`map_longitude\`,
      \`properties\`.\`map_zoom\`,
      \`properties\`.\`map_label\`,
      \`properties\`.\`map_directions_query\`,
      \`properties\`.\`map_static_preview_id\`,
      \`properties\`.\`seo_title\`,
      \`properties\`.\`seo_description\`,
      \`properties\`.\`seo_og_image_id\`,
      \`properties\`.\`updated_at\`,
      \`properties\`.\`created_at\`,
      COALESCE(\`properties\`.\`_status\`, 'published'),
      \`properties\`.\`updated_at\`,
      \`properties\`.\`updated_at\`,
      1
    FROM \`properties\`
    WHERE NOT EXISTS (
      SELECT 1
      FROM \`_properties_v\`
      WHERE
        \`_properties_v\`.\`parent_id\` = \`properties\`.\`id\`
        AND \`_properties_v\`.\`latest\` = 1
    );
  `)

  await db.run(sql`
    INSERT INTO \`_properties_v_version_stats\` (
      \`_order\`,
      \`_parent_id\`,
      \`value\`,
      \`label\`,
      \`_uuid\`
    )
    SELECT
      \`properties_stats\`.\`_order\`,
      \`_properties_v\`.\`id\`,
      \`properties_stats\`.\`value\`,
      \`properties_stats\`.\`label\`,
      \`properties_stats\`.\`id\`
    FROM \`properties_stats\`
    INNER JOIN \`_properties_v\`
      ON \`_properties_v\`.\`parent_id\` = \`properties_stats\`.\`_parent_id\`
      AND \`_properties_v\`.\`latest\` = 1
    WHERE NOT EXISTS (
      SELECT 1
      FROM \`_properties_v_version_stats\`
      WHERE
        \`_properties_v_version_stats\`.\`_parent_id\` = \`_properties_v\`.\`id\`
        AND \`_properties_v_version_stats\`.\`_uuid\` = \`properties_stats\`.\`id\`
    );
  `)

  await db.run(sql`
    INSERT INTO \`_properties_v_version_amenities\` (
      \`_order\`,
      \`_parent_id\`,
      \`icon_key\`,
      \`title\`,
      \`description\`,
      \`_uuid\`
    )
    SELECT
      \`properties_amenities\`.\`_order\`,
      \`_properties_v\`.\`id\`,
      \`properties_amenities\`.\`icon_key\`,
      \`properties_amenities\`.\`title\`,
      \`properties_amenities\`.\`description\`,
      \`properties_amenities\`.\`id\`
    FROM \`properties_amenities\`
    INNER JOIN \`_properties_v\`
      ON \`_properties_v\`.\`parent_id\` = \`properties_amenities\`.\`_parent_id\`
      AND \`_properties_v\`.\`latest\` = 1
    WHERE NOT EXISTS (
      SELECT 1
      FROM \`_properties_v_version_amenities\`
      WHERE
        \`_properties_v_version_amenities\`.\`_parent_id\` = \`_properties_v\`.\`id\`
        AND \`_properties_v_version_amenities\`.\`_uuid\` = \`properties_amenities\`.\`id\`
    );
  `)

  await db.run(sql`
    INSERT INTO \`_properties_v_version_gallery\` (
      \`_order\`,
      \`_parent_id\`,
      \`image_id\`,
      \`alt\`,
      \`layout\`,
      \`height\`,
      \`_uuid\`
    )
    SELECT
      \`properties_gallery\`.\`_order\`,
      \`_properties_v\`.\`id\`,
      \`properties_gallery\`.\`image_id\`,
      \`properties_gallery\`.\`alt\`,
      \`properties_gallery\`.\`layout\`,
      \`properties_gallery\`.\`height\`,
      \`properties_gallery\`.\`id\`
    FROM \`properties_gallery\`
    INNER JOIN \`_properties_v\`
      ON \`_properties_v\`.\`parent_id\` = \`properties_gallery\`.\`_parent_id\`
      AND \`_properties_v\`.\`latest\` = 1
    WHERE NOT EXISTS (
      SELECT 1
      FROM \`_properties_v_version_gallery\`
      WHERE
        \`_properties_v_version_gallery\`.\`_parent_id\` = \`_properties_v\`.\`id\`
        AND \`_properties_v_version_gallery\`.\`_uuid\` = \`properties_gallery\`.\`id\`
    );
  `)

  await db.run(sql`
    INSERT INTO \`_reviews_v\` (
      \`parent_id\`,
      \`version_property_id\`,
      \`version_author_name\`,
      \`version_author_location\`,
      \`version_source\`,
      \`version_score\`,
      \`version_quote\`,
      \`version_date\`,
      \`version_featured\`,
      \`version_updated_at\`,
      \`version_created_at\`,
      \`version__status\`,
      \`created_at\`,
      \`updated_at\`,
      \`latest\`
    )
    SELECT
      \`reviews\`.\`id\`,
      \`reviews\`.\`property_id\`,
      \`reviews\`.\`author_name\`,
      \`reviews\`.\`author_location\`,
      \`reviews\`.\`source\`,
      \`reviews\`.\`score\`,
      \`reviews\`.\`quote\`,
      \`reviews\`.\`date\`,
      \`reviews\`.\`featured\`,
      \`reviews\`.\`updated_at\`,
      \`reviews\`.\`created_at\`,
      COALESCE(\`reviews\`.\`_status\`, 'published'),
      \`reviews\`.\`updated_at\`,
      \`reviews\`.\`updated_at\`,
      1
    FROM \`reviews\`
    WHERE NOT EXISTS (
      SELECT 1
      FROM \`_reviews_v\`
      WHERE
        \`_reviews_v\`.\`parent_id\` = \`reviews\`.\`id\`
        AND \`_reviews_v\`.\`latest\` = 1
    );
  `)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Keep user-editable version history intact. The up migration is idempotent if reapplied.
}
