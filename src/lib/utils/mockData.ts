import type { File, Directory } from './types';

// Generate random integer within a range
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate random file
function generateRandomFile(): File {
  const types = ['text', 'image', 'pdf', 'doc']; // Example file types
  const name = `file${getRandomInt(1, 100)}.txt`; // Example file name
  const type = types[getRandomInt(0, types.length - 1)];
  const size = getRandomInt(1024, 10240); // Example file size in bytes
  const lastModified = new Date(); // Current date and time
  return { name, type, size, lastModified };
}

// Generate random directory with files and subdirectories recursively
function generateRandomDirectory(depth: number, maxDepth: number): Directory {
  const name = `dir${depth}`;
  const files: File[] = [];
  const subdirectories: Directory[] = [];

  // Generate random number of files for this directory
  const numFiles = getRandomInt(1, 10);
  for (let i = 0; i < numFiles; i++) {
    files.push(generateRandomFile());
  }

  // If we haven't reached the maximum depth, generate subdirectories
  if (depth < maxDepth) {
    const numSubdirectories = getRandomInt(1, 5);
    for (let i = 0; i < numSubdirectories; i++) {
      subdirectories.push(generateRandomDirectory(depth + 1, maxDepth));
    }
  }

  return { name, files, subdirectories };
}

// Generate the root directory with files and subdirectories
export function generateMockData(): Directory {
  return generateRandomDirectory(0, 5); // Adjust the maximum depth as needed
}
