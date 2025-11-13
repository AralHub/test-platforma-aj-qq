import { Questions, SelectedQuestionsOption } from "src/entities/questions"

export const useQuestionsOptionDisabled = ({
	questions,
	selectedQuestions
}: {
	questions?: Questions[]
	selectedQuestions?: SelectedQuestionsOption[]
}) => {
	const questionsList = questions?.map((item) => {
		return {
			...item,
			disabled: selectedQuestions?.some((el) => {
				if (
					el?.question_id === item.id &&
					item.options.some((ell) => ell.id == el?.option_id)
				) {
					return true
				}
				return false
			})
		}
	})
	return questionsList
}
