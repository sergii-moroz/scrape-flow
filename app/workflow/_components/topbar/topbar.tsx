"use client"

import TooltipWrapper from "@/components/tooltip-wrapper"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import SaveButton from "./save-button"
import ExecuteButton from "./execute-button"

interface Props {
	title: string
	workflowId: string
}

function Topbar({ title, workflowId }: Props ) {
	const router = useRouter()

	return (
		<header className="flex p-2 border-b  justify-between w-full sticky top-0 bg-background z-10">
			<div className="flex gap-1 flex-1 items-center">
				<TooltipWrapper content="Back">
					<Button variant={"ghost"} size={"icon"} onClick={() => router.back()} >
						<ChevronLeftIcon />
					</Button>
				</TooltipWrapper>
				<div>
					<p className="font-bold text-ellipsis truncate">Workflow editor</p>
					<p className="text-xs text-muted-foreground truncate text-ellipsis">{title}</p>
				</div>
			</div>
			<div className="flex items-center gap-1">
				<SaveButton workflowId={workflowId} />
				<ExecuteButton workflowId={workflowId} />
			</div>
		</header>
	)
}

export default Topbar
