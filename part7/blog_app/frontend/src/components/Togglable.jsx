import { useState } from 'react';

const Togglable = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return isVisible ? (
    <div>
      {props.children}
      <button onClick={toggleVisibility}>cancel</button>
    </div>
  ) : (
    <button onClick={toggleVisibility}>{props.buttonLabel}</button>
  );
};

export default Togglable;
