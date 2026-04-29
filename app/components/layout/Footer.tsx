import Link from 'next/link'

const companyLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms and Condition', href: '/terms' },
  { label: 'Help & Support', href: '/support' },
]

const quickLinks = [
  { label: 'Store Locator', href: '/store-locator' },
  { label: 'Sitemap', href: '/sitemap' },
  { label: 'Why Tendercuts?', href: '/why-tendercuts' },
  { label: 'Quality check', href: '/quality' },
  { label: 'Certificates', href: '/certificates' },
  { label: 'Careers', href: '/careers' },
]

export default function Footer() {
  return (
    <footer className="bg-[#f7f7f7] border-t border-gray-200 px-5 sm:px-8 lg:px-12 pt-8 pb-5">

      {/*
        Layout:
          Mobile  → 2×2 grid  (Company | Stay Connected) (Links | App Buttons)
          Desktop → 4 columns in one row
      */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6">

        {/* ── COMPANY ── */}
        <div>
          <h4 className="text-[11px] font-bold tracking-widest uppercase text-gray-900 mb-3 sm:mb-4">
            Company
          </h4>
          {companyLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-xs sm:text-sm text-gray-400 mb-2.5 hover:text-[#c0392b] transition-colors leading-snug"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* ── STAY CONNECTED ── */}
        <div>
          <h4 className="text-[11px] font-bold tracking-widest uppercase text-gray-900 mb-3 sm:mb-4">
            Stay Connected
          </h4>

          <div className="flex items-start gap-2 mb-2.5">
            <MailIcon />
            <a
              href="mailto:cs@tendercuts.in"
              className="text-xs sm:text-sm text-gray-500 underline hover:text-[#c0392b] transition-colors break-all"
            >
              cs@tendercuts.in
            </a>
          </div>

          <div className="flex items-center gap-2 mb-2.5">
            <PhoneIcon />
            <span className="text-xs sm:text-sm text-gray-400">Chennai - 9543754375</span>
          </div>

          <div className="flex items-center gap-2 mb-2.5">
            <FacebookIcon />
            <a
              href="https://facebook.com/tendercuts"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-gray-500 underline hover:text-[#c0392b] transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>

        {/* ── LINKS ── */}
        <div>
          <h4 className="text-[11px] font-bold tracking-widest uppercase text-gray-900 mb-3 sm:mb-4">
            Links
          </h4>
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-xs sm:text-sm text-gray-400 mb-2.5 hover:text-[#c0392b] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* ── APP BUTTONS ── */}
        <div>
          {/* invisible heading — alignment ke liye desktop pe */}
          <h4 className="text-[11px] font-bold tracking-widest uppercase text-transparent mb-3 sm:mb-4 select-none">
            &nbsp;
          </h4>

          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 sm:gap-3 bg-black rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 mb-3 w-full sm:w-40 hover:bg-gray-800 transition-colors"
          >
            <AppleIcon />
            <div>
              <span className="block text-[8px] sm:text-[9px] text-white/70 tracking-wide">
                Available on the
              </span>
              <span className="block text-sm sm:text-[15px] font-medium text-white leading-tight">
                App Store
              </span>
            </div>
          </a>

          <a
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 sm:gap-3 bg-black rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 w-full sm:w-40 hover:bg-gray-800 transition-colors"
          >
            <PlayIcon />
            <div>
              <span className="block text-[8px] sm:text-[9px] text-white/70 tracking-wide uppercase">
                Android App on
              </span>
              <span className="block text-sm sm:text-[15px] font-medium text-white leading-tight">
                Google play
              </span>
            </div>
          </a>
        </div>

      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="text-base font-medium text-[#c0392b]">TenderCuts</span>
        <span className="text-[11px] text-gray-400 text-center sm:text-right">
          © {new Date().getFullYear()} TenderCuts. All rights reserved.
        </span>
      </div>

    </footer>
  )
}

// ── SVG Icons ────────────────────────────────
function MailIcon() {
  return (
    <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] opacity-50 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] opacity-50 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="shrink-0">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path d="M3.18 23.76c.3.17.64.24.99.19l12.6-7.27-2.61-2.61-10.98 9.69z" fill="#EA4335" />
      <path d="M22.47 10.22C21.82 9.6 20.95 9.24 20 9.24c-.95 0-1.82.36-2.47.98l-1.85 1.85 2.61 2.61 4.18-2.41c.58-.34.58-1.24 0-1.58v.53z" fill="#FBBC05" />
      <path d="M3.18.24C2.72.5 2.4 1.01 2.4 1.62v20.76c0 .61.32 1.12.78 1.38l12.98-11.88L3.18.24z" fill="#4285F4" />
      <path d="M4.17.43l12.6 7.27-2.61 2.61L3.18.24C3.48.09 3.87.1 4.17.43z" fill="#34A853" />
    </svg>
  )
}