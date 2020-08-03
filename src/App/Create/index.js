import React, { useContext,useState } from 'react'
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    message,
    AutoComplete,
} from 'antd';
import { SessionContext } from 'funweb-lib'
import CreateApp from "./mutations/"

const { Option } = Select;

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

var state = {
    urlplus: '',//存放url的变量
    jsonplus:'',//存放格式化后的json代码
    jsonNow:'',//当前文本框显示的json代码
};

const CreateForm = props => {      
    //调试地址输入框
    function dealInput (event) {
        //console.log(event)    // 只有通过 event 才能获得输入框输入的值 
        state.urlplus=event;        
       }
       
    //备注文本框
    function onChangeTextArea(e){
        console.log("onChangeTextArea:",e.target.value);        
        state.jsonNow=e.target.value; 
        setRemark(state.jsonNow)
        console.log("state.jsonNow111:",state.jsonNow);
    }
    
    //JSON格式转换
    function onChangeJSON(e) {
        console.log("state.jsonNow:",state.jsonNow);   
        setRemark(JSON.stringify(JSON.parse(state.jsonNow),null,4));
        state.jsonplus=JSON.stringify(JSON.parse(state.jsonNow),null,4);
        console.log("1");
        console.log('jsonNow:',state.jsonNow);
        // console.log(`checked = ${e.target.checked}`);  //es6模板字符串
    }    

    const session = useContext(SessionContext);
    props.title("创建应用信息");
    const { onCancel } = props;

    const [remark, setRemark] = useState(''); //动态写值到remark

    const onFinish = values => {
<<<<<<< HEAD
        // console.log(state.urlplus)
        // console.log("values:"+ JSON.stringify(values)) //JSON.stringify(values) 转译Object
        // return
        CreateApp.commit(session.environment, values.name, values.type, values.mode, state.urlplus, state.jsonplus, (response, errors) => {
            if (errors) {                
=======
        CreateApp.commit(session.environment, values.name, values.space, values.type, values.mode, values.url, values.remark, (response, errors) => {
            if (errors) {
>>>>>>> f17d579ac0b783aaa7c7e639d2ef9b3341fa512e
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
            <Form.Item name="space" label="应用空间" rules={[{ required: true }]}>
                <Select>
                    <Select.Option value="CORE">CORE</Select.Option>
                    <Select.Option value="SYSTEM">SYSTEM</Select.Option>
                    <Select.Option value="FRAME">FRAME</Select.Option>
                    <Select.Option value="USER">USER</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="type" label="应用类型" rules={[{ required: true }]}>
                <Select>
                    <Select.Option value="WEB">PC浏览器</Select.Option>
                    <Select.Option value="MOBILE" disabled>Mobile</Select.Option>
                    <Select.Option value="APP" disabled>APP</Select.Option>
                    <Select.Option value="SERVER">Server</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="mode" label="应用模式" rules={[{ required: true }]}>
                <Radio.Group>
                    <Radio.Button value="DEVELOPMENT">调试模式</Radio.Button>
                    <Radio.Button value="PRODUCTION">生产模式</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item name="url" label="调试地址">
                <Input.Group compact > 
                    <AutoComplete   onChange={dealInput}                      
                        style={{ width: '100%' }}                        
                        options={[{ value: 'Http://127.0.0.1:8080/main.js' }]}
                    />
                </Input.Group>                                  
            </Form.Item>
            <Form.Item name='version' label="版本">
                <Input />
            </Form.Item>            
            <Form.Item name='remark' label="备注">                
                <Input.TextArea  value={remark} onChange={onChangeTextArea} ></Input.TextArea>
                {/* <Checkbox onChange={onChangeJSON} >
                    JSON格式化
                </Checkbox> */}
                <Button type="dashed" size="small"  onClick={onChangeJSON} >JSON格式化</Button>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">创建</Button>
            </Form.Item>
        </Form>
    );
};

export default CreateForm;