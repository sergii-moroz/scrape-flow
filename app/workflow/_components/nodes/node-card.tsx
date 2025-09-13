"use client"

import { cn } from "@/lib/utils";
import { getNodesBounds, useReactFlow } from "@xyflow/react";
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

	return (
		<div
			className={cn(
				"rounded-md cursor-pointer bg-background border-1 w-[400px] text-xs gap-1 flex flex-col",
				isSelected && "border-primary"
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
