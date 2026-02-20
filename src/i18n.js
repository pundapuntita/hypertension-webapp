import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// -----------------------------------------------------------------------------
// Translations Data
// -----------------------------------------------------------------------------
const resources = {
    en: {
        translation: {
            // Welcome Page
            welcome_badge: "Free Medical Assessment AI",
            welcome_title_track: "Track Your",
            welcome_title_health: "Heart Health",
            welcome_desc: "Use our professional AI prediction engine to analyze your hypertension risk factors in seconds. Fast, private, and secure.",
            start_assessment: "Start Assessment",
            learn_more: "Learn More",
            based_on: "Based on research published in MDPI",
            disclaimer: "⚠️ This application is for screening purposes only and does not replace medical diagnosis.",
            heart_rate_label: "Heart Rate",
            bp_label: "Blood Pressure",

            // Form Header
            form_title: "New Assessment",
            form_desc: "Enter patient vitals and details",

            // Personal Info Card
            personal_info: "Personal Information",
            age_label: "Age (Years)",
            gender_label: "Gender",
            gender_male: "Male",
            gender_female: "Female",

            // Body Measurements Card
            body_measurements: "Body Measurements",
            weight_label: "Weight (kg)",
            height_label: "Height (cm)",

            // Vital Signs Card
            vital_signs: "Vital Signs",
            temp_label: "Temperature (°C)",
            hr_label: "Heart Rate (bpm)",
            rr_label: "Resp. Rate (RR)",
            rr_placeholder: "16",
            spo2_label: "O2 Saturation (%)",

            // Tooltips
            normal_ranges_title: "Normal Ranges Reference",
            tt_temp: "Body heat level, used to check for fever.",
            tt_hr: "Number of heartbeats per minute.",
            tt_rr: "Number of breaths taken per minute.",
            tt_spo2: "Amount of oxygen in your blood.",

            // Action & Warnings
            medical_accuracy: "Medical Accuracy",
            accuracy_desc: "Please ensure vitals are measured correctly using calibrated devices for the best prediction.",
            analyze_btn: "Analyze Vitals",

            // Result Page
            result_title: "Analysis Result",
            result_probability: "Probability",
            result_high_risk: "High Risk",
            result_moderate: "Moderate Risk",
            result_low_risk: "Low Risk",
            score_of: "Score of",
            result_desc_high: "indicates a high likelihood of hypertension. Please consult a doctor.",
            result_desc_moderate: "suggests you should monitor your health and consider lifestyle changes.",
            result_desc_low: "means your vitals are currently in a healthy range. Keep it up!",
            start_new: "Start New Assessment",
            action_plan: "Action Plan",
            personalized: "Personalized",
            recommendation_num: "Recommendation ",
            medical_disclaimer: "Medical Disclaimer",
            disclaimer_desc: "This tool is for educational purposes only and not a substitute for professional medical advice. Always consult with a qualified healthcare provider for diagnosis and treatment.",

            // Errors
            validation_error: "Please fill in key fields (Age, Weight, Height, Heart Rate)",
            range_error: "Some values are out of realistic medical ranges. Please check. (e.g., Age 8-120, HR 30-250)",
            calculation_error: "Error calculating risk. Please check console.",

            // Recommendations
            rec_high_risk_doctor: "Consult a doctor immediately to evaluate your blood pressure and heart health.",
            rec_reduce_sodium: "Reduce sodium (salt) intake and avoid processed foods to help lower blood pressure.",
            rec_moderate_exercise: "Engage in moderate-intensity aerobic exercise, like brisk walking, for 30 minutes daily.",
            rec_healthy_diet: "Adopt a DASH or Mediterranean diet rich in fruits, vegetables, and whole grains.",
            rec_low_risk_maintain: "Maintain your healthy lifestyle with regular exercise and a balanced diet.",
            rec_bmi_overweight: "Your BMI indicates you are overweight. Consider consulting a nutritionist or start monitoring your diet.",
            rec_high_hr: "Your resting heart rate is high. Reduce caffeine, stay hydrated, and manage stress.",
            rec_low_spo2: "Low oxygen saturation detected. Practice deep breathing and ensure good ventilation.",

            // Features
            download_pdf: "Download PDF",
            example_high_risk: "Example (High Risk)",
            example_moderate_risk: "Example (Moderate Risk)",
            example_low_risk: "Example (Low Risk)",
            vitals_summary: "Vitals Summary",
            status_normal: "Normal",
            status_high: "High",
            status_low: "Low",
            privacy_guarantee: "🔒 100% Local Processing: Your medical data never leaves this device.",

            // Language Switcher
            lang_th: "Thai",
            lang_en: "English"
        }
    },
    th: {
        translation: {
            // Welcome Page
            welcome_badge: "AI ประเมินสุขภาพเบื้องต้นฟรี",
            welcome_title_track: "ติดตาม",
            welcome_title_health: "สุขภาพหัวใจของคุณ",
            welcome_desc: "ใช้ระบบวิเคราะห์ความเสี่ยงความดันโลหิตสูงด้วย AI ของเรา ทราบผลทันที รวดเร็ว และเป็นส่วนตัว",
            start_assessment: "เริ่มการประเมิน",
            learn_more: "เรียนรู้เพิ่มเติม",
            based_on: "อ้างอิงจากงานวิจัยที่ตีพิมพ์ใน MDPI",
            disclaimer: "⚠️ แอปพลิเคชันนี้มีไว้สำหรับคัดกรองเบื้องต้นเท่านั้น ไม่สามารถทดแทนการวินิจฉัยโดยแพทย์ได้",
            heart_rate_label: "อัตราการเต้นหัวใจ",
            bp_label: "ความดันโลหิต",

            // Form Header
            form_title: "ประเมินความเสี่ยงใหม่",
            form_desc: "กรอกข้อมูลร่างกายและสัญญาณชีพ",

            // Personal Info Card
            personal_info: "ข้อมูลส่วนตัว",
            age_label: "อายุ (ปี)",
            gender_label: "เพศ",
            gender_male: "ชาย",
            gender_female: "หญิง",

            // Body Measurements Card
            body_measurements: "สัดส่วนร่างกาย",
            weight_label: "น้ำหนัก (กก.)",
            height_label: "ส่วนสูง (ซม.)",

            // Vital Signs Card
            vital_signs: "สัญญาณชีพ (Vital Signs)",
            temp_label: "อุณหภูมิ (°C)",
            hr_label: "อัตราการเต้นหัวใจ (bpm)",
            rr_label: "อัตราหายใจ (RR)",
            rr_placeholder: "16",
            spo2_label: "ระดับออกซิเจน (%)",

            // Tooltips
            normal_ranges_title: "ค่าอ้างอิงปกติ",
            tt_temp: "อุณหภูมิความร้อนของร่างกาย ใช้สำหรับดูว่ามีไข้หรือไม่",
            tt_hr: "จำนวนครั้งที่หัวใจเต้นใน 1 นาที บ่งบอกถึงการทำงานของหัวใจ",
            tt_rr: "จำนวนครั้งที่สูดหายใจเข้าและออกใน 1 นาที",
            tt_spo2: "ระดับก๊าซออกซิเจนที่มีอยู่ในเลือด",

            // Action & Warnings
            medical_accuracy: "ความแม่นยำทางการแพทย์",
            accuracy_desc: "โปรดตรวจสอบให้แน่ใจว่าได้วัดสัญญาณชีพอย่างถูกต้องเพื่อการวิเคราะห์ที่แม่นยำที่สุด",
            analyze_btn: "วิเคราะห์ผล",

            // Result Page
            result_title: "ผลการวิเคราะห์",
            result_probability: "โอกาสเกิดความเสี่ยง",
            result_high_risk: "ความเสี่ยงสูง",
            result_moderate: "ความเสี่ยงปานกลาง",
            result_low_risk: "ความเสี่ยงต่ำ",
            score_of: "คะแนนเสี่ยง",
            result_desc_high: "เป็นระดับที่อันตราย เสี่ยงเป็นความดันโลหิตสูง ควรไปพบแพทย์เพื่อตรวจละเอียด",
            result_desc_moderate: "หมายถึงคุณเริ่มมีความเสี่ยง ควรปรับเปลี่ยนพฤติกรรมสุขภาพ",
            result_desc_low: "หมายถึงสุขภาพและสัญญาณชีพของคุณอยู่ในเกณฑ์ที่ดีมาก ทำต่อไปนะ!",
            start_new: "เริ่มการประเมินใหม่",
            action_plan: "แผนการดูแลสุขภาพ",
            personalized: "เฉพาะบุคคล",
            recommendation_num: "คำแนะนำที่ ",
            medical_disclaimer: "ข้อสงวนสิทธิ์ทางการแพทย์",
            disclaimer_desc: "เครื่องมือนี้มีไว้เพื่อเป็นข้อมูลเบื้องต้นเท่านั้น ไม่สามารถใช้ทดแทนคำแนะนำทางการแพทย์จากผู้เชี่ยวชาญได้ โปรดปรึกษาแพทย์หรือผู้เชี่ยวชาญเพื่อการวินิจฉัยและรักษา",

            // Errors
            validation_error: "กรุณากรอกข้อมูลสำคัญให้ครบ (อายุ, น้ำหนัก, ส่วนสูง, อัตราหัวใจ)",
            range_error: "ตัวเลขบางค่าเกินช่วงปกติที่เป็นไปได้ กรุณาตรวจสอบอีกครั้ง (เช่น อายุ 8-120 ปี, อัตราหัวใจ 30-250)",
            calculation_error: "เกิดข้อผิดพลาดในการคำนวณ โปรดลองใหม่อีกครั้ง",

            // Recommendations
            rec_high_risk_doctor: "ควรปรึกษาแพทย์โดยเร็วเพื่อตรวจวัดความดันโลหิตและรับการประเมินสุขภาพอย่างละเอียด",
            rec_reduce_sodium: "ลดการบริโภคโซเดียม (ความเค็ม) เลี่ยงอาหารแปรรูปหรืออาหารหมักดอง เพื่อช่วยลดความดัน",
            rec_moderate_exercise: "ออกกำลังกายแบบแอโรบิก เช่น การเดินเร็ว อย่างน้อย 30 นาทีต่อวัน",
            rec_healthy_diet: "ปรับการรับประทานอาหาร เน้นผัก ผลไม้ ธัญพืชขัดสีน้อย และลดไขมันอิ่มตัว",
            rec_low_risk_maintain: "รักษาสุขภาพให้ดีอย่างนี้ต่อไป ออกกำลังกายสม่ำเสมอและหมั่นทานอาหารที่มีประโยชน์",
            rec_bmi_overweight: "ค่า BMI บ่งบอกว่าน้ำหนักเกินเกณฑ์ ทานอาหารให้พอดีและควรเริ่มควบคุมน้ำหนัก",
            rec_high_hr: "อัตราการเต้นหัวใจขณะพักสูงกว่าปกติ ควรลดคาเฟอีน ดื่มน้ำให้พอ และเบาความเครียด",
            rec_low_spo2: "ระดับออกซิเจนในเลือดต่ำกว่าเกณฑ์ ควรฝึกการงีบหายใจลึกๆ และหลีกเลี่ยงพื้นที่แออัด",

            // Features
            download_pdf: "บันทึกผลเป็น PDF",
            example_high_risk: "ตัวอย่างออโต้ (เสี่ยงสูง)",
            example_moderate_risk: "ตัวอย่างออโต้ (เสี่ยงปานกลาง)",
            example_low_risk: "ตัวอย่างออโต้ (เสี่ยงต่ำ)",
            vitals_summary: "สรุปรายละเอียดสุขภาพ",
            status_normal: "ปกติ",
            status_high: "สูงกว่าเกณฑ์",
            status_low: "ต่ำกว่าเกณฑ์",
            privacy_guarantee: "🔒 ข้อมูลถูกประมวลผลบนเครื่องของคุณเท่านั้น ไม่ส่งขึ้นเซิร์ฟเวอร์",

            // Language Switcher
            lang_th: "ภาษาไทย",
            lang_en: "อังกฤษ"
        }
    }
};

// -----------------------------------------------------------------------------
// Initialization
// -----------------------------------------------------------------------------
i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "th", // default language
        fallbackLng: "en",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
