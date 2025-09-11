import BreadcrumbHeader from "@/components/breadcrumb-header";
import DesktopSidebar from "@/components/sidebar";
import { ModeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="flex h-screen">
			<DesktopSidebar />

			<div className="flex flex-col flex-1 min-h-screen">

				<header className="flex items-center justify-between px-8 py-4">
					<BreadcrumbHeader />
					<div className="gap-1 flex items-center">
						<ModeToggle />
					</div>
				</header>

				<Separator />

				<div className="overflow-auto">
					<div className="flex-1 py-4 text-accent-foreground">
						{children}
					</div>
				</div>

			</div>
		</div>
	)
}

export default Layout
