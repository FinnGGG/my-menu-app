import { useMemo, useState } from "react";
import "./App.css";

const menuData = {
  主食: ["米饭", "Finn Gong经典炒面", "阳春面", "牛肉丼", "芝士汉堡"],
  鸡肉类: ["洋葱烧鸡", "蘑菇烧鸡"],
  肉类: ["小炒牛肉", "葱烧牛肉", "孜然土豆牛肉", "辣椒炒肉", "锅包肉"],
  蔬菜豆腐类: [
    "香菇炒青菜",
    "素炒上海青",
    "清炒丝瓜",
    "家常豆腐",
    "青菜烧豆泡",
    "豆腐烧青菜",
    "家烧青菜",
    "风味茄子",
    "地三鲜",
    "干锅土豆片"
  ],
  蛋类: ["公瑾爆蛋", "番茄炒蛋", "虾仁蒸蛋", "爆炒鸡蛋午餐肉"],
  特色菜: ["咸蛋黄豆腐虾"]
};

export default function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [copied, setCopied] = useState(false);

  const toggleItem = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const resetSelection = () => {
    setSelectedItems([]);
    setCopied(false);
  };

  const orderText = useMemo(() => {
    if (selectedItems.length === 0) {
      return "今天还没有选菜";
    }
    return `今天想吃：\n${selectedItems.join("、")}`;
  }, [selectedItems]);

  const copyOrder = async () => {
    try {
      await navigator.clipboard.writeText(orderText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      alert("复制失败，可以手动复制文字");
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="header-card">
          <h1>专属点菜菜单</h1>
          <p>选好今天想吃的菜，我就照着做。</p>
        </div>

        <div className="layout">
          <div className="menu-section">
            {Object.entries(menuData).map(([category, items]) => (
              <div className="card" key={category}>
                <h2>{category}</h2>
                <div className="grid">
                  {items.map((item) => {
                    const checked = selectedItems.includes(item);
                    return (
                      <button
                        key={item}
                        className={`menu-item ${checked ? "active" : ""}`}
                        onClick={() => toggleItem(item)}
                      >
                        <span className="check">{checked ? "✅" : "⬜"}</span>
                        <span>{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="summary-section">
            <div className="card sticky">
              <h2>今日点单</h2>
              <p className="count">已选择 {selectedItems.length} 道</p>

              <div className="selected-box">
                {selectedItems.length === 0 ? (
                  <p className="empty">还没有选择菜品</p>
                ) : (
                  <div className="tag-list">
                    {selectedItems.map((item) => (
                      <span className="tag" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="copy-box">
                <p className="label">复制给对方的文字</p>
                <pre>{orderText}</pre>
              </div>

              <div className="btn-row">
                <button className="primary-btn" onClick={copyOrder}>
                  {copied ? "已复制" : "复制点单"}
                </button>
                <button className="secondary-btn" onClick={resetSelection}>
                  清空
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}