import fs from 'fs/promises';
import { marked } from 'marked';

export default class TemplateService {
    private constructor() { }

    public static async buildHtml(filePath: string): Promise<string> {
        const pageContent = await this.getPageContent(filePath);
        const htmlString = this.convertMdToHtml(pageContent);
        return htmlString;
    }

    private static async getPageContent(filePath: string) {
        return await fs.readFile(`src/public/content/${filePath}/index.md`, 'utf8');
    }

    private static convertMdToHtml(line: string) {
        return marked(line);
    }
}
