import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const pageTransition = { type: 'spring', stiffness: 260, damping: 25 }

function Nav({ page, setPage }) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPage('home')} role="button" tabIndex={0}>
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-orange-600 to-pink-500 text-white font-bold">P</div>
              <div>
                <div className="font-extrabold text-lg leading-none">PREFICTION</div>
                <div className="text-xs text-gray-500">AI • Data • Product</div>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {[
              ['Home', 'home'],
              ['Services', 'services'],
              ['Audiences', 'audience'],
              ['Products', 'products'],
              ['About', 'about'],
              ['Contact', 'contact']
            ].map(([label, key]) => (
              <button
                key={key}
                onClick={() => setPage(key)}
                className={`px-2 py-1 ${page === key ? 'text-orange-600 font-semibold' : 'hover:text-orange-600'}`}
              >
                {label}
              </button>
            ))}

            <button onClick={() => setPage('contact')} className="text-white bg-orange-600 px-4 py-2 rounded-md shadow-sm hover:bg-orange-700">Contact</button>
          </nav>

          <div className="md:hidden">
            <div className="flex gap-2">
              <select onChange={(e) => setPage(e.target.value)} value={page} className="border rounded-md px-2 py-1">
                <option value="home">Home</option>
                <option value="services">Services</option>
                <option value="audience">Audiences</option>
                <option value="products">Products</option>
                <option value="about">About</option>
                <option value="contact">Contact</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function AnimatedCard({ img, title, desc, cta }) {
  return (
    <motion.article
      className="bg-white rounded-2xl shadow-lg overflow-hidden card-tilt"
      whileHover={{ scale: 1.03, y: -6 }}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
    >
      {img && <img src={img} alt={title} className="w-full h-44 object-cover" loading="lazy" onError={(e)=>{ e.currentTarget.onerror = null; e.currentTarget.src = imgFallback }} />}
      <div className="p-6">
        <div className="text-xl font-extrabold">{title}</div>
        <p className="mt-2 text-gray-600 text-sm">{desc}</p>
        <div className="mt-4">{cta}</div>
      </div>
    </motion.article>
  )
}

// Simple inline line chart (SVG) for demo purposes
function SimpleLineChart({ data = [12, 18, 9, 14, 20, 24], stroke = '#f97316' }) {
  // responsive SVG using viewBox; width controlled by container
  const vw = 240
  const vh = 60
  const max = Math.max(...data)
  const points = data.map((d, i) => `${(i / (data.length - 1)) * vw},${vh - (d / max) * vh}`).join(' ')
  return (
    <svg width="100%" height="48" viewBox={`0 0 ${vw} ${vh}`} preserveAspectRatio="none" className="rounded-md">
      <defs>
        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.18" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={points} fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <polygon points={`${points} ${vw},${vh} 0,${vh}`} fill="url(#g1)" opacity="0.9" />
    </svg>
  )
}

function SimpleBarChart({ data = [40, 60, 35, 80], color = '#fb923c' }) {
  const vw = 240
  const vh = 60
  const max = Math.max(...data)
  const barW = vw / data.length - 8
  return (
    <svg width="100%" height="48" viewBox={`0 0 ${vw} ${vh}`} preserveAspectRatio="none" className="rounded-md">
      {data.map((d, i) => {
        const bw = barW
        const bh = (d / max) * (vh - 10)
        const x = i * (bw + 8) + 4
        const y = vh - bh
        return <rect key={i} x={x} y={y} width={bw} height={bh} rx="4" fill={color} opacity="0.95" />
      })}
    </svg>
  )
}

// Motion variants for lists and cards
const listVariant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
  }
}

const cardVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } }
}

