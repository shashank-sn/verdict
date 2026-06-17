#!/bin/bash

# Comprehensive smoke tests for @ftod/verdict

set -e

cd "$(dirname "$0")"

echo "=== Running @ftod/verdict smoke tests ==="
echo ""

# Test 1: Help flag
echo "Test 1: --help flag"
node dist/index.js --help > /dev/null 2>&1 && echo "✓ PASS" || echo "✗ FAIL"
echo ""

# Test 2: Version flag
echo "Test 2: --version flag"
node dist/index.js --version > /dev/null 2>&1 && echo "✓ PASS" || echo "✗ FAIL"
echo ""

# Test 3: Single package - OVERKILL
echo "Test 3: Single package - lodash (OVERKILL)"
OUTPUT=$(node dist/index.js --package lodash)
if echo "$OUTPUT" | grep -q "OVERKILL"; then
  echo "✓ PASS"
else
  echo "✗ FAIL"
  echo "$OUTPUT"
fi
echo ""

# Test 4: Single package - NATIVE_ALT
echo "Test 4: Single package - uuid (NATIVE_ALT)"
OUTPUT=$(node dist/index.js --package uuid)
if echo "$OUTPUT" | grep -q "NATIVE_ALT"; then
  echo "✓ PASS"
else
  echo "✗ FAIL"
  echo "$OUTPUT"
fi
echo ""

# Test 5: Single package - CLEAN
echo "Test 5: Single package - zod (CLEAN)"
OUTPUT=$(node dist/index.js --package zod)
if echo "$OUTPUT" | grep -q "CLEAN"; then
  echo "✓ PASS"
else
  echo "✗ FAIL"
  echo "$OUTPUT"
fi
echo ""

# Test 6: Single package - HEAVY
echo "Test 6: Single package - sharp (HEAVY)"
OUTPUT=$(node dist/index.js --package sharp)
if echo "$OUTPUT" | grep -q "HEAVY"; then
  echo "✓ PASS"
else
  echo "✗ FAIL"
  echo "$OUTPUT"
fi
echo ""

# Test 7: Single package - STDLIB
echo "Test 7: Single package - fs (STDLIB)"
OUTPUT=$(node dist/index.js --package fs)
if echo "$OUTPUT" | grep -q "STDLIB"; then
  echo "✓ PASS"
else
  echo "✗ FAIL"
  echo "$OUTPUT"
fi
echo ""

# Test 8: Single package - UNKNOWN
echo "Test 8: Single package - unknown-pkg (UNKNOWN)"
OUTPUT=$(node dist/index.js --package unknown-pkg)
if echo "$OUTPUT" | grep -q "UNKNOWN"; then
  echo "✓ PASS"
else
  echo "✗ FAIL"
  echo "$OUTPUT"
fi
echo ""

# Test 9: JSON output
echo "Test 9: JSON output"
OUTPUT=$(node dist/index.js --package lodash --json)
if echo "$OUTPUT" | python3 -m json.tool > /dev/null 2>&1; then
  echo "✓ PASS"
else
  echo "✗ FAIL"
  echo "$OUTPUT"
fi
echo ""

# Test 10: JSON output structure
echo "Test 10: JSON output structure"
OUTPUT=$(node dist/index.js --package lodash --json)
if echo "$OUTPUT" | python3 -c "import sys, json; data=json.load(sys.stdin); assert data[0]['package']=='lodash'; assert data[0]['category']=='OVERKILL'" 2>/dev/null; then
  echo "✓ PASS"
else
  echo "✗ FAIL"
fi
echo ""

# Test 11: Problems-only flag
echo "Test 11: --problems-only flag"
OUTPUT=$(node dist/index.js --package zod --problems-only)
if echo "$OUTPUT" | grep -q "No problems found"; then
  echo "✓ PASS"
else
  echo "✗ FAIL"
  echo "$OUTPUT"
fi
echo ""

# Test 12: Problems-only with actual problems
echo "Test 12: --problems-only with actual problems"
OUTPUT=$(node dist/index.js --package lodash --problems-only)
if echo "$OUTPUT" | grep -q "OVERKILL"; then
  echo "✓ PASS"
else
  echo "✗ FAIL"
  echo "$OUTPUT"
fi
echo ""

# Test 13: Strict mode exit code
echo "Test 13: --strict exit code"
set +e
node dist/index.js --package lodash --strict > /dev/null 2>&1
EXIT_CODE=$?
set -e
if [ $EXIT_CODE -eq 1 ]; then
  echo "✓ PASS"
