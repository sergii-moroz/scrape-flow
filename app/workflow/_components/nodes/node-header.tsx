"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreateFlowNode } from "@/lib/workflow/create-flow-node"
import { TaskRegistry } from "@/lib/workflow/task/registry"
import { AppNode } from "@/types/app-node"
import { TaskType } from "@/types/task"
import { useReactFlow } from "@xyflow/react"
import { CoinsIcon, CopyIcon, GripVerticalIcon, TrashIcon } from "lucide-react"

function NodeHeader({ taskType, nodeId }: { taskType: TaskType, nodeId:string }) {
	const task = TaskRegistry[taskType]
	const { deleteElements, getNode, addNodes } = useReactFlow()

	return (
		<header className="flex items-center gap-2 p-2 border-b-2">
			<task.icon size={16} />
			<div className="flex justify-between items-center gap-1 w-full">
				<p className="text-xs font-bold uppercase text-muted-foreground">
					{task.label}
				</p>
				<div className="flex gap-1 items-center">
					{task.isEntryPoint && <Badge>Entry point</Badge>}
					<Badge className="gap-2 flex items-center">
						<CoinsIcon size={16} />
						{task.credits}
					</Badge>
					{!task.isEntryPoint && (
						<>
							<Button variant="ghost" size="icon" onClick={() => deleteElements({
								nodes: [{id: nodeId}]
							})}>
								<TrashIcon />
							</Button>
							<Button variant="ghost" size="icon" onClick={() => {
								const node = getNode(nodeId) as AppNode
								if (!node) return

								const x = node.position.x
								const y = node.position.y + 20
								const copiedNode = CreateFlowNode(node.data.type, { x, y })
								addNodes([copiedNode])
							}}>
								<CopyIcon />
							</Button>
						</>
					)}
					<Button
						variant={"ghost"}
						size={"icon"}
						className="drag-handle cursor-grab"
					>
						<GripVerticalIcon size={20} />
					</Button>
				</div>
			</div>
		</header>
	)
}

export default NodeHeader
