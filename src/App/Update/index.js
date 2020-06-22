import React, { useContext } from 'react'
import { QueryRenderer, graphql } from 'react-relay';
import { SessionContext } from 'funweb-lib'
import {
    Form,
    Input,
    Button,
    Radio,
    message,
    Select
} from 'antd';

import UpdateMenu from "./mutations/"


var query = graphql`
    query Update_MenuQuery(
        $id: ID!
    ) {
        menu(
            id: $id
        ) {
            id
            parent{
                id
            }
            name
            icon
            order
            uri
            remark
        }

        list: menu(
            id: 1
        ) {
            id
            name
            children{
                id
                name
                icon
                order
            }
        }
    }
    `


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: '这是必填字段!',
    types: {
        email: 'Not a validate email!',
        number: 'Not a validate number!',
    },
};

const ModalForm = props => {
    const [form] = Form.useForm();
    const { dataSource, onCancel } = props;
    const session = useContext(SessionContext);
    const initialValues = {
        id: dataSource.menu.id,
        parentid: dataSource.menu.parent.id,
        name: dataSource.menu.name,
        icon: dataSource.menu.icon,
        order: dataSource.menu.order,
        uri: dataSource.menu.uri,
        remark: dataSource.menu.remark,
    }

    const onFinish = values => {
        UpdateMenu.commit(session.environment, values.id, values.parentid, values.name, values.icon, values.order, values.uri, values.remark, (response, errors) => {
            if (errors) {
                message.error(errors[0].message);
            } else {
                message.success('更新Menu成功');
                if (onCancel) onCancel();
            }
        },
            (errors) => {
                message.error(errors.source.errors[0].message);
            })
    };

    return (
        <Form {...layout} form={form} name="update-app" onFinish={onFinish} validateMessages={validateMessages} initialValues={initialValues}>
            <Form.Item name='id' label="应用ID" rules={[{ required: true }]}>
                <Input disabled />
            </Form.Item>
            <Form.Item name='parentid' label="父菜单" rules={[{ required: true }]}>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="选择父节点"
                    optionFilterProp="children"
                >
                    <Select.Option key={0} value={dataSource.list.id}>{dataSource.list.name}</Select.Option>
                    {dataSource.list.children && dataSource.list.children.map((item, index) => (<Select.Option key={index} value={item.id}>{item.name}</Select.Option>))}
                </Select>
            </Form.Item>
            <Form.Item name='name' label="菜单名称" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="icon" label="菜单ICON" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="order" label="菜单排序" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name='uri' label="菜单地址" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name='remark' label="备注">
                <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">修改</Button>
            </Form.Item>
        </Form>
    );
};

function UpdateForm(props) {
    const { onCancel } = props;
    const session = useContext(SessionContext);
    props.title("修改应用信息");
    return (<QueryRenderer
        environment={session.environment}
        query={query}
        variables={{
            id: props.params.id,
        }}
        render={({ error, props, retry }) => {
            if (error) {
                return (
                    <div>
                        <h1>Error!</h1><br />{error.message}
                    </div>)
            }
            if (props && props.menu) {
                return (
                    <ModalForm
                        dataSource={props}
                        onCancel={onCancel}
                    />)
            }
            return <></>
        }}
    />);
}

export default UpdateForm;