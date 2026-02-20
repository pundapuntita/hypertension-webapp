import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ArrowRight, ShieldCheck, FileText } from 'lucide-react';
import { Button } from '../components/Button';
import { useTranslation } from 'react-i18next';

export function Welcome() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-gradient-to-br from-pastel-green via-white to-pastel-blue flex items-center justify-center p-6 pb-32 md:pb-12">
            <div className="w-full max-w-5xl grid md:grid-cols-2 gap-12 items-center">

                {/* Left Content */}
                <div className="order-2 md:order-1 space-y-8 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full shadow-sm border border-white/50">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium text-gray-600">{t('welcome_badge')}</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-[1.15]">
                        {t('welcome_title_track')} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-blue">
                            {t('welcome_title_health')}
                        </span>
                    </h1>

                    <p className="text-lg text-gray-500 leading-relaxed max-w-md">
                        {t('welcome_desc')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button onClick={() => navigate('/form')} className="!w-auto !px-8 text-lg">
                            {t('start_assessment')} <ArrowRight className="w-5 h-5" />
                        </Button>
                        <Button variant="secondary" className="!w-auto !px-8" onClick={() => window.open('https://www.who.int/health-topics/hypertension', '_blank')}>
                            {t('learn_more')}
                        </Button>
                    </div>

                    <div className="flex flex-col gap-3 pt-8 text-sm">
                        <div className="text-gray-500 flex items-center gap-2">
                            <span>{t('based_on')}</span>
                            <a href="https://www.mdpi.com/2227-7390/13/17/2783" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent-blue transition-colors flex items-center justify-center p-1.5 bg-primary/10 rounded-full hover:bg-primary/20" title="View Research Paper">
                                <FileText className="w-4 h-4" />
                            </a>
                        </div>
                        <div className="bg-red-50/50 border border-red-100 p-3 rounded-lg text-red-600 font-medium text-xs sm:text-sm shadow-sm backdrop-blur-sm">
                            <span>{t('disclaimer')}</span>
                        </div>
                    </div>
                </div>

                {/* Right Illustration */}
                <div className="order-1 md:order-2 flex justify-center relative mt-8 md:mt-0 lg:ml-12">
                    <div className="absolute inset-0 bg-gradient-to-tr from-pastel-purple/30 to-pastel-pink/30 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="relative bg-white/40 backdrop-blur-xl p-10 md:p-16 lg:p-20 rounded-[3.5rem] lg:rounded-[4rem] shadow-soft border border-white/60 transform hover:scale-[1.02] transition-transform duration-500">
                        <Activity className="w-32 h-32 md:w-56 md:h-56 lg:w-72 lg:h-72 text-accent-pink drop-shadow-2xl animate-[bounce_3s_infinite]" />

                        {/* Floating Cards */}
                        <div className="absolute -right-4 md:-right-12 lg:-right-16 top-6 md:top-12 lg:top-16 bg-white/95 backdrop-blur-md p-2.5 md:p-5 lg:p-6 rounded-xl md:rounded-2xl lg:rounded-3xl shadow-lg animate-[bounce_4s_infinite]">
                            <div className="flex items-center gap-2 md:gap-4">
                                <div className="w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 shrink-0 rounded-full bg-red-100 flex items-center justify-center text-red-500 font-bold text-xs md:text-lg lg:text-xl">❤️</div>
                                <div>
                                    <p className="text-[10px] md:text-sm lg:text-base text-gray-400 whitespace-nowrap leading-tight">{t('heart_rate_label')}</p>
                                    <p className="text-xs md:text-lg lg:text-xl font-bold text-gray-800 leading-tight">72 bpm</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -left-4 md:-left-12 lg:-left-16 bottom-6 md:bottom-12 lg:bottom-16 bg-white/95 backdrop-blur-md p-2.5 md:p-5 lg:p-6 rounded-xl md:rounded-2xl lg:rounded-3xl shadow-lg animate-[bounce_5s_infinite]">
                            <div className="flex items-center gap-2 md:gap-4">
                                <div className="w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold text-xs md:text-lg lg:text-xl">💧</div>
                                <div>
                                    <p className="text-[10px] md:text-sm lg:text-base text-gray-400 whitespace-nowrap leading-tight">{t('bp_label')}</p>
                                    <p className="text-xs md:text-lg lg:text-xl font-bold text-gray-800 leading-tight">120/80</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
