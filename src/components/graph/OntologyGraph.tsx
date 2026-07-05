import { useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line, Text, Billboard } from "@react-three/drei";
import {
  graphNodes,
  graphEdges,
  computeLayout,
  NODE_COLORS,
  NODE_TYPES,
  type GraphNode,
  type Vec3,
} from "@/data/ontologyGraph";

// ----- shared geometry -------------------------------------------------------

function useGraph() {
  return useMemo(() => {
    const raw = computeLayout(graphNodes, graphEdges);

    // Center the layout on the origin.
    const ids = Object.keys(raw);
    const c: Vec3 = [0, 0, 0];
    ids.forEach(id => {
      c[0] += raw[id][0];
      c[1] += raw[id][1];
      c[2] += raw[id][2];
    });
    c[0] /= ids.length;
    c[1] /= ids.length;
    c[2] /= ids.length;
    const positions: Record<string, Vec3> = {};
    ids.forEach(id => {
      positions[id] = [raw[id][0] - c[0], raw[id][1] - c[1], raw[id][2] - c[2]];
    });

    // Adjacency + degree.
    const neighbors: Record<string, Set<string>> = {};
    graphNodes.forEach(n => (neighbors[n.id] = new Set()));
    graphEdges.forEach(e => {
      neighbors[e.source].add(e.target);
      neighbors[e.target].add(e.source);
    });
    const degree: Record<string, number> = {};
    graphNodes.forEach(n => (degree[n.id] = neighbors[n.id].size));

    return { positions, neighbors, degree };
  }, []);
}

// ----- nodes -----------------------------------------------------------------

interface NodeMeshProps {
  node: GraphNode;
  position: Vec3;
  radius: number;
  dim: boolean;
  highlighted: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}

function NodeMesh({
  node,
  position,
  radius,
  dim,
  highlighted,
  onHover,
  onSelect,
}: NodeMeshProps) {
  const color = NODE_COLORS[node.type];
  return (
    <group position={position}>
      <mesh
        onPointerOver={e => {
          e.stopPropagation();
          onHover(node.id);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          onHover(null);
          document.body.style.cursor = "auto";
        }}
        onClick={e => {
          e.stopPropagation();
          onSelect(node.id);
        }}
      >
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={highlighted ? 1.4 : 0.55}
          transparent
          opacity={dim ? 0.18 : 1}
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>
      <Billboard>
        <Text
          position={[0, radius + 0.5, 0]}
          fontSize={highlighted ? 0.62 : 0.5}
          color={highlighted ? "#ffffff" : "#c9d2e3"}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#05060a"
          fillOpacity={dim ? 0.12 : 1}
        >
          {node.label}
        </Text>
      </Billboard>
    </group>
  );
}

// ----- scene -----------------------------------------------------------------

interface SceneProps {
  active: string | null;
  selected: string | null;
  setHovered: (id: string | null) => void;
  setSelected: (id: string) => void;
}

function Scene({ active, selected, setHovered, setSelected }: SceneProps) {
  const { positions, neighbors, degree } = useGraph();

  const activeSet = useMemo(() => {
    if (!active) return null;
    const s = new Set<string>([active]);
    neighbors[active].forEach(n => s.add(n));
    return s;
  }, [active, neighbors]);

  return (
    <>
      <color attach="background" args={["#05060a"]} />
      <fog attach="fog" args={["#05060a", 20, 46]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[15, 15, 15]} intensity={80} />
      <pointLight position={[-15, -10, -10]} intensity={40} color="#4f9dff" />

      {graphEdges.map((e, i) => {
        const incident =
          !activeSet || (activeSet.has(e.source) && activeSet.has(e.target));
        const touchesActive =
          active && (e.source === active || e.target === active);
        return (
          <Line
            key={i}
            points={[positions[e.source], positions[e.target]]}
            color={touchesActive ? "#8ab4ff" : "#26304d"}
            lineWidth={touchesActive ? 1.6 : 0.8}
            transparent
            opacity={activeSet && !incident ? 0.05 : incident ? 0.9 : 0.35}
          />
        );
      })}

      {graphNodes.map(node => {
        const dim = Boolean(activeSet && !activeSet.has(node.id));
        const highlighted = Boolean(node.id === active || node.id === selected);
        const radius = 0.42 + Math.min(degree[node.id], 12) * 0.055;
        return (
          <NodeMesh
            key={node.id}
            node={node}
            position={positions[node.id]}
            radius={radius}
            dim={dim}
            highlighted={highlighted}
            onHover={setHovered}
            onSelect={setSelected}
          />
        );
      })}

      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        enablePan={false}
        minDistance={10}
        maxDistance={44}
        autoRotate={!selected}
        autoRotateSpeed={0.55}
      />
    </>
  );
}

