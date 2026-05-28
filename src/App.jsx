import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  Code2, GraduationCap, Briefcase, Phone, MapPin, Mail,
  Github, Globe, ChevronDown, ExternalLink, Star, Sparkles,
  Layers, ShoppingCart, Wrench, BarChart3, FileText, Palette,
  ArrowUp, Menu, X, Heart, Coffee, Zap, Target, Award, Monitor,
  Send, CheckCircle, AlertCircle, Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

// ===== PARTICLE BACKGROUND =====
function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const particles = []
    const particleCount = 60

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(236, 72, 153, ${p.opacity})`
        ctx.fill()

        // Draw connections
        particles.forEach((p2, j) => {
          if (i === j) return
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(236, 72, 153, ${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}

// ===== ANIMATED SECTION WRAPPER =====
function AnimatedSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ===== SECTION HEADING =====
function SectionHeading({ title, subtitle, icon: Icon }) {
  return (
    <AnimatedSection className="text-center mb-16">
      <motion.div
        className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
        whileHover={{ scale: 1.05 }}
      >
        <Icon className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-primary">{subtitle}</span>
      </motion.div>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{title}</h2>
      <div className="w-20 h-1 bg-gradient-to-r from-primary via-pink-400 to-rose-400 mx-auto rounded-full" />
    </AnimatedSection>
  )
}

// ===== NAVBAR =====
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl shadow-lg border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.a
            href="#home"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <img src="/kt-logo.png" alt="KT Logo" className="w-8 h-8 rounded-full object-cover" />
            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">KT.</span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-primary/10"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/50"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary rounded-lg hover:bg-primary/5"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// ===== HERO SECTION =====
function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const roles = ['Full Stack Developer', 'React Developer', 'Web Designer', 'UI/UX Enthusiast']
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timeout

    if (!isDeleting && displayedText.length < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length + 1))
      }, 80)
    } else if (!isDeleting && displayedText.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(displayedText.slice(0, -1))
      }, 40)
    } else if (isDeleting && displayedText.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % roles.length)
      }, 50)
    }

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, roleIndex])

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-pink-500/5 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-rose-500/5 blur-3xl" />

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="w-36 h-36 md:w-44 md:h-44 rounded-full mx-auto mb-8 relative overflow-hidden border-4 border-primary/30 animate-pulse-glow"
        >
          <img
            src="/profile-photo.png"
            alt="K. Thamizharasi - Full Stack Developer"
            className="w-full h-full object-cover object-top"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="text-primary font-medium text-lg mb-2">Hello, I&apos;m</p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground mb-4">
            K. <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-orange-400 bg-clip-text text-transparent">Thamizharasi</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-8"
        >
          <div className="text-xl md:text-2xl text-muted-foreground font-light">
            <span>{displayedText}</span>
            <span className="inline-block w-0.5 h-6 bg-primary ml-1 animate-pulse" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          <Badge variant="secondary" className="px-3 py-1.5 text-sm gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> Chennai, India
          </Badge>
          <Badge variant="secondary" className="px-3 py-1.5 text-sm gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Open to Work
          </Badge>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button size="lg" className="gap-2 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white shadow-lg shadow-pink-500/25" asChild>
            <a href="#projects">
              <ExternalLink className="w-4 h-4" /> View Projects
            </a>
          </Button>
          <Button size="lg" variant="outline" className="gap-2 border-primary/30 hover:bg-primary/5" asChild>
            <a href="#contact">
              <Phone className="w-4 h-4" /> Contact Me
            </a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ===== ABOUT SECTION =====
function AboutSection() {
  const stats = [
    { icon: Code2, label: 'Years Coding', value: '5+' },
    { icon: Layers, label: 'Projects Built', value: '6+' },
    { icon: Award, label: 'Technologies', value: '8+' },
    { icon: Heart, label: 'Happy Clients', value: '3+' },
  ]

  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="About Me" subtitle="Get to Know Me" icon={Heart} />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <div className="relative">
              <div className="w-full aspect-square max-w-md mx-auto rounded-2xl bg-gradient-to-br from-pink-500/10 via-rose-500/10 to-orange-400/10 border border-primary/20 p-8 relative overflow-hidden">
                <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-pink-500/10 blur-xl" />
                <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full bg-rose-500/10 blur-xl" />
                <div className="h-full flex flex-col items-center justify-center text-center space-y-5">
                  <div className="w-32 h-32 rounded-full overflow-hidden shadow-xl border-2 border-primary/20">
                    <img src="/profile-photo.png" alt="K. Thamizharasi" className="w-full h-full object-cover object-top" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">K. Thamizharasi</h3>
                    <p className="text-primary font-medium">Full Stack Developer</p>
                  </div>
                  <div className="flex gap-3">
                    <a href="https://github.com/thamizharasidsm-alt" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                      <Github className="w-5 h-5 text-primary" />
                    </a>
                    <a href="mailto:thamizharasidsm@gmail.com" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                      <Mail className="w-5 h-5 text-primary" />
                    </a>
                    <a href="#projects" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                      <Globe className="w-5 h-5 text-primary" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">
                Passionate about creating <span className="text-primary">beautiful</span> web experiences
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I&apos;m K. Thamizharasi, a passionate full stack developer from Ramanathapuram, currently based in Chennai.
                With a strong foundation in web technologies and a keen eye for design, I specialize in building
                responsive, interactive, and end-to-end web applications. My journey into IT started after gaining valuable
                professional experience in the manufacturing sector, which gave me unique problem-solving skills,
                leadership qualities, and a strong work ethic that I bring to every project.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I completed my higher secondary schooling in 2012-2014 and graduated with a B.Tech in Information Technology
                from V.P.M.M. Engineering College, Srivilliputhur in 2018. After working at MAE in Oragadam for a year,
                I transitioned into full stack web development and have since built multiple projects using modern
                technologies like React, JavaScript, and more. I thrive on turning creative ideas into functional,
                pixel-perfect web applications from frontend to backend.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Badge className="bg-pink-500/10 text-pink-700 border-pink-500/20 hover:bg-pink-500/20 gap-1">
                  <Coffee className="w-3 h-3" /> Problem Solver
                </Badge>
                <Badge className="bg-rose-500/10 text-rose-700 border-rose-500/20 hover:bg-rose-500/20 gap-1">
                  <Zap className="w-3 h-3" /> Quick Learner
                </Badge>
                <Badge className="bg-orange-400/10 text-orange-700 border-orange-400/20 hover:bg-orange-400/20 gap-1">
                  <Target className="w-3 h-3" /> Detail Oriented
                </Badge>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {stats.map((stat, index) => (
            <AnimatedSection key={stat.label} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="text-center p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ===== EDUCATION SECTION =====
function EducationSection() {
  const educationData = [
    {
      period: '2012 - 2014',
      title: 'Higher Secondary Education',
      description: 'Completed higher secondary schooling with a strong academic foundation. Developed an early interest in technology and problem-solving that would later inspire the transition into the IT field. Built a solid base in mathematics and science that supported future technical pursuits.',
      icon: GraduationCap,
      color: 'from-pink-500 to-pink-600',
    },
    {
      period: '2014 - 2018',
      title: 'B.Tech (IT) - V.P.M.M. Engineering College, Srivilliputhur',
      description: 'Pursued B.Tech in Information Technology at V.P.M.M. Engineering College in Srivilliputhur. Gained in-depth knowledge of programming, database management, software engineering, and web technologies. This four-year period laid the groundwork for understanding core IT concepts and nurturing a passion for full stack web development.',
      icon: GraduationCap,
      color: 'from-rose-500 to-pink-500',
    },
    {
      period: 'Post 2018',
      title: 'Self-Learning & Skill Development',
      description: 'After college, dedicated time to self-learning web technologies including HTML, CSS, JavaScript, React, Git, and GitHub. Built hands-on projects to solidify skills and demonstrate practical proficiency in full stack development, from frontend interfaces to backend logic.',
      icon: Code2,
      color: 'from-orange-400 to-rose-500',
    },
  ]

  return (
    <section id="education" className="py-20 md:py-28 relative bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Education" subtitle="My Learning Journey" icon={GraduationCap} />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/10 md:-translate-x-0.5" />

          {educationData.map((item, index) => (
            <AnimatedSection key={item.period} delay={index * 0.15}>
              <div className={`relative flex items-start gap-6 mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}>
                {/* Timeline dot */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`absolute left-5 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg z-10`}
                >
                  <item.icon className="w-5 h-5 text-white" />
                </motion.div>

                {/* Content card */}
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:pr-4' : 'md:pl-4'}`}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all"
                  >
                    <Badge variant="secondary" className="mb-3 bg-primary/10 text-primary border-primary/20">
                      {item.period}
                    </Badge>
                    <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </motion.div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ===== EXPERIENCE SECTION =====
