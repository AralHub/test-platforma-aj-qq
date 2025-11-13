import { createFileRoute } from "@tanstack/react-router"
import { TagPage } from "src/pages/tag"

export const Route = createFileRoute("/_layout/tag/")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<TagPage />
		</>
	)
}
