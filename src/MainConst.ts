import * as path from 'path';
const packageJson  = require(path.join(__dirname, '..', 'package.json'));

const resourcePath = path.join(__dirname, '..', 'resources')
const resourceJson = require(path.join(resourcePath, 'resource.json'));

export default class MainConst
{
  static get VERSION(): string
  {
    return packageJson.version;
  }

  static get APP_NAME(): string
  {
    return packageJson.name;
  }

  static get CUSTOM_CSS(): string
  {
    let customCss = "";

    const languages = resourceJson.languages
    Object.keys(languages).forEach((key) => {
      customCss += `
.editor-container .editor-instance[data-mode-id=${key}] .overflow-guard::after
{
  content: "${languages[key].credit}";
  white-space: pre;
  font-size: 12.5px;
  pointer-events: none;
  position: absolute;
  bottom: 0px;
  right: 0px;
  z-index: 99999;
  width: ${languages[key].width};
  height: ${languages[key].height};
  opacity: 0.3;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  border-radius: 50%;
  margin-right: 15px;
  background-image: url("${path.join(resourcePath, languages[key].filename).replace(/\\/g, '/')}");
  background-position: bottom right;
  background-repeat: no-repeat;
}
`
    });


    return `

/*${MainConst.APP_NAME}-start*/
/*${MainConst.APP_NAME}.ver.${MainConst.VERSION}*/
${customCss}
/*${MainConst.APP_NAME}-end*/
`
  }
}


