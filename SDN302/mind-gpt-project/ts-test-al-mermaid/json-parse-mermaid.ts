const nodes = [
  {
    id: "A",
    label: "📘 Vật lý 12",
    level: 0,
    pos: {
      x: 0,
      y: 0,
    },
    text_color: "#000",
    bg_color: "#fff",
    size: {
      width: 120,
      height: 80,
    },
    note: "",
  },
  {
    id: "B",
    label: "⚛️ Cơ học",
    level: 1,
    pos: {
      x: 0,
      y: 0,
    },
    text_color: "#000",
    bg_color: "#fff",
    size: {
      width: 120,
      height: 80,
    },
    note: "",
  },
  {
    id: "C",
    label: "⚡ Điện từ",
    level: 1,
    pos: {
      x: 0,
      y: 0,
    },
    text_color: "#000",
    bg_color: "#fff",
    size: {
      width: 120,
      height: 80,
    },
    note: "",
  },
  {
    id: "D",
    label: "🌌 Quang học",
    level: 1,
    pos: {
      x: 0,
      y: 0,
    },
    text_color: "#000",
    bg_color: "#fff",
    size: {
      width: 120,
      height: 80,
    },
    note: "",
  },
  {
    id: "E",
    label: "🔄 Động lực học",
    level: 2,
    pos: {
      x: 0,
      y: 0,
    },
    text_color: "#000",
    bg_color: "#fff",
    size: {
      width: 120,
      height: 80,
    },
    note: "",
  },
  {
    id: "F",
    label: "💡 Tĩnh điện",
    level: 2,
    pos: {
      x: 0,
      y: 0,
    },
    text_color: "#000",
    bg_color: "#fff",
    size: {
      width: 120,
      height: 80,
    },
    note: "",
  },
  {
    id: "G",
    label: "🌀 Từ trường",
    level: 2,
    pos: {
      x: 0,
      y: 0,
    },
    text_color: "#000",
    bg_color: "#fff",
    size: {
      width: 120,
      height: 80,
    },
    note: "",
  },
  {
    id: "H",
    label: "🧬 Sóng điện từ",
    level: 2,
    pos: {
      x: 0,
      y: 0,
    },
    text_color: "#000",
    bg_color: "#fff",
    size: {
      width: 120,
      height: 80,
    },
    note: "",
  },
  {
    id: "I",
    label: "🌈 Hình học ánh sáng",
    level: 0,
    pos: {
      x: 0,
      y: 0,
    },
    text_color: "#000",
    bg_color: "#fff",
    size: {
      width: 120,
      height: 80,
    },
    note: "",
  },
  {
    id: "J",
    label: "🔭 Thuyết tương đối",
    level: 2,
    pos: {
      x: 0,
      y: 0,
    },
    text_color: "#000",
    bg_color: "#fff",
    size: {
      width: 120,
      height: 80,
    },
    note: "",
  },
  {
    id: "K",
    label: "📊 Động lực học chất điểm",
    level: 2,
    pos: {
      x: 0,
      y: 0,
    },
    text_color: "#000",
    bg_color: "#fff",
    size: {
      width: 120,
      height: 80,
    },
    note: "",
  },
  {
    id: "L",
    label: "🎛️ Định luật Faraday",
    level: 3,
    pos: {
      x: 0,
      y: 0,
    },
    text_color: "#000",
    bg_color: "#fff",
    size: {
      width: 120,
      height: 80,
    },
    note: "",
  },
  {
    id: "M",
    label: "🔗 Lực từ",
    level: 3,
    pos: {
      x: 0,
      y: 0,
    },
    text_color: "#000",
    bg_color: "#fff",
    size: {
      width: 120,
      height: 80,
    },
    note: "",
  },
  {
    id: "N",
    label: "🌠 Gương và thấu kính",
    level: 2,
    pos: {
      x: 0,
      y: 0,
    },
    text_color: "#000",
    bg_color: "#fff",
    size: {
      width: 120,
      height: 80,
    },
    note: "",
  },
  {
    id: "O",
    label: "Cơ học vũ trụ",
    level: 2,
    pos: {
      x: 0,
      y: 0,
    },
    text_color: "#000",
    bg_color: "#fff",
    size: {
      width: 120,
      height: 80,
    },
    note: "",
  },
];
const edges = [
  {
    id: "A --> B",
    from: "A",
    to: "B",
    name: "A --> B",
  },
  {
    id: "A --> C",
    from: "A",
    to: "C",
    name: "A --> C",
  },
  {
    id: "A --> D",
    from: "A",
    to: "D",
    name: "A --> D",
  },
  {
    id: "B --> E",
    from: "B",
    to: "E",
    name: "B --> E",
  },
  {
    id: "B --> K",
    from: "B",
    to: "K",
    name: "B --> K",
  },
  {
    id: "C --> F",
    from: "C",
    to: "F",
    name: "C --> F",
  },
  {
    id: "C --> G",
    from: "C",
    to: "G",
    name: "C --> G",
  },
  {
    id: "C --> H",
    from: "C",
    to: "H",
    name: "C --> H",
  },
  {
    id: "D --> N",
    from: "D",
    to: "N",
    name: "D --> N",
  },
  {
    id: "D --> O",
    from: "D",
    to: "O",
    name: "D --> O",
  },
  {
    id: "D --> J",
    from: "D",
    to: "J",
    name: "D --> J",
  },
  {
    id: "E --> L",
    from: "E",
    to: "L",
    name: "E --> L",
  },
  {
    id: "E --> M",
    from: "E",
    to: "M",
    name: "E --> M",
  },
];

function convertToMermaid(nodes: any, edges: any) {
  let mermaidGraph = "mermaid\ngraph TB\n";

  nodes.forEach((node: any) => {
    const { id, label } = node;
    mermaidGraph += `${id}["${label}"]\n`;
  });

  edges.forEach((edge: any) => {
    const { from, to } = edge;
    mermaidGraph += `${from} --> ${to}\n`;
  });

  return mermaidGraph;
}

// Convert and print Mermaid syntax
const mermaidSyntax = convertToMermaid(nodes, edges);
console.log(mermaidSyntax);
