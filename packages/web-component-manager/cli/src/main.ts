import { build, buildCommand } from './commands/build';
import { help, helpCommand } from './commands/help';
import { getPwcmCliVersion } from './services/config';

export type CommandMap = {
  [commandName: string]: (commandParameters: string[]) => Promise<void>;
};

const commandMap: CommandMap = {
  [buildCommand]: build,
  [helpCommand]: help,
};

export const runCommand = async (params: string[]) => {
  const applicationVersion = await getPwcmCliVersion();
  const [command, ...commandParams] = params;

  console.log(`\nPorsche Web Components Manager (v${applicationVersion})`);
  if (commandMap[command]) {
    return await commandMap[command](commandParams);
  }

  return await commandMap[helpCommand](commandParams);
};
