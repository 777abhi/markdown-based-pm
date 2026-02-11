const { getTasks } = require('./utils');
const path = require('path');
const fs = require('fs');

const tasksDir = path.join(__dirname, '../project/tasks');
const archiveDir = path.join(__dirname, '../project/archive');

if (!fs.existsSync(archiveDir)) {
    fs.mkdirSync(archiveDir);
}

const tasks = getTasks(tasksDir);
let archivedCount = 0;

tasks.forEach(task => {
    if (task.metadata.status && task.metadata.status.toLowerCase() === 'done') {
        const oldPath = task.filepath;
        const newPath = path.join(archiveDir, task.file);

        fs.renameSync(oldPath, newPath);
        console.log(`Archived: ${task.file}`);
        archivedCount++;
    }
});

if (archivedCount === 0) {
    console.log('No tasks found to archive.');
} else {
    console.log(`Archived ${archivedCount} tasks.`);
}
