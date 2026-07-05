/**
 * The pet-food ontology from the Prompt-to-Ontology demo, modeled as a graph
 * for the interactive 3D showcase. Node types mirror the real ontology schema:
 * Brand, PetFoodProduct, Ingredient, RiskRule, Species, LifeStage.
 */

export type NodeType =
  | "Brand"
  | "PetFoodProduct"
  | "Ingredient"
  | "RiskRule"
  | "Species"
  | "LifeStage";

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
}

export interface GraphEdge {
  source: string;
  target: string;
  label: string;
}

export const NODE_TYPES: { type: NodeType; color: string; label: string }[] = [
  { type: "Brand", color: "#ff8a3d", label: "Brand" },
  { type: "PetFoodProduct", color: "#4f9dff", label: "Product" },
  { type: "Ingredient", color: "#34d399", label: "Ingredient" },
  { type: "RiskRule", color: "#f4506b", label: "Risk Rule" },
  { type: "Species", color: "#a78bfa", label: "Species" },
  { type: "LifeStage", color: "#fbbf24", label: "Life Stage" },
];

export const NODE_COLORS: Record<NodeType, string> = Object.fromEntries(
  NODE_TYPES.map(t => [t.type, t.color])
) as Record<NodeType, string>;

// ----- Nodes -----------------------------------------------------------------

const brands = [
  { id: "brand-whiskerpro", label: "WhiskerPro" },
  { id: "brand-purrfect", label: "PurrfectHealth" },
  { id: "brand-tailwag", label: "Tailwag" },
];

const species = [
  { id: "species-cat", label: "Cat" },
  { id: "species-dog", label: "Dog" },
];

const lifeStages = [
  { id: "life-kitten", label: "Kitten" },
  { id: "life-adult", label: "Adult" },
  { id: "life-senior", label: "Senior" },
  { id: "life-puppy", label: "Puppy" },
];

const ingredients = [
  { id: "ing-chicken", label: "Chicken" },
  { id: "ing-salmon", label: "Salmon" },
  { id: "ing-taurine", label: "Taurine" },
  { id: "ing-rice", label: "Rice" },
  { id: "ing-beef", label: "Beef" },
  { id: "ing-turkey", label: "Turkey" },
  { id: "ing-peas", label: "Peas" },
  { id: "ing-corn", label: "Corn" },
];

const riskRules = [
  { id: "rule-low-taurine", label: "Low Taurine Risk" },
  { id: "rule-chicken-allergen", label: "Chicken Allergen" },
  { id: "rule-high-grain", label: "High Grain" },
  { id: "rule-no-fish-kitten", label: "No Fish for Kittens" },
  { id: "rule-beef-sensitivity", label: "Beef Sensitivity" },
];

interface ProductDef {
  id: string;
  label: string;
  brand: string;
  species: string;
  life: string;
  ingredients: string[];
}

const products: ProductDef[] = [
  {
    id: "pf001",
    label: "PF001 · Kitten Chicken",
    brand: "brand-whiskerpro",
    species: "species-cat",
    life: "life-kitten",
    ingredients: ["ing-chicken", "ing-rice", "ing-taurine"],
  },
  {
    id: "pf002",
    label: "PF002 · Adult Salmon",
    brand: "brand-whiskerpro",
    species: "species-cat",
    life: "life-adult",
    ingredients: ["ing-salmon", "ing-peas", "ing-taurine"],
  },
  {
    id: "pf003",
    label: "PF003 · Senior Turkey",
    brand: "brand-purrfect",
    species: "species-cat",
    life: "life-senior",
    ingredients: ["ing-turkey", "ing-rice"],
  },
  {
    id: "pf004",
    label: "PF004 · Puppy Beef",
    brand: "brand-tailwag",
    species: "species-dog",
    life: "life-puppy",
    ingredients: ["ing-beef", "ing-corn", "ing-rice"],
  },
  {
    id: "pf005",
    label: "PF005 · Adult Chicken",
    brand: "brand-tailwag",
    species: "species-dog",
    life: "life-adult",
    ingredients: ["ing-chicken", "ing-peas"],
  },
  {
    id: "pf006",
    label: "PF006 · Senior Salmon",
    brand: "brand-purrfect",
    species: "species-dog",
    life: "life-senior",
    ingredients: ["ing-salmon", "ing-rice", "ing-turkey"],
  },
  {
    id: "pf007",
    label: "PF007 · Kitten Salmon",
    brand: "brand-purrfect",
    species: "species-cat",
    life: "life-kitten",
    ingredients: ["ing-salmon", "ing-taurine"],
  },
  {
    id: "pf008",
    label: "PF008 · Adult Beef",
    brand: "brand-whiskerpro",
    species: "species-dog",
    life: "life-adult",
    ingredients: ["ing-beef", "ing-corn"],
  },
  {
    id: "pf009",
    label: "PF009 · Puppy Turkey",
    brand: "brand-tailwag",
    species: "species-dog",
    life: "life-puppy",
    ingredients: ["ing-turkey", "ing-peas", "ing-rice"],
  },
  {
    id: "pf010",
    label: "PF010 · Senior Chicken",
    brand: "brand-whiskerpro",
    species: "species-cat",
    life: "life-senior",
    ingredients: ["ing-chicken", "ing-rice"],
  },
];

