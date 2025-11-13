import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { questionsService } from "."

export const useGetQuestionsList = (id?: string) =>
	useCrudQuery({
		queryFn: () => questionsService.get(id),
		queryKey: ["questions", id],
		enabled: !!id
	})

export const useGetQuestionsListTag = (id?: string) =>
	useCrudQuery({
		queryFn: () => questionsService.getTag(id),
		queryKey: ["questions", id],
		enabled: !!id
	})

export const useGetAdminQuestions = (id?: string) =>
	useCrudQuery({
		queryFn: () => questionsService.getAdmin(id),
		queryKey: ["admin-questions", id],
		enabled: !!id
	})

export const useCreateQuestion = () =>
	useCrudMutation({
		mutationFn: questionsService.create,
		invalidate: {
			queryKey: ["admin-questions"]
		}
	})

export const useAddQuestionToExam = () =>
	useCrudMutation({
		mutationFn: questionsService.addQuestionExam,
		invalidate: {
			queryKey: ["admin-questions"]
		}
	})

export const useAddQuestionToTag = () =>
	useCrudMutation({
		mutationFn: questionsService.addQuestionTag,
		invalidate: {
			queryKey: ["admin-questions"]
		}
	})

export const useEditQuestion = () =>
	useCrudMutation({
		mutationFn: questionsService.edit,
		invalidate: { queryKey: ["admin-questions"] }
	})

export const useDeleteQuestion = () =>
	useCrudMutation({
		mutationFn: questionsService.delete,
		invalidate: { queryKey: ["admin-questions"] }
	})

export const useAddImage = () =>
	useCrudMutation({
		mutationFn: questionsService.addImage,
		invalidate: { queryKey: ["admin-questions"] }
	})
