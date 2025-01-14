import * as fs from "fs";
import * as path from "path";
import { colorMapping } from "./color-mapping";

const directoryPath = path.join(__dirname, "../themes/icons/");

fs.readdir(directoryPath, (err, files) => {
  if (err) return console.error("Unable to scan directory: " + err);

  files.forEach((file, index) => {
    if (path.extname(file) === ".svg") {
      const filePath = path.join(directoryPath, file);

      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          return console.log("Unable to read file: " + err);
        }

        let result = data;
        for (const [oldColor, newColor] of Object.entries(colorMapping)) {
          result = result.replace(new RegExp(oldColor, "g"), newColor);
        }
        fs.writeFile(filePath, result, "utf8", (err) => {
          if (err) return console.log("Unable to write file: " + err);
          console.log(`Replaced color in ${file} number ${index + 1}`);
        });
      });
    }
  });
});
