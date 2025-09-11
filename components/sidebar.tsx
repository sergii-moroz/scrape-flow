"use client"

import { CoinsIcon, HomeIcon, Layers2Icon, MenuIcon, ShieldCheckIcon } from "lucide-react"
import Logo from "./logo"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button, buttonVariants } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { useState } from "react"

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

export function MobileSidebar() {
	const [isOpen, setIsOpen] = useState(false)
	const pathname = usePathname()
	const activeRoute = routes.find(route => route.href.length > 0 && pathname.includes(route.href)) || routes[0]

	return (
		<div className="block border-separate bg-background md:hidden">
			<nav className="flex items-center justify-between">
				<Sheet open={isOpen} onOpenChange={setIsOpen}>
					<SheetTrigger asChild>
						<Button variant={"ghost"} size={"icon"}>
							<MenuIcon />
						</Button>
					</SheetTrigger>
					<SheetContent
						className="w-full sm:w-[280px]"
						side="left"
					>
						<div className="flex  gap-2 border-b-1 border-separate p-4">
							<Logo />
						</div>

						<div className="flex flex-col px-4">
							{routes.map(route => (
								<Link
									key={route.href}
									href={route.href}
									className={buttonVariants({
										variant:
											activeRoute.href === route.href ? "sidebarActiveItem" : "sidebarItem"
									})}
									onClick={() => setIsOpen(prev => !prev)}
								>
									<route.icon size={20} />
									{route.label}
								</Link>
							))}
						</div>

					</SheetContent>
				</Sheet>
			</nav>
		</div>
	)
}
