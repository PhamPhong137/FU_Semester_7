import { Edge, MindmapRespone, MindmapType, Node } from "./constant";

const response =
  'mermaid\ngraph TB\n    A[\"🏫 Đại học FPT\"]\n    B[\"📖 Ngành học\"]\n    C[\"📚 Chương trình đào tạo\"]\n    D[\"🎓 Cơ hội việc làm\"]\n    E[\"🌐 Hoạt động ngoại khóa\"]\n    \n    F[\"🖥️ Công nghệ thông tin\"]\n    G[\"📊 Quản trị kinh doanh\"]\n    H[\"🎨 Thiết kế đồ họa\"]\n    I[\"🎼 Ngành Truyền thông đa phương tiện\"]\n    J[\"📜 Kế hoạch học tập\"]\n    K[\"🚀 Dự án thực tế\"]\n    L[\"🔗 Kết nối doanh nghiệp\"]\n    M[\"💼 Thực tập\"]\n    N[\"🌍 Trao đổi sinh viên\"]\n    O[\"🎭 Câu lạc bộ\"]\n    \n    A --> B\n    A --> C\n    A --> D\n    A --> E\n    \n    B --> F\n    B --> G\n    B --> H\n    B --> I\n    \n    C --> J\n    C --> K\n    \n    D --> L\n    D --> M\n    \n    E --> N\n    E --> O\n';
export const parseData = (response: string) => {
  const formattedMermaidData = response
    .replace(/```/g, "")
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\\"/g, '"')
    .replace("mermaid\n", "")
    .replace("graph TB\n", "");

  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const nodeLevels: { [key: string]: number } = {};

  const lines = formattedMermaidData.trim().split("\n");

  lines.forEach((line: string) => {
    const nodeMatch = line.match(/(\w+)\["([^"]+)"\]/);
    if (nodeMatch) {
      const id = nodeMatch[1];

      const label = nodeMatch[2].replace(/[\u{1F600}-\u{1F6FF}]/gu, "").trim();

      nodes.push({
        id: id,
        label: label,
        level: -1,
        pos: { x: 0, y: 0 },
        text_color: "#000",
        bg_color: "#fff",
        size: { width: 120, height: 80 },
        note: "",
      });
    }

    const edgeMatch = line.match(/(\w+)\s*-->\s*(\w+)/);
    if (edgeMatch) {
      const from = edgeMatch[1];
      const to = edgeMatch[2];
      edges.push({
        id: `${from} --> ${to}`,
        from: from,
        to: to,
        name: `${from} --> ${to}`,
      });
    }
  });

  function assignLevels() {
    nodeLevels["A"] = 0;

    edges.forEach((edge) => {
      const fromLevel = nodeLevels[edge.from];
      if (fromLevel !== undefined) {
        nodeLevels[edge.to] = Math.max(
          nodeLevels[edge.to] || -1,
          fromLevel + 1
        );
      }
    });
  }

  assignLevels();

  nodes.forEach((node) => {
    node.level = nodeLevels[node.id] >= 0 ? nodeLevels[node.id] : 0;
  });

  const title = nodes[0]?.label || "";
  const prompt = title.replace(/[\u{1F600}-\u{1F6FF}]/gu, "").trim();

  const jsonData: MindmapRespone = {
    title: title,
    prompt: prompt,
    thumbnail: "",
    type: MindmapType.CREATIVE,
    nodes: nodes,
    edges: edges,
    conversation: [],
  };

  return jsonData;
};

console.log(parseData(response));
const formattedMermaidData = response
  .replace(/```/g, "")
  .replace(/\\r\\n/g, "\n")
  .replace(/\\n/g, "\n")
  .replace(/\\"/g, '"')
  .replace("mermaid\n", "")
  .replace("graph TB\n", "");

//console.log(formattedMermaidData);
