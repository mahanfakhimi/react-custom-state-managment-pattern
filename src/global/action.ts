import globalStateObserver from "./globalStateObserver";
import type { ActionPayloads } from "./types";
import { type GlobalState } from "./withGlobal";

type Actions = {
  [ActionName in keyof ActionPayloads]: (
    payload: ActionPayloads[ActionName]
  ) => void;
};

type ActionHandler<ActionName extends keyof ActionPayloads> = (
  global: GlobalState,
  actions: Actions,
  payload: ActionPayloads[ActionName]
) => GlobalState | void;

const actions = {} as Actions;

export const addActionHandler = <ActionName extends keyof ActionPayloads>(
  name: ActionName,
  handler: ActionHandler<ActionName>
) => {
  if (actions[name]) return;

  const resolvedHandler = (payload: ActionPayloads[ActionName]) => {
    const updatedState = handler(
      globalStateObserver.getState(),
      actions,
      payload
    );

    if (updatedState) globalStateObserver.setState(updatedState);
  };

  actions[name] = resolvedHandler;
};

export const getActions = () => actions;
