import { IdName } from "src/shared/types"

export type QuestionCreate = {
	id: string
	text: string
	options: Variant[]
	tag_ids?: number[]
}

export type QuestionAddTag = {
	question_id: number
	tag_id: number
}
export type QuestionAddExam = {
	question_id: number
	exam_id: number
}
export type Variant = {
	id?: number
	text: string
	is_correct?: boolean
}

export type QuestionsData = {
	questions: Questions[]
	started_at: string
	ended_at: string
	user_attempt_id: number
}

export type Questions = {
	id: number
	text: string
	image_url?: string
	options: Variant[]
	tags?: IdName[]
}

export type AddImage = {
	question_id: number
	image: File
}

export type SelectedQuestionsOption = {
	question_id?: number
	option_id?: number
}
