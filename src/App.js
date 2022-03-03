import React , {useState , useEffect ,useCallback}from 'react'
import NewTodo from './components/NewTodo'
import './App.css'
import TodoList from './components/TodoList'
const dataTodo = [
  {
    id: 1,
    task: "Give dog a bath",
  },
  {
    id: 2,
    task: "Do laundry",
  },
  {
    id: 3,
    task: "Vacuum floor",
  },
  {
    id: 4,
    task: "Feed cat",
  },
  {
    id: 5,
    task: "Change light bulbs",
  },
];

function App() {
  const [AddItem, setAddItem] = useState(dataTodo);
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState(null);
     const addTodoHandler = useCallback(async () => {
       setIsLoading(true);
       setError(null);
       try {
         const response = await fetch("/todos");
         if (!response.ok) {
           throw new Error("Something went wrong!");
         }

         const data = await response.json();

         const transformm = data.results.map((data) => {
           return {
             id: data.id,
             title: data.title,
           };
         });
         setAddItem(transformm);
       } catch (error) {
         setError(error.message);
       }
       setIsLoading(false);
     }, []);

     useEffect(() => {
       addTodoHandler();
     }, [addTodoHandler]);

     let content = <p>Found no data.</p>;

     if (AddItem.length > 0) {
       content = <TodoList data={AddItem} />;
     }

     if (error) {
       content = <p>{error}</p>;
     }

     if (isLoading) {
       content = <p>Loading...</p>;
     }


//    setAddItem((prevItem) => {
//      return [item, ...prevItem];
//    });
//  };

 //GET Req

//  useEffect(() => {
//    fetch("/todos")
//      .then((response) => response.json())
     
//      .then((responseData) => {
//        const loadedItems = [];
//        for (const key in responseData) {
//          loadedItems.push({
//            id: key,
//           //  title: responseData[key].title,
//          });
//        }
//        setAddItem(loadedItems);
//      });
//  }, [AddItem]);



//  useEffect(() => {
//    console.log("TODOS", AddItem);
//  }, [AddItem]);

        
  const deleteItem = (id) => {
    console.log(id);
    const updatedItem = AddItem.filter((item) => {
      return item.id !== id;
    });
    setAddItem(updatedItem);
  };

  return (
    <div className="App-header">
      <TodoList detail={AddItem} onDelete={deleteItem} />
      <NewTodo onAddTodo={addTodoHandler} />
    </div>
  );
}

export default App