export const ProductDescription = {item,childPropFunction} => {
  let { item: is } = item;
  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 2,
          marginBottom: 10,
          justifyContent: "space-between",
          backgroundColor: "whitesmoke",
        }}
      >
        <div style={{ textAlign: "left", paddingLeft: 10 }}>
          <h4>{is.title ?? "no brand"}</h4>
          <p style={{ width: "70%" }}>{is.description}</p>
        </div>
        <div
          style={{
            textAlign: "right",
            display: "flex",
            alignItems: "center",
            boxShadow: "0 2px 12px orange",
            opacity: 0.9,
            cursor: "pointer",
            margin:10,
            //outline:'none'
          }}
        >
          <img src={is.images[0]} width={100} height={100} />
        </div>
      </div>
    </div>
  );
};
