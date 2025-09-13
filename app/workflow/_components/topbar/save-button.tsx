"use client"

import { UpdateWorkflow } from "@/actions/workflows/update-workflow"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { useReactFlow } from "@xyflow/react"
import { Loader2Icon, SaveIcon } from "lucide-react"
import { toast } from "sonner"

function SaveButton({
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
			className=""
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

export default SaveButton
