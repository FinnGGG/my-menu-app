import { useMemo, useState } from "react";
import "./App.css";

const menuData = {
  主食: ["米饭", "Finn Gong经典炒面", "阳春面", "牛肉丼(王亦钦爱吃)", "芝士汉堡"],
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

const recommendedItems = ["牛肉丼(王亦钦爱吃)", "洋葱烧鸡", "番茄炒蛋", "香菇炒青菜"];

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

  const chooseRandomItem = () => {
    const allItems = Object.values(menuData).flat();
    const randomItem = allItems[Math.floor(Math.random() * allItems.length)];

    setSelectedItems((prev) =>
      prev.includes(randomItem) ? prev : [...prev, randomItem]
    );
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
      <div className="bg-deco deco-1"></div>
      <div className="bg-deco deco-2"></div>

      <div className="container">
        <section className="hero-card">
          <div className="hero-text">
            <p className="tiny-label">Finn Gong's menu</p>
            <h1>芷卉 专属点菜菜单</h1>
            <p className="hero-desc">今天想吃什么</p>
          </div>

          <div className="hero-badge">每日点菜</div>
        </section>

        <section className="recommend-card">
          <div className="recommend-header">
            <h2>今日推荐</h2>
            <span>帮你快速选</span>
          </div>

          <div className="recommend-list">
            {recommendedItems.map((item) => (
              <button
                key={item}
                className={`recommend-chip ${
                  selectedItems.includes(item) ? "active-chip" : ""
                }`}
                onClick={() => toggleItem(item)}
              >
                {selectedItems.includes(item) ? "💗 " : ""}
                {item}
              </button>
            ))}
          </div>
        </section>

        <div className="layout">
          <div className="menu-section">
            {Object.entries(menuData).map(([category, items]) => (
              <section className="card" key={category}>
                <div className="section-title-row">
                  <h2>{category}</h2>
                  <span className="section-count">{items.length} 道</span>
                </div>

                <div className="grid">
                  {items.map((item) => {
                    const checked = selectedItems.includes(item);

                    return (
                      <button
                        key={item}
                        className={`menu-item ${checked ? "active" : ""}`}
                        onClick={() => toggleItem(item)}
                      >
                        <div className="menu-item-left">
                          <span className="check-circle">
                            {checked ? "✓" : ""}
                          </span>
                          <span className="dish-name">{item}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <aside className="summary-section">
            <div className="card sticky-card">
              <div className="summary-header">
                <h2>今日点单</h2>
                <p>已选择 {selectedItems.length} 道菜</p>
              </div>

              <div className="selected-box">
                {selectedItems.length === 0 ? (
                  <p className="empty-text">还没有选择菜品</p>
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
                <p className="copy-label">复制给 Finn 的文字</p>
                <pre>{orderText}</pre>
              </div>

              <div className="btn-column">
                <button className="primary-btn" onClick={copyOrder}>
                  {copied ? "已复制" : "复制点单"}
                </button>

                <button className="soft-btn" onClick={chooseRandomItem}>
                  随机帮我选一道
                </button>

                <button className="secondary-btn" onClick={resetSelection}>
                  清空重选
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}