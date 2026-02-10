const { getTasks } = require('./utils');
const path = require('path');
const fs = require('fs');

const tasksDir = path.join(__dirname, '../project/tasks');
const outputFile = path.join(__dirname, '../project/kanban.md');

const tasks = getTasks(tasksDir);

const columns = {
    'new': [],
    'in-progress': [],
    'done': []
};

// Group tasks by status
tasks.forEach(task => {
    let status = task.metadata.status ? task.metadata.status.toLowerCase() : 'unknown';
    // Normalize status (optional, but good for consistency)
    if (status === 'todo') status = 'new';

    if (!columns[status]) {
        columns[status] = [];
    }
    columns[status].push(task);
});

// Generate Markdown
let markdown = '# Kanban Board\n\n';
markdown += `Generated on: ${new Date().toLocaleString()}\n\n`;

// Define order of columns
const orderedKeys = ['new', 'in-progress', 'done'];
const otherKeys = Object.keys(columns).filter(k => !orderedKeys.includes(k));
const allKeys = [...orderedKeys, ...otherKeys];

allKeys.forEach(status => {
    const statusTasks = columns[status] || [];
    if (statusTasks.length > 0 || orderedKeys.includes(status)) {
        markdown += `## ${status.toUpperCase()} (${statusTasks.length})\n\n`;
        if (statusTasks.length === 0) {
            markdown += '_No tasks_\n\n';
        } else {
            statusTasks.forEach(task => {
                const title = task.metadata.description || task.file;
                const assignee = task.metadata.assigned || 'unassigned';
                const pri = task.metadata.pri || 'unknown';
                markdown += `- [${task.file}](tasks/${task.file}) (Pri: ${pri}, Assigned: ${assignee})\n`;
            });
            markdown += '\n';
        }
    }
});

fs.writeFileSync(outputFile, markdown);
console.log(`Kanban board generated at ${outputFile}`);
