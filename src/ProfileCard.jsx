import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ onSelectLanguage, data }) => {
  return (
    <div className="profile-card-overlay">
      <div className="profile-card">
        <div className="profile-avatar-wrapper">
          <img
            src={data.avatar || "https://via.placeholder.com/150"}
            alt={data.name}
            className="profile-avatar"
          />
        </div>

        <h1 className="profile-name">{data.name}</h1>

        <div className="profile-titles">
          <p className="title-en">{data.en.title}</p>
          <p className="title-fa">{data.fa.title}</p>
        </div>

        <p className="profile-subtitle">Select Language / انتخاب زبان</p>

        <div className="language-buttons">
          <button
            className="lang-btn"
            onClick={() => onSelectLanguage('en')}
          >
            English
          </button>
          <button
            className="lang-btn"
            onClick={() => onSelectLanguage('fa')}
          >
            فارسی
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;