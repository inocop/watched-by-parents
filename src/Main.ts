import * as path   from 'path';
import * as fs     from 'fs';
import * as vscode from 'vscode';

import MainConst from './MainConst';


/**
 * Main
 *
 * @export
 * @class Main
 */
class Main
{
    private myConfig = vscode.workspace.getConfiguration('LanguageFatherPhotograph');

    public enable(): boolean
    {
        let cssContent = this.readMainCss();

        if (!this.isCssLatest(cssContent))
        {
            cssContent = this.clearCustomCss(cssContent);
            cssContent += MainConst.CUSTOM_CSS;
            this.writeMainCss(cssContent);
            return true;
        }

        this.myConfig.update('enabled', true, vscode.ConfigurationTarget.Global);
        return false;
    }

    public disable(): boolean
    {
        let cssContent = this.readMainCss();

        let clearedCss = this.clearCustomCss(cssContent);
        if (clearedCss != cssContent)
        {
            this.writeMainCss(clearedCss);
            return true;
        }

        this.myConfig.update('enabled', false, vscode.ConfigurationTarget.Global);
        return false;
    }


    private clearCustomCss(cssContent: string): string
    {
        const reqexp = new RegExp(`\\/\\*${MainConst.APP_NAME}-start\\*\\/[\\s\\S]*?\\/\\*${MainConst.APP_NAME}-end\\*\\/`, "g");
        let clearedCss = cssContent.replace(reqexp, '');
        clearedCss     = clearedCss.replace(/\s*$/, '');
        return clearedCss
    }

    /**
     * Checked CSS status
     */
    private isCssLatest(cssContent: string): boolean
    {
        let isFirst: boolean = !~cssContent.indexOf(`/*${MainConst.APP_NAME}.ver`);
        if (isFirst) {
            return false;
        }

        let isOldVer: boolean = !~cssContent.indexOf(`/*${MainConst.APP_NAME}.ver.${MainConst.VERSION}*/`);
        if (isOldVer) {
            return false;
        }

        return true
    }

    /**
     * Read workbench.main.css
     */
    private readMainCss(): string
    {
        const cssPath = this.getMainCssPath();
        return fs.readFileSync(cssPath, 'utf-8');
    }

    /**
     * Write workbench.main.css
     */
    private writeMainCss(cssContent: string): void
    {
        const cssPath = this.getMainCssPath();
        fs.writeFileSync(cssPath, cssContent, 'utf-8');
    }

    /**
     * Get workbench.main.css path
     */
    private getMainCssPath(): string
    {
        if (!require.main)
        {
            throw new Error('BasePath not found');
        }

        const basePath = path.dirname(require.main.filename);
        return path.join(basePath, 'vs', 'workbench', 'workbench.main.css');
    }
}

export default new Main();

