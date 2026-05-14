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
      ai: "DApp & AI",
      tokenomics: "Tokenomics",
      community: "Community",
      whitepaper: "Whitepaper",
    },
    hero: {
      badge: "On-Chain AI Asset Management Protocol",
      title1: "On-Chain AI",
      title2: "Asset Management",
      desc: "KNIGHTS integrates AI quantitative capabilities, on-chain liquidity, and automated economic models into an asset management protocol that delivers real-world trading returns.",
      whitepaper: "Read Whitepaper",
      totalSupply: "1 Billion",
      tax: "1% Tax",
      transparent: "100% Circulation",
      learnMore: "Learn More",
    },
    about: {
      badge: "PROJECT OVERVIEW",
      title: "From Trading Cost to Value Production",
      desc: "KNIGHTS redefines transaction behavior as 'system value production activity'. Fees are no longer consumption but value sources that continuously strengthen the ecosystem.",
      flywheel: "Positive Flywheel",
      flywheelDesc: "Transaction → Fee → Redistribution → System Enhancement",
      fair: "Fair & Transparent",
      fairDesc: "No pre-mine, no lock-up, 100% circulation",
      quant: "10+ Year Legacy",
      quantDesc: "Mature AI quantitative system",
      network: "Global Network",
      networkDesc: "2000+ community participants",
    },
    mechanism: {
      badge: "THREE-ELEMENT DISTRIBUTION MODEL",
      title: "1% Transaction Tax Allocation",
      desc: "Every KNIGHTS transaction collects 1% fee with automatic on-chain redistribution",
      dividends: {
        title: "BNB Dividend Pool",
        percent: "70%",
        features: [
          "For users with ≥100,000 KNIGHTS deposited in DApp",
          "Real-time on-chain accumulation",
          "Instant settlement, no staking required",
        ],
      },
      liquidity: {
        title: "LP Permanent Lock",
        percent: "30%",
        features: [
          "Auto-converted to LP and sent to black hole",
          "Eliminates rug pull risk",
          "Continuously enhances market depth",
        ],
      },
    },
    ai: {
      badge: "DAPP & AI QUANTITATIVE POOL",
      title: "Connect to AI Gold Quantitative System",
      desc: "KNIGHTS DApp is the core entry point connecting users to the AI quantitative system. Deposit KNIGHTS to participate in AI-driven gold quantitative trading.",
      features: [
        { title: "Principal Protected", desc: "Exit at deposit value" },
        { title: "No Lock-up", desc: "Withdraw anytime" },
        { title: "Dual Yield", desc: "USDT + BNB" },
        { title: "AI Execution", desc: "Smart contract driven" },
      ],
      integration: "Buy KNIGHTS → Enter DApp → Deposit to AI Pool → Daily USDT Yield → ≥100K gets BNB Dividends → Exit Anytime",
      stats: [
        { value: "10+", label: "Years Running" },
        { value: "2000+", label: "Global Communities" },
        { value: "≤15%", label: "Max Drawdown" },
        { value: "≥1.5", label: "Sharpe Ratio" },
      ],
    },
    flywheel: {
      badge: "FLYWHEEL MODEL",
      title: "Self-Reinforcing Growth System",
      steps: [
        "Trading Volume Growth",
        "Fee Total Increase",
        "BNB Dividends + LP Enhancement",
        "User Yield Increase",
        "More Users Deposit",
        "TVL Growth",
        "AI Quant Scale Expansion",
        "USDT Yield Enhancement",
      ],
      formula: "On-Chain Flywheel + Off-Chain Real Yield = Complete Value System",
    },
    tokenomics: {
      badge: "FAIR LAUNCH",
      title: "1 Billion Total Supply",
      desc: "100% circulation, zero team allocation, zero lock-up, zero hidden release schedules",
      principles: [
        { title: "No Pre-mine", desc: "Eliminate early unfair distribution" },
        { title: "No Team Share", desc: "Avoid centralized control" },
        { title: "No Lock-up", desc: "Eliminate future sell pressure" },
        { title: "100% Circulation", desc: "Price fully market-determined" },
      ],
    },
    value: {
      badge: "THREE-DIMENSIONAL VALUE SYSTEM",
      title: "Triple Value Synergy",
      dimensions: [
        { title: "Yield Dimension", desc: "USDT + BNB dual cash flow", icon: "coins" },
        { title: "Stability Dimension", desc: "LP permanent lock enhances depth", icon: "shield" },
        { title: "Scarcity Dimension", desc: "Continuous supply contraction", icon: "trending" },
      ],
      formula: "Value = Yield Capability + Scarcity + Market Stability",
    },
    community: {
      badge: "JOIN COMMUNITY",
      title: "Join the KNIGHTS Community",
      desc: "Deposit = Yield, Hold = Dividends, Trade = Value Production",
      twitter: "Follow latest updates",
      telegram: "Join community chat",
      email: "Business inquiries",
      whitepaper: "Read documentation",
    },
    cta: {
      title: "Ready to Join KNIGHTS?",
      desc: "An economic system with self-growth capability: AI quantitative yield + on-chain dividends + continuous liquidity enhancement",
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
      minHold: "Min Deposit",
      status: "Status",
    },
    whitepaper: {
      title: "KNIGHTS Whitepaper",
      subtitle: "On-Chain AI Asset Management Protocol",
      close: "Close",
    },
  },
  zh: {
    nav: {
      about: "关于",
      mechanism: "机制",
      ai: "DApp与AI",
      tokenomics: "代币经济",
      community: "社区",
      whitepaper: "白皮书",
    },
    hero: {
      badge: "链上 AI 资产管理协议",
      title1: "链上 AI",
      title2: "资产管理",
      desc: "骑士整合 AI 量化能力、链上流动性和自动化经济模型，构建传递真实世界交易收益的资产管理协议。",
      whitepaper: "阅读白皮书",
      totalSupply: "10 亿",
      tax: "1% 税费",
      transparent: "100% 流通",
      learnMore: "了解更多",
    },
    about: {
      badge: "项目概览",
      title: "从「交易成本」到「价值生产」",
      desc: "骑士将交易行为重新定义为「系统价值生产活动」。手续费不再是消耗，而是价值来源，持续强化生态系统。",
      flywheel: "正向飞轮",
      flywheelDesc: "交易 → 手续费 → 结构化再分配 → 系统增强",
      fair: "公平透明",
      fairDesc: "无预挖、无锁仓、100% 全流通",
      quant: "10+ 年历程",
      quantDesc: "成熟 AI 量化系统",
      network: "全球网络",
      networkDesc: "2000+ 社区参与者",
    },
    mechanism: {
      badge: "三元分配模型",
      title: "1% 交易税分配",
      desc: "每笔骑士交易收取 1% 手续费，自动完成链上分配",
      dividends: {
        title: "BNB 分红池",
        percent: "70%",
        features: [
          "分配给存入 DApp ≥10 万骑士的用户",
          "链上实时累积",
          "自动结算，无需质押",
        ],
      },
      liquidity: {
        title: "LP 永久锁定",
        percent: "30%",
        features: [
          "自动兑换 LP 发送至黑洞地址",
          "消除撤池风险",
          "持续增强市场深度",
        ],
      },
    },
    ai: {
      badge: "DAPP 与 AI 智能量化池",
      title: "连接 AI 黄金量化系统",
      desc: "骑士 DApp 是连接用户与 AI 量化系统的核心入口。存入骑士即可参与 AI 驱动的黄金量化交易。",
      features: [
        { title: "本金保护", desc: "按存入价值退出" },
        { title: "无锁仓", desc: "随时可退出" },
        { title: "双重收益", desc: "USDT + BNB" },
        { title: "AI 执行", desc: "智能合约运行" },
      ],
      integration: "购买骑士 → 进入 DApp → 存入 AI 量化池 → 每日 USDT 收益 → ≥10万获 BNB 分红 → 随时退出",
      stats: [
        { value: "10+", label: "年运行历史" },
        { value: "2000+", label: "全球社区" },
        { value: "≤15%", label: "最大回撤" },
        { value: "≥1.5", label: "夏普比率" },
      ],
    },
    flywheel: {
      badge: "飞轮模型",
      title: "自我强化增长系统",
      steps: [
        "交易量增长",
        "手续费增加",
        "BNB 分红 + LP 增强",
        "用户收益提升",
        "更多用户存入",
        "TVL 增长",
        "AI 量化规模扩大",
        "USDT 收益增强",
      ],
      formula: "链上飞轮 + 链下真实收益 = 完整价值体系",
    },
    tokenomics: {
      badge: "公平发射",
      title: "10 亿总发行量",
      desc: "100% 全流通，零团队预留，零锁仓，零隐藏释放计划",
      principles: [
        { title: "无预挖", desc: "消除早期不公平分配" },
        { title: "无团队份额", desc: "避免中心化控盘" },
        { title: "无锁仓", desc: "消除未来抛压预期" },
        { title: "100% 流通", desc: "价格完全由市场决定" },
      ],
    },
    value: {
      badge: "三维价值体系",
      title: "三重价值协同",
      dimensions: [
        { title: "收益维度", desc: "USDT + BNB 双重现金流", icon: "coins" },
        { title: "稳定维度", desc: "LP 永久锁定增强深度", icon: "shield" },
        { title: "稀缺维度", desc: "持续供应收缩", icon: "trending" },
      ],
      formula: "价值 = 收益能力 + 稀缺性 + 市场稳定性",
    },
    community: {
      badge: "加入社区",
      title: "加入骑士社区",
      desc: "存入 = 收益，持有 = 分红，交易 = 价值生产",
      twitter: "关注最新动态",
      telegram: "加入社区讨论",
      email: "商务合作",
      whitepaper: "阅读文档",
    },
    cta: {
      title: "准备好加入骑士了吗？",
      desc: "具备自我增长能力的经济系统：AI 量化收益 + 链上分红 + 流动性持续增强",
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
      minHold: "最低存入",
      status: "状态",
    },
    whitepaper: {
      title: "骑士白皮书",
      subtitle: "链上 AI 资产管理协议",
      close: "关闭",
    },
  },
}