// Central catalog of services (original, inspired by reference)
const servicesCatalog = [
  {
    id: 'data-enrichment',
    title: 'Data Enrichment & Management',
    logo: '🧩',
    short: 'Augment and organise your customer and account data for reliable outreach and reporting.',
    image: 'https://source.unsplash.com/collection/947345/1200x800',
    long: 'We enhance existing data with firmographics, technographics and intent signals, then apply governance and segmentation so your campaigns run on clean, usable signals.',
    offerings: ['Identity resolution & enrichment', 'Schema & governance', 'Segmentation and enrichment pipelines', 'Privacy & compliance (GDPR/CCPA)'],
    useCases: ['Account enrichment for ABM', 'Lead scoring & routing', 'Profile enrichment for personalization'],
    deliverables: ['Enrichment pipeline (ETL) runbook', 'GH/DB mappings & sample enriched dataset', 'Regular enrichment jobs with monitoring'],
    timeline: '4–8 weeks (pilot then scale)',
    pricing: 'Pilot from $8k, then monthly retainers or per-record pricing',
    kpis: ['Data completeness', 'Bounce rate', 'Match rate', 'Campaign conversion uplift'],
    tech: ['Postgres, Airflow, DBT, Snowflake, HubSpot/Salesforce connectors']
  },
  {
    id: 'demand-generation',
    title: 'Demand Generation',
    logo: '🚀',
    short: 'Integrated programs to build awareness and drive qualified pipeline at scale.',
    image: 'https://source.unsplash.com/collection/1163637/1200x800',
    long: 'Multi-channel campaigns that combine content, ads and outreach to warm target accounts and increase funnel velocity with measurable KPIs.',
    offerings: ['Content syndication & distribution', 'Paid & organic amplification', 'Personalised nurture journeys', 'KPI-driven campaign design'],
    useCases: ['Top-of-funnel awareness', 'Account warming for ABM', 'Nurture sequences for trial-to-paid conversion'],
    deliverables: ['Campaign strategy and channel mix', 'Creative bundles (ads, emails, landing pages)', 'Weekly performance dashboard'],
    timeline: '6–12 weeks for a measurable program',
    pricing: 'Program-based pricing starting at $6k/month',
    kpis: ['MQLs generated', 'CAC per MQL', 'Pipeline influenced', 'Engagement rate'],
    tech: ['Google Ads, LinkedIn, Meta, Marketo, HubSpot, Analytics']
  },
  {
    id: 'lead-generation',
    title: 'Lead Generation & Verification',
    logo: '🎯',
    short: 'Capture, verify and qualify leads so sales focuses on closing not chasing.',
    image: 'https://source.unsplash.com/collection/1072004/1200x800',
    long: 'We design lead magnets, landing flows and verification pipelines that raise contact quality and reduce bounce rates, enabling higher conversion from outreach.',
    offerings: ['Landing page optimisation', 'Lead scoring & qualification', 'Email verification & hygiene', 'Outbound list curation'],
    useCases: ['Gated asset lead capture', 'Webinar attendee conversion', 'Outbound list verification'],
    deliverables: ['Landing page templates & A/B test plan', 'Verified contact lists', 'Lead scoring model and playbook'],
    timeline: '3–6 weeks for initial setup',
    pricing: 'Fixed pilot or per-lead arrangements',
    kpis: ['Leads per channel', 'Lead quality score', 'Qualified lead to opportunity rate'],
    tech: ['Unbounce/Landing tools, Zapier, Email verification APIs, CRM integrations']
  },
  {
    id: 'abm',
    title: 'Account-Based Marketing (ABM)',
    logo: '🏹',
    short: 'Target high-value accounts with personalised campaigns and cross-channel orchestration.',
    image: 'https://source.unsplash.com/collection/1245976/1200x800',
    long: 'ABM programs that align sales and marketing, combining intent data, tailored creative and coordinated outreach to accelerate pipeline with key accounts.',
    offerings: ['Account selection & intent scoring', 'Personalised campaign design', 'Multi-touch orchestration', 'Measurement & attribution'],
    useCases: ['Enterprise target account pursuit', 'Renewal/expansion plays', 'Cross-sell and upsell campaigns'],
    deliverables: ['Account playbooks', 'Personalised creative & content', 'Engagement tracking dashboard'],
    timeline: '8–16 weeks (strategy + pilot)',
    pricing: 'Retainer + performance incentives for mid-large accounts',
    kpis: ['Account engagement score', 'Meetings booked', 'Pipeline influenced', 'Deal velocity'],
    tech: ['Demandbase, 6sense, LinkedIn, Outreach, CRM integrations']
  },
  {
    id: 'appointment-generation',
    title: 'Appointment Generation',
    logo: '📅',
    short: 'Book meetings with qualified contacts using a blend of automation and human touch.',
    image: 'https://source.unsplash.com/collection/827743/1200x800',
    long: 'We qualify leads and coordinate scheduling workflows that minimise friction — calendars, reminders and CRM sync to get reps into meaningful conversations.',
    offerings: ['Qualification frameworks', 'Sequenced outreach', 'Scheduler integration (Calendly/HubSpot)', 'CRM sync & reporting'],
    useCases: ['Meeting set for enterprise demos', 'Qualified SDR handoffs', 'Executive briefings'],
    deliverables: ['Qualification scripts', 'Sequenced outreach templates', 'Scheduler & CRM sync setup'],
    timeline: '2–4 weeks to get running',
    pricing: 'Per-meeting or pilot pricing options',
    kpis: ['Meetings booked', 'Qualified show rate', 'Conversion to opportunities'],
    tech: ['Calendly, HubSpot Meetings, Salesforce/HubSpot CRM']
  },
  {
    id: 'email-marketing',
    title: 'Email Marketing & Automation',
    logo: '✉️',
    short: 'High-performing email programs with segmentation, personalization and analytics.',
    image: 'https://source.unsplash.com/collection/190727/1200x800',
    long: 'From welcome sequences to nurture cadences and account-based journeys, we build emails that convert and systems that scale, with clear KPIs and deliverability best-practices.',
    offerings: ['Lifecycle & nurture flows', 'Personalisation at scale', 'Deliverability & warmup', 'Analytics & optimisation'],
    useCases: ['Onboarding flows', 'Nurture for MQLs', 'ABM email touches'],
    deliverables: ['Email templates & content calendar', 'Segmentation plan', 'Deliverability audit and warmup'],
    timeline: '3–6 weeks',
    pricing: 'Monthly program fees, plus creative costs',
    kpis: ['Open & click rates', 'Reply rate', 'Conversion to demo/opportunity'],
    tech: ['SendGrid, Postmark, HubSpot, Iterable, Customer.io']
  },
  {
    id: 'content-creation',
    title: 'Content Creation & Thought Leadership',
    logo: '✍️',
    short: 'Strategic content that educates buyers and fuels demand programs.',
    image: 'https://source.unsplash.com/collection/1163637/1200x800',
    long: 'We create whitepapers, case studies, videos and snippets tuned to buyer personas — then syndicate and test to find the formats that drive engagement and pipeline.',
    offerings: ['Whitepapers & case studies', 'Long-form SEO content', 'Video & social snippets', 'Gated assets & lead magnets'],
    useCases: ['Lead magnets for demand gen', 'Thought leadership for brand trust', 'Case studies for sales enablement'],
    deliverables: ['Content brief & calendar', 'Produce & edit assets', 'Syndication plan and reporting'],
    timeline: '2–8 weeks depending on asset complexity',
    pricing: 'Per-asset or retainer-based creative packages',
    kpis: ['Content engagement', 'Leads generated from assets', 'Organic traffic uplift'],
    tech: ['CMS, YouTube, LinkedIn, Content platforms']
  }
]

