import React, { useContext } from 'react'
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    message
} from 'antd';
import { SessionContext } from 'funweb-lib'
import CreateApp from "./mutations/"


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

const CreateForm = props => {
    const session = useContext(SessionContext);
    props.title("创建应用信息");
    const { onCancel } = props;

    const onFinish = values => {
        CreateApp.commit(session.environment, values.name, values.type, values.mode, values.url, values.remark, (response, errors) => {
            if (errors) {
                message.error(errors[0].message);
            } else {
                message.success('创建APP成功');
                if (onCancel) onCancel();
            }
        },
            (errors) => {
                message.error(errors.source.errors[0].message);
            })
    };

    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item name='name' label="应用名称" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="type" label="应用类型" rules={[{ required: true }]}>
                <Select>
                    <Select.Option value="WEB">PC浏览器</Select.Option>
                    <Select.Option value="MOBILE" disabled>Mobile</Select.Option>
                    <Select.Option value="APP" disabled>APP</Select.Option>
                    <Select.Option value="SERVER">Server</Select.Option>
                    <Radio.Button value="RESOURCE">Resource</Radio.Button>
                </Select>
            </Form.Item>
            <Form.Item name="mode" label="应用模式" rules={[{ required: true }]}>
                <Radio.Group>
                    <Radio.Button value="DEVELOPMENT">调试模式</Radio.Button>
                    <Radio.Button value="PRODUCTION">生产模式</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item name='url' label="调试地址">
                <Input />
            </Form.Item>
            {/* <Form.Item name='version' label="版本">
                <Input />
            </Form.Item> */}
            <Form.Item name='remark' label="备注">
                <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">创建</Button>
            </Form.Item>
        </Form>
    );
};

export default CreateForm;