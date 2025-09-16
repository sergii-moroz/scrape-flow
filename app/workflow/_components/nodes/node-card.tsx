"use client"

import useFlowValidation from "@/components/hooks/useFlowValidation";
import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";
import { ReactNode } from "react"

function NodeCard({
	children,
	nodeId,
	isSelected
} : {
	children: ReactNode;
	nodeId: string;
	isSelected: boolean;
}) {
	const { getNode, fitView } = useReactFlow()
	const { invalidInputs } = useFlowValidation()
	const hasInvalidInputs = invalidInputs.some(node => node.nodeId === nodeId)

	return (
		<div
			className={cn(
				"rounded-md cursor-pointer bg-background border-1 w-[400px] text-xs flex flex-col",
				isSelected && "border-primary",
				hasInvalidInputs && "border-destructive border-2"
			)}
			onDoubleClick={() => {
				const node = getNode(nodeId)
				if (!node) return

				fitView({
					nodes: [{ id: nodeId }],
					duration: 500,
					// padding: 0.2,
					// includeHiddenNodes: false
				})
			}}
		>
			{children}
		</div>
	)
}

export default NodeCard
