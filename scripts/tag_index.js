const { getTasks } = require('./utils');
const path = require('path');
const fs = require('fs');

const tasksDir = path.join(__dirname, '../project/tasks');
const outputFile = path.join(__dirname, '../project/tags.md');

const tasks = getTasks(tasksDir);
const tagMap = {};

tasks.forEach(task => {
    let tags = task.metadata.tags;
    if (tags) {
        // Handle comma separated tags
        if (typeof tags === 'string') {
            tags = tags.split(',').map(t => t.trim());
        } else if (!Array.isArray(tags)) {
            tags = [String(tags)];
        }

        tags.forEach(tag => {
            if (!tagMap[tag]) {
                tagMap[tag] = [];
            }
            tagMap[tag].push(task);
        });
    } else {
        if (!tagMap['untagged']) {
            tagMap['untagged'] = [];
        }
        tagMap['untagged'].push(task);
    }
});

let markdown = '# Tag Index\n\n';
markdown += `Generated on: ${new Date().toLocaleString()}\n\n`;

const sortedTags = Object.keys(tagMap).sort();

sortedTags.forEach(tag => {
    markdown += `## ${tag}\n\n`;
    tagMap[tag].forEach(task => {
        const title = task.metadata.description || task.file;
        const status = task.metadata.status || 'unknown';
        markdown += `- [${task.file}](tasks/${task.file}) (Status: ${status})\n`;
    });
    markdown += '\n';
});

markdown = markdown.trim() + '\n';

fs.writeFileSync(outputFile, markdown);
console.log(`Tag index generated at ${outputFile}`);
