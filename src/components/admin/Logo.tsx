import React from 'react'

/**
 * Brand lockup shown on the admin login screen
 * (admin.components.graphics.Logo). Uses the shared SVG so the login page
 * and the other pre-login pages stay in sync.
 */
export const Logo: React.FC = () => (
  // eslint-disable-next-line @next/next/no-img-element
  <img className="avista-logo" src="/avista-logo.svg" alt="Avista Villas" />
)

export default Logo
