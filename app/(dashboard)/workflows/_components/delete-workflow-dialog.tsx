"use client"

import { DeleteWorkflow } from "@/actions/workflows/delete-workflow"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog"
import { useMutation } from "@tanstack/react-query"
import { Loader2Icon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"


interface Props {
	open: boolean
	setOpen: (open: boolean) => void
	workflowName: string
	workflowId: string
}

function DeleteWorkflowDialog({
	open,
	setOpen,
	workflowName,
	workflowId
}: Props) {
	const [confirmText, setConfirmText] = useState("")

	const deleteMutation = useMutation({
		mutationFn: DeleteWorkflow,
		onSuccess: () => {
			toast.success("Workflow deleted successfully", { id: workflowId })
			setConfirmText("")
		},
		onError: () => {
			toast.error("Something went wrong", { id: workflowId })
		}
	})

	return (
		<AlertDialog open={open} onOpenChange={setOpen} >
			<AlertDialogContent>

				<AlertDialogHeader>
					<AlertDialogTitle>Are your absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>This action cannot be undone. This will permanently delete workflow
						and you will not be able to recover it.</AlertDialogDescription>
						<div className="flex flex-col py-4 gap-2">
							<p className="text-muted-foreground text-sm">
								If you are sure, enter{" "}
								<span className="font-bold text-primary">{workflowName}</span>
								{" "}to confirm:
							</p>
							<Input
								value={confirmText}
								onChange={e => setConfirmText(e.target.value)}
							/>
						</div>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel
						className={buttonVariants({
							variant: "outline"
						})}
						onClick={() => setConfirmText("")}
					>
						Cancel
					</AlertDialogCancel>

					<AlertDialogAction
						disabled={confirmText !== workflowName || deleteMutation.isPending}
						className={buttonVariants({
							variant: "destructive"
						})}
						onClick={() => {
							toast.loading("Deleting workflow...", { id: workflowId })
							deleteMutation.mutate(workflowId)
						}}
					>
						{
							deleteMutation.isPending
								? <Loader2Icon className="animate-spin" />
								: "Delete"
						}
					</AlertDialogAction>
				</AlertDialogFooter>

			</AlertDialogContent>
		</AlertDialog>
	)
}

export default DeleteWorkflowDialog
