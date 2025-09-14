"use client"

import { Workflow } from "@/lib/generated/prisma"
import { ReactFlowProvider } from "@xyflow/react"
import FlowEditor from "./flow-editor"
import Topbar from "./topbar/topbar"
import TaskMenu from "./task-menu"

function Editor({
	workflow
} : {
	workflow: Workflow
}) {
	return (
		<ReactFlowProvider>
			<div className="flex flex-col h-full w-full overflow-hidden">
				<Topbar title={workflow.name} workflowId={workflow.id} />
				<section className="flex h-full overflow-auto">
					<TaskMenu />
					<FlowEditor workflow={workflow} />
				</section>
			</div>
		</ReactFlowProvider>
	)
}

export default Editor
