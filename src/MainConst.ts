import * as path from 'path';
const packageJson = require(path.join(__dirname, '..', 'package.json'));

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

  static get ADD_CSS(): string
  {
    return `

/*${MainConst.APP_NAME}-start*/
/*${MainConst.APP_NAME}.ver.${MainConst.VERSION}*/

.editor-container .editor-instance[data-mode-id=ruby] .overflow-guard > .monaco-scrollable-element::after
{
  content: "\\"Yukihiro Matsumoto\\" by Cep21 is licensed under public domain \\A https://commons.wikimedia.org/wiki/File:Yukihiro_Matsumoto.JPG";
  white-space: pre;
  font-size: 12.5px;
  pointer-events: none;
  position: absolute;
  bottom: 0px;
  right: 0px;
  z-index: 99999;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding-right: 15px;
  background-image: url("https://upload.wikimedia.org/wikipedia/commons/7/76/Yukihiro_Matsumoto.JPG");
  background-position: bottom right 15px;
  background-repeat: no-repeat;
  background-size: 350px auto;
}

/*${MainConst.APP_NAME}-end*/
`
  }
}

