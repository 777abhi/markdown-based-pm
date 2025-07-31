# markdown-based-pm

This project uses a markdown-based system for project management. Tasks and subtasks are organized hierarchically and tracked with metadata.

## Recent Updates

- Added a new task: [chore:new task](project/tasks/20250731_193000.md)
- Added a new subtask: [chore:new subtask](project/tasks/subtasks/20250731_193100.md)

## How to Add Tasks and Subtasks

This project includes a set of VS Code snippets to streamline the creation of tasks and subtasks. Follow the steps below to add new entries:

### Adding a Task

1. Use the snippet prefix `t` in a markdown file.
2. Provide the task type (e.g., `chore`, `fix`) and task name when prompted.
3. The snippet will generate a link to a new task file in the `tasks` directory.

Example:

```markdown
- [chore:example task](tasks/20250731_193000.md)
```

### Adding a Subtask

1. Use the snippet prefix `s` in a markdown file.
2. Provide the subtask type (e.g., `chore`, `fix`) and subtask name when prompted.
3. The snippet will generate a link to a new subtask file in the `subtasks` directory.

Example:

```markdown
- [chore:example subtask](subtasks/20250731_193100.md)
```

### Adding Metadata to a Task or Subtask

1. Use the snippet prefix `m` in the newly created task or subtask file.
2. Fill in the placeholders for `assigned`, `status`, `priority`, `tags`, and `effort`.
3. The snippet will generate a metadata block at the top of the file.

Example:

```markdown
---
- assigned: ab
- status: new
- pri: m
- created: 20250731_193000
- tags: chore
- effort: 0.5
---

# Progress
```

### Inserting Current Date and Time

1. Use the snippet prefix `d` to insert the current date, time, and day into any markdown file.
2. This is useful for logging progress updates.

Example:

```markdown
## 2025-07-31 19:30:00 (Thursday)
```

## Directory Structure

- `tasks/`: Contains all task files.
- `tasks/subtasks/`: Contains all subtask files.
- `.vscode/project-snippets.code-snippets`: Contains the VS Code snippets for task management.

## Snippet Configuration

Ensure the `.vscode/project-snippets.code-snippets` file is correctly configured in your project. This file provides the snippets used for task and subtask creation.

For more details, refer to the snippet file in `.vscode/`.
