export interface Verdict {
  package: string;
  category: 'OVERKILL' | 'NATIVE_ALT' | 'HEAVY' | 'CLEAN' | 'STDLIB';
  minifiedSize: string;
  verdict: string;
  alternative?: string;
  saveBytes?: string;
}

export const verdicts: Record<string, Verdict> = {
  // OVERKILL
  'lodash': {
    package: 'lodash',
    category: 'OVERKILL',
    minifiedSize: '~70KB',
    verdict: 'Monolithic utility lib. Most functions are native JS now.',
    alternative: 'lodash-es with tree-shaking, or native JS',
    saveBytes: '~70KB'
  },
  'lodash.get': {
    package: 'lodash.get',
    category: 'OVERKILL',
    minifiedSize: '~2KB',
    verdict: 'Single function for deep property access.',
    alternative: 'Optional chaining (?.)',
    saveBytes: '~2KB'
  },
  'lodash.merge': {
    package: 'lodash.merge',
    category: 'OVERKILL',
    minifiedSize: '~3KB',
    verdict: 'Deep merge utility. Spread works for most cases.',
    alternative: 'Spread operator {...a, ...b}',
    saveBytes: '~3KB'
  },
  'moment': {
    package: 'moment',
    category: 'OVERKILL',
    minifiedSize: '~70KB',
    verdict: 'Mutable date library. Intl API covers formatting.',
    alternative: 'Intl.DateTimeFormat or date-fns',
    saveBytes: '~70KB'
  },
  'underscore': {
    package: 'underscore',
    category: 'OVERKILL',
    minifiedSize: '~20KB',
    verdict: 'Legacy utility lib. Modern JS covers most of it.',
    alternative: 'Native JS array/object methods',
    saveBytes: '~20KB'
  },
  'jquery': {
    package: 'jquery',
    category: 'OVERKILL',
    minifiedSize: '~90KB',
    verdict: 'DOM manipulation lib. Native APIs are sufficient.',
    alternative: 'Native DOM APIs (querySelector, fetch, etc.)',
    saveBytes: '~90KB'
  },
  'request': {
    package: 'request',
    category: 'OVERKILL',
    minifiedSize: '~500KB',
    verdict: 'Deprecated HTTP client. Do not use.',
    alternative: 'fetch or undici',
    saveBytes: '~500KB'
  },
  'axios': {
    package: 'axios',
    category: 'OVERKILL',
    minifiedSize: '~30KB',
    verdict: 'HTTP client. fetch is built-in and sufficient.',
    alternative: 'Native fetch()',
    saveBytes: '~30KB'
  },
  'ramda': {
    package: 'ramda',
    category: 'OVERKILL',
    minifiedSize: '~50KB',
    verdict: 'Functional programming lib. Native array methods work.',
    alternative: 'Native array methods (map, filter, reduce)',
    saveBytes: '~50KB'
  },
  'chalk': {
    package: 'chalk',
    category: 'CLEAN',
    minifiedSize: '~10KB',
    verdict: 'Terminal colors. Small, well-maintained. Keep for CLI tools.',
  },

  // NATIVE ALT
  'rimraf': {
    package: 'rimraf',
    category: 'NATIVE_ALT',
    minifiedSize: '~10KB',
    verdict: 'Recursive delete. Native fs.rmSync covers this.',
    alternative: 'fs.rmSync(path, { recursive: true, force: true })',
    saveBytes: '~10KB'
  },
  'mkdirp': {
    package: 'mkdirp',
    category: 'NATIVE_ALT',
    minifiedSize: '~5KB',
    verdict: 'Recursive mkdir. Native fs.mkdirSync covers this.',
    alternative: 'fs.mkdirSync(path, { recursive: true })',
    saveBytes: '~5KB'
  },
  'uuid': {
    package: 'uuid',
    category: 'NATIVE_ALT',
    minifiedSize: '~2KB',
    verdict: 'UUID generation. Native crypto.randomUUID() available.',
    alternative: 'crypto.randomUUID()',
    saveBytes: '~2KB'
  },
  'nanoid': {
    package: 'nanoid',
    category: 'NATIVE_ALT',
    minifiedSize: '~3KB',
    verdict: 'Short ID generation. crypto.randomUUID() works for most cases.',
    alternative: 'crypto.randomUUID() (if you don\'t need short IDs)',
    saveBytes: '~3KB'
  },
  'deep-equal': {
    package: 'deep-equal',
    category: 'NATIVE_ALT',
    minifiedSize: '~5KB',
    verdict: 'Deep equality check. JSON.stringify works for simple cases.',
    alternative: 'JSON.stringify(a) === JSON.stringify(b)',
    saveBytes: '~5KB'
  },
  'object-assign': {
    package: 'object-assign',
    category: 'NATIVE_ALT',
    minifiedSize: '~1KB',
    verdict: 'Object.assign polyfill. Native since ES6.',
    alternative: 'Object.assign() or spread operator',
    saveBytes: '~1KB'
  },
  'path-exists': {
    package: 'path-exists',
    category: 'NATIVE_ALT',
    minifiedSize: '~1KB',
    verdict: 'Check if path exists. Native fs.existsSync covers this.',
    alternative: 'fs.existsSync()',
    saveBytes: '~1KB'
  },
  'fs-extra': {
    package: 'fs-extra',
    category: 'NATIVE_ALT',
    minifiedSize: '~30KB',
    verdict: 'Extended fs module. Native fs/promises covers most of it.',
    alternative: 'fs/promises',
    saveBytes: '~30KB'
  },
  'glob': {
    package: 'glob',
    category: 'NATIVE_ALT',
    minifiedSize: '~20KB',
    verdict: 'Glob pattern matching. Native fs.globSync() in Node 22+.',
    alternative: 'fs.globSync() (Node 22+) or fast-glob',
    saveBytes: '~20KB'
  },
  'cross-spawn': {
    package: 'cross-spawn',
    category: 'NATIVE_ALT',
    minifiedSize: '~15KB',
    verdict: 'Cross-platform spawn. Native child_process works.',
    alternative: 'child_process.spawn() with shell: true',
    saveBytes: '~15KB'
  },
  'dotenv': {
    package: 'dotenv',
    category: 'NATIVE_ALT',
    minifiedSize: '~10KB',
    verdict: 'Load .env files. Native --env-file flag in Node 20+.',
    alternative: 'node --env-file=.env',
    saveBytes: '~10KB'
  },
  'find-up': {
    package: 'find-up',
    category: 'NATIVE_ALT',
    minifiedSize: '~5KB',
    verdict: 'Find file walking up directories. Simple loop with fs.',
    alternative: 'Manual walk with fs.readdirSync + path.dirname',
    saveBytes: '~5KB'
  },
  'hosted-git-info': {
    package: 'hosted-git-info',
    category: 'NATIVE_ALT',
    minifiedSize: '~15KB',
    verdict: 'Parse git URLs. Native URL constructor works.',
    alternative: 'URL constructor',
    saveBytes: '~15KB'
  },

  // HEAVY
  'sharp': {
    package: 'sharp',
    category: 'HEAVY',
    minifiedSize: '~20MB',
    verdict: 'Image processing. Powerful but has native dependencies.',
  },
  'puppeteer': {
    package: 'puppeteer',
    category: 'HEAVY',
    minifiedSize: '~300MB',
    verdict: 'Browser automation. Downloads full Chromium.',
  },
  'playwright': {
    package: 'playwright',
    category: 'HEAVY',
    minifiedSize: '~300MB',
    verdict: 'Browser automation. Heavy but powerful.',
  },
  'webpack': {
    package: 'webpack',
    category: 'HEAVY',
    minifiedSize: '~5MB',
    verdict: 'Module bundler. Consider Vite/esbuild for new projects.',
  },
  'babel': {
    package: 'babel',
    category: 'HEAVY',
    minifiedSize: '~5MB',
    verdict: 'JS compiler. Consider SWC or esbuild for new projects.',
  },
  'eslint': {
    package: 'eslint',
    category: 'HEAVY',
    minifiedSize: '~3MB',
    verdict: 'Linter. Heavy but standard. Keep for linting.',
  },
  'typescript': {
    package: 'typescript',
    category: 'HEAVY',
    minifiedSize: '~60MB',
    verdict: 'Type system. Heavy but essential.',
  },
  'tailwindcss': {
    package: 'tailwindcss',
    category: 'HEAVY',
    minifiedSize: '~5MB',
    verdict: 'CSS framework. Large but worth it.',
  },

  // CLEAN
  'commander': {
    package: 'commander',
    category: 'CLEAN',
    minifiedSize: '~50KB',
    verdict: 'Lightweight CLI framework. Keep.',
  },
  'zod': {
    package: 'zod',
    category: 'CLEAN',
    minifiedSize: '~50KB',
    verdict: 'Runtime validation. Excellent choice.',
  },
  'esbuild': {
    package: 'esbuild',
    category: 'CLEAN',
    minifiedSize: '~1MB',
    verdict: 'Fast build tool. Great choice.',
  },
  'vitest': {
    package: 'vitest',
    category: 'CLEAN',
    minifiedSize: '~5MB',
    verdict: 'Fast test runner. Excellent choice.',
  },
  'prettier': {
    package: 'prettier',
    category: 'CLEAN',
    minifiedSize: '~5MB',
    verdict: 'Code formatter. Standard tool.',
  },
  'drizzle-orm': {
    package: 'drizzle-orm',
    category: 'CLEAN',
    minifiedSize: '~100KB',
    verdict: 'Lightweight ORM. Good choice.',
  },
  'hono': {
    package: 'hono',
    category: 'CLEAN',
    minifiedSize: '~50KB',
    verdict: 'Minimal web framework. Excellent.',
  },
  'pino': {
    package: 'pino',
    category: 'CLEAN',
    minifiedSize: '~50KB',
    verdict: 'Fast logger. Good choice.',
  },
  'express': {
    package: 'express',
    category: 'CLEAN',
    minifiedSize: '~200KB',
    verdict: 'Web framework. Standard choice.',
  },
  'fastify': {
    package: 'fastify',
    category: 'CLEAN',
    minifiedSize: '~100KB',
    verdict: 'Fast web framework. Good choice.',
  },
  'next': {
    package: 'next',
    category: 'CLEAN',
    minifiedSize: '~10MB',
    verdict: 'React framework. Standard choice.',
  },
  'react': {
    package: 'react',
    category: 'CLEAN',
    minifiedSize: '~50KB',
    verdict: 'UI library. Standard choice.',
  },
  'vue': {
    package: 'vue',
    category: 'CLEAN',
    minifiedSize: '~50KB',
    verdict: 'UI framework. Standard choice.',
  },
  'svelte': {
    package: 'svelte',
    category: 'CLEAN',
    minifiedSize: '~50KB',
    verdict: 'Compiler-based UI framework. Excellent.',
  },
  'prisma': {
    package: 'prisma',
    category: 'CLEAN',
    minifiedSize: '~5MB',
    verdict: 'ORM. Good choice for complex queries.',
  },
  'next-auth': {
    package: 'next-auth',
    category: 'CLEAN',
    minifiedSize: '~100KB',
    verdict: 'Auth for Next.js. Standard choice.',
  },
  'stripe': {
    package: 'stripe',
    category: 'CLEAN',
    minifiedSize: '~200KB',
    verdict: 'Payment processing. Essential for payments.',
  },
  'aws-sdk': {
    package: 'aws-sdk',
    category: 'HEAVY',
    minifiedSize: '~5MB',
    verdict: 'AWS SDK. Large but necessary for AWS.',
  },
  'graphql': {
    package: 'graphql',
    category: 'CLEAN',
    minifiedSize: '~100KB',
    verdict: 'GraphQL runtime. Standard choice.',
  },
  'apollo-server': {
    package: 'apollo-server',
    category: 'CLEAN',
    minifiedSize: '~500KB',
    verdict: 'GraphQL server. Standard choice.',
  },
  'socket.io': {
    package: 'socket.io',
    category: 'CLEAN',
    minifiedSize: '~200KB',
    verdict: 'WebSocket library. Standard choice.',
  },
  'mongoose': {
    package: 'mongoose',
    category: 'CLEAN',
    minifiedSize: '~300KB',
    verdict: 'MongoDB ODM. Standard choice.',
  },
  'sequelize': {
    package: 'sequelize',
    category: 'CLEAN',
    minifiedSize: '~500KB',
    verdict: 'SQL ORM. Standard choice.',
  },
  'typeorm': {
    package: 'typeorm',
    category: 'CLEAN',
    minifiedSize: '~500KB',
    verdict: 'SQL ORM. Standard choice.',
  },
  'knex': {
    package: 'knex',
    category: 'CLEAN',
    minifiedSize: '~300KB',
    verdict: 'SQL query builder. Good choice.',
  },
  'joi': {
    package: 'joi',
    category: 'CLEAN',
    minifiedSize: '~100KB',
    verdict: 'Validation library. Good choice.',
  },
  'yup': {
    package: 'yup',
    category: 'CLEAN',
    minifiedSize: '~50KB',
    verdict: 'Validation library. Good choice.',
  },
  'dayjs': {
    package: 'dayjs',
    category: 'CLEAN',
    minifiedSize: '~10KB',
    verdict: 'Date library. Lightweight alternative to moment.',
  },
  'date-fns': {
    package: 'date-fns',
    category: 'CLEAN',
    minifiedSize: '~50KB',
    verdict: 'Date utility library. Good choice.',
  },
  'lodash-es': {
    package: 'lodash-es',
    category: 'CLEAN',
    minifiedSize: '~70KB',
    verdict: 'ES module lodash. Tree-shakeable. Good choice.',
  },
  'undici': {
    package: 'undici',
    category: 'CLEAN',
    minifiedSize: '~100KB',
    verdict: 'HTTP client. Fast, modern choice.',
  },
  'got': {
    package: 'got',
    category: 'CLEAN',
    minifiedSize: '~100KB',
    verdict: 'HTTP client. Good choice.',
  },
  'node-fetch': {
    package: 'node-fetch',
    category: 'NATIVE_ALT',
    minifiedSize: '~10KB',
    verdict: 'fetch polyfill. Native fetch in Node 18+.',
    alternative: 'Native fetch()',
    saveBytes: '~10KB'
  },
  'inquirer': {
    package: 'inquirer',
    category: 'CLEAN',
    minifiedSize: '~100KB',
    verdict: 'CLI prompts. Standard choice.',
  },
  'ora': {
    package: 'ora',
    category: 'CLEAN',
    minifiedSize: '~20KB',
    verdict: 'CLI spinner. Good choice.',
  },
  'boxen': {
    package: 'boxen',
    category: 'CLEAN',
    minifiedSize: '~10KB',
    verdict: 'CLI boxes. Good choice.',
  },
  'cli-table3': {
    package: 'cli-table3',
    category: 'CLEAN',
    minifiedSize: '~30KB',
    verdict: 'CLI tables. Good choice.',
  },
  'yargs': {
    package: 'yargs',
    category: 'CLEAN',
    minifiedSize: '~100KB',
    verdict: 'CLI argument parser. Good choice.',
  },
  'minimist': {
    package: 'minimist',
    category: 'CLEAN',
    minifiedSize: '~5KB',
    verdict: 'Argument parser. Lightweight choice.',
  },
  'debug': {
    package: 'debug',
    category: 'CLEAN',
    minifiedSize: '~5KB',
    verdict: 'Debug utility. Lightweight choice.',
  },
  'winston': {
    package: 'winston',
    category: 'CLEAN',
    minifiedSize: '~200KB',
    verdict: 'Logger. Standard choice.',
  },
  'morgan': {
    package: 'morgan',
    category: 'CLEAN',
    minifiedSize: '~10KB',
    verdict: 'HTTP logger. Good choice.',
  },
  'cors': {
    package: 'cors',
    category: 'CLEAN',
    minifiedSize: '~10KB',
    verdict: 'CORS middleware. Standard choice.',
  },
  'helmet': {
    package: 'helmet',
    category: 'CLEAN',
    minifiedSize: '~20KB',
    verdict: 'Security middleware. Standard choice.',
  },
  'compression': {
    package: 'compression',
    category: 'CLEAN',
    minifiedSize: '~10KB',
    verdict: 'Compression middleware. Good choice.',
  },
  'body-parser': {
    package: 'body-parser',
    category: 'NATIVE_ALT',
    minifiedSize: '~10KB',
    verdict: 'Body parsing. Express 4.16+ has express.json().',
    alternative: 'express.json() or express.urlencoded()',
    saveBytes: '~10KB'
  },
  'multer': {
    package: 'multer',
    category: 'CLEAN',
    minifiedSize: '~30KB',
    verdict: 'File upload middleware. Standard choice.',
  },
  'jsonwebtoken': {
    package: 'jsonwebtoken',
    category: 'CLEAN',
    minifiedSize: '~30KB',
    verdict: 'JWT library. Standard choice.',
  },
  'bcrypt': {
    package: 'bcrypt',
    category: 'CLEAN',
    minifiedSize: '~50KB',
    verdict: 'Password hashing. Standard choice.',
  },
  'passport': {
    package: 'passport',
    category: 'CLEAN',
    minifiedSize: '~50KB',
    verdict: 'Auth middleware. Standard choice.',
  },
  'nodemailer': {
    package: 'nodemailer',
    category: 'CLEAN',
    minifiedSize: '~100KB',
    verdict: 'Email sending. Standard choice.',
  },
  'bull': {
    package: 'bull',
    category: 'CLEAN',
    minifiedSize: '~100KB',
    verdict: 'Job queue. Good choice.',
  },
  'ioredis': {
    package: 'ioredis',
    category: 'CLEAN',
    minifiedSize: '~200KB',
    verdict: 'Redis client. Good choice.',
  },
  'pg': {
    package: 'pg',
    category: 'CLEAN',
    minifiedSize: '~100KB',
    verdict: 'PostgreSQL client. Standard choice.',
  },
  'mysql2': {
    package: 'mysql2',
    category: 'CLEAN',
    minifiedSize: '~200KB',
    verdict: 'MySQL client. Standard choice.',
  },
  'better-sqlite3': {
    package: 'better-sqlite3',
    category: 'CLEAN',
    minifiedSize: '~500KB',
    verdict: 'SQLite client. Good choice.',
  },
  'lowdb': {
    package: 'lowdb',
    category: 'CLEAN',
    minifiedSize: '~20KB',
    verdict: 'JSON database. Good choice for simple cases.',
  },
  'nedb': {
    package: 'nedb',
    category: 'CLEAN',
    minifiedSize: '~100KB',
    verdict: 'Embedded database. Good choice.',
  },
  'level': {
    package: 'level',
    category: 'CLEAN',
    minifiedSize: '~100KB',
    verdict: 'Key-value store. Good choice.',
  },
};

