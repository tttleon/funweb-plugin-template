import React, { useState, useContext } from 'react'
import { QueryRenderer, graphql } from 'react-relay';
import {
    Link,
} from "react-router-dom";
import { ModalLink, SessionContext } from 'funweb-lib';

import moment from 'moment';
import 'moment/locale/zh-cn';
import {
    Breadcrumb,
    Table,
    Divider,
    Input,
    Button,
    Menu,
    Dropdown,
    Row,
    Col,
    Radio
} from 'antd';

import {
    TableOutlined,
    CaretDownOutlined,
    PlusOutlined,
    ReloadOutlined,
    FilterOutlined,
    CaretUpOutlined,
    UndoOutlined,
    SearchOutlined,
    DeleteOutlined
} from '@ant-design/icons';

moment.locale('zh-cn');


var query = graphql`
    query List_MenuQuery(
        $id: ID!
    ) {
        menu(
            id: $id
        ) {
            id
            children{
                id
                name
                icon
                order
                uri
                remark
                children{
                    id
                    name
                    icon
                    order
                    uri
                    remark
                }
            }
        }
    }`


const actionmenu = (
    <Menu onClick={() => { }}>
        <Menu.Item key="1">
            <DeleteOutlined />
            禁 用
        </Menu.Item>
    </Menu>
);

const fieldsmenu = (
    <Menu onClick={() => { }}>
        <Menu.Item key="1">id</Menu.Item>
        <Menu.Item key="2">name</Menu.Item>
        <Menu.Item key="3">remark</Menu.Item>
        <Menu.Item key="4">createAt</Menu.Item>
    </Menu>
);

const actionsmenu = (
    <Menu onClick={() => { }}>
        <Menu.Item key="more">详情</Menu.Item>
        <Menu.Item key="delete">删除</Menu.Item>
    </Menu>
);

const columns = [
    {
        title: '菜单ID',
        dataIndex: 'id',
        key: 'id',
        width: '15%',
        align: 'center',
    },
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: '15%',
        align: 'center',
    },
    {
        title: 'Icon',
        dataIndex: 'icon',
        key: 'icon',
        width: '5%',
        align: 'center',
        render: (text, record, index) => {
            let ds = {
                "WEB": "PC浏览器",
                "MOBILE": "Mobile",
                "APP": "APP",
                "SERVER": "SERVER"
            }
            return ds[record.icon]
            // (
            // <Radio.Group value={record.type} size="small">
            //     <Radio.Button value="WEB">PC浏览器</Radio.Button>
            //     <Radio.Button value="MOBILE" disabled>Mobile</Radio.Button>
            //     <Radio.Button value="APP" disabled>APP</Radio.Button>
            //     <Radio.Button value="SERVER">SERVER</Radio.Button>
            // </Radio.Group>
            // )
        },
    },
    {
        title: '菜单路由',
        dataIndex: 'uri',
        key: 'uri',
        width: '20%',
        align: 'left',
    },
    {
        title: '排序',
        dataIndex: 'order',
        key: 'order',
        width: '10%',
        align: 'center',
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: '15%',
        align: 'center',
        render: (text, record, index) => moment(record.createdAt).format('YYYY-MM-DD hh:mm'),
    },
    {
        title: '操作',
        key: 'action',
        width: '30%',
        align: 'center',
        render: (text, record, index) => {
            return (
                <span>
                    <ModalLink to={"/App.Menu/Update/" + record.id}>修改</ModalLink>
                    <Divider type="vertical" />
                    <Dropdown overlay={actionsmenu}>
                        <Button type="link">更多<CaretDownOutlined /></Button>
                    </Dropdown>
                </span >
            )
        },
    },
];

function TableView(props) {
    const [collapse, setCollapse] = useState(false);

    if (!props.dataSource.length) return (<></>);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    };

    return (
        <>
            <Row>
                <Col span={24}>
                    <Breadcrumb style={{ margin: '15px 0px' }}>
                        <Breadcrumb.Item>应用管理</Breadcrumb.Item>
                        <Breadcrumb.Item>应用菜单</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Divider />
            </Row>


            <Row>
                <Col span={12}>
                    <Dropdown overlay={actionmenu} icon={<CaretDownOutlined />}>
                        <Button>
                            操作 <CaretDownOutlined />
                        </Button>
                    </Dropdown>
                    <Button icon={<ReloadOutlined />} type="primary" style={{ margin: 8 }} onClick={() => props.retry()}>刷新</Button>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                    <ModalLink to={"/App.Menu/Create/"}>
                        <Button icon={<PlusOutlined />} >新建</Button>
                    </ModalLink>

                    <Button type="primary" icon={<FilterOutlined />} style={{ margin: 8 }} onClick={() => { setCollapse(!collapse); }}>筛选 {collapse ? (<CaretUpOutlined />) : (<CaretDownOutlined />)} </Button>
                    <Dropdown overlay={fieldsmenu}>
                        <Button>
                            <TableOutlined /> <CaretDownOutlined />
                        </Button>
                    </Dropdown>
                </Col>
            </Row>

            <div style={{ display: collapse ? "" : "none" }}>
                <Divider dashed>筛选字段</Divider>

                <Row gutter={[16, 10]} >
                    <Col span={6} offset={3}>
                        名称: <Input style={{ maxWidth: 160 }} placeholder="Basic usage" />
                    </Col>
                    <Col span={6}>
                        备注: <Input style={{ maxWidth: 160 }} placeholder="Basic usage" />
                    </Col>
                    <Col span={6}>
                        备注: <Input style={{ maxWidth: 160 }} placeholder="Basic usage" />
                    </Col>
                </Row>

                <Row gutter={[16, 10]}>
                    <Col span={6} offset={3}>
                        名称: <Input style={{ maxWidth: 160 }} placeholder="Basic usage" />
                    </Col>
                    <Col span={6}>
                        备注: <Input style={{ maxWidth: 160 }} placeholder="Basic usage" />
                    </Col>
                    <Col span={6}>
                        备注: <Input style={{ maxWidth: 160 }} placeholder="Basic usage" />
                    </Col>
                </Row>

                <Row gutter={[16, 10]}>
                    <Col span={6} offset={8}>
                        <Button icon={<UndoOutlined />} style={{ margin: 12 }} >重置</Button>
                        <Button icon={<SearchOutlined />} type="primary" style={{ margin: 12 }} >搜索</Button>
                    </Col>
                </Row>
            </div>

            <Row>
                <Col span={24}>
                    <Divider />
                    <Table
                        columns={columns}
                        rowKey={props.rowKey}
                        rowSelection={rowSelection}
                        dataSource={props.dataSource}
                        loading={props.loading}
                    />
                </Col >
            </Row >
        </>
    );
}

function List(props) {
    const session = useContext(SessionContext);
    return (<QueryRenderer
        environment={session.environment}
        query={query}
        variables={{
            id: 1
        }}
        render={({ error, props, retry }) => {
            if (error) {
                return (
                    <div>
                        <h1>Error!</h1><br />{error.message}
                    </div>)
            }
            let d = [];
            let loading = true;
            if (props && props.menu) {
                loading = false;
                d = props.menu.children;
            }

            return <TableView
                retry={retry}
                rowKey={record => record.id}
                dataSource={d}
                loading={loading}
            />
        }}
    />);
}

export default List;