// ----- detail panel ----------------------------------------------------------

function DetailPanel({
  nodeId,
  onClose,
}: {
  nodeId: string;
  onClose: () => void;
}) {
  const node = graphNodes.find(n => n.id === nodeId)!;
  const color = NODE_COLORS[node.type];
  const byId = (id: string) => graphNodes.find(n => n.id === id)!;
  const outgoing = graphEdges
    .filter(e => e.source === nodeId)
    .map(e => ({ rel: e.label, other: byId(e.target) }));
  const incoming = graphEdges
    .filter(e => e.target === nodeId)
    .map(e => ({ rel: e.label, other: byId(e.source) }));
  const connections = [...outgoing, ...incoming];

  return (
    <div
      style={{
        position: "absolute",
        top: "1.25rem",
        right: "1.25rem",
        width: "min(20rem, calc(100vw - 2.5rem))",
        maxHeight: "calc(100vh - 2.5rem)",
        overflowY: "auto",
        background: "rgba(10, 12, 20, 0.92)",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: "0.75rem",
        padding: "1rem 1.1rem",
        color: "#e8ecf4",
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "0.5rem",
        }}
      >
        <div>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color,
            }}
          >
            <span
              style={{
                width: "0.55rem",
                height: "0.55rem",
                borderRadius: "9999px",
                background: color,
                display: "inline-block",
              }}
            />
            {node.type}
          </span>
          <h3 style={{ margin: "0.35rem 0 0", fontSize: "1.05rem" }}>
            {node.label}
          </h3>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            border: "1px solid rgba(255,255,255,0.2)",
            background: "transparent",
            color: "#e8ecf4",
            borderRadius: "9999px",
            width: "1.75rem",
            height: "1.75rem",
            cursor: "pointer",
            flexShrink: 0,
            lineHeight: 1,
          }}
        >
          ✕
        </button>
      </div>

      <p
        style={{
          margin: "0.9rem 0 0.4rem",
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "#8b97ad",
        }}
      >
        {connections.length} connection{connections.length === 1 ? "" : "s"}
      </p>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {connections.map((c, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.3rem 0",
              fontSize: "0.85rem",
              borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span
              style={{
                width: "0.5rem",
                height: "0.5rem",
                borderRadius: "9999px",
                background: NODE_COLORS[c.other.type],
                flexShrink: 0,
              }}
            />
            <span style={{ color: "#9aa6bd", fontSize: "0.72rem" }}>
              {c.rel}
            </span>
            <span style={{ marginLeft: "auto", textAlign: "right" }}>
              {c.other.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ----- legend ----------------------------------------------------------------

function Legend() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "1.25rem",
        left: "1.25rem",
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem 1rem",
        maxWidth: "calc(100vw - 2.5rem)",
        padding: "0.7rem 0.9rem",
        background: "rgba(10, 12, 20, 0.72)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "0.6rem",
        backdropFilter: "blur(6px)",
      }}
    >
      {NODE_TYPES.map(t => (
        <span
          key={t.type}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.75rem",
            color: "#c9d2e3",
          }}
        >
          <span
            style={{
              width: "0.6rem",
              height: "0.6rem",
              borderRadius: "9999px",
              background: t.color,
              boxShadow: `0 0 8px ${t.color}`,
            }}
          />
          {t.label}
        </span>
      ))}
    </div>
  );
}

// ----- root ------------------------------------------------------------------

export default function OntologyGraph() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const active = hovered ?? selected;
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", inset: 0, background: "#05060a" }}
    >
      <Canvas
        camera={{ position: [0, 2, 28], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
        onPointerMissed={() => setSelected(null)}
      >
        <Scene
          active={active}
          selected={selected}
          setHovered={setHovered}
          setSelected={setSelected}
        />
      </Canvas>

      <Legend />
      {selected && (
        <DetailPanel nodeId={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
