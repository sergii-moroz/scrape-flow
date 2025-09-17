"use server"

import { prisma } from "@/lib/prisma"
import { FlowToExecutionPlan } from "@/lib/workflow/execution-plan"
import { TaskRegistry } from "@/lib/workflow/task/registry"
import { PhaseExecutionStatus, WorkflowExecutionPlan, WorkflowExecutionStatus, WorkflowExecutionTrigger } from "@/types/workflow"
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

	const execution = await prisma.workflowExecution.create({
		data: {
			workflowId,
			userId,
			status: WorkflowExecutionStatus.PENDING,
			startedAt: new Date(),
			trigger: WorkflowExecutionTrigger.MANUAL,
			phases: {
				create: executionPlan.flatMap(phase => {
					return phase.nodes.flatMap(node => {
						return {
							userId,
							status: PhaseExecutionStatus.CREATED,
							number: phase.phase,
							node: JSON.stringify(node),
							name: TaskRegistry[node.data.type].label,
						}
					})
				})
			},
		},
		select: {
			id: true,
			phases: true,
		}
	})

	if (!execution) throw new Error("workflow execution not created")

}
