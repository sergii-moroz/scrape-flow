"use client"

import {
	BaseEdge,
	EdgeProps,
	getBezierPath,
	EdgeLabelRenderer,
	useReactFlow
} from "@xyflow/react"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function DeletableEdge(props: EdgeProps) {
	const [edgePath, labelX, labelY] = getBezierPath(props)
	const {setEdges} = useReactFlow()

	return (
		<>
			<BaseEdge
				path={edgePath}
				markerEnd={props.markerEnd}
				style={props.style}
			/>
			<EdgeLabelRenderer>
				<div className="" style={{
					position: "absolute",
					transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
					pointerEvents: "all"
				}}	>
					{props.selected && (
						<Button
							variant={"destructive"}
							size="icon"
							className="border cursor-pointer rounded-full text-xs leading-none hover:shadow-lg w-6 h-6"
							onClick={() => {
								setEdges((edges) => edges.filter((edge) => edge.id !== props.id))
							}}
						>
							<X />
						</Button>
					)}
				</div>
			</EdgeLabelRenderer>
		</>
	)
}
