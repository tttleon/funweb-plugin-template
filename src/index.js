import React from "react";
import { Button } from 'antd';
import app from './App'
import './index.css'



let Hello = () => {
    return <div>
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <br />
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>

        <br />
        <div id="cssdemo">css test</div>

    </div>;
};

export default {
    Hello: Hello,
    App: app
};

