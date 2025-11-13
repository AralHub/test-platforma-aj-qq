import { CheckOutlined, EyeOutlined, LockOutlined } from "@ant-design/icons"
import { useNavigate } from "@tanstack/react-router"
import { Button, Flex, Switch, TableProps, Tag } from "antd"
import { Exam, useDeleteExam, useUpdateStatus } from "src/entities/exam"
import { useToken } from "src/shared/hooks"
import { DeleteButton, EditButton } from "src/shared/ui"

export const useExamTableColumns = () => {
	const {
		token: { colorPrimary }
	} = useToken()
	const { mutate: deleteExam } = useDeleteExam()
	const { mutate: updateStatus, isPending } = useUpdateStatus()
	const navigate = useNavigate()

	const columns: TableProps<Exam>["columns"] = [
		{
			title: "Название предмета",
			dataIndex: "title",
			key: "name"
		},
		{
			title: "Статус",
			dataIndex: "is_active",
			key: "is_active",
			render: (status) => (
				<>
					{status ? (
						<Tag color="green">Активный</Tag>
					) : (
						<Tag color="red">Не активен</Tag>
					)}
				</>
			)
		},
		{
			title: "Описание",
			dataIndex: "description",
			key: "description"
		},
		{
			title: "Время на тест",
			dataIndex: "time_limit_minutes",
			key: "time_limit_minutes",
			render: (item) => <>{item} минут</>
		},
		{
			width: 100,
			fixed: "right",
			align: "center",
			title: "Функции",
			dataIndex: "functions",
			key: "functions",
			render: (_, res) => (
				<Flex gap={10} align="center">
					<Switch
						onClick={() => updateStatus(res.id!)}
						checkedChildren={<CheckOutlined />}
						unCheckedChildren={<LockOutlined />}
						defaultChecked={res.is_active}
						loading={isPending}
					/>
					<EditButton params={res} />
					<DeleteButton
						data={res.title}
						onConfirm={() => deleteExam(res.id!)}
					/>
					<Button
						onClick={() =>
							navigate({
								to: "/exam/$exam_id",
								params: { exam_id: String(res.id!) }
							})
						}
						icon={<EyeOutlined style={{ fontSize: 20, color: colorPrimary }} />}
					/>
				</Flex>
			)
		}
	]

	return columns
}
