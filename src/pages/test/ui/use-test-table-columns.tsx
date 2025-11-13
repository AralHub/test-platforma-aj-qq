import { useNavigate } from "@tanstack/react-router"
import { Button, TableProps } from "antd"
import { Exam, useStartTest } from "src/entities/exam"

export const useTestTableColumns = () => {
	const navigate = useNavigate()
	const { mutate: startTest } = useStartTest()

	const columns: TableProps<Exam>["columns"] = [
		{
			key: "title",
			dataIndex: "title",
			title: "Предмет"
		},
		{
			key: "time",
			dataIndex: "time_limit_minutes",
			title: "Время на тест",
			render: (time) => <>{time} минут</>
		},
		{
			width: 100,
			fixed: "right",
			key: "options",
			dataIndex: "options",
			title: "",
			render: (_, res) => (
				<Button
					type="primary"
					onClick={() => {
						startTest(res.id!)
						navigate({
							to: "/test/$testId",
							params: { testId: String(res.id!) }
						})
					}}
				>
					Начать тест
				</Button>
			)
		}
	]
	return columns
}
