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
        { label: "Age", value: "27 Years" },
        { label: "Military", value: "Exempted" },
        { label: "Location", value: "Rey, Tehran" }
      ],
      contact: [
        { label: "Phone", value: "09371783669" },
        { label: "Email", value: "a.dmaram2023@gmail.com" }
      ],
      software: ["Adobe Photoshop", "Adobe Premiere", "WordPress", "Google Search Console"],
      projects: [
        { name: "IranBarc", url: "https://iranbarc.com/" },
        { name: "Darmazon", url: "https://darmazon.com/" },
        { name: "Atena Zist Darman", url: "https://atenazistdarman.co" }
      ],
      experience: [
        { role: "Office Assistant", company: "Atena Zist Darman", date: "Apr 2024 - Nov 2025" },
        { role: "English Teacher", company: "Pardisan", date: "Oct 2022 - Feb 2024" },
        { role: "Customer Support Specialist", company: "Tempus Logix", date: "Jan 2020 - Sep 2020" }
      ]
    },
    fa: {
      name: "امیرعلی دبیری مرام",
      title: "مدرس زبان انگلیسی و مسئول دفتر",
      personal: [
        { label: "سن", value: "۲۷ سال" },
        { label: "سربازی", value: "معاف دائم" },
        { label: "محل سکونت", value: "تهران، ری" }
      ],
      contact: [
        { label: "موبایل", value: "۰۹۳۷۱۷۸۳۶۶۹" },
        { label: "ایمیل", value: "a.dmaram2023@gmail.com" }
      ],
      software: ["فتوشاپ", "پریمیر", "وردپرس", "گوگل سرچ کنسول"],
      projects: [
        { name: "ایران بارک", url: "https://iranbarc.com/" },
        { name: "درمازون", url: "https://darmazon.com/" },
        { name: "آتنا زیست درمان", url: "https://atenazistdarman.co" }
      ],
      experience: [
        { role: "منشی و مسئول دفتر", company: "آتنا زیست درمان", date: "اردیبهشت ۱۴۰۳ - آذر ۱۴۰۴" },
        { role: "مدرس زبان انگلیسی", company: "آموزشگاه پردیسان", date: "آبان ۱۴۰۱ - اسفند ۱۴۰۲" },
        { role: "کارشناس خدمات مشتریان", company: "Tempus Logix", date: "بهمن ۱۳۹۸ - مهر ۱۳۹۹" }
      ]
    }
  };

  const content = isEn ? data.en : data.fa;

  return (
    <div className={`app-wrapper ${isEn ? 'ltr-mode' : 'rtl-mode'}`}>
      <div className="pdf-page">
        {/* TRANSLATE BUTTON - Now clearly separated */}
        <div className="button-container">
          <button 
            className="toggle-btn" 
            onClick={() => setLang(isEn ? 'fa' : 'en')}
          >
            {isEn ? 'فارسی' : 'English'}
          </button>
        </div>

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
            <section className="side-box">
              <h3 className="yellow-text">{isEn ? "Personal & Contact" : "اطلاعات فردی و تماس"}</h3>
              {content.personal.map((p, i) => <p key={i}><b>{p.label}:</b> {p.value}</p>)}
              {content.contact.map((c, i) => <p key={i}><b>{c.label}:</b> {c.value}</p>)}
            </section>

            <section className="side-box">
              <h3 className="yellow-text">{isEn ? "Software" : "نرم‌افزار"}</h3>
              {content.software.map((s, i) => <div key={i} className="skill-item">{s}</div>)}
            </section>

            <section className="side-box">
              <h3 className="yellow-text">{isEn ? "Samples / Projects" : "نمونه کارها"}</h3>
              {content.projects.map((proj, i) => (
                <a key={i} href={proj.url} target="_blank" rel="noreferrer" className="project-link">
                  {proj.name}
                </a>
              ))}
            </section>
          </aside>

          <main className="main-content">
            <h2 className="yellow-text">{isEn ? "Work Experience" : "سوابق شغلی"}</h2>
            {content.experience.map((job, i) => (
              <div key={i} className="exp-card">
                <div className="exp-row">
                  <span className="job-role">{job.role}</span>
                  <span className="job-date">{job.date}</span>
                </div>
                <div className="job-company">{job.company}</div>
              </div>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;