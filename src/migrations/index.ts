import * as migration_20250929_111647 from './20250929_111647'
import * as migration_20260606_100715_avista_content_schema from './20260606_100715_avista_content_schema'
import * as migration_20260608_191322_publish_workflow from './20260608_191322_publish_workflow'
import * as migration_20260625_163915_home_villas_section from './20260625_163915_home_villas_section'

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20260606_100715_avista_content_schema.up,
    down: migration_20260606_100715_avista_content_schema.down,
    name: '20260606_100715_avista_content_schema',
  },
  {
    up: migration_20260608_191322_publish_workflow.up,
    down: migration_20260608_191322_publish_workflow.down,
    name: '20260608_191322_publish_workflow',
  },
  {
    up: migration_20260625_163915_home_villas_section.up,
    down: migration_20260625_163915_home_villas_section.down,
    name: '20260625_163915_home_villas_section',
  },
]
