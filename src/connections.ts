
// Each pair represents two words that have an accepted connection.
// Connections work in both directions.

const acceptedConnections: [string, string][] = [
    // Rain and flower puzzle
    ["RAIN", "WATER"],
    ["WATER", "PLANT"],
    ["PLANT", "FLOWER"],
    ["RAIN", "GARDEN"],
    ["GARDEN", "FLOWER"],
  
    // Other useful connections for future puzzles
    ["BOOK", "STORY"],
    ["STORY", "CHARACTER"],
    ["CHARACTER", "ACTOR"],
    ["ACTOR", "MOVIE"],
    ["BOOK", "PAGES"],
    ["PAGES", "PAPER"],
    ["PAPER", "TREE"],
    ["TREE", "FOREST"],
    ["CLOCK", "TIME"],
    ["TIME", "HISTORY"],
    ["HISTORY", "PAST"],
    ["PAST", "MEMORY"],
    ["MEMORY", "PHOTOGRAPH"],
    ["MUSIC", "RHYTHM"],
    ["RHYTHM", "DANCE"],
    ["DANCE", "MOVEMENT"],
    ["MOVEMENT", "BODY"],
    ["BODY", "ART"],
    ["ART", "PAINTING"],
  ];
  
  // Make words consistent before comparing them
  function normalizeWord(word: string): string {
    return word
      .trim()
      .toUpperCase()
      .replace(/[.,!?;:'"]/g, "");
  }
  
  // Make a consistent key for each connection
  function connectionKey(word1: string, word2: string): string {
    return [normalizeWord(word1), normalizeWord(word2)]
      .sort()
      .join("|");
  }
  
  // Store all accepted connections in a Set
  const connectionSet = new Set(
    acceptedConnections.map(([word1, word2]) =>
      connectionKey(word1, word2)
    )
  );
  
  // Check the player's entire chain
  export function validateChain(words: string[]) {
    const chain = words.map(normalizeWord);
  
    // Check for empty words
    if (chain.some((word) => word.length === 0)) {
      return {
        valid: false,
        message: "Please fill in all your words.",
      };
    }
  
    // Check for repeated words
    if (new Set(chain).size !== chain.length) {
      return {
        valid: false,
        message: "Try not to repeat words in your chain.",
      };
    }
  
    // Check every connection in the chain
    for (let i = 0; i < chain.length - 1; i++) {
      const word1 = chain[i];
      const word2 = chain[i + 1];
  
      const key = connectionKey(word1, word2);
  
      if (!connectionSet.has(key)) {
        return {
          valid: false,
          message: `"${word1}" and "${word2}" don't have an accepted connection yet. Try another word.`,
        };
      }
    }
  
    return {
      valid: true,
      message: "Amazing! Every word in your chain connects!",
    };
  }
  
  // Find the shortest possible path between two words
  export function findShortestChain(
    startWord: string,
    endWord: string
  ): string[] | null {
    const graph = new Map<string, string[]>();
  
    // Build a graph from all accepted connections
    for (const [word1, word2] of acceptedConnections) {
      const a = normalizeWord(word1);
      const b = normalizeWord(word2);
  
      if (!graph.has(a)) graph.set(a, []);
      if (!graph.has(b)) graph.set(b, []);
  
      graph.get(a)!.push(b);
      graph.get(b)!.push(a);
    }
  
    const start = normalizeWord(startWord);
    const end = normalizeWord(endWord);
  
    // Breadth-first search
    const queue: string[][] = [[start]];
    const visited = new Set<string>([start]);
  
    while (queue.length > 0) {
      const path = queue.shift()!;
      const currentWord = path[path.length - 1];
  
      if (currentWord === end) {
        return path;
      }
  
      const neighbours = graph.get(currentWord) || [];
  
      for (const neighbour of neighbours) {
        if (!visited.has(neighbour)) {
          visited.add(neighbour);
          queue.push([...path, neighbour]);
        }
      }
    }
  
    // No possible path found
    return null;
  }
  