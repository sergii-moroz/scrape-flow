import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

async function Page(props: PageProps<'/workflow/editor/[workflowId]'>) {

	const { workflowId } = await props.params
	const { userId } = await auth()

	if (!userId) return <div>unauthenticated</div>

	const workflow = await prisma.workflow.findUnique({
		where: {
			id: workflowId,
			userId,
		}
	})

	if (!workflow) return (
		<div>Workflow not found</div>
	)

	return (
		<pre>
			{JSON.stringify(workflow, null, 4)}
		</pre>
	)
}

export default Page
