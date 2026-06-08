import esbuild from "esbuild";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Plugin to redirect directory imports to their actual .min.js files
const vendorPlugin = {
  name: "vendor-resolve",
  setup(build) {
    // Intercept any import that resolves to one of our vendored directories
    const vendors = {
      "zip.js":  "zip.js/zip.min.js",
      "dragula": "dragula/dragula.min.js",
      "viewerjs": "viewerjs/viewer.min.js",
    };

    build.onResolve({ filter: /\/(zip\.js|dragula)$|^(viewerjs)$/ }, args => {
      const dirName = args.path.split("/").pop();
      const vendorFile = vendors[dirName];
      if (vendorFile) {
        return { path: path.resolve(__dirname, vendorFile) };
      }
    });
  },
};

// const zipjsPatch = {
//   name: "zipjs-patch",
//   setup(build) {
//     build.onLoad({ filter: /\/zip\.min\.js$/ }, async args => {
//       const fs = await import("fs");
//       const libSource = fs.readFileSync(args.path, "utf8");
//       const patchSource = fs.readFileSync("./zip.js/mime-types.js", "utf8");
//       return {
//         contents: libSource + "\n" + patchSource + "\n// patched source",
//         loader: "js",
//       };
//     })
//   }
// }

await esbuild.build({
  entryPoints: ["app/app.ts"],
  bundle: true,
  outfile: "dist/bundle.js",
  format: "iife",
  sourcemap: true,
  target: ["es2022"],
  plugins: [vendorPlugin],
});

console.log("Build complete.");