function ExperienceSection() {
  return (
    <section id="experience" className="py-20 md:py-28 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Work Experience" subtitle="Professional Journey" icon={Briefcase} />

        <AnimatedSection>
          <motion.div
            whileHover={{ y: -5 }}
            className="relative p-8 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-xl transition-all overflow-hidden"
          >
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-pink-500/5 to-transparent rounded-bl-full" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg"
                  >
                    <Briefcase className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">MAE - Manufacturing Company, Oragadam</h3>
                    <p className="text-primary font-medium">Professional Experience</p>
                  </div>
                </div>
                <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/20">
                  1 Year
                </Badge>
              </div>

              <div className="space-y-3 text-muted-foreground">
                <p className="leading-relaxed">
                  Worked for one year at MAE, a manufacturing company located in Oragadam, Chennai. This experience
                  was instrumental in developing strong professional skills, most importantly leadership quality and
                  adaptability. Leading small teams and coordinating tasks in a fast-paced industrial environment
                  taught me how to take ownership and drive results under pressure.
                </p>
                <p className="leading-relaxed">
                  The adaptability I developed during this period has been the cornerstone of my career transition
                  into full stack development. Learning to quickly adjust to new processes, technologies, and team
                  dynamics gave me the confidence and resilience to pivot from manufacturing to IT. This experience
                  shaped my ability to learn rapidly and embrace change as an opportunity for growth.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                <Badge variant="secondary" className="gap-1"><Star className="w-3 h-3" />Leadership</Badge>
                <Badge variant="secondary" className="gap-1"><Zap className="w-3 h-3" />Adaptability</Badge>
                <Badge variant="secondary" className="gap-1"><Target className="w-3 h-3" />Time Management</Badge>
                <Badge variant="secondary" className="gap-1"><Heart className="w-3 h-3" />Work Ethics</Badge>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>

        {/* Career Transition Banner */}
        <AnimatedSection delay={0.2}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-orange-400/10 border border-primary/20 text-center"
          >
            <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
            <h4 className="text-lg font-bold text-foreground mb-2">Career Transition</h4>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From manufacturing to full stack development &mdash; driven by passion, powered by perseverance.
              Leadership and adaptability from MAE became the foundation for my tech journey.
              Now building beautiful, functional web applications from frontend to backend.
            </p>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// ===== SKILLS SECTION =====
function SkillsSection() {
  const skills = [
    { name: 'HTML5', level: 90, icon: Code2, color: 'from-orange-500 to-red-500' },
    { name: 'CSS3', level: 85, icon: Palette, color: 'from-blue-500 to-cyan-500' },
    { name: 'JavaScript', level: 80, icon: Code2, color: 'from-yellow-500 to-amber-500' },
    { name: 'React.js', level: 75, icon: Layers, color: 'from-cyan-500 to-blue-500' },
    { name: 'Git', level: 70, icon: Github, color: 'from-gray-600 to-gray-800' },
    { name: 'GitHub', level: 70, icon: Github, color: 'from-purple-500 to-violet-500' },
  ]

  const additionalSkills = [
    { name: 'Responsive Design', icon: Monitor },
    { name: 'CSS Animations', icon: Sparkles },
    { name: 'DOM Manipulation', icon: Code2 },
    { name: 'React Hooks', icon: Layers },
    { name: 'Version Control', icon: Github },
    { name: 'Web Forms', icon: FileText },
  ]

  return (
    <section id="skills" className="py-20 md:py-28 relative bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Skills & Technologies" subtitle="What I Work With" icon={Code2} />

        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <AnimatedSection key={skill.name} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -3 }}
                className="p-5 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center shadow-sm`}>
                    <skill.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-foreground text-sm">{skill.name}</span>
                      <span className="text-xs text-muted-foreground font-medium">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Additional Skills */}
        <AnimatedSection delay={0.4}>
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-6">Also Familiar With</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {additionalSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge variant="outline" className="px-4 py-2 text-sm gap-2 cursor-pointer hover:bg-primary/5 hover:border-primary/30 transition-all">
                    <skill.icon className="w-3.5 h-3.5 text-primary" />
                    {skill.name}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// ===== PROJECTS SECTION =====
function ProjectsSection() {
  const projects = [
    {
      title: 'Bakery Website',
      description: 'A delightful bakery website featuring mouth-watering product showcases, menu cards, online ordering interface, and a warm inviting design. Built with smooth animations and a responsive layout.',
      tech: ['HTML5', 'CSS3', 'JavaScript'],
      icon: Coffee,
      color: 'from-amber-500 to-orange-600',
      category: 'Food & Beverage',
      link: 'https://thamizharasidsm-alt.github.io/Project_Bakery/',
      image: '/project-bakery.png',
    },
    {
      title: 'Aari Work Website',
      description: 'An elegant and visually stunning website showcasing Aari embroidery artistry. Features a beautiful image gallery, service listings, customer testimonials, and an inquiry form.',
      tech: ['HTML5', 'CSS3', 'JavaScript'],
      icon: Palette,
      color: 'from-pink-500 to-rose-600',
      category: 'Art & Craft',
      link: 'https://thamizharasidsm-alt.github.io/Aariwork-Repo/',
      image: '/project-aari.png',
    },
    {
      title: 'Construction Website',
      description: 'A professional, modern website for a construction company featuring responsive layouts, project galleries, service sections, and contact forms with smooth scrolling.',
      tech: ['HTML5', 'CSS3', 'JavaScript'],
      icon: Wrench,
      color: 'from-pink-500 to-rose-600',
      category: 'Business',
      link: 'https://thamizharasidsm-alt.github.io/Project_Constructions/',
      image: '/project-construction.png',
    },
    {
      title: 'Electronics Website',
      description: 'A sleek electronics e-commerce website with product catalogs, category filters, detailed specifications, and a modern shopping interface with dynamic filtering.',
      tech: ['HTML5', 'CSS3', 'JavaScript'],
      icon: Layers,
      color: 'from-blue-500 to-cyan-600',
      category: 'E-Commerce',
      link: 'https://thamizharasidsm-alt.github.io/electronics/',
      image: '/project-electronics.png',
    },
    {
      title: 'Toy Shop Website',
      description: 'A fun and colorful toy shop website designed with playful animations, product categories, age-group filters, and an engaging shopping experience.',
      tech: ['HTML5', 'CSS3', 'JavaScript'],
      icon: Star,
      color: 'from-violet-500 to-purple-600',
      category: 'E-Commerce',
      link: 'https://thamizharasidsm-alt.github.io/toy-shop/',
      image: '/project-toyshop.png',
    },
    {
      title: 'Restaurant Website',
      description: 'A sophisticated restaurant website with an appetizing menu display, reservation system, chef profiles, and gallery section with elegant typography.',
      tech: ['HTML5', 'CSS3', 'JavaScript'],
      icon: ShoppingCart,
      color: 'from-red-500 to-rose-600',
      category: 'Food & Beverage',
      link: 'https://thamizharasidsm-alt.github.io/restaurent/',
      image: '/project-restaurant.png',
    },
  ]

  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="My Projects" subtitle="What I&apos;ve Built" icon={Layers} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <AnimatedSection key={project.title} delay={index * 0.1}>
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -8, scale: 1.02 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="block h-full rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all relative overflow-hidden group cursor-pointer"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Dark gradient overlay on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Category badge on image */}
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="text-xs bg-white/90 backdrop-blur-sm text-foreground border-0">
                      {project.category}
                    </Badge>
                  </div>
                  {/* Icon on image */}
                  <div className="absolute bottom-3 left-3">
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg`}
                    >
                      <project.icon className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>
                  {/* Hover overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === index ? 0.15 : 0 }}
                    className={`absolute inset-0 bg-gradient-to-br ${project.color}`}
                  />
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((t) => (
                      <Badge key={t} variant="outline" className="text-xs px-2 py-0.5">
                        {t}
                      </Badge>
                    ))}
                  </div>

                  {/* Visit link */}
                  <div className="flex items-center gap-1.5 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Globe className="w-3.5 h-3.5" />
                    <span>View Live Project</span>
                    <motion.span
                      animate={hoveredIndex === index ? { x: [0, 4, 0] } : {}}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </div>
                </div>
              </motion.a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ===== CONTACT SECTION =====
function ContactSection() {
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'thamizharasidsm@gmail.com',
      href: 'mailto:thamizharasidsm@gmail.com',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '9677251802',
      href: 'tel:9677251802',
      color: 'from-orange-400 to-amber-500',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Chennai, Tamil Nadu',
      href: '#',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: MapPin,
      label: 'Native',
      value: 'Ramanathapuram, Tamil Nadu',
      href: '#',
      color: 'from-pink-500 to-rose-500',
    },
  ]

  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState('idle')

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setFormStatus('sending')

    try {
      // Submit directly to FormSubmit.co from the browser (bypasses Cloudflare bot protection)
      // Uses hidden iframe so the page doesn't navigate away
      const iframeName = 'formsubmit-iframe'
      let iframe = document.getElementById(iframeName)
      if (!iframe) {
        iframe = document.createElement('iframe')
        iframe.id = iframeName
        iframe.name = iframeName
        iframe.style.display = 'none'
        document.body.appendChild(iframe)
      }

      // Create a hidden form and submit it to FormSubmit.co in the iframe
      const hiddenForm = document.createElement('form')
      hiddenForm.method = 'POST'
      hiddenForm.action = 'https://formsubmit.co/thamizharasidsm@gmail.com'
      hiddenForm.target = iframeName

      const fields = {
        name: formState.name,
        email: formState.email,
        message: formState.message,
        _subject: `Portfolio Contact: Message from ${formState.name}`,
        _template: 'table',
        _captcha: 'false',
        _next: window.location.href,
      }

      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = value
        hiddenForm.appendChild(input)
      })

      document.body.appendChild(hiddenForm)
      hiddenForm.submit()
      document.body.removeChild(hiddenForm)

      // Give FormSubmit time to process, then show success
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setFormStatus('success')
      setFormState({ name: '', email: '', message: '' })
    } catch (err) {
      // Fallback: open mailto link
      const subject = encodeURIComponent(`Portfolio Contact from ${formState.name}`)
      const body = encodeURIComponent(
        `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
      )
      window.open(`mailto:thamizharasidsm@gmail.com?subject=${subject}&body=${body}`, '_blank')
      setFormStatus('success')
      setFormState({ name: '', email: '', message: '' })
    }

    setTimeout(() => setFormStatus('idle'), 5000)
  }, [formState])

  return (
    <section id="contact" className="py-20 md:py-28 relative bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Get In Touch" subtitle="Let's Connect" icon={Phone} />

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <AnimatedSection>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">
                Let&apos;s work <span className="text-primary">together</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part
                of your vision. Feel free to reach out through any of the channels below or drop me a message!
              </p>

              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all group"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-sm`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
                      <p className="text-foreground font-semibold group-hover:text-primary transition-colors">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection delay={0.2}>
            <motion.form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl bg-card border border-border/50 shadow-sm"
            >
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Your Name</label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Write your message..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
                    required
                  />
                </div>
                <AnimatePresence mode="wait">
                  {formStatus === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="w-full py-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5 text-rose-600" />
                      <span className="text-rose-600 font-medium">Message Sent Successfully!</span>
                    </motion.div>
                  ) : formStatus === 'error' ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="w-full py-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center gap-2"
                    >
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span className="text-red-600 font-medium">Failed to send. Please try again.</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="button"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Button
                        type="submit"
                        disabled={formStatus === 'sending'}
                        className="w-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white shadow-lg shadow-pink-500/25 gap-2 py-3 disabled:opacity-70"
                      >
                        {formStatus === 'sending' ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" /> Send Message
                          </>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

// ===== FOOTER =====
function Footer() {
  return (
    <footer className="py-8 border-t border-border/50 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">KT.</span>
            <span className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} K. Thamizharasi
            </span>
          </div>
          <div className="flex items-center gap-4">
            <motion.p
              className="text-sm text-muted-foreground flex items-center gap-1"
              whileHover={{ scale: 1.02 }}
            >
              Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> in Chennai
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ===== BACK TO TOP =====
function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-lg shadow-pink-500/25 flex items-center justify-center z-40"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// ===== MAIN APP =====
export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50/50 via-white to-rose-50/50">
      <ParticleBackground />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
