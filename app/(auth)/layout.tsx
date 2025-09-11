import Logo from "@/components/logo"
import { ReactNode } from "react"

function Layout({
	children
} : {
	children: ReactNode
}) {
	return (
		<div className="flex flex-col items-center justify-center h-screen gap-8">
			<Logo />
			{children}
		</div>
	)
}

export default Layout
