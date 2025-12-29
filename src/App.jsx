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
        { name: "Google Search Console", dots: 2 }
      ],
      skills: ["Farsi to English Translation", "Teaching English", "English to Farsi translation", "Computer software repairs", "Fast learner", "Team Worker", "WordPress Website Design", "Creativity"],
      projects: [
        { name: "IranBarc", url: "https://iranbarc.com/" },
        { name: "Darmazon", url: "https://darmazon.com/" },
        { name: "Atena Zist Darman", url: "https://atenazistdarman.com" }
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
        { name: "Google Search Console", dots: 2 }
      ],
      skills: ["ترجمه فارسی به انگلیسی", "تدریس زبان انگلیسی", "ترجمه انگلیسی به فارسی", "تعمیرات نرم‌افزاری کامپیوتر", "یادگیری سریع", "کار تیمی", "طراحی سایت وردپرس", "خلاقیت"],
      projects: [
        { name: "ایران بارسی", url: "https://iranbarc.com/" },
        { name: "درمازون", url: "https://darmazon.com/" },
        { name: "آتنا زیست درمان", url: "https://atenazistdarman.co" }
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
          /* کاهش gap به 5 برای افزایش تراکم پیکسل‌ها در موبایل */
          <PixelCard isStatic={true} className="mobile-bg-pixel" gap={5} speed={25} />
        ) : (
          <PrismaticBurst intensity={1.8} speed={0.2} animationType="hover" color0="#f3bc08" color1="#d1765c" color2="#a010d6" distort={0.3} />
        )}
      </div>

      <div className="pdf-page">
        <SmartCard className="resume-header-card">
          <header className="resume-header">
            <div className="header-text">
              <GradientText className="main-name bold-font">{content.name}</GradientText>
              <p className="subtitle">{content.title}</p>
            </div>
            <img src={profilePic} alt="Amirali" className="profile-img" />
          </header>
        </SmartCard>

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
                <GradientText className="yellow-text bold-font">{isEn ? "Additional Skills" : "مهارت‌های تکمیلی"}</GradientText>
                <div className="skills-grid">
                  {content.skills.map((skill, i) => <span key={i} className="skill-tag">{skill}</span>)}
                </div>
              </section>
            </SmartCard>

            <SmartCard className="side-pixel-wrapper">
              <section className="side-section">
                <GradientText className="yellow-text bold-font">{isEn ? "Projects" : "پروژه‌ها"}</GradientText>
                <div className="projects-list">
                  {content.projects.map((proj, i) => <a key={i} href={proj.url} target="_blank" rel="noreferrer" className="project-link">{proj.name}</a>)}
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