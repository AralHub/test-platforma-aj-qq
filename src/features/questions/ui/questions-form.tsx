import type { FormProps } from "antd"
import { Button, Form, Input, Checkbox, Flex, Select } from "antd"
import { FormDrawer } from "src/shared/ui"
import type { QuestionCreate, Questions } from "src/entities/questions"
import { useCreateQuestion, useEditQuestion } from "src/entities/questions"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { useParams } from "@tanstack/react-router"
import { useFormDevtoolsStore } from "src/shared/store"
import { useEffect } from "react"
import { useGetTags } from "src/entities/tag"

export const QuestionsForm = () => {
	const [form] = Form.useForm<QuestionCreate>()
	const { exam_id } = useParams({ strict: false })
	const { data: tags, isLoading: tagsLoading } = useGetTags()
	const {
		mutate: create,
		isPending: createPending,
		isSuccess: createSuccess
	} = useCreateQuestion()

	const {
		mutate: edit,
		isPending: editPending,
		isSuccess: editSuccess
	} = useEditQuestion()

	const params = useFormDevtoolsStore((state) => state.getParams<Questions>())

	const onFinish: FormProps<QuestionCreate>["onFinish"] = (values) => {
		if (params) {
			edit({
				...values,
				id: String(params.id)
			})
			return
		}
		create({
			id: exam_id!,
			text: values.text,
			options: values.options,
			tag_ids: values.tag_ids
		})
	}
	useEffect(() => {
		form.setFieldsValue({
			id: String(params?.id),
			options: params?.options,
			text: params?.text
		})
	}, [form, params])

	return (
		<FormDrawer
			form={form}
			loading={createPending || editPending}
			success={createSuccess || editSuccess}
		>
			<Form
				form={form}
				name="question_form"
				onFinish={onFinish}
				autoComplete="off"
			>
				<Form.Item
					name="text"
					label={"вопрос"}
					labelCol={{
						style: {
							display: "none"
						}
					}}
					rules={[{ required: true }]}
				>
					<Input.TextArea placeholder="Название вопроса" />
				</Form.Item>
				<Form.Item name={"tag_ids"}>
					<Select
						mode="multiple"
						loading={tagsLoading}
						placeholder="Можете выбрать тег"
						options={tags?.data.map((item) => ({
							label: item.name,
							value: item.id
						}))}
					/>
				</Form.Item>
				<Form.List name="options" initialValue={[{}, {}]}>
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, ...restField }, index) => (
								<Flex vertical={true} key={key} gap={10}>
									<Form.Item
										{...restField}
										name={[name, "text"]}
										label={"вариант"}
										labelCol={{
											style: {
												display: "none"
											}
										}}
										rules={[{ required: true }]}
										style={{
											marginBottom: 0
										}}
									>
										<Input.TextArea
											autoSize={true}
											placeholder={`Вариант ${index + 1}`}
										/>
									</Form.Item>

									<Flex
										justify="space-between"
										align="baseline"
										style={{
											marginBottom: 24
										}}
									>
										<Form.Item
											{...restField}
											name={[name, "is_correct"]}
											valuePropName="checked"
											initialValue={false}
											noStyle={true}
										>
											<Checkbox>Правильный</Checkbox>
										</Form.Item>
										<div>
											<MinusCircleOutlined
												style={{
													display: fields.length > 2 ? "block" : "none"
												}}
												onClick={() => remove(name)}
											/>
										</div>
									</Flex>
								</Flex>
							))}

							<Form.Item>
								<Button
									onClick={() => add()}
									block={true}
									icon={<PlusOutlined />}
								>
									Добавить вариант
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>
			</Form>
		</FormDrawer>
	)
}
