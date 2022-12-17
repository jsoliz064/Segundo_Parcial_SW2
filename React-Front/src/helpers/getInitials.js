export const getInitials = (str) => {
    const words = str.split(" ");
    let initials = '';
    words.forEach(word => {
        if (initials.length <= 2) {
            initials += word[0];
        }
    });
    return initials.toUpperCase();
}