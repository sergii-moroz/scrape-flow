"use client"

import TooltipWrapper from "@/components/tooltip-wrapper"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Workflow } from "@/lib/generated/prisma"
import { cn } from "@/lib/utils"
import { WorkflowStatus } from "@/types/workflow"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { FileTextIcon, MoreVerticalIcon, PlayIcon, ShuffleIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import DeleteWorkflowDialog from "./delete-workflow-dialog"

const statusColor = {
	[WorkflowStatus.DRAFT]: "bg-yellow-400 text-yellow-600",
	[WorkflowStatus.PUBLISHED]: "bg-primary",
}

function WorkflowCard({workflow} : {workflow: Workflow}) {
	const isDraft = workflow.status === WorkflowStatus.DRAFT

	return (
		<Card className="border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30">

			<CardContent className="flex items-center justify-between">

				<div className="flex items-center justify-start gap-2">

					<div className={cn("w-10 h-10 rounded-full flex items-center justify-center", statusColor[workflow.status as WorkflowStatus])}>
						{isDraft ? <FileTextIcon /> : <PlayIcon /> }
					</div>

					<div className="flex items-center gap-2">
						<Link
							href={`/workflow/editor/${workflow.id}`}
							className="text-base font-bold text-muted-foreground hover:underline"
						>
							{workflow.name}
						</Link>

						{isDraft && (
							<Badge
								variant={"secondary"}
								className="bg-yellow-100 text-yellow-600"
							>
								Draft
							</Badge>
						)}

					</div>

				</div>

				<div className="flex items-center space-x-2">
					<Link
						href={`/workflow/editor/${workflow.id}`}
						className={cn(
							buttonVariants({
								variant: "outline",
								size: "sm"
							}),
							"flex items-center gap-2"
						)}
					>
						<ShuffleIcon size={16} />
						Edit
					</Link>
					<WorkflowActions
						workflowName={workflow.name}
						workflowId={workflow.id}
					/>
				</div>
			</CardContent>
		</Card>
	)
}

function WorkflowActions({
	workflowName,
	workflowId
} : {
	workflowName: string,
	workflowId: string
}) {
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)

	return (
		<>
			<DeleteWorkflowDialog
				open={showDeleteDialog}
				setOpen={setShowDeleteDialog}
				workflowName={workflowName}
				workflowId={workflowId}
			/>

			<DropdownMenu>
						<TooltipWrapper content={"More actions"}>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm">
						<MoreVerticalIcon />
					</Button>
				</DropdownMenuTrigger>
						</TooltipWrapper>
				<DropdownMenuContent>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						className="text-destructive flex items-center gap-2"
						onSelect={() => {
							setShowDeleteDialog(prev => !prev)
						}}
					>
						<TrashIcon className="stroke-destructive" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}

export default WorkflowCard
