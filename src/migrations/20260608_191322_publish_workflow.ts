import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`_properties_v_version_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_properties_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_properties_v_version_stats_order_idx\` ON \`_properties_v_version_stats\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_properties_v_version_stats_parent_id_idx\` ON \`_properties_v_version_stats\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_properties_v_version_amenities\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon_key\` text,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_properties_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_properties_v_version_amenities_order_idx\` ON \`_properties_v_version_amenities\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_properties_v_version_amenities_parent_id_idx\` ON \`_properties_v_version_amenities\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_properties_v_version_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`alt\` text,
  	\`layout\` text DEFAULT 'l',
  	\`height\` text DEFAULT 'h2',
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_properties_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_properties_v_version_gallery_order_idx\` ON \`_properties_v_version_gallery\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_properties_v_version_gallery_parent_id_idx\` ON \`_properties_v_version_gallery\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_properties_v_version_gallery_image_idx\` ON \`_properties_v_version_gallery\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_properties_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text,
  	\`version_slug\` text,
  	\`version_order\` numeric DEFAULT 1,
  	\`version_tag\` text,
  	\`version_numeral\` text,
  	\`version_hero_image_desktop_id\` integer,
  	\`version_hero_image_mobile_id\` integer,
  	\`version_hero_video_desktop\` text,
  	\`version_hero_video_mobile\` text,
  	\`version_hero_play_on_mobile\` integer DEFAULT false,
  	\`version_hero_priority\` integer DEFAULT true,
  	\`version_hero_kicker\` text,
  	\`version_hero_title\` text,
  	\`version_hero_sub\` text,
  	\`version_summary\` text,
  	\`version_overview\` text,
  	\`version_map_latitude\` numeric,
  	\`version_map_longitude\` numeric,
  	\`version_map_zoom\` numeric DEFAULT 14,
  	\`version_map_label\` text,
  	\`version_map_directions_query\` text,
  	\`version_map_static_preview_id\` integer,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_seo_og_image_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`properties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_image_desktop_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_image_mobile_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_map_static_preview_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_properties_v_parent_idx\` ON \`_properties_v\` (\`parent_id\`);`)
  await db.run(
    sql`CREATE INDEX \`_properties_v_version_version_slug_idx\` ON \`_properties_v\` (\`version_slug\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_properties_v_version_version_order_idx\` ON \`_properties_v\` (\`version_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_properties_v_version_hero_version_hero_image_desktop_idx\` ON \`_properties_v\` (\`version_hero_image_desktop_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_properties_v_version_hero_version_hero_image_mobile_idx\` ON \`_properties_v\` (\`version_hero_image_mobile_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_properties_v_version_map_version_map_static_preview_idx\` ON \`_properties_v\` (\`version_map_static_preview_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_properties_v_version_seo_version_seo_og_image_idx\` ON \`_properties_v\` (\`version_seo_og_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_properties_v_version_version_updated_at_idx\` ON \`_properties_v\` (\`version_updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_properties_v_version_version_created_at_idx\` ON \`_properties_v\` (\`version_created_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_properties_v_version_version__status_idx\` ON \`_properties_v\` (\`version__status\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_properties_v_created_at_idx\` ON \`_properties_v\` (\`created_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_properties_v_updated_at_idx\` ON \`_properties_v\` (\`updated_at\`);`,
  )
  await db.run(sql`CREATE INDEX \`_properties_v_latest_idx\` ON \`_properties_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_reviews_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_property_id\` integer,
  	\`version_author_name\` text,
  	\`version_author_location\` text,
  	\`version_source\` text DEFAULT 'booking',
  	\`version_score\` numeric DEFAULT 10,
  	\`version_quote\` text,
  	\`version_date\` text,
  	\`version_featured\` integer DEFAULT true,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`reviews\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_property_id\`) REFERENCES \`properties\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_reviews_v_parent_idx\` ON \`_reviews_v\` (\`parent_id\`);`)
  await db.run(
    sql`CREATE INDEX \`_reviews_v_version_version_property_idx\` ON \`_reviews_v\` (\`version_property_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_reviews_v_version_version_featured_idx\` ON \`_reviews_v\` (\`version_featured\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_reviews_v_version_version_updated_at_idx\` ON \`_reviews_v\` (\`version_updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_reviews_v_version_version_created_at_idx\` ON \`_reviews_v\` (\`version_created_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_reviews_v_version_version__status_idx\` ON \`_reviews_v\` (\`version__status\`);`,
  )
  await db.run(sql`CREATE INDEX \`_reviews_v_created_at_idx\` ON \`_reviews_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_reviews_v_updated_at_idx\` ON \`_reviews_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_reviews_v_latest_idx\` ON \`_reviews_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_brand_name\` text DEFAULT 'Avista',
  	\`version_tagline\` text DEFAULT 'Two private villas by the Aegean',
  	\`version_contact_email\` text DEFAULT 'stay@avista.gr',
  	\`version_phone\` text,
  	\`version_address\` text DEFAULT 'Vourvourou 630 78, Halkidiki, Greece',
  	\`version_copyright\` text DEFAULT '© 2026 Avista Villas',
  	\`version_location_slogan\` text DEFAULT 'Vourvourou · Sithonia · Halkidiki',
  	\`version_weather_latitude\` numeric DEFAULT 40.1969,
  	\`version_weather_longitude\` numeric DEFAULT 23.7761,
  	\`version_default_seo_title_template\` text DEFAULT 'Avista | %s',
  	\`version_default_seo_description\` text,
  	\`version_default_seo_og_image_id\` integer,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`version_default_seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_site_settings_v_version_default_seo_version_default_seo_idx\` ON \`_site_settings_v\` (\`version_default_seo_og_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_site_settings_v_version_version__status_idx\` ON \`_site_settings_v\` (\`version__status\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_site_settings_v_created_at_idx\` ON \`_site_settings_v\` (\`created_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_site_settings_v_updated_at_idx\` ON \`_site_settings_v\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_site_settings_v_latest_idx\` ON \`_site_settings_v\` (\`latest\`);`,
  )
  await db.run(sql`CREATE TABLE \`_navigation_v_version_left_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_navigation_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_navigation_v_version_left_links_order_idx\` ON \`_navigation_v_version_left_links\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_navigation_v_version_left_links_parent_id_idx\` ON \`_navigation_v_version_left_links\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_navigation_v_version_right_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_navigation_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_navigation_v_version_right_links_order_idx\` ON \`_navigation_v_version_right_links\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_navigation_v_version_right_links_parent_id_idx\` ON \`_navigation_v_version_right_links\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_navigation_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_navigation_v_version_version__status_idx\` ON \`_navigation_v\` (\`version__status\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_navigation_v_created_at_idx\` ON \`_navigation_v\` (\`created_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_navigation_v_updated_at_idx\` ON \`_navigation_v\` (\`updated_at\`);`,
  )
  await db.run(sql`CREATE INDEX \`_navigation_v_latest_idx\` ON \`_navigation_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v_version_columns_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_footer_v_version_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_footer_v_version_columns_links_order_idx\` ON \`_footer_v_version_columns_links\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_footer_v_version_columns_links_parent_id_idx\` ON \`_footer_v_version_columns_links\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_footer_v_version_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_footer_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_footer_v_version_columns_order_idx\` ON \`_footer_v_version_columns\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_footer_v_version_columns_parent_id_idx\` ON \`_footer_v_version_columns\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_footer_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_brand_blurb\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_footer_v_version_version__status_idx\` ON \`_footer_v\` (\`version__status\`);`,
  )
  await db.run(sql`CREATE INDEX \`_footer_v_created_at_idx\` ON \`_footer_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_updated_at_idx\` ON \`_footer_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_latest_idx\` ON \`_footer_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_home_v_version_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`alt\` text,
  	\`layout\` text DEFAULT 'l',
  	\`height\` text DEFAULT 'h2',
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_home_v_version_gallery_order_idx\` ON \`_home_v_version_gallery\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_home_v_version_gallery_parent_id_idx\` ON \`_home_v_version_gallery\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_home_v_version_gallery_image_idx\` ON \`_home_v_version_gallery\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_home_v_version_services\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon_key\` text,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_home_v_version_services_order_idx\` ON \`_home_v_version_services\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_home_v_version_services_parent_id_idx\` ON \`_home_v_version_services\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_home_v_version_location_facts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_home_v_version_location_facts_order_idx\` ON \`_home_v_version_location_facts\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_home_v_version_location_facts_parent_id_idx\` ON \`_home_v_version_location_facts\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_home_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_image_desktop_id\` integer,
  	\`version_hero_image_mobile_id\` integer,
  	\`version_hero_video_desktop\` text,
  	\`version_hero_video_mobile\` text,
  	\`version_hero_play_on_mobile\` integer DEFAULT false,
  	\`version_hero_priority\` integer DEFAULT true,
  	\`version_hero_kicker\` text,
  	\`version_hero_title\` text,
  	\`version_hero_sub\` text,
  	\`version_intro_lead\` text,
  	\`version_intro_statement\` text,
  	\`version_location_summary\` text,
  	\`version_cta_title\` text,
  	\`version_cta_body\` text,
  	\`version_cta_button_label\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_seo_og_image_id\` integer,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`version_hero_image_desktop_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_image_mobile_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_home_v_version_hero_version_hero_image_desktop_idx\` ON \`_home_v\` (\`version_hero_image_desktop_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_home_v_version_hero_version_hero_image_mobile_idx\` ON \`_home_v\` (\`version_hero_image_mobile_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_home_v_version_seo_version_seo_og_image_idx\` ON \`_home_v\` (\`version_seo_og_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_home_v_version_version__status_idx\` ON \`_home_v\` (\`version__status\`);`,
  )
  await db.run(sql`CREATE INDEX \`_home_v_created_at_idx\` ON \`_home_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_updated_at_idx\` ON \`_home_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_latest_idx\` ON \`_home_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_location_page_v_version_location_facts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_location_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_location_page_v_version_location_facts_order_idx\` ON \`_location_page_v_version_location_facts\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_location_page_v_version_location_facts_parent_id_idx\` ON \`_location_page_v_version_location_facts\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_location_page_v_version_cross_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_location_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_location_page_v_version_cross_links_order_idx\` ON \`_location_page_v_version_cross_links\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_location_page_v_version_cross_links_parent_id_idx\` ON \`_location_page_v_version_cross_links\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_location_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_image_desktop_id\` integer,
  	\`version_hero_image_mobile_id\` integer,
  	\`version_hero_video_desktop\` text,
  	\`version_hero_video_mobile\` text,
  	\`version_hero_play_on_mobile\` integer DEFAULT false,
  	\`version_hero_priority\` integer DEFAULT true,
  	\`version_hero_kicker\` text,
  	\`version_hero_title\` text,
  	\`version_hero_sub\` text,
  	\`version_overview\` text,
  	\`version_map_latitude\` numeric,
  	\`version_map_longitude\` numeric,
  	\`version_map_zoom\` numeric DEFAULT 14,
  	\`version_map_label\` text,
  	\`version_map_directions_query\` text,
  	\`version_map_static_preview_id\` integer,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_seo_og_image_id\` integer,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`version_hero_image_desktop_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_image_mobile_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_map_static_preview_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_location_page_v_version_hero_version_hero_image_desktop_idx\` ON \`_location_page_v\` (\`version_hero_image_desktop_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_location_page_v_version_hero_version_hero_image_mobile_idx\` ON \`_location_page_v\` (\`version_hero_image_mobile_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_location_page_v_version_map_version_map_static_preview_idx\` ON \`_location_page_v\` (\`version_map_static_preview_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_location_page_v_version_seo_version_seo_og_image_idx\` ON \`_location_page_v\` (\`version_seo_og_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_location_page_v_version_version__status_idx\` ON \`_location_page_v\` (\`version__status\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_location_page_v_created_at_idx\` ON \`_location_page_v\` (\`created_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_location_page_v_updated_at_idx\` ON \`_location_page_v\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_location_page_v_latest_idx\` ON \`_location_page_v\` (\`latest\`);`,
  )
  await db.run(sql`CREATE TABLE \`_contact_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_image_desktop_id\` integer,
  	\`version_hero_image_mobile_id\` integer,
  	\`version_hero_video_desktop\` text,
  	\`version_hero_video_mobile\` text,
  	\`version_hero_play_on_mobile\` integer DEFAULT false,
  	\`version_hero_priority\` integer DEFAULT true,
  	\`version_hero_kicker\` text,
  	\`version_hero_title\` text,
  	\`version_hero_sub\` text,
  	\`version_invitation\` text,
  	\`version_map_latitude\` numeric,
  	\`version_map_longitude\` numeric,
  	\`version_map_zoom\` numeric DEFAULT 14,
  	\`version_map_label\` text,
  	\`version_map_directions_query\` text,
  	\`version_map_static_preview_id\` integer,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_seo_og_image_id\` integer,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`version_hero_image_desktop_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_image_mobile_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_map_static_preview_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_contact_page_v_version_hero_version_hero_image_desktop_idx\` ON \`_contact_page_v\` (\`version_hero_image_desktop_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_contact_page_v_version_hero_version_hero_image_mobile_idx\` ON \`_contact_page_v\` (\`version_hero_image_mobile_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_contact_page_v_version_map_version_map_static_preview_idx\` ON \`_contact_page_v\` (\`version_map_static_preview_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_contact_page_v_version_seo_version_seo_og_image_idx\` ON \`_contact_page_v\` (\`version_seo_og_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_contact_page_v_version_version__status_idx\` ON \`_contact_page_v\` (\`version__status\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_contact_page_v_created_at_idx\` ON \`_contact_page_v\` (\`created_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_contact_page_v_updated_at_idx\` ON \`_contact_page_v\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_contact_page_v_latest_idx\` ON \`_contact_page_v\` (\`latest\`);`,
  )

  // Validated drafts keep required main-table fields intact. Adding status in place avoids
  // unsafe D1 table rebuilds that would cascade through existing foreign-keyed content.
  await db.run(sql`ALTER TABLE \`properties\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`UPDATE \`properties\` SET \`_status\` = 'published';`)
  await db.run(sql`CREATE INDEX \`properties__status_idx\` ON \`properties\` (\`_status\`);`)
  await db.run(sql`ALTER TABLE \`reviews\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`UPDATE \`reviews\` SET \`_status\` = 'published';`)
  await db.run(sql`CREATE INDEX \`reviews__status_idx\` ON \`reviews\` (\`_status\`);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`UPDATE \`site_settings\` SET \`_status\` = 'published';`)
  await db.run(sql`CREATE INDEX \`site_settings__status_idx\` ON \`site_settings\` (\`_status\`);`)
  await db.run(sql`ALTER TABLE \`navigation\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`UPDATE \`navigation\` SET \`_status\` = 'published';`)
  await db.run(sql`CREATE INDEX \`navigation__status_idx\` ON \`navigation\` (\`_status\`);`)
  await db.run(sql`ALTER TABLE \`footer\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`UPDATE \`footer\` SET \`_status\` = 'published';`)
  await db.run(sql`CREATE INDEX \`footer__status_idx\` ON \`footer\` (\`_status\`);`)
  await db.run(sql`ALTER TABLE \`home\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`UPDATE \`home\` SET \`_status\` = 'published';`)
  await db.run(sql`CREATE INDEX \`home__status_idx\` ON \`home\` (\`_status\`);`)
  await db.run(sql`ALTER TABLE \`location_page\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`UPDATE \`location_page\` SET \`_status\` = 'published';`)
  await db.run(sql`CREATE INDEX \`location_page__status_idx\` ON \`location_page\` (\`_status\`);`)
  await db.run(sql`ALTER TABLE \`contact_page\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`UPDATE \`contact_page\` SET \`_status\` = 'published';`)
  await db.run(sql`CREATE INDEX \`contact_page__status_idx\` ON \`contact_page\` (\`_status\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`_properties_v_version_stats\`;`)
  await db.run(sql`DROP TABLE \`_properties_v_version_amenities\`;`)
  await db.run(sql`DROP TABLE \`_properties_v_version_gallery\`;`)
  await db.run(sql`DROP TABLE \`_properties_v\`;`)
  await db.run(sql`DROP TABLE \`_reviews_v\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v\`;`)
  await db.run(sql`DROP TABLE \`_navigation_v_version_left_links\`;`)
  await db.run(sql`DROP TABLE \`_navigation_v_version_right_links\`;`)
  await db.run(sql`DROP TABLE \`_navigation_v\`;`)
  await db.run(sql`DROP TABLE \`_footer_v_version_columns_links\`;`)
  await db.run(sql`DROP TABLE \`_footer_v_version_columns\`;`)
  await db.run(sql`DROP TABLE \`_footer_v\`;`)
  await db.run(sql`DROP TABLE \`_home_v_version_gallery\`;`)
  await db.run(sql`DROP TABLE \`_home_v_version_services\`;`)
  await db.run(sql`DROP TABLE \`_home_v_version_location_facts\`;`)
  await db.run(sql`DROP TABLE \`_home_v\`;`)
  await db.run(sql`DROP TABLE \`_location_page_v_version_location_facts\`;`)
  await db.run(sql`DROP TABLE \`_location_page_v_version_cross_links\`;`)
  await db.run(sql`DROP TABLE \`_location_page_v\`;`)
  await db.run(sql`DROP TABLE \`_contact_page_v\`;`)

  await db.run(sql`DROP INDEX \`properties__status_idx\`;`)
  await db.run(sql`ALTER TABLE \`properties\` DROP COLUMN \`_status\`;`)
  await db.run(sql`DROP INDEX \`reviews__status_idx\`;`)
  await db.run(sql`ALTER TABLE \`reviews\` DROP COLUMN \`_status\`;`)
  await db.run(sql`DROP INDEX \`site_settings__status_idx\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`_status\`;`)
  await db.run(sql`DROP INDEX \`navigation__status_idx\`;`)
  await db.run(sql`ALTER TABLE \`navigation\` DROP COLUMN \`_status\`;`)
  await db.run(sql`DROP INDEX \`footer__status_idx\`;`)
  await db.run(sql`ALTER TABLE \`footer\` DROP COLUMN \`_status\`;`)
  await db.run(sql`DROP INDEX \`home__status_idx\`;`)
  await db.run(sql`ALTER TABLE \`home\` DROP COLUMN \`_status\`;`)
  await db.run(sql`DROP INDEX \`location_page__status_idx\`;`)
  await db.run(sql`ALTER TABLE \`location_page\` DROP COLUMN \`_status\`;`)
  await db.run(sql`DROP INDEX \`contact_page__status_idx\`;`)
  await db.run(sql`ALTER TABLE \`contact_page\` DROP COLUMN \`_status\`;`)
}
