import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  BrainCircuit,
  Check,
  Command,
  ExternalLink,
  Linkedin,
  Menu,
  Network,
  Rocket,
  ShieldCheck,
  Sparkles,
  Terminal,
  Users,
  X,
} from 'lucide-react';

const linkedinUrl = 'https://www.linkedin.com/in/svitfoss/';

const benefits = [
  {
    icon: Terminal,
    eyebrow: 'BUILD IN PUBLIC',
    title: 'Learn by shipping',
    body: 'Get hands-on exposure to open-source tools, workflows, and technologies that power the real world.',
    tone: 'lime',
  },
  {
    icon: BrainCircuit,
    eyebrow: 'THINK DEEPLY',
    title: 'Sharpen your edge',
    body: 'Turn complex problems into clear solutions through experimentation, debugging, and logical thinking.',
    tone: 'blue',
  },
  {
    icon: Users,
    eyebrow: 'GROW TOGETHER',
    title: 'Find your people',
    body: 'Practice teamwork, leadership, and collaboration alongside a community that shares what it learns.',
    tone: 'orange',
  },
  {
    icon: Rocket,
    eyebrow: 'MAKE IT COUNT',
    title: 'Contribute for real',
    body: 'Create a visible trail of meaningful work, community impact, and contributions for your future.',
    tone: 'violet',
  },
];

const initialFaculty = [
  { name: 'Dr. Shantakumar B Patil', role: 'Faculty Co-ordinator', initials: 'SB', color: 'orange' },
  { name: 'Prof. Manjusha P K', role: 'Faculty Co-ordinator', initials: 'MP', color: 'blue' },
];

const STORAGE_KEY = 'foss-club-membership-data';

const createInitials = (name: string) => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return 'NA';
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
};

const initialCommittee = [
  { name: 'Samanvi Kiran', role: 'President', initials: 'SK', color: 'lime' },
  { name: 'Shreyas A', role: 'Vice President', initials: 'SA', color: 'blue' },
  { name: 'Viboli Chishi', role: 'Secretary', initials: 'VC', color: 'orange' },
  { name: 'Trinath Bhattacharya', role: 'Joint Secretary', initials: 'TB', color: 'violet' },
  { name: 'Vishnu Shettihalli H', role: 'Treasurer', initials: 'VH', color: 'lime' },
  { name: 'Threebhuvan', role: 'Social Media Lead', initials: 'T', color: 'blue' },
  { name: 'Nagarjuna', role: 'Membership Coordinator', initials: 'N', color: 'orange' },
  { name: 'Niharika Rajput', role: 'Documentation Lead', initials: 'NR', color: 'violet' },
  { name: 'Aditi M Hiremath', role: 'Design Team Lead', initials: 'AH', color: 'orange' },
  { name: 'Surekha P', role: 'Design Team', initials: 'SP', color: 'lime' },
];

const events = [
  {
    tag: 'WORKSHOP',
    date: 'FEB 2026',
    title: 'Hands on Agentic AI Workshop',
    description: 'Session on:\nDay 1: Foundations of LLM Agents and Tool-use.\nDay 2: Exploring Voice AI with Vapi.\nDay 3: Building and deploying custom AI Agents for real-world tasks.',
    images: ['/agentic-ai-1.png', '/agentic-ai-2.png', '/agentic-ai-3.png'],
  },
  {
    tag: 'INAUGURATION',
    date: '9 Feb 2026',
    title: '🚀 Inauguration of FOSS Club – SVIT',
    description: (
      <div className="event-card__description">
        The Department of Computer Science &amp; Engineering at{' '}
        <a href="https://www.linkedin.com/school/sai-vidya-institute-of-technology/" target="_blank" rel="noreferrer">
          Sai Vidya Institute of Technology
        </a>{' '}
        (SVIT), Bengaluru proudly inaugurated the{' '}
        <a href="https://www.linkedin.com/in/svitfoss/" target="_blank" rel="noreferrer">
          Free and Open Source Software FOSS Club
        </a>{' '}
        on 9th February 2026 at Venue B113.
        <br />
        <br />
        The FOSS Club is established with a vision to promote:
        <br />
        🔹 Open-source contribution culture
        <br />
        🔹 Collaborative development
        <br />
        🔹 Technical innovation
        <br />
        🔹 Community-driven learning
      </div>
    ),
    images: [],
  },
  {
    tag: 'COMMUNITY',
    date: 'MAY 2026',
    title: 'FOSS Connect',
    description: 'A campus meetup focused on community building, project showcases, and open conversations.',
    images: ['/foss-connect-1.jpg', '/foss-connect-2.jpg', '/foss-connect-3.jpg'],
  },
];

function ClubMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`club-mark ${compact ? 'club-mark--compact' : ''}`} aria-label="FOSS Club SVIT logo">
      {!compact && <div className="club-mark__halo" />}
      <img src="/foss-club-logo.png" alt="FOSS Club SVIT logo" className="club-mark__img" />
      {!compact && <div className="club-mark__word"><strong>F<span>O</span>SS</strong><small>CLUB · SVIT</small></div>}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);
  const [faculty, setFaculty] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialFaculty;
    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed.faculty) && parsed.faculty.length ? parsed.faculty : initialFaculty;
    } catch {
      return initialFaculty;
    }
  });
  const [committee, setCommittee] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialCommittee;
    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed.committee) && parsed.committee.length ? parsed.committee : initialCommittee;
    } catch {
      return initialCommittee;
    }
  });
  const [isFacultyEditing, setIsFacultyEditing] = useState(false);
  const [isCommitteeEditing, setIsCommitteeEditing] = useState(false);
  const [memberName, setMemberName] = useState('STUDENT NAME');

  useEffect(() => {
    const sections = ['home', 'benefits', 'team', 'events', 'membership', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: '-35% 0px -55% 0px' },
    );
    sections.forEach((id) => document.getElementById(id) && observer.observe(document.getElementById(id)!));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ faculty, committee }),
    );
  }, [faculty, committee]);

  const closeMenu = () => setMenuOpen(false);
  const updateFacultyName = (index: number, value: string) => {
    setFaculty((current) =>
      current.map((person, personIndex) => {
        if (personIndex !== index) return person;
        const nextName = value || 'New faculty coordinator';
        return { ...person, name: nextName, initials: createInitials(nextName) };
      }),
    );
  };
  const updateCommitteeName = (index: number, value: string) => {
    setCommittee((current) =>
      current.map((person, personIndex) => {
        if (personIndex !== index) return person;
        const nextName = value || 'New committee member';
        return { ...person, name: nextName, initials: createInitials(nextName) };
      }),
    );
  };
  const downloadBadge = (name: string) => {
    const safeName = (name || 'STUDENT NAME').trim() || 'STUDENT NAME';
    const template = new Image();
    template.src = '/foss-badge-template.png';

    template.onload = () => {
      const canvas = document.createElement('canvas');
      const width = 1400;
      const height = 1400;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      ctx.drawImage(template, 0, 0, width, height);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#0d2d49';
      ctx.font = '900 58px Galindo, sans-serif';
      ctx.fillText(`[ ${safeName} ]`, width / 2, 1190);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const cleanName = safeName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'foss-club-svit';
        link.href = url;
        link.download = `${cleanName}-membership-badge.png`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
      }, 'image/png');
    };
  };

  return (
    <div className="site-shell">
      <div className="noise" />
      <header className="site-header">
        <a href="#home" className="brand brand--with-divider" onClick={closeMenu}>
          <a href="https://saividya.ac.in/" target="_blank" rel="noreferrer" aria-label="Sai Vidya Institute of Technology website">
            <img src="/svit-logo.png" alt="SVIT logo" className="brand__svit-logo" />
          </a>
          <div className="brand__line" aria-hidden="true" />
          <div className="brand__group">
            <ClubMark compact />
            <span className="brand__text"><strong>FOSS CLUB</strong><small style={{ color: '#ffffff' }}>{'SAI VIDYA INSTITUTE OF TECHNOLOGY'}</small></span>
          </div>
        </a>
        <nav className={`main-nav ${menuOpen ? 'main-nav--open' : ''}`}>
          {['home', 'benefits', 'team', 'events', 'membership', 'contact'].map((item) => (
            <a key={item} className={activeSection === item ? 'is-active' : ''} href={`#${item}`} onClick={closeMenu}>{item === 'team' ? 'Core Committee' : item === 'membership' ? 'Membership' : item[0].toUpperCase() + item.slice(1)}</a>
          ))}
          <a className="mobile-join" href={linkedinUrl} target="_blank" rel="noreferrer">Join the club <ExternalLink size={14} /></a>
        </nav>
        <a className="header-join" href={linkedinUrl} target="_blank" rel="noreferrer">Join Us <ArrowUpRight size={16} /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section id="home" className="hero section-pad">
          <div className="hero__content">
            <div className="eyebrow"><span className="eyebrow-dot" /> DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING</div>
            <h1>An Initiative for<br /><em><span className="hero__nowrap">Democratizing Tech</span>, <span className="hero__accent-dark">Empowering Innovation</span></em></h1>
            <p className="hero__lead">A student-led technical initiative for people who believe the best technology is built together.</p>
            <p className="hero__sub"><span style={{ color: '#ffffff', fontWeight: 700 }}>Vision:</span> Empower students to learn, share, and build with open-source values.<br /><span style={{ color: '#ffffff', fontWeight: 700 }}>Mission:</span> Create a collaborative community that turns curiosity into practical innovation.</p>
            <div className="hero__actions"><a className="button button--primary" href="https://fossunited.org/" target="_blank" rel="noreferrer">EXPLORE FOSS UNITED EVENTS <ArrowUpRight size={17} /></a><a className="text-link" href={linkedinUrl} target="_blank" rel="noreferrer">Follow updates <Linkedin size={16} /></a></div>
            <div className="hero__proof"><div className="avatar-stack"><span>SK</span><span>VC</span><span>TB</span><span>+</span></div><p><strong>One community.</strong><br />Many ways to contribute.</p></div>
          </div>
          <div className="hero__visual"><div className="orbit orbit--one" /><div className="orbit orbit--two" /><div className="hero__glow" /><ClubMark /><div className="terminal-card"><div className="terminal-card__bar"><span /><span /><span /><small>foss-club/manifesto</small></div><div className="terminal-card__code"><span className="code-muted">$ </span><span className="code-green">git clone</span> community<span className="code-muted">/</span>future<br /><span className="code-muted">$ </span><span className="code-blue">cd</span> open-minds<br /><span className="code-muted">$ </span><span className="code-orange">./make-an-impact</span><br /><br /><span className="code-white">Building in public is better.</span><br /><span className="code-green">✓ 3,000+ ideas shared</span><span className="cursor" /></div></div><div className="float-chip chip--top"><Sparkles size={14} /> curiosity-first</div><div className="float-chip chip--bottom"><span className="live-dot" /> community online</div></div>
          <div className="scroll-cue"><span>01</span><div /></div>
        </section>

        <section id="benefits" className="benefits section-pad section-rule">
          <div className="section-heading"><div><span className="section-kicker">02 / WHY JOIN US</span><h2>Make your next<br /><em>move meaningful.</em></h2></div><p>There is no spectator mode here. Bring your curiosity and leave with skills, friendships, and work you are proud to show.</p></div>
          <div className="benefit-grid">{benefits.map(({ icon: Icon, eyebrow, title, body, tone }, index) => <article className={`benefit-card benefit-card--${tone}`} key={title}><div className="benefit-card__number">0{index + 1}</div><div className="benefit-card__icon"><Icon size={22} /></div><span className="card-eyebrow">{eyebrow}</span><h3>{title}</h3><p>{body}</p><div className="card-line" /></article>)}</div>
        </section>

        <section id="team" className="team section-pad section-rule"><div className="section-heading"><div><span className="section-kicker">03 / THE PEOPLE</span><h2>Built by <em>many.</em></h2></div><p>Meet the faculty mentors and student leaders making space for the next generation of builders.</p></div><div className="team-label"><button type="button" className="team-label__toggle" onClick={() => setIsFacultyEditing((value) => !value)} aria-label={isFacultyEditing ? 'Finish editing faculty names' : 'Edit faculty names'}><ShieldCheck size={17} /></button> FACULTY CO-ORDINATORS</div><div className="faculty-grid">{faculty.map((person, index) => <ProfileCard key={`${person.role}-${index}`} person={person} featured editable={isFacultyEditing} onNameChange={(value) => updateFacultyName(index, value)} />)}</div><div className="team-label team-label--students"><button type="button" className="team-label__toggle" onClick={() => setIsCommitteeEditing((value) => !value)} aria-label={isCommitteeEditing ? 'Finish editing committee names' : 'Edit committee names'}><Command size={17} /></button> STUDENT EXECUTIVE COMMITTEE</div><div className="committee-grid">{committee.map((person, index) => <ProfileCard key={`${person.role}-${index}`} person={person} editable={isCommitteeEditing} onNameChange={(value) => updateCommitteeName(index, value)} />)}</div></section>

        <section id="events" className="events section-pad section-rule">
          <div className="section-heading"><div><span className="section-kicker">04 / EVENTS</span><h2>Show up for<br /><em>big ideas.</em></h2></div><p>From workshops to community meetups, we turn curiosity into action through events built for learning and sharing.</p></div>
          <div className="events-grid">{events.map(({ tag, date, title, description, images }) => <article className="event-card" key={title}><div className="event-card__meta"><span>{tag}</span><time>{date}</time></div><h3>{title}</h3>{typeof description === 'string' ? <p>{description}</p> : <div className="event-card__description">{description}</div>}{images.length > 0 && <div className="event-card__gallery">{images.map((src) => <button type="button" className="event-card__gallery-item" key={src} onClick={() => setSelectedImage({ src, title })} aria-label={`View ${title} photo`}><img src={src} alt={`${title} event`} /></button>)}</div>}{title === 'Hands on Agentic AI Workshop' ? <a className="event-card__link" href="https://lnkd.in/p/dCEDS8zp" target="_blank" rel="noreferrer">Learn more <ArrowUpRight size={15} /></a> : <a className="event-card__link" href="https://lnkd.in/p/d_4Bhs33" target="_blank" rel="noreferrer">Learn more <ArrowUpRight size={15} /></a>}</article>)}</div>
          <a className="events-callout" href="https://www.linkedin.com/in/svitfoss/" target="_blank" rel="noreferrer" aria-label="Click to view latest events">
            <span>Click</span>
            <strong>View latest events</strong>
            <ArrowUpRight size={15} />
          </a>
        </section>

        <section id="membership" className="membership section-pad section-rule">
          <div className="section-heading"><div><span className="section-kicker">05 / MEMBERSHIP</span><h2>Get your<br /><em>MEMBERSHIP Badge</em>.</h2></div><p>Enter your name and generate a personalised FOSS Club SVIT membership badge you can download and share.</p></div>
          <div className="membership__content">
            <div className="membership__panel">
              <label htmlFor="member-name" className="membership__label">Student name</label>
              <div className="membership__input-row">
                <input id="member-name" className="membership__input" value={memberName} maxLength={19} onChange={(event) => setMemberName(event.target.value || 'STUDENT NAME')} placeholder="Enter your name" />
                <button type="button" className="membership__button" onClick={() => downloadBadge(memberName)}>
                  Download
                </button>
              </div>
            </div>
            <div className="membership__preview">
              <MembershipBadge name={memberName} />
            </div>
          </div>
        </section>

        <section id="contact" className="contact section-pad section-rule">
          <div className="section-heading">
            <div><span className="section-kicker">06 / CONTACT</span><h2>Let’s build<br /><em>together.</em></h2></div>
            <p>Have a question, idea, or collaboration in mind? Reach out to the FOSS Club SVIT team.</p>
          </div>
          <a className="contact__email" href="mailto:foss.svit@gmail.com">foss.svit@gmail.com <ArrowUpRight size={17} /></a>
        </section>

        <section className="cta section-pad"><div className="cta__pattern"><Network size={190} /></div><div className="cta__inner"><span className="section-kicker">READY WHEN YOU ARE</span><h2>Leave the code<br /><em>better than you found it.</em></h2><p>FOSS Club SVIT is your place to start.</p><a className="button button--primary" href={linkedinUrl} target="_blank" rel="noreferrer">Join the community <ArrowUpRight size={17} /></a></div></section>
      </main>

      {selectedImage && (
        <div className="event-lightbox" onClick={() => setSelectedImage(null)}>
          <div className="event-lightbox__content" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="event-lightbox__close" onClick={() => setSelectedImage(null)} aria-label="Close image">×</button>
            <img src={selectedImage.src} alt={selectedImage.title} />
          </div>
        </div>
      )}

      <footer className="footer"><div className="footer__top">      <a href="#home" className="brand"><ClubMark compact />      <span><strong>FOSS CLUB</strong><small>SAI VIDYA INSTITUTE OF TECHNOLOGY</small></span></a><p>Free & Open Source Software Club<br />Sai Vidya Institute of Technology</p><div className="footer__social"><a href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a></div></div><div className="accreditation"><Check size={15} /> SAI VIDYA INSTITUTE OF TECHNOLOGY · Accredited by NBA, New Delhi (CSE, ECE, ISE) · NAAC — “A” Grade</div><div className="footer__bottom"><span>© 2026 FOSS CLUB SVIT</span><span>Designed for the open web <span className="footer-dot">●</span></span><span className="footer__developers">Developers: <a href="https://github.com/shreyas23dev" target="_blank" rel="noreferrer">Shreyas A</a> &amp; <a href="https://github.com/CodingLangur" target="_blank" rel="noreferrer">Trinath Bhattacharya</a></span></div></footer>    </div>  );}