// Whitepaper content
const whitepaperContent = {
  en: {
    sections: [
      {
        title: "Introduction",
        content: `In the past crypto market, most tokens relied on sentiment, traffic, and short-term speculation.
Price increases depended on new buying pressure, value maintenance relied on market heat, and once liquidity weakened, the system quickly lost growth momentum.

Meanwhile, although the traditional quantitative trading industry has mature and stable profitability, it has long been closed within institutional systems:
• Ordinary users cannot participate
• Revenue models lack transparency
• Low capital efficiency
• Lack of on-chain liquidity structure
• Unable to form open network growth

KNIGHTS was born to bridge the gap between "real-world quantitative returns" and "on-chain growth structures".`
      },
      {
        title: "1. Project Overview",
        content: `1.1 Industry Background
Most tokens in the current crypto market rely on market sentiment and short-term liquidity, lacking stable value support. Meanwhile, traditional quantitative trading has mature profit models but faces:
• High dependence on institutional funding
• High user entry barriers
• Opaque revenue structures
• Insufficient capital efficiency and liquidity
• Lack of on-chain verifiable mechanisms

1.2 KNIGHTS Positioning
KNIGHTS is an on-chain asset management protocol combining:
"AI Quantitative Capabilities + On-Chain Liquidity + Automated Economic Models"

Through smart contracts and DApp systems, KNIGHTS integrates:
• AI gold quantitative returns
• On-chain trading behavior
• Liquidity growth
• User incentive mechanisms
Into an economic system with self-growth capability.

1.3 Founding Team
KNIGHTS is jointly initiated by multiple independent quantitative teams with long-term experience in gold quantitative trading (XAU/USD), with core members distributed in:
• Hong Kong
• Singapore
• Dubai
• Southeast Asia`
      },
      {
        title: "2. Core Logic: From Trading Cost to Value Production",
        content: `In traditional token models, transaction fees typically mean value loss.
KNIGHTS redefines trading behavior as: "System Value Production Behavior"

Core Logic Flow:
Trading Behavior → Fee Generation → Structured Redistribution → System Enhancement → User Yield Increase → Trading Demand Increase → Trading Activity Continuous Growth

Model Comparison:
| Dimension | Traditional Model | KNIGHTS Model |
| Fee Attribute | Transaction Cost | Value Source |
| User Role | Passive Waiting | Active Participation |
| Liquidity Source | External Market Making | System Auto-Enhancement |
| Growth Model | Depends on Market Sentiment | Depends on Internal Flywheel |
| Supply Structure | Inflation or Fixed | Continuous Deflation |`
      },
      {
        title: "3. Core Mechanism: 1% Tax Three-Element Distribution",
        content: `Every KNIGHTS transaction collects 1% fee, automatically distributed on-chain.

Distribution Structure:
| Direction | Ratio | Function |
| BNB Dividend Pool | 70% | Distributed to users with ≥100,000 KNIGHTS deposited |
| LP Liquidity Enhancement | 30% | Auto-enhances market depth and permanently locks |

3.1 BNB Dividend Mechanism (70%)
Only open to users who "deposit in DApp AI Quantitative Pool with ≥100,000 KNIGHTS"
• Dividend Currency: BNB
• On-chain real-time accumulation
• Automatic settlement
• Instant arrival
• No staking required
• Deposit to participate

3.2 LP Permanent Lock Mechanism (30%)
30% tax from each transaction:
Auto-convert to LP → Permanently sent to black hole address

Effects:
• Eliminates rug pull risk
• Enhances market depth
• Reduces price volatility
• Improves capital stability
• Strengthens long-term value support`
      },
      {
        title: "4. DApp & AI Quantitative Pool",
        content: `4.1 Product Positioning
KNIGHTS DApp is the core entry connecting users to the AI quantitative system.
Users deposit KNIGHTS through DApp to participate in AI-driven gold quantitative trading.

4.2 Core Features:
| Feature | Description |
| Principal Protection | Exit at deposit value |
| No Lock-up | Exit anytime |
| Instant Yield | On-chain auto settlement |
| Dual Yield | USDT + BNB |
| AI Execution | Full smart contract operation |

4.3 Participation Process:
Buy KNIGHTS → Enter KNIGHTS DApp → Deposit to AI Quantitative Pool → System participates in quant trading at deposit value → Daily USDT yield → ≥100K deposit gets BNB dividends → Exit anytime, principal returned at deposit value

4.4 Principal Protection Mechanism
KNIGHTS uses "Exit at Deposit Value" mechanism:
When users exit, regardless of token price increase or decrease, the system returns assets based on deposit value.

Example:
At deposit: 1 KNIGHTS = 0.1 USDT, Deposit 10,000 KNIGHTS, Value = 1,000 USDT
Even if later price drops: 1 KNIGHTS = 0.05 USDT
At exit: System still returns 1,000 USDT value

This means: Users don't bear token price volatility risk, focusing more on AI quantitative returns.`
      },
      {
        title: "5. Flywheel Model: Self-Reinforcing Growth System",
        content: `KNIGHTS' core growth engine comes from the dual flywheel formed by:
"On-Chain Trading Behavior + AI Quantitative Returns"

Flywheel Path:
Trading Volume Growth → Fee Growth → BNB Dividends Expand + LP Enhancement → User Yield Increase → More Users Deposit to Quant Pool → TVL Growth → AI Quant Scale Expansion → USDT Yield Enhancement → Market Activity Continues to Rise → Enter Next Growth Cycle

System Characteristics:
| Feature | Description |
| Positive Feedback | Each growth round strengthens next round |
| Self-Reinforcing | Growth depends on internal circulation |
| Non-Linear Growth | Larger scale, higher efficiency |
| Anti-Fragility | More active trading, more stable system |`
      },
      {
        title: "6. Issuance Mechanism: Fair Launch & Full Circulation",
        content: `Basic Parameters:
| Item | Parameter |
| Token Name | KNIGHTS |
| Total Supply | 1,000,000,000 |
| Issuance Method | Fair Launch |
| Circulation | 100% Full Circulation |
| Team Allocation | 0 |

Design Principles:
| Principle | Purpose |
| No Pre-mine | Eliminate early unfairness |
| No Team Share | Avoid centralized control |
| No Lock-up Release | Eliminate future sell pressure |
| Full Circulation | Complete market pricing |

Core Conclusion:
• All participants start at the same point
• Price completely determined by market
• No internal unlock pressure
• No hidden shares`
      },
      {
        title: "7. Gold Quantitative Empowerment",
        content: `KNIGHTS' core external value source:
From a mature AI gold quantitative system running stably for over 10 years.

System Parameters:
| Item | Description |
| Running Time | 10+ years |
| Service Scale | 2000+ global communities |
| Core Market | Gold (XAU/USD) |
| Strategy Type | High-frequency + Trend Quantitative |
| Risk Control | ATR + Dynamic Stop-loss |
| Target Sharpe Ratio | ≥1.5 |
| Max Drawdown Target | ≤15% |

Revenue Source:
KNIGHTS deposited by users participate in AI gold quantitative trading at deposit value.
System-generated returns are distributed to users in USDT.

Core Significance:
On-Chain Flywheel + Off-Chain Real Returns = Complete Value Loop`
      },
      {
        title: "8. Three-Dimensional Value System",
        content: `Three Value Dimensions:
| Dimension | Source | Result |
| Yield Dimension | USDT + BNB | Dual Cash Flow |
| Stability Dimension | LP Permanent Lock | Enhanced Depth |
| Scarcity Dimension | Continuous Deflation | Supply Contraction |

KNIGHTS Four Attributes:
| Attribute | Source |
| Yield Attribute | AI Quantitative Returns |
| Dividend Attribute | BNB Dividends |
| Store of Value | Liquidity Enhancement + Deflation |
| Growth Attribute | Flywheel Model |

Comprehensive Value Formula:
Value = Quantitative Yield Capability + Dividend Capability + Scarcity + Market Stability`
      },
      {
        title: "9. Security Guarantees",
        content: `9.1 Smart Contract Security
• Contract Audit: Security audit completed
• Contract Open Source: Verifiable on-chain
• Auto Execution: No manual intervention

9.2 Fund Security
• Principal Protection: Exit at deposit value
• Multi-sig Treasury: Multi-permission management
• Auto Liquidation: Contract auto-execution

9.3 System Security
• AI System: 10+ years live trading
• Risk Control: Max drawdown ≤15%
• LP Security: Permanently locked

9.4 Trust Mechanism
• All rules publicly transparent on-chain
• All returns verifiable on-chain
• No team allocation
• No pre-mine
• No hidden releases`
      },
      {
        title: "10. Core Parameters Quick Reference",
        content: `| Item | Parameter |
| Token Name | KNIGHTS |
| Total Supply | 1 Billion |
| Transaction Tax | 1% |
| BNB Dividends | 70% |
| LP Enhancement | 30% |
| Dividend Threshold | ≥100,000 KNIGHTS |
| Quant Yield | USDT |
| Principal Protection | ✅ |
| Lock-up Period | 0 |
| Yield Withdrawal | Instant |
| Team Allocation | 0 |
| LP Lock | Permanent |
| Issuance Model | Fair Launch |
| AI Quantitative | Gold XAU/USD |`
      },
      {
        title: "Conclusion",
        content: `KNIGHTS is not a token project purely driven by sentiment.
It is an on-chain asset management protocol combining:
"AI Quantitative Returns + On-Chain Liquidity + Automated Flywheel"

Through KNIGHTS, users can:
• Deposit tokens to participate in AI gold quantitative trading
• Receive USDT quantitative returns
• Receive BNB on-chain dividends
• Exit anytime, no lock-up restrictions
• Principal returned at deposit value

KNIGHTS' core is not "speculation"
But:
Use structure to drive growth
Use returns to support value
Use mechanisms to form long-term cycles`
      },
    ],
  },
  zh: {
    sections: [
      {
        title: "引言",
        content: `过去的加密市场，大多数代币依赖情绪、流量与短期投机驱动。
价格上涨依赖新的买盘，价值维系依赖市场热度，而一旦流动性减弱，系统便迅速失去增长动力。

与此同时，传统量化交易行业虽然拥有成熟稳定的盈利能力，却长期封闭于机构体系内部：
• 普通用户无法参与
• 收益模型缺乏透明性
• 资金效率低
• 缺少链上流动性结构
• 无法形成开放式网络增长

KNIGHTS 的诞生，正是为了打通：
「现实世界量化收益」与「链上增长结构」之间的断层。`
      },
      {
        title: "一、项目概述",
        content: `1.1 行业背景
当前加密市场中，大多数代币依赖市场情绪与短期流动性推动，缺乏持续稳定的价值支撑。与此同时，传统量化交易行业虽然拥有成熟的盈利模型与稳定的交易能力，却长期存在以下问题：
• 资金高度依赖机构渠道
• 用户参与门槛高
• 收益结构不透明
• 资金效率与流动性不足
• 缺少链上可验证机制

1.2 KNIGHTS 的定位
KNIGHTS 并非传统意义上的 Meme 代币，也不是单一收益型项目，而是一个：
「AI量化能力 + 链上流动性 + 自动化经济模型」
三者结合的链上资产管理协议。

通过智能合约与 DApp 系统，KNIGHTS 将：
• AI 黄金量化收益
• 链上交易行为
• 流动性增长
• 用户激励机制
整合为一个具备自我增长能力的经济系统。

1.3 发起机构
KNIGHTS 由多家长期从事黄金量化交易（XAU/USD）的独立量化团队联合发起，团队核心成员分布于：
• 香港
• 新加坡
• 迪拜
• 东南亚`
      },
      {
        title: "二、核心逻辑：从「交易成本」到「价值生产」",
        content: `传统代币模型中，交易手续费通常意味着价值损耗。
而 KNIGHTS 将交易行为重新定义为：「系统价值生产行为」

核心逻辑：
交易行为 → 手续费产生 → 结构化再分配 → 系统增强 → 用户收益提升 → 交易需求增加 → 交易活跃度持续增长

模型差异对比：
| 维度 | 传统模型 | KNIGHTS 模型 |
| 手续费属性 | 交易成本 | 价值来源 |
| 用户角色 | 被动等待上涨 | 主动参与收益系统 |
| 流动性来源 | 外部做市 | 系统自动增强 |
| 增长模式 | 依赖市场情绪 | 依赖内部飞轮 |
| 供应结构 | 通胀或固定 | 持续通缩 |`
      },
      {
        title: "三、核心机制：1% 交易税三元分配模型",
        content: `每一笔 KNIGHTS 交易收取 1% 手续费，并自动完成链上分配。

分配结构：
| 分配方向 | 占比 | 功能 |
| BNB 分红池 | 70% | 分配给 ≥10万 KNIGHTS 存入者 |
| LP 流动性增强 | 30% | 自动增强市场深度并永久锁定 |

3.1 BNB 分红机制（70%）
仅针对「存入 DApp AI 智能量化池且数量 ≥100,000 KNIGHTS」的用户开放。

机制特点：
• 分红币种：BNB
• 链上实时累积
• 自动结算
• 秒级到账
• 无需额外质押
• 存入即参与

3.2 LP 永久锁定机制（30%）
每笔交易产生的 30% 税费：
自动兑换 LP → 永久发送至黑洞地址

作用：
• 消除撤池风险
• 增强市场深度
• 降低价格波动
• 提升资金稳定性
• 强化长期价值支撑`
      },
      {
        title: "四、DApp 与 AI 智能量化池",
        content: `4.1 产品定位
KNIGHTS DApp 是连接用户与 AI 量化系统的核心入口。
用户通过 DApp 存入 KNIGHTS，即可参与 AI 驱动的黄金量化交易。

4.2 核心特性：
| 特性 | 说明 |
| 本金保护 | 按存入时价值退出 |
| 无锁仓 | 随时退出 |
| 收益秒到账 | 链上自动结算 |
| 双重收益 | USDT + BNB |
| AI 自动执行 | 全程智能合约运行 |

4.3 参与流程：
购买 KNIGHTS → 进入 KNIGHTS DApp → 存入 AI 智能量化池 → 系统按存入价值参与量化交易 → 每日产生 USDT 收益 → 满足 ≥10万存入量自动获得 BNB 分红 → 可随时退出，按存入价值返还本金

4.4 本金保护机制
KNIGHTS 采用「按存入价值退出」机制。
即：用户退出时，无论代币价格上涨或下跌，系统均按照存入时的价值返还对应数量资产。

示例：
存入时：1 KNIGHTS = 0.1 USDT，存入 10,000 KNIGHTS，价值 = 1,000 USDT
即使后续市场价格下跌：1 KNIGHTS = 0.05 USDT
退出时：系统仍按 1,000 USDT 价值返还

这意味着：用户无需承担代币价格波动风险，更专注于 AI 量化收益本身。`
      },
      {
        title: "五、飞轮模型：自我强化的增长系统",
        content: `KNIGHTS 的核心增长引擎来自于：
「链上交易行为 + AI 量化收益」形成的双重飞轮。

飞轮路径：
交易量增长 → 手续费增长 → BNB 分红扩大 + LP 增强 → 用户收益提升 → 更多用户存入量化池 → TVL 增长 → AI 量化规模扩大 → USDT 收益增强 → 市场活跃度继续提升 → 进入下一轮增长

系统特性：
| 特性 | 说明 |
| 正反馈 | 每轮增长强化下一轮增长 |
| 自强化 | 增长依赖系统内部循环 |
| 非线性增长 | 规模越大效率越高 |
| 反脆弱性 | 交易越活跃系统越稳定 |`
      },
      {
        title: "六、发行机制：公平发射与完全流通",
        content: `基本参数：
| 项目 | 参数 |
| 代币名称 | KNIGHTS |
| 总供应量 | 1,000,000,000 |
| 发行方式 | 公平发射 |
| 流通状态 | 100% 全流通 |
| 团队预留 | 0 |

设计原则：
| 原则 | 目的 |
| 无预挖 | 消除早期不公平 |
| 无团队份额 | 避免中心化控盘 |
| 无锁仓释放 | 消除后期抛压 |
| 全流通 | 市场完全定价 |

核心结论：
• 所有参与者站在同一起点
• 价格完全由市场决定
• 不存在内部解锁抛压
• 不存在隐藏份额`
      },
      {
        title: "七、黄金量化赋能",
        content: `KNIGHTS 的核心外部价值来源：
来自一个已稳定运行超过 10 年的 AI 黄金量化系统。

系统参数：
| 项目 | 说明 |
| 运行时间 | 10+ 年 |
| 服务社区 | 全球 2000+ |
| 核心市场 | 黄金（XAU/USD）|
| 策略类型 | 高频 + 趋势量化 |
| 风控体系 | ATR + 动态止损 |
| 目标夏普比 | ≥1.5 |
| 最大回撤目标 | ≤15% |

收益来源：
用户存入的 KNIGHTS 将按存入时价值参与 AI 黄金量化交易。
系统产生的收益以 USDT 形式分配给用户。

核心意义：
链上飞轮 + 链下真实收益 = 完整价值闭环`
      },
      {
        title: "八、三维价值体系",
        content: `三大价值维度：
| 维度 | 来源 | 结果 |
| 收益维度 | USDT + BNB | 双重现金流 |
| 稳定维度 | LP 永久锁定 | 深度增强 |
| 稀缺维度 | 持续通缩 | 供应收缩 |

KNIGHTS 四重属性：
| 属性 | 来源 |
| 收益属性 | AI 量化收益 |
| 分红属性 | BNB 分红 |
| 储值属性 | 流动性增强 + 通缩 |
| 增长属性 | 飞轮模型 |

综合价值公式：
价值 = 量化收益能力 + 分红能力 + 稀缺性 + 市场稳定性`
      },
      {
        title: "九、安全保障",
        content: `9.1 智能合约安全
• 合约审计：已完成安全审计
• 合约开源：链上可验证
• 自动执行：无人工干预

9.2 资金安全
• 本金保护：按存入价值退出
• 多签金库：多重权限管理
• 自动清算：合约自动执行

9.3 系统安全
• AI 系统：10+ 年实盘运行
• 风控机制：最大回撤 ≤15%
• LP 安全：永久锁定

9.4 信任机制
• 所有规则链上公开透明
• 所有收益链上可查
• 无团队预留
• 无预挖
• 无隐藏释放`
      },
      {
        title: "十、核心参数速查",
        content: `| 项目 | 参数 |
| 代币名称 | KNIGHTS |
| 总供应量 | 10亿 |
| 交易税 | 1% |
| BNB 分红 | 70% |
| LP 增强 | 30% |
| 分红门槛 | ≥100,000 KNIGHTS |
| 量化收益 | USDT |
| 本金保护 | ✅ |
| 锁仓时间 | 0 |
| 收益提现 | 随时秒到账 |
| 团队预留 | 0 |
| LP 锁定 | 永久 |
| 发行模式 | 公平发射 |
| AI 量化 | 黄金 XAU/USD |`
      },
      {
        title: "结语",
        content: `KNIGHTS 并不是一个单纯依赖情绪推动的代币项目。
它是一个：
「AI量化收益 + 链上流动性 + 自动化飞轮」
结合的链上资产管理协议。

用户通过 KNIGHTS 可以：
• 存入代币参与 AI 黄金量化
• 获得 USDT 量化收益
• 获得 BNB 链上分红
• 随时退出，无锁仓限制
• 按存入价值返还本金

KNIGHTS 的核心不是「炒作」
而是：
用结构驱动增长
用收益支撑价值
用机制形成长期循环`
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
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">{t.title}</h2>
            <p className="text-sm text-foreground/60 mt-1">{t.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
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
    { text: `> ${t.taxRate}: 1%`, type: "info" },
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
                { value: "1%", label: t.hero.tax },
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

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            {t.ai.features.map((item, index) => (
              <GlowingBorder key={index}>
                <div className="p-5 rounded-xl bg-card border border-primary/20 text-center">
                  <div className="text-xl font-bold text-primary mb-2 drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]">{item.title}</div>
                  <p className="text-sm text-foreground/60">{item.desc}</p>
                </div>
              </GlowingBorder>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            {t.ai.stats.map((stat, index) => (
              <div key={index} className="p-4 rounded-xl bg-primary/10 border border-primary/30 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]">{stat.value}</div>
                <p className="text-xs sm:text-sm text-foreground/60">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Integration Flow */}
          <div className="max-w-3xl mx-auto">
            <GlowingBorder>
              <div className="p-6 rounded-xl bg-card border border-primary/20 text-center">
                <Bot className="w-10 h-10 text-primary mx-auto mb-4 drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]" />
                <p className="text-foreground/80 text-sm sm:text-base">{t.ai.integration}</p>
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {t.tokenomics.principles.map((item, index) => (
              <GlowingBorder key={index}>
                <div className="p-4 rounded-xl bg-card border border-primary/20 text-center">
                  <h3 className="font-bold text-primary mb-1">{item.title}</h3>
                  <p className="text-xs text-foreground/60">{item.desc}</p>
                </div>
              </GlowingBorder>
            ))}
          </div>
        </div>
      </section>

      {/* Three-Dimensional Value System Section */}
      <section className="relative py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 mb-4">
              <span className="text-primary font-semibold text-xs sm:text-sm">{t.value.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">{t.value.title}</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            {t.value.dimensions.map((dim, index) => (
              <GlowingBorder key={index}>
                <div className="p-6 rounded-xl bg-card border border-primary/20 text-center">
                  {dim.icon === "coins" && <Coins className="w-10 h-10 text-primary mx-auto mb-4 drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]" />}
                  {dim.icon === "shield" && <Shield className="w-10 h-10 text-primary mx-auto mb-4 drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]" />}
                  {dim.icon === "trending" && <TrendingUp className="w-10 h-10 text-primary mx-auto mb-4 drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]" />}
                  <h3 className="font-bold text-foreground mb-2">{dim.title}</h3>
                  <p className="text-sm text-foreground/60">{dim.desc}</p>
                </div>
              </GlowingBorder>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 text-center">
              <p className="text-primary font-mono text-sm">{t.value.formula}</p>
            </div>
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