else
  echo "✗ FAIL (exit code: $EXIT_CODE)"
fi
echo ""

# Test 14: Strict mode with clean package
echo "Test 14: --strict with clean package"
set +e
node dist/index.js --package zod --strict > /dev/null 2>&1
EXIT_CODE=$?
set -e
if [ $EXIT_CODE -eq 0 ]; then
  echo "✓ PASS"
else
  echo "✗ FAIL (exit code: $EXIT_CODE)"
fi
echo ""

# Test 15: Scan current directory
echo "Test 15: Scan current directory package.json"
OUTPUT=$(node dist/index.js)
if echo "$OUTPUT" | grep -q "deps scanned"; then
  echo "✓ PASS"
else
  echo "✗ FAIL"
  echo "$OUTPUT"
fi
echo ""

# Test 16: Scan specific path
echo "Test 16: Scan specific path"
OUTPUT=$(node dist/index.js --path .)
if echo "$OUTPUT" | grep -q "deps scanned"; then
  echo "✓ PASS"
else
  echo "✗ FAIL"
  echo "$OUTPUT"
fi
echo ""

# Test 17: Missing package.json
echo "Test 17: Missing package.json"
set +e
OUTPUT=$(node dist/index.js --path /var/empty 2>&1)
EXIT_CODE=$?
set -e
if [ $EXIT_CODE -eq 1 ]; then
  echo "✓ PASS"
else
  echo "✗ FAIL (exit code: $EXIT_CODE)"
fi
echo ""

# Test 18: Node built-in with prefix
echo "Test 18: Node built-in with prefix (node:fs)"
OUTPUT=$(node dist/index.js --package node:fs)
if echo "$OUTPUT" | grep -q "STDLIB"; then
  echo "✓ PASS"
else
  echo "✗ FAIL"
  echo "$OUTPUT"
fi
echo ""

# Test 19: Multiple categories in one scan
echo "Test 19: Multiple categories in one scan"
OUTPUT=$(node dist/index.js)
if echo "$OUTPUT" | grep -q "deps scanned"; then
  echo "✓ PASS"
else
  echo "✗ FAIL"
  echo "$OUTPUT"
fi
echo ""

# Test 20: Output format consistency
echo "Test 20: Output format consistency"
OUTPUT=$(node dist/index.js --package lodash)
if echo "$OUTPUT" | grep -q "PACKAGE" && echo "$OUTPUT" | grep -q "VERDICT"; then
  echo "✓ PASS"
else
  echo "✗ FAIL"
fi
echo ""

# Test 21: Summary line
echo "Test 21: Summary line"
OUTPUT=$(node dist/index.js --package lodash)
if echo "$OUTPUT" | grep -q "deps scanned"; then
  echo "✓ PASS"
else
  echo "✗ FAIL"
fi
echo ""

# Test 22: Savings line
echo "Test 22: Savings line"
OUTPUT=$(node dist/index.js --package lodash)
if echo "$OUTPUT" | grep -q "You could save"; then
  echo "✓ PASS"
else
  echo "✗ FAIL"
fi
echo ""

# Test 23: No savings for clean packages
echo "Test 23: No savings for clean packages"
OUTPUT=$(node dist/index.js --package zod)
if echo "$OUTPUT" | grep -q "You could save"; then
  echo "✗ FAIL"
else
  echo "✓ PASS"
fi
echo ""

# Test 24: Alternative shown for OVERKILL
echo "Test 24: Alternative shown for OVERKILL"
OUTPUT=$(node dist/index.js --package lodash --json)
if echo "$OUTPUT" | python3 -c "import sys, json; data=json.load(sys.stdin); assert 'alternative' in data[0]" 2>/dev/null; then
  echo "✓ PASS"
else
  echo "✗ FAIL"
fi
echo ""

# Test 25: SaveBytes shown for OVERKILL
echo "Test 25: SaveBytes shown for OVERKILL"
OUTPUT=$(node dist/index.js --package lodash --json)
if echo "$OUTPUT" | python3 -c "import sys, json; data=json.load(sys.stdin); assert 'saveBytes' in data[0]" 2>/dev/null; then
  echo "✓ PASS"
else
  echo "✗ FAIL"
fi
echo ""

echo "=== Smoke tests complete ==="
