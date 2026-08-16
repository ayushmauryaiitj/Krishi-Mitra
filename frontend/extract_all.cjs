const fs = require('fs');
const path = require('path');

const ids = [
  '3e9af00d-d297-4c46-824f-419ee7f7fddb',
  '750e6c16-f09a-4e3d-9827-3dabe046867d',
  '1b8f65a9-3932-4e48-b28b-83b9af8e98ab',
  'c4823fa5-8f6b-433e-a280-85699e5d031a',
  '9b55e844-6f07-49c5-a696-1a5d2fef1bc9'
];

const outDir = 'C:/Users/2069a/Downloads/extracted_src';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

for (const id of ids) {
  const p = 'C:/Users/2069a/.gemini/antigravity/brain/' + id + '/.system_generated/logs/transcript_full.jsonl';
  if (fs.existsSync(p)) {
    const lines = fs.readFileSync(p, 'utf8').split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim()) continue;
      try {
        const data = JSON.parse(line);
        if (data.content && typeof data.content === 'string' && data.content.includes('1: import ') && data.content.includes('The above content shows')) {
           
           let fileContent = data.content.split('The above content shows')[0].split('\n').filter(l => /^\d+: /.test(l)).map(l => l.replace(/^\d+: /, '')).join('\n');
           
           let fileName = 'unknown_' + Math.random().toString(36).substr(2, 5) + '.jsx';
           
           // We can find the filename from the PREVIOUS tool_call step!
           // Let's look backwards for the tool_call
           for (let j = i - 1; j >= 0; j--) {
               try {
                   const prevData = JSON.parse(lines[j]);
                   if (prevData.tool_calls) {
                       for (const call of prevData.tool_calls) {
                           if (call.name === 'view_file' || call.name === 'default_api:view_file') {
                               if (call.args.AbsolutePath) {
                                   fileName = path.basename(call.args.AbsolutePath);
                                   break;
                               }
                           }
                       }
                   }
                   if (fileName !== 'unknown_' && !fileName.startsWith('unknown_')) break;
               } catch (e) {}
           }
           
           console.log("Extracted: " + fileName);
           fs.writeFileSync(path.join(outDir, fileName), fileContent);
        }
      } catch (e) {}
    }
  }
}
