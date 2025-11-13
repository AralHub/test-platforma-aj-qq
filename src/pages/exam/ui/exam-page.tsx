import { Flex, Table, Typography } from "antd"
import { useGetExamList } from "src/entities/exam"
import { ExamForm } from "src/features/exam"
import { AddButton } from "src/shared/ui"
import { useExamTableColumns } from "./use-exam-table-columns"

const { Title } = Typography

export const ExamPage = () => {
	const { data, isLoading } = useGetExamList()
	const columns = useExamTableColumns()

	return (
		<>
			<Flex vertical={true}>
				<Flex justify="space-between" style={{ padding: "20px 0px" }}>
					<Title level={2}>Предметы</Title>
					<AddButton text="Добавить предмет" />
				</Flex>
				<Table
					style={{ margin: "40px 0px" }}
					columns={columns}
					loading={isLoading}
					dataSource={data?.data}
					rowKey={(rec) => rec.title}
					scroll={{
						x: "auto"
					}}
					pagination={false}
				/>
			</Flex>
			<ExamForm />
		</>
	)
}
