import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation CreateTask($user_id: UUID!, $name: String!, $rrule: String!) {
    insertIntotasksCollection(
      objects: { user_id: $user_id, name: $name, rrule: $rrule }
    ) {
      affectedCount
      records {
        id
        user_id
        name
        rrule
      }
    }
  }
`;
