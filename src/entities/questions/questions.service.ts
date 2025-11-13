import type { ResponseData, ResponseSingleData } from "src/shared/api"
import { api } from "src/shared/api"
import type {
	AddImage,
	QuestionAddExam,
	QuestionAddTag,
	QuestionCreate,
	Questions,
	QuestionsData
} from "."

class QuestionsService {
	get = async (
		id: string | undefined
	): Promise<ResponseSingleData<QuestionsData>> => {
		const response = await api.get(`/exams/${id}/questions`)
		return response.data
	}
	getTag = async (
		id: string | undefined
	): Promise<ResponseSingleData<QuestionsData>> => {
		const response = await api.get(`/exams/${id}/questions_by_tags`)
		return response.data
	}
	getAdmin = async (
		id: string | undefined
	): Promise<ResponseData<Questions>> => {
		const response = await api.get(`/admin/exams/${id}/questions`)
		return response.data
	}
	addImage = async ({ question_id, image }: AddImage) => {
		const imageFormData = new FormData()
		imageFormData.append("image", image)
		const response = await api.put(
			`/admin/exams/questions/${question_id}/image`,
			imageFormData
		)
		return response.data
	}
	addQuestionTag = async (form: QuestionAddTag) => {
		const response = await api.post("/admin/exams/add_question", form)
		return response.data
	}
	addQuestionExam = async (form: QuestionAddExam) => {
		const response = await api.post("/admin/exams/add_question_to_exam", form)
		return response.data
	}
	create = async ({ id, ...form }: QuestionCreate) => {
		const response = await api.post(`/admin/exams/${id}/questions`, form)
		return response.data
	}
	edit = async ({ id, ...form }: QuestionCreate) => {
		const response = await api.put(`/admin/exams/questions/${id}`, form)
		return response.data
	}
	delete = async (id: string) => {
		const response = await api.delete(`/admin/exams/questions/${id}`)
		return response.data
	}
}

export const questionsService = new QuestionsService()
