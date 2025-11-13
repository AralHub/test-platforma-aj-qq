import { useParams } from "@tanstack/react-router"
import { Test } from "./test"
import { useGetQuestionsListTag } from "src/entities/questions"

export const TestTag = () => {
	const { exam_id } = useParams({ strict: false })
	const { data } = useGetQuestionsListTag(exam_id)

	return <Test questionsExam={data} />
}
