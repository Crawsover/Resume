import { create } from 'zustand';

const useSystemBuilderStore = create((set, get) => ({
  // Workflow state
  nodes: [],
  edges: [],
  draftToken: null,
  
  // Stage management
  currentStage: 1,
  
  // Scoring configuration
  scoring: {
    company_visits: 10,
    pricing_page: 25,
    install_page: 30,
    downloads_file: 35,
    returns_72h: 40,
    thresholds: {
      warm: 50,
      hot: 80,
      priority: 100
    }
  },
  
  // Actions
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  
  addNode: (node) => set((state) => ({
    nodes: [...state.nodes, node]
  })),
  
  updateNode: (id, data) => set((state) => ({
    nodes: state.nodes.map(node => 
      node.id === id ? { ...node, data: { ...node.data, ...data } } : node
    )
  })),
  
  deleteNode: (id) => set((state) => ({
    nodes: state.nodes.filter(node => node.id !== id),
    edges: state.edges.filter(edge => edge.source !== id && edge.target !== id)
  })),
  
  addEdge: (edge) => set((state) => ({
    edges: [...state.edges, edge]
  })),
  
  setScoring: (scoring) => set({ scoring }),
  
  updateScoring: (key, value) => set((state) => ({
    scoring: {
      ...state.scoring,
      [key]: value
    }
  })),
  
  updateThreshold: (key, value) => set((state) => ({
    scoring: {
      ...state.scoring,
      thresholds: {
        ...state.scoring.thresholds,
        [key]: value
      }
    }
  })),
  
  setCurrentStage: (stage) => set({ currentStage: stage }),
  
  nextStage: () => set((state) => ({
    currentStage: Math.min(state.currentStage + 1, 4)
  })),
  
  prevStage: () => set((state) => ({
    currentStage: Math.max(state.currentStage - 1, 1)
  })),
  
  // Load template
  loadTemplate: (template) => set({
    nodes: template.nodes || [],
    edges: template.edges || [],
    scoring: template.default_scoring || get().scoring
  }),
  
  // Reset workflow
  reset: () => set({
    nodes: [],
    edges: [],
    currentStage: 1,
    scoring: {
      company_visits: 10,
      pricing_page: 25,
      install_page: 30,
      downloads_file: 35,
      returns_72h: 40,
      thresholds: {
        warm: 50,
        hot: 80,
        priority: 100
      }
    }
  }),
  
  setDraftToken: (token) => set({ draftToken: token }),
  
  // Get workflow data for saving
  getWorkflowData: () => {
    const state = get();
    return {
      nodes: state.nodes,
      edges: state.edges,
      scoring: state.scoring,
      stage: state.currentStage
    };
  }
}));

export default useSystemBuilderStore;
