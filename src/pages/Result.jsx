import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, AlertTriangle, AlertOctagon, RefreshCcw, ArrowRight, Printer, Activity } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { getRecommendations } from '../utils/prediction';
import { useTranslation } from 'react-i18next';

export function Result({ prediction, resultData }) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        if (!prediction) return;
        let start = 0;
        const end = prediction.probability;
        const duration = 1500;
        const stepTime = Math.abs(Math.floor(duration / end));

        const timer = setInterval(() => {
            start += 1;
            setPercent(start);
            if (start >= end) clearInterval(timer);
        }, stepTime);

        return () => clearInterval(timer);
    }, [prediction]);

    if (!prediction) {
        navigate('/');
        return null;
    }

    const isHighRisk = prediction.category === 'High Risk';
    const isModerate = prediction.category === 'Moderate Risk';

    const themeColor = isHighRisk ? 'text-red-500' : (isModerate ? 'text-orange-500' : 'text-green-500');
    const strokeColor = isHighRisk ? '#EF4444' : (isModerate ? '#F97316' : '#10B981');
    const bgColor = isHighRisk ? 'bg-red-50' : (isModerate ? 'bg-orange-50' : 'bg-green-50');

    const recommendations = getRecommendations(resultData, prediction.category);

    const checkVitalStatus = (value, min, max) => {
        if (value < min) return { status: 'low', statusKey: 'status_low', color: 'text-blue-600 bg-blue-50' };
        if (value > max) return { status: 'high', statusKey: 'status_high', color: 'text-red-600 bg-red-50' };
        return { status: 'normal', statusKey: 'status_normal', color: 'text-green-600 bg-green-50' };
    };

    const vitals = [
        { label: t('hr_label'), value: resultData.heartRate, unit: '', ref: '60-100', ...checkVitalStatus(resultData.heartRate, 60, 100) },
        { label: t('temp_label'), value: resultData.temp, unit: '', ref: '36.5-37.5', ...checkVitalStatus(resultData.temp, 36.5, 37.5) },
        { label: t('rr_label'), value: resultData.rr, unit: '', ref: '12-20', ...checkVitalStatus(resultData.rr, 12, 20) },
        { label: t('spo2_label'), value: resultData.spo2, unit: '', ref: '95-100', ...checkVitalStatus(resultData.spo2, 95, 100) },
        { label: 'BMI', value: Math.round(resultData.bmi * 10) / 10, unit: '', ref: '18.5-24.9', ...checkVitalStatus(resultData.bmi, 18.5, 24.9) }
    ];

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pastel-green via-white to-pastel-blue">
            {/* Soft decorative background circles */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-pastel-bg/50 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-pastel-pink/30 rounded-full blur-[80px]"></div>

            <div className="relative z-10 p-6 md:p-12 pb-32">
                <div className="max-w-4xl mx-auto">

                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-stretch">
                        {/* Left Column: Result Card */}
                        <div className="flex flex-col space-y-4 h-full">
                            <h1 className="text-3xl font-bold text-gray-900">{t('result_title')}</h1>
                            <Card className="flex-1 flex flex-col items-center justify-center py-12 relative overflow-hidden">
                                <div className={`absolute top-0 left-0 w-full h-2 ${isHighRisk ? 'bg-red-500' : (isModerate ? 'bg-orange-500' : 'bg-green-500')}`}></div>

                                <div className="relative w-64 h-64 mb-6">
                                    <svg className="w-full h-full transform -rotate-90 drop-shadow-xl">
                                        <circle cx="128" cy="128" r="110" stroke="#F3F4F6" strokeWidth="20" fill="transparent" />
                                        <circle
                                            cx="128" cy="128" r="110"
                                            stroke={strokeColor}
                                            strokeWidth="20"
                                            fill="transparent"
                                            strokeDasharray={2 * Math.PI * 110}
                                            strokeDashoffset={2 * Math.PI * 110 * (1 - percent / 100)}
                                            className="transition-all duration-1000 ease-out"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className={`text-6xl font-bold ${themeColor}`}>{percent}%</span>
                                        <span className="text-sm text-gray-400 uppercase tracking-widest mt-2 font-semibold">
                                            {t('result_probability')}
                                        </span>
                                    </div>
                                </div>

                                <div className={`px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wide mb-4 ${bgColor} ${themeColor}`}>
                                    {prediction.category === 'High Risk' ? t('result_high_risk') :
                                        prediction.category === 'Moderate Risk' ? t('result_moderate') : t('result_low_risk')}
                                </div>

                                <div className="text-center text-gray-500 max-w-sm px-4">
                                    <span className="block mb-2 text-sm text-gray-400">{t('score_of')}</span>
                                    <span className={`font-bold ${themeColor} text-lg`}> {percent}% </span>
                                    {prediction.category === 'High Risk' ? t('result_desc_high') :
                                        prediction.category === 'Moderate Risk' ? t('result_desc_moderate') : t('result_desc_low')}
                                </div>
                            </Card>

                        </div>

                        {/* Right Column: Recommendations & Summary */}
                        <div className="flex flex-col space-y-4 h-full">
                            {/* Vitals Summary */}
                            <div className="flex-1 flex flex-col h-full">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-primary" /> {t('vitals_summary')}
                                </h2>
                                <Card className="flex-1 bg-white/80 backdrop-blur-xl border-gray-100 shadow-sm print:border-gray-300 print:shadow-none p-4 flex flex-col justify-center">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {vitals.map((v, i) => (
                                            <div key={i} className="flex flex-col gap-2 bg-gray-50/50 p-4 rounded-xl border border-gray-100 print:border-gray-200 print:bg-transparent shadow-sm">
                                                <div className="flex justify-between items-start w-full">
                                                    <span className="text-sm font-semibold text-gray-700 max-w-[65%] leading-snug">{v.label}</span>
                                                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold whitespace-nowrap shadow-sm border border-white/60 ${v.color}`}>
                                                        {v.status === 'normal' ? '🟢' : (v.status === 'high' ? '🔴' : '🔵')} {t(v.statusKey)}
                                                    </span>
                                                </div>
                                                <div className="flex items-baseline gap-1 mt-1">
                                                    <span className="text-2xl font-black text-gray-900 tracking-tight">{v.value}</span>
                                                </div>
                                                <div className="text-[11px] text-gray-400 font-medium">
                                                    {t('normal_ranges_title')}: {v.ref}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>

                    {/* Full Width Bottom Section */}
                    <div className="mt-8 pt-8 border-t border-gray-200/50 print:mt-6 print:pt-6 print:border-none">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            {t('action_plan')} <span className="text-sm font-normal text-gray-400 bg-white px-3 py-1 rounded-full border shadow-sm">{t('personalized')}</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {recommendations.map((rec, i) => (
                                <div key={i} className="group bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all flex gap-5 items-start">
                                    <div className="w-12 h-12 shrink-0 rounded-xl bg-pastel-green/30 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                        {rec.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 mb-1">{t('recommendation_num')}{i + 1}</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">{t(rec.key)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 bg-blue-50/80 backdrop-blur-xl p-6 rounded-2xl border border-blue-100 shadow-sm print:bg-transparent print:border-gray-200">
                            <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                                <AlertOctagon className="w-4 h-4 text-blue-600" /> {t('medical_disclaimer')}
                            </h4>
                            <p className="text-xs text-blue-600/80 leading-relaxed">
                                {t('disclaimer_desc')}
                            </p>
                        </div>

                        <div className="mt-8 flex flex-col md:flex-row justify-center gap-4 print:hidden">
                            <Button onClick={() => navigate('/')} className="md:w-auto md:px-12 shadow-md">
                                <RefreshCcw className="w-4 h-4 mr-2" /> {t('start_new')}
                            </Button>
                            <Button variant="secondary" onClick={handlePrint} className="md:w-auto md:px-12 shadow-sm">
                                <Printer className="w-4 h-4 mr-2" /> {t('download_pdf')}
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
