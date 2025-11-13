import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { tagService } from "./tag.service"

const useGetTags = () =>
	useCrudQuery({
		queryFn: () => tagService.get(),
		queryKey: ["tags"]
	})

const usePostTags = () =>
	useCrudMutation({
		mutationFn: tagService.post,
		invalidate: {
			queryKey: ["tags"]
		}
	})

const useDeleteTags = () =>
	useCrudMutation({
		mutationFn: tagService.delete,
		invalidate: {
			queryKey: ["tags"]
		}
	})

export { useGetTags, usePostTags, useDeleteTags }
