// import React, { useEffect, useState } from "react";

// const App = () => {
//   const [imageLoaded, setImageLoaded] = useState(false);

//   useEffect(() => {
//     const img = new Image();
//     img.src = "/assets/Data/desertsImages/chocoCake.jpg";

//     img.onload = () => {
//       setImageLoaded(true);
//     };
//   }, []);

//   const backgroundImageStyle = {
//     backgroundImage: imageLoaded
//       ? `url("/assets/Data/desertsImages/chocoCake.jpg")`
//       : "none",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     height: "100vh", // Set the height to the full viewport height
//   };

//   return (
//     <div style={backgroundImageStyle}>{/* Your other content goes here */}</div>
//   );
// };

// export default App;
