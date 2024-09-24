import withGlobal from "./global/withGlobal";
import { getActions } from "./global/action";

type CounterProps = {
  title: string;
};

const Counter = withGlobal(({ count }) => ({ count }))<CounterProps>(
  ({ count, title }) => {
    const { incrementCount, decrementCount } = getActions();

    const handleChangeCount = (isDecrement: boolean = false) =>
      isDecrement
        ? decrementCount({ value: 10 })
        : incrementCount({ value: 5 });

    return (
      <div>
        <h1>
          {title} = {count}
        </h1>

        <button onClick={() => handleChangeCount()}>increment</button>
        <button onClick={() => handleChangeCount(true)}>decrement</button>
      </div>
    );
  }
);

const Users = withGlobal(({ users }) => ({ users }))(({ users }) => {
  console.log("re render");

  return (
    <div>
      {users.map((user, index) => (
        <p key={index}>{user}</p>
      ))}
    </div>
  );
});

const App = () => {
  return (
    <div>
      <Counter title="counter #1" />
      <Users />
    </div>
  );
};

export default App;
