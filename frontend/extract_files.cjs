const fs = require('fs');
const path = require('path');

const ids = [
  '3e9af00d-d297-4c46-824f-419ee7f7fddb',
  '750e6c16-f09a-4e3d-9827-3dabe046867d',
  '1b8f65a9-3932-4e48-b28b-83b9af8e98ab',
  'c4823fa5-8f6b-433e-a280-85699e5d031a',
  '9b55e844-6f07-49c5-a696-1a5d2fef1bc9'
];

for (const id of ids) {
  const p = 'C:/Users/2069a/.gemini/antigravity/brain/' + id + '/.system_generated/logs/transcript_full.jsonl';
  if (fs.existsSync(p)) {
    const lines = fs.readFileSync(p, 'utf8').split('\n');
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const data = JSON.parse(line);
        if (data.content && typeof data.content === 'string' && data.content.includes('1: import ') && data.content.includes('The above content shows')) {
           
           let fileContent = data.content.split('The above content shows')[0].split('\n').filter(l => /^\d+: /.test(l)).map(l => l.replace(/^\d+: /, '')).join('\n');
           
           let fileName = 'unknown_' + Math.random().toString(36).substr(2, 5) + '.jsx';
           if (fileContent.includes('export default Navbar')) fileName = 'Navbar.jsx';
           else if (fileContent.includes('export default Home')) fileName = 'Home.jsx';
           else if (fileContent.includes('export default Dashboard')) fileName = 'Dashboard.jsx';
           else if (fileContent.includes('export default ChatAssistant')) fileName = 'ChatAssistant.jsx';
           else if (fileContent.includes('export default GovernmentSchemes')) fileName = 'GovernmentSchemes.jsx';
           else if (fileContent.includes('export default DiseaseDetector')) fileName = 'DiseaseDetector.jsx';
           else if (fileContent.includes('export default YieldPredictor')) fileName = 'YieldPredictor.jsx';
           else if (fileContent.includes('export default MapPanel')) fileName = 'MapPanel.jsx';
           else if (fileContent.includes('export default AnimalDetail')) fileName = 'AnimalDetail.jsx';
           else if (fileContent.includes('export default LivestockDashboard')) fileName = 'LivestockDashboard.jsx';
           else if (fileContent.includes('export default MarketView')) fileName = 'MarketView.jsx';
           else if (fileContent.includes('export default Microfarm')) fileName = 'Microfarm.jsx';
           else if (fileContent.includes('export default FarmProfile')) fileName = 'FarmProfile.jsx';
           else {
               // if it uses "function Microfarm" but exports at bottom
               if (fileContent.includes('Microfarm')) fileName = 'Microfarm.jsx';
               if (fileContent.includes('YieldPredictor')) fileName = 'YieldPredictor.jsx';
               if (fileContent.includes('LivestockDashboard')) fileName = 'LivestockDashboard.jsx';
           }
           
           console.log("Extracted: " + fileName);
           fs.writeFileSync('C:/Users/2069a/Downloads/temp_restore_' + fileName, fileContent);
        }
      } catch (e) {}
    }
  }
}
