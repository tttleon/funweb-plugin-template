import React, { useContext } from 'react'
import { QueryRenderer, graphql } from 'react-relay';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    message
} from 'antd';
import { SessionContext } from 'funweb-lib'
import CreateMenu from "./mutations/"

var query = graphql`
    query Create_MenuQuery(
        $id: ID!
    ) {
        menu(
            id: $id
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
    }`

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
    const { dataSource, onCancel } = props;
    const session = useContext(SessionContext);

    const onFinish = values => {
        CreateMenu.commit(session.environment, values.parentid, values.name, values.icon, values.order, values.uri, values.remark, (response, errors) => {
            if (errors) {
                message.error(errors[0].message);
            } else {
                message.success('创建菜单成功');
                if (onCancel) onCancel();
            }
        },
            (errors) => {
                message.error(errors.source.errors[0].message);
            })
    };

    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item name='parentid' label="父菜单" rules={[{ required: true }]}>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="选择父节点"
                    optionFilterProp="children"
                >
                    <Select.Option key={0} value={dataSource.id}>{dataSource.name}</Select.Option>
                    {dataSource.children && dataSource.children.map((item, index) => (<Select.Option key={index} value={item.id}>{item.name}</Select.Option>))}
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
                <Button type="primary" htmlType="submit">创建</Button>
            </Form.Item>
        </Form>
    );
};

function CreateForm(props) {
    const { onCancel } = props;
    const session = useContext(SessionContext);
    props.title("创建菜单信息");

    return (<QueryRenderer
        environment={session.environment}
        query={query}
        variables={{
            id: 1,
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
                        dataSource={props.menu}
                        onCancel={onCancel}
                    />)
            }
            return <></>
        }}
    />);
}
export default CreateForm;