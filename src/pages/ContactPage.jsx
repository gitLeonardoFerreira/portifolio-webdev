import { useEffect } from 'react'
import ContactSection from '../components/ContactSection.jsx'
import Footer from '../components/Footer.jsx'
export default function ContactPage() {
  useEffect(() => {
    document.title = 'Contato — Leonardo Barbosa'
  }, [])
  return (
    <>
      <main className="contact-page">
        <ContactSection heading="h1" />
      </main>
      <Footer />
    </>
  )
}
