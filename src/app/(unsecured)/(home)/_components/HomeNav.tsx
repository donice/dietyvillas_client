import React from "react";

const HomeNav = ({ data, loading }: { data: any; loading: boolean }) => {
  return (
    console.log("data", data),
    (
      <div>
        {data?.resp_code == "00" ? (
          <div className="flex items-center justify-center">
            {data?.data.map((category: {
              id: string;
              title: string;
            }) => (
              <div key={category.id} className="">
                <h2>{category.title}</h2>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {loading ? <p>Loading...</p> : <p>{data?.resp_description}</p>}
            {data?.resp_code !== "00" && <p>Error: {data?.resp_description}</p>}
          </div>
        )}
      </div>
    )
  );
};

export default HomeNav;
