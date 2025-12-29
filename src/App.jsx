import { useState } from 'react';
import './App.css';
import profilePic from './assets/profile.png';

function App() {
  const [lang, setLang] = useState('en');
  const isEn = lang === 'en';

  const data = {
    en: {
      name: "Amirali Dabiri Maram",
      title: "English Teacher & Office Assistant",
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
        { name: "Microsoft Word", dots: 4 },
        { name: "Microsoft Powerpoint", dots: 3 },
        { name: "Microsoft Excel", dots: 2 },
        { name: "Wordpress", dots: 3 },
        { name: "Google Search Console", dots: 1 }
      ],
      skills: ["Farsi to English Translation", "Teaching English", "English to Farsi translation", "Computer software repairs", "Fast learner", "Team Worker", "WordPress Website Design", "Creativity"],
      projects: [
        { name: "IranBarc", url: "https://iranbarc.com/" },
        { name: "Darmazon", url: "https://darmazon.com/" },
        { name: "Atena Zist Darman", url: "https://atenazistdarman.co" }
      ],
      experience: [
        { role: "Office Assistant", company: "Atena Zist Darman", date: "Apr 2024 - Nov 2025", duration: "1 year and 7 months", desc: "Administrative support and office coordination." },
        { role: "English Teacher", company: "Pardisan - Tehranpars", date: "Oct 2022 - Feb 2024", duration: "1 year and 4 months", desc: "Teaching English privately and in groups." },
        { role: "English Teacher", company: "Pooya Middle School", date: "Sep 2021 - May 2022", duration: "8 months", desc: "Teaching English to 7th and 8th graders using smart tools like Skyroom." },
        { role: "English Teacher", company: "Pardisan - Tehranpars", date: "Apr 2021 - Sep 2021", duration: "5 months", desc: "Teaching English privately and in groups." },
        { role: "Customer Support Specialist", company: "Tempus Logix", date: "Jan 2020 - Sep 2020", duration: "8 months", desc: "Handling international logistics and client communications in English." },
        { role: "Salesperson", company: "Matin Mobile", date: "Jun 2016 - Dec 2016", duration: "6 months", desc: "Cellphone software repairs, sale of peripherals and accessories." }
      ]
    },
    fa: {
      name: "امیرعلی دبیری مرام",
      title: "مدرس زبان انگلیسی و مسئول دفتر",
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
        { name: "Microsoft Word", dots: 4 },
        { name: "Microsoft Powerpoint", dots: 3 },
        { name: "Microsoft Excel", dots: 2 },
        { name: "Wordpress", dots: 3 },
        { name: "Google Search Console", dots: 1 }
      ],
      skills: ["ترجمه فارسی به انگلیسی", "تدریس زبان انگلیسی", "ترجمه انگلیسی به فارسی", "تعمیرات نرم‌افزاری کامپیوتر", "یادگیری سریع", "کار تیمی", "طراحی سایت وردپرس", "خلاقیت"],
      projects: [
        { name: "ایران بارسی", url: "https://iranbarc.com/" },
        { name: "درمازون", url: "https://darmazon.com/" },
        { name: "آتنا زیست درمان", url: "https://atenazistdarman.co" }
      ],
      experience: [
        { role: "منشی و مسئول دفتر", company: "آتنا زیست درمان", date: "۱۴۰۳ - ۱۴۰۴", duration: "۱ سال و ۷ ماه", desc: "مدیریت امور اداری و هماهنگی‌های دفتر." },
        { role: "مدرس زبان انگلیسی", company: "آموزشگاه پردیسان", date: "۱۴۰۱ - ۱۴۰۲", duration: "۱ سال و ۴ ماه", desc: "تدریس زبان انگلیسی به‌صورت خصوصی و گروهی." },
        { role: "تدریس زبان انگلیسی", company: "مدرسه پویا", date: "۱۴۰۰ - ۱۴۰۱", duration: "۸ ماه", desc: "آموزش زبان با ابزارهای هوشمند اسکای‌روم و ادوبی کانکت." },
        { role: "مدرس زبان انگلیسی", company: "آموزشگاه پردیسان", date: "۱۴۰۰", duration: "۵ ماه", desc: "تدریس زبان انگلیسی به‌صورت خصوصی و گروهی." },
        { role: "کارشناس خدمات مشتریان", company: "Tempus Logix", date: "۱۳۹۸ - ۱۳۹۹", duration: "۸ ماه", desc: "پاسخگویی به مشتریان خارجی و حل مشکلات بین مشتری و راننده." },
        { role: "فروشنده", company: "موبایل متین", date: "۱۳۹۵", duration: "۶ ماه", desc: "حل مشکلات نرم افزاری موبایل، فروش لوازم جانبی و فروش گوشی موبایل" }
      ]
    }
  };

  const content = isEn ? data.en : data.fa;

  const renderDots = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`dot ${i < count ? 'filled' : ''}`}></span>
    ));
  };

  return (
    <div className={`app-wrapper ${isEn ? 'ltr-mode' : 'rtl-mode'}`}>
      <div className="pdf-page">
        <header className="resume-header">
          <div className="header-text">
            <h1>{content.name}</h1>
            <p className="subtitle">{content.title}</p>
          </div>
          <div className="profile-container">
            <img src={profilePic} alt="Amirali" className="profile-img" />
          </div>
        </header>

        <div className="resume-grid">
          <aside className="sidebar">
            <section className="side-section">
              <h3 className="yellow-text">{isEn ? "Personal & Contact" : "اطلاعات فردی و تماس"}</h3>
              {content.personal.map((p, i) => <p key={i}><b>{p.label}:</b> {p.value}</p>)}
              {content.contact.map((c, i) => <p key={i}><b>{c.label}:</b> {c.value}</p>)}
              <p><b>{isEn ? "Salary Request" : "حقوق درخواستی"}:</b> {content.salary}</p>
            </section>

            <section className="side-section">
              <h3 className="yellow-text">{isEn ? "Software" : "نرم‌افزارها"}</h3>
              {content.software.map((s, i) => (
                <div key={i} className="software-item">
                  <span className="soft-name">{s.name}</span>
                  <div className="dots-container">{renderDots(s.dots)}</div>
                </div>
              ))}
            </section>

            <section className="side-section">
              <h3 className="yellow-text">{isEn ? "Additional Skills" : "مهارت‌های تکمیلی"}</h3>
              <div className="skills-grid">
                {content.skills.map((skill, i) => <span key={i} className="skill-tag">{skill}</span>)}
              </div>
            </section>

            <section className="side-section">
              <h3 className="yellow-text">{isEn ? "Projects" : "پروژه‌ها"}</h3>
              {content.projects.map((proj, i) => (
                <a key={i} href={proj.url} target="_blank" rel="noreferrer" className="project-link">{proj.name}</a>
              ))}
            </section>
          </aside>

          <main className="main-content">
            <h2 className="yellow-text">{isEn ? "Work Experience" : "سوابق شغلی"}</h2>
            {content.experience.map((job, i) => (
              <div key={i} className="exp-card">
                <div className="exp-row">
                  <span className="job-role">{job.role}</span>
                  <span className="job-duration yellow-text">{job.duration}</span>
                </div>
                <div className="job-company purple-text">{job.company}</div>
                <div className="job-date">{job.date}</div>
                <p className="job-desc">{job.desc}</p>
              </div>
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