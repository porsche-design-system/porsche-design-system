#!/usr/bin/env node

import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import type { Story } from '@/models/story';
import { createFrameworkMarkup } from '@/utils/generator/createFrameworkMarkup';
import type { HTMLTagOrComponent } from '@/utils/generator/generator';

const sourceDir = path.join(__dirname, '..', 'packages/storefront/src/app/components');
const outputDir = path.join(__dirname, '..', 'context-snapshots');
console.log(`Preparing context snapshots in: ${sourceDir}`);

async function findPageMdxFiles(dir: string): Promise<string[]> {
  const mdxFiles: string[] = [];
  const files = await fs.readdir(dir, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      const nestedFiles = await findPageMdxFiles(filePath);
      mdxFiles.push(...nestedFiles);
    } else if (file.name === 'page.mdx') {
      mdxFiles.push(filePath);
    }
  }

  return mdxFiles;
}

async function loadStoryFile(componentName: string): Promise<{
  story: Story<HTMLTagOrComponent> | null;
  storyExports: string[];
  storyExportsMap: Map<string, Story<HTMLTagOrComponent>>;
}> {
  const storyFilePath = path.join(sourceDir, componentName, `${componentName}.stories.ts`);

  try {
    await fs.access(storyFilePath);
    // Read the story file to extract export names
    const storyContent = await fs.readFile(storyFilePath, 'utf-8');
    const exportMatches = storyContent.matchAll(/export const (\w+Story(?:Stories)?)/g);
    const storyExports = Array.from(exportMatches, (m) => m[1]);

    // Dynamically import the story (this requires the code to be built)
    try {
      const storyModule = await import(storyFilePath);
      // Try to find the main story (usually named {component}Story)
      const mainStoryName = `${componentName.replace(/-/g, '')}Story`;
      const story = storyModule[mainStoryName] || storyModule[storyExports[0]] || null;

      // Create a map of all story exports
      const storyExportsMap = new Map<string, Story<HTMLTagOrComponent>>();
      for (const exportName of storyExports) {
        if (storyModule[exportName]) {
          storyExportsMap.set(exportName, storyModule[exportName]);
        }
      }

      return { story, storyExports, storyExportsMap };
    } catch {
      console.warn(`Could not dynamically import story for ${componentName}, will include story file content instead`);
      return { story: null, storyExports, storyExportsMap: new Map() };
    }
  } catch {
    return { story: null, storyExports: [], storyExportsMap: new Map() };
  }
}

async function processAndInlineMdxContent(
  content: string,
  _componentName: string,
  storyExportsMap: Map<string, Story<HTMLTagOrComponent>>
): Promise<string> {
  // Find all story imports and replace with generated code
  let processedContent = content;

  // Pattern to match story imports like: import { accordionStory, accordionSlotStories } from "@/app/components/accordion/accordion.stories";
  const importPattern = /import\s+{([^}]+)}\s+from\s+["']@\/app\/components\/[^/]+\/[^.]+\.stories["'];?/g;
  const importMatches = Array.from(content.matchAll(importPattern));

  for (const match of importMatches) {
    const importedNames = match[1]
      .split(',')
      .map((name) => name.trim())
      .filter((name) => name.endsWith('Story') || name.endsWith('Stories'));

    // Generate code for each imported story
    let replacementText = '';

    for (const storyName of importedNames) {
      const story = storyExportsMap.get(storyName);
      if (story?.generator) {
        try {
          const generatedConfig = story.generator(story.state);
          const frameworkMarkup = createFrameworkMarkup(generatedConfig, story.state, 'light');

          replacementText += `\n**Code Example: ${storyName}**\n\n`;
          replacementText += `Vanilla JS:\n\`\`\`html\n${frameworkMarkup['vanilla-js']}\n\`\`\`\n\n`;
          replacementText += `React:\n\`\`\`jsx\n${frameworkMarkup.react}\n\`\`\`\n\n`;
          replacementText += `Angular:\n\`\`\`typescript\n${frameworkMarkup.angular}\n\`\`\`\n\n`;
          replacementText += `Vue:\n\`\`\`vue\n${frameworkMarkup.vue}\n\`\`\`\n\n`;
        } catch (error) {
          console.warn(`Could not generate code for ${storyName}:`, error);
        }
      }
    }

    // Replace the import statement with generated code
    processedContent = processedContent.replace(match[0], replacementText);
  }

  // Also remove other component imports that aren't needed for context
  processedContent = processedContent.replace(/import\s+{[^}]*}\s+from\s+["']@\/components\/[^"']+["'];?\n?/g, '');

  // Replace Configurator JSX elements with descriptive comments
  processedContent = processedContent.replace(
    /<Configurator\s+[^>]*\/>/g,
    '<!-- Interactive Configurator component (code examples shown above) -->'
  );

  // Replace ComponentStory JSX elements with descriptive comments
  processedContent = processedContent.replace(
    /<ComponentStory\s+[^>]*\/>/g,
    '<!-- Component Story example (code examples shown above) -->'
  );

  // Replace ComponentExample JSX elements with descriptive comments
  processedContent = processedContent.replace(
    /<ComponentExample\s+[^>]*\/>/g,
    '<!-- Component Example (interactive demo) -->'
  );

  // Replace ComponentApi JSX elements with comment
  processedContent = processedContent.replace(/<ComponentApi\s+[^>]*\/>/g, '<!-- Component API documentation -->');

  // Replace ComponentStatus JSX elements with descriptive text
  processedContent = processedContent.replace(
    /<ComponentStatus\s+tagName="([^"]+)"[^>]*><\/ComponentStatus>/g,
    '(Component: $1)'
  );

  // Replace TableOfContents JSX elements
  processedContent = processedContent.replace(/<TableOfContents\s+[^>]*\/>/g, '<!-- Table of Contents -->');

  return processedContent;
}

async function prepareContextSnapshots(): Promise<void> {
  try {
    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Get all component folders
    const componentFolders = await fs.readdir(sourceDir, { withFileTypes: true });

    for (const folder of componentFolders) {
      if (!folder.isDirectory() || folder.name === '[component]') continue;

      const componentName = folder.name;
      const componentPath = path.join(sourceDir, componentName);

      const mdxFiles = await findPageMdxFiles(componentPath);

      if (mdxFiles.length === 0) {
        console.log(`No page.mdx files found in: ${componentName}`);
        continue;
      }

      const { storyExportsMap } = await loadStoryFile(componentName);

      let consolidatedContent = `# ${componentName}\n\n`;

      for (const mdxFile of mdxFiles) {
        const relativePath = path.relative(componentPath, mdxFile);
        const content = await fs.readFile(mdxFile, 'utf-8');

        const processedContent = await processAndInlineMdxContent(content, componentName, storyExportsMap);

        consolidatedContent += `## ${relativePath}\n\n${processedContent}\n\n---\n\n`;
      }

      const outputFile = path.join(outputDir, `${componentName}.mdx`);
      await fs.writeFile(outputFile, consolidatedContent, 'utf-8');
      console.log(`Created: ${outputFile}`);
    }

    console.log('Context snapshots prepared successfully!');
  } catch (error) {
    console.error('Error preparing context snapshots:', error);
    process.exit(1);
  }
}

prepareContextSnapshots();
