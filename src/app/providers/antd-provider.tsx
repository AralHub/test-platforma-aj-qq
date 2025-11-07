import { LoadingOutlined } from "@ant-design/icons"
import { App, ConfigProvider } from "antd"
import localeRU from "antd/locale/ru_RU"
import "dayjs/locale/ru"
import dayjs from "dayjs"
import { type FC, type PropsWithChildren } from "react"
import { useToken } from "src/shared/hooks"

dayjs.locale("ru")

const AntdProvider: FC<PropsWithChildren> = ({ children }) => {
	const { token } = useToken()
	return (
		<>
			<ConfigProvider
				locale={localeRU}
				theme={{
					token: {
						fontFamily: `Open Sans,${token.fontFamily}`,
						colorPrimary: "#FF9046",
						// colorBgContainer: "#FFEFEE",
						colorBgLayout: "#FFEFEE"
					},
					components: {
						Menu: {
							itemHeight: 48,
							itemColor: "rgb(89, 37, 27)",
							darkItemColor: "rgb(89, 37, 27)",
							darkItemHoverColor: "rgb(89, 37, 27)",
							darkItemHoverBg: "rgb(254, 247, 244)"
						},
						Modal: {
							contentBg: "#F4F7FE",
							headerBg: "#F4F7FE"
						},
						Input: {
							activeShadow: ""
						}
					}
				}}
				typography={{
					style: {
						marginBottom: 0,
						marginTop: 0
					}
				}}
				form={{
					requiredMark: false
				}}
				inputNumber={{
					style: {
						width: "100%"
					}
				}}
				menu={{
					style: {
						borderRight: 0
					}
				}}
				spin={{
					indicator: <LoadingOutlined />
				}}
				datePicker={{
					style: {
						width: "100%"
					}
				}}
			>
				<App>{children}</App>
			</ConfigProvider>
		</>
	)
}

export { AntdProvider }
