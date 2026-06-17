# @ftod/verdict

Honest dependency linting. Reads your package.json and tells you the truth about every dependency — what it actually adds, how heavy it is, whether you could replace it with stdlib.

## Install

```bash
npm install -g @ftod/verdict
```

Or run directly with npx:

```bash
npx @ftod/verdict
```

## Usage

### Audit cwd's package.json

```bash
verdict
```

### Audit specific project

```bash
verdict --path ../some-project
```

### Audit a specific package (without installing)

```bash
verdict --package lodash
```

### JSON output for scripting / CI

```bash
verdict --json
```

### Only show problems (hide CLEAN packages)

```bash
verdict --problems-only
```

### Strict mode (exit code 1 if problems found)

```bash
verdict --strict
```

## Sample Output

```
@ftod/verdict — honest dependency verdicts

Scanning ./package.json

PACKAGE          TYPE          CATEGORY     SIZE      VERDICT
─────────────────────────────────────────────────────────────────────
lodash           dependency    ❌ OVERKILL   ~70KB     Replace with native JS or lodash-es
moment           dependency    ❌ OVERKILL   ~70KB     Use Intl.DateTimeFormat or date-fns
axios            dependency    ⚠️ NATIVE_ALT ~30KB     Use native fetch()
uuid             dependency    ⚠️ NATIVE_ALT ~2KB      Use crypto.randomUUID()
rimraf           devDependency ⚠️ NATIVE_ALT ~10KB     Use fs.rmSync({recursive:true})
sharp            dependency    ⚠️ HEAVY      ~20MB     Powerful but native deps. Justify it.
commander        dependency    ✅ CLEAN      ~50KB     Lightweight CLI framework. Keep.
zod              dependency    ✅ CLEAN      ~50KB     Excellent validation. Keep.
typescript       devDependency ✅ CLEAN      ~60MB     Essential. Keep.

─────────────────────────────────────────────────────────────────────
8 deps scanned · 2 OVERKILL · 3 NATIVE_ALT · 1 HEAVY · 2 CLEAN

You could save ~172KB by replacing OVERKILL and NATIVE_ALT packages.
```

## Verdict Categories

| Category | Symbol | Meaning |
|----------|--------|---------|
| **OVERKILL** | ❌ | Huge package used for something trivial. Replace immediately. |
| **NATIVE ALT** | ⚠️ | Built-in Node.js/browser alternative exists. Drop the dep. |
| **HEAVY** | ⚠️ | Reasonable package but large footprint. Justify the cost. |
| **CLEAN** | ✅ | Lightweight, well-maintained, no native alternative. Keep it. |
| **STDLIB** | ✅ | Built-in module, no dep needed. |
| **UNKNOWN** | ❓ | Not in verdict DB. No judgment (v1 limitation). |

## Flags

| Flag | Default | Description |
|------|---------|-------------|
| `--path` | `.` (cwd) | Path to project root containing package.json |
| `--package` | — | Audit a single package by name (skip scanning) |
| `--json` | — | Output JSON instead of table |
| `--problems-only` | — | Hide CLEAN/STDLIB packages, show only issues |
| `--strict` | — | Exit code 1 if any OVERKILL or HEAVY packages found |

## v1 Limitations

- **Offline only:** Verdict database is hardcoded for ~50 common packages
- **Static analysis:** No actual bundle size measurement
- **Direct deps only:** No transitive dependency analysis
- **No auto-fix:** Cannot auto-replace packages
- **No security audit:** npm audit is a separate concern

## Contributing

Want to add a verdict? Edit `src/verdicts.ts` and submit a PR!

## License

MIT
