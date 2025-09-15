"use client"

import { Workflow } from "@/lib/generated/prisma"
import { CreateFlowNode } from "@/lib/workflow/create-flow-node"
import { TaskType } from "@/types/task"
import { addEdge, Background, BackgroundVariant, Connection, Controls, Edge, getOutgoers, ReactFlow, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import NodeComponent from "./nodes/node-component"
import { DragEvent, useCallback, useEffect } from "react"
import { AppNode } from "@/types/app-node"
import DeletableEdge from "./edges/deletable-edge"
import { TaskRegistry } from "@/lib/workflow/task/registry"
import { toast } from "sonner"

const nodeTypes = {
	FlowScrapeNode: NodeComponent
}

const edgeTypes = {
	default: DeletableEdge
}

// const snapGrid: [number, number] = [12, 12]
// const fitViewOptions = { padding: 0.5}

function FlowEditor({
	workflow
} : {
	workflow: Workflow
}) {
	const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([])
	const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
	const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow()

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

	const onDragOver = useCallback((event: DragEvent) => {
		event.preventDefault()
		event.dataTransfer.dropEffect = "move"
	}, [])

	const onDrop = useCallback((event: DragEvent) => {
		event.preventDefault()
		const taskType = event.dataTransfer.getData("application/reactflow")

		if (typeof taskType === undefined || !taskType) return

		const position = screenToFlowPosition({
			x: event.clientX,
			y: event.clientY
		})

		const newNode = CreateFlowNode(taskType as TaskType, position)
		setNodes(nds => nds.concat(newNode))
	}, [setNodes, screenToFlowPosition])

	const onConnect = useCallback((connection: Connection) => {
		console.log("@ON CONNECT", connection)
		setEdges(eds => addEdge({
				...connection,
				animated: false
			},
			eds
		))

		if (!connection.targetHandle) return

		const node = nodes.find(nd => nd.id === connection.target)

		if (!node) return

		const nodeInputs = node.data.inputs
		updateNodeData(node.id, {
			inputs: {
				...nodeInputs,
				[connection.targetHandle]: ""
			}
		})

	}, [setEdges, updateNodeData, nodes])

	const isValidConnection = useCallback((connection: Edge | Connection) => {
		// No self-connections allowed
		if (connection.source === connection.target) return false

		// Same taskParam type connection
		const source = nodes.find(node => node.id === connection.source)
		const target = nodes.find(node => node.id === connection.target)
		if (!source || ! target) return false

		const sourceTask = TaskRegistry[source.data.type]
		const targetTask = TaskRegistry[target.data.type]

		const output = sourceTask.outputs.find(o => o.name === connection.sourceHandle)
		const input = targetTask.inputs.find(o => o.name === connection.targetHandle)

		if (input?.type !== output?.type) {
			console.log("invalid connection: type mismatch")
			return false
		}

		const hasCycle = (node: AppNode, visited = new Set()) => {
			if (visited.has(node.id)) return false
			visited.add(node.id)

			for(const outgoer of getOutgoers(node, nodes, edges)) {
				if (outgoer.id === connection.source) return true
				if (hasCycle(outgoer, visited)) return true
			}
		}

		const detectedCycle = hasCycle(target)
		return !detectedCycle
		// return true
	}, [nodes, edges])

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
				onDragOver={onDragOver}
				onDrop={onDrop}
				onConnect={onConnect}
				edgeTypes={edgeTypes}
				isValidConnection={isValidConnection}
			>
				<Controls position="top-left" />
				<Background variant={BackgroundVariant.Dots} gap={12} size={1} />
			</ReactFlow>
		</main>
	)
}

export default FlowEditor
