import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

const seededLocalGuide = {
  enabled: true,
  title: 'A few places\nto begin.',
  intro:
    'A short local list for swimming, lunch and an easy drink by the water. Ask us for more recommendations during your stay.',
  note: 'Each name opens in Google Maps.',
  categories: [
    {
      title: 'Beaches',
      description: 'Sheltered bays and clear, shallow water close to Vourvourou.',
      places: [
        {
          name: 'Karidi Beach',
          description: 'Pale sand, pines and calm shallows',
          area: 'Vourvourou',
          href: 'https://www.google.com/maps/search/?api=1&query=Karidi+Beach+Vourvourou',
        },
        {
          name: 'Fava Beach',
          description: 'A quieter string of small coves',
          area: 'Vourvourou',
          href: 'https://www.google.com/maps/search/?api=1&query=Fava+Beach+Vourvourou',
        },
        {
          name: 'Livari Beach',
          description: 'Long shallows facing Diaporos',
          area: 'Vourvourou',
          href: 'https://www.google.com/maps/search/?api=1&query=Livari+Beach+Vourvourou',
        },
      ],
    },
    {
      title: 'Restaurants',
      description: 'Local cooking, fresh fish and tables worth lingering over.',
      places: [
        {
          name: 'Paris Restaurant',
          description: 'Greek cooking and grilled seafood',
          area: 'Vourvourou',
          href: 'https://www.google.com/maps/search/?api=1&query=Paris+Restaurant+Vourvourou',
        },
        {
          name: 'Melia',
          description: 'Dinner beneath the trees',
          area: 'Vourvourou',
          href: 'https://www.google.com/maps/search/?api=1&query=Melia+Restaurant+Vourvourou',
        },
        {
          name: 'Aristos Fish Restaurant',
          description: 'Seafood beside the harbour',
          area: 'Ormos Panagias',
          href: 'https://www.google.com/maps/search/?api=1&query=Aristos+Fish+Restaurant+Ormos+Panagias',
        },
      ],
    },
    {
      title: 'Bars by the water',
      description: 'For a slower afternoon or a drink after the last swim.',
      places: [
        {
          name: 'Talgo Beach Bar',
          description: 'Sunbeds and a long sandy bay',
          area: 'Trani Ammouda',
          href: 'https://www.google.com/maps/search/?api=1&query=Talgo+Beach+Bar+Halkidiki',
        },
        {
          name: 'Manassu Beach Bar',
          description: 'All-day drinks beneath the pines',
          area: 'Akti Oneirou',
          href: 'https://www.google.com/maps/search/?api=1&query=Manassu+Beach+Bar+Sithonia',
        },
        {
          name: 'Ethnik Beach Bar',
          description: 'A relaxed stop on the western coast',
          area: 'Tristinika',
          href: 'https://www.google.com/maps/search/?api=1&query=Ethnik+Beach+Bar+Tristinika',
        },
      ],
    },
  ],
}

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`location_page_local_guide_categories_places\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	\`area\` text,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`location_page_local_guide_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`location_page_local_guide_categories_places_order_idx\` ON \`location_page_local_guide_categories_places\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`location_page_local_guide_categories_places_parent_id_idx\` ON \`location_page_local_guide_categories_places\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`location_page_local_guide_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`location_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`location_page_local_guide_categories_order_idx\` ON \`location_page_local_guide_categories\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`location_page_local_guide_categories_parent_id_idx\` ON \`location_page_local_guide_categories\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_location_page_v_version_local_guide_categories_places\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	\`area\` text,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_location_page_v_version_local_guide_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_location_page_v_version_local_guide_categories_places_order_idx\` ON \`_location_page_v_version_local_guide_categories_places\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_location_page_v_version_local_guide_categories_places_parent_id_idx\` ON \`_location_page_v_version_local_guide_categories_places\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_location_page_v_version_local_guide_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_location_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_location_page_v_version_local_guide_categories_order_idx\` ON \`_location_page_v_version_local_guide_categories\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_location_page_v_version_local_guide_categories_parent_id_idx\` ON \`_location_page_v_version_local_guide_categories\` (\`_parent_id\`);`,
  )
  await db.run(sql`ALTER TABLE \`location_page\` ADD \`local_guide_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`location_page\` ADD \`local_guide_title\` text;`)
  await db.run(sql`ALTER TABLE \`location_page\` ADD \`local_guide_intro\` text;`)
  await db.run(sql`ALTER TABLE \`location_page\` ADD \`local_guide_note\` text;`)
  await db.run(
    sql`ALTER TABLE \`_location_page_v\` ADD \`version_local_guide_enabled\` integer DEFAULT true;`,
  )
  await db.run(sql`ALTER TABLE \`_location_page_v\` ADD \`version_local_guide_title\` text;`)
  await db.run(sql`ALTER TABLE \`_location_page_v\` ADD \`version_local_guide_intro\` text;`)
  await db.run(sql`ALTER TABLE \`_location_page_v\` ADD \`version_local_guide_note\` text;`)

  await db.run(sql`
    UPDATE \`location_page\`
    SET
      \`local_guide_enabled\` = 1,
      \`local_guide_title\` = 'A few places' || char(10) || 'to begin.',
      \`local_guide_intro\` = 'A short local list for swimming, lunch and an easy drink by the water. Ask us for more recommendations during your stay.',
      \`local_guide_note\` = 'Each name opens in Google Maps.';
  `)

  await db.run(sql`
    INSERT INTO \`location_page_local_guide_categories\`
      (\`_order\`, \`_parent_id\`, \`id\`, \`title\`, \`description\`)
    SELECT
      1,
      \`location_page\`.\`id\`,
      '6b0000000000000000000001',
      'Beaches',
      'Sheltered bays and clear, shallow water close to Vourvourou.'
    FROM \`location_page\`
    WHERE NOT EXISTS (
      SELECT 1
      FROM \`location_page_local_guide_categories\`
      WHERE \`id\` = '6b0000000000000000000001'
    );
  `)
  await db.run(sql`
    INSERT INTO \`location_page_local_guide_categories\`
      (\`_order\`, \`_parent_id\`, \`id\`, \`title\`, \`description\`)
    SELECT
      2,
      \`location_page\`.\`id\`,
      '6b0000000000000000000002',
      'Restaurants',
      'Local cooking, fresh fish and tables worth lingering over.'
    FROM \`location_page\`
    WHERE NOT EXISTS (
      SELECT 1
      FROM \`location_page_local_guide_categories\`
      WHERE \`id\` = '6b0000000000000000000002'
    );
  `)
  await db.run(sql`
    INSERT INTO \`location_page_local_guide_categories\`
      (\`_order\`, \`_parent_id\`, \`id\`, \`title\`, \`description\`)
    SELECT
      3,
      \`location_page\`.\`id\`,
      '6b0000000000000000000003',
      'Bars by the water',
      'For a slower afternoon or a drink after the last swim.'
    FROM \`location_page\`
    WHERE NOT EXISTS (
      SELECT 1
      FROM \`location_page_local_guide_categories\`
      WHERE \`id\` = '6b0000000000000000000003'
    );
  `)

  await db.run(sql`
    INSERT OR IGNORE INTO \`location_page_local_guide_categories_places\`
      (\`_order\`, \`_parent_id\`, \`id\`, \`name\`, \`description\`, \`area\`, \`href\`)
    VALUES
      (
        1,
        '6b0000000000000000000001',
        '6b0000000000000000000011',
        'Karidi Beach',
        'Pale sand, pines and calm shallows',
        'Vourvourou',
        'https://www.google.com/maps/search/?api=1&query=Karidi+Beach+Vourvourou'
      ),
      (
        2,
        '6b0000000000000000000001',
        '6b0000000000000000000012',
        'Fava Beach',
        'A quieter string of small coves',
        'Vourvourou',
        'https://www.google.com/maps/search/?api=1&query=Fava+Beach+Vourvourou'
      ),
      (
        3,
        '6b0000000000000000000001',
        '6b0000000000000000000013',
        'Livari Beach',
        'Long shallows facing Diaporos',
        'Vourvourou',
        'https://www.google.com/maps/search/?api=1&query=Livari+Beach+Vourvourou'
      ),
      (
        1,
        '6b0000000000000000000002',
        '6b0000000000000000000021',
        'Paris Restaurant',
        'Greek cooking and grilled seafood',
        'Vourvourou',
        'https://www.google.com/maps/search/?api=1&query=Paris+Restaurant+Vourvourou'
      ),
      (
        2,
        '6b0000000000000000000002',
        '6b0000000000000000000022',
        'Melia',
        'Dinner beneath the trees',
        'Vourvourou',
        'https://www.google.com/maps/search/?api=1&query=Melia+Restaurant+Vourvourou'
      ),
      (
        3,
        '6b0000000000000000000002',
        '6b0000000000000000000023',
        'Aristos Fish Restaurant',
        'Seafood beside the harbour',
        'Ormos Panagias',
        'https://www.google.com/maps/search/?api=1&query=Aristos+Fish+Restaurant+Ormos+Panagias'
      ),
      (
        1,
        '6b0000000000000000000003',
        '6b0000000000000000000031',
        'Talgo Beach Bar',
        'Sunbeds and a long sandy bay',
        'Trani Ammouda',
        'https://www.google.com/maps/search/?api=1&query=Talgo+Beach+Bar+Halkidiki'
      ),
      (
        2,
        '6b0000000000000000000003',
        '6b0000000000000000000032',
        'Manassu Beach Bar',
        'All-day drinks beneath the pines',
        'Akti Oneirou',
        'https://www.google.com/maps/search/?api=1&query=Manassu+Beach+Bar+Sithonia'
      ),
      (
        3,
        '6b0000000000000000000003',
        '6b0000000000000000000033',
        'Ethnik Beach Bar',
        'A relaxed stop on the western coast',
        'Tristinika',
        'https://www.google.com/maps/search/?api=1&query=Ethnik+Beach+Bar+Tristinika'
      );
  `)

  // Seed a draft snapshot as well as the published global so the existing
  // location page is immediately available in draft-aware admin requests.
  await payload.updateGlobal({
    slug: 'locationPage',
    data: {
      localGuide: seededLocalGuide,
    },
    draft: true,
    overrideAccess: true,
    req,
  })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`location_page_local_guide_categories_places\`;`)
  await db.run(sql`DROP TABLE \`location_page_local_guide_categories\`;`)
  await db.run(sql`DROP TABLE \`_location_page_v_version_local_guide_categories_places\`;`)
  await db.run(sql`DROP TABLE \`_location_page_v_version_local_guide_categories\`;`)
  await db.run(sql`ALTER TABLE \`location_page\` DROP COLUMN \`local_guide_enabled\`;`)
  await db.run(sql`ALTER TABLE \`location_page\` DROP COLUMN \`local_guide_title\`;`)
  await db.run(sql`ALTER TABLE \`location_page\` DROP COLUMN \`local_guide_intro\`;`)
  await db.run(sql`ALTER TABLE \`location_page\` DROP COLUMN \`local_guide_note\`;`)
  await db.run(sql`ALTER TABLE \`_location_page_v\` DROP COLUMN \`version_local_guide_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_location_page_v\` DROP COLUMN \`version_local_guide_title\`;`)
  await db.run(sql`ALTER TABLE \`_location_page_v\` DROP COLUMN \`version_local_guide_intro\`;`)
  await db.run(sql`ALTER TABLE \`_location_page_v\` DROP COLUMN \`version_local_guide_note\`;`)
}
