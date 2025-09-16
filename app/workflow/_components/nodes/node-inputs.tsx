import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/task";
import { Handle, Position, useEdges } from "@xyflow/react";
import { ReactNode } from "react";
import NodeParamField from "./node-param-field";
import { ColorForHandle } from "./common";
import useFlowValidation from "@/components/hooks/useFlowValidation";

export function NodeInputs({
	children
} : {
	children: ReactNode
}) {
	return (
		<div className="flex flex-col divide-y-2 border-b-2 ">
			{children}
		</div>
	)
}

export function NodeInput({
	input,
	nodeId
} : {
	input: TaskParam
	nodeId: string
}) {
	const edges = useEdges()
	const isConnected = edges.some(
		edge => edge.target === nodeId && edge.targetHandle === input.name
	)
	const { invalidInputs } = useFlowValidation()
	const hasErrors = invalidInputs.find(node => node.nodeId === nodeId)?.inputs.find(invalidInput => invalidInput === input.name)

	return (
		<div
			className={cn(
				"flex justify-start relative p-3 bg-secondary w-full",
				hasErrors && "bg-destructive/30")}
		>
			<NodeParamField
				param={input}
				nodeId={nodeId}
				disabled={isConnected}
			/>
			{!input.hideHandle && (
				<Handle
					id={input.name}
					isConnectable={!isConnected}
					type="target"
					position={Position.Left}
					className={cn(
						"!bg-muted-foreground !border-2 !border-background !w-4 !h-4",
						ColorForHandle[input.type]
					)}
				/>
			)}
		</div>
	)
}
