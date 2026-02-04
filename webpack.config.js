import path from "path";
import { fileURLToPath } from "url";
export default {
  // Target environment for the bundle (Node.js)
  target: 'node',
  // Set the mode to development or production
  mode: 'production', 
  entry: './src/server.ts',
  output: {
    filename: 'bundle.cjs',
    path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
         
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
 
