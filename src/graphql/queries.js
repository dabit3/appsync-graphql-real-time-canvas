// eslint-disable
// this is an auto generated file. This will be overwritten

export const getCanvas = `query GetCanvas($id: ID!) {
  getCanvas(id: $id) {
    id
    clientId
    data
  }
}
`;
export const listCanvass = `query ListCanvass(
  $filter: ModelCanvasFilterInput
  $limit: Int
  $nextToken: String
) {
  listCanvass(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      clientId
      data
    }
    nextToken
  }
}
`;
