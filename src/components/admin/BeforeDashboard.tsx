import React from 'react'

type QuickLink = {
  label: string
  description: string
  href: string
}

const links: QuickLink[] = [
  {
    label: 'Add a property',
    description: 'Create a new villa listing',
    href: '/admin/collections/properties/create',
  },
  {
    label: 'Properties',
    description: 'Edit existing listings',
    href: '/admin/collections/properties',
  },
  {
    label: 'Reviews',
    description: 'Manage guest reviews',
    href: '/admin/collections/reviews',
  },
  {
    label: 'Enquiries',
    description: 'View incoming enquiries',
    href: '/admin/collections/enquiries',
  },
  {
    label: 'Media',
    description: 'Upload images & assets',
    href: '/admin/collections/media',
  },
  {
    label: 'Home page',
    description: 'Edit homepage content',
    href: '/admin/globals/home',
  },
]

/**
 * Quick-action panel rendered at the top of the dashboard
 * (admin.components.beforeDashboard).
 */
export const BeforeDashboard: React.FC = () => (
  <div className="avista-dashboard-intro">
    <div className="avista-dashboard-intro__header">
      <h2 className="avista-dashboard-intro__title">Avista Villas</h2>
      <p className="avista-dashboard-intro__copy">Quick actions to get you started.</p>
    </div>
    <div className="avista-dashboard-intro__grid">
      {links.map((link) => (
        <a key={link.href} href={link.href} className="avista-card">
          <span className="avista-card__label">{link.label}</span>
          <span className="avista-card__desc">{link.description}</span>
        </a>
      ))}
    </div>
  </div>
)

export default BeforeDashboard
