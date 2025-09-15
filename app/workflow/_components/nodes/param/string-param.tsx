"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ParamProps } from "@/types/app-node";
import { ChangeEvent, useEffect, useId, useState } from "react";

function StringParam({ param, value, updateNodeParamValue, disabled }: ParamProps) {
	const [internalValue, setInternalValue] = useState(value)
	const id = useId()

	useEffect(() => {
		setInternalValue(value)
	}, [value])

	let Component: typeof Input | typeof Textarea = Input
	if (param.variant === "textarea") {
		Component = Textarea
	}

	return (
		<div className="space-y-1 p-1 w-full">
			<Label htmlFor={id} className="text-xs gap-0">
				{param.name}
				{param.required && <span className="text-primary">*</span>}
			</Label>
			{!disabled && (
				<Component
					id={id}
					value={internalValue}
					placeholder="Enter a value"
					onChange={e => setInternalValue(e.target.value)}
					onBlur={e => updateNodeParamValue(e.target.value)}
					className="text-xs"
					disabled={disabled}
				/>
			)}

			{param.helperText && (
				<p className="text-muted-foreground text-xs">{param.helperText}</p>
			)}
		</div>
	)
}

export default StringParam
