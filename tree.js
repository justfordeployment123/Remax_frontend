#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const EXCLUDE_DIRS = new Set([
  'node_modules',
  '.next',
  'build',
  'dist',
  '.git',
  '.vscode',
  '.idea',
  'public',
]);


function printTree(dir, prefix = '') {
  const items = fs.readdirSync(dir, { withFileTypes: true })
    .filter(item => !EXCLUDE_DIRS.has(item.name));

  const lastIndex = items.length - 1;

  items.forEach((item, index) => {
    const isLast = index === lastIndex;
    const connector = isLast ? '└── ' : '├── ';
    const nextPrefix = prefix + (isLast ? '    ' : '│   ');
    const fullPath = path.join(dir, item.name);

    console.log(prefix + connector + item.name);

    if (item.isDirectory()) {
      printTree(fullPath, nextPrefix);
    }
  });
}

const startDir = process.argv[2] || process.cwd();

console.log(`\nDirectory tree for: ${startDir}\n`);
printTree(startDir);
