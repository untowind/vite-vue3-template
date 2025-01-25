import fs from "fs";
import moment from "moment";
import path from "path";
import { fileURLToPath } from "url";
var _filename = fileURLToPath(import.meta.url);
var _dirname = path.dirname(_filename);
var packageJsonPath = path.join(_dirname, "package.json");

try {
  var packageJsonContent = fs.readFileSync(packageJsonPath);
  var packageJson = JSON.parse(packageJsonContent);
  // 以日期为版本号
  var buildVersion = moment().format("yyyy.MMDD.HHmmss");
  packageJson.version = buildVersion;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log("built version: ".concat(buildVersion));
} catch (error) {
  console.error("built version failed", error);
}