function MembershipBadge({ name }: { name: string }) {
  const displayName = (name || 'STUDENT NAME').trim() || 'STUDENT NAME';
  return (
    <div className="membership__badge-wrap" aria-label={`FOSS Club SVIT membership badge for ${displayName}`}>
      <img src="/foss-badge-template.png" alt="FOSS Club SVIT membership badge" className="membership__badge-image" />
      <div className="membership__badge-name">{displayName}</div>
    </div>
  );
}

function ProfileCard({
  person,
  featured = false,
  editable = false,
  onNameChange,
}: {
  person: { name: string; role: string; initials: string; color: string };
  featured?: boolean;
  editable?: boolean;
  onNameChange?: (value: string) => void;
}) {
  return (
    <article className={`profile-card ${featured ? 'profile-card--featured' : ''}`}>
      <div className={`profile-avatar profile-avatar--${person.color}`}>{person.initials}</div>
      <div className="profile-info">
        {editable ? (
          <input
            className="profile-input"
            value={person.name}
            onChange={(event) => onNameChange?.(event.target.value)}
            aria-label={`Edit ${person.role} name`}
          />
        ) : (
          <h3>{person.name}</h3>
        )}
        <p>{person.role}</p>
      </div>
      <ArrowUpRight className="profile-arrow" size={17} />
    </article>
  );
}

export default App;
