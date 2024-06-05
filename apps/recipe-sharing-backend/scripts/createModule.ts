// scripts/createFiles.ts

import * as fs from "fs";
import * as path from "path";

const args = process.argv.slice(2);
if (args.length < 1) {
  console.error("Please provide a name for the route and controller.");
  process.exit(1);
}
const name = args[0];

const routesDir = path.join(__dirname, "../src/routes");
const controllersDir = path.join(__dirname, "../src/controllers");
const routerFilePath = path.join(routesDir, `${name}.ts`);
const controllerFilePath = path.join(controllersDir, `${name}Controller.ts`);

const routerBoilerplate = `
import { Router } from 'express';

const router = Router();


export default router;
`;

const controllerBoilerplate = `
import { Request, Response } from 'express';

const getExample = (req: Request, res: Response): void => {
    res.send('This is an example controller');
};

export default { getExample };
`;

const createDirIfNotExists = (dir: string): void => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    console.log(`Directory created: ${dir}`);
  } else {
    console.log(`Directory already exists: ${dir}`);
  }
};

const createFileWithContent = (filePath: string, content: string): void => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content.trim());
    console.log(`File created: ${filePath}`);
  } else {
    console.log(`File already exists: ${filePath}`);
  }
};

const main = (): void => {
  createDirIfNotExists(routesDir);
  createDirIfNotExists(controllersDir);

  createFileWithContent(routerFilePath, routerBoilerplate);
  createFileWithContent(controllerFilePath, controllerBoilerplate);
};

main();