// ingredient -> risk rule links
const ingredientRisks: [string, string][] = [
  ["ing-taurine", "rule-low-taurine"],
  ["ing-chicken", "rule-chicken-allergen"],
  ["ing-corn", "rule-high-grain"],
  ["ing-rice", "rule-high-grain"],
  ["ing-salmon", "rule-no-fish-kitten"],
  ["ing-beef", "rule-beef-sensitivity"],
];

// ----- Assemble --------------------------------------------------------------

export const graphNodes: GraphNode[] = [
  ...brands.map(b => ({ ...b, type: "Brand" as const })),
  ...species.map(s => ({ ...s, type: "Species" as const })),
  ...lifeStages.map(l => ({ ...l, type: "LifeStage" as const })),
  ...ingredients.map(i => ({ ...i, type: "Ingredient" as const })),
  ...riskRules.map(r => ({ ...r, type: "RiskRule" as const })),
  ...products.map(p => ({
    id: p.id,
    label: p.label,
    type: "PetFoodProduct" as const,
  })),
];

export const graphEdges: GraphEdge[] = [
  ...products.map(p => ({ source: p.id, target: p.brand, label: "made by" })),
  ...products.map(p => ({
    source: p.id,
    target: p.species,
    label: "for species",
  })),
  ...products.map(p => ({
    source: p.id,
    target: p.life,
    label: "for life stage",
  })),
  ...products.flatMap(p =>
    p.ingredients.map(ing => ({ source: p.id, target: ing, label: "contains" }))
  ),
  ...ingredientRisks.map(([ing, rule]) => ({
    source: ing,
    target: rule,
    label: "triggers",
  })),
];

// ----- 3D force-directed layout ---------------------------------------------

export type Vec3 = [number, number, number];

/**
 * A small deterministic Fruchterman-Reingold-style layout in 3D. Runs a fixed
 * number of iterations synchronously (the graph is small) to produce a stable,
 * pleasing spread. Deterministic seed keeps the layout identical across loads.
 */
export function computeLayout(
  nodes: GraphNode[],
  edges: GraphEdge[],
  iterations = 320
): Record<string, Vec3> {
  let seed = 42;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };

  const pos: Record<string, Vec3> = {};
  nodes.forEach(n => {
    pos[n.id] = [(rand() - 0.5) * 12, (rand() - 0.5) * 12, (rand() - 0.5) * 12];
  });

  const pairs = edges.map(e => [e.source, e.target] as const);

  for (let it = 0; it < iterations; it++) {
    const disp: Record<string, Vec3> = {};
    nodes.forEach(n => (disp[n.id] = [0, 0, 0]));

    // Repulsion between every pair of nodes.
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = pos[nodes[i].id];
        const b = pos[nodes[j].id];
        let dx = a[0] - b[0];
        let dy = a[1] - b[1];
        let dz = a[2] - b[2];
        const d2 = dx * dx + dy * dy + dz * dz + 0.01;
        const d = Math.sqrt(d2);
        const rep = 9 / d2;
        dx = (dx / d) * rep;
        dy = (dy / d) * rep;
        dz = (dz / d) * rep;
        const di = disp[nodes[i].id];
        di[0] += dx;
        di[1] += dy;
        di[2] += dz;
        const dj = disp[nodes[j].id];
        dj[0] -= dx;
        dj[1] -= dy;
        dj[2] -= dz;
      }
    }

    // Attraction along edges.
    for (const [s, t] of pairs) {
      const a = pos[s];
      const b = pos[t];
      let dx = a[0] - b[0];
      let dy = a[1] - b[1];
      let dz = a[2] - b[2];
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.01;
      const att = (d * d) / 26;
      dx = (dx / d) * att;
      dy = (dy / d) * att;
      dz = (dz / d) * att;
      const ds = disp[s];
      ds[0] -= dx;
      ds[1] -= dy;
      ds[2] -= dz;
      const dt = disp[t];
      dt[0] += dx;
      dt[1] += dy;
      dt[2] += dz;
    }

    // Apply displacement with cooling + gentle centering.
    const temp = 1.4 * (1 - it / iterations) + 0.04;
    nodes.forEach(n => {
      const dsp = disp[n.id];
      const p = pos[n.id];
      const len = Math.sqrt(dsp[0] ** 2 + dsp[1] ** 2 + dsp[2] ** 2) + 0.0001;
      const cap = Math.min(len, temp) / len;
      p[0] += dsp[0] * cap - p[0] * 0.008;
      p[1] += dsp[1] * cap - p[1] * 0.008;
      p[2] += dsp[2] * cap - p[2] * 0.008;
    });
  }

  return pos;
}
