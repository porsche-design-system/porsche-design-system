export async function sleep(waitInMs = 0) {
  await new Promise((resolve) => setTimeout(resolve, waitInMs));
}
