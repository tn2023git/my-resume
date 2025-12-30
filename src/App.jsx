import { useState, useEffect } from 'react';
import './App.css';
import profilePic from './assets/profile.png';
import GradientText from './GradientText';
import PrismaticBurst from './PrismaticBurst';
import PixelCard from './PixelCard';

function App() {
  const [lang, setLang] = useState('en');
  const [isMobile, setIsMobile] = useState(false);
  const isEn = lang === 'en';

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth <= 768);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const data = {
    en: {
      name: "Amirali Dabiri Maram",
      title: "Job Seeker",
      personal: [
        { label: "Age", value: "26 Years (Born May 11th 1999)" },
        { label: "Military", value: "Exempted" },
        { label: "Location", value: "Rey, Tehran" },
        { label: "Status", value: "Single" }
      ],
      contact: [
        { label: "Phone", value: "09371783669" },
        { label: "Email", value: "a.dmaram2023@gmail.com" }
      ],
      languages: [{ name: "English", level: "Native" }],
      salary: "20-25 Million Tomans",
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
      softSkills: ["Fast learner", "Team Worker", "Creativity"],
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
          category: "Gaming & Casting", 
          items: [
            { text: "English Caster: 2nd National DotA 2 Championship of Iran" },
            { text: "Field Reporter for GameHermes:" },
            { text: "Tekken National Championship (Report)", url: "https://www.youtube.com/watch?v=t_eXzo30mAo", isVideo: true },
            { text: "DotA 2 TI9 Pubstomp (Report)", url: "https://www.youtube.com/watch?v=r2H5vpYrGeQ", isVideo: true },
            { text: "Semi-Professional Gamer: 10,000+ hours in DotA 2", detail: "Focus on strategy & high-level play" },
            { text: "FPS & Narrative Games: Battlefield 6, Rainbow Six Siege, Complex Storylines" }
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
        { role: "English Teacher", company: "Pardisan - Tehranpars", date: "Oct 2022 - Feb 2024", duration: "1 Year and 4 Months", desc: "Teaching English to various age groups, focusing on conversation and grammar. Developed lesson plans tailored to student needs and conducted both group and private sessions." },
        { role: "English Teacher", company: "Pooya Middle School", date: "Sep 2021 - May 2022", duration: "8 Months", desc: "Taught English to 7th and 8th graders using online education platforms like Skyroom and Adobe Connect during the pandemic." },
        { role: "English Teacher", company: "Pardisan - Tehranpars", date: "Apr 2021 - Sep 2021", duration: "5 Months", desc: "Instructed English learners through structured curriculum and interactive teaching methods to improve language proficiency." },
        { role: "Customer Support Specialist", company: "Tempus Logix", date: "Jan 2020 - Sep 2020", duration: "8 Months", desc: "Managed customer inquiries in English, coordinated between drivers and clients for car transportation across the US, and resolved logistics issues in a fast-paced environment." },
        { role: "Salesperson", company: "Matin Mobile", date: "Jun 2016 - Dec 2016", duration: "6 Months", desc: "Cellphone software repairs, sale of peripherals and accessories." }
      ]
    },
    fa: {
      name: "امیرعلی دبیری مرام",
      title: "کارجو",
      personal: [
        { label: "سن", value: "۲۶ سال (متولد ۲۱ اردیبهشت ۱۳۷۸)" },
        { label: "سربازی", value: "معاف دائم" },
        { label: "محل سکونت", value: "تهران، ری" },
        { label: "وضعیت تاهل", value: "مجرد" }
      ],
      contact: [
        { label: "موبایل", value: "۰۹۳۷۱۷۸۳۶۶۹" },
        { label: "ایمیل", value: "a.dmaram2023@gmail.com" }
      ],
      languages: [{ name: "انگلیسی", level: "Native" }],
      salary: "۲۰-۲۵ میلیون تومان",
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
      softSkills: ["یادگیری سریع", "کار تیمی", "خلاقیت"],
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
          category: "گیمینگ و گزارشگری", 
          items: [
            { text: "کستر انگلیسی: دومین دوره مسابقات ملی DotA 2 ایران" },
            { text: "گزارشگر میدانی GameHermes:" },
            { text: "گزارش مسابقات ملی Tekken (ویدیو)", url: "https://www.youtube.com/watch?v=t_eXzo30mAo", isVideo: true },
            { text: "گزارش TI9 Pubstomp (ویدیو)", url: "https://www.youtube.com/watch?v=r2H5vpYrGeQ", isVideo: true },
            { text: "گیمر نیمه‌حرفه‌ای: بیش از ۱۰,۰۰۰ ساعت تجربه در DotA 2", detail: "تمرکز بر تفکر استراتژیک" },
            { text: "بازی‌های FPS و داستانی: Battlefield 6، Siege و داستان‌های پیچیده" }
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
        { role: "مدرس زبان انگلیسی", company: "آموزشگاه پردیسان", date: "مهر ۱۴۰۱ - بهمن ۱۴۰۲", duration: "۱ سال و ۴ ماه", desc: "تدریس زبان انگلیسی به رده‌های سنی مختلف با تمرکز بر مهارت‌های گفتاری و گرامر. برنامه‌ریزی آموزشی بر اساس نیاز شاگردان در کلاس‌های گروهی و خصوصی." },
        { role: "تدریس زبان انگلیسی", company: "مدرسه پویا", date: "شهریور ۱۴۰۰ - اردیبهشت ۱۴۰۱", duration: "۸ ماه", desc: "تدریس زبان انگلیسی به دانش‌آموزان پایه‌های هفتم و هشتم با استفاده از پلتفرم‌های آموزش آنلاین اسکای‌روم و ادوبی کانکت." },
        { role: "مدرس زبان انگلیسی", company: "آموزشگاه پردیسان", date: "فروردین ۱۴۰۰ - شهریور ۱۴۰۰", duration: "۵ ماه", desc: "ارائه آموزش‌های زبانی طبق متدهای استاندارد آموزشگاه برای تقویت سطح زبان‌آموزان." },
        { role: "کارشناس خدمات مشتریان", company: "Tempus Logix", date: "دی ۱۳۹۸ - شهریور ۱۳۹۹", duration: "۸ ماه", desc: "برقراری ارتباط مستقیم با مشتریان خارجی به زبان انگلیسی، هماهنگی حمل و نقل خودروها بین رانندگان و مشتریان در سراسر آمریکا و حل مشکلات لجستیکی." },
        { role: "فروشنده", company: "موبایل متین", date: "خرداد ۱۳۹۵ - آذر ۱۳۹۵", duration: "۶ ماه", desc: "حل مشکلات نرم افزاری موبایل، فروش لوازم جانبی و فروش گوشی موبایل." }
      ]
    }
  };

  const content = isEn ? data.en : data.fa;
  const renderDots = (count) => Array.from({ length: 5 }, (_, i) => <span key={i} className={`dot ${i < count ? 'filled' : ''}`}></span>);

  const SmartCard = ({ children, className }) => {
    if (isMobile) return <div className={`mobile-glass-card ${className}`}>{children}</div>;
    return <PixelCard variant="resume" className={className}>{children}</PixelCard>;
  };

  return (
    <div className={`app-wrapper ${isEn ? 'ltr-mode' : 'rtl-mode'}`}>
      <div className="bg-container">
        {isMobile ? (
          <PixelCard isStatic={true} className="mobile-bg-pixel" gap={5} speed={25} />
        ) : (
          <PrismaticBurst intensity={1.8} speed={0.2} animationType="hover" color0="#f3bc08" color1="#d1765c" color2="#a010d6" distort={0.3} />
        )}
      </div>

      <div className="pdf-page">
        <div className="resume-grid">
          <aside className="sidebar">
            <SmartCard className="side-pixel-wrapper">
              <section className="side-section">
                <GradientText className="yellow-text bold-font">{isEn ? "Personal & Contact" : "اطلاعات فردی و تماس"}</GradientText>
                {content.personal.map((p, i) => <p key={i}><b className="bold-font">{p.label}:</b> {p.value}</p>)}
                {content.contact.map((c, i) => <p key={i}><b className="bold-font">{c.label}:</b> {c.value}</p>)}
                <p><b className="bold-font">{isEn ? "Salary Request" : "حقوق درخواستی"}:</b> {content.salary}</p>
              </section>
            </SmartCard>

            <SmartCard className="side-pixel-wrapper">
              <section className="side-section">
                <GradientText className="yellow-text bold-font">{isEn ? "Software" : "نرم‌افزارها"}</GradientText>
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
                <GradientText className="yellow-text bold-font">{isEn ? "Technical Skills" : "مهارت‌های تخصصی"}</GradientText>
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
                <GradientText className="yellow-text bold-font">{isEn ? "Certificates" : "گواهینامه‌ها"}</GradientText>
                <div className="certs-list">
                  {content.certificates.map((cert, i) => (
                    <div key={i} className="cert-item">
                      <div className="cert-name bold-font">{cert.name}</div>
                      {cert.detail && <div className="cert-detail">{cert.detail}</div>}
                      {cert.validity && <div className="cert-validity">{cert.validity}</div>}
                    </div>
                  ))}
                </div>
              </section>
            </SmartCard>

            <SmartCard className="side-pixel-wrapper">
              <section className="side-section">
                <GradientText className="yellow-text bold-font">{isEn ? "Interests & Hobbies" : "علایق و سرگرمی‌ها"}</GradientText>
                <div className="interests-list">
                  {content.interests.map((cat, i) => (
                    <div key={i} className="interest-cat">
                      <div className="interest-cat-name bold-font">{cat.category}</div>
                      {cat.items.map((item, idx) => (
                        <div key={idx} className="interest-item">
                          {item.url ? (
                            <a href={item.url} target="_blank" rel="noreferrer" className={item.isVideo ? "video-link" : "interest-link"}>
                                {item.text}
                            </a>
                          ) : (
                            <span>{item.text}</span>
                          )}
                          {item.detail && <div className="interest-detail">{item.detail}</div>}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </section>
            </SmartCard>

            <SmartCard className="side-pixel-wrapper">
              <section className="side-section">
                <GradientText className="yellow-text bold-font">{isEn ? "Projects" : "پروژه‌ها"}</GradientText>
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
          </aside>

          <main className="main-content">
            {content.experience.map((job, i) => (
              <SmartCard key={i} className="exp-pixel-wrapper">
                <div className="exp-card">
                    <div className="exp-row">
                        <span className="job-role bold-font">{job.role}</span>
                        <span className="job-duration">
                            <GradientText className="duration-text bold-font">{job.duration}</GradientText>
                        </span>
                    </div>
                    <div className="job-company bold-font">{job.company}</div>
                    <div className="job-date">{job.date}</div>
                    <p className="job-desc">{job.desc}</p>
                </div>
              </SmartCard>
            ))}
          </main>
        </div>
      </div>

      <div className="floating-lang-switcher">
        <button className={`flag-btn ${isEn ? 'active' : ''}`} onClick={() => setLang('en')}>
          <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="English" />
        </button>
        <button className={`flag-btn ${!isEn ? 'active' : ''}`} onClick={() => setLang('fa')}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Flag_of_Iran.svg" alt="Farsi" />
        </button>
      </div>
    </div>
  );
}

export default App; 