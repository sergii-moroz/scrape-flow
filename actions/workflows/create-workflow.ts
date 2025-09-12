"use server"

import { auth } from "@clerk/nextjs/server";
import { CreateWorkflowSchema, CreateWorkflowSchemaType } from "@/schema/workflow";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { WorkflowStatus } from "@/types/workflow";

export async function CreateWorkflow(form: CreateWorkflowSchemaType) {
	const { success, data, error } = CreateWorkflowSchema.safeParse(form)
	if (!success) throw new Error(error.message)

	const { userId } = await auth()

	if (!userId) throw new Error("unauthenticated")

	const result = await prisma.workflow.create({
		data: {
			userId,
			status: WorkflowStatus.DRAFT,
			definition: "TODO",
			...data,
		}
	})

	if (!result) throw new Error("failed to create workflow")

	redirect(`/workflow/editor/${result.id}`)
}
