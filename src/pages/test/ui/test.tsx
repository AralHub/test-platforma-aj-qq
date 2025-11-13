import { Button, Card, Flex, Image } from "antd"
import { FC, useRef, useState } from "react"
import { QuestionsData, SelectedQuestionsOption } from "src/entities/questions"
import { Timer } from "./timer"
import { useResponsive } from "antd-style"
import { useQuestionsOptionDisabled } from "../hooks/useQuestionsOptionDisabled"
import { ResponseSingleData } from "src/shared/api"

interface TestProps {
	questionsExam?: ResponseSingleData<QuestionsData>
}

export const Test: FC<TestProps> = ({ questionsExam }) => {
	const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})
	const { mobile } = useResponsive()
	const [selectedQuestions, setSelectedQuestions] = useState<
		SelectedQuestionsOption[]
	>([])
	const questionsList = useQuestionsOptionDisabled({
		questions: questionsExam?.data.questions,
		selectedQuestions: selectedQuestions
	})

	return (
		<>
			<Timer
				started_at={questionsExam?.data.started_at}
				ended_at={questionsExam?.data.ended_at}
			/>
			<Flex
				style={{
					width: "100%",
					padding: mobile ? "20px 0px" : "24px 0px"
				}}
				justify="center"
				gap={100}
			>
				<Flex
					vertical={true}
					gap={16}
					style={{
						width: mobile ? "100%" : "60%"
					}}
				>
					{questionsList?.map((item, index) => (
						<Card
							title={
								<span>
									{index + 1}. {item.text}
								</span>
							}
							key={item.id}
							ref={(el) => (sectionRefs.current[item.id] = el)}
						>
							{item.image_url && (
								<Flex justify="center">
									<Image
										width={200}
										height={300}
										src={item.image_url}
										style={{ padding: "20px 0px", objectFit: "contain" }}
									/>
								</Flex>
							)}
							<Flex vertical gap={10}>
								{item.options.map((options) => (
									<Button
										disabled={item.disabled}
										size="large"
										key={options.id}
										onClick={() => {
											setSelectedQuestions((prev) => [
												...prev,
												{ question_id: item.id, option_id: options.id }
											])
										}}
									>
										{options.text}
									</Button>
								))}
							</Flex>
						</Card>
					))}
				</Flex>
			</Flex>
		</>
	)
}
