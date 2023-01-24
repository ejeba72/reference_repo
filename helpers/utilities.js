function countWords(words) {
  return words.split(/\s+/).length;
}

function estimateReadingTime(article) {
  const avgReadingTime = 150; // 150 words per minute
  const articleLength = countWords(article);
  return Math.ceil(articleLength / avgReadingTime);
}

module.exports = { estimateReadingTime };
