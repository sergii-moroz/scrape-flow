"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ParamProps } from "@/types/app-node";
import { useId, useState } from "react";

function StringParam({ param, value, updateNodeParamValue }: ParamProps) {
	const [internalValue, setInternalValue] = useState("")

	const id = useId()
	return (
		<div className="space-y-1 p-1 w-full">
			<Label htmlFor={id} className="text-xs gap-0">
				{param.name}
				{param.required && <span className="text-primary">*</span>}
			</Label>
			<Input
				id={id}
				value={internalValue}
				placeholder="https://example.com"
				onChange={e => setInternalValue(e.target.value)}
				onBlur={e => updateNodeParamValue(e.target.value)}
				className="text-xs"
			/>
			{param.helperText && (
				<p className="text-muted-foreground text-xs">{param.helperText}</p>
			)}
		</div>
	)
}

export default StringParam
