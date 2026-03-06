console.log("🚀 插件已尝试注入...");

function init() {
    // 防止重复注入
    if (document.getElementById("my-custom-btn")) return;

    const btn = document.createElement("button");
    btn.id = "my-custom-btn";
    btn.innerText = "🔍 抓取结构";
    // 稍微改下样式，确保它在最顶层且显眼
    Object.assign(btn.style, {
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: "10000",
        padding: "12px 20px",
        backgroundColor: "#2ecc71",
        color: "white",
        fontWeight: "bold",
        border: "2px solid white",
        borderRadius: "8px",
        cursor: "pointer",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
    });
    function getFinalFileName() {
        // 1. 抓取课程名
        //const course = document.querySelector('.d2l-navigation-s-header-text')?.innerText.trim() || "Unknown_Course";
        const course = document.querySelector('div.d2l-navigation-s-title-container').innerText;
        // 2. 抓取面包屑路径 (处理 Shadow DOM)
        const breadcrumbs = Array.from(document.querySelectorAll('d2l-breadcrumb')).map(host => {
            return host.shadowRoot?.querySelector('a')?.innerText.trim() || "";
        }).filter(t => t !== "")
            .slice(1);
        const folderPath = breadcrumbs.join("_"); // 用下划线连接路径

        // 3. 抓取当前页面标题
        const fileTitle = document.querySelector('h1.d2l-page-title')?.innerText.trim() || "Document";

        // 拼接成最终文件名 (去掉非法字符)
        const rawName = `${course} - ${folderPath} - ${fileTitle}`;
        return rawName.replace(/[\\/:*?"<>|]/g, "_"); // 替换掉 Windows 不允许作为文件名的字符
    }

    // 按钮点击时
    btn.onclick = () => {
        const finalName = getFinalFileName();
        console.log("📂 预想的文件路径/名称为:", finalName);
        alert("建议文件名已生成，请在 Console 查看");
    };

    document.body.appendChild(btn);
    console.log("✅ 按钮注入成功！");
}

// 考虑到 Brightspace 的动态加载，每隔 2 秒检查一次按钮是否存在
setInterval(init, 2000);