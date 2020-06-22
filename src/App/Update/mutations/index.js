import { graphql, commitMutation } from 'react-relay';

const mutation = graphql`
  mutation mutations_UpdateMenuMutation($id: ID!, $parentid: ID!, $name: String!, $icon: String!, $order: Int!, $uri: String!, $remark: String) {
    updateMenu(id: $id, parentid: $parentid, name: $name, icon: $icon, order: $order, uri: $uri, remark: $remark) {
      id
      name
      icon
      order
      uri
      remark
    }
  }
`;


function commit(
  environment,
  id,
  parentid,
  name,
  icon,
  order,
  uri,
  remark,
  onCompleted,
  onError
) {
  return commitMutation(environment, {
    mutation,
    variables: {
      id: id,
      parentid: parentid,
      name: name,
      icon: icon,
      order: order,
      uri: uri,
      remark: remark
    },
    onCompleted: onCompleted,
    onError: onError
  }
  );
}

export default { commit };