// Simple audience catalog (from Marketled Fussion 'Audiences' page — lightweight cards)
const audienceCatalog = [
  { id: 'aud-it', title: 'IT Audience', logo: '🖥️', short: 'Reach 7M+ IT professionals across roles and seniority.', image: 'https://source.unsplash.com/collection/947345/1200x800' },
  { id: 'aud-sales', title: 'Sales Audience', logo: '🤝', short: 'Target sales leaders and revenue teams for pipeline-driven outreach.', image: 'https://source.unsplash.com/collection/1163637/1200x800' },
  { id: 'aud-marketing', title: 'Marketing Audience', logo: '📣', short: 'Marketing decision-makers and content leads to amplify campaigns.', image: 'https://source.unsplash.com/collection/1072004/1200x800' },
  { id: 'aud-finance', title: 'Finance Audience', logo: '💵', short: 'CFOs and finance teams for budgeting and procurement conversations.', image: 'https://source.unsplash.com/collection/1245976/1200x800' },
  { id: 'aud-health', title: 'Healthcare Audience', logo: '🩺', short: 'Healthcare professionals and decision-makers across clinical & admin roles.', image: 'https://source.unsplash.com/collection/190727/1200x800' },
  { id: 'aud-hr', title: 'HR Audience', logo: '👥', short: 'HR and people teams for employer branding and talent solutions.', image: 'https://source.unsplash.com/collection/827743/1200x800' },
  { id: 'aud-manufacturing', title: 'Manufacturing Audience', logo: '🏭', short: 'Industrial and manufacturing contacts for operations and procurement.', image: 'https://source.unsplash.com/collection/1163637/1200x800' }
]

// Simple inline SVG fallback for images that fail to load
const imgFallback = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
  <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'>
    <rect width='100%' height='100%' fill='%23f3f4f6' />
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23888' font-family='Arial,Helvetica,sans-serif' font-size='28'>Image unavailable</text>
  </svg>
