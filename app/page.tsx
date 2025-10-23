"use client"

import type React from "react"
import Image from "next/image"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Menu, X, Phone, MapPin, Zap, Trash2, Truck, ArrowRight, Star, ChevronDown, ArrowUp, X as XIcon } from "lucide-react"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [showPreloader, setShowPreloader] = useState(true)
  const [showOffer, setShowOffer] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const preloaderTimer = setTimeout(() => {
      setShowPreloader(false)
    }, 3000)

    return () => clearTimeout(preloaderTimer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setShowBackToTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="bg-background text-foreground overflow-hidden">
      {/* Preloader */}
      {showPreloader && <Preloader />}

      {/* Navigation */}
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Gallery Section */}
      <GallerySection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Special Offer Popup */}
      <OfferPopup isOpen={showOffer} onClose={() => setShowOffer(false)} />

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-24 left-6 w-12 h-12 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all z-40"
          style={{
            backgroundColor: "#679976",
            boxShadow: "0 0 20px rgba(103, 153, 118, 0.4)"
          }}
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}

      {/* Offer Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => setShowOffer(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 px-6 py-3 text-white rounded-full font-bold hover:shadow-lg transition-all z-40"
        style={{
          backgroundImage: `linear-gradient(135deg, #679976 0%, #be6a07 100%)`,
          boxShadow: "0 0 20px rgba(103, 153, 118, 0.4)"
        }}
      >
        Special Offer! 🎉
      </motion.button>
    </div>
  )
}

function Preloader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const duration = 2.8
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const percentage = Math.min((elapsed / (duration * 1000)) * 100, 100)
      setProgress(Math.round(percentage))

      if (percentage < 100) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        background: `linear-gradient(135deg, #679976 0%, #be6a07 100%)`
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center w-full h-full">
        {/* Main Content Container */}
        <div className="flex flex-col items-center gap-8 mb-20">
          {/* Broom Image */}
          <motion.div
            animate={{ x: [0, progress * 2, 0] }}
            transition={{ type: "tween", duration: 0.1 }}
            className="relative w-24 h-24"
          >
            <Image
              src="https://cdn.builder.io/api/v1/image/assets%2F7600f566bcc249649c7d6868f8f762c3%2F59e850e30f5344b3ad226fae07c2fd34?format=webp&width=200"
              alt="Loading..."
              width={96}
              height={96}
              className="w-full h-full object-contain filter drop-shadow-lg"
            />
          </motion.div>

          {/* Percentage Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <p className="text-5xl font-bold text-white mb-2">{progress}%</p>
            <p className="text-white font-medium">Loading...</p>
          </motion.div>
        </div>

        {/* Progress Bar Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md px-8"
        >
          {/* Background Track */}
          <div className="relative w-full h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            {/* Progress Fill */}
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ type: "tween", duration: 0.1 }}
              className="h-full bg-gradient-to-r from-white to-white/70 rounded-full shadow-lg"
              style={{
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)"
              }}
            />
          </div>

          {/* Progress Text Below Bar */}
          <p className="text-center text-white/80 text-sm font-medium mt-4">
            Bringing Your Space Back to Life...
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

function OfferPopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Scroll to contact form and fill email
    const contactForm = document.getElementById("contact")
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: "smooth" })
      setTimeout(() => {
        const emailInput = document.querySelector('input[placeholder="your@email.com"]') as HTMLInputElement
        if (emailInput) {
          emailInput.value = email
          emailInput.focus()
        }
      }, 500)
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card border rounded-2xl p-8 max-w-md w-full shadow-2xl"
        style={{
          borderColor: "#679976",
          boxShadow: "0 0 40px rgba(103, 153, 118, 0.3)"
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold bg-clip-text text-transparent" style={{
            backgroundImage: `linear-gradient(90deg, #679976 0%, #be6a07 100%)`
          }}>
            Special Limited Offer! 🎉
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg transition-colors hover:bg-gray-700"
          >
            <XIcon className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <p className="text-lg font-semibold text-white">
            Get <span className="text-xl" style={{ color: "#679976" }}>20% OFF</span> on your first junk removal service!
          </p>
          <p className="text-gray-400">
            Limited time offer for new customers. Fast, reliable, and eco-friendly junk removal at unbeatable prices.
          </p>
          <div className="border rounded-lg p-4" style={{ backgroundColor: "rgba(103, 153, 118, 0.1)", borderColor: "rgba(103, 153, 118, 0.3)" }}>
            <p className="text-sm font-mono font-bold" style={{ color: "#679976" }}>Promo Code: FRESH20</p>
            <p className="text-xs text-gray-400 mt-2">Valid for 30 days. Minimum service $150.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-white">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-input border rounded-lg focus:outline-none transition-colors text-white"
              style={{ borderColor: "rgba(103, 153, 118, 0.3)" }}
              onFocus={(e) => e.target.style.borderColor = "#679976"}
              onBlur={(e) => e.target.style.borderColor = "rgba(103, 153, 118, 0.3)"}
              placeholder="your@email.com"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 text-white rounded-lg font-bold hover:shadow-lg transition-all"
            style={{
              backgroundImage: `linear-gradient(135deg, #679976 0%, #be6a07 100%)`,
              boxShadow: "0 0 20px rgba(103, 153, 118, 0.3)"
            }}
          >
            Claim Your Discount
          </motion.button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-4">
          We'll help you complete your quote with the promo code applied.
        </p>
      </motion.div>
    </motion.div>
  )
}

function Navbar({ isMenuOpen, setIsMenuOpen }: { isMenuOpen: boolean; setIsMenuOpen: (open: boolean) => void }) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-accent/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#home"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Image src="/logo.png" alt="Clean Port Logo" width={48} height={48} className="w-12 h-12 object-contain" />
          <span className="font-bold text-xl hidden sm:inline">Clean Port</span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {["Home", "Services", "Gallery", "About", "Contact"].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ color: "#679976" }}
              className="text-sm font-medium text-white transition-colors"
            >
              {item}
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.a
          href="tel:+15551234567"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden sm:flex items-center gap-2 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
          style={{
            backgroundColor: "#679976",
            boxShadow: "0 0 15px rgba(103, 153, 118, 0.3)"
          }}
        >
          <Phone className="w-4 h-4" />
          Call Now
        </motion.a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:bg-accent/20 rounded-lg transition-colors"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-background/95 backdrop-blur-md border-b border-accent/20 p-4 space-y-4"
        >
          {["Home", "Services", "Gallery", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block text-sm font-medium text-white hover:text-white transition-colors"
              style={{ color: "#ffffff" }}
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="tel:+15551234567"
            className="block text-white px-4 py-2 rounded-full font-semibold text-center"
            style={{ backgroundColor: "#679976" }}
          >
            Call Now
          </a>
        </motion.div>
      )}
    </motion.nav>
  )
}

function HeroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="https://images.pexels.com/photos/7475428/pexels-photo-7475428.jpeg"
          alt="Junk removal and recycling background"
          fill
          className="object-cover opacity-20"
        />
      </div>

      {/* Animated Background Gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(135deg, rgba(10, 10, 10, 0.9) 0%, rgba(10, 10, 10, 0.8) 50%, rgba(190, 106, 7, 0.1) 100%)`
        }}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl -z-10"
        style={{ backgroundColor: "rgba(103, 153, 118, 0.2)" }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute bottom-20 left-10 w-96 h-96 rounded-full blur-3xl -z-10"
        style={{ backgroundColor: "rgba(190, 106, 7, 0.2)" }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
        {/* Animated Particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 40 - 20, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute w-2 h-2 bg-primary/40 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span
            className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 text-white"
            style={{ backgroundColor: "rgba(103, 153, 118, 0.3)", color: "#ffffff" }}
          >
            ✨ Professional Junk Removal
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl font-bold mb-6 text-balance text-white"
        >
          Bringing Your Space{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(90deg, #679976 0%, #be6a07 100%)`
            }}
          >Back to Life!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto text-gray-300"
        >
          Serving Oregon & Washington with reliable junk removal, demolition, and moving services. Fast, affordable, and
          eco-friendly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 text-white rounded-full font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
            style={{
              backgroundColor: "#679976",
              boxShadow: "0 0 20px rgba(103, 153, 118, 0.4)"
            }}
          >
            Get a Quote <ArrowRight className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="#gallery"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 rounded-full font-bold text-lg transition-all"
            style={{
              borderColor: "#679976",
              color: "#679976"
            }}
          >
            See Our Work
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6" style={{ color: "#679976" }} />
        </motion.div>
      </div>
    </section>
  )
}

function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })

  const stats = [
    { label: "Tons Removed", value: "5000+" },
    { label: "Years in Service", value: "15+" },
    { label: "Happy Customers", value: "2000+" },
    { label: "Cities Served", value: "50+" },
  ]

  return (
    <section id="about" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "rgba(103, 153, 118, 0.05)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, #679976 0%, #be6a07 100%)`
              }}
            >About</span> Clean Port
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We're committed to transforming spaces and protecting the environment through responsible junk removal.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.8 }}
            className="relative h-96 rounded-2xl overflow-hidden"
            style={{ background: `linear-gradient(135deg, rgba(103, 153, 118, 0.2) 0%, rgba(190, 106, 7, 0.2) 100%)` }}
          >
            <Image
              src="https://images.pexels.com/photos/29879066/pexels-photo-29879066.jpeg"
              alt="Junk removal and waste management"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(90deg, #679976 0%, #be6a07 100%)`
                }}
              >Our</span> Mission
            </h3>
            <p className="text-gray-400 leading-relaxed">
              At Clean Port, we believe every space deserves a fresh start. Our team of professionals is dedicated to
              providing fast, reliable, and eco-friendly junk removal services that exceed expectations.
            </p>
            <p className="text-gray-400 leading-relaxed">
              We handle everything from residential cleanouts to commercial demolition, always prioritizing
              sustainability and customer satisfaction.
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 text-center backdrop-blur-sm"
              style={{ border: "1px solid rgba(103, 153, 118, 0.2)" }}
            >
              <motion.div
                className="text-3xl font-bold mb-2"
                style={{ color: "#679976" }}
              >
                <CounterComponent target={parseInt(stat.value)} label={stat.label} isInView={isInView} />
              </motion.div>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CounterComponent({ target, label, isInView }: { target: number; label: string; isInView: boolean }) {
  const [count, setCount] = useState(0)
  const [isActive, setIsActive] = useState(isInView)
  const countRef = useRef<NodeJS.Timeout | null>(null)
  const pauseRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isInView) {
      setCount(0)
      setIsActive(false)
      if (countRef.current) clearInterval(countRef.current)
      if (pauseRef.current) clearTimeout(pauseRef.current)
      return
    }

    if (!isActive) {
      setIsActive(true)
    }
  }, [isInView])

  useEffect(() => {
    if (!isActive) return

    if (count < target) {
      countRef.current = setInterval(() => {
        setCount((prev) => {
          const newCount = prev + Math.ceil(target / 30)
          return newCount >= target ? target : newCount
        })
      }, 50)

      return () => {
        if (countRef.current) clearInterval(countRef.current)
      }
    } else {
      // Pause for 3 seconds, then restart
      pauseRef.current = setTimeout(() => {
        setCount(0)
        setIsActive(true)
      }, 3000)

      return () => {
        if (pauseRef.current) clearTimeout(pauseRef.current)
      }
    }
  }, [count, target, isActive])

  const displayValue = label.includes("Tons") ? `${count}+` : label.includes("Years") ? `${count}+` : label.includes("Customers") ? `${count}+` : `${count}+`

  return <div>{displayValue}</div>
}

function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })

  const services = [
    {
      icon: Trash2,
      title: "Junk Removal",
      description: "Fast and efficient removal of household and commercial junk. We handle it all.",
      price: "From $99",
    },
    {
      icon: Zap,
      title: "Demolition",
      description: "Professional demolition services for structures and renovations. Safe and certified.",
      price: "Custom Quote",
    },
    {
      icon: Truck,
      title: "Moving Services",
      description: "Full-service moving assistance with careful handling of your belongings.",
      price: "From $149",
    },
  ]

  return (
    <section id="services" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, #679976 0%, #be6a07 100%)`
              }}
            >Our</span> Services
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Comprehensive solutions for all your junk removal and space transformation needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={i}
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(103, 153, 118, 0.2)" }}
                className="bg-card rounded-2xl p-8 backdrop-blur-sm transition-all group"
                style={{ border: "1px solid rgba(103, 153, 118, 0.2)" }}
              >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-all"
                  style={{
                    backgroundImage: `linear-gradient(135deg, #679976 0%, #be6a07 100%)`,
                    boxShadow: "0 0 20px rgba(103, 153, 118, 0.3)"
                  }}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold" style={{ color: "#679976" }}>{service.price}</span>
                  <motion.div whileHover={{ x: 5 }}>
                    <ArrowRight className="w-5 h-5" style={{ color: "#679976" }} />
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function GallerySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })

  const galleryItems = [
    { id: 1, title: "Residential Cleanup", category: "Junk Removal", image: "https://images.pexels.com/photos/29879066/pexels-photo-29879066.jpeg" },
    { id: 2, title: "Commercial Demolition", category: "Demolition", image: "https://images.pexels.com/photos/15861727/pexels-photo-15861727.jpeg" },
    { id: 3, title: "Moving Assistance", category: "Moving", image: "https://images.pexels.com/photos/20706509/pexels-photo-20706509.jpeg" },
    { id: 4, title: "Estate Cleanout", category: "Junk Removal", image: "https://images.pexels.com/photos/6995367/pexels-photo-6995367.jpeg" },
    { id: 5, title: "Construction Debris", category: "Demolition", image: "https://images.pexels.com/photos/15861727/pexels-photo-15861727.jpeg" },
    { id: 6, title: "Office Relocation", category: "Moving", image: "https://images.pexels.com/photos/20706509/pexels-photo-20706509.jpeg" },
  ]

  return (
    <section id="gallery" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "rgba(103, 153, 118, 0.05)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, #679976 0%, #be6a07 100%)`
              }}
            >Our</span> Work
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            See the transformations we've made for our satisfied customers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="relative h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl overflow-hidden cursor-pointer group"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:brightness-110 transition-all"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex flex-col justify-end p-6"
              >
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.category}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      content: "Clean Port made my estate cleanout so easy. Professional, fast, and fair pricing!",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Business Owner",
      content: "Best demolition service in the area. They handled our office renovation perfectly.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Property Manager",
      content: "Reliable, punctual, and thorough. We use them for all our properties now.",
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            What <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, #679976 0%, #be6a07 100%)`
              }}
            >Our Customers</span> Say
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Join thousands of satisfied customers across Oregon and Washington.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-card rounded-2xl p-8 backdrop-blur-sm"
              style={{ borderColor: "rgba(103, 153, 118, 0.2)", border: "1px solid rgba(103, 153, 118, 0.2)" }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-[#679976]" style={{ color: "#679976" }} />
                ))}
              </div>
              <p className="text-gray-400 mb-6 italic">"{testimonial.content}"</p>
              <div>
                <p className="font-bold text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })

  const pricingTiers = [
    {
      name: "Small Load",
      price: "$99",
      description: "Perfect for small cleanups",
      features: ["Up to 1 truck load", "Same-day service", "Basic disposal"],
    },
    {
      name: "Medium Load",
      price: "$249",
      description: "Most popular option",
      features: ["Up to 2 truck loads", "Priority scheduling", "Eco-friendly disposal", "Free consultation"],
      highlighted: true,
    },
    {
      name: "Full Cleanout",
      price: "Custom",
      description: "Complete space transformation",
      features: ["Unlimited loads", "Dedicated crew", "Recycling focus", "Free estimate"],
    },
  ]

  return (
    <section id="pricing" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "rgba(103, 153, 118, 0.05)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, #679976 0%, #be6a07 100%)`
              }}
            >Simple, Transparent</span> Pricing
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            No hidden fees. No surprises. Just honest pricing for quality service.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="rounded-2xl p-8 backdrop-blur-sm transition-all"
              style={tier.highlighted ? {
                backgroundImage: `linear-gradient(135deg, rgba(103, 153, 118, 0.15) 0%, rgba(190, 106, 7, 0.15) 100%)`,
                borderColor: "#679976",
                boxShadow: "0 0 30px rgba(103, 153, 118, 0.2)"
              } : {}}
            >
              <h3 className="text-2xl font-bold mb-2 text-white">{tier.name}</h3>
              <p className="text-gray-400 mb-6">{tier.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{tier.price}</span>
                {tier.price !== "Custom" && <span className="text-gray-400 ml-2">+ tax</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#679976" }} />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 rounded-lg font-semibold transition-all text-white"
                style={tier.highlighted ? {
                  backgroundColor: "#679976",
                  boxShadow: "0 0 20px rgba(103, 153, 118, 0.4)"
                } : {
                  border: "1px solid #679976",
                  color: "#679976"
                }}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <section id="contact" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            Get Your Free <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, #679976 0%, #be6a07 100%)`
              }}
            >Quote</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Contact us today for a no-obligation estimate. We're here to help!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(103, 153, 118, 0.2)" }}>
                <Phone className="w-6 h-6" style={{ color: "#679976" }} />
              </div>
              <div>
                <h3 className="font-bold mb-1 text-white">Phone</h3>
                <a href="tel:+15551234567" className="text-gray-400 hover:text-white transition-colors" style={{ color: "#999999" }}>
                  (555) 123-4567
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(103, 153, 118, 0.2)" }}>
                <MapPin className="w-6 h-6" style={{ color: "#679976" }} />
              </div>
              <div>
                <h3 className="font-bold mb-1 text-white">Service Areas</h3>
                <p className="text-gray-400">Oregon & Washington</p>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 backdrop-blur-sm" style={{ border: "1px solid rgba(103, 153, 118, 0.2)" }}>
              <h3 className="font-bold mb-4 text-white">Why Choose Clean Port?</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-2">
                  <span style={{ color: "#679976" }}>✓</span> Licensed & Insured
                </li>
                <li className="flex gap-2">
                  <span style={{ color: "#679976" }}>✓</span> Eco-Friendly Disposal
                </li>
                <li className="flex gap-2">
                  <span style={{ color: "#679976" }}>✓</span> Same-Day Service Available
                </li>
                <li className="flex gap-2">
                  <span style={{ color: "#679976" }}>✓</span> Transparent Pricing
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-card border border-accent/20 rounded-lg focus:outline-none transition-colors text-white"
                style={{ borderColor: "rgba(103, 153, 118, 0.3)" }}
                onFocus={(e) => e.target.style.borderColor = "#679976"}
                onBlur={(e) => e.target.style.borderColor = "rgba(103, 153, 118, 0.3)"}
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-card border border-accent/20 rounded-lg focus:outline-none transition-colors text-white"
                style={{ borderColor: "rgba(103, 153, 118, 0.3)" }}
                onFocus={(e) => e.target.style.borderColor = "#679976"}
                onBlur={(e) => e.target.style.borderColor = "rgba(103, 153, 118, 0.3)"}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-card border border-accent/20 rounded-lg focus:outline-none transition-colors text-white"
                style={{ borderColor: "rgba(103, 153, 118, 0.3)" }}
                onFocus={(e) => e.target.style.borderColor = "#679976"}
                onBlur={(e) => e.target.style.borderColor = "rgba(103, 153, 118, 0.3)"}
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white">Service Type</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-3 bg-card border border-accent/20 rounded-lg focus:outline-none transition-colors text-white"
                style={{ borderColor: "rgba(103, 153, 118, 0.3)" }}
              >
                <option value="">Select a service</option>
                <option value="junk-removal">Junk Removal</option>
                <option value="demolition">Demolition</option>
                <option value="moving">Moving Services</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-card border border-accent/20 rounded-lg focus:outline-none transition-colors resize-none text-white"
                style={{ borderColor: "rgba(103, 153, 118, 0.3)" }}
                placeholder="Tell us about your project..."
                rows={4}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-4 text-white rounded-lg font-bold text-lg transition-all"
              style={{
                backgroundColor: "#679976",
                boxShadow: "0 0 20px rgba(103, 153, 118, 0.4)"
              }}
            >
              Get Your Free Quote
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-background border-t border-accent/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundImage: `linear-gradient(135deg, #679976 0%, #be6a07 100%)` }}>
                <Trash2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white">Clean Port</span>
            </div>
            <p className="text-sm text-gray-400">Bringing your space back to life!</p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Junk Removal
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Demolition
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Moving
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="tel:+15551234567" className="hover:text-white transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li>Oregon & Washington</li>
              <li>Licensed & Insured</li>
            </ul>
          </div>
        </div>

        <motion.div
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          className="h-1 mb-8 origin-left"
          style={{
            backgroundImage: `linear-gradient(90deg, #679976 0%, #be6a07 100%)`
          }}
        />

        <div className="text-center text-sm text-gray-400">
          <p>&copy; 2025 Clean Port Junk Removal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
