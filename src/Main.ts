import * as path   from 'path';
import * as fs     from 'fs';

import MainConst from './MainConst';
import { CssStatusEnum } from './CssStatusEnum';


/**
 * Main
 *
 * @export
 * @class Main
 */
class Main
{
    public enable(isCommand: boolean = true): boolean
    {
        let cssContent = this.readMainCss();
        let cssStatus  = this.isCssLatest(cssContent);

        if (!isCommand && cssStatus == CssStatusEnum.None) return false;

        if (cssStatus != CssStatusEnum.Latest)
        {
            cssContent = this.clearCustomCss(cssContent);
            cssContent += MainConst.CUSTOM_CSS;
            this.writeMainCss(cssContent);
            return true;
        }

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
    private isCssLatest(cssContent: string): CssStatusEnum
    {
        let isNone: boolean = !~cssContent.indexOf(`/*${MainConst.APP_NAME}.ver`);
        if (isNone) {
            return CssStatusEnum.None;
        }

        let isOld: boolean = !~cssContent.indexOf(`/*${MainConst.APP_NAME}.ver.${MainConst.VERSION}*/`);
        if (isOld) {
            return CssStatusEnum.Old;
        }

        return CssStatusEnum.Latest
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

