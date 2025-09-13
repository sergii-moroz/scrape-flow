"use client"

import { Workflow } from "@/lib/generated/prisma"
import { CreateFlowNode } from "@/lib/workflow/create-flow-node"
import { TaskType } from "@/types/task"
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import NodeComponent from "./nodes/node-component"
import { useEffect } from "react"

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
	const [nodes, setNodes, onNodesChange] = useNodesState([])
	const [edges, setEdges, onEdgesChange] = useEdgesState([])
	const { setViewport } = useReactFlow()

	useEffect(() => {
		try {
			const flow = JSON.parse(workflow.definition)

			if (!flow) return

			setNodes(flow.nodes || [])
			setEdges(flow.edges || [])

			// if (!flow.viewport) return

			// const { x = 0, y = 0, zoom = 1 } = flow.viewport

			// setViewport({ x, y, zoom })
		} catch (error) {

		}
	}, [workflow.definition, setEdges, setNodes, setViewport])

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
