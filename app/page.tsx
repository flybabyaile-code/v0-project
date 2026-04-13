"use client"

import { useState, useEffect } from "react"
import { Menu, X, Twitter, Send, Mail, FileText, ChevronDown, Zap, Shield, TrendingUp, Flame, Users, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"

function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
    </div>
  )
}

function GlowingBorder({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/20 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-500" />
      <div className="relative">{children}</div>
    </div>
  )
}

function TerminalBlock() {
  const [displayedLines, setDisplayedLines] = useState<number>(0)
  
  const codeLines = [
    { text: "$ knights init --network bsc", delay: 0 },
    { text: "> Initializing KNIGHTS Protocol...", delay: 100 },
    { text: "> Tax Rate: 3%", delay: 200 },
    { text: "> Dividend Pool: 40%", delay: 300 },
    { text: "> Liquidity Pool: 40%", delay: 400 },
    { text: "> Burn Rate: 20%", delay: 500 },
    { text: "> Total Supply: 1,000,000,000 KNIGHTS", delay: 600 },
    { text: "> Min Hold for Dividend: 100,000 KNIGHTS", delay: 700 },
    { text: "> Status: ACTIVE", delay: 800 },
    { text: "$ _", delay: 900 },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayedLines((prev) => {
        if (prev < codeLines.length) return prev + 1
        return prev
      })
    }, 150)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-secondary/50 backdrop-blur-sm rounded-lg border border-border overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b border-border">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-muted-foreground font-mono">knights-protocol.sh</span>
      </div>
      <div className="p-4 font-mono text-sm space-y-1">
        {codeLines.slice(0, displayedLines).map((line, index) => (
          <div
            key={index}
            className={`${
              line.text.startsWith("$") ? "text-primary" : "text-muted-foreground"
            } ${line.text.includes("ACTIVE") ? "text-green-400" : ""}`}
          >
            {line.text}
          </div>
        ))}
      </div>
    </div>
  )
}

