import { useState } from 'react';
import './App.css';
import profilePic from './assets/profile.jpg';

function App() {
  const [lang, setLang] = useState('en');
  const isEn = lang === 'en';

  const data = {
    en: {
      name: "Amirali Dabiri Maram",
      title: "English Teacher & Office Assistant",
      contact: { email: "a.dmaram2023@gmail.com", phone: "09371783669", location: "Rey, Tehran" },
      experience: [
        { role: "Office Assistant", company: "Atena Zist Darman", date: "Apr 2024 - Nov 2025", desc: "Administrative support and office coordination." },
        { role: "English Teacher", company: "Pardisan / Pooya School", date: "2021 - 2024", desc: "Instruction for middle school and private groups." },
        { role: "Customer Support", company: "Tempus Logix", date: "2020", desc: "International logistics and client coordination." }
      ],
      skills: ["Adobe Photoshop", "Adobe Premiere", "WordPress", "Microsoft Office"]
    },
    fa: {
      name: "امیرعلی دبیری مرام",
      title: "مدرس زبان انگلیسی و مسئول دفتر",
      contact: { email: "a.dmaram2023@gmail.com", phone: "۰۹۳۷۱۷۸۳۶۶۹", location: "تهران، ری" },
      experience: [
        { role: "منشی و مسئول دفتر", company: "آتنا زیست درمان", date: "اردیبهشت ۱۴۰۳ - آذر ۱۴۰۴", desc: "مدیریت امور اداری و هماهنگی‌های دفتر" },
        { role: "مدرس زبان انگلیسی", company: "آموزشگاه پردیسان / مدرسه پویا", date: "۱۴۰۰ - ۱۴۰۳", desc: "تدریس سطوح مختلف و مدیریت کلاس" },
        { role: "کارشناس خدمات مشتریان", company: "Tempus Logix", date: "۱۳۹۸ - ۱۳۹۹", desc: "پشتیبانی بین‌المللی و هماهنگی با رانندگان" }
      ],
      skills: ["فتوشاپ", "پریمیر", "وردپرس", "مایکروسافت آفیس"]
    }
  };

  const content = isEn ? data.en : data.fa;

  return (
    <div className={`app-wrapper ${isEn ? 'ltr-mode' : 'rtl-mode'}`}>
      <nav className="navbar">
        <button className="lang-btn" onClick={() => setLang('fa')}>فارسی</button>
        <button className="lang-btn" onClick={() => setLang('en')}>English</button>
      </nav>

      <div className="container">
        <header className="hero">
          <img src={profilePic} alt="Amirali" className="profile-img" />
          <h1 className="name">{content.name}</h1>
          <p className="title-tag">{content.title}</p>
          <div className="contact-bar">
            <span>{content.contact.email}</span> • <span>{content.contact.phone}</span>
          </div>
        </header>

        <section className="section">
          <h2 className="section-title">{isEn ? "Experience" : "سوابق شغلی"}</h2>
          {content.experience.map((job, i) => (
            <div key={i} className="card">
              <div className="card-header">
                <span className="job-role">{job.role}</span>
                <span className="job-date">{job.date}</span>
              </div>
              <div className="job-company">{job.company}</div>
              <p className="job-desc">{job.desc}</p>
            </div>
          ))}
        </section>

        <section className="section">
          <h2 className="section-title">{isEn ? "Skills" : "مهارت‌ها"}</h2>
          <div className="skills-grid">
            {content.skills.map((skill, i) => (
              <span key={i} className="skill-pill">{skill}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;