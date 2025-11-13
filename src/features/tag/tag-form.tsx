import { Form, Input } from "antd"
import { FormProps } from "antd/lib"
import { usePostTags } from "src/entities/tag"
import { IdName } from "src/shared/types"
import { FormDrawer } from "src/shared/ui"

export const TagForm = () => {
	const [form] = Form.useForm<IdName>()
	const { mutate, isPending, isSuccess } = usePostTags()
	const onFinish: FormProps<IdName>["onFinish"] = (values) => mutate(values)

	return (
		<FormDrawer form={form} loading={isPending} success={isSuccess}>
			<Form
				form={form}
				onFinish={onFinish}
				autoComplete={"off"}
				layout={"vertical"}
			>
				<Form.Item<IdName> name={"name"} label={"Название тега"}>
					<Input />
				</Form.Item>
			</Form>
		</FormDrawer>
	)
}
