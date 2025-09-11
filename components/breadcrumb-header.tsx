"use client"

import { Fragment } from "react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "./ui/breadcrumb"
import { usePathname } from "next/navigation"
import { MobileSidebar } from "./sidebar"

function BreadcrumbHeader() {
	const pathName = usePathname()
	const paths = pathName === "/" ? [""] : pathName?.split("/")
	return (
		<div className="flex items-center flex-start">
			<MobileSidebar />
			<Breadcrumb>
				<BreadcrumbList>
					{paths.map((path, index) => (
						<Fragment key={index}>
							<BreadcrumbItem>
								<BreadcrumbLink
									className="capitalize"
									href={`/${path}`}
								>
									{path === "" ? "home" : path}
								</BreadcrumbLink>
							</BreadcrumbItem>
						</Fragment>
					))}
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	)
}

export default BreadcrumbHeader
