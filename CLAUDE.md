# Project Instructions

## Session Memory Protocol

This project uses persistent memory files to maintain context across sessions.

### At session start
- Read `memory/MEMORY.md` (auto-loaded) for a high-level overview
- Read `memory/file-state.md` for detailed per-file state before making changes

### At session end (REQUIRED)
Before finishing your session, you MUST update the memory files to reflect any changes made:

1. **Update `memory/MEMORY.md`** — Keep it under 200 lines. Update:
   - Task progress
   - Current git state (branch, uncommitted changes)
   - Key architectural changes
   - Notes for the next agent session (what was done, what's next, gotchas)

2. **Update `memory/file-state.md`** — Reflect any files that were added, removed, or significantly changed. Include:
   - New files and their purpose
   - Changed files and what changed
   - Deleted files

The memory directory is at: `~/.claude/projects/-Users-mike-git-valentines-day/memory/`
