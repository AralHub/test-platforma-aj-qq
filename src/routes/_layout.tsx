import {
	BookOutlined,
	CloseOutlined,
	HomeOutlined,
	MenuOutlined,
	OrderedListOutlined,
	UserOutlined
} from "@ant-design/icons"
import {
	createFileRoute,
	Outlet,
	redirect,
	useLocation,
	useNavigate
} from "@tanstack/react-router"
import type { MenuProps } from "antd"
import {
	Divider,
	Drawer,
	Flex,
	Image,
	Layout,
	Menu,
	Typography
} from "antd"
import { useResponsive } from "antd-style"
import type { FC, PropsWithChildren } from "react"
import { useEffect, useState } from "react"
import { useAuth, useToken } from "src/shared/hooks"
import { ProfileAvatar } from "src/widgets/avatar"

export const Route = createFileRoute("/_layout")({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		if (!context.auth?.isAuth) {
			throw redirect({
				to: "/auth/login",
				replace: true
			})
		}
	}
})

const { Text } = Typography
const { Header, Content, Footer, Sider } = Layout

const itemsAdmin: MenuProps["items"] = [
	{
		key: "/test",
		icon: <HomeOutlined style={{ fontSize: 16 }} />,
		label: "Тест"
	},
	{
		key: "/exam",
		icon: <BookOutlined style={{ fontSize: 16 }} />,
		label: "Предмет"
	},
	{
		key: "/users",
		icon: <UserOutlined style={{ fontSize: 16 }} />,
		label: "Результат"
	},
	{
		key: "/statistic",
		icon: <OrderedListOutlined style={{ fontSize: 16 }} />,
		label: "Статистика"
	}
	// {
	// 	key: "/auth/register",
	// 	icon: <FormOutlined style={{ fontSize: 16 }} />,
	// 	label: "Register"
	// },
	// {
	// 	key: "/auth/login",
	// 	icon: <LoginOutlined style={{ fontSize: 16 }} />,
	// 	label: "Login"
	// }
]

const items: MenuProps["items"] = [
	{
		key: "/test",
		icon: <HomeOutlined style={{ fontSize: 16 }} />,
		label: "Тесты"
	}
]

const SiderbarContainer: FC<
	PropsWithChildren<{
		collapsed: boolean
		toggleCollapsed: () => void
	}>
> = ({ children, collapsed, toggleCollapsed }) => {
	const { mobile } = useResponsive()
	const {
		token: { colorWhite }
	} = useToken()

	if (mobile)
		return (
			<Drawer
				closable={false}
				placement={"left"}
				width={295}
				open={!collapsed}
				onClose={toggleCollapsed}
				styles={{
					body: {
						padding: 0
					}
				}}
			>
				{children}
			</Drawer>
		)

	return (
		<Sider
			width={295}
			collapsed={collapsed}
			collapsedWidth={0}
			style={{
				backgroundColor: colorWhite,
				height: "100vh",
				position: "sticky",
				left: 0,
				top: 0,
				bottom: 0
			}}
		>
			{children}
		</Sider>
	)
}

function RouteComponent() {
	const { mobile } = useResponsive()
	const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorWhite, colorPrimary, sizeMD, sizeXL }
	} = useToken()
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const { isAuth, role } = useAuth()

	useEffect(() => {
		setCollapsed(mobile ?? false)
	}, [mobile])

	return (
		<Layout hasSider={true}>
			<SiderbarContainer
				collapsed={collapsed}
				toggleCollapsed={() => setCollapsed((prev) => !prev)}
			>
				{mobile && (
					<Flex
						onClick={() => setCollapsed(false)}
						justify="flex-end"
						style={{ padding: "20px", paddingBottom: 0 }}
					>
						<CloseOutlined style={{ fontSize: sizeXL }} />
					</Flex>
				)}
				<Flex
					align="center"
					style={{
						paddingLeft: 10,
						paddingBottom: "28px",
						paddingTop: "40px",
						paddingRight: 15
					}}
				>
					<Image
						src={"/preview.png"}
						fallback={"/public/preview.png"}
						preview={false}
						width={"100%"}
						style={{ flexShrink: 0 }}
					/>
					{/* <Flex vertical={true}>
						<Title
							level={3}
							style={{ color: colorPrimary, whiteSpace: "nowrap" }}
						>
							Ájiniyaz
						</Title>
						<Title
							level={4}
							style={{ color: colorPrimary, whiteSpace: "nowrap" }}
						>
							qaraqalpaq
						</Title>
					</Flex> */}
				</Flex>
				<Divider style={{ margin: 0 }} />
				<Menu
					theme="dark"
					onClick={(e) => {
						navigate({ to: e.key })
						if (mobile) {
							setCollapsed(true)
						}
					}}
					mode="inline"
					style={{
						backgroundColor: colorWhite,
						margin: "20px 0px 80px",
						padding: "8px 36px",
						fontSize: 16
					}}
					defaultSelectedKeys={[pathname]}
					items={
						(role === "admin" ? itemsAdmin : items)?.map((el) => ({
							...el,
							style: {
								marginBottom: 20
							}
						})) as MenuProps["items"]
					}
				/>
			</SiderbarContainer>
			<Layout
				style={{
					// backgroundColor: colorBgContainer,
					minHeight: "100vh",
					paddingLeft: 30,
					paddingRight: 24
				}}
			>
				<Header
					style={{
						backgroundColor: "inherit",
						height: 100,
						padding: "28px 0px"
					}}
				>
					<Flex justify="space-between">
						<MenuOutlined
							onClick={() => setCollapsed((prev) => !prev)}
							style={{ fontSize: sizeMD, cursor: "pointer" }}
						/>
						{isAuth && <ProfileAvatar />}
					</Flex>
				</Header>
				<Content>
					<Outlet />
				</Content>
				{!mobile && (
					<Footer style={{ padding: "10px 0px", backgroundColor: "inherit" }}>
						<Flex justify="space-between" align="center">
							<Flex align="center" gap={20}>
								<Text style={{ fontSize: "18px", color: colorPrimary }}>
									<Image
										src={"/logo.png"}
										fallback={"/public/logo.png"}
										preview={false}
										width={50}
									/>
								</Text>
							</Flex>
							<Text type="secondary" style={{ fontSize: "13px" }}>
								© {new Date().getFullYear()} Ájiniyaz qaraqalpaq. Все права
								защищены.
							</Text>
						</Flex>
					</Footer>
				)}
			</Layout>
		</Layout>
	)
}
