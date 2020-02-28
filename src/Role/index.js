import React from 'react';
import {
    Breadcrumb,
    Table,
    Divider,
    Input,
    Button,
    Tag
} from 'antd';

import {
    Link
} from "react-router-dom";

import { fetchQuery, QueryRenderer, graphql } from 'react-relay';

const { Search } = Input;

const columns = [
    { title: '角色名称2', dataIndex: 'role', key: 'role' },
    {
        title: '操作',
        key: 'more',
        dataIndex: 'more',
        render: (more, record) => (<Link to={"/Account/Detil/" + record.id}>编辑</Link>),
    },
];

const query = graphql`
query Role_RoleQuery(
    $first: Int
    $skip: Int,
) {
    authoritys(
        first: $first
        skip: $skip
    ) {
        totalCount
        edges {
          role
        }
    }
}`

class TableView extends React.Component {
    state = {
        environment: this.props.environment,
        data: this.props.authoritys.edges.map(function (edge, index) {
            return {
                "role": edge.role,
                "key": index
            }
        }),
        pagination: {
            total: this.props.authoritys.totalCount
        },
        loading: false,
    };

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        console.log(pagination, filters, sorter)
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });

        fetchQuery(this.state.environment, query, {
            first: 10,
            skip: pagination.current * 10 - 10
        }).then(data => {
            this.setState({
                loading: false,
                data: data.authoritys.edges.map(function (edge, index) {
                    return {
                        "role": edge.role,
                        "key": index
                    }
                })
            });
        });
    };
    render() {
        return (
            <>
                <Breadcrumb style={{ margin: '15px 0px' }}>
                    <Breadcrumb.Item>系统设置</Breadcrumb.Item>
                    <Breadcrumb.Item>角色管理</Breadcrumb.Item>
                </Breadcrumb>
                <Divider />
                <Link to={"/Service/Create"}>
                    <Button icon="plus" type="primary" style={{ marginBottom: 16 }} >新建</Button>
                </Link>
                <Table
                    columns={columns}
                    rowKey={record => record.key}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                />
            </>
        );
    }
}

function List(props) {
    const environment = props.environment;
    return (<QueryRenderer
        environment={environment}
        query={query
        }
        variables={{
            count: 10,
            skip: 0
        }}
        render={({ error, props, retry }) => {
            if (error) {
                return (
                    <div>
                        <h1>Error!</h1><br />{error.message}
                    </div>)
            } else if (props) {
                if (props.authoritys) {
                    return <TableView environment={environment} authoritys={props.authoritys} />
                }
            }
            return <div>Loading</div>;
        }}
    />);
}

export default List;