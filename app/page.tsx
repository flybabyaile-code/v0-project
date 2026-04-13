"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, Twitter, Send, Mail, FileText, ChevronDown, Zap, Shield, TrendingUp, Flame, Users, Coins, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

// Translations
const translations = {
  en: {
    nav: {
      about: "About",
      mechanism: "Mechanism",
      tokenomics: "Tokenomics",
      community: "Community",
      buy: "Buy KNIGHTS",
    },
    hero: {
      badge: "BSC Meme Value Model",
      title1: "Positive Flywheel",
      title2: "Community Token",
      desc: "KNIGHTS builds a self-reinforcing economic system based on dividend support, deflation model, and community-driven growth engine.",
      getStarted: "Get Started",
      whitepaper: "Read Whitepaper",
      totalSupply: "Total Supply",
      tax: "Transaction Tax",
      transparent: "On-Chain Transparent",
      learnMore: "Learn More",
    },
    about: {
      badge: "PROJECT OVERVIEW",
      title: "Building a Self-Reinforcing On-Chain Economic System",
      desc: "KNIGHTS is not a short-term emotional coin, but builds a positive flywheel structure of: Trading = Income, Holding = Dividends, Circulation = Deflation.",
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
      burn: {
        title: "Deflationary Burn",
        features: [
          "Direct send to black hole address",
          "Continuous supply reduction",
          "Enhanced scarcity",
        ],
      },
    },
    flywheel: {
      badge: "POSITIVE FLYWHEEL",
      title: "Continuous Self-Reinforcing System",
      steps: [
        "Transaction Increase",
        "Fee Growth",
        "Dividend + LP Enhancement + Accelerated Deflation",
        "Attract More Holders",
        "Further Increase Trading Volume",
      ],
    },
    tokenomics: {
      badge: "TOKENOMICS",
      title: "1 Billion Total Supply",
      desc: "Fair launch based on FOUR platform, trade immediately upon listing, 100% on-chain transparent circulation",
      communityCore: "Community Core",
      communitySeats: "100 Seats - 1 BNB/Seat",
      communityFeatures: ["Community Building", "Content Dissemination", "KOL Expansion", "Consensus Building"],
      retail: "Retail Participation",
      retailSeats: "500 Seats - 0.1 BNB/Seat",
      retailFeatures: ["Provide Initial Liquidity", "Build Trading Depth", "Expand Community Base"],
      fairTitle: "Fair & Transparent",
      fairDesc: "All distributions executed on-chain",
      freeTitle: "Free Circulation",
      freeDesc: "Trade upon listing, no lock-up",
      consensusTitle: "Consensus Driven",
      consensusDesc: "Every participant: Investor + LP + Node",
    },
    community: {
      badge: "JOIN COMMUNITY",
      title: "Join the KNIGHTS Community",
      desc: "Trading = Income, Holding = Growth, Deflation = Appreciation",
      twitter: "Follow latest updates",
      telegram: "Join community chat",
      email: "Business inquiries",
      whitepaper: "Read documentation",
    },
    cta: {
      title: "Ready to Join KNIGHTS?",
      desc: "Build a self-circulating economic system on-chain where Trading = Income, Holding = Growth, Deflation = Appreciation",
    },
    footer: {
      rights: "2024 KNIGHTS. All rights reserved.",
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
      buy: "购买 KNIGHTS",
    },
    hero: {
      badge: "BSC Meme 价值模型",
      title1: "正向飞轮",
      title2: "社区代币",
      desc: "KNIGHTS 构建基于分红支撑、通缩模型与社区驱动增长引擎的自我强化经济系统。",
      getStarted: "开始参与",
      whitepaper: "阅读白皮书",
      totalSupply: "总发行量",
      tax: "交易税",
      transparent: "链上透明",
      learnMore: "了解更多",
    },
    about: {
      badge: "项目概览",
      title: "构建链上自我强化经济系统",
      desc: "KNIGHTS 不是短期情绪币，而是构建正向飞轮结构：交易 = 收益，持有 = 分红，流通 = 通缩。",
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
          "持有 10 万+ KNIGHTS 参与",
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
      burn: {
        title: "通缩销毁",
        features: [
          "直接发送至黑洞地址",
          "持续减少供应量",
          "增强稀缺性",
        ],
      },
    },
    flywheel: {
      badge: "正向飞轮",
      title: "持续自我强化系统",
      steps: [
        "交易增加",
        "手续费增长",
        "分红增加 + LP 增强 + 通缩加速",
        "吸引更多持有者",
        "进一步增加交易量",
      ],
    },
    tokenomics: {
      badge: "代币经济学",
      title: "10 亿总发行量",
      desc: "基于 FOUR 平台公平发射，上线即可交易，100% 链上透明流通",
      communityCore: "社区核心",
      communitySeats: "100 席位 - 1 BNB/席位",
      communityFeatures: ["社区建设", "内容传播", "KOL 拓展", "共识构建"],
      retail: "散户参与",
      retailSeats: "500 席位 - 0.1 BNB/席位",
      retailFeatures: ["提供初始流动性", "构建交易深度", "扩大社区基础"],
      fairTitle: "公平透明",
      fairDesc: "所有分配链上执行，可验证可追溯",
      freeTitle: "自由流通",
      freeDesc: "上线即可交易，无锁仓机制",
      consensusTitle: "共识驱动",
      consensusDesc: "每位参与者：投资者 + LP + 节点",
    },
    community: {
      badge: "加入社区",
      title: "加入 KNIGHTS 社区",
      desc: "交易 = 收益，持有 = 增长，通缩 = 升值",
      twitter: "关注最新动态",
      telegram: "加入社区讨论",
      email: "商务合作",
      whitepaper: "阅读文档",
    },
    cta: {
      title: "准备好加入 KNIGHTS 了吗？",
      desc: "在链上构建自我循环经济系统：交易 = 收益，持有 = 增长，通缩 = 升值",
    },
    footer: {
      rights: "2024 KNIGHTS. 版权所有",
    },
    terminal: {
      init: "初始化 KNIGHTS 协议...",
      taxRate: "税率",
      dividendPool: "分红池",
      liquidityPool: "流动性池",
      burnRate: "销毁率",
      totalSupply: "总发行量",
      minHold: "最低持有",
      status: "状态",
    },
  },
}

