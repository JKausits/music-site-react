import React from "react";

const PressKitDemos = () => {
  const demos = [
    {
      text: "Die a Happy Man - Thomas Rhett",
      url: "https://fb.watch/cLXqTlfHAF/",
    },
    {
      text: "Blackbird - The Beatles",
      url: "https://www.facebook.com/watch/?v=1683017641764699",
    },
    {
      text: "Castle On The Hill - Ed Sheeran",
      url: "https://www.facebook.com/watch/?v=271780113452411",
    },
  ];

  return (
    <div>
      <h3>Demos</h3>
      <br />
      <ul className="list-none">
        {demos.map((demo) => (
          <li key={demo.url} className="my-1 mx-0">
            <a href={demo.url} target="_blank" rel="noreferrer">
              {demo.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PressKitDemos;
