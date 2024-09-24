import { useEffect, useState } from "react";
import globalStateObserver from "./globalStateObserver";
import shallowEqual from "./shallowEqual";

export type GlobalState = ReturnType<typeof globalStateObserver.getState>;

const withGlobal = <SelectedState,>(
  stateSelector: (global: GlobalState) => SelectedState
) => {
  return <Props extends object>(
    WrappedComponent: React.ComponentType<Props & SelectedState>
  ) => {
    return (props: Props) => {
      const [selectedState, setSelectedState] = useState(
        stateSelector(globalStateObserver.getState())
      );

      useEffect(() => {
        const unsubscribe = globalStateObserver.subscribe(() => {
          const newSelectedState = stateSelector(
            globalStateObserver.getState()
          );

          if (!shallowEqual(selectedState, newSelectedState))
            setSelectedState(newSelectedState);
        });

        return () => unsubscribe();
      }, [selectedState]);

      return <WrappedComponent {...props} {...selectedState} />;
    };
  };
};

export default withGlobal;
