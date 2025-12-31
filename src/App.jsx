import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
// Assuming your background component is named PixelCard or similar
import PixelCard from './PixelCard'; 

const App = () => {
  const [showProfile, setShowProfile] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [selectedLang, setSelectedLang] = useState(null);

  const handleSelectLang = (lang) => {
    setIsExiting(true);
    // Matches the 0.8s CSS animation duration
    setTimeout(() => {
      setShowProfile(false);
      setSelectedLang(lang);
    }, 800); 
  };

  return (
    <div className="app-container">
      {/* Background renders when profile is gone or if you want it behind the card */}
      {(!showProfile || !showProfile) && <PixelCard />}
      
      {showProfile && (
        <ProfileCard 
          onSelectLang={handleSelectLang} 
          isExiting={isExiting}
          avatarUrl="your-avatar-path.png"
        />
      )}
    </div>
  );
};

export default App;