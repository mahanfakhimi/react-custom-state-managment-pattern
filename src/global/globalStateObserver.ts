type Listener = () => void;

class GlobalStateObserver<InitialState> {
  private state: InitialState;
  private listeners: Listener[] = [];

  constructor(initialState: InitialState) {
    this.state = initialState;
  }

  getState() {
    return this.state;
  }

  setState(newState: Partial<InitialState>) {
    this.state = { ...this.state, ...newState };
    this.notifyListeners();
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener);
    return () => this.unsubscribe(listener);
  }

  unsubscribe(listener: Listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }
}

const globalStateObserver = new GlobalStateObserver({
  count: 0,
  searchQuery: "",
  users: ["user1", "user2", "user3"],
});

export default globalStateObserver;
