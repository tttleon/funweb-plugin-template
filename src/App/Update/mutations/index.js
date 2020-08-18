import { graphql, commitMutation } from 'react-relay';

const mutation = graphql`
  mutation mutations_UpdateAppMutation($id:ID!, $name: String!, $space: AppSpace!, $type: AppType!, $config: String!, $mode: AppMode!, $url: String, $packageid: ID, $remark: String) {
    app{
      app(id: $id){
        action{
          update(name: $name, space: $space, type: $type, config: $config, mode: $mode, url: $url, packageid: $packageid, remark: $remark) {
            id
            name
            space
            type
            config
            mode
            url
            package{
              version
            }
            remark
          }
        }
      }
    }
  }
`;

function commit(
  environment,
  id,
  name,
  space,
  type,
  config,
  mode,
  url,
  packageid,
  remark,
  onCompleted,
  onError
) {
  return commitMutation(environment, {
    mutation,
    variables: {
      id: id,
      name: name,
      space: space,
      type: type,
      config: config,
      mode: mode,
      url: url,
      packageid: packageid,
      remark: remark
    },
    onCompleted: onCompleted,
    onError: onError
  }
  );
}

export default { commit };