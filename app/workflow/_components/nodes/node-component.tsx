import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./node-card";
import NodeHeader from "./node-header";
import { AppNodeData } from "@/types/app-node";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { NodeInput, NodeInputs } from "./node-inputs";
import { NodeOutput, NodeOutputs } from "./node-outputs";

const NodeComponent = memo((props: NodeProps) => {
	const nodeData = props.data as AppNodeData
	const task = TaskRegistry[nodeData.type]

	return <NodeCard
		nodeId={props.id}
		isSelected={props.selected}
	>
		<NodeHeader taskType={nodeData.type} nodeId={props.id} />

		{/* Node Inputs */}
		<NodeInputs>
			{task.inputs.map(input => (
				<NodeInput
					key={input.name}
					input={input}
					nodeId={props.id}
				/>
			))}
		</NodeInputs>

		{/* Node Inputs */}
		<NodeOutputs>
			{task.outputs.map(output => (
				<NodeOutput
					key={output.name}
					output={output}
				/>
			))}
		</NodeOutputs>

	</NodeCard>
})

export default NodeComponent
NodeComponent.displayName = "NodeComponent"
