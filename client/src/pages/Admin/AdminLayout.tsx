import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu; // Import SubMenu

const AdminLayout = () => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // Mapping keys to routes
  const menuItems = {
    '1': '/admin/dashboard',
    '2': '/admin/all-events',
    '3': '/admin/upcoming-events',
    '4': '/admin/past-events',
    '5': '/admin/add-events',
    '6': '/admin/all-users',
    '7': '/admin/add-user',
  };

  const handleMenuClick = (key) => {
    navigate(menuItems[key]);  // Navigate based on the key
  };
  return (
    <Layout>
      <Sider className='bg-black ' trigger={null} collapsible collapsed={collapsed}>
        <div >
          <h1 className='text-3xl text-white font-bold text-center py-5'>OIF.</h1>
        </div>
        <Menu
          className='bg-black mt-10'
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={({ key }) => handleMenuClick(key)} // Use the key to navigate
        >
          {/* Dashboard Menu Item */}
          <Menu.Item key="1" icon={<UserOutlined />}>
            Dashboard
          </Menu.Item>

          {/* Nested Menu for Events */}
          <SubMenu key="sub1" icon={<VideoCameraOutlined />} title="Events">
            <Menu.Item key="2">All Events</Menu.Item>
            <Menu.Item key="3">Upcoming Events</Menu.Item>
            <Menu.Item key="4">Past Events</Menu.Item>
            <Menu.Item key="5">Add Events</Menu.Item>
          </SubMenu>

          {/* Nested Menu for Users */}
          <SubMenu key="sub2" icon={<UploadOutlined />} title="Users">
            <Menu.Item key="5">All Users</Menu.Item>
            <Menu.Item key="6">Add User</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header  style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
         <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout