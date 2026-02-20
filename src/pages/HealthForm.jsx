import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Ruler, Weight, Thermometer, Heart, Wind, Activity, ArrowRight, Info } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input, Select } from '../components/Input';
import { calculateRisk } from '../utils/prediction';
import { useTranslation } from 'react-i18next';

export function HealthForm({ onSubmit }) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        age: '',
        gender: 'male',
        weight: '',
        height: '',
        temp: '',
        heartRate: '',
        rr: '',
        spo2: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fillExample = (type) => {
        if (type === 'high') {
            setFormData({
                age: '65',
                gender: 'male',
                weight: '90',
                height: '168',
                temp: '37.8',
                heartRate: '115',
                rr: '24',
                spo2: '93'
            });
        } else if (type === 'moderate') {
            setFormData({
                age: '45',
                gender: 'male',
                weight: '75',
                height: '170',
                temp: '37.2',
                heartRate: '95',
                rr: '18',
                spo2: '96'
            });
        } else {
            setFormData({
                age: '28',
                gender: 'female',
                weight: '52',
                height: '162',
                temp: '36.5',
                heartRate: '72',
                rr: '16',
                spo2: '99'
            });
        }
    };

    const handleSubmit = async () => {
        // Basic validation
        if (!formData.age || !formData.weight || !formData.height || !formData.heartRate) {
            alert(t('validation_error'));
            return;
        }

        // Strict Range Validation
        const isOutOfRange = (val, min, max) => {
            const num = parseFloat(val);
            return isNaN(num) || num < min || num > max;
        };

        if (
            isOutOfRange(formData.age, 8, 120) ||
            isOutOfRange(formData.weight, 20, 300) ||
            isOutOfRange(formData.height, 50, 250) ||
            isOutOfRange(formData.heartRate, 30, 250) ||
            (formData.temp && isOutOfRange(formData.temp, 30, 45)) ||
            (formData.rr && isOutOfRange(formData.rr, 8, 60)) ||
            (formData.spo2 && isOutOfRange(formData.spo2, 50, 100))
        ) {
            alert(t('range_error'));
            return;
        }

        // Calculate BMI
        const heightInM = formData.height / 100;
        const bmi = formData.weight / (heightInM * heightInM);

        try {
            const result = await calculateRisk({ ...formData, bmi });
            onSubmit({ ...formData, bmi }, result); // Pass result up to App
            navigate('/result');
        } catch (e) {
            alert(t('calculation_error'));
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pastel-green via-white to-pastel-blue">
            {/* Soft decorative background circles */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-pastel-bg/50 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-pastel-pink/30 rounded-full blur-[80px]"></div>

            <div className="relative z-10 p-6 md:p-12 pb-32">
                <div className="max-w-4xl mx-auto">

                    {/* Header */}
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pt-16 md:pt-0">
                        <div className="flex items-center gap-4">
                            <button onClick={() => navigate('/')} className="p-3 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:shadow-md transition-all text-gray-500 hover:text-primary">
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-2xl">
                                <h1 className="text-2xl font-bold text-gray-800">{t('form_title')}</h1>
                                <p className="text-gray-500 text-sm">{t('form_desc')}</p>
                            </div>
                        </div>

                        {/* Example Data Buttons */}
                        <div className="flex gap-2">
                            <button onClick={() => fillExample('low')} type="button" className="text-xs px-3 py-2 rounded-xl bg-green-100/80 text-green-700 hover:bg-green-200 transition font-medium border border-green-200/50 shadow-sm backdrop-blur-sm shadow-green-900/5">
                                ✨ {t('example_low_risk')}
                            </button>
                            <button onClick={() => fillExample('moderate')} type="button" className="text-xs px-3 py-2 rounded-xl bg-orange-100/80 text-orange-700 hover:bg-orange-200 transition font-medium border border-orange-200/50 shadow-sm backdrop-blur-sm shadow-orange-900/5">
                                ⚠️ {t('example_moderate_risk')}
                            </button>
                            <button onClick={() => fillExample('high')} type="button" className="text-xs px-3 py-2 rounded-xl bg-red-100/80 text-red-700 hover:bg-red-200 transition font-medium border border-red-200/50 shadow-sm backdrop-blur-sm shadow-red-900/5">
                                🚨 {t('example_high_risk')}
                            </button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 items-start">

                        {/* Column 1: Personal & Physical */}
                        <div className="space-y-6">
                            <Card title={t('personal_info')} className="h-full bg-white/80 backdrop-blur-xl border-white/40 shadow-xl">
                                <Input
                                    label={t('age_label')}
                                    name="age"
                                    type="number"
                                    value={formData.age}
                                    onChange={handleChange}
                                    placeholder="e.g. 45"
                                    icon={<User className="w-4 h-4" />}
                                />
                                <Select
                                    label={t('gender_label')}
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    options={[
                                        { value: 'male', label: t('gender_male') },
                                        { value: 'female', label: t('gender_female') }
                                    ]}
                                />
                            </Card>

                            <Card title={t('body_measurements')} className="bg-white/80 backdrop-blur-xl border-white/40 shadow-xl">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label={t('weight_label')}
                                        name="weight"
                                        type="number"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        placeholder="70"
                                        icon={<Weight className="w-4 h-4" />}
                                    />
                                    <Input
                                        label={t('height_label')}
                                        name="height"
                                        type="number"
                                        value={formData.height}
                                        onChange={handleChange}
                                        placeholder="175"
                                        icon={<Ruler className="w-4 h-4" />}
                                    />
                                </div>
                            </Card>
                        </div>

                        {/* Column 2: Vital Signs & Action */}
                        <div className="flex flex-col justify-between h-full">
                            <Card
                                title={
                                    <div className="flex items-center gap-2">
                                        <span>{t('vital_signs')}</span>
                                        <div className="relative group flex items-center">
                                            <div className="p-1 rounded-full bg-gray-100/50 hover:bg-gray-200/50 transition-colors cursor-help">
                                                <Info className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                                            </div>
                                            {/* Tooltip */}
                                            <div className="absolute bottom-full mb-3 -left-4 sm:left-1/2 sm:-translate-x-1/2 w-64 p-4 bg-gray-900/95 backdrop-blur-md text-white text-sm rounded-2xl shadow-2xl z-50 font-normal border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none">
                                                <div className="absolute -bottom-2 left-6 sm:left-1/2 sm:-translate-x-1/2 w-4 h-4 bg-gray-900/95 rotate-45 border-r border-b border-white/10"></div>
                                                <div className="relative z-10">
                                                    <p className="font-semibold mb-3 text-gray-200">{t('normal_ranges_title')}</p>
                                                    <div className="space-y-2 text-xs text-gray-300">
                                                        <div className="flex justify-between items-center">
                                                            <span className="flex items-center gap-1.5"><Thermometer className="w-3.5 h-3.5 text-blue-400" /> Temp:</span>
                                                            <span className="font-medium bg-white/5 px-2 py-0.5 rounded-md">36.5 - 37.5 °C</span>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-red-400" /> HR:</span>
                                                            <span className="font-medium bg-white/5 px-2 py-0.5 rounded-md">60 - 100 bpm</span>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="flex items-center gap-1.5" title={t('tt_rr')}><Wind className="w-3.5 h-3.5 text-green-400" /> RR:</span>
                                                            <span className="font-medium bg-white/5 px-2 py-0.5 rounded-md">12 - 20 /min</span>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-purple-400" /> SpO2:</span>
                                                            <span className="font-medium bg-white/5 px-2 py-0.5 rounded-md">95 - 100%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                className="bg-white/80 backdrop-blur-xl border-white/40 shadow-xl"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Input
                                        label={t('temp_label')}
                                        name="temp"
                                        type="number"
                                        value={formData.temp}
                                        onChange={handleChange}
                                        placeholder="36.5"
                                        icon={<Thermometer className="w-4 h-4" />}
                                        tooltipInfo={t('tt_temp')}
                                    />
                                    <Input
                                        label={t('hr_label')}
                                        name="heartRate"
                                        type="number"
                                        value={formData.heartRate}
                                        onChange={handleChange}
                                        placeholder="72"
                                        icon={<Heart className="w-4 h-4" />}
                                        tooltipInfo={t('tt_hr')}
                                    />
                                    <Input
                                        label={t('rr_label')}
                                        name="rr"
                                        type="number"
                                        value={formData.rr}
                                        onChange={handleChange}
                                        placeholder={t('rr_placeholder')}
                                        icon={<Wind className="w-4 h-4" />}
                                        tooltipInfo={t('tt_rr')}
                                    />
                                    <Input
                                        label={t('spo2_label')}
                                        name="spo2"
                                        type="number"
                                        value={formData.spo2}
                                        onChange={handleChange}
                                        placeholder="98"
                                        max="100"
                                        icon={<Activity className="w-4 h-4" />}
                                        tooltipInfo={t('tt_spo2')}
                                    />
                                </div>

                                <div className="mt-4 p-4 bg-pastel-green/20 rounded-xl flex gap-3 items-start">
                                    <div className="bg-white p-1.5 rounded-full shadow-sm text-green-600 mt-0.5">
                                        <Activity className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-700">{t('medical_accuracy')}</h4>
                                        <p className="text-xs text-gray-500 mt-1">{t('accuracy_desc')}</p>
                                    </div>
                                </div>
                            </Card>

                            <div className="mt-6 flex justify-end">
                                <Button onClick={handleSubmit} className="md:w-full md:px-12 text-lg shadow-xl shadow-primary/20">
                                    {t('analyze_btn')} <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
