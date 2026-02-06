# Markdown Based Project Management

This project uses a markdown-based system for project management. Tasks and subtasks are organized hierarchically and tracked with metadata using VS Code snippets and a structured file system.

## Project Structure

The project is organized as follows:

- `project/`: The root directory for project management data.
  - `tasks/`: Directory containing all individual task markdown files.
  - `subtasks/`: Directory containing all subtask markdown files.
  - `index.md`: The main dashboard or backlog file listing active tasks.
- `.vscode/`: VS Code configuration directory.
  - `project-snippets.code-snippets`: JSON file defining the VS Code snippets used to automate task creation and management.
- `package.json`: NPM configuration file, currently set up for semantic-release.

## Existing Features

The current system provides the following features:

1.  **Task Creation:** Quickly create new task files with unique timestamp-based filenames and link them in the main list using the `t` snippet.
2.  **Subtask Creation:** create subtask files with unique timestamp-based filenames using the `s` snippet.
3.  **Metadata Management:** Standardized front-matter metadata for tasks (assigned, status, priority, created date, tags, effort) using the `m` snippet.
4.  **Progress Logging:** Easily insert the current date and time for progress updates within task files using the `d` snippet.
5.  **Centralized Backlog:** A `project/index.md` file serves as the central hub for tracking all tasks.
6.  **Semantic Release:** Automated versioning and release management configured via `semantic-release`.

## Future Roadmap (Next 20 Features)

We plan to incrementally enhance the system with the following 20 features:

1.  **Task Template Enhancement:** Add `due_date`, `related_links`, and `description` fields to the metadata snippet.
2.  **Kanban Board View:** A script to visualize tasks in columns based on their `status` (new, in-progress, done).
3.  **Task Archiving:** A utility to move completed tasks (status: done) to an `archive` folder to keep the active view clean.
4.  **Tag Indexing:** A script to generate a `tags.md` index file that lists tasks grouped by their `tags`.
5.  **Dependency Tracking:** Add a `blocked_by` field to metadata and a script to visualize or warn about dependencies.
6.  **Time Tracking:** Enhance progress logging to support start/stop timestamps and calculate duration.
7.  **Task Summary Generation:** A script to aggregate "Progress" sections from active tasks into a daily or weekly report.
8.  **Automated Status Updates:** A pre-commit hook that updates the `status` field based on file location (e.g., moving to `done/` folder).
9.  **Priority Sorting:** A script to reorder tasks in `index.md` based on the `pri` (priority) metadata field.
10. **Deadlines & Overdue Alerts:** A script that scans for `due_date` and generates warnings for approaching or overdue deadlines.
11. **User Assignment View:** Generate an `assigned.md` file that groups tasks by the `assigned` user.
12. **Effort Estimation Rollup:** Calculate and display the total `effort` remaining for all active tasks.
13. **Subtask Rolling:** Automatically list linked subtasks within the parent task file for better visibility.
14. **Template Support:** Support multiple task types (e.g., "Bug", "Feature", "Research") with distinct metadata templates.
15. **CLI Tool:** A command-line interface (e.g., `pm status`, `pm add`) to interact with the system without snippets.
16. **Calendar View:** Generate a calendar view (Markdown or iCal) showing tasks on their created or due dates.
17. **GitHub/GitLab Integration:** Sync markdown tasks with GitHub Issues to enable two-way updates.
18. **Search Utility:** A specialized grep tool to find tasks by content, tag, or metadata field.
19. **Review Workflow:** Add a `review` status and a script to identify and list tasks waiting for review.
20. **Burndown Chart:** Generate a simple ASCII or image-based burndown chart based on task completion history.

## How to Add Tasks and Subtasks (Usage)

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

## Snippet Configuration

Ensure the `.vscode/project-snippets.code-snippets` file is correctly configured in your project. This file provides the snippets used for task and subtask creation.
