import { ExtractTextFromElement } from "./extract-text-from-element";
import { LaunchBrowser } from "./launch-browser";
import { PageToHtmlTask } from "./page-to-html";

export const TaskRegistry = {
	LAUNCH_BROWSER: LaunchBrowser,
	PAGE_TO_HTML: PageToHtmlTask,
	EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElement
}
