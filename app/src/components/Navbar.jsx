import React, { useEffect, useState } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";

import {
	HomeOutlined,
	MoneyCollectOutlined,
	BulbOutlined,
	FundOutlined,
	MenuOutlined,
	WechatOutlined,
} from "@ant-design/icons";

import icon from "../images/crypto-logo.png";
import MenuItem from "antd/es/menu/MenuItem";

const Navbar = () => {
	const [activeMenu, setActiveMenu] = useState(true);
	const [screenSize, setScreenSize] = useState(null);

	useEffect(() => {
		const handleResize = () => setScreenSize(window.innerWidth);

		window.addEventListener("resize", handleResize);

		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (screenSize < 768) {
			setActiveMenu(false);
		} else {
			setActiveMenu(true);
		}
	}, [screenSize]);

	return (
		<div className="nav-container">
			<div className="logo-container">
				<Avatar src={icon} size="large" />
				<Typography.Title level={2} className="logo">
					<Link to="/">Crypto Pulse</Link>
				</Typography.Title>
				<Button
					className="menu-control-container"
					onClick={() => setActiveMenu(!activeMenu)}
				>
					<MenuOutlined />
				</Button>
			</div>

			{activeMenu && (
				<Menu className="nav-menu">
					<MenuItem
						key="home"
						icon={<HomeOutlined style={{ fontSize: "100%" }} />}
					>
						<Link to="/">Home</Link>
					</MenuItem>
					<MenuItem
						key="cryptocurrencies"
						icon={<FundOutlined style={{ fontSize: "100%" }} />}
					>
						<Link to="/cryptocurrencies">Cryptocurrencies</Link>
					</MenuItem>
					<MenuItem
						key="news"
						icon={<BulbOutlined style={{ fontSize: "100%" }} />}
					>
						<Link to="/news">News</Link>
					</MenuItem>
					<MenuItem
						key="metamask"
						icon={<MoneyCollectOutlined style={{ fontSize: "100%" }} />}
					>
						<Link to="/wallet">MetaMask</Link>
					</MenuItem>
					<MenuItem
						key="chat"
						icon={<WechatOutlined style={{ fontSize: "100%" }} />}
					>
						<Link to="/chat">Chat AI</Link>
					</MenuItem>
				</Menu>
			)}
		</div>
	);
};

export default Navbar;
