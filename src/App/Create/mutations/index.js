import { graphql, commitMutation } from 'react-relay';

const mutation = graphql`
  mutation mutations_CreateAppMutation($name: String!, $type: AppType!, $mode: AppMode!, $url: String, $remark: String) {
    createApp(name: $name, type: $type, mode: $mode, url: $url, remark: $remark) {
      id
      name
      type
      mode
      url
      package{
       version
      }
      remark
    }
  }
`;

function commit(
  environment,
  name,
  type,
  mode,
  url,
  remark,
  onCompleted,
  onError
) {
  return commitMutation(environment, {
    mutation,
    variables: {
      name: name,
      type: type,
      mode: mode,
      url: url,
      remark: remark
    },
    onCompleted: onCompleted,
    onError: onError
  }
  );
}

export default { commit };