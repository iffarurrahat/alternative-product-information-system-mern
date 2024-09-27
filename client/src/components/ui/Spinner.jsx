import { useRef, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";

const Spinner = () => {
  const loadingBarRef = useRef(null);

  useEffect(() => {
    loadingBarRef.current.continuousStart();

    setTimeout(() => {
      loadingBarRef.current.complete();
    }, 2000);
  }, []);

  return (
    <>
      <LoadingBar color="#4a00ff" ref={loadingBarRef} />
    </>
  );
};

export default Spinner;
