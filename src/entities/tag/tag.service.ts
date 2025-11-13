import { api, ResponseData } from "src/shared/api"
import { IdName } from "src/shared/types"

class TagService {
	get = async (): Promise<ResponseData<IdName>> => {
		const response = await api.get("/admin/tags")
		return response.data
	}

	post = async (form: { name: string }): Promise<IdName> => {
		const response = await api.post(`/admin/tags`, form)
		return response.data
	}

	delete = async (id: number) => {
		const response = await api.delete(`/admin/tags/${id}`)
		return response.data
	}
}

export const tagService = new TagService()
