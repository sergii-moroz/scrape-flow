"use client"

import { Workflow } from "@/lib/generated/prisma"
import { CreateFlowNode } from "@/lib/workflow/create-flow-node"
import { TaskType } from "@/types/task"
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import NodeComponent from "./nodes/node-component"

const nodeTypes = {
	FlowScrapeNode: NodeComponent
}

// const snapGrid: [number, number] = [12, 12]
// const fitViewOptions = { padding: 0.5}

function FlowEditor({
	workflow
} : {
	workflow: Workflow
}) {
	const [nodes, setNodes, onNodesChange] = useNodesState([
		CreateFlowNode(TaskType.LAUNCH_BROWSER),
	])
	const [edges, setEdges, onEdgesChange] = useEdgesState([])

	return (
		<main className="h-full w-full">
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				nodeTypes={nodeTypes}
				// snapGrid={snapGrid}
				snapToGrid
				// fitViewOptions={fitViewOptions}
				fitView
			>
				<Controls position="top-left" />
				<Background variant={BackgroundVariant.Dots} gap={12} size={1} />
			</ReactFlow>
		</main>
	)
}

export default FlowEditor
