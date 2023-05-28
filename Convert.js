const fs = require('fs');
const path = require('path');

var typesGenerated = 0;

function convertJsonToTypes(folderPath, outputFolderPath) {
  const files = fs.readdirSync(folderPath);

  // Create the output folder if it doesn't exist
  if (!fs.existsSync(outputFolderPath)) {
    fs.mkdirSync(outputFolderPath);
  }

  files.forEach((file) => {
    if (file.endsWith('.dbg.json')) {
      return;
    }

    const filePath = path.join(folderPath, file);
    const outputFileName = file.replace('.json', '.ts');
    const outputPath = path.join(outputFolderPath, outputFileName);

    // Check if the file is a directory
    if (fs.lstatSync(filePath).isDirectory()) {
      // Recursively process the subfolder
      convertJsonToTypes(filePath, outputPath);
    } else {
      // Read the JSON file
      const jsonContent = fs.readFileSync(filePath, 'utf8');

      try {
        // Parse the JSON content
        const jsonData = JSON.parse(jsonContent);

        if (jsonData.abi !== undefined) {
          // Generate the TypeScript types from the ABI object
          const abiTypes = `export const ${
            file.split('.')[0]
          } = ${JSON.stringify(jsonData.abi)} as const;`;

          // Write the types to the output file
          fs.writeFileSync(outputPath, abiTypes, { flag: 'w' });
          typesGenerated++;
        } else {
          console.log(`No ABI object found in ${file}`);
        }
      } catch (error) {
        console.error(`Error parsing JSON file ${file}:`, error);
      }
    }
  });
}

// Usage example:

const inputRoot = 'contracts/artifacts';
const outputRoot = 'abiTypes';
convertJsonToTypes(inputRoot, outputRoot);
console.log(`${typesGenerated} types generated`);
