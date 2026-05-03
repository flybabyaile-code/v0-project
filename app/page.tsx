"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, Twitter, Send, Mail, FileText, ChevronDown, Zap, Shield, TrendingUp, Users, Coins, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Translations
const translations = {
  en: {
    nav: {
      about: "About",
      mechanism: "Mechanism",
      tokenomics: "Tokenomics",
      community: "Community",
    },
    hero: {
      badge: "BSC Meme Value Model",
      title1: "Positive Flywheel",
      title2: "Community Token",
      desc: "KNIGHTS builds a self-reinforcing economic system based on dividend support, liquidity enhancement, and community-driven growth engine.",
      whitepaper: "Read Whitepaper",
      totalSupply: "Total Supply",
      tax: "Transaction Tax",
      transparent: "On-Chain Transparent",
      learnMore: "Learn More",
    },
    about: {
      badge: "PROJECT OVERVIEW",
      title: "Building a Self-Reinforcing On-Chain Economic System",
      desc: "KNIGHTS is not a short-term emotional coin, but builds a positive flywheel structure: Trading = Income, Holding = Dividends, Circulation = Growth.",
      flywheel: "Positive Flywheel",
      flywheelDesc: "Sustained self-reinforcing system",
      fair: "Fair & Transparent",
      fairDesc: "All distributions on-chain",
    },
    mechanism: {
      badge: "CORE MECHANISM",
      title: "3% Transaction Tax Allocation",
      desc: "Every transaction collects 3% tax, allocated according to the following structure",
      dividends: {
        title: "Holder Dividends",
        features: [
          "All taxes auto-convert to BNB dividends",
          "Hold 100,000+ KNIGHTS to participate",
          "Trigger-based auto distribution",
        ],
      },
      liquidity: {
        title: "Liquidity Enhancement",
        features: [
          "Auto-inject LP pool (permanent lock)",
          "Auto-increase trading depth",
          "Enhanced price stability",
        ],
      },
    },
    flywheel: {
      badge: "POSITIVE FLYWHEEL",
      title: "Continuous Self-Reinforcing System",
      steps: [
        "Transaction Increase",
        "Fee Growth",
        "Dividend + LP Enhancement",
        "Attract More Holders",
        "Further Increase Trading Volume",
      ],
    },
    tokenomics: {
      badge: "TOKENOMICS",
      title: "1 Billion Total Supply",
      desc: "Fair launch based on FOUR platform, trade immediately upon listing, 100% on-chain transparent circulation",
      communityCore: "Community Core Private Sale",
      communitySeats: "0.5 BNB per share\nPrivate Sale Address: 0x9992175f22E6C19C36c933997749491564566A95",
      communityFeatures: ["Community Building", "Content Dissemination", "KOL Expansion", "Consensus Building"],
      fairTitle: "Fair & Transparent",
      fairDesc: "All distributions executed on-chain, verifiable and traceable",
      freeTitle: "Free Circulation",
      freeDesc: "Trade upon listing, no lock-up mechanism",
      consensusTitle: "Consensus Driven",
      consensusDesc: "Every participant: Investor + LP + Node",
    },
    community: {
      badge: "JOIN COMMUNITY",
      title: "Join the KNIGHTS Community",
      desc: "Trading = Income, Holding = Dividends, Circulation = Growth",
      twitter: "Follow latest updates",
      telegram: "Join community chat",
      email: "Business inquiries",
      whitepaper: "Read documentation",
    },
    cta: {
      title: "Ready to Join KNIGHTS?",
      desc: "Build a self-circulating economic system on-chain where Trading = Income, Holding = Dividends, Circulation = Growth",
    },
    footer: {
      rights: "2026 KNIGHTS. All rights reserved.",
      logoText: "KNIGHTS",
    },
    terminal: {
      init: "Initializing KNIGHTS Protocol...",
      taxRate: "Tax Rate",
      dividendPool: "Dividend Pool",
      liquidityPool: "Liquidity Pool",
      burnRate: "Burn Rate",
      totalSupply: "Total Supply",
      minHold: "Min Hold",
      status: "Status",
    },
  },
  zh: {
    nav: {
      about: "关于",
      mechanism: "机制",
      tokenomics: "代币经济",
      community: "社区",
    },
    hero: {
      badge: "BSC Meme 价值模型",
      title1: "正向飞轮",
      title2: "社区代币",
      desc: "骑士构建基于分红支撑、流动性增强与社区驱动增长引擎的自我强化经济系统。",
      whitepaper: "阅读白皮书",
      totalSupply: "总发行量",
      tax: "交易税",
      transparent: "链上透明",
      learnMore: "了解更多",
    },
    about: {
      badge: "项目概览",
      title: "构建链上自我强化经济系统",
      desc: "骑士不是短期情绪币，而是构建正向飞轮结构：交易 = 收益，持有 = 分红，流通 = 增值。",
      flywheel: "正向飞轮",
      flywheelDesc: "持续自我强化系统",
      fair: "公平透明",
      fairDesc: "所有分配链上执行",
    },
    mechanism: {
      badge: "核心机制",
      title: "3% 交易税分配",
      desc: "每笔交易收取 3% 税费，按以下结构分配",
      dividends: {
        title: "持有者分红",
        features: [
          "所有税收自动转换为 BNB 分红",
          "持有 10 万+ 骑士参与",
          "触发式自动分配",
        ],
      },
      liquidity: {
        title: "流动性增强",
        features: [
          "自动注入 LP 池（永久锁定）",
          "自动增加交易深度",
          "增强价格稳定性",
        ],
      },
    },
    flywheel: {
      badge: "正向飞轮",
      title: "持续自我强化系统",
      steps: [
        "交易增加",
        "手续费增长",
        "分红增加 + LP 增强",
        "吸引更多持有者",
        "进一步增加交易量",
      ],
    },
    tokenomics: {
      badge: "代币经济学",
      title: "10 亿总发行量",
      desc: "基于 FOUR 平台公平发射，上线即可交易，100% 链上透明流通",
      communityCore: "社区核心私募",
      communitySeats: "0.5 BNB / 份\n私募地址：0x9992175f22E6C19C36c933997749491564566A95",
      communityFeatures: ["社区建设", "内容传播", "KOL 拓展", "共识构建"],
      fairTitle: "公平透明",
      fairDesc: "所有分配链上执行，可验证可追溯",
      freeTitle: "自由流通",
      freeDesc: "上线即可交易，无锁仓机制",
      consensusTitle: "共识驱动",
      consensusDesc: "每位参与者：投资者 + LP + 节点",
    },
    community: {
      badge: "加入社区",
      title: "加入骑士社区",
      desc: "交易 = 收益，持有 = 分红，流通 = 增值",
      twitter: "关注最新动态",
      telegram: "加入社区讨论",
      email: "商务合作",
      whitepaper: "阅读文档",
    },
    cta: {
      title: "准备好加入骑士了吗？",
      desc: "在链上构建自我循环经济系统：交易 = 收益，持有 = 分红，流通 = 增值",
    },
    footer: {
      rights: "2026 骑士. 版权所有",
      logoText: "骑士",
    },
    terminal: {
      init: "初始化骑士协议...",
      taxRate: "税率",
      dividendPool: "分红池",
      liquidityPool: "流动性池",
      totalSupply: "总发行量",
      minHold: "最低持有",
      status: "状态",
    },
  },
}

