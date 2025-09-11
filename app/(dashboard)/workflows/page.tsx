import { GetWorkflows } from "@/actions/workflows/getWorkflows"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, InboxIcon } from "lucide-react"
import { Suspense } from "react"

function WorkflowsPage() {
	return (
		<div className="flex flex-col h-full">
			<div className="flex justify-between">
				<div className="flex flex-col">
					<h1 className="text-3xl font-bold">Workflows</h1>
					<p className="text-muted-foreground">Manage your workflows</p>
				</div>
			</div>

			<div className="h-full py-6">
				<Suspense fallback={<UserWorkflowsSkeleton />}>
					<UserWorkflows />
				</Suspense>
			</div>
		</div>
	)
}

function UserWorkflowsSkeleton() {
	return (
		<div className="space-y-2">
			{[0, 1, 2, 3].map(i => (
				<Skeleton
					key={i}
					className="w-full h-32"
				/>
			))}
		</div>
	)
}

async function UserWorkflows() {
	const workflows = await GetWorkflows()

	if (!workflows) {
		return (
			<Alert variant={"destructive"}>
				<AlertCircle />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>
					Something went wrong. Please try again later.
				</AlertDescription>
			</Alert>
		)
	}

	if (workflows.length === 0) {
		return (
			<div className="flex flex-col gap-4 h-full items-center justify-center">
				<div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
					<InboxIcon size={40} className="stroke-primary" />
				</div>

				<div className="flex flex-col gap-1 text-center">
					<p className="font-bold">No workflow created yet</p>
					<p className="text-sm text-muted-foreground">
						Click the button below to create your first workflow
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className=""></div>
		)
}

export default WorkflowsPage
