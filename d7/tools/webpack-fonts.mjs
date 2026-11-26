// Redirige @remotion/google-fonts/* a fuentes locales (src/dl/gfonts). Lo usan remotion.config.ts y las herramientas.
import fs from 'node:fs';
import path from 'node:path';
import webpack from 'webpack';

export const withLocalFonts = (c, root = process.cwd()) => ({
  ...c,
  plugins: [
    ...(c.plugins ?? []),
    new webpack.NormalModuleReplacementPlugin(/^@remotion\/google-fonts\/.+$/, (r) => {
      const name = r.request.split('/').pop();
      const file = path.resolve(root, 'src/dl/gfonts', name + '.ts');
      r.request = fs.existsSync(file) ? file : path.resolve(root, 'src/dl/gfonts/_default.ts');
    }),
  ],
});
