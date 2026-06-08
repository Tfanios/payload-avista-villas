import * as migration_20250929_111647 from './20250929_111647'
import * as migration_20260606_100715_avista_content_schema from './20260606_100715_avista_content_schema'
import * as migration_20260608_191322_publish_workflow from './20260608_191322_publish_workflow'

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
]
