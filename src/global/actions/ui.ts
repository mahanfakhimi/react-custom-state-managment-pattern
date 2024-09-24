import { addActionHandler } from "../action";

addActionHandler("incrementCount", (global, _actions, payload) => {
  global.count += payload.value;
  return global;
});

addActionHandler("decrementCount", (global, _actions, payload) => {
  global.count -= payload.value;
  return global;
});
