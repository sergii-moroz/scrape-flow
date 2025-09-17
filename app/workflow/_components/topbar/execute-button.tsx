"use client"

import { RunWorkflow } from "@/actions/workflows/run-workflow";
import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { Loader2Icon, PlayIcon } from "lucide-react";
import { toast } from "sonner";

export default function ExecuteButton({
	workflowId
} : {
	workflowId: string
}) {
	const generate = useExecutionPlan()
	const { toObject } = useReactFlow()

	const mutation = useMutation({
		mutationFn: RunWorkflow,
		onSuccess: () => {
			toast.success("Execution completed", { id: workflowId } )
		},
		onError: () => {
			toast.error("Failed to execute workflow", { id: workflowId })
		},
	})

	return (
		<Button
			disabled={mutation.isPending}
			onClick={() => {
				const plan = generate()
				if (!plan) return

				const flowDefinition = JSON.stringify(toObject())
				toast.loading("Execute workflow...", { id: workflowId })
				mutation.mutate({
					workflowId,
					flowDefinition
				})
			}}
		>
			{mutation.isPending
				? <Loader2Icon className="animate-spin"/>
				: <PlayIcon />
			}
			Execute
		</Button>
	)
}
