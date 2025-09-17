import { GetWorkflowExecutionWithPhases } from "@/actions/workflows/get-workflow-execution-with-phases"
import Topbar from "@/app/workflow/_components/topbar/topbar"
import { waitFor } from "@/lib/helpers/wait-for"
import { auth } from "@clerk/nextjs/server"
import { Loader2Icon } from "lucide-react"
import { Suspense } from "react"
import ExecutionViewer from "./_components/execution-viewer"

export default async function ExecutionViewerPage(
	props: PageProps<'/workflow/runs/[workflowId]/[executionId]'>
) {

	const { workflowId, executionId } = await props.params
	const { userId } = await auth()

	if (!userId ) return <div>unauthenticated</div>

	return (
		<div className="flex flex-col h-screen w-full overflow-hidden">
			<Topbar
				workflowId={workflowId}
				title="Workflow run details"
				subTitle={`Run ID: ${executionId}`}
				hideButtons={true}
			/>
			<section className="flex h-full overflow-auto">
				<Suspense
					fallback={
						<div className="flex w-full items-center justify-center">
							<Loader2Icon className="animate-spin stroke-primary"/>
						</div>
					}
				>
					<ExecutionViewerWrapper executionId={executionId} />
				</Suspense>
			</section>
		</div>
	)
}

async function ExecutionViewerWrapper({
	executionId,
}: {
	executionId: string
}) {
	const workflowExecution = await GetWorkflowExecutionWithPhases(executionId)
	if (!workflowExecution) {
		return (
			<div>Not found</div>
		)
	}

	return(
		<ExecutionViewer initialData={workflowExecution} />
	)
}
