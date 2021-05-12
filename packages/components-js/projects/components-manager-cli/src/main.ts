import { build, buildCommand } from './commands/build';
import { help, helpCommand } from './commands/help';

export type CommandMap = {
  [commandName: string]: (commandParameters: string[]) => Promise<void>;
};

const commandMap: CommandMap = {
  [buildCommand]: build,
  [helpCommand]: help,
};

export const runCommand = async (params: string[]) => {
  const [command, ...commandParams] = params;

  if (commandMap[command]) {
    return await commandMap[command](commandParams);
  }

  return await commandMap[helpCommand](commandParams);
};
