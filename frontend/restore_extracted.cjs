const fs = require('fs');
const path = require('path');

const src = 'C:/Users/2069a/Downloads/extracted_src';
const dest = 'C:/Users/2069a/Downloads/404-main/404-main/frontend/src';

const mappings = [
    { from: 'Home.jsx', to: 'components/Home.jsx' },
    { from: 'unknown_wc2n8.jsx', to: 'components/Navbar.jsx' }, // Navbar
    { from: 'Dashboard.jsx', to: 'features/dashboard/Dashboard.jsx' },
    { from: 'GovernmentSchemes.jsx', to: 'features/schemes/GovernmentSchemes.jsx' },
    { from: 'DiseaseDetector.jsx', to: 'features/Disease/DiseaseDetector.jsx' },
    { from: 'unknown_ct9fe.jsx', to: 'features/yield/MapPanel.jsx' }, // guessing MapPanel
    { from: 'unknown_4ocoy.jsx', to: 'features/livestock/LivestockDashboard.jsx' },
    { from: 'AnimalDetail.jsx', to: 'features/livestock/AnimalDetail.jsx' },
    { from: 'unknown_dyhaj.jsx', to: 'features/profile/FarmProfile.jsx' },
    { from: 'MarketView.jsx', to: 'features/market/MarketView.jsx' }
];

// Determine what unknown files are
const files = fs.readdirSync(src);
for (const f of files) {
    if (f.startsWith('unknown_')) {
        const content = fs.readFileSync(path.join(src, f), 'utf8');
        if (content.includes('export default Navbar')) {
            fs.copyFileSync(path.join(src, f), path.join(dest, 'components/Navbar.jsx'));
            console.log("Restored Navbar.jsx");
        } else if (content.includes('export default MapPanel')) {
            fs.copyFileSync(path.join(src, f), path.join(dest, 'features/yield/MapPanel.jsx'));
            console.log("Restored MapPanel.jsx");
        } else if (content.includes('export default LivestockDashboard') || content.includes('function LivestockDashboard')) {
            fs.copyFileSync(path.join(src, f), path.join(dest, 'features/livestock/LivestockDashboard.jsx'));
            console.log("Restored LivestockDashboard.jsx");
        } else if (content.includes('export default FarmProfile')) {
            fs.copyFileSync(path.join(src, f), path.join(dest, 'features/profile/FarmProfile.jsx'));
            console.log("Restored FarmProfile.jsx");
        } else if (content.includes('export default YieldPredictor')) {
            fs.copyFileSync(path.join(src, f), path.join(dest, 'features/yield/YieldPredictor.jsx'));
            console.log("Restored YieldPredictor.jsx");
        } else if (content.includes('export default Microfarm')) {
            fs.copyFileSync(path.join(src, f), path.join(dest, 'features/microfarm/Microfarm.jsx'));
            console.log("Restored Microfarm.jsx");
        } else if (content.includes('export default ChatAssistant')) {
            fs.copyFileSync(path.join(src, f), path.join(dest, 'features/chat/ChatAssistant.jsx'));
            console.log("Restored ChatAssistant.jsx");
        }
    } else if (f !== 'LanguageContext.jsx') {
        const mapping = mappings.find(m => m.from === f);
        if (mapping) {
            fs.copyFileSync(path.join(src, f), path.join(dest, mapping.to));
            console.log("Restored " + f);
        }
    }
}
