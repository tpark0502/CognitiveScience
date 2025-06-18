import React, { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  MiniMap,
} from "react-flow-renderer";
import styles from "./MindMapStyles.module.css";

const N = 8;
const mid_x = (window.innerWidth * 0.9) / 2;
const mid_y = (window.innerHeight * 0.7) / 2;
const radius = 200;

function getNodes(answers) {
  return answers.map((answer, i) => {
    const angle = (2 * Math.PI * i) / answers.length;
    return {
      id: `${i + 1}`,
      data: { label: answer },
      position: {
        x: mid_x + radius * Math.cos(angle),
        y: mid_y + radius * Math.sin(angle),
      },
    };
  });
}

const edges = Array.from({ length: N }, (_, i) => {
  return {
    id: `e1-${i + 1}`,
    source: "1",
    target: `${i + 1}`,
  };
}).slice(1);

function MindMap({ answers, rootTitle }) {
  const nodes = getNodes(answers);
  return (
    <div className={styles.container}>
      <div className={styles.reactFlowBox}>
        <ReactFlow nodes={nodes} edges={edges} />
      </div>
    </div>
  );
}

export default MindMap;
