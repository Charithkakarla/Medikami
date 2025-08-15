# Medikami - AI-Powered Health Assistant

Medikami is an intelligent, multilingual chatbot that helps Indian users understand their medical reports, identify health issues, and provides personalized diet plans — all in their preferred Indian language.

## 🌟 Features

### 🧾 Medical Report Parsing
- Upload prescriptions and lab reports (PDF, JPG, PNG)
- OCR-powered text extraction
- Automatic health metric interpretation

### 🩺 Health Analysis
- AI-powered detection of common conditions
- Visual health metrics with status indicators
- Personalized recommendations based on results

### 🥗 Personalized Diet Plans
- AI-generated meal recommendations
- Nutrition tracking (calories, protein, carbs, fats)
- Condition-specific dietary modifications
- 3-day meal plans with downloadable PDF option

### 💬 AI Chat Assistant
- Natural language health queries
- Quick action buttons for common questions
- Real-time responses
- Health education and lifestyle tips

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: CSS3 with modern gradients and animations
- **AI Integration**: Simulated AI responses (ready for backend integration)
- **OCR**: File upload with image processing capabilities
- **Responsive Design**: Mobile-first approach

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd medi-explain
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📱 Usage

### 1. Upload Medical Report
- Drag and drop or click to upload your medical report
- Supported formats: PDF, JPG, PNG
- Maximum file size: 10MB



### 2. Health Analysis
- View AI-detected health metrics
- Check status indicators (Normal, Low, High, Critical)
- Read personalized recommendations

### 3. Chat with AI Assistant
- Ask questions about your health report
- Use quick action buttons for common queries
- Get diet and lifestyle recommendations

### 4. Diet Planning
- Browse 3-day personalized meal plans
- View nutrition information
- Download PDF meal plans (coming soon)

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Dashboard/          # Main dashboard component
│   ├── FileUpload/         # File upload with drag & drop

│   ├── HealthMetrics/      # Health analysis display
│   ├── ChatInterface/      # AI chat assistant
│   └── DietPlan/          # Personalized diet plans
├── assets/                # Static assets
├── App.jsx               # Main app component
├── App.css               # Global styles
├── index.css             # Base styles
└── main.jsx              # App entry point
```

## 🎨 Design Features

- **Modern UI**: Glassmorphism design with backdrop blur effects
- **Responsive**: Works seamlessly on desktop, tablet, and mobile
- **Accessible**: WCAG compliant with proper focus states
- **Smooth Animations**: CSS transitions and micro-interactions
- **Medical Theme**: Professional healthcare color scheme

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_URL=your_backend_api_url
VITE_OCR_API_KEY=your_ocr_service_key
VITE_AI_API_KEY=your_ai_service_key
```

### Customization
- Modify color schemes in component CSS files
- Extend health metrics in `HealthMetrics.jsx`
- Customize diet plans in `DietPlan.jsx`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🔮 Future Enhancements

### Backend Integration
- [ ] Real AI/ML model integration
- [ ] OCR service (Tesseract/Google Vision API)
- [ ] Database for user data storage
- [ ] Authentication system

### Advanced Features
- [ ] Voice-to-text input
- [ ] Doctor teleconsultation integration
- [ ] Medication reminders
- [ ] Health tracking over time
- [ ] Family health profiles

### Mobile App
- [ ] React Native mobile app
- [ ] Offline functionality
- [ ] Push notifications
- [ ] Camera integration for report scanning

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Healthcare Professionals**: For medical guidance and validation
- **Open Source Community**: For amazing tools and libraries
- **Design Inspiration**: Modern healthcare UI/UX patterns


## 📞 Support

For support, email support@medikami.com or create an issue in this repository.

---

**Made with ❤️ for better healthcare accessibility in India**