type Lang = "en" | "zh"

// Enhanced Animated Grid with moving particles and glow effects
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
      const particleCount = Math.floor((canvas.width * canvas.height) / 12000)
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          size: Math.random() * 2.5 + 1,
          opacity: Math.random() * 0.6 + 0.2,
        })
      }
    }

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(212, 175, 55, 0.05)"
      ctx.lineWidth = 1
      const gridSize = 50

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
          particle.size * 4
        )
        gradient.addColorStop(0, `rgba(212, 175, 55, ${particle.opacity})`)
        gradient.addColorStop(0.5, `rgba(255, 215, 0, ${particle.opacity * 0.5})`)
        gradient.addColorStop(1, "rgba(212, 175, 55, 0)")
        ctx.fillStyle = gradient
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const connectParticles = () => {
      const maxDistance = 180
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.15 * (1 - distance / maxDistance)})`
            ctx.lineWidth = 0.8
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
      {/* Multiple radial glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] animate-pulse [animation-delay:1s]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-primary/5 rounded-full blur-[180px] animate-pulse [animation-delay:2s]" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary/6 rounded-full blur-[100px] animate-pulse [animation-delay:3s]" />
      {/* Moving light beams */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-[moveDown_8s_ease-in-out_infinite]" />
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-[moveDown_12s_ease-in-out_infinite_2s]" />
      <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-primary/25 to-transparent animate-[moveDown_10s_ease-in-out_infinite_4s]" />
      {/* Horizontal light beams */}
      <div className="absolute left-0 top-1/3 h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-[moveRight_15s_ease-in-out_infinite]" />
      <div className="absolute left-0 bottom-1/4 h-px w-full bg-gradient-to-r from-transparent via-primary/15 to-transparent animate-[moveRight_18s_ease-in-out_infinite_3s]" />
    </div>
  )
}

// Language Switcher Component
function LanguageSwitcher({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <button
      onClick={() => setLang(lang === "en" ? "zh" : "en")}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/20 transition-all group"
    >
      <Globe className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
      <span>{lang === "en" ? "中文" : "EN"}</span>
    </button>
  )
}

// Enhanced Glowing Border Component
function GlowingBorder({ children, className = "", intensity = "normal" }: { children: React.ReactNode; className?: string; intensity?: "normal" | "high" }) {
  const glowOpacity = intensity === "high" ? "opacity-60 group-hover:opacity-90" : "opacity-30 group-hover:opacity-60"
  return (
    <div className={`relative group ${className}`}>
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary via-primary/60 to-primary/30 rounded-lg blur ${glowOpacity} transition duration-500`} />
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
    { text: `> ${t.dividendPool}: 40%`, type: "info" },
    { text: `> ${t.liquidityPool}: 40%`, type: "info" },
    { text: `> ${t.burnRate}: 20%`, type: "info" },
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
      {/* Terminal glow effect */}
      <div className="absolute -inset-6 bg-primary/15 rounded-3xl blur-3xl" />
      <div className="relative bg-secondary/80 backdrop-blur-xl rounded-lg border border-primary/30 overflow-hidden shadow-2xl shadow-primary/20">
        <div className="flex items-center gap-2 px-4 py-3 bg-muted/80 border-b border-primary/20">
          <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-lg shadow-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-lg shadow-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-lg shadow-green-500/50" />
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

