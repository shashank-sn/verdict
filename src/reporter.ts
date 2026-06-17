import chalk from 'chalk';
import { CheckedDependency } from './check';

export interface ReportOptions {
  json?: boolean;
  problemsOnly?: boolean;
  strict?: boolean;
}

const categorySymbols: Record<string, string> = {
  'OVERKILL': '❌',
  'NATIVE_ALT': '⚠️',
  'HEAVY': '⚠️',
  'CLEAN': '✅',
  'STDLIB': '✅',
  'UNKNOWN': '❓',
};

const categoryColors: Record<string, (text: string) => string> = {
  'OVERKILL': chalk.red,
  'NATIVE_ALT': chalk.yellow,
  'HEAVY': chalk.yellow,
  'CLEAN': chalk.green,
  'STDLIB': chalk.green,
  'UNKNOWN': chalk.gray,
};

export function report(deps: CheckedDependency[], options: ReportOptions): void {
  if (options.json) {
    reportJson(deps, options);
  } else {
    reportTable(deps, options);
  }
}

function reportJson(deps: CheckedDependency[], options: ReportOptions): void {
  let filtered = deps;
  if (options.problemsOnly) {
    filtered = deps.filter(d => ['OVERKILL', 'NATIVE_ALT', 'HEAVY'].includes(d.category));
  }

  const output = filtered.map(d => ({
    package: d.name,
    type: d.type,
    category: d.category,
    minifiedSize: d.minifiedSize,
    verdict: d.verdict,
    alternative: d.alternative,
    saveBytes: d.saveBytes,
  }));

  console.log(JSON.stringify(output, null, 2));
}

function reportTable(deps: CheckedDependency[], options: ReportOptions): void {
  console.log(chalk.bold('\n@ftod/verdict — honest dependency verdicts\n'));

  let filtered = deps;
  if (options.problemsOnly) {
    filtered = deps.filter(d => ['OVERKILL', 'NATIVE_ALT', 'HEAVY'].includes(d.category));
  }

  if (filtered.length === 0) {
    console.log(chalk.green('No problems found! All dependencies are clean.'));
    return;
  }

  // Print table
  const header = padRow('PACKAGE', 'TYPE', 'CATEGORY', 'SIZE', 'VERDICT');
  console.log(chalk.bold(header));
  console.log('─'.repeat(100));

  for (const dep of filtered) {
    const symbol = categorySymbols[dep.category];
    const color = categoryColors[dep.category];
    const category = `${symbol} ${dep.category}`;
    const type = dep.type === 'devDependency' ? 'dev' : dep.type === 'peerDependency' ? 'peer' : 'prod';
    
    console.log(padRow(dep.name, type, color(category), dep.minifiedSize, dep.verdict));
  }

  console.log('─'.repeat(100));

  // Print summary
  const counts: Record<string, number> = {};
  for (const dep of deps) {
    counts[dep.category] = (counts[dep.category] || 0) + 1;
  }

  const summary = [];
  summary.push(`${deps.length} deps scanned`);
  if (counts['OVERKILL']) summary.push(chalk.red(`${counts['OVERKILL']} OVERKILL`));
  if (counts['NATIVE_ALT']) summary.push(chalk.yellow(`${counts['NATIVE_ALT']} NATIVE_ALT`));
  if (counts['HEAVY']) summary.push(chalk.yellow(`${counts['HEAVY']} HEAVY`));
  if (counts['UNKNOWN']) summary.push(chalk.gray(`${counts['UNKNOWN']} UNKNOWN`));
  if (counts['CLEAN']) summary.push(chalk.green(`${counts['CLEAN']} CLEAN`));
  if (counts['STDLIB']) summary.push(chalk.green(`${counts['STDLIB']} STDLIB`));

  console.log(`\n${summary.join(' · ')}\n`);

  // Print savings
  const overkillAndNative = deps.filter(d => ['OVERKILL', 'NATIVE_ALT'].includes(d.category));
  if (overkillAndNative.length > 0) {
    const totalSave = overkillAndNative.reduce((acc, d) => {
      if (d.saveBytes) {
        const match = d.saveBytes.match(/~(\d+)(KB|MB)/);
        if (match) {
          const value = parseInt(match[1]);
          const unit = match[2];
          return acc + (unit === 'MB' ? value * 1024 : value);
        }
      }
      return acc;
    }, 0);

    if (totalSave > 0) {
      const saveStr = totalSave > 1024 ? `~${(totalSave / 1024).toFixed(0)}MB` : `~${totalSave}KB`;
      console.log(chalk.yellow(`You could save ${saveStr} by replacing OVERKILL and NATIVE_ALT packages.\n`));
    }
  }
}

function padRow(...cols: string[]): string {
  return cols.map((col, i) => {
    const width = i === 0 ? 20 : i === 1 ? 15 : i === 2 ? 15 : i === 3 ? 10 : 40;
    return col.padEnd(width);
  }).join(' ');
}

export function shouldExitWithFailure(deps: CheckedDependency[], options: ReportOptions): boolean {
  if (!options.strict) return false;
  return deps.some(d => ['OVERKILL', 'HEAVY'].includes(d.category));
}
