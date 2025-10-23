"use client"

import type React from "react"
import Image from "next/image"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Menu, X, Phone, MapPin, Zap, Trash2, Truck, ArrowRight, Star, ChevronDown } from "lucide-react"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="bg-background text-foreground overflow-hidden">
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
    </div>
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
              whileHover={{ color: "#22c55e" }}
              className="text-sm font-medium hover:text-primary transition-colors"
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
          className="hidden sm:flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
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
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="tel:+15551234567"
            className="block bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold text-center"
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
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/10 -z-10" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute top-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute bottom-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl -z-10"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
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
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold mb-4">
            ✨ Professional Junk Removal
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl font-bold mb-6 text-balance"
        >
          Bringing Your Space{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Back to Life!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
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
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 197, 94, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            Get a Quote <ArrowRight className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="#gallery"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-primary text-primary rounded-full font-bold text-lg hover:bg-primary/10 transition-all"
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
          <ChevronDown className="w-6 h-6 text-primary" />
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
    <section id="about" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-accent/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">About Clean Port</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to transforming spaces and protecting the environment through responsible junk removal.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.8 }}
            className="relative h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Truck className="w-32 h-32 text-primary/40" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              At Clean Port, we believe every space deserves a fresh start. Our team of professionals is dedicated to
              providing fast, reliable, and eco-friendly junk removal services that exceed expectations.
            </p>
            <p className="text-muted-foreground leading-relaxed">
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
              className="bg-card border border-accent/20 rounded-xl p-6 text-center backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                className="text-3xl font-bold text-primary mb-2"
              >
                {stat.value}
              </motion.div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
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
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.2)" }}
                className="bg-card border border-accent/20 rounded-2xl p-8 backdrop-blur-sm hover:border-primary/50 transition-all group"
              >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-primary/50 transition-all"
                >
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-semibold">{service.price}</span>
                  <motion.div whileHover={{ x: 5 }}>
                    <ArrowRight className="w-5 h-5 text-primary" />
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
    { id: 1, title: "Residential Cleanup", category: "Junk Removal" },
    { id: 2, title: "Commercial Demolition", category: "Demolition" },
    { id: 3, title: "Moving Assistance", category: "Moving" },
    { id: 4, title: "Estate Cleanout", category: "Junk Removal" },
    { id: 5, title: "Construction Debris", category: "Demolition" },
    { id: 6, title: "Office Relocation", category: "Moving" },
  ]

  return (
    <section id="gallery" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-accent/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Our Work</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
              <div className="absolute inset-0 flex items-center justify-center">
                <Trash2 className="w-16 h-16 text-primary/30 group-hover:text-primary/50 transition-colors" />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex flex-col justify-end p-6"
              >
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.category}</p>
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
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
              className="bg-card border border-accent/20 rounded-2xl p-8 backdrop-blur-sm"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
              <div>
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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
    <section id="pricing" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-accent/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
              className={`rounded-2xl p-8 backdrop-blur-sm transition-all ${
                tier.highlighted
                  ? "bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary shadow-lg shadow-primary/20"
                  : "bg-card border border-accent/20"
              }`}
            >
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <p className="text-muted-foreground mb-6">{tier.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">{tier.price}</span>
                {tier.price !== "Custom" && <span className="text-muted-foreground ml-2">+ tax</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  tier.highlighted
                    ? "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/50"
                    : "border border-primary text-primary hover:bg-primary/10"
                }`}
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
    // Handle form submission
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
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Get Your Free Quote</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Phone</h3>
                <a href="tel:+15551234567" className="text-muted-foreground hover:text-primary transition-colors">
                  (555) 123-4567
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Service Areas</h3>
                <p className="text-muted-foreground">Oregon & Washington</p>
              </div>
            </div>

            <div className="bg-card border border-accent/20 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="font-bold mb-4">Why Choose Clean Port?</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">✓</span> Licensed & Insured
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span> Eco-Friendly Disposal
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span> Same-Day Service Available
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span> Transparent Pricing
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
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-card border border-accent/20 rounded-lg focus:outline-none focus:border-primary transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-card border border-accent/20 rounded-lg focus:outline-none focus:border-primary transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-card border border-accent/20 rounded-lg focus:outline-none focus:border-primary transition-colors"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Service Type</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-3 bg-card border border-accent/20 rounded-lg focus:outline-none focus:border-primary transition-colors"
              >
                <option value="">Select a service</option>
                <option value="junk-removal">Junk Removal</option>
                <option value="demolition">Demolition</option>
                <option value="moving">Moving Services</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-card border border-accent/20 rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="Tell us about your project..."
                rows={4}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 197, 94, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:shadow-lg transition-all"
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
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold">Clean Port</span>
            </div>
            <p className="text-sm text-muted-foreground">Bringing your space back to life!</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#services" className="hover:text-primary transition-colors">
                  Junk Removal
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-primary transition-colors">
                  Demolition
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-primary transition-colors">
                  Moving
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#about" className="hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-primary transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="tel:+15551234567" className="hover:text-primary transition-colors">
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
          className="h-1 bg-gradient-to-r from-primary to-accent mb-8 origin-left"
        />

        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Clean Port Junk Removal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
