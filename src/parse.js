const logger = require('./logger');

module.exports = (input, verbose) => {
  const lines = input.split('\n');

  const nextSingleLineRegex = /^\s*\/\/\s*brc\s*$/;
  const currentSingleLineRegex = /\/\/\s*brc\s*$/;
  const chunkStartRegex = /^\s*\/\/\s*brc start\s*$/;
  const chunkEndRegex = /^\s*\/\/\s*brc end\s*$/;

  let outputBuffer = '';
  let insideChunk = false;

  for (let i = 0; i < lines.length; i++) {
    if (insideChunk) {
      // we are inside a chunk to remove so we just need
      // to detect the end
      logger.display(`inside a chunk [${lines[i]}]`, logger.INFORMATION, verbose);
      if (lines[i].match(chunkEndRegex)) {
        logger.display(`end of chunk [${lines[i]}]`, logger.INFORMATION, verbose);
        insideChunk = false;
      }
      continue;
    }
    else if (lines[i].match(chunkStartRegex)) {
      logger.display(`start of chunk [${lines[i]}]`, logger.INFORMATION, verbose);
      insideChunk = true;
      continue;
    }
    else if (lines[i].match(nextSingleLineRegex)) {
      // we want to skip the next line, so advance the
      // counter to go past it
      logger.display(`remove next line [${lines[i]}]`, logger.INFORMATION, verbose);
      logger.display(`next line [${lines[i + 1]}]`, logger.INFORMATION, verbose);
      i++;
      continue;
    }
    else if (lines[i].match(currentSingleLineRegex)) {
      logger.display(`remove this line [${lines[i]}]`, logger.INFORMATION, verbose);
      continue;
    }

    // if we got to this point then we want to retain this
    // line in the output
    outputBuffer += `${outputBuffer === '' ? '' : '\n'}${lines[i]}`;
  }

  return outputBuffer;
};
