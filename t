[1mdiff --git a/src/App.tsx b/src/App.tsx[m
[1mindex ea00909..8818fc4 100644[m
[1m--- a/src/App.tsx[m
[1m+++ b/src/App.tsx[m
[36m@@ -13,8 +13,7 @@[m [mimport { TasksType, TaskType } from "./types/common";[m
 [m
 export default function App() {[m
   const [tasks, setTasks] = useState<TasksType>(initialTasks);[m
[31m-  const [showModal, setShowModal] = useState(false);[m
[31m-  const [modalAction, setModalAction] = useState("create");[m
[32m+[m[32m  const [modalAction, setModalAction] = useState("closed");[m
   const [editTaskId, setEditTaskId] = useState("");[m
   const [selectedDate, setSelectedDate] = useState([m
     dayjs().format("YYYY-MM-DD")[m
[36m@@ -34,13 +33,12 @@[m [mexport default function App() {[m
   });[m
 [m
   function handleModal(action: string) {[m
[31m-    setShowModal(!showModal);[m
     setModalAction(action);[m
   }[m
 [m
   function handleCreateTask(task: TaskType) {[m
     setTasks((prevTasks) => [...prevTasks, task]);[m
[31m-    setShowModal(!showModal);[m
[32m+[m[32m    setModalAction("closed");[m
   }[m
 [m
   function handleEditTask(task: TaskType) {[m
[36m@@ -56,12 +54,12 @@[m [mexport default function App() {[m
       )[m
     );[m
 [m
[31m-    setShowModal(!showModal);[m
[32m+[m[32m    setModalAction("closed");[m
   }[m
 [m
   function handleDeleteTask(taskId: string) {[m
     setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));[m
[31m-    setShowModal(!showModal);[m
[32m+[m[32m    setModalAction("closed");[m
   }[m
 [m
   function handleOpenCreateModal() {[m
[36m@@ -74,7 +72,7 @@[m [mexport default function App() {[m
   }[m
 [m
   function handleCloseModal() {[m
[31m-    setShowModal(!showModal);[m
[32m+[m[32m    setModalAction("closed");[m
   }[m
 [m
   function handleTaskCheckbox(id: string) {[m
[36m@@ -157,7 +155,7 @@[m [mexport default function App() {[m
         onSubtaskCheckbox={handleSubTaskCheckbox}[m
         onEditTask={handleOpenEditModal}[m
       />[m
[31m-      <Modal isOpen={showModal} onClose={handleCloseModal}>[m
[32m+[m[32m      <Modal isOpen={modalAction !== "closed"} onClose={handleCloseModal}>[m
         {modalAction === "create" && ([m
           <NewTaskForm onSave={handleCreateTask} onCancel={handleCloseModal} />[m
         )}[m
