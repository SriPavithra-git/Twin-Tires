import React from "react";

export default class DevErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(err, info) { console.error("Boundary caught:", err, info); }
  render() {
    if (this.state.error) {
      return (
        <pre style={{whiteSpace:"pre-wrap", padding:16, color:"#fff", background:"#1b1b1b"}}>
{String(this.state.error.stack || this.state.error)}
        </pre>
      );
    }
    return this.props.children;
  }
}
