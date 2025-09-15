"use client"

import {
	Loader2Icon,
	SaveIcon
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { useReactFlow } from "@xyflow/react"
import { UpdateWorkflow } from "@/actions/workflows/update-workflow"

export default function SaveButton({
	workflowId
} : {
	workflowId: string
}) {
	const { toObject } = useReactFlow()

	const saveMutation = useMutation({
		mutationFn: UpdateWorkflow,
		onSuccess: () => {
			toast.success("Flow saved successfully", { id: workflowId })
		},
		onError: () => {
			toast.error("Something went wrong", { id: workflowId })
		}
	})

	return (
		<Button
			variant={"outline"}
			disabled={saveMutation.isPending}
			onClick={() => {
				const workflowDefinition = JSON.stringify(toObject())
				toast.loading("Saving workflow...", { id: workflowId })
				saveMutation.mutate({
					id: workflowId,
					definition: workflowDefinition
				})
			}}
		>
			{saveMutation.isPending
				? <Loader2Icon className="animate-spin" />
				: <SaveIcon className="stroke-primary" />
			}
			Save
		</Button>
	)
}
