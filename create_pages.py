import os

header = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Coaxis AI | AI Systems Integrator</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800;900&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <canvas id="three-canvas"></canvas>

  <div class="page">
    <header class="header" id="header">
      <a href="index.html" class="logo">
        <div class="logo-wrapper">
          <img src="./images/coaxis_logo.png" class="brand-logo-img" alt="Coaxis Logo">
          <div class="logo-glow"></div>
        </div>
      </a>

      <nav class="nav">
        <a href="index.html" class="nav-btn">Home</a>
        
        <div class="nav-item">
          <a href="solutions.html" class="nav-btn active">Solutions <span style="font-size: 10px; opacity: 0.5;">▼</span></a>
          <div class="dropdown-menu">
            <a href="services.html" class="dropdown-link">Services</a>
            <a href="partners.html" class="dropdown-link">Partners</a>
            <a href="process.html" class="dropdown-link">Process</a>
          </div>
        </div>

        <div class="nav-item">
          <a href="insights.html" class="nav-btn">Insights <span style="font-size: 10px; opacity: 0.5;">▼</span></a>
          <div class="dropdown-menu">
            <a href="news.html" class="dropdown-link">News</a>
            <a href="blogs.html" class="dropdown-link">Blogs</a>
            <a href="case-studies.html" class="dropdown-link">Case Studies</a>
          </div>
        </div>

        <a href="about.html" class="nav-btn">About Us</a>
        <a href="contact.html" class="nav-btn">Contact</a>
        <a href="contact.html" class="nav-cta">Let's Build</a>
      </nav>
    </header>
"""

footer = """
    <footer class="footer" id="main-footer">
      <div id="footer-3d-bg"></div>
      <div class="container footer-grid">
        <div class="footer-brand">
          <div class="footer-logo-wrap">
            <img src="./images/coaxis_logo.png" class="footer-brand-logo" >
            <div class="logo-glow-footer"></div>
          </div>
          <p class="footer-tagline">Bridging AI's promise and your business reality</p>
        </div>
        <div class="footer-col">
          <h5 class="footer-title">Contact</h5>
          <div class="footer-contact-item">
            <span class="icon">📧</span>
            <a href="javascript:void(0)">rahul.budhraja@coaxis.ai</a>
          </div>
          <div class="footer-contact-item">
            <span class="icon">📧</span>
            <a href="javascript:void(0)">vinay.mathur@coaxis.ai</a>
          </div>
        </div>
        <div class="footer-col">
          <h5 class="footer-title">Company</h5>
          <ul class="footer-menu">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5 class="footer-title">Navigation</h5>
          <ul class="footer-menu">
            <li><a href="#services">Services</a></li>
            <li><a href="#process">Process</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div class="container footer-bottom">
        <p class="footer-copy">© 2026 Coaxis AI Systems Integrator. All rights reserved.</p>
        <div class="footer-trust-tags">
          <span>Human-in-the-Loop</span>
          <span>ROI Accountable</span>
          <span>Privacy First</span>
        </div>
      </div>
    </footer>
  </div><!-- /.page -->

  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="main.js"></script>
