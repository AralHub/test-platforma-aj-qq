export type Exam = {
	id?: number
	title: string
	description: string
	time_limit_minutes: number
	is_active: boolean
	total_score?: number
	passed?: boolean
	is_expired?: boolean
}

export type SubmitAnswerPost = {
	user_attempt_id: number
	question_id: number
	selected_option_id: number
}

export type Stats = {
	user_id: number
	user_name: string
	total_attempts: number
	avg_score_percentage: number
	total_correct_answers: number
	total_wrong_answers: number
	total_questions_faced: number
	unanswered_questions: number
	avg_correct_percentage: number
}

export type Start = {
	total_score: number
	user_id: number
	exam_id: number
	started_at: string
	fixed_started_time: string
	ended_at: string
	passed: boolean
	uuid: string
	id: number
}

export type FinishForm = {
	exam_id: string
	answers: Answer[]
}

export type Answer = {
	question_id: number
	option_id: number
}

export type TestResult = {
	total_score: number
}
