import { TaskType } from "@/types/task";
import { ExtractTextFromElement } from "./extract-text-from-element";
import { LaunchBrowser } from "./launch-browser";
import { PageToHtmlTask } from "./page-to-html";
import { WorkflowTask } from "@/types/workflow";

type Registry = {
	[K in TaskType]: WorkflowTask & { type: K}
}

export const TaskRegistry: Registry = {
	LAUNCH_BROWSER: LaunchBrowser,
	PAGE_TO_HTML: PageToHtmlTask,
	EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElement
}
