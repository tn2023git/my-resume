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
      personal: {
        age: "27 Years",
        location: "Rey, Tehran",
        status: "Single",
        military: "Exempted"
      },
      contact: { phone: "09371783669", email: "a.dmaram2023@gmail.com", address: "Rey" },
      experience: [
        { role: "Office Assistant", company: "Atena Zist Darman", date: "Apr 2024 - Nov 2025", duration: "1 yr 7 mos" },
        { role: "English Teacher", company: "Pardisan - Tehranpars", date: "Oct 2022 - Feb 2024", duration: "1 yr 4 mos" },
        { role: "English Teacher", company: "Pooya Middle School", date: "Sep 2021 - May 2022", duration: "8 mos" },
        { role: "Customer Support Specialist", company: "Tempus Logix (Armenia)", date: "Jan 2020 - Sep 2020", duration: "8 mos" }
      ],
      software: ["Adobe Photoshop", "Adobe Premiere", "MS Word", "Wordpress", "Google Search Console"]
    },
    fa: {
      name: "امیرعلی دبیری مرام",
      title: "مدرس زبان انگلیسی و مسئول دفتر",
      personal: {
        age: "۲۷ سال",
        location: "تهران، ری",
        status: "مجرد",
        military: "معاف دائم"
      },
      contact: { phone: "۰۹۳۷۱۷۸۳۶۶۹", email: "a.dmaram2023@gmail.com", address: "بلوار آوینی" },
      experience: [
        { role: "منشی و مسئول دفتر", company: "آتنا زیست درمان", date: "اردیبهشت ۱۴۰۳ - آذر ۱۴۰۴", duration: "۱ سال و ۷ ماه" },
        { role: "مدرس زبان انگلیسی", company: "آموزشگاه پردیسان", date: "آبان ۱۴۰۱ - اسفند ۱۴۰۲", duration: "۱ سال و ۴ ماه" },
        { role: "مدرس زبان انگلیسی", company: "مدرسه غیرانتفاعی پویا", date: "مهر ۱۴۰۰ - خرداد ۱۴۰۱", duration: "۸ ماه" },
        { role: "کارشناس خدمات مشتریان", company: "Tempus Logix (ارمنستان)", date: "بهمن ۱۳۹۸ - مهر ۱۳۹۹", duration: "۸ ماه" }
      ],
      software: ["فتوشاپ", "پریمیر", "ورد", "وردپرس", "گوگل سرچ کنسول"]
    }
  };

  const content = isEn ? data.en : data.fa;

  return (
    <div className={`app-wrapper ${isEn ? 'ltr-mode' : 'rtl-mode'}`}>
      <nav className="navbar no-print">
        <button className="lang-btn" onClick={() => setLang('fa')}>فارسی</button>
        <button className="lang-btn" onClick={() => setLang('en')}>English</button>
      </nav>

      <div className="resume-paper">
        {/* Header Section */}
        <header className="resume-header">
          <div className="header-text">
            <h1>{content.name}</h1>
            <p className="subtitle">{content.title}</p>
          </div>
          <img src={profilePic} alt="Profile" className="profile-img" />
        </header>

        <div className="resume-body">
          {/* Sidebar: Personal Info & Skills */}
          <aside className="sidebar">
            <section className="side-section">
              <h3>{isEn ? "Personal Info" : "مشخصات فردی"}</h3>
              <p><span>{isEn ? "Age: " : "سن: "}</span>{content.personal.age}</p>
              <p><span>{isEn ? "Status: " : "وضعیت: "}</span>{content.personal.status}</p>
              <p><span>{isEn ? "Military: " : "سربازی: "}</span>{content.personal.military}</p>
            </section>

            <section className="side-section">
              <h3>{isEn ? "Contact" : "اطلاعات تماس"}</h3>
              <p>{content.contact.phone}</p>
              <p className="email-text">{content.contact.email}</p>
              <p>{content.contact.address}</p>
            </section>

            <section className="side-section">
              <h3>{isEn ? "Software" : "نرم‌افزار"}</h3>
              {content.software.map((s, i) => <div key={i} className="skill-item">{s}</div>)}
            </section>
          </aside>

          {/* Main Content: Experience */}
          <main className="main-content">
            <h2 className="section-title">{isEn ? "Work Experience" : "سوابق شغلی"}</h2>
            {content.experience.map((job, i) => (
              <div key={i} className="exp-item">
                <div className="exp-header">
                  <span className="job-role">{job.role}</span>
                  <span className="job-duration">{job.duration}</span>
                </div>
                <div className="job-company">{job.company}</div>
                <div className="job-date">{job.date}</div>
              </div>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;