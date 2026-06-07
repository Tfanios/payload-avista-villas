import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="home">
      <div className="content">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="logo" src="/avista-logo.svg" alt="Avista Villas" />
        <p className="eyebrow">Content Management</p>
        {!user ? <h1>Avista Villas</h1> : <h1>Welcome back</h1>}
        <p className="tagline">
          {user
            ? user.email
            : 'Manage properties, reviews and enquiries for Avista Villas.'}
        </p>
        <div className="links">
          <a className="admin" href={payloadConfig.routes.admin}>
            {user ? 'Open admin panel' : 'Sign in'}
          </a>
        </div>
      </div>
      <div className="footer">
        <p>© {new Date().getFullYear()} Avista Villas</p>
      </div>
    </div>
  )
}
