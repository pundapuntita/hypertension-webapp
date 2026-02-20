import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Welcome } from './pages/Welcome'
import { HealthForm } from './pages/HealthForm'
import { Result } from './pages/Result'
import { calculateRisk } from './utils/prediction'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import { useTranslation } from 'react-i18next'

function PrivacyFooter() {
    const { t } = useTranslation()
    return (
        <div className="fixed bottom-0 left-0 w-full py-2 bg-white/80 backdrop-blur-md border-t border-gray-100 z-50 animate-in slide-in-from-bottom duration-500 print:hidden">
            <div className="max-w-7xl mx-auto px-4 text-center space-y-0.5">
                <p className="text-[10px] md:text-xs font-medium text-gray-500 flex justify-center items-center gap-2">
                    {t('privacy_guarantee')}
                </p>
                <div className="text-[9px] md:text-[10px] text-gray-400 leading-tight">
                    <p>{t('developed_by')}</p>
                    <p>{t('supported_by')}</p>
                </div>
            </div>
        </div>
    )
}

function App() {
    const [prediction, setPrediction] = useState(null)
    const [formData, setFormData] = useState(null)

    const handleFormSubmit = (data, result) => {
        setFormData(data)
        setPrediction(result)
    }

    return (
        <Router>
            <LanguageSwitcher />
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/form" element={<HealthForm onSubmit={handleFormSubmit} />} />
                <Route path="/result" element={<Result prediction={prediction} resultData={formData} />} />
            </Routes>
            <PrivacyFooter />
        </Router>
    )
}

export default App
