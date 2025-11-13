import { createFileRoute } from "@tanstack/react-router"
import { TestTag } from "src/pages/test"

export const Route = createFileRoute("/_layout/test/$testId/tag-test")({
	component: RouteComponent
})

function RouteComponent() {
	return <TestTag />
}
