import * as React from 'react'
import { setCookie, hasCookie } from 'cookies-next'
import { HiX } from 'react-icons/hi'

const Consent = () => {
  const [consent, setConsent] = React.useState(true)
  React.useEffect(() => {
    setConsent(hasCookie(`localConsent`))
    setTimeout(() => {
      let banner = document.querySelector('#consent-banner')
      banner ? (banner.style.opacity = 1) : ``
    }, 3500)
  }, [])

  const acceptCookie = () => {
    setConsent(true)
    setCookie(`localConsent`, 'true', {
      maxAge: 60 * 60 * 24 * 365,
      sameSite: true,
    })
    gtag('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
    })
    console.log('accepting cookies')
  }
  const denyCookie = () => {
    setConsent(true)
    setCookie('localConsent', 'false', {
      maxAge: 60 * 60 * 24 * 14,
      sameSite: true,
    })
    console.log('denying cookies for 2 weeks')
  }
  const closeP = () => {
    setConsent(true)
    console.log('closing')
  }
  if (consent === true) {
    return null
  }

  return (
    <div
      id="consent-banner"
      className={`fixed bottom-0 grid w-full bg-accent bg-opacity-95 p-3 opacity-0 transition duration-500 ease-in md:grid-cols-5 ${
        consent ? 'hidden' : ''
      }`}
    >
      <p className="prose prose-sm mx-auto my-4 px-6 text-left md:col-span-3">
        Here at MC3, we love data. We would love to gather data about your
        visits to our site too. We will not do that without your consent (of
        course), so please decide whether you wish for us to receive these
        anonymous data <span className="md:hidden">↓</span>
        <span className="hidden md:inline">→</span>
      </p>
      <div className="my-4 flex items-center justify-evenly md:col-span-2">
        <button
          className="absolute top-2 right-2"
          onClick={e => {
            closeP()
          }}
        >
          <HiX className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </button>
        <button
          onClick={e => denyCookie()}
          className="btn btn-ghost px-4 text-neutral"
        >
          Deny All
        </button>
        <button
          onClick={() => {
            acceptCookie()
          }}
          className="btn btn-secondary px-4 text-base-100"
        >
          Accept All
        </button>
      </div>
    </div>
  )
}
export default Consent