function FlywheelDiagram() {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-square">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(212, 175, 55)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="rgb(180, 140, 40)" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="80" fill="none" stroke="url(#goldGradient)" strokeWidth="2" strokeDasharray="8 4" className="animate-[spin_20s_linear_infinite]" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="url(#goldGradient)" strokeWidth="1" strokeDasharray="4 4" className="animate-[spin_15s_linear_infinite_reverse]" />
        <circle cx="100" cy="100" r="40" fill="none" stroke="url(#goldGradient)" strokeWidth="1" className="animate-[spin_10s_linear_infinite]" />
        <circle cx="100" cy="100" r="20" fill="rgba(212, 175, 55, 0.2)" className="animate-pulse" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
          <span className="text-xs text-primary font-semibold">FLYWHEEL</span>
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
    { href: "#about", label: "About" },
    { href: "#mechanism", label: "Mechanism" },
    { href: "#tokenomics", label: "Tokenomics" },
    { href: "#community", label: "Community" },
  ]

  const socialLinks = [
    { href: "https://twitter.com/knights", icon: Twitter, label: "Twitter" },
    { href: "https://t.me/knights", icon: Send, label: "Telegram" },
    { href: "mailto:contact@knights.io", icon: Mail, label: "Email" },
    { href: "#whitepaper", icon: FileText, label: "Whitepaper" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <AnimatedGrid />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-primary">KNIGHTS</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                >
                  {link.label}
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
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                Buy KNIGHTS
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
          <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border">
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
                Buy KNIGHTS
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-primary text-sm font-medium">BSC Meme Value Model</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight">
              <span className="text-foreground">Positive Flywheel</span>
              <br />
              <span className="text-primary">Community Token</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed">
              KNIGHTS builds a self-reinforcing economic system based on <span className="text-primary">dividend support</span>, <span className="text-primary">deflation model</span>, and <span className="text-primary">community-driven growth engine</span>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 font-semibold px-8">
                Read Whitepaper
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">1B</div>
                <div className="text-sm text-muted-foreground">Total Supply</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">3%</div>
                <div className="text-sm text-muted-foreground">Transaction Tax</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">On-Chain Transparent</div>
              </div>
            </div>

            <a href="#about" className="inline-flex flex-col items-center gap-2 pt-8 text-muted-foreground hover:text-primary transition-colors">
              <span className="text-sm">Learn More</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
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
                <span className="text-primary text-xs font-medium">PROJECT OVERVIEW</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Building a <span className="text-primary">Self-Reinforcing</span> On-Chain Economic System
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                KNIGHTS is not a short-term emotional coin, but builds a positive flywheel structure of: Trading = Income, Holding = Dividends, Circulation = Deflation.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <GlowingBorder>
                  <div className="p-4 rounded-lg bg-card">
                    <TrendingUp className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-1">Positive Flywheel</h3>
                    <p className="text-sm text-muted-foreground">Sustained self-reinforcing system</p>
                  </div>
                </GlowingBorder>
                <GlowingBorder>
                  <div className="p-4 rounded-lg bg-card">
                    <Shield className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-1">Fair & Transparent</h3>
                    <p className="text-sm text-muted-foreground">All distributions executed on-chain</p>
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
      <section id="mechanism" className="relative py-20 sm:py-32 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="text-primary text-xs font-medium">CORE MECHANISM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-primary">3%</span> Transaction Tax Allocation
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every transaction collects 3% tax, allocated according to the following structure
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <GlowingBorder>
              <div className="p-6 rounded-lg bg-card h-full">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Coins className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">40%</div>
                <h3 className="text-xl font-semibold mb-3">Holder Dividends</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">{">"}</span>
                    All taxes auto-convert to BNB dividends
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">{">"}</span>
                    Hold 100,000+ KNIGHTS to participate
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">{">"}</span>
                    Trigger-based auto distribution
                  </li>
                </ul>
              </div>
            </GlowingBorder>

            <GlowingBorder>
              <div className="p-6 rounded-lg bg-card h-full">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">40%</div>
                <h3 className="text-xl font-semibold mb-3">Liquidity Enhancement</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">{">"}</span>
                    Auto-inject LP pool (permanent lock)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">{">"}</span>
                    Auto-increase trading depth
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">{">"}</span>
                    Enhanced price stability
                  </li>
                </ul>
              </div>
            </GlowingBorder>

            <GlowingBorder>
              <div className="p-6 rounded-lg bg-card h-full">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Flame className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">20%</div>
                <h3 className="text-xl font-semibold mb-3">Deflationary Burn</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">{">"}</span>
                    Direct send to black hole address
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">{">"}</span>
                    Continuous supply reduction
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">{">"}</span>
                    Enhanced scarcity
                  </li>
                </ul>
              </div>
            </GlowingBorder>
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
                <span className="text-primary text-xs font-medium">POSITIVE FLYWHEEL</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Continuous <span className="text-primary">Self-Reinforcing</span> System
              </h2>
              <div className="space-y-4">
                {[
                  "Transaction Increase",
                  "Fee Growth",
                  "Dividend Increase + LP Enhancement + Accelerated Deflation",
                  "Attract More Holders",
                  "Further Increase Trading Volume",
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-semibold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-muted-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="relative py-20 sm:py-32 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="text-primary text-xs font-medium">TOKENOMICS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-primary">1 Billion</span> Total Supply
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Fair launch based on FOUR platform, trade immediately upon listing, 100% on-chain transparent circulation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <GlowingBorder>
              <div className="p-6 rounded-lg bg-card">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Community Core (100 Seats)</h3>
                    <p className="text-primary font-mono">1 BNB / Seat</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">{">"}</span>
                    Community Building
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">{">"}</span>
                    Content Dissemination
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">{">"}</span>
                    KOL Expansion
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">{">"}</span>
                    Consensus Building
                  </li>
                </ul>
              </div>
            </GlowingBorder>

            <GlowingBorder>
              <div className="p-6 rounded-lg bg-card">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Retail Participation (500 Seats)</h3>
                    <p className="text-primary font-mono">0.1 BNB / Seat</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">{">"}</span>
                    Provide Initial Liquidity
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">{">"}</span>
                    Build Trading Depth
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">{">"}</span>
                    Expand Community Base
                  </li>
                </ul>
              </div>
            </GlowingBorder>
          </div>

          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Fair & Transparent", desc: "All distributions executed on-chain, verifiable and traceable" },
              { icon: Zap, title: "Free Circulation", desc: "Trade upon listing, no lock-up mechanism" },
              { icon: Users, title: "Consensus Driven", desc: "Every participant is: Investor + LP Provider + Distribution Node" },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-card/50 border border-border">
                <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
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
              <span className="text-primary text-xs font-medium">JOIN COMMUNITY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Join the <span className="text-primary">KNIGHTS</span> Community
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trading = Income, Holding = Growth, Deflation = Appreciation
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Twitter, label: "Twitter", href: "https://twitter.com/knights", desc: "Follow latest updates" },
              { icon: Send, label: "Telegram", href: "https://t.me/knights", desc: "Join community chat" },
              { icon: Mail, label: "Email", href: "mailto:contact@knights.io", desc: "Business inquiries" },
              { icon: FileText, label: "Whitepaper", href: "#whitepaper", desc: "Read documentation" },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group"
              >
                <GlowingBorder>
                  <div className="p-6 rounded-lg bg-card text-center transition-transform group-hover:scale-[1.02]">
                    <item.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
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
      <section className="relative py-20 sm:py-32 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Join <span className="text-primary">KNIGHTS</span>?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Build a self-circulating economic system on-chain where Trading = Income, Holding = Growth, Deflation = Appreciation
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8">
              Buy KNIGHTS
            </Button>
            <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 font-semibold px-8">
              Read Whitepaper
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-primary">KNIGHTS</span>
            </div>

            <div className="flex items-center gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") || link.href.startsWith("mailto") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              2024 KNIGHTS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