`)

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div variants={cardVariant} className="bg-white p-4 rounded-lg shadow-sm border">
      <button onClick={() => setOpen((s) => !s)} className="w-full flex items-center justify-between text-left">
        <div className="font-medium">{q}</div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="ml-4 text-gray-500">▼</motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }} className="overflow-hidden mt-3 text-sm text-gray-600">
            {a}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
function Footer({ setPage }) {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700 mt-12 text-gray-800 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-600 to-pink-500 text-white flex items-center justify-center font-bold">P</div>
            <div>
              <div className="font-bold">PREFICTION</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">AI • Data • Product</div>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">We build data-first products and production ML systems that scale. Offices in India & remote teams globally.</p>

          <div className="mt-4">
            <div className="text-sm font-semibold mb-2">Subscribe</div>
            <div className="flex gap-2">
              <input className="border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300" placeholder="Your email" />
              <button className="bg-orange-600 text-white px-3 py-2 rounded-md text-sm">Subscribe</button>
            </div>
          </div>
        </div>

        <div>
          <div className="font-semibold mb-3">Services</div>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <li>AI Strategy</li>
            <li>ML Engineering</li>
            <li>Data Engineering</li>
            <li>Product Design</li>
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-3">Products</div>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <li>Prefiction Insight</li>
            <li>Prefiction Predict</li>
            <li>Custom Solutions</li>
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-3">Resources</div>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <li>Blog</li>
            <li>Case Studies</li>
            <li>Docs</li>
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-3">Contact</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">hello@prefiction.com<br/>+91 98765 43210</div>
          <div className="mt-4">
            <div className="font-semibold mb-2">Follow us</div>
              <div className="flex gap-3">
              <a href="#" onClick={(e)=>e.preventDefault()} className="text-gray-500 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-500">Twitter</a>
              <a href="#" onClick={(e)=>e.preventDefault()} className="text-gray-500 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-500">LinkedIn</a>
              <a href="#" onClick={(e)=>e.preventDefault()} className="text-gray-500 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-500">GitHub</a>
            </div>
          </div>
        </div>

        <div className="md:col-span-5 border-t border-gray-100 dark:border-gray-700 pt-6 text-sm text-gray-500 dark:text-gray-400 mt-4 flex items-center justify-between">
          <div>© {new Date().getFullYear()} PREFICTION — All rights reserved</div>
               <div className="flex gap-4">
                <button onClick={() => setPage('about')} className="text-gray-500 hover:text-orange-600">About</button>
                <button onClick={() => setPage('services')} className="text-gray-500 hover:text-orange-600">Services</button>
                <button onClick={() => setPage('products')} className="text-gray-500 hover:text-orange-600">Products</button>
                <button onClick={() => setPage('contact')} className="text-gray-500 hover:text-orange-600">Contact</button>
               </div>
        </div>
      </div>
    </footer>
  )
}

function PrefictionPreview() {
  const [page, setPage] = useState('home')
  const [serviceQuery, setServiceQuery] = useState('')
  const [serviceCategory, setServiceCategory] = useState('all')

  // Ensure the viewport is reset to top when the page view changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [page])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
      <Nav page={page} setPage={setPage} />

      <main>
        <AnimatePresence mode="wait" initial={false}>
          {page === 'home' && (
            <motion.div key="home" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={pageTransition}>
              {/* HERO */}
              <section className="pt-12 md:pt-20 pb-8 lg:pb-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">Build smarter products with <span className="text-orange-600">AI-driven</span> insight</motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mt-6 text-lg text-gray-600 max-w-2xl">PREFICTION helps startups and enterprises design, build and scale data-first products — from strategy to production.</motion.p>

                    <div className="mt-8 flex gap-3 flex-wrap">
                      <button onClick={() => setPage('contact')} className="inline-flex items-center gap-2 bg-orange-600 text-white px-5 py-3 rounded-md font-semibold shadow hover:bg-orange-700">Work with us</button>
                      <button onClick={() => setPage('services')} className="inline-flex items-center gap-2 border border-gray-200 px-5 py-3 rounded-md text-sm">Explore services</button>
                    </div>

                    <div className="mt-10 grid gap-4 sm:grid-cols-2">
                      {['Product-first ML', 'Fast to production', 'Measured ROI', 'Ethical & Secure'].map((t, i) => (
                        <motion.div key={t} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 * i }} className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="font-semibold">{t}</div>
                          <div className="text-sm text-gray-600 mt-2">Short explanation about why this matters and how we deliver it.</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="bg-white p-6 rounded-2xl shadow-xl ring-1 ring-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center">🤖</div>
                        <div>
                          <div className="text-sm font-semibold">Product Analytics</div>
                          <div className="text-xs text-gray-500">Realtime insights & funnel tracking</div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="bg-gray-100 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-xs text-gray-500">Active users</div>
                              <div className="text-lg font-bold">1.2M</div>
                            </div>
                            <div className="text-xs text-gray-500">+12% MoM</div>
                          </div>
                          <div className="mt-4 h-28 bg-white rounded-lg border border-dashed border-gray-200 flex items-center justify-center text-sm text-gray-400">Chart placeholder</div>
                        </div>
                      </div>
                    </motion.div>

                    <div className="mt-8 grid grid-cols-3 gap-4">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="bg-white p-4 rounded-lg shadow text-center text-sm text-gray-500">Client {i + 1}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

                  {/* Audiences (homepage cards similar to Featured Services) */}
                  <section className="py-12">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                      <h2 className="text-3xl font-extrabold">Audiences</h2>
                      <p className="text-gray-600 mt-2 max-w-xl">Key audience segments we reach and engage for data-driven campaigns.</p>

                      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {audienceCatalog.map((a, i) => (
                          <motion.div
                            key={a.id}
                            whileHover={{ scale: 1.05, y: -6 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: i * 0.06 }}
                            onClick={() => setPage('audience-detail-' + a.id)}
                            className="cursor-pointer bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl"
                          >
                            <div className="text-4xl">{a.logo}</div>
                            <div className="text-xl font-extrabold mt-4">{a.title}</div>
                            <p className="mt-2 text-gray-600 text-sm">{a.short}</p>
                            <div className="mt-4 text-orange-600 font-semibold">Explore →</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </section>

              {/* Process */}
              <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                  <h2 className="text-3xl font-extrabold">Our Process</h2>
                  <p className="text-gray-600 mt-2 max-w-2xl mx-auto">A simple, repeatable path from idea to production.</p>

                  <div className="mt-8 grid gap-6 sm:grid-cols-4">
                    {['Discover', 'Prototype', 'Build', 'Operate'].map((s, idx) => (
                      <motion.div key={s} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }} className="bg-white p-6 rounded-lg shadow">
                        <div className="text-xl font-bold">{s}</div>
                        <div className="text-sm text-gray-600 mt-2">Short step description.</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Featured Services */}
              <section className="py-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                  <h2 className="text-3xl font-extrabold">Featured Services</h2>
                  <p className="text-gray-600 mt-2 max-w-xl">Our top AI‑powered offerings with custom logos & smooth animations.</p>

                  <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {servicesCatalog.slice(0, 8).map((s, i) => (
                      <motion.div
                        key={s.id}
                        whileHover={{ scale: 1.05, y: -6 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: i * 0.08 }}
                        onClick={() => setPage('services-detail-' + s.id)}
                        className="cursor-pointer bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl"
                      >
                        <div className="text-4xl">{s.logo}</div>
                        <div className="text-xl font-extrabold mt-4">{s.title}</div>
                        <p className="mt-2 text-gray-600 text-sm">{s.short}</p>
                        <div className="mt-4 text-orange-600 font-semibold">Explore →</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Expanded: Mission / Vision / Why Choose Us / Services list / FAQs */}
              <section className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={listVariant} className="grid gap-8 lg:grid-cols-3">
                    <motion.div variants={cardVariant} className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl shadow-md border border-orange-100">
                      <img src="https://source.unsplash.com/collection/1163637/600x400" alt="mission" loading="lazy" className="w-full h-36 sm:h-40 md:h-44 object-cover rounded-md mb-4" onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src = imgFallback }} />
                      <h3 className="text-xl font-semibold">Our Mission</h3>
                      <p className="mt-3 text-sm text-gray-600">Deliver measurable growth for product teams by combining data, engineering and design. We focus on high-quality leads, predictable outcomes and fast time-to-production.</p>
                      <div className="mt-4 flex items-center gap-4">
                        <div className="text-sm text-gray-500">Active clients</div>
                        <div className="font-bold text-lg">412</div>
                        <div className="ml-auto w-28 sm:w-36"><SimpleLineChart /></div>
                      </div>
                    </motion.div>

                    <motion.div variants={cardVariant} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                      <img src="https://source.unsplash.com/collection/1245976/600x400" alt="vision" loading="lazy" className="w-full h-36 sm:h-40 md:h-44 object-cover rounded-md mb-4" onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src = imgFallback }} />
                      <h3 className="text-xl font-semibold">Our Vision</h3>
                      <p className="mt-3 text-sm text-gray-600">Evolve with the digital landscape — blending creativity and analytics to build sustainable, scalable B2B products that customers love.</p>
                      <div className="mt-4 flex items-center gap-4">
                        <div className="text-sm text-gray-500">Projects delivered</div>
                        <div className="font-bold text-lg">394</div>
                        <div className="ml-auto w-28 sm:w-36"><SimpleBarChart /></div>
                      </div>
                    </motion.div>

                    <motion.div variants={cardVariant} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                      <h3 className="text-xl font-semibold">Why clients choose us</h3>
                      <ul className="mt-3 text-sm text-gray-600 space-y-2">
                        <li><strong>Data-first:</strong> Intent signals and analytics guide every campaign.</li>
                        <li><strong>Multichannel:</strong> Integrated outreach across email, social and programmatic.</li>
                        <button onClick={() => setPage('audience')} className="text-gray-500 hover:text-orange-600">Audiences</button>
                        <li><strong>Custom-fit:</strong> Strategies tailored to your product and buyer journey.</li>
                        <li><strong>Results-focused:</strong> We prioritise lead quality, conversion and ROI.</li>
                      </ul>
                    </motion.div>
                  </motion.div>

                  <div className="mt-12 grid gap-6 lg:grid-cols-2">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={listVariant} className="bg-white p-6 rounded-lg shadow">
                      <h3 className="text-2xl font-extrabold">Expanded Services</h3>
                      <p className="mt-2 text-gray-600 text-sm">Practical, production-ready services to accelerate product growth.</p>

                      <motion.ul className="mt-6 grid gap-4" variants={listVariant}>
                        {servicesCatalog.map((s, i) => (
                          <motion.li key={s.id} variants={cardVariant} whileHover={{ scale: 1.02 }} className="p-4 rounded-lg border border-gray-100 flex flex-col sm:flex-row items-start gap-4 cursor-pointer hover:shadow-lg" onClick={() => setPage('services-detail-' + s.id)}>
                            <div className="text-2xl">{s.logo}</div>
                            <div>
                              <div className="font-semibold">{s.title}</div>
                              <div className="text-sm text-gray-600 mt-1">{s.short}</div>
                            </div>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={listVariant} className="bg-white p-6 rounded-lg shadow">
                      <h3 className="text-2xl font-extrabold">FAQs</h3>
                      <div className="mt-4 grid gap-4">
                        <FAQItem q="How do you approach a new engagement?" a="We start with discovery — KPI alignment, audience mapping, and a small pilot to validate assumptions quickly." />
                        <FAQItem q="Do you help with deal closing?" a="We focus on generating high-quality pipeline and can support handoffs to sales with playbooks, messaging and verified contact data." />
                        <FAQItem q="What outcomes can we expect?" a="Expect measurable improvements in lead velocity, conversion rates and clearer signal for product-led growth decisions." />
                      </div>

                      <div className="mt-6">
                        <div className="font-semibold">Contact</div>
                        <div className="text-sm text-gray-600 mt-1">Email: <a href="mailto:info@prefiction.com" className="text-orange-600">info@prefiction.com</a></div>
                        <div className="text-sm text-gray-600">Phone: <a href="tel:+919876543210" className="text-orange-600">+91 98765 43210</a></div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* Testimonials removed per request */}

              {/* CTA */}
              <section className="py-12">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                  <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative overflow-hidden rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-orange-50 via-orange-100 to-white ring-1 ring-orange-100">
                    <svg className="absolute -right-6 -top-6 opacity-20 w-56 h-56 transform rotate-12" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <defs>
                        <linearGradient id="g2" x1="0" x2="1">
                          <stop offset="0%" stopColor="#ffedd5" />
                          <stop offset="100%" stopColor="#fff7ed" />
                        </linearGradient>
                      </defs>
                      <circle cx="100" cy="100" r="90" fill="url(#g2)" />
                    </svg>

                    <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                      <div>
                        <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Ready to build?</h3>
                        <p className="mt-3 text-gray-700 max-w-xl">Tell us about your project and we'll propose a scoped plan that balances product, data and engineering — fast.</p>

                        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center">
                          <button onClick={() => setPage('contact')} className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-5 py-3 rounded-md font-semibold shadow hover:bg-orange-700">Contact us</button>
                          <button onClick={() => setPage('services')} className="inline-flex items-center justify-center gap-2 border border-orange-200 px-4 py-3 rounded-md text-sm bg-white hover:bg-orange-50">Explore services</button>
                        </div>

                        <form onSubmit={(e)=>{ e.preventDefault(); setPage('contact'); }} className="mt-4">
                          <label className="sr-only" htmlFor="cta-email">Email</label>
                          <div className="flex gap-2">
                            <input id="cta-email" name="email" type="email" placeholder="Your email (optional)" className="flex-1 rounded-md border border-orange-100 px-3 py-2" />
                            <button type="submit" className="bg-white text-orange-600 px-4 py-2 rounded-md font-semibold border border-orange-200">Get a proposal</button>
                          </div>
                        </form>
                      </div>

                      <div className="hidden sm:flex items-center justify-center">
                        <div className="w-full max-w-xs">
                          <div className="bg-white rounded-2xl p-4 shadow-lg border">
                            <div className="text-sm text-gray-400">Sample outcome</div>
                            <div className="mt-2 font-bold text-xl">Scoped pilot — 6 weeks</div>
                            <div className="mt-3 text-sm text-gray-600">Discovery, prototype, deployment & monitoring plan with estimated costs and milestones.</div>
                            <div className="mt-4 w-full"><SimpleLineChart data={[8,12,18,14,20,26]} /></div>
                            <div className="mt-4 text-xs text-gray-500">Estimated uplift in key metric shown above</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>
            </motion.div>
          )}

          {page === 'services' && (
            <motion.div key="services" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={pageTransition}>
              <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-extrabold">Services</h2>
                    <p className="mt-2 text-gray-600 max-w-2xl mx-auto">We partner with product teams to deliver measurable outcomes using data, content and predictive systems.</p>
                  </div>

                  <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left: main content */}
                    <div className="lg:col-span-3">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <motion.input whileFocus={{ scale: 1.01 }} value={serviceQuery} onChange={(e)=>setServiceQuery(e.target.value)} placeholder="Search services" className="border rounded-md px-3 py-2 w-64" />
                          <button onClick={()=>{ setServiceQuery('') }} className="text-sm text-gray-500">Clear</button>
                        </div>

                        <div className="flex gap-2 items-center">
                          {['all','data','demand','lead','abm','email','content'].map(cat => (
                            <motion.button key={cat} onClick={()=>setServiceCategory(cat)} whileTap={{ scale: 0.96 }} className={`px-3 py-1 rounded-full text-sm ${serviceCategory===cat? 'bg-orange-600 text-white':'bg-gray-100 text-gray-700'}`}>
                              {cat==='all' ? 'All' : cat.charAt(0).toUpperCase()+cat.slice(1)}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={listVariant} className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {servicesCatalog.filter(s => {
                          const q = serviceQuery.trim().toLowerCase()
                          if(serviceCategory !== 'all'){
                            if(!s.id.includes(serviceCategory) && !s.title.toLowerCase().includes(serviceCategory)) return false
                          }
                          if(!q) return true
                          return s.title.toLowerCase().includes(q) || s.short.toLowerCase().includes(q) || s.long.toLowerCase().includes(q)
                        }).map((s, idx) => (
                          <motion.div key={s.id} variants={cardVariant} whileHover={{ translateY: -6, scale: 1.02 }} transition={{ duration: 0.28 }}>
                            <AnimatedCard img={s.image} title={s.title} desc={s.short} cta={<button onClick={() => setPage('services-detail-' + s.id)} className="text-orange-600 font-semibold">Learn more →</button>} />
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>

                    {/* Right: sidebar */}
                    <motion.aside initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }} className="lg:col-span-1">
                      <div className="bg-white p-6 rounded-lg shadow sticky top-24">
                        <div className="font-semibold">Quick Links</div>
                        <ul className="mt-3 space-y-2 text-sm text-gray-600">
                          <li><button onClick={()=>setPage('contact')} className="text-left w-full text-orange-600">Contact us →</button></li>
                          <li><button onClick={()=>setPage('about')} className="text-left w-full">About</button></li>
                          <li><a href="#" onClick={(e)=>e.preventDefault()} className="text-left w-full">Case studies</a></li>
                        </ul>

                        <div className="mt-6">
                          <div className="font-semibold">Need a scoped pilot?</div>
                          <div className="text-sm text-gray-600 mt-2">We run short pilots that prove value quickly — request a proposal and we'll respond within 48 hours.</div>
                          <div className="mt-4">
                            <button onClick={()=>setPage('contact')} className="w-full bg-orange-600 text-white px-4 py-2 rounded-md">Request proposal</button>
                          </div>
                        </div>
                      </div>
                    </motion.aside>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {page === 'audience' && (
            <motion.div key="audience" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={pageTransition}>
              <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-extrabold">Audiences</h2>
                    <p className="mt-2 text-gray-600 max-w-2xl mx-auto">Segments and audience cohorts we engage for tailored campaigns and activation.</p>
                  </div>

                  <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3">
                      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {audienceCatalog.map((a, idx) => (
                          <motion.div key={a.id} variants={cardVariant} whileHover={{ translateY: -6, scale: 1.02 }} transition={{ duration: 0.28 }}>
                            <AnimatedCard img={a.image} title={a.title} desc={a.short} cta={<button onClick={() => setPage('audience-detail-' + a.id)} className="text-orange-600 font-semibold">Learn more →</button>} />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <motion.aside initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }} className="lg:col-span-1">
                      <div className="bg-white p-6 rounded-lg shadow sticky top-24">
                        <div className="font-semibold">Quick Links</div>
                        <ul className="mt-3 space-y-2 text-sm text-gray-600">
                          <li><button onClick={()=>setPage('contact')} className="text-left w-full text-orange-600">Contact us →</button></li>
                          <li><button onClick={()=>setPage('services')} className="text-left w-full">Services</button></li>
                          <li><button onClick={()=>setPage('about')} className="text-left w-full">About</button></li>
                        </ul>
                      </div>
                    </motion.aside>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {page.startsWith('audience-detail-') && (() => {
            const aid = page.replace('audience-detail-', '')
            const aud = audienceCatalog.find(a => a.id === aid) || audienceCatalog[0]
            return (
              <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={pageTransition}>
                <section className="py-12">
                  <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <button onClick={() => setPage('audience')} className="text-sm text-orange-600 mb-4">← Back to audiences</button>
                    <img src={aud.image} alt={aud.title} className="w-full h-64 object-cover rounded-lg mb-8" loading="lazy" onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src = imgFallback }} />
                    <h1 className="text-3xl font-extrabold">{aud.title}</h1>
                    <p className="mt-4 text-gray-600">{aud.short} — we can help you reach and activate these segments with data-driven engagement, intent signals and tailored creative.</p>

                    <div className="mt-8">
                      <button onClick={() => setPage('contact')} className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-md">Contact sales</button>
                    </div>
                  </div>
                </section>
              </motion.div>
            )
          })()}

          {page.startsWith('services-detail-') && (() => {
                      const sid = page.replace('services-detail-', '')
                      const svc = servicesCatalog.find(s => s.id === sid) || servicesCatalog[0]
                      return (
                        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={pageTransition}>
                          <section className="py-12">
                            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                              <button onClick={() => setPage('services')} className="text-sm text-orange-600 mb-4">← Back to services</button>
                              <img src={svc.image} alt={svc.title} className="w-full h-64 object-cover rounded-lg mb-8" loading="lazy" onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src = imgFallback }} />
                              <h1 className="text-3xl font-extrabold">{svc.title}</h1>
                              <p className="mt-4 text-gray-600">{svc.long}</p>

                              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                                <div className="bg-white p-6 rounded-lg shadow">
                                  <div className="font-semibold">Key use cases</div>
                                  <ul className="mt-3 text-sm text-gray-600 list-disc ml-5">
                                    {(svc.useCases || []).map((u, idx) => (
                                      <li key={idx}>{u}</li>
                                    ))}
                                  </ul>

                                  <div className="mt-6">
                                    <div className="font-semibold">Deliverables</div>
                                    <ul className="mt-2 text-sm text-gray-600 list-disc ml-5">
                                      {(svc.deliverables || []).map((d, idx) => (
                                        <li key={idx}>{d}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow">
                                  <div className="font-semibold">Timeline & pricing</div>
                                  <div className="mt-3 text-sm text-gray-600">
                                    <div><strong>Timeline:</strong> {svc.timeline}</div>
                                    <div className="mt-2"><strong>Pricing:</strong> {svc.pricing}</div>
                                  </div>

                                  <div className="mt-6">
                                    <div className="font-semibold">KPIs & Tech</div>
                                    <div className="mt-2 text-sm text-gray-600">
                                      <div className="mb-2"><strong>KPIs:</strong>
                                        <ul className="list-disc ml-5 mt-1">
                                          {(svc.kpis || []).map((k, idx) => <li key={idx}>{k}</li>)}
                                        </ul>
                                      </div>
                                      <div><strong>Tech / Integrations:</strong>
                                        <div className="text-xs text-gray-500 mt-1">{(svc.tech || []).join(', ')}</div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="mt-6">
                                    <button onClick={() => setPage('contact')} className="bg-orange-600 text-white px-4 py-2 rounded-md font-semibold">Request proposal</button>
                                    <div className="mt-3 text-xs text-gray-500">We can provide fixed-price pilots or time-based engagements.</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        </motion.div>
                      )
                    })()}

          {page === 'products' && (
            <motion.div key="products" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={pageTransition}>
              <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                  <h2 className="text-3xl font-extrabold">Solutions & Products</h2>
                  <p className="mt-2 text-gray-600 max-w-2xl mx-auto">Productised offerings that help you ship faster.</p>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-10 grid gap-6 sm:grid-cols-2">
                  {[{ id: 'insight', title: 'Prefiction Insight', summary: 'Realtime analytics and anomaly detection for product teams.', img: 'https://source.unsplash.com/collection/1163637/1200x800' }, { id: 'predict', title: 'Prefiction Predict', summary: 'Custom prediction APIs tuned to your business metrics.', img: 'https://source.unsplash.com/collection/1072004/1200x800' }].map(p => (
                    <AnimatedCard key={p.id} img={p.img} title={p.title} desc={p.summary} cta={<button onClick={() => setPage('products-detail-' + p.id)} className="text-orange-600 font-semibold">Learn more →</button>} />
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {page.startsWith('products-detail-') && (
            <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={pageTransition}>
              <section className="py-12">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                  <button onClick={() => setPage('products')} className="text-sm text-orange-600 mb-4">← Back to products</button>
                  <img src={`https://source.unsplash.com/collection/1163637/1400x700`} alt="product" className="w-full h-64 object-cover rounded-lg mb-8" loading="lazy" onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src = imgFallback }} />
                  <h1 className="text-3xl font-extrabold">Product detail</h1>
                  <p className="mt-4 text-gray-600">Detailed product description, use-cases, pricing models, and how to integrate with your stack.</p>

                  <div className="mt-8">
                    <button onClick={() => setPage('contact')} className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-md">Contact sales</button>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {page === 'about' && (
            <motion.div key="about" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={pageTransition}>
              <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-extrabold">About PREFICTION</h3>
                    <p className="mt-4 text-gray-600">We are a cross-functional team of engineers, data scientists and designers focused on building products that combine strong UX with reliable ML. We help teams move from prototypes to production while keeping product-market fit front-and-center.</p>

                    <ul className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <li>Founded: 2016</li>
                      <li>HQ: Remote / India</li>
                      <li>Focus: SaaS, FinTech, HealthTech</li>
                      <li>Clients: Startups → Enterprises</li>
                    </ul>
                  </div>

                  <div>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="font-semibold">Leadership</div>
                      <div className="mt-4 grid gap-4">
                        {["Anand J.", "Neha G.", "Ravi P."].map((name) => (
                          <motion.div key={name} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }} className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center font-semibold">{name.split(' ')[0][0]}</div>
                            <div>
                              <div className="font-medium">{name}</div>
                              <div className="text-xs text-gray-500">Role</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {page === 'contact' && (
            <motion.div key="contact" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={pageTransition}>
              <section className="py-12">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <div className="bg-white p-8 rounded-2xl shadow">
                    <h3 className="text-2xl font-extrabold">Let's build something together</h3>
                    <p className="mt-2 text-gray-600">Tell us about your project and we'll get back with a tailored plan.</p>

                    <form className="mt-6 grid grid-cols-1 gap-4" onSubmit={(e) => { e.preventDefault(); alert('Message sent (demo)') }}>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <input name="name" className="border border-gray-200 rounded-md px-4 py-3" placeholder="Your name" />
                        <input name="company" className="border border-gray-200 rounded-md px-4 py-3" placeholder="Company" />
                      </div>
                      <input name="email" className="border border-gray-200 rounded-md px-4 py-3" placeholder="Email" type="email" />
                      <textarea name="message" className="border border-gray-200 rounded-md px-4 py-3" rows={5} placeholder="Brief description of your project"></textarea>
                      <div className="flex items-center gap-4">
                        <button type="submit" className="bg-orange-600 text-white px-5 py-3 rounded-md font-semibold">Send message</button>
                        <div className="text-sm text-gray-500">Or email us at <a href="mailto:hello@prefiction.com" className="text-orange-600">hello@prefiction.com</a></div>
                      </div>
                    </form>
                  </div>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer setPage={setPage} />
    </div>
  )
}

export default PrefictionPreview
