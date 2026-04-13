"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, Twitter, Send, Mail, FileText, ChevronDown, Zap, Shield, TrendingUp, Flame, Users, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"

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
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000)
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        })
      }
    }

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(212, 175, 55, 0.04)"
      ctx.lineWidth = 1
      const gridSize = 60

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
          particle.size * 3
        )
        gradient.addColorStop(0, `rgba(212, 175, 55, ${particle.opacity})`)
        gradient.addColorStop(1, "rgba(212, 175, 55, 0)")
        ctx.fillStyle = gradient
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const connectParticles = () => {
      const maxDistance = 150
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.1 * (1 - distance / maxDistance)})`
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
      {/* Radial glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/6 rounded-full blur-[100px] animate-pulse [animation-delay:1s]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/4 rounded-full blur-[150px] animate-pulse [animation-delay:2s]" />
      {/* Moving light beams */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-[moveDown_8s_ease-in-out_infinite]" />
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-primary/15 to-transparent animate-[moveDown_12s_ease-in-out_infinite_2s]" />
    </div>
  )
}

// Enhanced Glowing Border Component
function GlowingBorder({ children, className = "", intensity = "normal" }: { children: React.ReactNode; className?: string; intensity?: "normal" | "high" }) {
  const glowOpacity = intensity === "high" ? "opacity-50 group-hover:opacity-80" : "opacity-30 group-hover:opacity-60"
  return (
    <div className={`relative group ${className}`}>
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary via-primary/60 to-primary/30 rounded-lg blur ${glowOpacity} transition duration-500`} />
      <div className="relative">{children}</div>
    </div>
  )
}

// Terminal Block with bilingual content
function TerminalBlock() {
  const [displayedLines, setDisplayedLines] = useState<number>(0)

  const codeLines = [
    { text: "$ knights init --network bsc", type: "command" },
    { text: "> Initializing KNIGHTS Protocol... / 初始化 KNIGHTS 协议...", type: "info" },
    { text: "> Tax Rate / 税率: 3%", type: "info" },
    { text: "> Dividend Pool / 分红池: 40%", type: "info" },
    { text: "> Liquidity Pool / 流动性池: 40%", type: "info" },
    { text: "> Burn Rate / 销毁率: 20%", type: "info" },
    { text: "> Total Supply / 总发行量: 1,000,000,000 KNIGHTS", type: "info" },
    { text: "> Min Hold / 最低持有: 100,000 KNIGHTS", type: "info" },
    { text: "> Status / 状态: ACTIVE", type: "success" },
    { text: "$ _", type: "cursor" },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayedLines((prev) => {
        if (prev < codeLines.length) return prev + 1
        return prev
      })
    }, 200)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative">
      {/* Terminal glow effect */}
      <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-2xl" />
      <div className="relative bg-secondary/80 backdrop-blur-xl rounded-lg border border-primary/30 overflow-hidden shadow-2xl shadow-primary/10">
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
      <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <svg viewBox="0 0 200 200" className="w-full h-full relative">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(212, 175, 55)" stopOpacity="1" />
            <stop offset="50%" stopColor="rgb(255, 215, 0)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="rgb(180, 140, 40)" stopOpacity="0.6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx="100" cy="100" r="85" fill="none" stroke="url(#goldGradient)" strokeWidth="1" strokeDasharray="4 8" className="animate-[spin_30s_linear_infinite]" filter="url(#glow)" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="url(#goldGradient)" strokeWidth="2" strokeDasharray="12 6" className="animate-[spin_20s_linear_infinite_reverse]" filter="url(#glow)" />
        <circle cx="100" cy="100" r="55" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" strokeDasharray="8 4" className="animate-[spin_15s_linear_infinite]" filter="url(#glow)" />
        <circle cx="100" cy="100" r="40" fill="none" stroke="url(#goldGradient)" strokeWidth="1" className="animate-[spin_10s_linear_infinite_reverse]" filter="url(#glow)" />
        <circle cx="100" cy="100" r="25" fill="rgba(212, 175, 55, 0.15)" className="animate-pulse" filter="url(#glow)" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl" />
            <Zap className="relative w-10 h-10 text-primary mx-auto mb-2" />
          </div>
          <span className="text-sm text-primary font-bold tracking-wider">FLYWHEEL</span>
          <span className="block text-xs text-primary/70">飞轮</span>
        </div>
      </div>
    </div>
  )
}