</body>
</html>
"""

pages = [
  {
    'name': 'cybersecurity.html',
    'title': 'Cybersecurity AI Solutions',
    'subtitle': 'Enterprise Security Teams & CISOs',
    'image': './images/cybersecurity_ai.png',
    'content': """
      <div class="sme-grid" style="margin-top:40px;">
        <div class="sme-col reveal">
          <div class="sme-card">
            <div class="sme-icon">🛡️</div>
            <div class="sme-card-content">
              <h4>SecurityLens AI</h4>
              <p>Turn alert noise into prioritised action. Focus your operations on real threats, not false positives.</p>
              <a href="securitylens.html" class="btn-ghost" style="margin-top:10px;">View Product →</a>
            </div>
          </div>
        </div>
        <div class="sme-col reveal reveal-delay-1">
          <div class="sme-card">
            <div class="sme-icon">⚠️</div>
            <div class="sme-card-content">
              <h4>RiskSignal AI</h4>
              <p>Predictive risk score per network zone. Stop breaches before they escalate with proactive intelligence.</p>
              <a href="risksignal.html" class="btn-ghost" style="margin-top:10px;">View Product →</a>
            </div>
          </div>
        </div>
      </div>
    """
  },
  {
    'name': 'securitylens.html',
    'title': 'SecurityLens AI — Product Detail',
    'subtitle': 'For Security Operations teams',
    'image': './images/cybersecurity_ai.png',
    'content': """
      <div class="services-grid" style="margin-top:40px;">
        <div class="service-card reveal">
          <div class="service-content-front">
            <h3>Centralized Log Intelligence</h3>
            <p>Reads logs from all security systems in one single pane of glass.</p>
          </div>
        </div>
        <div class="service-card reveal reveal-delay-1">
          <div class="service-content-front">
            <h3>Threat Pattern Recognition</h3>
            <p>AI spots complex patterns signalling real threats, building a growing library of known attack patterns.</p>
          </div>
        </div>
        <div class="service-card reveal reveal-delay-2">
          <div class="service-content-front">
            <h3>Plain-Language Dashboards</h3>
            <p>Delivers plain-language summaries and dashboards ranked by urgency, complete with reusable threat playbooks.</p>
          </div>
        </div>
      </div>
    """
  },
  {
    'name': 'risksignal.html',
    'title': 'RiskSignal AI — Product Detail',
    'subtitle': 'For Security managers, CISOs, C-suite',
    'image': './images/cybersecurity_ai.png',
    'content': """
      <div class="services-grid" style="margin-top:40px;">
        <div class="service-card reveal">
          <div class="service-content-front">
            <h3>Historical Intelligence</h3>
            <p>Learns from years of past incidents, watches live traffic, device behaviour, and access patterns continuously.</p>
          </div>
        </div>
        <div class="service-card reveal reveal-delay-1">
          <div class="service-content-front">
            <h3>Risk Scoring (Like Credit Score)</h3>
            <p>Provides a dynamic risk score per network zone, refreshing continuously as threats evolve.</p>
          </div>
        </div>
        <div class="service-card reveal reveal-delay-2">
          <div class="service-content-front">
            <h3>Threshold Alerts & Explainability</h3>
            <p>Fires threshold alerts when risk spikes, providing fully explainable scores for management reporting.</p>
          </div>
        </div>
      </div>
    """
  },
  {
    'name': 'predictive-intelligence.html',
    'title': 'Our Predictive Intelligence Expertise',
    'subtitle': 'Enterprise buyers evaluating credentials',
    'image': './images/ai_brain_glow.png',
    'content': """
      <div class="sme-grid" style="margin-top:40px;">
        <div class="sme-col reveal">
          <h3 class="sme-col-title">20+ Years Production AI/ML</h3>
          <p>We deploy full stack solutions: ML architecture, predictive modelling, explainability, validation, and deployment. Not just prototypes.</p>
        </div>
        <div class="sme-col highlight-col reveal reveal-delay-1">
          <h3 class="sme-col-title highlight-text">Measurable Business Results</h3>
          <ul class="service-list">
            <li><strong class="highlight-text">Insurance</strong>: Risk evaluation & fraud detection</li>
            <li><strong class="highlight-text">Financial Services</strong>: Algorithmic trading & compliance</li>
            <li><strong class="highlight-text">Retail</strong>: Demand forecasting & supply chain optimization</li>
            <li><strong class="highlight-text">Energy</strong>: Predictive maintenance & grid balancing</li>
          </ul>
        </div>
      </div>
    """
  },
  {
    'name': 'what-is-ai.html',
    'title': 'What is AI?',
    'subtitle': 'For Non-technical SME decision-makers',
    'image': './images/ai_automation.png',
    'content': """
      <div class="process-grid" style="margin-top:40px;">
        <div class="process-connector"></div>
        <div class="process-step reveal">
          <div class="step-circle"><div class="fx-step-icon fx-radar"></div></div>
          <h4>Step 1: Examples</h4>
          <p>You give it examples (past invoices, emails, sales records).</p>
        </div>
        <div class="process-step reveal reveal-delay-1">
          <div class="step-circle"><div class="fx-step-icon fx-diamond"></div></div>
          <h4>Step 2: Patterns</h4>
          <p>It finds the patterns (like a new employee after months on the job).</p>
        </div>
        <div class="process-step reveal reveal-delay-2">
          <div class="step-circle"><div class="fx-step-icon fx-infinity"><div class="circle1"></div><div class="circle2"></div></div></div>
          <h4>Step 3: Application</h4>
          <p>It applies what it learned (flags unusual invoice, answers customer questions, predicts demand).<br><br><em>Real example: Netflix recommendation</em></p>
        </div>
      </div>
    """
  },
  {
    'name': 'types-of-ai.html',
    'title': 'Three Types of AI',
    'subtitle': 'For Non-technical business leaders',
    'image': './images/data_nodes.png',
    'content': """
      <div class="services-grid" style="margin-top:40px;">
        <div class="service-card reveal">
          <div class="service-content-front">
            <h3>Traditional AI (The Analyst)</h3>
            <p>Finds patterns, predicts — fraud detection, demand forecasting, works on structured data.</p>
          </div>
        </div>
        <div class="service-card reveal reveal-delay-1">
          <div class="service-content-front">
            <h3>Generative AI (The Creator)</h3>
            <p>Creates text, answers questions — reports, emails, document Q&A, works with text/images/audio.</p>
          </div>
        </div>
        <div class="service-card reveal reveal-delay-2">
          <div class="service-content-front">
            <h3>Agentic AI (The Doer)</h3>
            <p>Takes action, plans sequences — invoice processing, monitoring & escalation, improves with every run.</p>
          </div>
        </div>
      </div>
    """
  },
  {
    'name': 'ai-led-automation.html',
    'title': 'Regular vs AI-Led Automation',
    'subtitle': 'For Operations, IT, business process owners',
    'image': './images/ai_automation.png',
    'content': """
      <div class="sme-grid" style="margin-top:40px;">
        <div class="sme-col reveal">
          <div class="sme-card">
            <div class="sme-card-content">
              <h4>Regular Automation</h4>
              <ul style="margin-top:10px; padding-left:20px; color:var(--clr-muted)">
                <li style="margin-bottom:10px;">Follows rigid, pre-defined rules</li>
                <li style="margin-bottom:10px;">Breaks when it encounters exceptions</li>
                <li style="margin-bottom:10px;">Needs manual updating for new formats</li>
                <li style="margin-bottom:10px;">Struggles with unstructured documents</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="sme-col highlight-col reveal reveal-delay-1">
          <div class="sme-box">
            <h4 class="highlight-text">AI-Led Automation</h4>
            <ul class="service-list" style="margin-top:15px;">
              <li><div><strong class="highlight-text">✓ Handles Exceptions</strong><p style="font-size:0.9rem; color:var(--clr-muted);">Adapts to unexpected variations intelligently.</p></div></li>
              <li><div><strong class="highlight-text">✓ Learns and Evolves</strong><p style="font-size:0.9rem; color:var(--clr-muted);">Needs less manual updating over time.</p></div></li>
              <li><div><strong class="highlight-text">✓ Works with Docs</strong><p style="font-size:0.9rem; color:var(--clr-muted);">Understands context in unstructured files and emails.</p></div></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="contact-box reveal reveal-delay-2" style="margin-top: 40px; text-align: center;">
        <p style="font-size: 1.2rem; color: var(--clr-accent);">"AI doesn't replace your existing automation — it handles everything your current system can't."</p>
      </div>
    """
  },
  {
    'name': 'ai-ready-data.html',
    'title': 'Human-Ready vs AI-Ready Data',
    'subtitle': 'For Data, operations, and business teams',
    'image': './images/data_nodes.png',
    'content': """
      <div class="sme-grid" style="margin-top:40px;">
        <div class="sme-col reveal">
          <div class="sme-card">
            <div class="sme-icon">👤</div>
            <div class="sme-card-content">
              <h4>Human-Ready Data</h4>
              <p>Word docs, spreadsheets, dashboards — formatted and organized for people to read, interpret, and present.</p>
            </div>
          </div>
        </div>
        <div class="sme-col highlight-col reveal reveal-delay-1">
          <div class="sme-card" style="background: rgba(var(--clr-accent-rgb), 0.05); border: 1px solid rgba(var(--clr-accent-rgb), 0.2);">
            <div class="sme-icon" style="color: var(--clr-accent);">🤖</div>
            <div class="sme-card-content">
              <h4 class="highlight-text">AI-Ready Data</h4>
              <p>Clean databases, consistent labels, indexed docs, access controls, metadata — structured specifically for machines to use.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="contact-box reveal reveal-delay-2" style="margin-top: 40px; text-align: center;">
        <p style="font-size: 1.2rem; color: var(--clr-accent);">"You need both. One empowers your people, the other empowers your AI."</p>
      </div>
    """
  }
]

for page in pages:
    html = f'''{header}
    <section class="hero" style="min-height: 40vh; padding-top: 150px; padding-bottom: 50px;">
      <div class="container hero-container">
        <div class="hero-content" style="max-width: 100%;">
          <span class="hero-badge"><span></span>{page['subtitle']}</span>
          <h1 class="hero-title" style="font-size: 3.5rem;">
            {page['title']}
          </h1>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top: 0;">
      <div class="container">
        <div class="solution-grid">
          <div class="solution-body">
            {page['content']}
          </div>
          <div class="solution-image reveal reveal-delay-2" style="display: flex; align-items: center; justify-content: center;">
            <img src="{page['image']}" alt="{page['title']}" style="border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); width: 100%; object-fit: cover;">
          </div>
        </div>
      </div>
    </section>
  {footer}'''
    
    with open(page['name'], 'w', encoding='utf-8') as f:
        f.write(html)
    print('Created', page['name'])
