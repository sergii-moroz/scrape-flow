"use client"

import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";

export default function ExecuteButton({
	workflowId
} : {
	workflowId: string
}) {
	return (
		<Button
		>
			<PlayIcon />
			Execute
		</Button>
	)
}
