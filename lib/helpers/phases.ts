import { ExecutionPhase } from "../generated/prisma";

type Phase = Pick<ExecutionPhase, "creaditsConsumed">
export function GetPhasesTotalCost(phases: Phase[]){
	return phases.reduce((acc, phase) => acc + (phase.creaditsConsumed || 0), 0)
}
