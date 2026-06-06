import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`properties_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`properties\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`properties_stats_order_idx\` ON \`properties_stats\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`properties_stats_parent_id_idx\` ON \`properties_stats\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`properties_amenities\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon_key\` text,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`properties\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`properties_amenities_order_idx\` ON \`properties_amenities\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`properties_amenities_parent_id_idx\` ON \`properties_amenities\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`properties_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`alt\` text NOT NULL,
  	\`layout\` text DEFAULT 'l',
  	\`height\` text DEFAULT 'h2',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`properties\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`properties_gallery_order_idx\` ON \`properties_gallery\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`properties_gallery_parent_id_idx\` ON \`properties_gallery\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`properties_gallery_image_idx\` ON \`properties_gallery\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`properties\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`order\` numeric DEFAULT 1,
  	\`tag\` text,
  	\`numeral\` text,
  	\`hero_image_desktop_id\` integer NOT NULL,
  	\`hero_image_mobile_id\` integer,
  	\`hero_video_desktop\` text,
  	\`hero_video_mobile\` text,
  	\`hero_play_on_mobile\` integer DEFAULT false,
  	\`hero_priority\` integer DEFAULT true,
  	\`hero_kicker\` text,
  	\`hero_title\` text,
  	\`hero_sub\` text,
  	\`summary\` text,
  	\`overview\` text,
  	\`map_latitude\` numeric NOT NULL,
  	\`map_longitude\` numeric NOT NULL,
  	\`map_zoom\` numeric DEFAULT 14,
  	\`map_label\` text,
  	\`map_directions_query\` text,
  	\`map_static_preview_id\` integer,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_og_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`hero_image_desktop_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_image_mobile_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`map_static_preview_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`properties_slug_idx\` ON \`properties\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`properties_order_idx\` ON \`properties\` (\`order\`);`)
  await db.run(
    sql`CREATE INDEX \`properties_hero_hero_image_desktop_idx\` ON \`properties\` (\`hero_image_desktop_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`properties_hero_hero_image_mobile_idx\` ON \`properties\` (\`hero_image_mobile_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`properties_map_map_static_preview_idx\` ON \`properties\` (\`map_static_preview_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`properties_seo_seo_og_image_idx\` ON \`properties\` (\`seo_og_image_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`properties_updated_at_idx\` ON \`properties\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`properties_created_at_idx\` ON \`properties\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`reviews\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`property_id\` integer NOT NULL,
  	\`author_name\` text NOT NULL,
  	\`author_location\` text,
  	\`source\` text DEFAULT 'booking',
  	\`score\` numeric DEFAULT 10,
  	\`quote\` text NOT NULL,
  	\`date\` text,
  	\`featured\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`property_id\`) REFERENCES \`properties\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`reviews_property_idx\` ON \`reviews\` (\`property_id\`);`)
  await db.run(sql`CREATE INDEX \`reviews_featured_idx\` ON \`reviews\` (\`featured\`);`)
  await db.run(sql`CREATE INDEX \`reviews_updated_at_idx\` ON \`reviews\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`reviews_created_at_idx\` ON \`reviews\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`enquiries\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`phone\` text,
  	\`preferred_property\` text DEFAULT 'either',
  	\`arrival\` text,
  	\`departure\` text,
  	\`guests\` numeric,
  	\`message\` text NOT NULL,
  	\`status\` text DEFAULT 'new',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`enquiries_status_idx\` ON \`enquiries\` (\`status\`);`)
  await db.run(sql`CREATE INDEX \`enquiries_updated_at_idx\` ON \`enquiries\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`enquiries_created_at_idx\` ON \`enquiries\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`brand_name\` text DEFAULT 'Avista',
  	\`tagline\` text DEFAULT 'Two private villas by the Aegean',
  	\`contact_email\` text DEFAULT 'stay@avista.gr',
  	\`phone\` text,
  	\`address\` text DEFAULT 'Vourvourou 630 78, Halkidiki, Greece',
  	\`copyright\` text DEFAULT '© 2026 Avista Villas',
  	\`location_slogan\` text DEFAULT 'Vourvourou · Sithonia · Halkidiki',
  	\`weather_latitude\` numeric DEFAULT 40.1969,
  	\`weather_longitude\` numeric DEFAULT 23.7761,
  	\`default_seo_title_template\` text DEFAULT 'Avista | %s',
  	\`default_seo_description\` text,
  	\`default_seo_og_image_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`default_seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(
    sql`CREATE INDEX \`site_settings_default_seo_default_seo_og_image_idx\` ON \`site_settings\` (\`default_seo_og_image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`navigation_left_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`navigation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`navigation_left_links_order_idx\` ON \`navigation_left_links\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`navigation_left_links_parent_id_idx\` ON \`navigation_left_links\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`navigation_right_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`navigation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`navigation_right_links_order_idx\` ON \`navigation_right_links\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`navigation_right_links_parent_id_idx\` ON \`navigation_right_links\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`navigation\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`footer_columns_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`footer_columns_links_order_idx\` ON \`footer_columns_links\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`footer_columns_links_parent_id_idx\` ON \`footer_columns_links\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`footer_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_columns_order_idx\` ON \`footer_columns\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`footer_columns_parent_id_idx\` ON \`footer_columns\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`footer\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`brand_blurb\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`home_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`alt\` text NOT NULL,
  	\`layout\` text DEFAULT 'l',
  	\`height\` text DEFAULT 'h2',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_gallery_order_idx\` ON \`home_gallery\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`home_gallery_parent_id_idx\` ON \`home_gallery\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`home_gallery_image_idx\` ON \`home_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_services\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon_key\` text,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_services_order_idx\` ON \`home_services\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`home_services_parent_id_idx\` ON \`home_services\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`home_location_facts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`home_location_facts_order_idx\` ON \`home_location_facts\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`home_location_facts_parent_id_idx\` ON \`home_location_facts\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`home\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_image_desktop_id\` integer NOT NULL,
  	\`hero_image_mobile_id\` integer,
  	\`hero_video_desktop\` text,
  	\`hero_video_mobile\` text,
  	\`hero_play_on_mobile\` integer DEFAULT false,
  	\`hero_priority\` integer DEFAULT true,
  	\`hero_kicker\` text,
  	\`hero_title\` text,
  	\`hero_sub\` text,
  	\`intro_lead\` text,
  	\`intro_statement\` text,
  	\`location_summary\` text,
  	\`cta_title\` text,
  	\`cta_body\` text,
  	\`cta_button_label\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_og_image_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_desktop_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_image_mobile_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(
    sql`CREATE INDEX \`home_hero_hero_image_desktop_idx\` ON \`home\` (\`hero_image_desktop_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`home_hero_hero_image_mobile_idx\` ON \`home\` (\`hero_image_mobile_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`home_seo_seo_og_image_idx\` ON \`home\` (\`seo_og_image_id\`);`)
  await db.run(sql`CREATE TABLE \`location_page_location_facts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`location_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`location_page_location_facts_order_idx\` ON \`location_page_location_facts\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`location_page_location_facts_parent_id_idx\` ON \`location_page_location_facts\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`location_page_cross_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`location_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`location_page_cross_links_order_idx\` ON \`location_page_cross_links\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`location_page_cross_links_parent_id_idx\` ON \`location_page_cross_links\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`location_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_image_desktop_id\` integer NOT NULL,
  	\`hero_image_mobile_id\` integer,
  	\`hero_video_desktop\` text,
  	\`hero_video_mobile\` text,
  	\`hero_play_on_mobile\` integer DEFAULT false,
  	\`hero_priority\` integer DEFAULT true,
  	\`hero_kicker\` text,
  	\`hero_title\` text,
  	\`hero_sub\` text,
  	\`overview\` text,
  	\`map_latitude\` numeric NOT NULL,
  	\`map_longitude\` numeric NOT NULL,
  	\`map_zoom\` numeric DEFAULT 14,
  	\`map_label\` text,
  	\`map_directions_query\` text,
  	\`map_static_preview_id\` integer,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_og_image_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_desktop_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_image_mobile_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`map_static_preview_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(
    sql`CREATE INDEX \`location_page_hero_hero_image_desktop_idx\` ON \`location_page\` (\`hero_image_desktop_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`location_page_hero_hero_image_mobile_idx\` ON \`location_page\` (\`hero_image_mobile_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`location_page_map_map_static_preview_idx\` ON \`location_page\` (\`map_static_preview_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`location_page_seo_seo_og_image_idx\` ON \`location_page\` (\`seo_og_image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`contact_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_image_desktop_id\` integer NOT NULL,
  	\`hero_image_mobile_id\` integer,
  	\`hero_video_desktop\` text,
  	\`hero_video_mobile\` text,
  	\`hero_play_on_mobile\` integer DEFAULT false,
  	\`hero_priority\` integer DEFAULT true,
  	\`hero_kicker\` text,
  	\`hero_title\` text,
  	\`hero_sub\` text,
  	\`invitation\` text,
  	\`map_latitude\` numeric NOT NULL,
  	\`map_longitude\` numeric NOT NULL,
  	\`map_zoom\` numeric DEFAULT 14,
  	\`map_label\` text,
  	\`map_directions_query\` text,
  	\`map_static_preview_id\` integer,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_og_image_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_desktop_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_image_mobile_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`map_static_preview_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(
    sql`CREATE INDEX \`contact_page_hero_hero_image_desktop_idx\` ON \`contact_page\` (\`hero_image_desktop_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`contact_page_hero_hero_image_mobile_idx\` ON \`contact_page\` (\`hero_image_mobile_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`contact_page_map_map_static_preview_idx\` ON \`contact_page\` (\`map_static_preview_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`contact_page_seo_seo_og_image_idx\` ON \`contact_page\` (\`seo_og_image_id\`);`,
  )
  await db.run(sql`ALTER TABLE \`media\` ADD \`caption\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`blur_data_u_r_l\` text;`)
  await db.run(
    sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`properties_id\` integer REFERENCES properties(id);`,
  )
  await db.run(
    sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`reviews_id\` integer REFERENCES reviews(id);`,
  )
  await db.run(
    sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`enquiries_id\` integer REFERENCES enquiries(id);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_properties_id_idx\` ON \`payload_locked_documents_rels\` (\`properties_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_reviews_id_idx\` ON \`payload_locked_documents_rels\` (\`reviews_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_enquiries_id_idx\` ON \`payload_locked_documents_rels\` (\`enquiries_id\`);`,
  )
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`properties_stats\`;`)
  await db.run(sql`DROP TABLE \`properties_amenities\`;`)
  await db.run(sql`DROP TABLE \`properties_gallery\`;`)
  await db.run(sql`DROP TABLE \`properties\`;`)
  await db.run(sql`DROP TABLE \`reviews\`;`)
  await db.run(sql`DROP TABLE \`enquiries\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`navigation_left_links\`;`)
  await db.run(sql`DROP TABLE \`navigation_right_links\`;`)
  await db.run(sql`DROP TABLE \`navigation\`;`)
  await db.run(sql`DROP TABLE \`footer_columns_links\`;`)
  await db.run(sql`DROP TABLE \`footer_columns\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
  await db.run(sql`DROP TABLE \`home_gallery\`;`)
  await db.run(sql`DROP TABLE \`home_services\`;`)
  await db.run(sql`DROP TABLE \`home_location_facts\`;`)
  await db.run(sql`DROP TABLE \`home\`;`)
  await db.run(sql`DROP TABLE \`location_page_location_facts\`;`)
  await db.run(sql`DROP TABLE \`location_page_cross_links\`;`)
  await db.run(sql`DROP TABLE \`location_page\`;`)
  await db.run(sql`DROP TABLE \`contact_page\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id" FROM \`payload_locked_documents_rels\`;`,
  )
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`,
  )
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`,
  )
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`caption\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`blur_data_u_r_l\`;`)
}
