"use client"

import { CreateWorkflow } from "@/actions/workflows/create-workflow"
import CustomDialogHeader from "@/components/custom-dialog-header"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CreateWorkflowSchema, CreateWorkflowSchemaType } from "@/schema/workflow"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Layers2Icon, Loader2Icon } from "lucide-react"
import { useCallback, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

function CreateWorkflowDialog({
	triggerText
} : {
	triggerText?: string
}) {
	const [open, setOpen] = useState(false)
	const toastId = useRef(`create-workflow-${crypto.randomUUID()}`).current

	const form = useForm<CreateWorkflowSchemaType>({
		resolver: zodResolver(CreateWorkflowSchema),
		defaultValues: {

		}
	})

	const { mutate, isPending } = useMutation({
		mutationFn: CreateWorkflow,
		onSuccess: () => {
			toast.success("Workflow created", { id: toastId })
		},
		onError: () => {
			toast.error("Failed to create workflow", { id: toastId })
		}
	})

	const onSubmit = useCallback((values: CreateWorkflowSchemaType) => {
		toast.loading("Creating workflow...", { id: toastId })
		mutate(values)
	},
	[mutate, toastId])

	return (
		<Dialog
			open={open}
			onOpenChange={() => {
				form.reset()
				setOpen(open => !open)
			}}
		>
			<DialogTrigger asChild>
				<Button>{triggerText ?? "Create workflow"}</Button>
			</DialogTrigger>

			<DialogContent className="p-0 gap-0">
				<CustomDialogHeader
					icon={Layers2Icon}
					title="Create workflow"
					subTitle="Start building your workflow"
				/>
				<div className="p-6">
					<Form {...form}>
						<form
							className="space-y-6 w-full"
							onSubmit={form.handleSubmit(onSubmit)}
						>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="gap-0">
											Name<span className="text-primary">*</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder="descriptive and unique name"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												placeholder="brief description of what your workflow does."
												className="resize-none"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								className="w-full"
								disabled={isPending}
							>
								{
									isPending
									? <Loader2Icon className="animate-spin" />
									: "Proceed"
								}
							</Button>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default CreateWorkflowDialog
