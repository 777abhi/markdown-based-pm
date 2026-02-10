const fs = require('fs');
const path = require('path');

function parseMetadata(content) {
    const metadata = {};
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (match) {
        const lines = match[1].split('\n');
        lines.forEach(line => {
            const parts = line.trim().match(/^- (\w+): (.*)$/);
            if (parts) {
                const key = parts[1];
                let value = parts[2].trim();
                // Handle potential numeric or boolean values if needed, currently treating all as strings
                metadata[key] = value;
            }
        });
    }
    return metadata;
}

function getTasks(dir) {
    if (!fs.existsSync(dir)) {
        return [];
    }
    const files = fs.readdirSync(dir);
    const tasks = [];
    files.forEach(file => {
        if (path.extname(file) === '.md') {
            const filepath = path.join(dir, file);
            const content = fs.readFileSync(filepath, 'utf8');
            const metadata = parseMetadata(content);
            tasks.push({
                file: file,
                filepath: filepath,
                metadata: metadata,
                content: content
            });
        }
    });
    return tasks;
}

module.exports = {
    parseMetadata,
    getTasks
};
