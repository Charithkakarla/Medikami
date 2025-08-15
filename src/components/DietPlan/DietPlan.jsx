import React, { useState } from 'react';
import './DietPlan.css';

const DietPlan = ({ conditions, language }) => {
  const [selectedDay, setSelectedDay] = useState(1);

  const translations = {
    en: {
      title: 'Personalized Diet Plan',
      subtitle: 'AI-generated recommendations based on your health conditions',
      breakfast: 'Breakfast',
      lunch: 'Lunch',
      dinner: 'Dinner',
      snacks: 'Snacks',
      download: 'Download PDF',
      day: 'Day',
      calories: 'Calories',
      protein: 'Protein',
      carbs: 'Carbs',
      fats: 'Fats'
    },
    hi: {
      title: 'व्यक्तिगत आहार योजना',
      subtitle: 'आपकी स्वास्थ्य स्थितियों के आधार पर AI द्वारा उत्पन्न सिफारिशें',
      breakfast: 'नाश्ता',
      lunch: 'दोपहर का भोजन',
      dinner: 'रात का खाना',
      snacks: 'स्नैक्स',
      download: 'PDF डाउनलोड करें',
      day: 'दिन',
      calories: 'कैलोरी',
      protein: 'प्रोटीन',
      carbs: 'कार्बोहाइड्रेट',
      fats: 'वसा'
    },
    ta: {
      title: 'தனிப்பட்ட உணவு திட்டம்',
      subtitle: 'உங்கள் சுகாதார நிலைமைகளின் அடிப்படையில் AI மூலம் உருவாக்கப்பட்ட பரிந்துரைகள்',
      breakfast: 'காலை உணவு',
      lunch: 'மதிய உணவு',
      dinner: 'இரவு உணவு',
      snacks: 'சிற்றுண்டி',
      download: 'PDF பதிவிறக்கு',
      day: 'நாள்',
      calories: 'கலோரிகள்',
      protein: 'புரதம்',
      carbs: 'கார்போஹைட்ரேட்டுகள்',
      fats: 'கொழுப்புகள்'
    }
  };

  const t = translations[language] || translations.en;

  const generateDietPlan = (conditions) => {
    const basePlan = {
      1: {
        breakfast: {
          en: 'Oatmeal with nuts and berries',
          hi: 'नट्स और जामुन के साथ दलिया',
          ta: 'கொட்டைகள் மற்றும் பெர்ரிகளுடன் ஓட்மீல்'
        },
        lunch: {
          en: 'Grilled salmon with quinoa and vegetables',
          hi: 'क्विनोआ और सब्जियों के साथ ग्रिल्ड सैल्मन',
          ta: 'குவினோவா மற்றும் காய்கறிகளுடன் வறுத்த சால்மன்'
        },
        dinner: {
          en: 'Lentil soup with brown rice',
          hi: 'ब्राउन राइस के साथ दाल का सूप',
          ta: 'பழுப்பு அரிசியுடன் பருப்பு சூப்'
        },
        snacks: {
          en: 'Greek yogurt with almonds',
          hi: 'बादाम के साथ ग्रीक दही',
          ta: 'பாதாமுடன் கிரீக் தயிர்'
        },
        nutrition: { calories: 1850, protein: 85, carbs: 180, fats: 65 }
      },
      2: {
        breakfast: {
          en: 'Greek yogurt parfait with granola',
          hi: 'ग्रेनोला के साथ ग्रीक दही पारफे',
          ta: 'கிரானோலாவுடன் கிரீக் தயிர் பார்ஃபே'
        },
        lunch: {
          en: 'Chicken breast with sweet potato',
          hi: 'शकरकंद के साथ चिकन ब्रेस्ट',
          ta: 'சர்க்கரை வள்ளிக் கிழங்குடன் கோழி மார்பு'
        },
        dinner: {
          en: 'Vegetable stir-fry with tofu',
          hi: 'टोफू के साथ सब्जी स्टिर-फ्राई',
          ta: 'டோஃபுடன் காய்கறி வறுவல்'
        },
        snacks: {
          en: 'Apple with peanut butter',
          hi: 'मूंगफली के मक्खन के साथ सेब',
          ta: 'வேர்க்கடலை வெண்ணெயுடன் ஆப்பிள்'
        },
        nutrition: { calories: 1750, protein: 90, carbs: 160, fats: 70 }
      },
      3: {
        breakfast: {
          en: 'Smoothie bowl with chia seeds',
          hi: 'चिया बीज के साथ स्मूदी बाउल',
          ta: 'சியா விதைகளுடன் ஸ்மூதி பவுல்'
        },
        lunch: {
          en: 'Tuna salad with whole grain bread',
          hi: 'साबुत अनाज की रोटी के साथ टूना सलाद',
          ta: 'முழு தானிய ரொட்டியுடன் தூணா சாலட்'
        },
        dinner: {
          en: 'Baked cod with roasted vegetables',
          hi: 'भुनी हुई सब्जियों के साथ बेक्ड कॉड',
          ta: 'வறுத்த காய்கறிகளுடன் சுட்ட கோட்'
        },
        snacks: {
          en: 'Mixed nuts and dried fruits',
          hi: 'मिश्रित नट्स और सूखे मेवे',
          ta: 'கலப்பு கொட்டைகள் மற்றும் உலர்ந்த பழங்கள்'
        },
        nutrition: { calories: 1900, protein: 95, carbs: 170, fats: 75 }
      }
    };

    // Customize based on conditions
    if (conditions.includes('Vitamin D Deficiency')) {
      basePlan[1].breakfast = {
        en: 'Fortified cereal with milk and egg yolk',
        hi: 'दूध और अंडे की जर्दी के साथ फोर्टिफाइड अनाज',
        ta: 'பால் மற்றும் முட்டை மஞ்சள் கருவுடன் வலுவூட்டப்பட்ட தானியம்'
      };
    }

    if (conditions.includes('High Cholesterol')) {
      basePlan[1].lunch = {
        en: 'Grilled chicken with steamed vegetables',
        hi: 'उबली हुई सब्जियों के साथ ग्रिल्ड चिकन',
        ta: 'ஆவியில் வேகவைத்த காய்கறிகளுடன் வறுத்த கோழி'
      };
    }

    return basePlan;
  };

  const dietPlan = generateDietPlan(conditions);

  const handleDownload = () => {
    // Simulate PDF download
    alert('PDF download feature will be implemented with backend integration');
  };

  const getMealContent = (meal, day) => {
    const mealData = dietPlan[day][meal];
    return mealData[language] || mealData.en;
  };

  return (
    <div className="diet-plan-container">
      <div className="diet-header">
        <h2>{t.title}</h2>
        <p>{t.subtitle}</p>
        <button className="download-btn" onClick={handleDownload}>
          📄 {t.download}
        </button>
      </div>

      <div className="diet-content">
        <div className="day-selector">
          {[1, 2, 3].map(day => (
            <button
              key={day}
              className={`day-btn ${selectedDay === day ? 'active' : ''}`}
              onClick={() => setSelectedDay(day)}
            >
              {t.day} {day}
            </button>
          ))}
        </div>

        <div className="meal-plan">
          <div className="meal-section">
            <h3>🌅 {t.breakfast}</h3>
            <p>{getMealContent('breakfast', selectedDay)}</p>
          </div>

          <div className="meal-section">
            <h3>☀️ {t.lunch}</h3>
            <p>{getMealContent('lunch', selectedDay)}</p>
          </div>

          <div className="meal-section">
            <h3>🌙 {t.dinner}</h3>
            <p>{getMealContent('dinner', selectedDay)}</p>
          </div>

          <div className="meal-section">
            <h3>🍎 {t.snacks}</h3>
            <p>{getMealContent('snacks', selectedDay)}</p>
          </div>
        </div>

        <div className="nutrition-info">
          <h3>📊 {t.title} - {t.day} {selectedDay}</h3>
          <div className="nutrition-grid">
            <div className="nutrition-item">
              <span className="nutrition-label">{t.calories}</span>
              <span className="nutrition-value">{dietPlan[selectedDay].nutrition.calories}</span>
            </div>
            <div className="nutrition-item">
              <span className="nutrition-label">{t.protein}</span>
              <span className="nutrition-value">{dietPlan[selectedDay].nutrition.protein}g</span>
            </div>
            <div className="nutrition-item">
              <span className="nutrition-label">{t.carbs}</span>
              <span className="nutrition-value">{dietPlan[selectedDay].nutrition.carbs}g</span>
            </div>
            <div className="nutrition-item">
              <span className="nutrition-label">{t.fats}</span>
              <span className="nutrition-value">{dietPlan[selectedDay].nutrition.fats}g</span>
            </div>
          </div>
        </div>

        <div className="diet-tips">
          <h3>💡 {t.title} Tips</h3>
          <ul>
            <li>Drink 8-10 glasses of water daily</li>
            <li>Eat slowly and mindfully</li>
            <li>Include protein with every meal</li>
            <li>Choose whole grains over refined grains</li>
            <li>Limit processed foods and added sugars</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DietPlan; 