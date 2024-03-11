export const sleep = (waitInMs = 0): Promise<void> => new Promise((resolve) => setTimeout(resolve, waitInMs));
