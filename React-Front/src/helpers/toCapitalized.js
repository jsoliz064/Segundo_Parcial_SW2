export const toCapitalized = (str) => {
    const words = str.split(" ");
    let name = '';
    let c = 0;
    words.forEach(word => {
        if (c < 2) {

            name += word[0].toUpperCase() + word.slice(1) + ' ';
        }
    });
    return name.trim();
}