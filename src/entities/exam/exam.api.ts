import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { examService } from "./exam.service"
import type { ParamId } from "src/shared/types"

export const useCreateExam = () =>
	useCrudMutation({
		mutationFn: examService.create,
		invalidate: { queryKey: ["exam"] }
	})

export const useGetExamList = () =>
	useCrudQuery({
		queryFn: examService.get,
		queryKey: ["exam"]
	})

export const useGetExamListByUserId = (id: ParamId) =>
	useCrudQuery({
		queryFn: () => examService.getByUserId(id),
		queryKey: ["exam", "user", id]
	})

export const useGetStats = () =>
	useCrudQuery({
		queryFn: () => examService.getStats(),
		queryKey: ["exam"]
	})

export const useEditExam = () =>
	useCrudMutation({
		mutationFn: examService.edit,
		invalidate: { queryKey: ["exam"] }
	})

export const useDeleteExam = () =>
	useCrudMutation({
		mutationFn: examService.delete,
		onSuccessQueryClient: async (queryClient) => {
			await queryClient.refetchQueries({
				queryKey: ["exam"]
			})
			await queryClient.refetchQueries({
				queryKey: ["subjects"]
			})
			await queryClient.refetchQueries({
				queryKey: ["users"]
			})
			await queryClient.refetchQueries({
				queryKey: ["exam"]
			})
		}
	})

export const useGetExamSubjects = () =>
	useCrudQuery({ queryFn: examService.getSubjects, queryKey: ["subjects"] })

export const useStartTest = () =>
	useCrudMutation({
		mutationFn: examService.start,
		onSuccessQueryClient: async (queryClient) => {
			await queryClient.refetchQueries({
				queryKey: ["subjects"]
			})
			await queryClient.refetchQueries({
				queryKey: ["questions"]
			})
			await queryClient.refetchQueries({
				queryKey: ["exam"]
			})
		}
	})

export const useSubmitAnswer = () =>
	useCrudMutation({
		mutationFn: examService.submitAnswer
	})

export const useUpdateStatus = () =>
	useCrudMutation({
		mutationFn: examService.status,
		onSuccessQueryClient: async (queryClient) => {
			await queryClient.refetchQueries({
				queryKey: ["exam"]
			})
			await queryClient.refetchQueries({
				queryKey: ["subjects"]
			})
			await queryClient.refetchQueries({
				queryKey: ["exam", "stats"]
			})
			await queryClient.refetchQueries({
				queryKey: ["exam"]
			})
		}
	})
