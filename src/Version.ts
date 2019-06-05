import * as path from 'path';

const version = () => {
  const packageJson = require(path.join(__dirname, '../package.json'));
  return packageJson.version;
}

export default version();
