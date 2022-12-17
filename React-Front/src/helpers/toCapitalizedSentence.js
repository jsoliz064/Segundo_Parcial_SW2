export const toCapitalizedSentence = (str) => {
    const words = str.split(" ");
    let name = '';
    words.forEach(word => {
        name += word[0].toUpperCase() + word.slice(1) + ' ';
    });
    return name.trim();
}