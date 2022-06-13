class StringService {
  specialtyToArray(specialty) {
    return specialty.slice(1).replace('  ', ' ').split('\n●');
  }

  clearSpecialty(specialty) {
    const asArray = this.specialtyToArray(specialty);
    if (!asArray[asArray.length-1]) {
      asArray.pop();
    } 
    return `●${asArray.join('\n●').replace('  ', ' ')}`;
  }

  stringToArray(str) {
    return str.split('\n');
  }

  getLimitedString(text, maxLength, lastSymbols = 0, isBeautifulEnding = true, textMissingWarning) {
    if (text.length === 0 && textMissingWarning) {
      return textMissingWarning;
    }
  
    if (text.length <= maxLength) {
      return text;
    }
  
    if (lastSymbols) {
      return `${text.substring(0, maxLength)}...${text.substring(text.length - lastSymbols)}`;
    }
  
    let limitedString = text.toString().substring(0, maxLength)
  
    if (isBeautifulEnding && !lastSymbols) {
      let lastSymbolsAfterSpace = limitedString.split(" ").slice(-1)[0];
  
      const isManyLastSymbols = (
        lastSymbolsAfterSpace.length === limitedString.length || 
        lastSymbolsAfterSpace.length >= limitedString.length/2
      );
      if (isManyLastSymbols) {
        return `${limitedString}...`;
      }
  
      const lengthLimitedString = limitedString.length;
      const lengthLastSymbolsAndSpace = lastSymbolsAfterSpace.length+1;
      const maxLengthForBeautifulText = lengthLimitedString - lengthLastSymbolsAndSpace;
      
      const limitedStringWithoutLastSymbols = limitedString.substring(0, maxLengthForBeautifulText);
      return `${limitedStringWithoutLastSymbols}...`;
    }
  
    return `${limitedString}...`;
  }
}

export default new StringService();
