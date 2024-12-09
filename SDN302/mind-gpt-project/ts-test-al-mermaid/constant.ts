export enum MindmapType {
  CREATIVE = "creative",
  SUMMARY = "summary",
}

export enum LLMModel {
  GPT_4o = "gpt-4o",
  GPT_4o_mini = "gpt-4o-mini",
}

export enum DocumentType {
  PDF = "pdf",
}

export enum AtributeNode {
  X = 0,
  Y = 0,
  TEXT_COLOR = "#000",
  BG_COLOR = "#fff",
  SIZE_WIDTH = 120,
  SIZE_HEIGHT = 80,
}

export enum RoleChat {
  USER = "user",
  AI = "ai",
}
export interface Document {
  type: DocumentType;
  url: string;
}
export interface Node {
  id: string;
  label: string;
  level: number;
  pos: {
    x: number;
    y: number;
  };
  text_color: string;
  bg_color: string;
  size: {
    width: number;
    height: number;
  };
  note: string;
}
export interface Edge {
  id: string;
  from: string;
  to: string;
  name: string;
}
export interface Conversation {
  role: RoleChat;
  content: string;
}
export interface MindmapRespone {
  title: string;
  thumbnail: string;
  prompt: string;
  document?: Document;
  type: MindmapType;
  nodes: Node[];
  edges: Edge[];
  conversation: Conversation[];
}
export interface CreateMindmapRequest {
  llm: LLMModel;
  type: MindmapType;
  prompt: string;
  depth: number;
  child: number;
}

export const enum TypeSelectAnswer {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
}

export interface Quiz {
  question: string;
  answers: { key: string; value: string }[];
  correctAnswer: string;
}


