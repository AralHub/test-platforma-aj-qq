import { ArrowLeftOutlined, CameraOutlined } from "@ant-design/icons"
import { useNavigate, useParams } from "@tanstack/react-router"
import {
	Button,
	Card,
	Flex,
	Image,
	message,
	Select,
	Tag,
	Typography,
	Upload
} from "antd"
import { useEffect } from "react"
import { useGetExamList } from "src/entities/exam"
import {
	QuestionAddExam,
	QuestionAddTag,
	useAddImage,
	useAddQuestionToExam,
	useAddQuestionToTag,
	useDeleteQuestion,
	useGetAdminQuestions
} from "src/entities/questions"
import { useGetTags } from "src/entities/tag"
import { QuestionsForm } from "src/features/questions"
import { useToken } from "src/shared/hooks"
import { AddButton, DeleteButton, EditButton } from "src/shared/ui"

const { Title } = Typography

export const QuestionsPage = () => {
	const { exam_id } = useParams({ strict: false })
	const {
		token: { colorWhite }
	} = useToken()
	const { data } = useGetAdminQuestions(exam_id)
	const { mutate: deleteQuestion } = useDeleteQuestion()
	const { mutate: addImage } = useAddImage()
	const navigate = useNavigate()
	const { data: exams, isLoading } = useGetExamList()
	const { mutate, isSuccess } = useAddQuestionToExam()
	const { mutate: addToTag, isSuccess: TagSuccess } = useAddQuestionToTag()
	const { data: tags, isLoading: tagsLoading } = useGetTags()

	const handleChange = ({ exam_id, question_id }: QuestionAddExam) => {
		mutate({ exam_id, question_id })
	}

	const handleChangeTag = ({ tag_id, question_id }: QuestionAddTag) => {
		addToTag({ tag_id, question_id })
	}

	useEffect(() => {
		if (isSuccess || TagSuccess) {
			message.success("Вопрос добавлен!")
		}
	}, [isSuccess, TagSuccess])
	return (
		<>
			<Flex vertical={true}>
				<Flex justify="space-between" style={{ padding: "20px 0px" }}>
					<Title level={2}>
						<ArrowLeftOutlined
							style={{ marginRight: 20 }}
							onClick={() => navigate({ to: "/exam" })}
						/>
						Вопросы
					</Title>
					<AddButton text="Добавить вопрос" />
				</Flex>
				{data?.data?.map((item, index) => (
					<Card
						key={item.id}
						style={{ backgroundColor: colorWhite, marginTop: 20 }}
						title={
							<Flex justify="space-between" align="center">
								<Flex gap={10}>
									<span>{index + 1}.</span>
									{item.text}
								</Flex>
								<Flex gap={10}>
									<Select
										placeholder="Добавить к тегу?"
										loading={tagsLoading}
										style={{ width: 220 }}
										onChange={(e: number) =>
											handleChangeTag({ tag_id: e, question_id: item.id })
										}
										options={tags?.data.map((item) => ({
											value: item.id,
											label: item.name
										}))}
									/>
									<Select
										placeholder="Добавить к предмету?"
										loading={isLoading}
										style={{ width: 220 }}
										onChange={(e: number) =>
											handleChange({ exam_id: e, question_id: item.id })
										}
										options={exams?.data.map((item) => ({
											value: item.id,
											label: item.title
										}))}
									/>
									<EditButton params={item} />
									<Upload
										showUploadList={false}
										beforeUpload={(file) => {
											addImage({ question_id: item.id, image: file })
											return false
										}}
									>
										<Button
											type="primary"
											icon={<CameraOutlined style={{ fontSize: 20 }} />}
										/>
									</Upload>
									<DeleteButton
										data={item.text}
										onConfirm={() => deleteQuestion(String(item.id))}
									/>
								</Flex>
							</Flex>
						}
					>
						{item.image_url && (
							<Flex justify="center">
								<Image
									width={200}
									height={200}
									src={item.image_url}
									style={{ padding: "20px 0px" }}
								/>
							</Flex>
						)}
						<Flex vertical={true} gap={10} style={{ marginTop: 20 }}>
							{item.options.map((question) => (
								<Tag
									style={{ padding: "10px", borderRadius: 5 }}
									key={question.id}
								>
									{question.text}
								</Tag>
							))}
						</Flex>
					</Card>
				))}
			</Flex>
			<QuestionsForm />
		</>
	)
}
