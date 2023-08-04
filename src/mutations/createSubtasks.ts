import { gql } from "@apollo/client";

export const CREATE_SUBTASKS = gql`
  mutation InsertMultipleSubtasks($subtasks: [subtasksInsertInput!]!) {
    insertIntosubtasksCollection(objects: $subtasks) {
      affectedCount
      records {
        id
        user_id
        task_id
        name
      }
    }
  }
`;