type Lang = "en" | "zh"

// Optimized Animated Grid - cleaner, fewer particles
function AnimatedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      particles = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 35000)
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        })
      }
    }

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(218, 165, 32, 0.06)"
      ctx.lineWidth = 1
      const gridSize = 80

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    const drawParticles = () => {
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.beginPath()
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 2
        )
        gradient.addColorStop(0, `rgba(255, 215, 0, ${particle.opacity})`)
        gradient.addColorStop(1, "rgba(218, 165, 32, 0)")
        ctx.fillStyle = gradient
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const connectParticles = () => {
      const maxDistance = 120
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(218, 165, 32, ${0.12 * (1 - distance / maxDistance)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        })
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawGrid()
      drawParticles()
      connectParticles()
      animationFrameId = requestAnimationFrame(animate)
    }

    resize()
    createParticles()
    animate()

    window.addEventListener("resize", () => {
      resize()
      createParticles()
    })

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* Subtle ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/8 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
    </div>
  )
}

// Language Switcher Component
function LanguageSwitcher({ lang, setLang, mounted }: { lang: Lang; setLang: (l: Lang) => void; mounted: boolean }) {
  return (
    <button
      onClick={() => setLang(lang === "en" ? "zh" : "en")}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 border border-primary/40 text-primary text-sm font-medium hover:bg-primary/25 transition-all group"
      suppressHydrationWarning
    >
      <Globe className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
      <span suppressHydrationWarning>{mounted ? (lang === "en" ? "中文" : "EN") : "EN"}</span>
    </button>
  )
}