// Node.js built-in modules
export const nodeBuiltins = new Set([
  'assert', 'buffer', 'child_process', 'cluster', 'console', 'constants',
  'crypto', 'dgram', 'dns', 'domain', 'events', 'fs', 'http', 'http2',
  'https', 'inspector', 'module', 'net', 'os', 'path', 'perf_hooks',
  'process', 'punycode', 'querystring', 'readline', 'repl', 'stream',
  'string_decoder', 'sys', 'timers', 'tls', 'trace_events', 'tty',
  'url', 'util', 'v8', 'vm', 'wasi', 'worker_threads', 'zlib',
  // Node 18+ prefixed versions
  'node:assert', 'node:buffer', 'node:child_process', 'node:cluster',
  'node:console', 'node:constants', 'node:crypto', 'node:dgram',
  'node:dns', 'node:domain', 'node:events', 'node:fs', 'node:http',
  'node:http2', 'node:https', 'node:inspector', 'node:module',
  'node:net', 'node:os', 'node:path', 'node:perf_hooks', 'node:process',
  'node:punycode', 'node:querystring', 'node:readline', 'node:repl',
  'node:stream', 'node:string_decoder', 'node:sys', 'node:timers',
  'node:tls', 'node:trace_events', 'node:tty', 'node:url', 'node:util',
  'node:v8', 'node:vm', 'node:wasi', 'node:worker_threads', 'node:zlib',
]);
