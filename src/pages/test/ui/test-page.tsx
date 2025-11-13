import { Flex, Table, Typography } from "antd"
import { useGetExamSubjects } from "src/entities/exam"
import { useTestTableColumns } from "./use-test-table-columns"

export const TestPage = () => {
	const { data, isLoading } = useGetExamSubjects()

	const columns = useTestTableColumns()

	return (
		<>
			<Flex vertical={true}>
				<Flex justify="space-between" style={{ padding: "20px 0px" }}>
					<Typography.Title level={2}>Предметы</Typography.Title>
				</Flex>
				<Table
					style={{ margin: "40px 0px" }}
					columns={columns}
					loading={isLoading}
					dataSource={data?.data}
					rowKey={(rec) => rec.title}
					pagination={false}
					scroll={{
						x: "auto"
					}}
				/>
			</Flex>
		</>
	)
}
