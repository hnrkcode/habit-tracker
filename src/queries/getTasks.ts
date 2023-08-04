import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query GetTasks {
    tasksCollection {
      edges {
        node {
          id
          name
          rrule
          completed_tasksCollection {
            edges {
              node {
                task_id
                completion_date
              }
            }
          }
          subtasksCollection {
            edges {
              node {
                id
                task_id
                name
                completed_subtasksCollection {
                  edges {
                    node {
                      subtask_id
                      completion_date
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
