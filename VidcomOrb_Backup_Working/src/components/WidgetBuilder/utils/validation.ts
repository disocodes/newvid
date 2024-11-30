import { Node, Edge } from 'reactflow';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateNode = (node: Node): ValidationResult => {
  const errors: string[] = [];
  const result: ValidationResult = { isValid: true, errors };

  if (!node.data?.config) {
    errors.push('Node configuration is missing');
  }

  switch (node.type) {
    case 'opencv':
      if (!node.data?.config?.properties?.operation) {
        errors.push('OpenCV operation is required');
      }
      break;
    case 'yolo':
      if (!node.data?.config?.properties?.version) {
        errors.push('YOLO version is required');
      }
      if (!node.data?.config?.properties?.params?.confidenceThreshold) {
        errors.push('Confidence threshold is required');
      }
      break;
    case 'tensorflow':
      if (!node.data?.config?.properties?.modelArchitecture) {
        errors.push('Model architecture is required');
      }
      if (!node.data?.config?.properties?.params?.inputShape) {
        errors.push('Input shape is required');
      }
      break;
  }

  result.isValid = errors.length === 0;
  return result;
};

export const validateFlow = (nodes: Node[], edges: Edge[]): ValidationResult => {
  const errors: string[] = [];
  const result: ValidationResult = { isValid: true, errors };

  // Validate individual nodes
  nodes.forEach((node) => {
    const nodeValidation = validateNode(node);
    if (!nodeValidation.isValid) {
      errors.push(`Node ${node.id}: ${nodeValidation.errors.join(', ')}`);
    }
  });

  // Validate connections
  const nodeIds = new Set(nodes.map((node) => node.id));
  edges.forEach((edge) => {
    if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) {
      errors.push(`Invalid connection: ${edge.source} -> ${edge.target}`);
    }
  });

  // Check for cycles
  if (hasCycle(nodes, edges)) {
    errors.push('Flow contains cycles which are not allowed');
  }

  result.isValid = errors.length === 0;
  return result;
};

const hasCycle = (nodes: Node[], edges: Edge[]): boolean => {
  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  const adjacencyList = edges.reduce((acc, edge) => {
    if (!acc[edge.source]) {
      acc[edge.source] = [];
    }
    acc[edge.source].push(edge.target);
    return acc;
  }, {} as Record<string, string[]>);

  const hasCycleUtil = (nodeId: string): boolean => {
    if (!visited.has(nodeId)) {
      visited.add(nodeId);
      recursionStack.add(nodeId);

      const neighbors = adjacencyList[nodeId] || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor) && hasCycleUtil(neighbor)) {
          return true;
        } else if (recursionStack.has(neighbor)) {
          return true;
        }
      }
    }
    recursionStack.delete(nodeId);
    return false;
  };

  for (const node of nodes) {
    if (!visited.has(node.id) && hasCycleUtil(node.id)) {
      return true;
    }
  }

  return false;
};
