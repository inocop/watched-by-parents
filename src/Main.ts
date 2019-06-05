import * as path   from 'path';
import * as fs     from 'fs';

import MainConst from './MainConst';


/**
 * Main
 *
 * @export
 * @class Main
 */
class Main
{
    public enable(): void
    {
        let cssContent = this.readMainCss();

        if (!this.isCssLatest(cssContent))
        {
            cssContent = this.clearCustomCss(cssContent);
            cssContent += MainConst.ADD_CSS;
            this.writeMainCss(cssContent);
        }
    }

    public disable(): void
    {
        let cssContent = this.clearCustomCss(this.readMainCss());
        this.writeMainCss(cssContent);
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
        let ifUnInstall: boolean = !~cssContent.indexOf(`/*${MainConst.APP_NAME}.ver`);
        if (ifUnInstall) {
            return false;
        }

        let ifVerOld: boolean = !~cssContent.indexOf(`/*${MainConst.APP_NAME}.ver.${MainConst.VERSION}*/`);
        if (ifVerOld) {
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

