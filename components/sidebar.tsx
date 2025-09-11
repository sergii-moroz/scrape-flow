"use client"

import { CoinsIcon, HomeIcon, Layers2Icon, ShieldCheckIcon } from "lucide-react"
import Logo from "./logo"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { buttonVariants } from "./ui/button"

const routes = [
	{
		href:		"",
		label:	"Home",
		icon:		HomeIcon,
	},
	{
		href:		"workflows",
		label:	"Workflows",
		icon:		Layers2Icon,
	},
	{
		href:		"credentials",
		label:	"Credentials",
		icon:		ShieldCheckIcon,
	},
	{
		href:		"billing",
		label:	"Billing",
		icon:		CoinsIcon,
	},
]

function DesktopSidebar() {
	const pathname = usePathname()
	const activeRoute = routes.find(route => route.href.length > 0 && pathname.includes(route.href)) || routes[0]

	return (
		<div className="hidden relative md:block h-screen overflow-hidden bg-gray-50 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-1 border-separate">
			<div className="flex items-center justify-center gap-2 border-b-1 border-separate p-4">
				<Logo />
			</div>
			<div>TODO CREDITS</div>
			<div className="flex flex-col px-2 py-4">
				{routes.map(route => (
					<Link
						key={route.href}
						href={route.href}
						className={buttonVariants({
							variant:
								activeRoute.href === route.href ? "sidebarActiveItem" : "sidebarItem"
						})}
					>
						<route.icon size={20} />
						{route.label}
					</Link>
				))}
			</div>
		</div>
	)
}

export default DesktopSidebar
