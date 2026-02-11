const { getTasks } = require('./utils');
const path = require('path');
const fs = require('fs');

const tasksDir = path.join(__dirname, '../project/tasks');
const outputFile = path.join(__dirname, '../project/dependencies.md');

const tasks = getTasks(tasksDir);
const taskMap = {};

// Build a map of filename -> task for easy lookup
tasks.forEach(task => {
    taskMap[task.file] = task;
});

let markdown = '# Dependency Report\n\n';
markdown += `Generated on: ${new Date().toLocaleString()}\n\n`;

let hasDependencies = false;

tasks.forEach(task => {
    let blockedBy = task.metadata.blocked_by;

    if (blockedBy && blockedBy.trim() !== '') {
        hasDependencies = true;
        markdown += `## ${task.file}\n`;
        markdown += `**Status:** ${task.metadata.status}\n\n`;
        markdown += `**Blocked By:**\n`;

        const blockers = blockedBy.split(',').map(b => b.trim());

        blockers.forEach(blocker => {
            // Blocker could be a filename or just an ID/name. Assuming filename or ID.
            // If it's a filename, we can check its status.
            let blockerTask = taskMap[blocker];

            // Try to find if the blocker ID matches a filename partially or exactly
            if (!blockerTask) {
                // simple search
                 const found = tasks.find(t => t.file === blocker || t.file.startsWith(blocker));
                 if (found) blockerTask = found;
            }

            if (blockerTask) {
                const status = blockerTask.metadata.status || 'unknown';
                const statusIcon = (status.toLowerCase() === 'done') ? '✅' : '🛑';
                markdown += `- ${statusIcon} [${blockerTask.file}](tasks/${blockerTask.file}) (Status: ${status})\n`;
            } else {
                markdown += `- ❓ ${blocker} (Task not found)\n`;
            }
        });
        markdown += '\n';
    }
});

if (!hasDependencies) {
    markdown += 'No dependencies found.\n';
}

fs.writeFileSync(outputFile, markdown);
console.log(`Dependency report generated at ${outputFile}`);
