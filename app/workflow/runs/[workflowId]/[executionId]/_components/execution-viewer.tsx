"use client"

import { GetWorkflowExecutionWithPhases, GetWorkflowExecutionWithPhasesType } from "@/actions/workflows/get-workflow-execution-with-phases"
import { WorkflowExecutionStatus } from "@/types/workflow"
import { useQuery } from "@tanstack/react-query"
import { CalendarIcon, CircleDashedIcon, ClockIcon, CoinsIcon, Loader2Icon, LucideIcon, WorkflowIcon } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ReactNode, useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DatesToDurationString } from "@/lib/helpers/dates"
import { GetPhasesTotalCost } from "@/lib/helpers/phases"


export default function ExecutionViewer({
	initialData
}: {
	initialData: GetWorkflowExecutionWithPhasesType
}) {
	const [selectedPhase, setSelectedPhase] = useState<string | null>(null)

	const query = useQuery({
		queryKey: ["execution", initialData?.id],
		initialData,
		queryFn: () => GetWorkflowExecutionWithPhases(initialData!.id),
		refetchInterval: (q) => (
			q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false
		),
	})

	const isRunning = query.data?.status === WorkflowExecutionStatus.RUNNING

	const duration = DatesToDurationString(query.data?.completedAt, query.data?.startedAt)

	const creditsConsumed = GetPhasesTotalCost(query.data?.phases || [])

	return (
		<div className="flex w-full h-full">
			<aside className="w-[400px] min-w-[400px] max-w-[400px] border-r-1 border-separate flex flex-col overflow-hidden">
				<div className="py-2 px-2">

					<ExecutionLabel
						icon={CircleDashedIcon}
						label="Status"
						value={query.data?.status}
					/>

					<ExecutionLabel
						icon={CalendarIcon}
						label="Started at"
						value={
							<span className="lowercase">
								{query.data?.startedAt
									? formatDistanceToNow(new Date(query.data?.startedAt), {
										addSuffix: true
										})
									: "-"}
							</span>
						}
					/>

					<ExecutionLabel
						icon={ClockIcon}
						label="Duration"
						value={
							duration ? (
								duration
							) : (
								<Loader2Icon className="animate-spin" size={16} />
							)
						}
					/>

					<ExecutionLabel
						icon={CoinsIcon}
						label="Credits consumed"
						value={creditsConsumed}
					/>
				</div>

				<Separator />

				<div className="py-2 px-2 flex justify-center items-center">
					<div className="text-muted-foreground flex items-center gap-2">
						<WorkflowIcon
							size={16}
							className="stroke-muted-foreground/80"
						/>
						<span className="font-semibold">Phases</span>
					</div>
				</div>

				<Separator />

				<div className="overflow-auto h-full p-2">
					{query.data?.phases.map((phase, index) => (
						<Button
							key={phase.id}
							className="w-full justify-between cursor-pointer"
							variant={selectedPhase === phase.id ? "secondary" : "ghost"}
							onClick={() => {
								if (isRunning) return
								setSelectedPhase(phase.id)
							}}
						>
							<div className="flex items-center gap-2">
								<Badge variant={"outline"}>{index+1}</Badge>
								<p className="font-semibold">{phase.name}</p>
							</div>
							<p className="text-xs text-muted-foreground">{phase.status}</p>
						</Button>
					))}
				</div>
			</aside>
		</div>
	)
}

function ExecutionLabel({
	icon,
	label,
	value
}: {
	icon: LucideIcon,
	label: ReactNode,
	value: ReactNode
}) {
	const Icon = icon

	return (
		<div className="flex justify-between items-center py-2 px-4 text-sm">
			<div className="text-muted-foreground flex items-center gap-2">
				<Icon
					size={16}
					className="stroke-muted-foreground/80"
				/>
				<span>{label}</span>
			</div>
			<div className="font-semibold capitalize flex gap-1 items-center">
				{value}
			</div>
		</div>
	)
}
