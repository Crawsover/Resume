// Mock data for Jeremy Crawford Portfolio

export const portfolioData = {
  hero: {
    tag: "CX / UX / GTM / AI SYSTEMS — DALLAS, TX",
    name: "JEREMY",
    nameAccent: "CRAWFORD",
    title: "DIRECTOR · STRATEGIST · OPERATOR · BUILDER",
    stats: [
      { number: "$6.3M", label: "REVENUE GENERATED" },
      { number: "105%", label: "REVENUE GROWTH (4.5 MO)" },
      { number: "39%", label: "LTV INCREASE" },
      { number: "23%", label: "CONVERSION LIFT" }
    ]
  },

  skillClusters: [
    {
      id: "cx",
      icon: "Target",
      name: "CX STRATEGY & LIFECYCLE DESIGN",
      desc: "Customer journey · Onboarding · Retention · LTV growth",
      tags: [
        { label: "CORE SKILL", type: "primary" },
        { label: "93% WIN RATE", type: "secondary" }
      ],
      proof: "$3.7M",
      proofLabel: "REVENUE IMPACT",
      color: "#FFD400",
      capabilities: [
        "Customer journey mapping end-to-end",
        "Onboarding system design & optimization",
        "Trial-to-conversion funnel architecture",
        "LTV & retention playbook development",
        "Empathy-based staff training frameworks",
        "CX + revenue alignment strategies",
        "Churn reduction system design",
        "Post-sale experience architecture"
      ],
      useCases: [
        {
          label: "USE CASE — iCODE",
          title: "Full CX & Onboarding Redesign",
          desc: "Rebuilt the entire trial-to-enrollment journey, launched Trial Instructor role, and led empathy-based staff training across departments.",
          result: "39% boost in customer LTV · $331K net revenue in 11 months"
        },
        {
          label: "USE CASE — QUINTESSA MARKETING",
          title: "$25M Portfolio Retention Strategy",
          desc: "Designed post-sale CX frameworks that reduced churn and preserved $3M+ in at-risk accounts annually.",
          result: "$3M+ annually preserved · Churn significantly reduced"
        }
      ]
    },
    {
      id: "growth",
      icon: "TrendingUp",
      name: "GROWTH MARKETING & DEMAND GEN",
      desc: "Paid media · SEO · A/B testing · Funnel optimization · Attribution",
      tags: [
        { label: "HIGH IMPACT", type: "primary" },
        { label: "90% WIN RATE", type: "secondary" }
      ],
      proof: "$3.4M",
      proofLabel: "AK LAW FIRM REVENUE",
      color: "#FFD400",
      capabilities: [
        "Meta Ads & Google Ads campaign management",
        "TikTok Ads & influencer marketing",
        "SEO strategy & search console optimization",
        "A/B testing on landing pages & funnels",
        "Conversion rate optimization (CRO)",
        "Attribution modeling & analytics",
        "Lead generation system design",
        "Campaign sequencing & lifecycle emails"
      ],
      useCases: [
        {
          label: "USE CASE — AK LAW FIRM",
          title: "WordPress Redesign + Campaign Strategy",
          desc: "Led full website redesign integrated with a multi-channel market campaign strategy combining SEO, paid ads, and inbound call tracking.",
          result: "$3.4M net revenue · 25K audience insights gathered"
        },
        {
          label: "USE CASE — ULTRA BOTANICA",
          title: "Conversion Rate Optimization",
          desc: "Used GA4 events, Hotjar heatmaps, and A/B tests to optimize landing pages and product pages, reducing abandon carts by 15%.",
          result: "23% conversion rate increase · 15% cart abandonment drop"
        }
      ]
    },
    {
      id: "ux",
      icon: "Sparkles",
      name: "UX DESIGN & RESEARCH",
      desc: "User research · Journey mapping · Prototyping · Usability testing",
      tags: [
        { label: "SMU CERTIFIED", type: "primary" },
        { label: "72% WIN RATE", type: "secondary" }
      ],
      proof: "2 APPS",
      proofLabel: "SHIPPED PROJECTS",
      color: "#FFD400",
      capabilities: [
        "User interviews & usability testing",
        "Persona development & journey mapping",
        "Wireframing & prototyping (Figma)",
        "Information architecture design",
        "Accessibility-first design systems",
        "Heuristic evaluation & UX audits",
        "Data-driven design iteration",
        "Interaction design & visual hierarchy"
      ],
      useCases: [
        {
          label: "PROJECT — CARRY-ON MOBILE APP",
          title: "AI-Powered Travel Itinerary App",
          desc: "Conducted 6-participant usability study, redesigned home page after identifying blocking interface component, improving task completion time.",
          result: "Reduced task completion time · Full accessibility compliance"
        },
        {
          label: "PROJECT — AION INTUITION",
          title: "AI Marketing Research System",
          desc: "Led UX research for an AI system bridging marketing and user research data, designing feature selection logic to handle large behavioral datasets.",
          result: "AI-synthesized behavioral insights · Data taxonomy built"
        }
      ]
    },
    {
      id: "ops",
      icon: "Settings",
      name: "MARKETING OPS & SYSTEMS",
      desc: "CRM architecture · API automation · Analytics · Workflow design",
      tags: [
        { label: "SYSTEMS THINKER", type: "primary" },
        { label: "85% WIN RATE", type: "secondary" }
      ],
      proof: "FULL STACK",
      proofLabel: "OPS + ANALYTICS",
      color: "#FFD400",
      capabilities: [
        "CRM logic modeling (Salesforce, HubSpot)",
        "API integration & workflow automation",
        "Zapier / n8n pipeline architecture",
        "Google Analytics 4 implementation",
        "Lead routing & scoring system design",
        "KPI dashboard structuring",
        "Attribution modeling & pixel tracking",
        "Six Sigma process optimization"
      ],
      useCases: [
        {
          label: "USE CASE — iCODE",
          title: "Sales Funnel API Integration",
          desc: "Built API-connected systems to reduce lead-to-trial friction, eliminating manual handoffs and increasing signup velocity across all departments.",
          result: "Signup velocity increased · Manual errors eliminated"
        },
        {
          label: "USE CASE — SILVA 360",
          title: "Custom KPI Reporting System",
          desc: "Built pixel-based tracking infrastructure to surface pain points like slow page loads and high bounce rates, enabling data-driven product decisions.",
          result: "Real-time KPI visibility · Optimization velocity improved"
        }
      ]
    },
    {
      id: "ai",
      icon: "Zap",
      name: "AI SYSTEMS & GTM STRATEGY",
      desc: "Multi-agent design · Prompt engineering · Go-to-market architecture",
      tags: [
        { label: "EMERGING EDGE", type: "primary" },
        { label: "70% WIN RATE", type: "secondary" }
      ],
      proof: "LIVE",
      proofLabel: "CLAWBOT DEPLOYED",
      color: "#FFD400",
      capabilities: [
        "Multi-agent AI architecture design",
        "Prompt engineering & LLM orchestration",
        "GTM strategy for AI products",
        "MCP (Model Context Protocol) systems",
        "AI workflow automation (Claude / GPT)",
        "Market positioning for AI tools",
        "AI governance & safety layering",
        "Vertical GPT framework development"
      ],
      useCases: [
        {
          label: "LIVE PROJECT — CLAWBOT",
          title: "AI Job Application Automation System",
          desc: "Designed and deployed a multi-source job bot (LinkedIn, Indeed, RemoteOK, Adzuna) with Airtable data layer and React reporting dashboard.",
          result: "4 platforms automated · Full reporting dashboard live"
        },
        {
          label: "PROJECT — AION INTUITION",
          title: "AI Research Data Synthesis System",
          desc: "Architected an AI system to bridge marketing and user research data, applying feature selection logic to extract behavioral patterns from large datasets.",
          result: "Cross-source data synthesis · Actionable insight generation"
        }
      ]
    },
    {
      id: "revops",
      icon: "DollarSign",
      name: "REVENUE OPERATIONS",
      desc: "Pipeline visibility · Forecasting · Sales + Marketing alignment · GTM",
      tags: [
        { label: "NEW UNLOCK", type: "primary" },
        { label: "84% WIN RATE", type: "secondary" }
      ],
      proof: "$25M",
      proofLabel: "PORTFOLIO MANAGED",
      color: "#FFD400",
      capabilities: [
        "Revenue forecasting & pipeline modeling",
        "Sales & marketing funnel alignment",
        "GTM process standardization",
        "Cross-functional team integration",
        "Conversion analysis across lifecycle stages",
        "CRM data hygiene & architecture",
        "Retention playbook deployment",
        "KPI ladder construction"
      ],
      useCases: [
        {
          label: "USE CASE — QUINTESSA MARKETING",
          title: "At-Risk Account Preservation",
          desc: "Used CRM behavior data to deploy personalized retention playbooks, acting as the strategic bridge between sales and service departments.",
          result: "$3M+ annually preserved · Churn velocity reduced"
        },
        {
          label: "USE CASE — iCODE",
          title: "Revenue Scaling Operations",
          desc: "Scaled monthly gross revenue from $18K to $37K in 4.5 months through calendar utilization, conversion tracking, and staff performance alignment.",
          result: "105% revenue growth · $331K net in 11 months"
        }
      ]
    }
  ],

  caseStudies: [
    {
      id: 1,
      eyebrow: "EDTECH · iCODE · 2024–2025",
      title: "Area Director & CX Architect",
      desc: "Took on a struggling location and rebuilt the entire customer experience from first contact to long-term retention — generating $331K in 11 months.",
      metrics: [
        { number: "$331K", label: "NET REVENUE" },
        { number: "105%", label: "REVENUE GROWTH" },
        { number: "39%", label: "LTV BOOST" }
      ],
      skills: ["CX Strategy", "API Integration", "Staff Training", "Onboarding Design", "Revenue Ops"]
    },
    {
      id: 2,
      eyebrow: "LEGAL · AK LAW FIRM · 2022–2023",
      title: "Director of Marketing",
      desc: "Led a full WordPress redesign integrated with a multichannel market campaign — combining SEO, paid ads, and quantitative call research to drive massive revenue.",
      metrics: [
        { number: "$3.4M", label: "NET REVENUE" },
        { number: "25K", label: "AUDIENCE INSIGHTS" }
      ],
      skills: ["SEO", "Paid Media", "A/B Testing", "WordPress", "Hotjar"]
    },
    {
      id: 3,
      eyebrow: "ECOMMERCE · ULTRA BOTANICA · 2020–2022",
      title: "Digital Marketing Director",
      desc: "Drove conversion optimization using GA4 events, Hotjar behavioral data, and A/B tests — directly improving purchase decisions and reducing cart abandonment.",
      metrics: [
        { number: "23%", label: "CONVERSION LIFT" },
        { number: "15%", label: "CART ABANDON DROP" }
      ],
      skills: ["Google Analytics 4", "Hotjar", "UX Optimization", "Content Strategy"]
    },
    {
      id: 4,
      eyebrow: "AI PROJECT · CLAWBOT · 2026",
      title: "AI Job Automation System",
      desc: "Designed and shipped a full AI automation system — multi-platform job scraping bot, Airtable data layer, and React analytics dashboard — to automate daily job applications.",
      metrics: [
        { number: "4", label: "PLATFORMS AUTOMATED" },
        { number: "LIVE", label: "DEPLOYED & RUNNING" }
      ],
      skills: ["Python", "React", "Airtable API", "Selenium", "AI Architecture"]
    }
  ],

  tools: [
    { icon: "BarChart3", name: "GOOGLE ANALYTICS 4", category: "Analytics" },
    { icon: "Flame", name: "HOTJAR", category: "UX Research" },
    { icon: "Search", name: "SEARCH CONSOLE", category: "SEO" },
    { icon: "Zap", name: "SALESFORCE", category: "CRM" },
    { icon: "Target", name: "HUBSPOT", category: "CRM / Automation" },
    { icon: "MessageSquare", name: "ZENDESK", category: "Support" },
    { icon: "Figma", name: "FIGMA", category: "UX Design" },
    { icon: "Image", name: "ADOBE SUITE", category: "Creative" },
    { icon: "Palette", name: "CANVA", category: "Design" },
    { icon: "GitMerge", name: "ZAPIER", category: "Automation" },
    { icon: "Database", name: "AIRTABLE", category: "Data / Ops" },
    { icon: "FileText", name: "NOTION", category: "Ops / PM" },
    { icon: "Share2", name: "META ADS", category: "Paid Media" },
    { icon: "Globe", name: "GOOGLE ADS", category: "Paid Media" },
    { icon: "Music", name: "TIKTOK ADS", category: "Paid Media" },
    { icon: "Code", name: "PYTHON", category: "Automation" },
    { icon: "Code2", name: "REACT", category: "Frontend" },
    { icon: "Code", name: "HTML / CSS", category: "Web" },
    { icon: "Cpu", name: "CLAUDE / GPT", category: "AI Systems" },
    { icon: "Server", name: "SUPABASE", category: "Database" },
    { icon: "Video", name: "CAPCUT / LOOM", category: "Content" }
  ],

  roles: [
    { rank: "01", title: "DIRECTOR OF CX / CX STRATEGY", salary: "$125K – $165K", fitScore: 93 },
    { rank: "02", title: "DIRECTOR OF GROWTH MARKETING", salary: "$130K – $170K", fitScore: 90 },
    { rank: "03", title: "MARKETING OPERATIONS DIRECTOR", salary: "$115K – $150K", fitScore: 85 },
    { rank: "04", title: "REVENUE OPERATIONS DIRECTOR", salary: "$130K – $175K", fitScore: 84 },
    { rank: "05", title: "CUSTOMER SUCCESS DIRECTOR", salary: "$120K – $158K", fitScore: 81 },
    { rank: "06", title: "AI GTM STRATEGIST", salary: "$135K – $190K", fitScore: 70 }
  ]
};
