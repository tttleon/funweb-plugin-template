import React from "react";
import { Button } from 'antd';
import List from "./List";

let Hello = () => {
    return <div>
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <br />
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
    </div>;
};

export default {
    Hello: Hello,
    List: List
};

