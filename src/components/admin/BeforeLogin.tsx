import React from 'react'

/**
 * Welcome panel rendered above the login form (admin.components.beforeLogin).
 */
export const BeforeLogin: React.FC = () => (
  <div className="avista-login-intro">
    <p className="avista-login-intro__eyebrow">Content Management</p>
    <h1 className="avista-login-intro__title">Welcome back</h1>
    <p className="avista-login-intro__copy">
      Sign in to manage properties, reviews and enquiries for Avista Villas.
    </p>
  </div>
)

export default BeforeLogin