// Enhanced Flywheel Diagram with more glow
function FlywheelDiagram() {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-square">
      {/* Background glow */}
      <div className="absolute inset-0 bg-primary/15 rounded-full blur-[60px] animate-pulse" />
      <svg viewBox="0 0 200 200" className="w-full h-full relative">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(212, 175, 55)" stopOpacity="1" />
            <stop offset="50%" stopColor="rgb(255, 215, 0)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="rgb(180, 140, 40)" stopOpacity="0.7" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glowStrong">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx="100" cy="100" r="90" fill="none" stroke="url(#goldGradient)" strokeWidth="0.5" strokeDasharray="2 6" className="animate-[spin_40s_linear_infinite]" filter="url(#glow)" />
        <circle cx="100" cy="100" r="80" fill="none" stroke="url(#goldGradient)" strokeWidth="1" strokeDasharray="4 8" className="animate-[spin_30s_linear_infinite]" filter="url(#glow)" />
        <circle cx="100" cy="100" r="65" fill="none" stroke="url(#goldGradient)" strokeWidth="2" strokeDasharray="12 6" className="animate-[spin_20s_linear_infinite_reverse]" filter="url(#glowStrong)" />
        <circle cx="100" cy="100" r="50" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" strokeDasharray="8 4" className="animate-[spin_15s_linear_infinite]" filter="url(#glow)" />
        <circle cx="100" cy="100" r="35" fill="none" stroke="url(#goldGradient)" strokeWidth="1" className="animate-[spin_10s_linear_infinite_reverse]" filter="url(#glow)" />
        <circle cx="100" cy="100" r="22" fill="rgba(212, 175, 55, 0.2)" className="animate-pulse" filter="url(#glowStrong)" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/40 rounded-full blur-xl" />
            <Zap className="relative w-10 h-10 text-primary mx-auto mb-2 drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]" />
          </div>
          <span className="text-sm text-primary font-bold tracking-wider drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">FLYWHEEL</span>
        </div>
      </div>
    </div>
  )
}

