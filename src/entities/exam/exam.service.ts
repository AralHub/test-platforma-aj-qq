import type { ResponseSingleData } from "src/shared/api"
import { api, type ResponseData } from "src/shared/api"
import type { Exam, Start, Stats, SubmitAnswerPost } from "./exam.types"
import type { ParamId } from "src/shared/types"

class ExamService {
	get = async (): Promise<ResponseData<Exam>> => {
		const response = await api.get("/admin/exams")
		return response.data
	}
	getByUserId = async (id: ParamId): Promise<ResponseData<Exam>> => {
		const response = await api.get(`/admin/users/${id}/passed_exams`)
		return response.data
	}
	getSubjects = async (): Promise<ResponseData<Exam>> => {
		const response = await api.get("/exams")
		return response.data
	}
	getStats = async (): Promise<ResponseData<Stats>> => {
		const response = await api.get(`/admin/exams/analytics`)
		return response.data
	}
	create = async (form: Exam): Promise<ResponseSingleData<Exam>> => {
		const response = await api.post("/admin/exams", form)
		return response.data
	}
	edit = async ({ id, ...form }: Exam) => {
		const response = await api.put(`/admin/exams/${id}`, form)
		return response.data
	}
	submitAnswer = async (form: SubmitAnswerPost) => {
		const response = await api.post(`/exams/submit_answer`, form)
		return response.data
	}
	status = async (id: number): Promise<ResponseSingleData<Exam>> => {
		const response = await api.put(`/admin/exams/${id}/status`)
		return response.data
	}
	start = async (id: number): Promise<ResponseSingleData<Start>> => {
		const response = await api.post(`/exams/${id}/start`)
		return response.data
	}
	delete = async (id: number) => {
		const response = await api.delete(`/admin/exams/${id}`)
		return response.data
	}
}

export const examService = new ExamService()
