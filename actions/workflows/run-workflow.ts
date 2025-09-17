"use server"

import { prisma } from "@/lib/prisma"
import { FlowToExecutionPlan } from "@/lib/workflow/execution-plan"
import { WorkflowExecutionPlan } from "@/types/workflow"
import { auth } from "@clerk/nextjs/server"

export async function RunWorkflow(form: {
	workflowId: string
	flowDefinition?: string
}) {
	const {userId} = await auth()
	if (!userId) throw new Error("unauthenicated")

	const { workflowId, flowDefinition } = form
	if (!workflowId) throw new Error("workflowId is required")

	const workflow = await prisma.workflow.findUnique({
		where: {
			userId,
			id: workflowId
		}
	})

	if (!workflow) throw new Error("workflow not found")
	if (!flowDefinition) throw new Error("flow definiton is not defined")

	let executionPlan: WorkflowExecutionPlan
	const flow = JSON.parse(flowDefinition)
	const result = FlowToExecutionPlan(flow.nodes, flow.edges)
	if (result.error) throw new Error("flow definition not valid")
	if (!result.executionPlan) throw new Error("no execution plan geneated")

	executionPlan = result.executionPlan
	console.log("execution plan:", executionPlan)
}
