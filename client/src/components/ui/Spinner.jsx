import { useRef, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";

const Spinner = () => {
  const loadingBarRef = useRef(null);

  useEffect(() => {
    // Create a delay to ensure that the loadingBarRef is initialized
    const startLoading = setTimeout(() => {
      if (loadingBarRef.current) {
        loadingBarRef.current.continuousStart();

        // Simulating loading completion after 2 seconds
        setTimeout(() => {
          if (loadingBarRef.current) {
            loadingBarRef.current.complete();
          }
        }, 2000);
      }
    }, 0); // Small timeout ensures loadingBarRef is defined

    // Cleanup function to stop loading if component is unmounted
    return () => {
      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }
      clearTimeout(startLoading); // Clear the timeout to prevent errors
    };
  }, []);

  return (
    <>
      <LoadingBar color="#4a00ff" ref={loadingBarRef} />
    </>
  );
};

export default Spinner;