export default function KnightsLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lang, setLang] = useState<Lang>("en")

  const t = translations[lang]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#mechanism", label: t.nav.mechanism },
    { href: "#tokenomics", label: t.nav.tokenomics },
    { href: "#community", label: t.nav.community },
  ]

  const socialLinks = [
    { href: "https://twitter.com/knights", icon: Twitter, label: "Twitter" },
    { href: "https://t.me/knights", icon: Send, label: "Telegram" },
    { href: "mailto:contact@knights.io", icon: Mail, label: "Email" },
    { href: "#whitepaper", icon: FileText, label: "Whitepaper" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Global CSS for animations */}
      <style jsx global>{`
        @keyframes moveDown {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
        }
        @keyframes moveRight {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.5)); }
          50% { filter: drop-shadow(0 0 40px rgba(212, 175, 55, 0.8)); }
        }
      `}</style>

      <AnimatedGrid />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/90 backdrop-blur-xl border-b border-primary/20 shadow-lg shadow-primary/5" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/50 rounded-lg blur-lg" />
                <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <span className="text-xl font-bold text-primary drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]">KNIGHTS</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium group"
                >
                  <span className="group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">{link.label}</span>
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <LanguageSwitcher lang={lang} setLang={setLang} />
              {socialLinks.slice(0, 3).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-all"
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all">
                {t.nav.buy}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-3">
              <LanguageSwitcher lang={lang} setLang={setLang} />
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
          <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-primary/20">
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors"
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
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                {t.nav.buy}
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            {/* Floating badge with glow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 shadow-lg shadow-primary/20 animate-[float_6s_ease-in-out_infinite]">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-lg shadow-primary/50" />
              <span className="text-primary text-sm font-medium">{t.hero.badge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight">
              <span className="text-foreground">{t.hero.title1}</span>
              <br />
              <span className="text-primary drop-shadow-[0_0_40px_rgba(212,175,55,0.6)] animate-[glow_3s_ease-in-out_infinite]">{t.hero.title2}</span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed">
              {t.hero.desc}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <GlowingBorder intensity="high">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8">
                  {t.hero.getStarted}
                </Button>
              </GlowingBorder>
              <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 font-semibold px-8">
                {t.hero.whitepaper}
              </Button>
            </div>

            {/* Stats with glow */}
            <div className="flex items-center justify-center gap-6 sm:gap-12 pt-8">
              {[
                { value: "1B", label: t.hero.totalSupply },
                { value: "3%", label: t.hero.tax },
                { value: "100%", label: t.hero.transparent },
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-2xl sm:text-3xl font-bold text-primary drop-shadow-[0_0_20px_rgba(212,175,55,0.6)] group-hover:drop-shadow-[0_0_30px_rgba(212,175,55,0.8)] transition-all">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <a href="#about" className="inline-flex flex-col items-center gap-2 pt-8 text-muted-foreground hover:text-primary transition-colors group">
              <span className="text-sm">{t.hero.learnMore}</span>
              <ChevronDown className="w-5 h-5 animate-bounce group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-primary text-xs font-medium">{t.about.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                {t.about.title.split("Self-Reinforcing")[0]}
                <span className="text-primary drop-shadow-[0_0_25px_rgba(212,175,55,0.5)]">
                  {lang === "en" ? "Self-Reinforcing" : "自我强化"}
                </span>
                {lang === "en" && " On-Chain Economic System"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.about.desc}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <GlowingBorder>
                  <div className="p-4 rounded-lg bg-card border border-primary/10">
                    <TrendingUp className="w-8 h-8 text-primary mb-3 drop-shadow-[0_0_12px_rgba(212,175,55,0.6)]" />
                    <h3 className="font-semibold mb-1">{t.about.flywheel}</h3>
                    <p className="text-sm text-muted-foreground">{t.about.flywheelDesc}</p>
                  </div>
                </GlowingBorder>
                <GlowingBorder>
                  <div className="p-4 rounded-lg bg-card border border-primary/10">
                    <Shield className="w-8 h-8 text-primary mb-3 drop-shadow-[0_0_12px_rgba(212,175,55,0.6)]" />
                    <h3 className="font-semibold mb-1">{t.about.fair}</h3>
                    <p className="text-sm text-muted-foreground">{t.about.fairDesc}</p>
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
      <section id="mechanism" className="relative py-20 sm:py-32">
        {/* Section background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="text-primary text-xs font-medium">{t.mechanism.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-primary drop-shadow-[0_0_25px_rgba(212,175,55,0.6)]">3%</span> {t.mechanism.title.replace("3% ", "")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.mechanism.desc}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Coins,
                percentage: "40%",
                title: t.mechanism.dividends.title,
                features: t.mechanism.dividends.features,
              },
              {
                icon: TrendingUp,
                percentage: "40%",
                title: t.mechanism.liquidity.title,
                features: t.mechanism.liquidity.features,
              },
              {
                icon: Flame,
                percentage: "20%",
                title: t.mechanism.burn.title,
                features: t.mechanism.burn.features,
              },
            ].map((item, index) => (
              <GlowingBorder key={index}>
                <div className="p-6 rounded-lg bg-card border border-primary/10 h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 shadow-lg shadow-primary/30">
                    <item.icon className="w-6 h-6 text-primary drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2 drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]">{item.percentage}</div>
                  <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
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
      <section className="relative py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <FlywheelDiagram />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-primary text-xs font-medium">{t.flywheel.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                {t.flywheel.title.split(lang === "en" ? "Self-Reinforcing" : "自我强化")[0]}
                <span className="text-primary drop-shadow-[0_0_25px_rgba(212,175,55,0.5)]">
                  {lang === "en" ? "Self-Reinforcing" : "自我强化"}
                </span>
                {lang === "en" && " System"}
              </h2>
              <div className="space-y-4">
                {t.flywheel.steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-semibold text-sm shadow-lg shadow-primary/30 group-hover:shadow-primary/50 group-hover:bg-primary/20 transition-all">
                      {index + 1}
                    </div>
                    <span className="text-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="relative py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="text-primary text-xs font-medium">{t.tokenomics.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-primary drop-shadow-[0_0_25px_rgba(212,175,55,0.6)]">{lang === "en" ? "1 Billion" : "10 亿"}</span> {lang === "en" ? "Total Supply" : "总发行量"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.tokenomics.desc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <GlowingBorder>
              <div className="p-6 rounded-lg bg-card border border-primary/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shadow-lg shadow-primary/30">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{t.tokenomics.communityCore}</h3>
                    <p className="text-primary font-mono">{t.tokenomics.communitySeats}</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {t.tokenomics.communityFeatures.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary">{">"}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlowingBorder>

            <GlowingBorder>
              <div className="p-6 rounded-lg bg-card border border-primary/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shadow-lg shadow-primary/30">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{t.tokenomics.retail}</h3>
                    <p className="text-primary font-mono">{t.tokenomics.retailSeats}</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {t.tokenomics.retailFeatures.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary">{">"}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlowingBorder>
          </div>

          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: t.tokenomics.fairTitle, desc: t.tokenomics.fairDesc },
              { icon: Zap, title: t.tokenomics.freeTitle, desc: t.tokenomics.freeDesc },
              { icon: Users, title: t.tokenomics.consensusTitle, desc: t.tokenomics.consensusDesc },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-card/50 border border-primary/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20 transition-all">
                <item.icon className="w-8 h-8 text-primary mx-auto mb-3 drop-shadow-[0_0_12px_rgba(212,175,55,0.6)]" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="relative py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="text-primary text-xs font-medium">{t.community.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t.community.title.split("KNIGHTS")[0]}
              <span className="text-primary drop-shadow-[0_0_25px_rgba(212,175,55,0.6)]">KNIGHTS</span>
              {t.community.title.split("KNIGHTS")[1]}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.community.desc}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Twitter, label: "Twitter", href: "https://twitter.com/knights", desc: t.community.twitter },
              { icon: Send, label: "Telegram", href: "https://t.me/knights", desc: t.community.telegram },
              { icon: Mail, label: "Email", href: "mailto:contact@knights.io", desc: t.community.email },
              { icon: FileText, label: "Whitepaper", href: "#whitepaper", desc: t.community.whitepaper },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group"
              >
                <GlowingBorder>
                  <div className="p-6 rounded-lg bg-card border border-primary/10 text-center transition-all group-hover:scale-[1.02]">
                    <item.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform drop-shadow-[0_0_12px_rgba(212,175,55,0.6)]" />
                    <h3 className="font-semibold mb-1">{item.label}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </GlowingBorder>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.cta.title.split("KNIGHTS")[0]}
            <span className="text-primary drop-shadow-[0_0_30px_rgba(212,175,55,0.7)]">KNIGHTS</span>
            {t.cta.title.split("KNIGHTS")[1]}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t.cta.desc}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GlowingBorder intensity="high">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8">
                {t.nav.buy}
              </Button>
            </GlowingBorder>
            <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 font-semibold px-8">
              {t.hero.whitepaper}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/40 rounded-lg blur-md" />
                <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
              <span className="text-lg font-bold text-primary drop-shadow-[0_0_12px_rgba(212,175,55,0.6)]">KNIGHTS</span>
            </div>

            <div className="flex items-center gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") || link.href.startsWith("mailto") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground hover:text-primary hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.6)] transition-all"
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
