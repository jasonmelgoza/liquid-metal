import imgAvatar from "figma:asset/5aab5459786b226d5d70e39a1dfa0e817fee1e4d.png";
import img from "figma:asset/0c8708906258b6463b8865b1414241bec0905c12.png";

const MetalApp = () => {
  return (
    <div style={{ backgroundColor: "#ffffff", width: "100%", height: "100%" }}>
      <header
        style={{
          backgroundColor: "#ffffff",
          height: "56px",
          borderBottom: "1px solid #e4e4e7",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 18px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "32px", height: "16px" }}>
            <img src={imgAvatar} alt="Logo" style={{ width: "100%", height: "100%" }} />
          </div>
          <nav style={{ display: "flex", gap: "8px" }}>
            <button style={{ fontSize: "12px", color: "#27272a", background: "none", border: "none" }}>Projects</button>
            <button style={{ fontSize: "12px", color: "#27272a", background: "none", border: "none" }}>Teams</button>
            <button style={{ fontSize: "12px", color: "#27272a", background: "none", border: "none" }}>Designs</button>
          </nav>
        </div>
        <button style={{ width: "32px", height: "32px", background: "none", border: "none" }}>
          <img src={img} alt="Sun Icon" style={{ width: "100%", height: "100%" }} />
        </button>
      </header>
      <main style={{ padding: "24px", maxWidth: "768px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "30px", fontWeight: "600", lineHeight: "38px", color: "#000000" }}>Projects</h1>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#0c5d56",
            color: "#ffffff",
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid #0c5d56",
            marginTop: "16px",
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: "600" }}>Create</span>
        </button>
        <div style={{ marginTop: "24px" }}>
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #e4e4e7",
                borderRadius: "4px",
                padding: "24px",
                marginBottom: "16px",
              }}
            >
              <h2 style={{ fontSize: "18px", fontWeight: "600", lineHeight: "28px", color: "#000000" }}>Title</h2>
              <p style={{ fontSize: "14px", lineHeight: "20px", color: "#6b7280" }}>
                Lorem ipsum dolor sit amet consectetur. Aliquam cursus risus augue quis est.
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MetalApp;
