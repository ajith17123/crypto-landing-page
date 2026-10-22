import React, { useState, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import '../assets/style/Home.css';

// AI-Generated High-Fidelity Assets
import heroCoinsMeadow from '../assets/images/hero-coins-meadow.jpg';
import securityTemple from '../assets/images/security-temple.jpg';
import ctaCoinsMeadow from '../assets/images/cta-coins-meadow.jpg';
import featureTerminal from '../assets/images/feature-terminal.jpg';
import featureAiInsights from '../assets/images/feature-ai-insights.jpg';
import featureInstantExecution from '../assets/images/feature-instant-execution.jpg';
import aiAnalystPreview from '../assets/images/ai-analyst-preview.jpg';
import dashboardShowcase from '../assets/images/dashboard-showcase.jpg';

// AI-Generated Avatars
import avatarHero1 from '../assets/images/avatar-hero1.jpg';
import avatarHero2 from '../assets/images/avatar-hero2.jpg';
import avatarHero3 from '../assets/images/avatar-hero3.jpg';
import avatarHero4 from '../assets/images/avatar-hero4.jpg';
import avatarMichael from '../assets/images/avatar-michael.jpg';
import avatarSarah from '../assets/images/avatar-sarah.jpg';
import avatarJames from '../assets/images/avatar-james.jpg';

// Sparkline SVG Component
const Sparkline = ({ points, isGain }) => {
  const strokeColor = isGain ? '#00c076' : '#ef4444';
  const fillColor = isGain ? 'rgba(0, 192, 118, 0.08)' : 'rgba(239, 68, 68, 0.08)';
  return (
    <svg className="sparkline-svg" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={`${points} L 120 32 L 0 32 Z`} fill={fillColor} />
      <path d={points} stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// Custom Orbith Logo Icon SVG
const OrbithLogoIcon = ({ color = '#0f172a' }) => (
  <svg className="logo-icon-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="14" stroke={color} strokeWidth="3.5" />
    <circle cx="16" cy="16" r="6" fill={color} />
    <rect x="13.5" y="13.5" width="5" height="5" fill="#fbfbf9" />
  </svg>
);

export default function Home() {
  // Navigation & Filter States
  const [activeMarketTab, setActiveMarketTab] = useState('All');
  const [activeAiFeature, setActiveAiFeature] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Dynamic Modals States
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');

  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoName, setDemoName] = useState('');
  const [demoEmail, setDemoEmail] = useState('');
  const [demoRole, setDemoRole] = useState('Retail Trader');

  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [tradeAmount, setTradeAmount] = useState('1000');
  const [tradeAction, setTradeAction] = useState('BUY');

  // Newsletter & Feedback State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimeoutRef = useRef(null);

  const cardsRef = useRef([]);

  const showToast = useCallback((msg) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  }, []);

  // Smooth Scroll Helper
  const scrollToSection = useCallback((e, targetId) => {
    if (e && e.preventDefault) e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Safe GSAP 3D Tilt for cards
  const handleCardMouseMove = useCallback((e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    gsap.to(card, {
      rotateX: ((y - cy) / cy) * -6,
      rotateY: ((x - cx) / cx) * 6,
      scale: 1.025,
      duration: 0.3,
      ease: 'power1.out',
      transformPerspective: 1000,
    });
  }, []);

  const handleCardMouseLeave = useCallback((index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.45, ease: 'power2.out' });
  }, []);

  // Market Table Data
  const marketData = [
    { id: '01', symbol: 'BTC', name: 'Bitcoin', price: '$118,450', change: '+4.8%', isGain: true, volume: '$3.2B', sparkline: 'M 0 24 Q 20 28, 40 18 T 80 10 T 120 4', category: ['All', 'Gainers', 'Volume'] },
    { id: '02', symbol: 'ETH', name: 'Ethereum', price: '$5,920', change: '+3.1%', isGain: true, volume: '$1.8B', sparkline: 'M 0 26 Q 25 18, 50 20 T 90 12 T 120 6', category: ['All', 'Gainers', 'Volume'] },
    { id: '03', symbol: 'SOL', name: 'Solana', price: '$275.40', change: '+6.2%', isGain: true, volume: '$850M', sparkline: 'M 0 28 Q 30 25, 60 14 T 95 8 T 120 3', category: ['All', 'Gainers', 'Volume'] },
    { id: '04', symbol: 'XRP', name: 'XRP', price: '$2.84', change: '+2.4%', isGain: true, volume: '$620M', sparkline: 'M 0 22 Q 25 24, 55 16 T 90 14 T 120 8', category: ['All', 'Gainers'] },
    { id: '05', symbol: 'ADA', name: 'Cardano', price: '$1.12', change: '-1.3%', isGain: false, volume: '$340M', sparkline: 'M 0 8 Q 30 12, 60 22 T 95 24 T 120 28', category: ['All', 'Losers'] },
    { id: '06', symbol: 'AVAX', name: 'Avalanche', price: '$48.20', change: '+5.7%', isGain: true, volume: '$480M', sparkline: 'M 0 25 Q 35 22, 65 12 T 100 6 T 120 2', category: ['All', 'Gainers'] },
  ];

  const filteredMarket = marketData.filter((coin) => coin.category.includes(activeMarketTab));

  const partners = [
    { name: 'Bitcoin', icon: 'bi-currency-bitcoin' },
    { name: 'Ethereum', icon: 'bi-gem' },
    { name: 'Solana', icon: 'bi-layers-fill' },
    { name: 'Chainlink', icon: 'bi-hexagon-fill' },
    { name: 'Uniswap', icon: 'bi-arrow-left-right' },
    { name: 'Avalanche', icon: 'bi-triangle-fill' },
    { name: 'Polygon', icon: 'bi-bounding-box-circles' },
    { name: 'Polkadot', icon: 'bi-record-circle' },
  ];

  const aiFeatures = [
    { title: 'Trend Prediction', detail: 'Real-time multi-horizon neural forecasting models with 87.4% historical directional accuracy.' },
    { title: 'Sentiment Analysis', detail: 'NLP pipeline scraping real-time crypto social channels, news feeds, and whale wallet movements.' },
    { title: 'Portfolio Recommendations', detail: 'Automated dynamic portfolio rebalancing with volatility-hedged mathematical risk parity.' },
    { title: 'Risk Alerts', detail: 'Instant millisecond notification triggers on liquidity anomalies and unusual order-book depth spikes.' },
    { title: 'Automated Signals', detail: 'Institutional-grade Buy/Sell signals with explicit Stop-Loss and Take-Profit entry targets.' },
  ];

  const testimonials = [
    { name: 'Michael Carter', role: 'Professional Trader', rating: '4.9', avatar: avatarMichael, quote: 'Clean design, powerful features, and institutional-grade analytics make this platform stand out from the competition.' },
    { name: 'Sarah Wilson', role: 'Crypto Investor', rating: '4.6', avatar: avatarSarah, quote: "Real-time market intelligence and risk monitoring have significantly improved our trading performance. It's one of the most reliable crypto platforms I've used." },
    { name: 'James Anderson', role: 'Day Trader & Educator', rating: '4.7', avatar: avatarJames, quote: 'Fast execution, accurate signals, and advanced charting tools have helped me improve my win rate and manage risk more effectively.' },
  ];

  // Carousel controls
  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Auth Form Submit
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!authEmail) return;
    setAuthModalOpen(false);
    showToast(
      authMode === 'signin'
        ? `Welcome back! Signed in successfully as ${authEmail}.`
        : `Account created for ${authName || authEmail}! Welcome to Orbith Pro.`
    );
    setAuthEmail('');
    setAuthPassword('');
    setAuthName('');
  };

  // Demo Form Submit
  const handleDemoSubmit = (e) => {
    e.preventDefault();
    if (!demoEmail) return;
    setDemoModalOpen(false);
    showToast(`VIP Demo scheduled for ${demoName || 'Trader'} (${demoEmail})! Check your inbox.`);
    setDemoEmail('');
    setDemoName('');
  };

  // Quick Trade Submit
  const handleTradeSubmit = (e) => {
    e.preventDefault();
    if (!selectedCoin) return;
    setTradeModalOpen(false);
    showToast(`Order executed: ${tradeAction} $${tradeAmount} of ${selectedCoin.symbol} at ${selectedCoin.price}.`);
  };

  // Newsletter Submit
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    showToast(`Subscribed! Daily institutional market intelligence will be sent to ${newsletterEmail}.`);
    setNewsletterEmail('');
  };

  return (
    <div className="orbith-wrapper">
      {/* ====================================================================
          1. FLOATING NAVBAR
          ==================================================================== */}
      <header className="orbith-header">
        <div className="orbith-container">
          <div className="orbith-nav-inner">
            <a href="#" className="orbith-logo" onClick={(e) => scrollToSection(e, '#root')}>
              <OrbithLogoIcon color="#0f172a" />
              <span>orbith</span>
            </a>

            <nav className="orbith-nav-center">
              <a href="#" className="nav-link-item active" onClick={(e) => scrollToSection(e, '#root')}>
                <span className="nav-link-dot"></span>
                <span>Home</span>
              </a>
              <a href="#markets" className="nav-link-item" onClick={(e) => scrollToSection(e, '#markets')}>Markets</a>
              <a href="#features" className="nav-link-item" onClick={(e) => scrollToSection(e, '#features')}>Features</a>
              <a href="#portfolio" className="nav-link-item" onClick={(e) => scrollToSection(e, '#portfolio')}>Portfolio</a>
              <a href="#ai-tools" className="nav-link-item" onClick={(e) => scrollToSection(e, '#ai-tools')}>AI Tools</a>
            </nav>

            <div className="orbith-nav-right">
              <button
                className="nav-signin-btn"
                onClick={() => { setAuthMode('signin'); setAuthModalOpen(true); }}
              >
                Sign In
              </button>
              <button
                className="btn-primary-dark nav-cta-btn"
                onClick={() => { setAuthMode('signup'); setAuthModalOpen(true); }}
              >
                <span>Start Trading</span>
                <span className="btn-arrow-badge">↗</span>
              </button>
              <button
                className="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                <i className={`bi ${mobileMenuOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer anim-fade-down">
            <div className="mobile-nav-inner">
              <a href="#" className="mobile-nav-link" onClick={(e) => scrollToSection(e, '#root')}>
                <i className="bi bi-house-door"></i> Home
              </a>
              <a href="#markets" className="mobile-nav-link" onClick={(e) => scrollToSection(e, '#markets')}>
                <i className="bi bi-graph-up"></i> Markets
              </a>
              <a href="#features" className="mobile-nav-link" onClick={(e) => scrollToSection(e, '#features')}>
                <i className="bi bi-cpu"></i> Features
              </a>
              <a href="#portfolio" className="mobile-nav-link" onClick={(e) => scrollToSection(e, '#portfolio')}>
                <i className="bi bi-pie-chart"></i> Portfolio
              </a>
              <a href="#ai-tools" className="mobile-nav-link" onClick={(e) => scrollToSection(e, '#ai-tools')}>
                <i className="bi bi-stars"></i> AI Tools
              </a>
              <div className="mobile-nav-divider"></div>
              <div className="mobile-nav-btn-stack">
                <button
                  className="btn-secondary-white mobile-full-btn"
                  onClick={() => { setMobileMenuOpen(false); setAuthMode('signin'); setAuthModalOpen(true); }}
                >
                  Sign In
                </button>
                <button
                  className="btn-primary-dark mobile-full-btn"
                  onClick={() => { setMobileMenuOpen(false); setAuthMode('signup'); setAuthModalOpen(true); }}
                >
                  <span>Start Trading</span>
                  <span className="btn-arrow-badge">↗</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ====================================================================
          2. HERO SECTION
          ==================================================================== */}
      <section className="orbith-hero">
        <div className="orbith-container">
          {/* Social Proof Pill */}
          <div className="hero-social-pill anim-fade-down">
            <div className="avatar-stack">
              <img src={avatarHero1} alt="Trader" className="avatar-stack-item" />
              <img src={avatarHero2} alt="Trader" className="avatar-stack-item" />
              <img src={avatarHero3} alt="Trader" className="avatar-stack-item" />
              <img src={avatarHero4} alt="Trader" className="avatar-stack-item" />
            </div>
            <span className="hero-social-text">Used by 500,000+ Crypto Traders</span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-headline anim-fade-up anim-delay-1">
            Trade Crypto Smarter<br />
            Faster &amp; <span className="orbith-serif-italic">More Securely</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subheadline anim-fade-up anim-delay-2">
            Buy, sell, and manage digital assets with real-time analytics, advanced charting tools,
            automated trading strategies, and enterprise-grade security.
          </p>

          {/* Dual Action Buttons */}
          <div className="hero-cta-group anim-fade-up anim-delay-3">
            <button
              className="btn-primary-dark"
              onClick={() => { setAuthMode('signup'); setAuthModalOpen(true); }}
            >
              <span>Start Trading</span>
              <span className="btn-arrow-badge">↗</span>
            </button>
            <button
              className="btn-secondary-white"
              onClick={(e) => scrollToSection(e, '#markets')}
            >
              <span>Explore Markets</span>
            </button>
          </div>
        </div>

        {/* FULL SCREEN & FULL WIDTH HERO MEADOW COINS IMAGE (Break out of container) */}
        <div className="hero-image-wrapper anim-scale-up anim-delay-4">
          <img
            src={heroCoinsMeadow}
            alt="Cryptocurrency coins in blooming meadow"
            className="hero-coins-img hero-floating-element"
          />
          <div className="hero-image-gradient-overlay"></div>
        </div>

        {/* ====================================================================
            3. LIVE CRYPTO TICKER MARQUEE
            ==================================================================== */}
        <div className="ticker-ribbon-container">
          <div className="ticker-track">
            {/* Loop 1 */}
            <div className="ticker-item"><span className="ticker-symbol">SOL</span><span className="ticker-price">$175</span><span className="ticker-change gain">+4.8%</span></div>
            <div className="ticker-item"><span className="ticker-symbol">XRP</span><span className="ticker-price">$1.04</span><span className="ticker-change loss">-0.6%</span></div>
            <div className="ticker-item"><span className="ticker-symbol">BNB</span><span className="ticker-price">$742</span><span className="ticker-change loss">-1.2%</span></div>
            <div className="ticker-item"><span className="ticker-symbol">LINK</span><span className="ticker-price">$28.5</span><span className="ticker-change gain">+1.8%</span></div>
            <div className="ticker-item"><span className="ticker-symbol">MATIC</span><span className="ticker-price">$1.24</span><span className="ticker-change gain">+2.5%</span></div>
            <div className="ticker-item"><span className="ticker-symbol">ADA</span><span className="ticker-price">$0.89</span><span className="ticker-change loss">-0.6%</span></div>
            <div className="ticker-item"><span className="ticker-symbol">BTC</span><span className="ticker-price">$118,450</span><span className="ticker-change gain">+4.8%</span></div>
            <div className="ticker-item"><span className="ticker-symbol">ETH</span><span className="ticker-price">$3,840</span><span className="ticker-change gain">+3.2%</span></div>
            {/* Loop 2 (Duplicate for continuous marquee) */}
            <div className="ticker-item"><span className="ticker-symbol">SOL</span><span className="ticker-price">$175</span><span className="ticker-change gain">+4.8%</span></div>
            <div className="ticker-item"><span className="ticker-symbol">XRP</span><span className="ticker-price">$1.04</span><span className="ticker-change loss">-0.6%</span></div>
            <div className="ticker-item"><span className="ticker-symbol">BNB</span><span className="ticker-price">$742</span><span className="ticker-change loss">-1.2%</span></div>
            <div className="ticker-item"><span className="ticker-symbol">LINK</span><span className="ticker-price">$28.5</span><span className="ticker-change gain">+1.8%</span></div>
            <div className="ticker-item"><span className="ticker-symbol">MATIC</span><span className="ticker-price">$1.24</span><span className="ticker-change gain">+2.5%</span></div>
            <div className="ticker-item"><span className="ticker-symbol">ADA</span><span className="ticker-price">$0.89</span><span className="ticker-change loss">-0.6%</span></div>
            <div className="ticker-item"><span className="ticker-symbol">BTC</span><span className="ticker-price">$118,450</span><span className="ticker-change gain">+4.8%</span></div>
            <div className="ticker-item"><span className="ticker-symbol">ETH</span><span className="ticker-price">$3,840</span><span className="ticker-change gain">+3.2%</span></div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. ECOSYSTEM / PARTNERS ROW
          ==================================================================== */}
      <section className="ecosystem-section">
        <div className="orbith-container">
          <div className="ecosystem-layout">
            <h2 className="ecosystem-heading scroll-reveal">
              Trusted by Traders Around the Globe
            </h2>
            <div className="ecosystem-badges-grid">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="coin-badge scroll-reveal"
                  style={{ animationDelay: `${index * 0.07}s` }}
                  onClick={() => showToast(`Selected partner network: ${partner.name}. Real-time bridge active.`)}
                >
                  <span className="coin-badge-icon">
                    <i className={`bi ${partner.icon}`}></i>
                  </span>
                  <span>{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. PLATFORM FEATURES GRID
          ==================================================================== */}
      <section id="features" className="features-section">
        <div className="orbith-container">
          <div className="features-header scroll-reveal">
            <div className="section-tag-pill">Platform Features</div>
            <h2 className="features-title">
              Everything You Need to<br />
              Trade <span className="orbith-serif-italic">Successfully</span>
            </h2>
          </div>

          <div className="features-grid">
            {[
              { src: featureTerminal, alt: 'Advanced Trading Terminal', title: 'Advanced Trading', italic: 'Terminal' },
              { src: featureAiInsights, alt: 'AI Market Insights', title: 'AI Market', italic: 'Insights' },
              { src: featureInstantExecution, alt: 'Instant Order Execution', title: 'Instant Order', italic: 'Execution' },
            ].map((card, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                onMouseMove={(e) => handleCardMouseMove(e, index)}
                onMouseLeave={() => handleCardMouseLeave(index)}
                className="feature-card scroll-reveal"
                style={{ animationDelay: `${index * 0.15}s` }}
                onClick={() => { setAuthMode('signup'); setAuthModalOpen(true); }}
              >
                <div className="feature-card-media">
                  <img src={card.src} alt={card.alt} className="feature-card-img" />
                </div>
                <div className="feature-card-content">
                  <h3 className="feature-card-title">
                    {card.title} <span className="orbith-serif-italic">{card.italic}</span>
                  </h3>
                  <p className="feature-card-desc">
                    Real-time market intelligence, advanced order routing, and precision analytics
                    designed for institutional and professional traders.
                  </p>
                  <div className="feature-card-action">
                    <span>Explore Feature</span>
                    <i className="bi bi-arrow-right"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. LIVE MARKET INTELLIGENCE & SECURITY SECTION
          ==================================================================== */}
      <section id="markets" className="market-security-section">
        <div className="orbith-container">
          {/* Market Intelligence Header */}
          <div className="market-header scroll-reveal">
            <div>
              <div className="section-tag-pill">Live Market</div>
              <h2 className="market-title">
                Real-Time Market <span className="orbith-serif-italic">Intelligence</span>
              </h2>
            </div>
            <div className="market-filter-tabs">
              {['All', 'Gainers', 'Losers', 'Volume'].map((tab) => (
                <button
                  key={tab}
                  className={`market-tab-btn ${activeMarketTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveMarketTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Live Market Table with Horizontal Responsive Touch Container */}
          <div className="market-table-card scroll-reveal">
            <div className="table-responsive-wrapper">
              <table className="crypto-table">
                <thead>
                  <tr>
                    <th>/#</th>
                    <th>Asset</th>
                    <th>Price</th>
                    <th>24h Change</th>
                    <th>Volume</th>
                    <th>7d Change</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMarket.map((coin) => (
                    <tr
                      key={coin.id}
                      className="table-coin-row"
                      onClick={() => {
                        setSelectedCoin(coin);
                        setTradeModalOpen(true);
                      }}
                    >
                      <td className="table-index">/{coin.id}</td>
                      <td>
                        <div className="table-asset-cell">
                          <div className="asset-icon-box">
                            <i className={`bi ${coin.symbol === 'BTC' ? 'bi-currency-bitcoin' : coin.symbol === 'ETH' ? 'bi-gem' : 'bi-circle-half'}`}></i>
                          </div>
                          <div className="asset-info">
                            <span className="asset-name">{coin.symbol}</span>
                            <span className="asset-fullname">{coin.name}</span>
                          </div>
                        </div>
                      </td>
                      <td className="table-price">{coin.price}</td>
                      <td>
                        <span className={`table-badge ${coin.isGain ? 'gain' : 'loss'}`}>{coin.change}</span>
                      </td>
                      <td className="table-volume">{coin.volume}</td>
                      <td><Sparkline points={coin.sparkline} isGain={coin.isGain} /></td>
                      <td>
                        <button
                          className="table-trade-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCoin(coin);
                            setTradeModalOpen(true);
                          }}
                        >
                          Trade
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Security Built Into Every Transaction */}
          <div className="security-subsection">
            <div className="security-content scroll-reveal">
              <div className="section-tag-pill">Security</div>
              <h2 className="security-title">
                Security Built Into<br />
                Every <span className="orbith-serif-italic">Transaction</span>
              </h2>
              <p className="security-desc">
                Advanced encryption, cold storage, monitoring, and institutional security keep your
                assets protected worldwide.
              </p>
              <ul className="security-checklist">
                {['Cold Wallet Storage', 'Multi-Signature Protection', '2FA Authentication', 'Real-Time Risk Monitoring', 'Withdrawal Protection'].map((item) => (
                  <li key={item} className="checklist-item">
                    <span className="check-icon">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                className="btn-primary-dark"
                onClick={() => setDemoModalOpen(true)}
              >
                <span>Institutional Audit Report</span>
                <span className="btn-arrow-badge">↗</span>
              </button>
            </div>

            <div className="security-visual-wrapper scroll-reveal scroll-reveal-right">
              {/* Laser scanner overlay */}
              <div className="security-laser-scanner"></div>
              <img
                src={securityTemple}
                alt="Institutional Classical Neoclassical Temple Security Vault"
                className="security-temple-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. AI TRADING ANALYST SECTION
          ==================================================================== */}
      <section id="ai-tools" className="ai-analyst-section">
        <div className="orbith-container">
          <div className="ai-analyst-layout">
            {/* Visual Glass Terminal Preview */}
            <div className="ai-terminal-visual scroll-reveal">
              <div className="ai-terminal-radar-pulse"></div>
              <img src={aiAnalystPreview} alt="AI Analyst Active Session" className="ai-terminal-img" />
              <div className="ai-terminal-interactive-overlay">
                <div className="ai-status-badge">
                  <span className="ai-live-indicator"></span>
                  <span>Model Online (v4.2 Neural Forecast)</span>
                </div>
              </div>
            </div>

            {/* AI Copy & Interactive Feature List */}
            <div className="ai-content scroll-reveal scroll-reveal-right">
              <div className="section-tag-pill">AI Trading Assistant</div>
              <h2 className="ai-title">
                Your Personal AI<br />
                Trading <span className="orbith-serif-italic">Analyst</span>
              </h2>
              <p className="ai-desc">
                Leverage AI to uncover market opportunities, monitor risks, analyze trading patterns,
                and optimize investment decisions in real time.
              </p>

              <div className="ai-features-list">
                {aiFeatures.map((item, idx) => (
                  <div
                    key={idx}
                    className={`ai-feature-row ${activeAiFeature === idx ? 'active' : ''}`}
                    onClick={() => {
                      setActiveAiFeature(idx);
                      showToast(`AI Analyst activated: ${item.title}`);
                    }}
                  >
                    <div className="check-label">
                      <span className="check-icon">✓</span>
                      <div>
                        <div className="ai-feature-title-text">{item.title}</div>
                        {activeAiFeature === idx && (
                          <div className="ai-feature-detail-text anim-fade-up">{item.detail}</div>
                        )}
                      </div>
                    </div>
                    <span className="ai-feature-arrow">
                      <i className={`bi ${activeAiFeature === idx ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
                    </span>
                  </div>
                ))}
              </div>

              <button
                className="btn-primary-dark"
                onClick={() => { setAuthMode('signup'); setAuthModalOpen(true); }}
              >
                <span>Try AI Assistant</span>
                <span className="btn-arrow-badge">↗</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. PORTFOLIO DASHBOARD SHOWCASE
          ==================================================================== */}
      <section id="portfolio" className="portfolio-section">
        <div className="orbith-container">
          <div className="portfolio-header scroll-reveal">
            <div className="section-tag-pill">Portfolio Dashboard</div>
            <h2 className="portfolio-title">
              Track and Grow Your<br />
              Trade <span className="orbith-serif-italic">Portfolio</span>
            </h2>
            <p className="portfolio-desc">
              Monitor market data, manage positions, and optimize profits with an intuitive real-time interface.
            </p>
          </div>

          <div
            className="dashboard-showcase-wrapper scroll-reveal dashboard-3d-reveal"
            onClick={() => { setAuthMode('signup'); setAuthModalOpen(true); }}
            style={{ cursor: 'pointer' }}
            title="Click to launch portfolio demo"
          >
            <img src={dashboardShowcase} alt="Orbith Pro Trader Portfolio Dashboard" className="dashboard-img" />
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. TESTIMONIALS SECTION
          ==================================================================== */}
      <section className="testimonials-section">
        <div className="orbith-container">
          <div className="testimonials-top-bar scroll-reveal">
            <div>
              <div className="section-tag-pill">Testimonials</div>
              <h2 className="testimonials-title">
                What Traders <span className="orbith-serif-italic">Say</span>
              </h2>
            </div>
            <div className="testimonials-nav-arrows">
              <button
                className="arrow-circle-btn"
                aria-label="Previous testimonial"
                onClick={handlePrevTestimonial}
              >
                <i className="bi bi-arrow-left"></i>
              </button>
              <button
                className="arrow-circle-btn dark"
                aria-label="Next testimonial"
                onClick={handleNextTestimonial}
              >
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className={`testimonial-card scroll-reveal ${activeTestimonial === idx ? 'active-testimonial-card' : ''}`}
                style={{ animationDelay: `${idx * 0.12}s` }}
                onClick={() => setActiveTestimonial(idx)}
              >
                <div>
                  <div className="testimonial-rating-row">
                    <img src={t.avatar} alt={t.name} className="testimonial-user-avatar" />
                    <span className="star-rating-badge">
                      <i className="bi bi-star-fill star-icon"></i>
                      <span>{t.rating}</span>
                    </span>
                  </div>
                  <div className="testimonial-quote-icon">"</div>
                  <p className="testimonial-body">{t.quote}</p>
                </div>
                <div className="testimonial-author-box">
                  <div className="author-name">{t.name}</div>
                  <div className="author-role">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          10. BOTTOM CALL-TO-ACTION (CTA) BANNER
          ==================================================================== */}
      <section id="cta" className="cta-banner-section">
        <div className="orbith-container cta-banner-container scroll-reveal">
          <div className="hero-social-pill">
            <div className="avatar-stack">
              <img src={avatarHero1} alt="Trader" className="avatar-stack-item" />
              <img src={avatarHero2} alt="Trader" className="avatar-stack-item" />
              <img src={avatarHero3} alt="Trader" className="avatar-stack-item" />
              <img src={avatarHero4} alt="Trader" className="avatar-stack-item" />
            </div>
            <span className="hero-social-text">Used by 500,000+ Crypto Traders</span>
          </div>

          <h2 className="cta-headline">
            Start Your Crypto Trading<br />
            Journey With <span className="orbith-serif-italic">Confidence</span>
          </h2>

          <p className="cta-subheadline">
            Join thousands of traders using advanced AI tools, deep liquidity, and
            institutional-grade security to maximize opportunities in the crypto market.
          </p>

          <div className="cta-btn-group">
            <button
              className="btn-primary-dark"
              onClick={() => { setAuthMode('signup'); setAuthModalOpen(true); }}
            >
              <span>Create Free Account</span>
              <span className="btn-arrow-badge">↗</span>
            </button>
            <button
              className="btn-secondary-white"
              onClick={() => setDemoModalOpen(true)}
            >
              <span>Schedule Demo</span>
            </button>
          </div>
        </div>

        {/* FULL SCREEN & FULL WIDTH CTA MEADOW COINS FOREGROUND (Edge-to-Edge) */}
        <div className="cta-coins-foreground scroll-reveal">
          <img src={ctaCoinsMeadow} alt="Crypto coins array in meadow" className="cta-coins-img" />
          <div className="cta-coins-gradient-overlay"></div>
        </div>
      </section>

      {/* ====================================================================
          11. MODERN EMERALD FOOTER
          ==================================================================== */}
      <footer className="orbith-footer-card">
        <div className="orbith-container">
          <div className="footer-top-grid">
            {/* Brand Col */}
            <div className="footer-brand-col">
              <div className="footer-logo">
                <OrbithLogoIcon color="#ffffff" />
                <span>orbith</span>
              </div>
              <p className="footer-brand-desc">
                Next-generation institutional and algorithmic cryptocurrency exchange. Biophilic elegance paired with ultra-low latency execution.
              </p>
              <div className="footer-email-box">
                <span className="footer-email-label">Email Support</span>
                <a href="mailto:hello@orbith.com" className="footer-email-link">hello@orbith.com</a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="footer-col-title">Services</h4>
              <ul className="footer-nav-list">
                <li><a href="#markets" onClick={(e) => scrollToSection(e, '#markets')} className="footer-nav-link">Spot Trading</a></li>
                <li><a href="#markets" onClick={(e) => scrollToSection(e, '#markets')} className="footer-nav-link">Futures</a></li>
                <li><a href="#markets" onClick={(e) => scrollToSection(e, '#markets')} className="footer-nav-link">Staking</a></li>
                <li><a href="#ai-tools" onClick={(e) => scrollToSection(e, '#ai-tools')} className="footer-nav-link">AI Copy Trading</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="footer-col-title">Company</h4>
              <ul className="footer-nav-list">
                <li><a href="#features" onClick={(e) => scrollToSection(e, '#features')} className="footer-nav-link">About Us</a></li>
                <li><a href="#features" onClick={(e) => scrollToSection(e, '#features')} className="footer-nav-link">Careers</a></li>
                <li><a href="#features" onClick={(e) => scrollToSection(e, '#features')} className="footer-nav-link">Blog &amp; Research</a></li>
                <li><a href="#features" onClick={(e) => scrollToSection(e, '#features')} className="footer-nav-link">Press Kit</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="footer-col-title">Resources</h4>
              <ul className="footer-nav-list">
                <li><a href="#markets" onClick={(e) => scrollToSection(e, '#markets')} className="footer-nav-link">Market Insights</a></li>
                <li><a href="#ai-tools" onClick={(e) => scrollToSection(e, '#ai-tools')} className="footer-nav-link">Trading Academy</a></li>
                <li><a href="#portfolio" onClick={(e) => scrollToSection(e, '#portfolio')} className="footer-nav-link">API Docs</a></li>
                <li><a href="#cta" onClick={(e) => scrollToSection(e, '#cta')} className="footer-nav-link">Help Center</a></li>
              </ul>
            </div>

            {/* Follow & Newsletter */}
            <div>
              <h4 className="footer-col-title">Market Alpha</h4>
              <p className="footer-newsletter-text">
                Subscribe to get daily institutional trade setups &amp; macro alpha straight to your inbox.
              </p>
              <form className="footer-subscribe-form" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  className="footer-subscribe-input"
                  placeholder="Enter email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <button type="submit" className="footer-subscribe-btn">
                  <i className="bi bi-arrow-right"></i>
                </button>
              </form>
              <div className="footer-social-grid">
                <a href="https://x.com" target="_blank" rel="noreferrer" className="social-icon-box" aria-label="X (Twitter)"><i className="bi bi-twitter-x"></i></a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon-box" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-box" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-box" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
              </div>
            </div>
          </div>

          {/* Divider & Copyright */}
          <div className="footer-divider-row">
            <a href="#root" onClick={(e) => { e.preventDefault(); showToast('Privacy Policy (v2.8) complies with GDPR and SOC2 Type II standard.'); }} className="footer-legal-link">Privacy Policy</a>
            <span>© 2026 Orbith Digital Asset Technologies. All rights reserved.</span>
            <a href="#root" onClick={(e) => { e.preventDefault(); showToast('Terms of Service governing institutional-grade spot and derivatives trading.'); }} className="footer-legal-link">Terms of Service</a>
          </div>

          {/* Giant Watermark Wordmark */}
          <div className="footer-giant-watermark">
            <div className="footer-giant-word">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
                style={{ width: '0.85em', height: '0.85em', display: 'inline-block', verticalAlign: 'middle', marginRight: '0.04em' }}>
                <circle cx="50" cy="50" r="44" stroke="#ffffff" strokeWidth="12" fill="none" />
                <circle cx="50" cy="50" r="24" fill="#ffffff" />
                <rect x="42" y="42" width="16" height="16" fill="#123624" />
              </svg>
              <span>rbith</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ====================================================================
          12. DYNAMIC INTERACTIVE MODALS & TOAST
          ==================================================================== */}

      {/* Auth Modal (Sign In / Register) */}
      {authModalOpen && (
        <div className="orbith-modal-backdrop anim-fade-in" onClick={() => setAuthModalOpen(false)}>
          <div className="orbith-modal-card anim-scale-up" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setAuthModalOpen(false)} aria-label="Close modal">
              <i className="bi bi-x-lg"></i>
            </button>

            <div className="modal-header">
              <div className="modal-logo">
                <OrbithLogoIcon color="#0f172a" />
                <span>orbith</span>
              </div>
              <h3 className="modal-title">
                {authMode === 'signin' ? 'Welcome Back to Orbith' : 'Create Pro Trading Account'}
              </h3>
              <p className="modal-subtitle">
                {authMode === 'signin'
                  ? 'Access your institutional dashboard and automated trading strategies.'
                  : 'Get started in under 60 seconds with zero deposit fees.'}
              </p>
            </div>

            <div className="modal-tabs">
              <button
                className={`modal-tab-btn ${authMode === 'signin' ? 'active' : ''}`}
                onClick={() => setAuthMode('signin')}
              >
                Sign In
              </button>
              <button
                className={`modal-tab-btn ${authMode === 'signup' ? 'active' : ''}`}
                onClick={() => setAuthMode('signup')}
              >
                Create Account
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="modal-form">
              {authMode === 'signup' && (
                <div className="modal-input-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Alex Morgan"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="modal-input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  required
                />
              </div>

              <div className="modal-input-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-primary-dark modal-submit-btn">
                <span>{authMode === 'signin' ? 'Sign In to Terminal' : 'Start Trading Now'}</span>
                <span className="btn-arrow-badge">↗</span>
              </button>
            </form>

            <div className="modal-divider"><span>or connect with</span></div>

            <div className="modal-social-actions">
              <button
                type="button"
                className="modal-social-btn"
                onClick={() => { setAuthModalOpen(false); showToast('Authenticated via Google.'); }}
              >
                <i className="bi bi-google"></i> Google
              </button>
              <button
                type="button"
                className="modal-social-btn"
                onClick={() => { setAuthModalOpen(false); showToast('Web3 Wallet connected via WalletConnect.'); }}
              >
                <i className="bi bi-wallet2"></i> Web3 Wallet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Demo Modal */}
      {demoModalOpen && (
        <div className="orbith-modal-backdrop anim-fade-in" onClick={() => setDemoModalOpen(false)}>
          <div className="orbith-modal-card anim-scale-up" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setDemoModalOpen(false)} aria-label="Close modal">
              <i className="bi bi-x-lg"></i>
            </button>

            <div className="modal-header">
              <div className="section-tag-pill">Institutional &amp; VIP</div>
              <h3 className="modal-title">Schedule a Live Platform Demo</h3>
              <p className="modal-subtitle">
                Tour our low-latency matching engine, customized API routing, and AI predictive insights with an Orbith specialist.
              </p>
            </div>

            <form onSubmit={handleDemoSubmit} className="modal-form">
              <div className="modal-input-group">
                <label>Contact Name</label>
                <input
                  type="text"
                  placeholder="Morgan Vance"
                  value={demoName}
                  onChange={(e) => setDemoName(e.target.value)}
                  required
                />
              </div>

              <div className="modal-input-group">
                <label>Corporate / Investor Email</label>
                <input
                  type="email"
                  placeholder="vance@capital.com"
                  value={demoEmail}
                  onChange={(e) => setDemoEmail(e.target.value)}
                  required
                />
              </div>

              <div className="modal-input-group">
                <label>Trading Profile</label>
                <select
                  value={demoRole}
                  onChange={(e) => setDemoRole(e.target.value)}
                  className="modal-select"
                >
                  <option value="Retail Trader">Individual Pro Trader</option>
                  <option value="Hedge Fund">Hedge Fund / Asset Manager</option>
                  <option value="Market Maker">Market Maker / Liquidity Provider</option>
                  <option value="Proprietary Desk">Proprietary Trading Firm</option>
                </select>
              </div>

              <button type="submit" className="btn-primary-dark modal-submit-btn">
                <span>Confirm VIP Demo Booking</span>
                <span className="btn-arrow-badge">↗</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Quick Trade Modal */}
      {tradeModalOpen && selectedCoin && (
        <div className="orbith-modal-backdrop anim-fade-in" onClick={() => setTradeModalOpen(false)}>
          <div className="orbith-modal-card anim-scale-up" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setTradeModalOpen(false)} aria-label="Close modal">
              <i className="bi bi-x-lg"></i>
            </button>

            <div className="modal-header">
              <div className="quick-trade-badge">
                <span className="asset-name">{selectedCoin.symbol}</span>
                <span className="asset-fullname">({selectedCoin.name})</span>
              </div>
              <div className="quick-trade-price-display">
                <span className="quick-trade-price">{selectedCoin.price}</span>
                <span className={`table-badge ${selectedCoin.isGain ? 'gain' : 'loss'}`}>{selectedCoin.change}</span>
              </div>
            </div>

            <div className="trade-action-toggle">
              <button
                type="button"
                className={`trade-toggle-btn buy ${tradeAction === 'BUY' ? 'active' : ''}`}
                onClick={() => setTradeAction('BUY')}
              >
                Buy {selectedCoin.symbol}
              </button>
              <button
                type="button"
                className={`trade-toggle-btn sell ${tradeAction === 'SELL' ? 'active' : ''}`}
                onClick={() => setTradeAction('SELL')}
              >
                Sell {selectedCoin.symbol}
              </button>
            </div>

            <form onSubmit={handleTradeSubmit} className="modal-form">
              <div className="modal-input-group">
                <label>Amount in USD ($)</label>
                <input
                  type="number"
                  min="10"
                  step="10"
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(e.target.value)}
                  required
                />
              </div>

              <div className="trade-summary-row">
                <span>Estimated Receive:</span>
                <strong>
                  ~{(parseFloat(tradeAmount || 0) / parseFloat(selectedCoin.price.replace(/[$,]/g, ''))).toFixed(4)} {selectedCoin.symbol}
                </strong>
              </div>

              <button
                type="submit"
                className={`modal-submit-btn ${tradeAction === 'BUY' ? 'btn-trade-buy' : 'btn-trade-sell'}`}
              >
                <span>Execute {tradeAction} Order</span>
                <span className="btn-arrow-badge">↗</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Interactive Toast Feedback */}
      {toastMessage && (
        <div className="orbith-toast anim-fade-up">
          <div className="toast-icon"><i className="bi bi-check-circle-fill"></i></div>
          <div className="toast-message">{toastMessage}</div>
          <button className="toast-close" onClick={() => setToastMessage(null)} aria-label="Close toast">
            <i className="bi bi-x"></i>
          </button>
        </div>
      )}
    </div>
  );
}
