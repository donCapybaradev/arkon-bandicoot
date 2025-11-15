import chalk from "chalk";

const remotes = {
  CONTEXT_MANAGER: "http://localhost:3001/mf-manifest.js",
};

async function checkRemote(url: string) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

export async function printMFStatus() {
  console.log("\n🔎 Checking Microfrontends...\n");

  for (const [name, url] of Object.entries(remotes)) {
    const ok = await checkRemote(url);

    const icon = ok
      ? chalk.green("✔ Online")
      : chalk.red("✖ Offline");

    console.log(`  ${chalk.cyan(name)}  →  ${icon}  (${url})`);
  }

  console.log("");
}

await printMFStatus();
