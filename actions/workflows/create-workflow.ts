"use server"

import { auth } from "@clerk/nextjs/server";
import { CreateWorkflowSchema, CreateWorkflowSchemaType } from "@/schema/workflow";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { WorkflowStatus } from "@/types/workflow";
import { AppNode } from "@/types/app-node";
import { Edge } from "@xyflow/react";
import { TaskType } from "@/types/task";
import { CreateFlowNode } from "@/lib/workflow/create-flow-node";
import { revalidatePath } from "next/cache";

export async function CreateWorkflow(form: CreateWorkflowSchemaType) {
	const { success, data, error } = CreateWorkflowSchema.safeParse(form)
	if (!success) throw new Error(error.message)

	const { userId } = await auth()

	if (!userId) throw new Error("unauthenticated")

	const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
		nodes: [],
		edges: []
	}

	initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER))

	const result = await prisma.workflow.create({
		data: {
			userId,
			status: WorkflowStatus.DRAFT,
			definition: JSON.stringify(initialFlow), //"{}",
			...data,
		}
	})

	if (!result) throw new Error("Failed to create workflow (server side)")

	// redirect(`/workflow/editor/${result.id}`)
	revalidatePath("/workflows")
	return result.id
}
