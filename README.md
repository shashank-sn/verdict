# @ftod/verdict

> **distribution status (2026-08-23):** this package is not published on npm. the install commands below will fail until a release exists.

You install packages without thinking. `lodash` for one function. `moment` when `Intl` works. `axios` when `fetch` is built in.

This CLI reads your `package.json` and tells you the truth about every dependency.

## Install

```bash
npm install -g @ftod/verdict
```

Or just run it:

```bash
npx @ftod/verdict
```

## Usage

```bash
# Audit cwd
verdict

# Audit specific project
verdict --path ../some-project

# Audit single package
verdict --package lodash

# JSON for CI
verdict --json

# Only show problems
verdict --problems-only

# Exit 1 if problems found
verdict --strict
```

## What you get

```
@ftod/verdict — honest dependency verdicts

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

## Categories

- ❌ **OVERKILL** — Huge package, trivial use. Replace now.
- ⚠️ **NATIVE_ALT** — Built-in alternative exists. Drop it.
- ⚠️ **HEAVY** — Large footprint. Justify the cost.
- ✅ **CLEAN** — Lightweight, no native alternative. Keep.
- ✅ **STDLIB** — Built-in module. No dep needed.
- ❓ **UNKNOWN** — Not in verdict DB. No judgment yet.

## Flags

| Flag | Default | Description |
|------|---------|-------------|
| `--path` | `.` | Path to project root |
| `--package` | — | Audit single package |
| `--json` | — | JSON output |
| `--problems-only` | — | Show only issues |
| `--strict` | — | Exit 1 if problems found |

## v1 limitations

- Offline only. Hardcoded verdicts for ~50 common packages.
- Static analysis. No actual bundle size measurement.
- Direct deps only. No transitive analysis.
- No auto-fix. No security audit.

## Contributing

Add a verdict? Edit `src/verdicts.ts`, submit a PR.

## License

MIT
