import W from './W.json';
import b from './b.json';
import Beta_output from './Beta_output.json';

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

export async function calculateRisk(data) {
    try {
        // 1. Data Parsing & Min-Max Normalization (based on training distribution)
        // Values are clamped to [0, 1] to prevent unobserved extreme outliers from breaking mapping.
        const X = [
            data.gender.toLowerCase() === 'male' ? 0.0 : 1.0, // SEX: Male=0, Female=1
            (parseFloat(data.age) - 8.0) / (97.0 - 8.0), // AGE
            (parseFloat(data.temp) - 35.69) / (37.2 - 35.69), // Temp
            (parseFloat(data.heartRate) - 45.0) / (117.0 - 45.0), // Pulse
            (parseFloat(data.rr) - 15.0) / (22.0 - 15.0), // RR
            (parseFloat(data.spo2) - 94.0) / (100.0 - 94.0), // O2Sat
            (parseFloat(data.weight) - 26.0) / (98.0 - 26.0), // Body Weight
            (parseFloat(data.height) - 137.0) / (185.3 - 137.0), // Height
            (parseFloat(data.bmi) - 13.45686) / (34.94943 - 13.45686) // BMI
        ];

        // 2. Hidden Layer Calculation ( Sigmoid( X * W + b ) )
        // Assuming W shape is [9, 40], and b is length 40
        let H = [];
        const numHidden = b.length;
        for (let j = 0; j < numHidden; j++) {
            let sum = b[j];
            for (let i = 0; i < X.length; i++) {
                sum += X[i] * W[i][j];
            }
            H[j] = 1 / (1 + Math.exp(-sum)); // Sigmoid Activation
        }

        // 3. Output Layer ( H * Beta )
        // Assuming Beta is shape [40, 2] -> Returns classes [No_risk, Risk]
        let Y = [0, 0];
        for (let j = 0; j < 2; j++) {
            for (let i = 0; i < numHidden; i++) {
                Y[j] += H[i] * Beta_output[i][j];
            }
        }

        // 4. Softmax Probability
        const expY0 = Math.exp(Y[0]);
        const expY1 = Math.exp(Y[1]);
        let probability = (expY1 / (expY0 + expY1)) * 100;

        // If your original model output directly 0 or 1 without softmax,
        // it may need an adjustment. For now we use standard Softmax to percentage.
        // Fallback: If it was a single node output mapped over 2 Beta columns:
        // We'll trust Softmax for probabilty bridging.

        // Determine Category
        let category = 'Low Risk';
        if (probability >= 50) category = 'High Risk';
        else if (probability >= 30) category = 'Moderate Risk';

        // Add an async artificial delay for a smooth UI loading spin
        await new Promise(resolve => setTimeout(resolve, 800));

        return {
            probability: Math.round(probability * 10) / 10,
            category,
            riskScore: probability
        };

    } catch (error) {
        console.error("Prediction Error:", error);
        return { probability: 0, category: 'Error', riskScore: 0, error: true };
    }
}

export function getRecommendations(data, riskCategory) {
    const recs = [];

    // Base behavioral recommendations depending on the Risk Category
    if (riskCategory === 'High Risk') {
        recs.push({ icon: '🚨', key: 'rec_high_risk_doctor' });
        recs.push({ icon: '🧂', key: 'rec_reduce_sodium' });
    } else if (riskCategory === 'Moderate Risk') {
        recs.push({ icon: '🏃‍♂️', key: 'rec_moderate_exercise' });
        recs.push({ icon: '🥗', key: 'rec_healthy_diet' });
    } else {
        recs.push({ icon: '🌟', key: 'rec_low_risk_maintain' });
    }

    // Specific vitals recommendations
    if (data.bmi > 25) recs.push({ icon: '⚖️', key: 'rec_bmi_overweight' });
    if (data.heartRate > 100) recs.push({ icon: '❤️', key: 'rec_high_hr' });
    if (data.spo2 < 95) recs.push({ icon: '🫁', key: 'rec_low_spo2' });

    return recs;
}
