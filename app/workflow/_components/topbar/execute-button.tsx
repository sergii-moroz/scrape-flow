"use client"

import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";

export default function ExecuteButton({
	workflowId
} : {
	workflowId: string
}) {
	const generate = useExecutionPlan()
	return (
		<Button
			onClick={() => {
				const plan = generate()
				console.log("--- plan ---")
				console.table(plan)
			}}
		>
			<PlayIcon />
			Execute
		</Button>
	)
}