export default function KnightsLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#about", label: "About", labelCn: "关于" },
    { href: "#mechanism", label: "Mechanism", labelCn: "机制" },
    { href: "#tokenomics", label: "Tokenomics", labelCn: "代币经济" },
    { href: "#community", label: "Community", labelCn: "社区" },
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
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
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
              <span className="text-xl font-bold text-primary drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">KNIGHTS</span>
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
                  <span className="text-primary/50 ml-1 text-xs">/ {link.labelCn}</span>
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
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
                Buy KNIGHTS / 购买
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
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
                  {link.label} / {link.labelCn}
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
                Buy KNIGHTS / 购买
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
              <span className="text-primary text-sm font-medium">BSC Meme Value Model / BSC Meme 价值模型</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight">
              <span className="text-foreground">Positive Flywheel</span>
              <br />
              <span className="text-primary drop-shadow-[0_0_30px_rgba(212,175,55,0.5)]">Community Token</span>
            </h1>
            <p className="text-2xl sm:text-3xl text-primary/80 font-light">
              正向飞轮社区代币
            </p>

            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed">
              KNIGHTS builds a self-reinforcing economic system based on{" "}
              <span className="text-primary font-medium">dividend support</span>,{" "}
              <span className="text-primary font-medium">deflation model</span>, and{" "}
              <span className="text-primary font-medium">community-driven growth engine</span>.
            </p>
            <p className="max-w-2xl mx-auto text-base text-muted-foreground/80">
              KNIGHTS 构建基于<span className="text-primary">分红支撑</span>、<span className="text-primary">通缩模型</span>与<span className="text-primary">社区驱动增长引擎</span>的自我强化经济系统。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <GlowingBorder intensity="high">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8">
                  Get Started / 开始参与
                </Button>
              </GlowingBorder>
              <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 font-semibold px-8">
                Read Whitepaper / 阅读白皮书
              </Button>
            </div>

            {/* Stats with glow */}
            <div className="flex items-center justify-center gap-6 sm:gap-8 pt-8">
              {[
                { value: "1B", label: "Total Supply", labelCn: "总发行量" },
                { value: "3%", label: "Transaction Tax", labelCn: "交易税" },
                { value: "100%", label: "On-Chain Transparent", labelCn: "链上透明" },
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-2xl sm:text-3xl font-bold text-primary drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] group-hover:drop-shadow-[0_0_25px_rgba(212,175,55,0.7)] transition-all">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                  <div className="text-xs text-primary/50">{stat.labelCn}</div>
                  {index < 2 && <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-border" />}
                </div>
              ))}
            </div>

            <a href="#about" className="inline-flex flex-col items-center gap-2 pt-8 text-muted-foreground hover:text-primary transition-colors group">
              <span className="text-sm">Learn More / 了解更多</span>
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
                <span className="text-primary text-xs font-medium">PROJECT OVERVIEW / 项目概览</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Building a <span className="text-primary drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">Self-Reinforcing</span> On-Chain Economic System
              </h2>
              <p className="text-xl text-primary/70">构建链上自我强化经济系统</p>
              <p className="text-muted-foreground leading-relaxed">
                KNIGHTS is not a short-term emotional coin, but builds a positive flywheel structure of: Trading = Income, Holding = Dividends, Circulation = Deflation.
              </p>
              <p className="text-muted-foreground/80 text-sm">
                KNIGHTS 不是短期情绪币，而是构建正向飞轮结构：交易 = 收益，持有 = 分红，流通 = 通缩。
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <GlowingBorder>
                  <div className="p-4 rounded-lg bg-card border border-primary/10">
                    <TrendingUp className="w-8 h-8 text-primary mb-3 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                    <h3 className="font-semibold mb-1">Positive Flywheel / 正向飞轮</h3>
                    <p className="text-sm text-muted-foreground">Sustained self-reinforcing system / 持续自我强化系统</p>
                  </div>
                </GlowingBorder>
                <GlowingBorder>
                  <div className="p-4 rounded-lg bg-card border border-primary/10">
                    <Shield className="w-8 h-8 text-primary mb-3 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                    <h3 className="font-semibold mb-1">Fair & Transparent / 公平透明</h3>
                    <p className="text-sm text-muted-foreground">All distributions on-chain / 所有分配链上执行</p>
                  </div>
                </GlowingBorder>
              </div>
            </div>
            <div className="relative">
              <TerminalBlock />
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
              <span className="text-primary text-xs font-medium">CORE MECHANISM / 核心机制</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              <span className="text-primary drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]">3%</span> Transaction Tax Allocation
            </h2>
            <p className="text-xl text-primary/70 mb-4">交易税分配</p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every transaction collects 3% tax, allocated according to the following structure
            </p>
            <p className="text-muted-foreground/80 text-sm">每笔交易收取 3% 税费，按以下结构分配</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Coins,
                percentage: "40%",
                title: "Holder Dividends",
                titleCn: "持有者分红",
                features: [
                  { en: "All taxes auto-convert to BNB dividends", cn: "所有税收自动转换为 BNB 分红" },
                  { en: "Hold 100,000+ KNIGHTS to participate", cn: "持有 10 万+ KNIGHTS 参与" },
                  { en: "Trigger-based auto distribution", cn: "触发式自动分配" },
                ],
              },
              {
                icon: TrendingUp,
                percentage: "40%",
                title: "Liquidity Enhancement",
                titleCn: "流动性增强",
                features: [
                  { en: "Auto-inject LP pool (permanent lock)", cn: "自动注入 LP 池（永久锁定）" },
                  { en: "Auto-increase trading depth", cn: "自动增加交易深度" },
                  { en: "Enhanced price stability", cn: "增强价格稳定性" },
                ],
              },
              {
                icon: Flame,
                percentage: "20%",
                title: "Deflationary Burn",
                titleCn: "通缩销毁",
                features: [
                  { en: "Direct send to black hole address", cn: "直接发送至黑洞地址" },
                  { en: "Continuous supply reduction", cn: "持续减少供应量" },
                  { en: "Enhanced scarcity", cn: "增强稀缺性" },
                ],
              },
            ].map((item, index) => (
              <GlowingBorder key={index}>
                <div className="p-6 rounded-lg bg-card border border-primary/10 h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                    <item.icon className="w-6 h-6 text-primary drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">{item.percentage}</div>
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                  <p className="text-primary/70 text-sm mb-4">{item.titleCn}</p>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {item.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">{">"}</span>
                        <div>
                          <span>{feature.en}</span>
                          <span className="block text-xs text-muted-foreground/60">{feature.cn}</span>
                        </div>
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
                <span className="text-primary text-xs font-medium">POSITIVE FLYWHEEL / 正向飞轮</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Continuous <span className="text-primary drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">Self-Reinforcing</span> System
              </h2>
              <p className="text-xl text-primary/70">持续自我强化系统</p>
              <div className="space-y-4">
                {[
                  { en: "Transaction Increase", cn: "交易增加" },
                  { en: "Fee Growth", cn: "手续费增长" },
                  { en: "Dividend + LP Enhancement + Accelerated Deflation", cn: "分红增加 + LP 增强 + 通缩加速" },
                  { en: "Attract More Holders", cn: "吸引更多持有者" },
                  { en: "Further Increase Trading Volume", cn: "进一步增加交易量" },
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-semibold text-sm shadow-lg shadow-primary/20 group-hover:shadow-primary/40 group-hover:bg-primary/20 transition-all">
                      {index + 1}
                    </div>
                    <div>
                      <span className="text-foreground">{step.en}</span>
                      <span className="block text-sm text-primary/60">{step.cn}</span>
                    </div>
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
              <span className="text-primary text-xs font-medium">TOKENOMICS / 代币经济学</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              <span className="text-primary drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]">1 Billion</span> Total Supply
            </h2>
            <p className="text-xl text-primary/70 mb-4">10 亿总发行量</p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Fair launch based on FOUR platform, trade immediately upon listing, 100% on-chain transparent circulation
            </p>
            <p className="text-muted-foreground/80 text-sm">基于 FOUR 平台公平发射，上线即可交易，100% 链上透明流通</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <GlowingBorder>
              <div className="p-6 rounded-lg bg-card border border-primary/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shadow-lg shadow-primary/20">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Community Core / 社区核心</h3>
                    <p className="text-primary font-mono">100 Seats / 100 席位 - 1 BNB/Seat</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    { en: "Community Building", cn: "社区建设" },
                    { en: "Content Dissemination", cn: "内容传播" },
                    { en: "KOL Expansion", cn: "KOL 拓展" },
                    { en: "Consensus Building", cn: "共识构建" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary">{">"}</span>
                      <span>{item.en} / {item.cn}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlowingBorder>

            <GlowingBorder>
              <div className="p-6 rounded-lg bg-card border border-primary/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shadow-lg shadow-primary/20">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Retail Participation / 散户参与</h3>
                    <p className="text-primary font-mono">500 Seats / 500 席位 - 0.1 BNB/Seat</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    { en: "Provide Initial Liquidity", cn: "提供初始流动性" },
                    { en: "Build Trading Depth", cn: "构建交易深度" },
                    { en: "Expand Community Base", cn: "扩大社区基础" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary">{">"}</span>
                      <span>{item.en} / {item.cn}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlowingBorder>
          </div>

          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Fair & Transparent", titleCn: "公平透明", desc: "All distributions executed on-chain", descCn: "所有分配链上执行，可验证可追溯" },
              { icon: Zap, title: "Free Circulation", titleCn: "自由流通", desc: "Trade upon listing, no lock-up", descCn: "上线即可交易，无锁仓机制" },
              { icon: Users, title: "Consensus Driven", titleCn: "共识驱动", desc: "Every participant: Investor + LP + Node", descCn: "每位参与者：投资者 + LP + 节点" },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-card/50 border border-primary/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all">
                <item.icon className="w-8 h-8 text-primary mx-auto mb-3 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-xs text-primary/60 mb-2">{item.titleCn}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
                <p className="text-xs text-muted-foreground/60">{item.descCn}</p>
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
              <span className="text-primary text-xs font-medium">JOIN COMMUNITY / 加入社区</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              Join the <span className="text-primary drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]">KNIGHTS</span> Community
            </h2>
            <p className="text-xl text-primary/70 mb-4">加入 KNIGHTS 社区</p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trading = Income, Holding = Growth, Deflation = Appreciation
            </p>
            <p className="text-muted-foreground/80 text-sm">交易 = 收益，持有 = 增长，通缩 = 升值</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Twitter, label: "Twitter", href: "https://twitter.com/knights", desc: "Follow latest updates", descCn: "关注最新动态" },
              { icon: Send, label: "Telegram", href: "https://t.me/knights", desc: "Join community chat", descCn: "加入社区讨论" },
              { icon: Mail, label: "Email", href: "mailto:contact@knights.io", desc: "Business inquiries", descCn: "商务合作" },
              { icon: FileText, label: "Whitepaper", href: "#whitepaper", desc: "Read documentation", descCn: "阅读文档" },
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
                    <item.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                    <h3 className="font-semibold mb-1">{item.label}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                    <p className="text-xs text-primary/50">{item.descCn}</p>
                  </div>
                </GlowingBorder>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">
            Ready to Join <span className="text-primary drop-shadow-[0_0_25px_rgba(212,175,55,0.6)]">KNIGHTS</span>?
          </h2>
          <p className="text-xl text-primary/70 mb-6">准备好加入 KNIGHTS 了吗？</p>
          <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
            Build a self-circulating economic system on-chain where Trading = Income, Holding = Growth, Deflation = Appreciation
          </p>
          <p className="text-muted-foreground/80 text-sm mb-8">
            在链上构建自我循环经济系统：交易 = 收益，持有 = 增长，通缩 = 升值
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GlowingBorder intensity="high">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8">
                Buy KNIGHTS / 购买
              </Button>
            </GlowingBorder>
            <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 font-semibold px-8">
              Read Whitepaper / 阅读白皮书
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
                <div className="absolute inset-0 bg-primary/30 rounded-lg blur-md" />
                <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
              <span className="text-lg font-bold text-primary drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">KNIGHTS</span>
            </div>

            <div className="flex items-center gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") || link.href.startsWith("mailto") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground hover:text-primary hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-all"
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              2024 KNIGHTS. All rights reserved. / 版权所有
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
