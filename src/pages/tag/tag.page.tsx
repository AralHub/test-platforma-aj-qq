import { useNavigate } from "@tanstack/react-router"
import { Button, Flex, Table, TableProps, Typography } from "antd"
import { useStartTest } from "src/entities/exam"
import { useDeleteTags, useGetTags } from "src/entities/tag"
import { TagForm } from "src/features/tag"
import { IdName } from "src/shared/types"
import { AddButton, DeleteButton } from "src/shared/ui"

const { Title } = Typography

export const TagPage = () => {
	const navigate = useNavigate()
	const { mutate: startTest } = useStartTest()
	const { data, isLoading } = useGetTags()
	const { mutate: deleteTag } = useDeleteTags()

	const columns: TableProps<IdName>["columns"] = [
		{
			key: "name",
			dataIndex: "name",
			title: "Название тега"
		},
		{
			key: "actions",
			title: "Функции",
			render: (_i, res) => (
				<Flex gap={10} justify="flex-end">
					<DeleteButton data={res.name} onConfirm={() => deleteTag(res.id)} />
					<Button
						type="primary"
						onClick={() => {
							startTest(res.id!)
							navigate({
								to: "/test/$testId/tag-test",
								params: { testId: String(res.id!) }
							})
						}}
					>
						Начать тест
					</Button>
				</Flex>
			),
			align: "end"
		}
	]

	return (
		<>
			<Flex vertical={true}>
				<Flex justify="space-between" style={{ padding: "20px 0px" }}>
					<Title level={2}>Теги</Title>
					<AddButton text="Добавить тег" />
				</Flex>
				<Table
					style={{ margin: "40px 0px" }}
					columns={columns}
					loading={isLoading}
					dataSource={data?.data}
					rowKey={(rec) => rec.id}
					scroll={{
						x: "auto"
					}}
					pagination={false}
				/>
			</Flex>
			<TagForm />
		</>
	)
}
