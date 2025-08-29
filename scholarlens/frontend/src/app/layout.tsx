import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '../components/Header'
import './globals.css?v=2'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ScholarLens - AI-Powered Research Platform',
  description: 'Discover groundbreaking research, extract insights, and generate comprehensive reports with cutting-edge AI.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-gray-200`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          
          {/* Main Content with proper spacing */}
          <main className="flex-1">
            <div className="w-full">
              {children}
            </div>
          </main>

          {/* Professional Footer */}
          <footer className="footer mt-auto">
            <div className="page-container">
              <div className="footer-grid">
                {/* Company Information */}
                <div>
                  <div className="footer-brand">
                    <div className="footer-logo">S</div>
                    <span className="footer-brand-text">ScholarLens</span>
                  </div>
                  <p className="footer-description">
                    AI-powered research platform helping researchers discover, analyze, and understand academic literature.
                  </p>
                </div>
                
                {/* Quick Links */}
                <div>
                  <h4 className="footer-section-title">Quick Links</h4>
                  <div className="footer-links">
                    <a href="#about" className="footer-link">About</a>
                    <a href="#features" className="footer-link">Features</a>
                    <a href="#pricing" className="footer-link">Pricing</a>
                    <a href="#contact" className="footer-link">Contact</a>
                  </div>
                  
                  <h4 className="footer-section-title" style={{marginTop: '1.5rem'}}>Legal</h4>
                  <div className="footer-links">
                    <a href="#privacy" className="footer-link">Privacy Policy</a>
                    <a href="#terms" className="footer-link">Terms of Service</a>
                    <a href="#cookies" className="footer-link">Cookie Policy</a>
                  </div>
                </div>
                
                {/* Developer Contact */}
                <div>
                  <h4 className="footer-section-title">Developer</h4>
                  <div className="footer-developer">
                    <p className="footer-developer-name">Thiha Naing</p>
                    <p className="footer-developer-title">Software Engineer, Data Analyst</p>
                    
                    <div className="footer-contact-info">
                      <a href="mailto:thiha.naing.codev@gmail.com" className="footer-contact-item">
                        📧 thiha.naing.codev@gmail.com
                      </a>
                      <a href="tel:+60187799581" className="footer-contact-item">
                        📞 +60 18-779 9581
                      </a>
                    </div>
                    
                    <div className="footer-social-links">
                      <a href="https://github.com/ethiha-naing-18-ellison" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                        GitHub
                      </a>
                      <a href="https://www.linkedin.com/in/thiha-naing-18t43" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="footer-bottom">
                <p className="footer-copyright">© 2024 ScholarLens. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}