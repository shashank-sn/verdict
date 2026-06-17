import { Dependency } from './scanner';
import { verdicts, nodeBuiltins, Verdict } from './verdicts';

export interface CheckedDependency extends Dependency {
  category: Verdict['category'];
  minifiedSize: string;
  verdict: string;
  alternative?: string;
  saveBytes?: string;
}

const categoryOrder: Record<Verdict['category'], number> = {
  'OVERKILL': 0,
  'NATIVE_ALT': 1,
  'HEAVY': 2,
  'UNKNOWN': 3,
  'CLEAN': 4,
  'STDLIB': 5,
};

export function checkDependencies(deps: Dependency[]): CheckedDependency[] {
  const checked: CheckedDependency[] = [];

  for (const dep of deps) {
    const name = dep.name;

    // Check if it's a Node.js built-in
    if (nodeBuiltins.has(name)) {
      checked.push({
        ...dep,
        category: 'STDLIB',
        minifiedSize: '0KB',
        verdict: 'Built-in module. No dependency needed.',
      });
      continue;
    }

    // Check verdict database
    const verdict = verdicts[name];
    if (verdict) {
      checked.push({
        ...dep,
        category: verdict.category,
        minifiedSize: verdict.minifiedSize,
        verdict: verdict.verdict,
        alternative: verdict.alternative,
        saveBytes: verdict.saveBytes,
      });
      continue;
    }

    // Unknown package
    checked.push({
      ...dep,
      category: 'UNKNOWN',
      minifiedSize: '—',
      verdict: 'Not in verdict database. No judgment (v1 limitation).',
    });
  }

  // Sort by category
  return checked.sort((a, b) => categoryOrder[a.category] - categoryOrder[b.category]);
}
