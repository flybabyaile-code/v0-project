"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, Twitter, Send, Mail, FileText, ChevronDown, Zap, Shield, TrendingUp, Users, Coins, Globe, Bot, Target, LineChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Translations
const translations = {
  en: {
    nav: {
      about: "About",
      mechanism: "Mechanism",
      ai: "AI Quant",
      tokenomics: "Tokenomics",
      community: "Community",
      whitepaper: "Whitepaper",
    },
    hero: {
      badge: "BSC Quant Value Model",
      title1: "Positive Flywheel",
      title2: "Quant Token",
      desc: "KNIGHTS connects quantitative capabilities with on-chain liquidity to build a self-reinforcing economic system with real yield support.",
      whitepaper: "Read Whitepaper",
      totalSupply: "Total Supply",
      tax: "Transaction Tax",
      transparent: "On-Chain Transparent",
      learnMore: "Learn More",
    },
    about: {
      badge: "PROJECT OVERVIEW",
      title: "Building a Self-Reinforcing On-Chain Economic System",
      desc: "KNIGHTS transforms traditional quantitative trading systems from closed fund management to open on-chain asset management structures.",
      flywheel: "Positive Flywheel",
      flywheelDesc: "Sustained self-reinforcing system",
      fair: "Fair & Transparent",
      fairDesc: "All distributions on-chain",
      quant: "Quant Strategy",
      quantDesc: "10+ years gold trading",
      network: "Global Network",
      networkDesc: "2000+ global communities",
    },
    mechanism: {
      badge: "CORE MECHANISM",
      title: "3% Transaction Tax Allocation",
      desc: "Every transaction collects 3% tax, allocated according to the following structure",
      dividends: {
        title: "Holder Dividends",
        percent: "70%",
        features: [
          "All taxes auto-convert to BNB dividends",
          "Hold 100,000+ KNIGHTS to participate",
          "Real-time accumulation, auto distribution",
        ],
      },
      liquidity: {
        title: "Liquidity Enhancement",
        percent: "30%",
        features: [
          "Auto-inject LP pool (permanent lock)",
          "Eliminate rug pull risk",
          "Enhanced price stability",
        ],
      },
    },
    ai: {
      badge: "AI QUANTITATIVE",
      title: "Gold Quantitative System Empowerment",
      desc: "External value support from a mature AI quantitative trading system that has been running stably for over 10 years",
      features: [
        { title: "10+ Years", desc: "Stable operation" },
        { title: "2000+", desc: "Global communities" },
        { title: "XAU/USD", desc: "Gold trading" },
        { title: "≥1.5", desc: "Sharpe ratio target" },
      ],
      integration: "AI system returns flow back to ecosystem treasury for KNIGHTS buyback or dividend pool enhancement",
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
      formula: "Quant × Liquidity × Network = Scalable Financial Infrastructure",
    },
    tokenomics: {
      badge: "TOKENOMICS",
      title: "1 Billion Total Supply",
      desc: "Fair launch based on FOUR platform, 100% circulation, zero team allocation, zero lock-up",
      communityCore: "Community Core Private Sale",
      communitySeats: "0.5 BNB per share\nPrivate Sale Address: 0x9992175f22E6C19C36c933997749491564566A95",
      communityFeatures: ["Community Building", "Content Dissemination", "KOL Expansion", "Consensus Building"],
      principles: [
        { title: "No Pre-mine", desc: "Avoid early unfair distribution" },
        { title: "No Lock-up", desc: "Eliminate future sell pressure expectations" },
        { title: "No Linear Release", desc: "Avoid continuous supply impact" },
        { title: "No Team Allocation", desc: "Eliminate centralized control risk" },
      ],
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
      totalSupply: "Total Supply",
      minHold: "Min Hold",
      status: "Status",
    },
    whitepaper: {
      title: "KNIGHTS Whitepaper",
      close: "Close",
    },
  },
  zh: {
    nav: {
      about: "关于",
      mechanism: "机制",
      ai: "AI量化",
      tokenomics: "代币经济",
      community: "社区",
      whitepaper: "白皮书",
    },
    hero: {
      badge: "BSC 量化价值模型",
      title1: "正向飞轮",
      title2: "量化代币",
      desc: "骑士将量化能力与链上流动性结合，构建具有真实收益支撑的自我强化经济系统。",
      whitepaper: "阅读白皮书",
      totalSupply: "总发行量",
      tax: "交易税",
      transparent: "链上透明",
      learnMore: "了解更多",
    },
    about: {
      badge: "项目概览",
      title: "构建链上自我强化经济系统",
      desc: "骑士将传统量化交易体系，从封闭式资金管理，升级为开放式链上资产管理结构。",
      flywheel: "正向飞轮",
      flywheelDesc: "持续自我强化系统",
      fair: "公平透明",
      fairDesc: "所有分配链上执行",
      quant: "量化策略",
      quantDesc: "10+ 年黄金交易",
      network: "全球网络",
      networkDesc: "2000+ 全球社区",
    },
    mechanism: {
      badge: "核心机制",
      title: "3% 交易税分配",
      desc: "每笔交易收取 3% 税费，按以下结构分配",
      dividends: {
        title: "持有者分红",
        percent: "70%",
        features: [
          "所有税收自动转换为 BNB 分红",
          "持有 10 万+ 骑士参与",
          "实时累积，自动到账",
        ],
      },
      liquidity: {
        title: "流动性增强",
        percent: "30%",
        features: [
          "自动注入 LP 池（永久锁定）",
          "消除撤池风险",
          "增强价格稳定性",
        ],
      },
    },
    ai: {
      badge: "AI 量化赋能",
      title: "黄金量化系统赋能",
      desc: "外部价值支撑来自一个已稳定运行超过 10 年的成熟 AI 量化交易系统",
      features: [
        { title: "10+ 年", desc: "稳定运行" },
        { title: "2000+", desc: "全球社区" },
        { title: "XAU/USD", desc: "黄金交易" },
        { title: "≥1.5", desc: "夏普比率目标" },
      ],
      integration: "AI 量化收益归入生态金库，用于回购骑士或增强分红池",
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
      formula: "量化 × 流动性 × 网络 = 可扩展金融基础设施",
    },
    tokenomics: {
      badge: "代币经济学",
      title: "10 亿总发行量",
      desc: "基于 FOUR 平台公平发射，100% 全流通，零团队预留，零锁仓",
      communityCore: "社区核心私募",
      communitySeats: "0.5 BNB / 份\n私募地址：0x9992175f22E6C19C36c933997749491564566A95",
      communityFeatures: ["社区建设", "内容传播", "KOL 拓展", "共识构建"],
      principles: [
        { title: "无预挖", desc: "避免早期不公平分配" },
        { title: "无锁仓", desc: "消除未来抛压预期" },
        { title: "无线性释放", desc: "避免供给持续冲击" },
        { title: "无团队预留", desc: "消除中心化控盘风险" },
      ],
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
    whitepaper: {
      title: "骑士白皮书",
      close: "关闭",
    },
  },
}

// Whitepaper content
const whitepaperContent = {
  en: {
    sections: [
      {
        title: "1. Project Overview",
        content: `In the current crypto market, most tokens rely on market sentiment and short-term liquidity, lacking stable value support and sustainable growth mechanisms. Meanwhile, traditional quantitative trading has mature strategies but is limited by fund structure and trust mechanisms.

KNIGHTS proposes: Combining quantitative capabilities with trading behavior through on-chain structures to build an economic system with intrinsic growth capability.

KNIGHTS is jointly initiated by multiple independent quantitative teams with long-term experience in gold (XAUUSD) quantitative trading, distributed across Asian quantitative trading centers (Hong Kong/Singapore), offshore liquidity markets (Dubai), and crypto derivatives active regions (Southeast Asia).`
      },
      {
        title: "2. Core Logic: From 'Transaction Cost' to 'Value Production'",
        content: `Basic Formula:
Trading Behavior → Fee Consumption → Structured Redistribution → System Enhancement → Trading Motivation Increase → Trading Frequency Growth

Key Transformations:
• Fee attribute: From transaction cost to value source
• Impact on system: From value consumption to value production
• Holder status: From passive waiting to active dividend receiving
• Liquidity source: From external market makers to automatic internal growth
• Supply model: From fixed/inflation to continuous deflation`
      },
      {
        title: "3. Core Mechanism: 3% Transaction Tax Allocation",
        content: `Every KNIGHTS transaction collects 3% fee, allocated as follows:

70% Holder Dividends:
• Participation threshold: ≥100,000 KNIGHTS
• Dividend currency: BNB (auto-distributed on-chain)
• Settlement: Real-time accumulation, auto arrival
• No staking required, holding is participating

30% Liquidity Enhancement (Permanent Lock):
• Each transaction → 30% tax auto-converts to LP tokens → Sent to black hole address for permanent lock
• Eliminates rug pull risk
• Reduces large sell-off impact on price
• Liquidity/market cap ratio continues to rise`
      },
      {
        title: "4. Flywheel Model: Self-Reinforcing Dynamic System",
        content: `Complete Flywheel Path:
Transaction Volume Increase → Fee Total Increase → Dividend Pool Expansion + Liquidity Deepening → Holder APY Increase + Market Depth Increase + Scarcity Enhancement → Holding Motivation Enhancement + New Capital Entry → Holder Address Growth → Trading Activity Further Increase → (Return to Start)

System Characteristics:
• Positive feedback structure: Each round of growth strengthens next round's growth capability
• Self-reinforcing mechanism: Growth depends on internal circulation, not external stimulation
• Non-linear growth: Efficiency improves as scale expands
• Anti-fragility: Higher trading volume = more stable system

Core Conclusion: Correct Structure → Behavior Driven → Automatic Growth`
      },
      {
        title: "5. Issuance Mechanism: Fair Launch & Full Circulation",
        content: `Basic Parameters:
• Token Name: KNIGHTS
• Total Supply: 1,000,000,000 (1 Billion)
• Issuance Method: Platform Launch (Four)
• Circulation: 100% Full Circulation
• Team Allocation: 0

Design Principles:
• No Pre-mine: Avoid early unfair distribution
• No Lock-up: Eliminate future sell pressure expectations
• No Linear Release: Avoid continuous supply market impact
• No Team Allocation: Eliminate centralized control risk

All participants enter at the same starting point, price completely determined by market supply and demand.`
      },
      {
        title: "6. Gold Quantitative Empowerment: Real Off-chain Yield Support",
        content: `KNIGHTS' external value comes from a mature AI quantitative trading system that has been running stably for over 10 years.

System Background:
• Operating Duration: 10+ years
• Service Scale: 2000+ global communities
• Trading Target: Gold (XAU/USD) main position
• Strategy Type: Multi-factor high-frequency quant + trend capture
• Risk Control: Dynamic stop-loss + ATR volatility filter
• Sharpe Ratio Target: ≥1.5
• Max Drawdown Target: ≤15%

Integration Method:
• Initial: AI quant returns flow to ecosystem treasury for KNIGHTS buyback or dividend pool enhancement
• Mid-term: KNIGHTS as AI system subscription payment tool
• Long-term: KNIGHTS holders get AI strategy priority access or fee discounts

On-chain Flywheel + Off-chain Yield = Complete Value System`
      },
      {
        title: "7. Three-Dimensional Value System",
        content: `KNIGHTS value comes from synergy of three dimensions:

Yield Dimension: 70% Holder Dividends → Continuous Cash Flow
Stability Dimension: 30% Permanent Lock LP → Enhanced Market Depth
Scarcity Dimension: Transaction Burn → Continuous Deflation

Value = Yield Capability + Scarcity + Market Stability

Result: KNIGHTS simultaneously possesses:
• Yield attribute: Holding generates BNB dividends
• Store of value attribute: Deflation mechanism + liquidity support
• Growth attribute: Flywheel model drives scale expansion`
      },
    ],
  },
  zh: {
    sections: [
      {
        title: "一、项目概述",
        content: `在当前加密资产市场中，大多数代币的价值依赖于市场情绪与短期流动性驱动，缺乏稳定的价值支撑与持续增长机制。与此同时，传统量化交易行业虽具备稳定的收益能力与成熟的交易体系，但其发展长期受制于资金结构、信任机制与扩张能力的限制。

KNIGHTS 正是在这一背景下提出：通过链上结构，将量化能力与交易行为结合，构建具备内生增长能力的经济系统。

KNIGHTS 由多家长期从事黄金量化交易（XAUUSD）的独立量化团队联合发起，团队主要分布于亚洲量化交易中心（香港/新加坡）、离岸流动性市场（迪拜）、加密衍生品活跃区域（东南亚）。`
      },
      {
        title: "二、核心逻辑：从"交易成本"到"价值生产"",
        content: `基本公式：
交易行为 → 手续费消耗 → 结构化再分配 → 系统增强 → 交易动机提升 → 交易频次增长

关键转变对比：
• 手续费属性：从交易成本变为价值来源
• 交易对系统的影响：从消耗价值变为生产价值
• 持有人状态：从被动等待上涨变为主动获得分红
• 流动性来源：从依赖外部做市变为自动内生增长
• 供应量模式：从固定或通胀变为持续通缩`
      },
      {
        title: "三、核心机制：3% 交易税的三元分配模型",
        content: `每一笔 KNIGHTS 交易收取 3% 手续费，按以下权重分配：

70% 持币分红：
• 参与门槛：≥ 100,000 KNIGHTS
• 分红币种：BNB（链上自动分发）
• 结算方式：实时累积，自动到账
• 质押要求：无需质押，持有即参与

30% 流动性增强（永久锁定）：
• 每笔交易 → 30%税款自动兑换为 LP 代币 → 发送至黑洞地址永久锁定
• 消除撤池风险
• 降低大额抛售对价格的冲击
• 流动性/市值比持续上升`
      },
      {
        title: "四、飞轮模型：自我强化的动态系统",
        content: `完整飞轮路径：
交易量增加 → 手续费总量增加 → 分红池扩大 + 流动性加深 → 持有人APY提升 + 市场深度提升 + 稀缺性增强 → 持有动机增强 + 新资金入场 → 持币地址数增长 → 交易活跃度进一步提升 → （返回起点）

系统特性分析：
• 正反馈结构：每一轮增长强化下一轮增长能力
• 自强化机制：增长依赖内部循环，非外部刺激
• 非线性增长：规模扩大时，增长效率边际提升
• 反脆弱性：交易量越大，系统越稳定

核心结论：结构正确 → 行为驱动 → 自动增长`
      },
      {
        title: "五、发行机制：公平发射与完全流通",
        content: `基本参数：
• 代币名称：KNIGHTS（骑士）
• 总发行量：1,000,000,000（10亿）
• 发行方式：平台发射（Four）
• 流通状态：100% 全流通
• 团队预留：0

设计原则与目的：
• 无预挖：避免早期不公平分配
• 无锁仓：消除未来抛压预期
• 无线性释放：避免供给持续冲击市场
• 无团队预留：消除中心化控盘风险

所有参与者在同一起点进入，价格完全由市场供需决定。`
      },
      {
        title: "六、黄金量化赋能：链下真实收益支撑",
        content: `KNIGHTS 的外部价值来源来自一个已稳定运行超过 10年 的成熟 AI 量化交易系统。

系统背景：
• 运行时长：10+ 年
• 服务规模：全球 2000+ 社区
• 交易标的：黄金（XAU/USD）主仓位
• 策略类型：多因子高频量化 + 趋势捕捉
• 风控体系：动态止损 + ATR 波动率过滤
• 夏普比率目标：≥ 1.5
• 最大回撤目标：≤ 15%

KNIGHTS 与 AI 系统的结合方式：
• 初期：AI 量化收益归入生态金库，用于回购 KNIGHTS 或增强分红池
• 中期：KNIGHTS 作为 AI 系统订阅支付工具
• 长期：KNIGHTS 持有者获得 AI 策略优先访问权或费率折扣

链上飞轮 + 链下收益 = 完整价值体系`
      },
      {
        title: "七、三维价值体系",
        content: `KNIGHTS 的价值来自三个维度的协同作用：

收益维度：70% 持币分红 → 持续现金流
稳定维度：30% 永久锁仓 LP → 市场深度增强
稀缺维度：交易销毁 → 持续通缩

综合模型：价值 = 收益能力 + 稀缺性 + 市场稳定性

结果：该体系使 KNIGHTS 同时具备：
• 收益属性：持币产生 BNB 分红
• 储值属性：通缩机制 + 流动性支撑
• 增长属性：飞轮模型驱动规模扩张`
      },
    ],
  },
}

type Lang = "en" | "zh"

// Whitepaper Modal Component
function WhitepaperModal({ isOpen, onClose, lang }: { isOpen: boolean; onClose: () => void; lang: Lang }) {
  const t = translations[lang].whitepaper
  const content = whitepaperContent[lang]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" onClick={onClose} />
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-card border border-primary/30 rounded-2xl shadow-2xl shadow-primary/20 overflow-hidden">
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-6 bg-card border-b border-primary/20">
          <h2 className="text-xl sm:text-2xl font-bold text-primary drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">{t.title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="space-y-8">
            {content.sections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-primary">{section.title}</h3>
                <div className="text-foreground/80 whitespace-pre-line leading-relaxed text-sm sm:text-base">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

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
  const [whitepaperOpen, setWhitepaperOpen] = useState(false)

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
    { href: "#ai", label: t.nav.ai },
    { href: "#tokenomics", label: t.nav.tokenomics },
    { href: "#community", label: t.nav.community },
  ]

  const socialLinks = [
    { href: "https://x.com/knightstoken", icon: Twitter, label: "Twitter" },
    { href: "https://t.me/knightsfour", icon: Send, label: "Telegram" },
    { href: "mailto:flybabyaile@gmail.com", icon: Mail, label: "Email" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden" suppressHydrationWarning>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}</style>

      <AnimatedGrid />
      <WhitepaperModal isOpen={whitepaperOpen} onClose={() => setWhitepaperOpen(false)} lang={lang} />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur-xl border-b border-primary/20 shadow-lg shadow-primary/10" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <button onClick={scrollToTop} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <span className="text-2xl font-bold text-primary drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]">{lang === "en" ? "KNIGHTS" : "骑士"}</span>
            </button>

            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => setWhitepaperOpen(true)}
                className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium"
              >
                {t.nav.whitepaper}
              </button>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <LanguageSwitcher lang={lang} setLang={setLang} mounted={mounted} />
              {socialLinks.map((link) => (
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
              <button
                onClick={() => {
                  setWhitepaperOpen(true)
                  setMobileMenuOpen(false)
                }}
                className="block text-foreground/80 hover:text-primary transition-colors w-full text-left"
              >
                {t.nav.whitepaper}
              </button>
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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
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
              <Button
                size="lg"
                onClick={() => setWhitepaperOpen(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-6 sm:px-10 py-4 sm:py-6 text-sm sm:text-lg shadow-xl shadow-primary/30"
              >
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {t.hero.whitepaper}
              </Button>
            </div>

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
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" suppressHydrationWarning>
              {lang === "en" ? (
                <>Building a <span className="text-primary drop-shadow-[0_0_25px_rgba(255,215,0,0.5)]">Self-Reinforcing</span> On-Chain Economic System</>
              ) : (
                <>构建链上<span className="text-primary drop-shadow-[0_0_25px_rgba(255,215,0,0.5)]">自我强化</span>经济系统</>
              )}
            </h2>
            <p className="text-foreground/70 leading-relaxed text-lg max-w-3xl mx-auto">
              {t.about.desc}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {[
              { icon: TrendingUp, title: t.about.flywheel, desc: t.about.flywheelDesc },
              { icon: Shield, title: t.about.fair, desc: t.about.fairDesc },
              { icon: Bot, title: t.about.quant, desc: t.about.quantDesc },
              { icon: Users, title: t.about.network, desc: t.about.networkDesc },
            ].map((item, index) => (
              <GlowingBorder key={index}>
                <div className="p-5 rounded-xl bg-card border border-primary/20 text-center">
                  <item.icon className="w-8 h-8 text-primary mb-3 mx-auto drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]" />
                  <h3 className="font-semibold mb-1 text-foreground">{item.title}</h3>
                  <p className="text-sm text-foreground/60">{item.desc}</p>
                </div>
              </GlowingBorder>
            ))}
          </div>
          <div className="relative max-w-3xl mx-auto">
            <TerminalBlock lang={lang} />
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">{t.mechanism.title}</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto text-lg">{t.mechanism.desc}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                icon: Coins,
                percentage: t.mechanism.dividends.percent,
                title: t.mechanism.dividends.title,
                features: t.mechanism.dividends.features,
              },
              {
                icon: TrendingUp,
                percentage: t.mechanism.liquidity.percent,
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

      {/* AI Quantitative Section */}
      <section id="ai" className="relative py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 mb-4">
              <span className="text-primary font-semibold text-xs sm:text-sm">{t.ai.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">{t.ai.title}</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto text-lg">{t.ai.desc}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            {t.ai.features.map((item, index) => (
              <GlowingBorder key={index}>
                <div className="p-5 rounded-xl bg-card border border-primary/20 text-center">
                  <div className="text-3xl font-bold text-primary mb-2 drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]">{item.title}</div>
                  <p className="text-sm text-foreground/60">{item.desc}</p>
                </div>
              </GlowingBorder>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <GlowingBorder>
              <div className="p-6 rounded-xl bg-card border border-primary/20 text-center">
                <Bot className="w-10 h-10 text-primary mx-auto mb-4 drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]" />
                <p className="text-foreground/80">{t.ai.integration}</p>
              </div>
            </GlowingBorder>
          </div>
        </div>
      </section>

      {/* Flywheel Section */}
      <section className="relative py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <FlywheelDiagram />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30">
                <span className="text-primary font-semibold text-xs sm:text-sm">{t.flywheel.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground" suppressHydrationWarning>
                {lang === "en" ? (
                  <>Continuous <span className="text-primary drop-shadow-[0_0_25px_rgba(255,215,0,0.5)]">Self-Reinforcing</span> System</>
                ) : (
                  <>持续<span className="text-primary drop-shadow-[0_0_25px_rgba(255,215,0,0.5)]">自我强化</span>系统</>
                )}
              </h2>
              <div className="space-y-3">
                {t.flywheel.steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-foreground/80">{step}</span>
                    {index < t.flywheel.steps.length - 1 && (
                      <span className="text-primary">→</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 mt-6">
                <p className="text-primary font-mono text-sm text-center">{t.flywheel.formula}</p>
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
            <p className="text-foreground/70 max-w-2xl mx-auto text-lg">{t.tokenomics.desc}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {t.tokenomics.principles.map((item, index) => (
              <GlowingBorder key={index}>
                <div className="p-4 rounded-xl bg-card border border-primary/20 text-center">
                  <h3 className="font-bold text-primary mb-1">{item.title}</h3>
                  <p className="text-xs text-foreground/60">{item.desc}</p>
                </div>
              </GlowingBorder>
            ))}
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
                    <div className="text-base sm:text-lg text-primary font-bold">
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
                <>Join the <span className="text-primary drop-shadow-[0_0_25px_rgba(255,215,0,0.6)]">KNIGHTS</span> Community</>
              ) : (
                <>加入<span className="text-primary drop-shadow-[0_0_25px_rgba(255,215,0,0.6)]">骑士</span>社区</>
              )}
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto text-lg">{t.community.desc}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Twitter, label: "Twitter", href: "https://x.com/knightstoken", desc: t.community.twitter },
              { icon: Send, label: "Telegram", href: "https://t.me/knightsfour", desc: t.community.telegram },
              { icon: Mail, label: "Email", href: "mailto:flybabyaile@gmail.com", desc: t.community.email },
              { icon: FileText, label: lang === "en" ? "Whitepaper" : "白皮书", onClick: () => setWhitepaperOpen(true), desc: t.community.whitepaper },
            ].map((item, index) => (
              item.onClick ? (
                <button key={index} onClick={item.onClick} className="group text-left">
                  <GlowingBorder>
                    <div className="p-6 rounded-xl bg-card border border-primary/20 text-center transition-all group-hover:scale-[1.02]">
                      <item.icon className="w-10 h-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]" />
                      <h3 className="font-semibold mb-1 text-foreground">{item.label}</h3>
                      <p className="text-sm text-foreground/60">{item.desc}</p>
                    </div>
                  </GlowingBorder>
                </button>
              ) : (
                <a key={index} href={item.href} target="_blank" rel="noopener noreferrer" className="group">
                  <GlowingBorder>
                    <div className="p-6 rounded-xl bg-card border border-primary/20 text-center transition-all group-hover:scale-[1.02]">
                      <item.icon className="w-10 h-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]" />
                      <h3 className="font-semibold mb-1 text-foreground">{item.label}</h3>
                      <p className="text-sm text-foreground/60">{item.desc}</p>
                    </div>
                  </GlowingBorder>
                </a>
              )
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
              <>Ready to Join <span className="text-primary drop-shadow-[0_0_30px_rgba(255,215,0,0.7)]">KNIGHTS</span>?</>
            ) : (
              <>准备好加入<span className="text-primary drop-shadow-[0_0_30px_rgba(255,215,0,0.7)]">骑士</span>了吗？</>
            )}
          </h2>
          <p className="text-foreground/70 mb-8 sm:mb-10 max-w-2xl mx-auto text-base sm:text-lg">{t.cta.desc}</p>
          <Button
            size="lg"
            onClick={() => setWhitepaperOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-6 sm:px-10 py-4 sm:py-6 text-sm sm:text-lg shadow-xl shadow-primary/30"
          >
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            {t.hero.whitepaper}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <button onClick={scrollToTop} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <span className="text-xl font-bold text-primary drop-shadow-[0_0_12px_rgba(255,215,0,0.6)]">{t.footer.logoText}</span>
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
              <button onClick={() => setWhitepaperOpen(true)} className="text-foreground/60 hover:text-primary transition-colors">
                <FileText className="w-5 h-5" />
              </button>
            </div>

            <p className="text-foreground/50 text-sm">{t.footer.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
