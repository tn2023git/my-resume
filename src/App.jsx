import { useState, useEffect } from 'react';
import './App.css';
import profilePic from './assets/profile.png';
import GradientText from './GradientText';
import PixelCard from './PixelCard';
import ProfileCard from './ProfileCard';
import Aurora from './Aurora'; 

function App() {
  const [lang, setLang] = useState('en');
  const [showResume, setShowResume] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [bgActivated, setBgActivated] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const isEn = lang === 'en';

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth <= 768);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handleStart = (selectedLang) => {
    setLang(selectedLang);
    setIsExiting(true);
    
    setTimeout(() => {
      setBgActivated(true); // Triggers pixel rendering
      setShowResume(true);
      setIsExiting(false);
    }, 800);
  };

  const handleReturn = () => {
    setShowResume(false);
    // bgActivated stays true so background doesn't vanish/reset
  };

  const handlePrint = () => {
    window.print();
  };

  const data = {
    en: {
        name: "Amirali Dabiri Maram",
        title: "Job Seeker",
        summary: "With over 5 years of experience in educational and administrative environments, focusing on professional English proficiency and website design. Beyond technical skills, I possess strong capabilities in public speaking, strategic thinking for complex problem-solving, and a competitive drive to achieve peak quality in every project. Combined with high teamwork skills for advancing collective goals, I am committed to optimizing processes, continuous learning, and maintaining global standards in professional communication.",
        personal: [
          { label: "Age", value: "26 Years (Born May 11th 1999)" },
          { label: "Military", value: "Exempted" },
          { label: "Location", value: "Rey, Tehran" },
          { label: "Status", value: "Single" }
        ],
        contact: [
          { label: "Phone", value: "09371783669" },
          { label: "Email", value: "a.dmaram2023@gmail.com" },
          { label: "Telegram", value: "tn2023", url: "https://t.me/tn2023" }
        ],
        languages: [{ name: "English", level: "Native" }],
        software: [
          { name: "Adobe Photoshop", dots: 3 }, 
          { name: "Adobe Premiere", dots: 3 },
          { name: "Microsoft Word", dots: 5 }, 
          { name: "Microsoft Powerpoint", dots: 4 },
          { name: "Microsoft Excel", dots: 3 }, 
          { name: "WordPress", dots: 4 }, 
          { name: "Elementor", dots: 4 },
          { name: "AI (Gemini)", dots: 4 },
          { name: "Google Search Console", dots: 2 }
        ],
        technicalSkills: [
          { name: "Farsi to English Translation", level: 85 },
          { name: "English to Farsi translation", level: 70 },
          { name: "Teaching English", level: 75 },
          { name: "Computer software repairs", level: 80 },
          { name: "WordPress Website Design", level: 90 }
        ],
        softSkills: ["Fast Learner", "Teamwork", "Public Speaking", "Strategic Thinking", "Time Management", "Problem Solving", "Adaptability"],
        certificates: [
          { 
            name: "IELTS Academic (Overall: 8.0)", 
            detail: "L: 9.0, R: 8.5, S: 8.0, W: 7.0",
            validity: "Active until Feb 7th, 2026"
          },
          { name: "TTC (Teacher Training Course)", detail: "Score: 52/60" },
          { name: "Diploma in Tourism", detail: "" }
        ],
        interests: [
          {
            category: "Music",
            items: [
              { text: "Electric Guitarist", detail: "Pre-intermediate level, currently training towards professional proficiency" }
            ]
          },
          {
            category: "Communications & Media",
            items: [
              { text: "English Caster: 2nd National DotA 2 Championship of Iran", detail: "Professional presentation and narration" },
              { text: "Field Reporter for GameHermes", detail: "Professional presentation and narration" },
              { text: "Tekken National Championship (Report)", url: "https://www.youtube.com/watch?v=t_eXzo30mAo", isVideo: true },
              { text: "DotA 2 TI9 Pubstomp (Report)", url: "https://www.youtube.com/watch?v=r2H5vpYrGeQ", isVideo: true },
              { text: "Content Creation & Streaming", detail: "Video editing and digital storytelling" },
              { text: "YouTube Channel (Gaming Archive)", url: "https://www.youtube.com/@tnonyoutube", isVideo: true },
              { text: "Twitch Streamer (Former)", url: "https://www.twitch.tv/tn2023", isVideo: true }
            ]
          },
          { 
            category: "Gaming", 
            items: [
              { text: "Semi-Professional MOBA Gamer: More than 10,000 hours in DotA 2", detail: "Focus on strategy & high-level play" },
              { text: "FPS Games: Battlefield & Rainbow Six: Siege", detail: "Improved reaction times and tactical planning" },
              { text: "ARPG Games: Path Of Exile", detail: "Complex crafting systems and expanded, deep progression systems" },
              { text: "Narrative Games: Alan Wake, Control, LA. Noire", detail: "Complex, deep stories" }
            ]
          }
        ],
        projects: [
          { name: "IranBarc", url: "https://iranbarc.com/", tags: ["AI", "Wordpress", "Elementor"] },
          { name: "Darmazon", url: "https://darmazon.com/", tags: ["Photoshop", "Wordpress", "Elementor"] },
          { name: "Atena Zist Darman", url: "https://atenazistdarman.com", tags: ["AI", "Wordpress", "Elementor", "Premiere", "Photoshop"] }
        ],
        experience: [
          { role: "Office Assistant", company: "Atena Zist Darman", date: "Apr 2024 - Nov 2025", duration: "1 Year and 7 Months", desc: "Handling all administrative and clerical tasks, drafting correspondence, archiving, answering phones, issuing invoices, entering data into the Faradis CRM system, preparing reports, and troubleshooting routine software issues." },
          { role: "English Teacher", company: "Pardisan - Narmak & Tehranpars", date: "Oct 2022 - Feb 2024", duration: "1 Year and 4 Months", desc: "Teaching English to various age groups, focusing on conversation and grammar. Developed lesson plans tailored to student needs and conducted both group and private sessions." },
          { role: "English Teacher", company: "Pouya Middle School - Rey", date: "Sep 2021 - May 2022", duration: "8 Months", desc: "Taught English to 7th and 8th graders using online education platforms like Skyroom and Adobe Connect during the pandemic." },
          { role: "English Teacher", company: "Pardisan - Narmak", date: "Apr 2021 - Sep 2021", duration: "5 Months", desc: "Instructed English learners through structured curriculum and interactive teaching methods to improve language proficiency." },
          { role: "Customer Support Specialist", company: "Tempus Logix - Armenia", date: "Jan 2020 - Sep 2020", duration: "8 Months", desc: "Managed customer inquiries in English, coordinated between drivers and clients for car transportation across the US, and resolved logistics issues in a fast-paced environment." },
          { role: "Salesperson", company: "Matin Mobile", date: "Jun 2016 - Dec 2016", duration: "6 Months", desc: "Cellphone software repairs, sale of peripherals and accessories." }
        ]
    },
    fa: {
        name: "امیرعلی دبیری مرام",
        title: "کارجو",
        summary: "دارای بیش از ۵ سال تجربه در حوزه‌های آموزشی و اداری با تمرکز بر تسلط حرفه‌ای به زبان انگلیسی و طراحی وب‌سایت. فراتر از مهارت‌های فنی، دارای توانمندی بالا در فن بیان و سخنرانی عمومی و تفکر استراتژیک در حل مسائل پیچیده هستم. روحیه‌ی رقابتی در کنار مهارت‌های همکاری تیمی بالا برای پیشبرد اهداف مشترک، مرا در دستیابی به بالاترین سطح کیفیت در پروژه‌ها یاری می‌کند. متعهد به بهینه‌سازی فرآیندها، یادگیری مستمر و حفظ استانداردهای جهانی در ارتباطات حرفه‌ای.",
        personal: [
          { label: "سن", value: "۲۶ سال (متولد ۲۱ اردیبهشت ۱۳۷۸)" },
          { label: "سربازی", value: "معاف دائم" },
          { label: "محل سکونت", value: "تهران، ری" },
          { label: "وضعیت تاهل", value: "مجرد" }
        ],
        contact: [
          { label: "موبایل", value: "۰۹۳۷۱۷۸۳۶۶۹" },
          { label: "ایمیل", value: "a.dmaram2023@gmail.com" },
          { label: "تلگرام", value: "تلگرام", url: "https://t.me/tn2023" }
        ],
        languages: [{ name: "انگلیسی", level: "Native" }],
        software: [
          { name: "Adobe Photoshop", dots: 3 }, 
          { name: "Adobe Premiere", dots: 3 },
          { name: "Microsoft Word", dots: 5 }, 
          { name: "Microsoft Powerpoint", dots: 4 },
          { name: "Microsoft Excel", dots: 3 }, 
          { name: "WordPress", dots: 4 }, 
          { name: "Elementor", dots: 4 },
          { name: "AI (Gemini)", dots: 4 },
          { name: "Google Search Console", dots: 2 }
        ],
        technicalSkills: [
          { name: "ترجمه فارسی به انگلیسی", level: 85 },
          { name: "ترجمه انگلیسی به فارسی", level: 70 },
          { name: "تدریس زبان انگلیسی", level: 75 },
          { name: "تعمیرات نرم‌افزاری کامپیوتر", level: 80 },
          { name: "طراحی سایت وردپرس", level: 90 }
        ],
        softSkills: ["یادگیری سریع", "کار تیمی", "فن بیان", "تفکر استراتژیک", "مدیریت زمان", "حل مسئله", "انعطاف پذیری"],
        certificates: [
          { 
            name: "آیلتس آکادمیک (نمره کل: ۸.۰)", 
            detail: "شنیداری: ۹، خواندن: ۸.۵، گفتاری: ۸، نوشتاری: ۷",
            validity: "معتبر تا ۱۸ بهمن ۱۴۰۴"
          },
          { name: "مدرک TTC (تربیت مدرس)", detail: "نمره: ۵۲ از ۶۰" },
          { name: "دیپلم گردشگری", detail: "" }
        ],
        interests: [
          {
            category: "موسیقی",
            items: [
              { text: "نوازنده گیتار الکتریک", detail: "سطح Pre-intermediate، در حال آموزش برای رسیدن به سطح حرفه‌ای" }
            ]
          },
          {
            category: "ارتباطات و رسانه",
            items: [
              { text: "کستر انگلیسی: دومین دوره مسابقات ملی DotA 2 ایران", detail: "ارائه و گزارشگری حرفه‌ای" },
              { text: "گزارشگر میدانی GameHermes", detail: "ارائه و گزارشگری حرفه‌ای" },
              { text: "گزارش مسابقات ملی Tekken (ویدیو)", url: "https://www.youtube.com/watch?v=t_eXzo30mAo", isVideo: true },
              { text: "گزارش TI9 Pubstomp (ویدیو)", url: "https://www.youtube.com/watch?v=r2H5vpYrGeQ", isVideo: true },
              { text: "تولید محتوا و استریم", detail: "تدوین ویدیو و روایت دیجیتال" },
              { text: "کانال یوتیوب (آرشیو گیمینگ)", url: "https://www.youtube.com/@tnonyoutube", isVideo: true },
              { text: "استریمر سابق توییچ", url: "https://www.twitch.tv/tn2023", isVideo: true }
            ]
          },
          { 
            category: "گیمینگ", 
            items: [
              { text: "گیمر نیمه‌حرفه‌ای MOBA: بیش از ۱۰,۰۰۰ ساعت تجربه در DotA 2", detail: "تمرکز بر تفکر استراتژیک و بازی در سطح بالا" },
              { text: "بازی‌های FPS: سری بازی های Battlefield و بازی Rainbow Six: Siege", detail: "تقویت سرعت واکنش و برنامه‌ریزی تاکتیکی" },
              { text: "بازی‌های ARPG: عنوان Path Of Exile", detail: "سیستم‌های ساخت و ساز پیچیده و مکانیزم‌های پیشرفت عمیق" },
              { text: "بازی‌های داستانی: Alan Wake، Control، LA. Noire", detail: "روایت‌های پیچیده و عمیق" }
            ]
          }
        ],
        projects: [
          { name: "ایران بارسی", url: "https://iranbarc.com/", tags: ["AI", "Wordpress", "Elementor"] },
          { name: "درمازون", url: "https://darmazon.com/", tags: ["Photoshop", "Wordpress", "Elementor"] },
          { name: "آتنا زیست درمان", url: "https://atenazistdarman.com", tags: ["AI", "Wordpress", "Elementor", "Premiere", "Photoshop"] }
        ],
        experience: [
          { role: "منشی و مسئول دفتر", company: "آتنا زیست درمان", date: "فروردین ۱۴۰۳ - آبان ۱۴۰۴", duration: "۱ سال و ۷ ماه", desc: "انجام تمامی امور اداری و دفتری، تنظیم نامه ها، بایگانی، پاسخگویی به تلفن ها و صدور فاکتور ها، ثبت اطلاعات در سیستم CRM فرادیس، تهیه گزارش ها و رسیدگی به مشکلات ساده نرم افزاری روزمره." },
          { role: "مدرس زبان انگلیسی", company: "آموزشگاه پردیسان نارمک و تهرانپارس", date: "مهر ۱۴۰۱ - بهمن ۱۴۰۲", duration: "۱ سال و ۴ ماه", desc: "تدریس زبان انگلیسی به رده‌های سنی مختلف با تمرکز بر مهارت‌های گفتاری و گرامر. برنامه‌ریزی آموزشی بر اساس نیاز شاگردان در کلاس‌های گروهی و خصوصی." },
          { role: "تدریس زبان انگلیسی", company: "مدرسه پویا - شهرری", date: "شهریور ۱۴۰۰ - اردیبهشت ۱۴۰۱", duration: "۸ ماه", desc: "تدریس زبان انگلیسی به دانش‌آموزان پایه‌های هفتم و هشتم با استفاده از پلتفرم‌های آموزش آنلاین اسکای‌روم و ادوبی کانکت." },
          { role: "مدرس زبان انگلیسی", company: "آموزشگاه پردیسان نارمک", date: "فروردین ۱۴۰۰ - شهریور ۱۴۰۰", duration: "۵ ماه", desc: "ارائه آموزش‌های زبانی طبق متدهای استاندارد آموزشگاه برای تقویت سطح زبان‌آموزان." },
          { role: "کارشناس خدمات مشتریان", company: "Tempus Logix - ارمنستان", date: "دی ۱۳۹۸ - شهریور ۱۳۹۹", duration: "۸ ماه", desc: "برقراری ارتباط مستقیم با مشتریان خارجی به زبان انگلیسی، هماهنگی حمل و نقل خودروها بین رانندگان و مشتریان در سراسر آمریکا و حل مشکلات لجستیکی." },
          { role: "فروشنده", company: "موبایل متین", date: "خرداد ۱۳۹۵ - آذر ۱۳۹۵", duration: "۶ ماه", desc: "حل مشکلات نرم افزاری موبایل، فروش لوازم جانبی و فروش گوشی موبایل." }
        ]
    }
  };

  const content = isEn ? data.en : data.fa;
  const renderDots = (count) => Array.from({ length: 5 }, (_, i) => <span key={i} className={`dot ${i < count ? 'filled' : ''}`}></span>);

  const SmartCard = ({ children, className }) => {
    if (isMobile) return <div className={`mobile-glass-card fade-in-section ${className}`}>{children}</div>;
    return <PixelCard variant="resume" className={`fade-in-section ${className}`}>{children}</PixelCard>;
  };

  return (
    <div className={`app-wrapper ${isEn ? 'ltr-mode' : 'rtl-mode'}`}>
      <div className={`bg-container is-active`}>
        {!isMobile ? (
          <Aurora 
              colorStops={['#f3bc08', '#d8854b', '#a010d6']} 
              speed={1.25} 
              blend={0.75} 
              active={true}
          />
        ) : (
          <div className="mobile-pixel-bg-wrapper">
              <PixelCard 
                isStatic={true} 
                className="mobile-bg-pixel" 
                gap={5} 
                speed={25} 
                active={bgActivated} // RESTARTS on lang selection, stays on return
              />
          </div>
        )}
      </div>

      {!showResume ? (
        <div className="gateway-container">
           <div className="profile-card-glow"></div>
           <ProfileCard 
             avatarUrl={profilePic} 
             onSelectLang={handleStart} 
             enableMobileTilt={true}
             isExiting={isExiting}
           />
        </div>
      ) : (
        <div className="pdf-page">
          <SmartCard className="full-width-summary">
            <section className="side-section summary-inner">
              <GradientText className="yellow-text bold-font" animationSpeed={3}>{isEn ? "Professional Summary" : "درباره من"}</GradientText>
              <p className="summary-text">{content.summary}</p>
            </section>
          </SmartCard>

          <div className="info-columns-container">
            <SmartCard className="side-pixel-wrapper">
              <section className="side-section">
                <GradientText className="yellow-text bold-font" animationSpeed={3}>{isEn ? "Personal & Contact" : "اطلاعات فردی و تماس"}</GradientText>
                {content.personal.map((p, i) => <p key={i}><b className="bold-font">{p.label}:</b> {p.value}</p>)}
                {content.contact.map((c, i) => (
                  <p key={i}>
                    <b className="bold-font">{c.label}:</b> {c.url ? (
                      <a href={c.url} target="_blank" rel="noreferrer" className="contact-link">{c.value}</a>
                    ) : c.value}
                  </p>
                ))}
              </section>
            </SmartCard>

            <SmartCard className="side-pixel-wrapper">
              <section className="side-section">
                <GradientText className="yellow-text bold-font" animationSpeed={3}>{isEn ? "Software" : "نرم‌افزارها"}</GradientText>
                <div className="software-container">
                  {content.software.map((s, i) => (
                    <div key={i} className="software-item">
                      <span className="soft-name">{s.name}</span>
                      <div className="dots-container">{renderDots(s.dots)}</div>
                    </div>
                  ))}
                </div>
              </section>
            </SmartCard>

            <SmartCard className="side-pixel-wrapper">
              <section className="side-section">
                <GradientText className="yellow-text bold-font" animationSpeed={3}>{isEn ? "Certificates" : "گواهینامه‌ها"}</GradientText>
                <div className="certs-list">
                  {content.certificates.map((cert, i) => (
                    <div key={i} className="cert-item">
                      <div className="cert-name bold-font">{cert.name}</div>
                      {cert.detail && <div className="cert-detail">{cert.detail}</div>}
                    </div>
                  ))}
                </div>
              </section>
            </SmartCard>

            <SmartCard className="side-pixel-wrapper">
              <section className="side-section">
                <GradientText className="yellow-text bold-font" animationSpeed={3}>{isEn ? "Technical Skills" : "مهارت‌های تخصصی"}</GradientText>
                <div className="technical-skills-list">
                  {content.technicalSkills.map((skill, i) => (
                    <div key={i} className="skill-progress-item">
                      <span className="skill-name">{skill.name}</span>
                      <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: `${skill.level}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </SmartCard>

            <SmartCard className="side-pixel-wrapper">
              <section className="side-section">
                <GradientText className="yellow-text bold-font" animationSpeed={3}>{isEn ? "Soft Skills" : "مهارت‌های تکمیلی"}</GradientText>
                <div className="soft-skills-tags">
                  {content.softSkills.map((skill, i) => <span key={i} className="soft-tag">{skill}</span>)}
                </div>
              </section>
            </SmartCard>

            <SmartCard className="side-pixel-wrapper">
              <section className="side-section">
                <GradientText className="yellow-text bold-font" animationSpeed={3}>{isEn ? "Projects" : "پروژه‌ها"}</GradientText>
                <div className="projects-list">
                  {content.projects.map((proj, i) => (
                    <div key={i} className="project-item">
                      <a href={proj.url} target="_blank" rel="noreferrer" className="project-link">{proj.name}</a>
                      <div className="project-tags">
                        {proj.tags.map((tag, idx) => <span key={idx} className="tag">{tag}</span>)}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </SmartCard>

            <SmartCard className="side-pixel-wrapper">
              <section className="side-section">
                <GradientText className="yellow-text bold-font" animationSpeed={3}>{isEn ? "Interests & Hobbies" : "علایق و سرگرمی‌ها"}</GradientText>
                <div className="interests-list">
                  {content.interests.map((cat, i) => (
                    <div key={i} className="interest-cat">
                      <div className="interest-cat-name bold-font">{cat.category}</div>
                      {cat.items.map((item, idx) => (
                        <div key={idx} className="interest-item">
                          {item.url ? (
                            <a href={item.url} target="_blank" rel="noreferrer" className="video-link">{item.text}</a>
                          ) : <span>{item.text}</span>}
                          {item.detail && <div className="interest-detail">{item.detail}</div>}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </section>
            </SmartCard>
          </div>

          <div className="experience-full-width">
            {content.experience.map((job, i) => (
              <SmartCard key={i} className="exp-pixel-wrapper">
                <div className="exp-card">
                    <div className="exp-row">
                        <span className="job-role bold-font">{job.role}</span>
                        <GradientText className="duration-text bold-font" animationSpeed={3}>{job.duration}</GradientText>
                    </div>
                    <div className="job-company bold-font">{job.company}</div>
                    <div className="job-date">{job.date}</div>
                    <p className="job-desc">{job.desc}</p>
                </div>
              </SmartCard>
            ))}
          </div>

          <div className="floating-actions-container">
            <button className="floating-btn" onClick={handleReturn} aria-label="Return">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <button className="floating-btn" onClick={handlePrint} aria-label="Print">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <path d="M6 14h12v8H6z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;