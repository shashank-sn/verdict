import { Command } from 'commander';
import chalk from 'chalk';
import { scanPackageJson, createSinglePackage } from './scanner';
import { checkDependencies } from './check';
import { report, shouldExitWithFailure } from './reporter';

const program = new Command();

program
  .name('verdict')
  .description('Honest dependency linting. Reads your package.json and tells you the truth about every dependency.')
  .version('0.1.0')
  .option('--path <path>', 'Path to project root containing package.json', '.')
  .option('--package <name>', 'Audit a single package by name (skip scanning)')
  .option('--json', 'Output JSON instead of table')
  .option('--problems-only', 'Hide CLEAN/STDLIB packages, show only issues')
  .option('--strict', 'Exit code 1 if any OVERKILL or HEAVY packages found')
  .action(async (options) => {
    try {
      let deps;

      if (options.package) {
        // Single package audit
        deps = createSinglePackage(options.package);
      } else {
        // Scan package.json
        const projectPath = options.path;
        deps = scanPackageJson(projectPath);
      }

      // Check against verdicts
      const checked = checkDependencies(deps);

      // Report
      report(checked, {
        json: options.json,
        problemsOnly: options.problemsOnly,
        strict: options.strict,
      });

      // Exit code
      if (shouldExitWithFailure(checked, { strict: options.strict })) {
        process.exit(1);
      }
    } catch (error: any) {
      if (!options.json) {
        console.error(chalk.red(`\nError: ${error.message}`));
      } else {
        console.error(JSON.stringify({ error: error.message }));
      }
      process.exit(1);
    }
  });

program.parse();
