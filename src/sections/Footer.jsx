import { footer } from '../content'
import './footer.css'

const external = (href) => /^https?:/.test(href)

export default function Footer() {
  const { about, email, phone, phoneHref, columns, cta, portfolio, copyright, tagline } = footer

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#top" aria-label="Reidius Infra, back to the top">
              <img className="footer-logo" src="/brand/logo.svg" alt="Reidius Infra" width="158" height="22" />
            </a>
            <p className="footer-about">{about}</p>
            <p className="footer-contact">
              <a href={`mailto:${email}`}>Email: {email}</a>
              <a href={phoneHref}>Contact: {phone}</a>
            </p>
          </div>

          <nav className="footer-links" aria-label="Footer">
            {columns.map((col, i) => (
              <div key={col.title} className="footer-col">
                <h2 className="footer-col-title">{col.title}</h2>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <a href={link.href} {...(external(link.href) ? { target: '_blank', rel: 'noreferrer' } : {})}>
                          {link.label}
                        </a>
                      ) : (
                        link.label
                      )}
                    </li>
                  ))}
                </ul>
                {i === columns.length - 1 && (
                  <a className="footer-cta" href={portfolio} target="_blank" rel="noreferrer">
                    {cta}
                  </a>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">{copyright}</p>
          <p className="footer-tagline">
            {tagline[0]} <strong>{tagline[1]}</strong>
          </p>
        </div>
      </div>
    </footer>
  )
}