// Glowing Border Component
function GlowingBorder({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/60 via-primary/30 to-primary/60 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
      <div className="relative">{children}</div>
    </div>
  )
}

// Terminal Block with language support
function TerminalBlock({ lang }: { lang: Lang }) {
  const [displayedLines, setDisplayedLines] = useState<number>(0)
  const t = translations[lang].terminal

  const codeLines = [
    { text: "$ knights init --network bsc", type: "command" },
    { text: `> ${t.init}`, type: "info" },
    { text: `> ${t.taxRate}: 3%`, type: "info" },
    { text: `> ${t.dividendPool}: 70%`, type: "info" },
    { text: `> ${t.liquidityPool}: 30%`, type: "info" },
    { text: `> ${t.totalSupply}: 1,000,000,000 KNIGHTS`, type: "info" },
    { text: `> ${t.minHold}: 100,000 KNIGHTS`, type: "info" },
    { text: `> ${t.status}: ACTIVE`, type: "success" },
    { text: "$ _", type: "cursor" },
  ]

  useEffect(() => {
    setDisplayedLines(0)
    const timer = setInterval(() => {
      setDisplayedLines((prev) => {
        if (prev < codeLines.length) return prev + 1
        return prev
      })
    }, 200)
    return () => clearInterval(timer)
  }, [lang])

  return (
    <div className="relative">
      <div className="absolute -inset-3 bg-primary/15 rounded-2xl blur-xl" />
      <div className="relative bg-card/95 backdrop-blur-xl rounded-xl border border-primary/30 overflow-hidden shadow-2xl shadow-primary/20">
        <div className="flex items-center gap-2 px-4 py-3 bg-muted/60 border-b border-primary/20">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-primary/80 font-mono">knights-protocol.sh</span>
        </div>
        <div className="p-5 font-mono text-sm space-y-1.5">
          {codeLines.slice(0, displayedLines).map((line, index) => (
            <div
              key={index}
              className={`${
                line.type === "command"
                  ? "text-primary font-semibold"
                  : line.type === "success"
                  ? "text-green-400"
                  : line.type === "cursor"
                  ? "text-primary animate-pulse"
                  : "text-muted-foreground"
              }`}
            >
              {line.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Flywheel Diagram
function FlywheelDiagram() {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-square">
      <div className="absolute inset-0 bg-primary/10 rounded-full blur-[60px] animate-pulse" />
      <svg viewBox="0 0 200 200" className="w-full h-full relative">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(255, 215, 0)" stopOpacity="1" />
            <stop offset="50%" stopColor="rgb(218, 165, 32)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="rgb(184, 134, 11)" stopOpacity="0.6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx="100" cy="100" r="85" fill="none" stroke="url(#goldGradient)" strokeWidth="0.5" strokeDasharray="2 6" className="animate-[spin_40s_linear_infinite]" filter="url(#glow)" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="url(#goldGradient)" strokeWidth="1" strokeDasharray="4 8" className="animate-[spin_30s_linear_infinite]" filter="url(#glow)" />
        <circle cx="100" cy="100" r="55" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" strokeDasharray="10 5" className="animate-[spin_20s_linear_infinite_reverse]" filter="url(#glow)" />
        <circle cx="100" cy="100" r="40" fill="none" stroke="url(#goldGradient)" strokeWidth="1" strokeDasharray="6 4" className="animate-[spin_15s_linear_infinite]" />
        <circle cx="100" cy="100" r="25" fill="none" stroke="url(#goldGradient)" strokeWidth="0.8" className="animate-[spin_10s_linear_infinite_reverse]" />
        <circle cx="100" cy="100" r="18" fill="rgba(255, 215, 0, 0.2)" className="animate-pulse" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <Zap className="w-8 h-8 text-primary mx-auto mb-2 drop-shadow-[0_0_12px_rgba(255,215,0,0.8)]" />
          <span className="text-xs text-primary font-bold tracking-wider">FLYWHEEL</span>
        </div>
      </div>
    </div>
  )
}

export default function KnightsLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lang, setLang] = useState<Lang>("en")
  const [mounted, setMounted] = useState(false)

  const t = translations[lang]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#mechanism", label: t.nav.mechanism },
    { href: "#tokenomics", label: t.nav.tokenomics },
    { href: "#community", label: t.nav.community },
  ]

  const socialLinks = [
    { href: "https://x.com/knightstoken", icon: Twitter, label: "Twitter" },
    { href: "https://t.me/knightsfour", icon: Send, label: "Telegram" },
    { href: "mailto:flybabyaile@gmail.com", icon: Mail, label: "Email" },
    { href: "https://knightsweb.gitbook.io/knights-whitepaper", icon: FileText, label: "Whitepaper" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden" suppressHydrationWarning>
      {/* Global CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}</style>

      <AnimatedGrid />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur-xl border-b border-primary/20 shadow-lg shadow-primary/10" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo - clickable to scroll to top */}
            <button onClick={scrollToTop} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <span className="text-2xl font-bold text-primary drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]">KNIGHTS</span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <LanguageSwitcher lang={lang} setLang={setLang} mounted={mounted} />
              {socialLinks.slice(0, 3).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-primary transition-all"
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-3">
              <LanguageSwitcher lang={lang} setLang={setLang} mounted={mounted} />
              <button
                className="text-foreground"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background/98 backdrop-blur-xl border-b border-primary/20">
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-foreground/80 hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-4 pt-4 border-t border-border">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/70 hover:text-primary transition-colors"
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Knight Background */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Knight Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/knight-hero.jpg"
            alt="Golden Knight"
            fill
            className="object-cover object-center opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
          <div className="text-center space-y-6 sm:space-y-8" suppressHydrationWarning>
            {/* Floating badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/20 border border-primary/40 shadow-lg shadow-primary/20 animate-[float_6s_ease-in-out_infinite]">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-primary text-xs sm:text-sm font-semibold">{t.hero.badge}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="text-foreground">{t.hero.title1}</span>
              <br />
              <span className="text-primary drop-shadow-[0_0_40px_rgba(255,215,0,0.6)]">{t.hero.title2}</span>
            </h1>

            <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed">
              {t.hero.desc}
            </p>

            <div className="flex items-center justify-center pt-2 sm:pt-4">
              <a href="https://knightsweb.gitbook.io/knights-whitepaper" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-6 sm:px-10 py-4 sm:py-6 text-sm sm:text-lg shadow-xl shadow-primary/30">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {t.hero.whitepaper}
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 md:gap-16 pt-8 sm:pt-10">
              {[
                { value: "1B", label: t.hero.totalSupply },
                { value: "3%", label: t.hero.tax },
                { value: "100%", label: t.hero.transparent },
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary drop-shadow-[0_0_20px_rgba(255,215,0,0.6)] group-hover:drop-shadow-[0_0_30px_rgba(255,215,0,0.8)] transition-all">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-foreground/70">{stat.label}</div>
                </div>
              ))}
            </div>

            <a href="#about" className="inline-flex flex-col items-center gap-2 pt-10 text-foreground/70 hover:text-primary transition-colors group">
              <span className="text-sm">{t.hero.learnMore}</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 mb-4">
              <span className="text-primary font-semibold text-xs sm:text-sm">{t.about.badge}</span>
            </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground" suppressHydrationWarning>
                {lang === "en" ? (
                  <>
                    Building a <span className="text-primary drop-shadow-[0_0_25px_rgba(255,215,0,0.5)]">Self-Reinforcing</span> On-Chain Economic System
                  </>
                ) : (
                  <>
                    构建链上<span className="text-primary drop-shadow-[0_0_25px_rgba(255,215,0,0.5)]">自我强化</span>经济系统
                  </>
                )}
              </h2>
              <p className="text-foreground/70 leading-relaxed text-lg">
                {t.about.desc}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <GlowingBorder>
                  <div className="p-5 rounded-xl bg-card border border-primary/20">
                    <TrendingUp className="w-8 h-8 text-primary mb-3 drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]" />
                    <h3 className="font-semibold mb-1 text-foreground">{t.about.flywheel}</h3>
                    <p className="text-sm text-foreground/60">{t.about.flywheelDesc}</p>
                  </div>
                </GlowingBorder>
                <GlowingBorder>
                  <div className="p-5 rounded-xl bg-card border border-primary/20">
                    <Shield className="w-8 h-8 text-primary mb-3 drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]" />
                    <h3 className="font-semibold mb-1 text-foreground">{t.about.fair}</h3>
                    <p className="text-sm text-foreground/60">{t.about.fairDesc}</p>
                  </div>
                </GlowingBorder>
              </div>
            </div>
            <div className="relative">
              <TerminalBlock lang={lang} />
            </div>
          </div>
        </div>
      </section>

      {/* Mechanism Section */}
      <section id="mechanism" className="relative py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 mb-4">
              <span className="text-primary font-semibold text-xs sm:text-sm">{t.mechanism.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
              <span className="text-primary drop-shadow-[0_0_25px_rgba(255,215,0,0.6)]">3%</span> {t.mechanism.title.replace("3% ", "")}
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
              {t.mechanism.desc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                icon: Coins,
                percentage: "70%",
                title: t.mechanism.dividends.title,
                features: t.mechanism.dividends.features,
              },
              {
                icon: TrendingUp,
                percentage: "30%",
                title: t.mechanism.liquidity.title,
                features: t.mechanism.liquidity.features,
              },
            ].map((item, index) => (
              <GlowingBorder key={index}>
                <div className="p-6 rounded-xl bg-card border border-primary/20 h-full">
                  <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center mb-4 shadow-lg shadow-primary/25">
                    <item.icon className="w-7 h-7 text-primary drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]" />
                  </div>
                  <div className="text-5xl font-bold text-primary mb-3 drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]">{item.percentage}</div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">{item.title}</h3>
                  <ul className="space-y-3 text-sm text-foreground/60">
                    {item.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">{">"}</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlowingBorder>
            ))}
          </div>
        </div>
      </section>

      {/* Flywheel Section */}
      <section className="relative py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 mb-4">
              <span className="text-primary font-semibold text-xs sm:text-sm">{t.flywheel.badge}</span>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30">
                <span className="text-primary text-xs font-semibold">{t.flywheel.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground" suppressHydrationWarning>
                {lang === "en" ? (
                  <>
                    Continuous <span className="text-primary drop-shadow-[0_0_25px_rgba(255,215,0,0.5)]">Self-Reinforcing</span> System
                  </>
                ) : (
                  <>
                    持续<span className="text-primary drop-shadow-[0_0_25px_rgba(255,215,0,0.5)]">自我强化</span>系统
                  </>
                )}
              </h2>
              <div className="space-y-4">
                {t.flywheel.steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-primary/15 border border-primary/35 flex items-center justify-center text-primary font-bold shadow-lg shadow-primary/25 group-hover:shadow-primary/40 group-hover:bg-primary/20 transition-all">
                      {index + 1}
                    </div>
                    <span className="text-foreground text-lg">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="relative py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 mb-4">
              <span className="text-primary font-semibold text-xs sm:text-sm">{t.tokenomics.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground" suppressHydrationWarning>
              <span className="text-primary drop-shadow-[0_0_25px_rgba(255,215,0,0.6)]">{lang === "en" ? "1 Billion" : "10 亿"}</span>{" "}
              {lang === "en" ? "Total Supply" : "总发行量"}
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
              {t.tokenomics.desc}
            </p>
          </div>

          <div className="max-w-2xl mx-auto px-4 sm:px-0">
            <GlowingBorder>
              <div className="p-6 sm:p-8 rounded-xl bg-card border border-primary/20">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-primary/15 flex items-center justify-center shadow-lg shadow-primary/25 flex-shrink-0">
                    <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-primary drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]" />
                  </div>
                  <div className="flex-1 w-full">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">{t.tokenomics.communityCore}</h3>
                    <div className="text-base sm:text-lg text-primary font-bold whitespace-pre-line leading-relaxed">
                      {t.tokenomics.communitySeats.split('\n')[0]}
                    </div>
                    <p className="text-xs sm:text-sm text-primary/80 mt-2 break-all">
                      {t.tokenomics.communitySeats.split('\n')[1]}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                  {t.tokenomics.communityFeatures.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 sm:p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <span className="text-primary font-bold text-sm sm:text-base">{">"}</span>
                      <span className="text-foreground/80 text-xs sm:text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlowingBorder>
          </div>

          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: t.tokenomics.fairTitle, desc: t.tokenomics.fairDesc },
              { icon: Zap, title: t.tokenomics.freeTitle, desc: t.tokenomics.freeDesc },
              { icon: Users, title: t.tokenomics.consensusTitle, desc: t.tokenomics.consensusDesc },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-card/60 border border-primary/15 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/15 transition-all">
                <item.icon className="w-10 h-10 text-primary mx-auto mb-4 drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]" />
                <h3 className="font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-foreground/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="relative py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 mb-4">
              <span className="text-primary font-semibold text-xs sm:text-sm">{t.community.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground" suppressHydrationWarning>
              {lang === "en" ? (
                <>
                  Join the <span className="text-primary drop-shadow-[0_0_25px_rgba(255,215,0,0.6)]">KNIGHTS</span> Community
                </>
              ) : (
                <>
                  加入<span className="text-primary drop-shadow-[0_0_25px_rgba(255,215,0,0.6)]">骑士</span>社区
                </>
              )}
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
              {t.community.desc}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Twitter, label: "Twitter", href: "https://x.com/knightstoken", desc: t.community.twitter },
              { icon: Send, label: "Telegram", href: "https://t.me/knightsfour", desc: t.community.telegram },
              { icon: Mail, label: "Email", href: "mailto:flybabyaile@gmail.com", desc: t.community.email },
              { icon: FileText, label: "Whitepaper", href: "https://knightsweb.gitbook.io/knights-whitepaper", desc: t.community.whitepaper },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <GlowingBorder>
                  <div className="p-6 rounded-xl bg-card border border-primary/20 text-center transition-all group-hover:scale-[1.02]">
                    <item.icon className="w-10 h-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]" />
                    <h3 className="font-semibold mb-1 text-foreground">{item.label}</h3>
                    <p className="text-sm text-foreground/60">{item.desc}</p>
                  </div>
                </GlowingBorder>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground" suppressHydrationWarning>
            {lang === "en" ? (
              <>
                Ready to Join <span className="text-primary drop-shadow-[0_0_30px_rgba(255,215,0,0.7)]">KNIGHTS</span>?
              </>
            ) : (
              <>
                准备好加入<span className="text-primary drop-shadow-[0_0_30px_rgba(255,215,0,0.7)]">骑士</span>了吗？
              </>
            )}
          </h2>
          <p className="text-foreground/70 mb-8 sm:mb-10 max-w-2xl mx-auto text-base sm:text-lg">
            {t.cta.desc}
          </p>
          <a href="https://knightsweb.gitbook.io/knights-whitepaper" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-6 sm:px-10 py-4 sm:py-6 text-sm sm:text-lg shadow-xl shadow-primary/30">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {t.hero.whitepaper}
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <button onClick={scrollToTop} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <span className="text-xl font-bold text-primary drop-shadow-[0_0_12px_rgba(255,215,0,0.6)]">KNIGHTS</span>
            </button>

            <div className="flex items-center gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-primary transition-colors"
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <p className="text-foreground/50 text-sm">
              {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
