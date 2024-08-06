// Function to calculate Levenshtein Distance
export function getLevenshteinDistance(str1, str2) {
  const len1 = str1.length;
  const len2 = str2.length;
  const dp = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(null));

  for (let i = 0; i <= len1; i++) dp[i][0] = i;
  for (let j = 0; j <= len2; j++) dp[0][j] = j;

  for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
          const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
          dp[i][j] = Math.min(
              dp[i - 1][j] + 1,     // Deletion
              dp[i][j - 1] + 1,     // Insertion
              dp[i - 1][j - 1] + cost // Substitution
          );
      }
  }

  return dp[len1][len2];
}

// Function to calculate match percentage
export function getMatchPercentage(str1, str2) {
  const maxLen = Math.max(str1.length, str2.length);
  const distance = getLevenshteinDistance(str1, str2);
  let percentage = ((maxLen - distance) / maxLen) * 100;

  return percentage?.toFixed(2)
}

//============================================================

// Function to tokenize and clean up the text
function tokenize(text) {
  return text.toLowerCase().split(/\W+/).filter(Boolean);
}

// Function to calculate term frequency (TF)
function termFrequency(tokens) {
  const freq = {};
  tokens.forEach(token => {
      freq[token] = (freq[token] || 0) + 1;
  });
  return freq;
}

// Function to calculate TF-IDF vector
function tfidfVector(tokens, idf) {
  const tf = termFrequency(tokens);
  const vector = {};
  for (const term in tf) {
      vector[term] = (tf[term] || 0) * (idf[term] || 0);
  }
  return vector;
}

// Function to calculate cosine similarity
function cosineSimilarity(vector1, vector2) {
  const dotProduct = Object.keys(vector1).reduce((sum, key) => sum + (vector1[key] || 0) * (vector2[key] || 0), 0);
  const magnitude1 = Math.sqrt(Object.values(vector1).reduce((sum, value) => sum + value * value, 0));
  const magnitude2 = Math.sqrt(Object.values(vector2).reduce((sum, value) => sum + value * value, 0));
  return dotProduct / (magnitude1 * magnitude2);
}

// Function to compute semantic similarity between two texts
export function getSemanticSimilarity(text1, text2) {
  const tokens1 = tokenize(text1);
  const tokens2 = tokenize(text2);
  const allTokens = Array.from(new Set([...tokens1, ...tokens2]));

  // Calculate IDF for each term
  const idf = allTokens.reduce((acc, token) => {
      const inText1 = tokens1.includes(token);
      const inText2 = tokens2.includes(token);
      acc[token] = Math.log(2 / ((inText1 ? 1 : 0) + (inText2 ? 1 : 0)));
      return acc;
  }, {});

  const vector1 = tfidfVector(tokens1, idf);
  const vector2 = tfidfVector(tokens2, idf);

  const similarity = cosineSimilarity(vector1, vector2) * 100; // Convert to percentage
  return similarity?.toFixed(2)
}

// // Example usage
// const text1 = "The quick brown fox jumps over the lazy dog";
// const text2 = "A fast brown fox leaps over a sleepy dog";

// console.log(`Semantic Similarity: ${getSemanticSimilarity(text1, text2).toFixed(2)}%`);
