import { useParams } from "@tanstack/react-router"
import { Test } from "./test"
import { useGetQuestionsList } from "src/entities/questions"

export const TextExam = () => {
	const { testId } = useParams({ strict: false })
	const { data } = useGetQuestionsList(testId)

	return <Test questionsExam={data} />
}
