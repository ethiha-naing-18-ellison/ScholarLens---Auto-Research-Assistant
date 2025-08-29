'use client'

import { useState, useEffect } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('body-scroll-lock')
    } else {
      document.body.classList.remove('body-scroll-lock')
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('body-scroll-lock')
    }
  }, [isMobileMenuOpen])

  // Handle navigation clicks
  const handleNavClick = (page: string) => {
    setCurrentPage(page)
    setIsMobileMenuOpen(false)
    
    // Smooth scroll to section
    const element = document.getElementById(page)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isMobileMenuOpen])

  return (
    <>
      {/* Professional Header */}
      <header className="header">
        <div className="page-container header-container">
          {/* Logo Block (Left) */}
          <a href="/" className="logo-block" onClick={() => handleNavClick('home')}>
            <div className="logo-mark">S</div>
            <span className="brand-text">ScholarLens</span>
          </a>
          
          {/* Primary Navigation (Center) */}
          <nav className="nav-primary" aria-label="Primary navigation">
            <a 
              href="#features" 
              className="nav-link"
              aria-current={currentPage === 'features' ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('features')
              }}
            >
              Features
            </a>

            <a 
              href="#about" 
              className="nav-link"
              aria-current={currentPage === 'about' ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('about')
              }}
            >
              About
            </a>
            <a 
              href="#contact" 
              className="nav-link"
              aria-current={currentPage === 'contact' ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('contact')
              }}
            >
              Contact
            </a>
          </nav>
          
          {/* Action Buttons (Right) */}
          <div className="header-actions">
            <button className="btn-sign-in">Sign In</button>
            <button className="btn-get-started">Get Started</button>
            
            {/* Mobile Hamburger */}
            <button 
              className="hamburger"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <a href="/" className="logo-block" onClick={() => {
            handleNavClick('home')
            setIsMobileMenuOpen(false)
          }}>
            <div className="logo-mark">S</div>
            <span className="brand-text">ScholarLens</span>
          </a>
          <button 
            className="close-button"
            onClick={toggleMobileMenu}
            aria-label="Close mobile menu"
          >
            ✕
          </button>
        </div>
        
        <div className="mobile-menu-content">
          <nav role="navigation">
            <a 
              href="#features" 
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('features')
              }}
            >
              Features
            </a>

            <a 
              href="#about" 
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('about')
              }}
            >
              About
            </a>
            <a 
              href="#contact" 
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('contact')
              }}
            >
              Contact
            </a>
          </nav>
          
          <div className="mobile-actions">
            <button className="mobile-btn mobile-btn-sign-in">Sign In</button>
            <button className="mobile-btn mobile-btn-get-started">Get Started</button>
          </div>
        </div>
      </div>
    </>
  )
}
